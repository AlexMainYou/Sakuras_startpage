import {
  pulsingBorderFragmentShader,
  PulsingBorderAspectRatios,
} from "../vendor/paper-shaders/dist/shaders/pulsing-border.js";
import { ShaderMount } from "../vendor/paper-shaders/dist/shader-mount.js";
import { ShaderFitOptions } from "../vendor/paper-shaders/dist/shader-sizing.js";
import { getShaderColorFromString } from "../vendor/paper-shaders/dist/get-shader-color-from-string.js";
import { getShaderNoiseTexture } from "../vendor/paper-shaders/dist/get-shader-noise-texture.js";

const shaderSettings = {
  colors: ["#0dd9fd", "#f06bff", "#ff1500cc", "#eeff38"],
  colorBack: "#000000",
  roundness: 0.25,
  thickness: 0.22,
  softness: 1,
  aspectRatio: "auto",
  intensity: 1,
  bloom: 0.66,
  spots: 4,
  spotSize: 0,
  pulse: 0.53,
  smoke: 0.53,
  smokeSize: 0.61,
  speed: 0.14,
  scale: 0.6,
  rotation: 0,
  offsetX: 0,
  offsetY: 0,
  marginLeft: 0,
  marginRight: 0,
  marginTop: 0,
  marginBottom: 0,
};

const panelShaderInset = 92;

let shaderNoiseTexture = null;
let shaderNoiseTexturePromise = null;

function setPaperShaderStatus(status, detail = "") {
  window.paperShaderStatus = {
    status,
    detail,
    updatedAt: new Date().toISOString(),
  };
}

function loadShaderNoiseTexture() {
  if (shaderNoiseTexture?.complete && shaderNoiseTexture.naturalWidth > 0) {
    return Promise.resolve(shaderNoiseTexture);
  }

  if (shaderNoiseTexturePromise) return shaderNoiseTexturePromise;

  shaderNoiseTexture = getShaderNoiseTexture();
  setPaperShaderStatus("loading-noise-texture");

  shaderNoiseTexturePromise = new Promise((resolve, reject) => {
    if (!shaderNoiseTexture) {
      reject(new Error("Paper Shaders: noise texture was not created"));
      return;
    }

    var settled = false;
    var startedAt = performance.now();

    const finish = () => {
      if (settled) return;
      settled = true;

      const decodePromise = shaderNoiseTexture.decode
        ? shaderNoiseTexture.decode().catch(() => {})
        : Promise.resolve();

      decodePromise.finally(() => {
        setPaperShaderStatus("noise-texture-ready");
        resolve(shaderNoiseTexture);
      });
    };

    const fail = () => {
      if (settled) return;
      settled = true;
      reject(new Error("Paper Shaders: noise texture failed to load"));
    };

    const checkLoaded = () => {
      if (shaderNoiseTexture.complete && shaderNoiseTexture.naturalWidth > 0) {
        finish();
        return;
      }

      if (performance.now() - startedAt > 6000) {
        fail();
        return;
      }

      requestAnimationFrame(checkLoaded);
    };

    if (shaderNoiseTexture.complete && shaderNoiseTexture.naturalWidth > 0) {
      finish();
      return;
    }

    shaderNoiseTexture.addEventListener("load", finish, { once: true });
    shaderNoiseTexture.addEventListener("error", fail, { once: true });
    requestAnimationFrame(checkLoaded);
  });

  return shaderNoiseTexturePromise;
}

function createUniforms(overrides = {}) {
  const settings = { ...shaderSettings, ...overrides };

  return {
    u_colorBack: getShaderColorFromString(settings.colorBack),
    u_colors: settings.colors.map(getShaderColorFromString),
    u_colorsCount: settings.colors.length,
    u_roundness: settings.roundness,
    u_thickness: settings.thickness,
    u_marginLeft: settings.marginLeft,
    u_marginRight: settings.marginRight,
    u_marginTop: settings.marginTop,
    u_marginBottom: settings.marginBottom,
    u_aspectRatio: PulsingBorderAspectRatios[settings.aspectRatio],
    u_softness: settings.softness,
    u_intensity: settings.intensity,
    u_bloom: settings.bloom,
    u_spots: settings.spots,
    u_spotSize: settings.spotSize,
    u_pulse: settings.pulse,
    u_smoke: settings.smoke,
    u_smokeSize: settings.smokeSize,
    u_noiseTexture: shaderNoiseTexture,
    u_fit: ShaderFitOptions.cover,
    u_rotation: settings.rotation,
    u_scale: settings.scale,
    u_offsetX: settings.offsetX,
    u_offsetY: settings.offsetY,
    u_originX: 0.5,
    u_originY: 0.5,
    u_worldWidth: 0,
    u_worldHeight: 0,
  };
}

function mountShader(element, overrides = {}) {
  if (!element || element.paperShaderMount) return element?.paperShaderMount;

  const settings = { ...shaderSettings, ...overrides };

  try {
    element.dataset.paperShaderMounted = "";
    element.dataset.paperShaderError = "";

    element.paperShaderMount = new ShaderMount(
      element,
      pulsingBorderFragmentShader,
      createUniforms(settings),
      { alpha: true, premultipliedAlpha: false },
      settings.speed,
      0,
      1,
      960 * 540
    );

    element.dataset.paperShaderMounted = "true";
    element.dataset.paperShaderError = "";
  } catch (error) {
    element.dataset.paperShaderError = error?.message ?? String(error);
    setPaperShaderStatus("mount-failed", element.dataset.paperShaderError);
    console.error("[paper-shader] failed to mount PulsingBorder", error);
  }

  return element.paperShaderMount;
}

function getInsetMargins(element, inset) {
  return {
    marginLeft: inset / Math.max(element.clientWidth, 1),
    marginRight: inset / Math.max(element.clientWidth, 1),
    marginTop: inset / Math.max(element.clientHeight, 1),
    marginBottom: inset / Math.max(element.clientHeight, 1),
  };
}

function findShaderTargets() {
  const tabs = document.querySelector("tabs-list");
  const root = tabs?.shadowRoot;

  if (!root) return null;

  return {
    panel: root.querySelector("[data-paper-shader=\"panel\"]"),
  };
}

async function initPaperShaders(tries = 0) {
  setPaperShaderStatus("waiting-for-targets", String(tries));
  const targets = findShaderTargets();

  if (!targets?.panel) {
    if (tries < 120) {
      requestAnimationFrame(() => initPaperShaders(tries + 1));
    }
    return;
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const speed = reducedMotion ? 0 : shaderSettings.speed;

  try {
    await loadShaderNoiseTexture();
  } catch (error) {
    const message = error?.message ?? String(error);
    targets.panel.dataset.paperShaderError = message;
    setPaperShaderStatus("noise-texture-failed", message);
    console.error("[paper-shader] failed to load noise texture", error);
    return;
  }

  setPaperShaderStatus("mounting");

  const panelMount = mountShader(targets.panel, {
    colorBack: "#00000000",
    speed,
    scale: 1,
    thickness: 0.15,
    intensity: 0.74,
    smoke: 0.38,
    smokeSize: 0.5,
    bloom: 0.06,
    ...getInsetMargins(targets.panel, panelShaderInset),
  });

  const updateScale = () => {
    const nextPanelScale = 1;

    panelMount?.setUniforms(createUniforms({
      colorBack: "#00000000",
      scale: nextPanelScale,
      thickness: 0.15,
      intensity: 0.74,
      smoke: 0.38,
      smokeSize: 0.5,
      bloom: 0.06,
      ...getInsetMargins(targets.panel, panelShaderInset),
    }));
  };

  window.addEventListener("resize", updateScale, { passive: true });

  if (panelMount) {
    setPaperShaderStatus("mounted");
  }
}

window.paperShaderDebug = {
  shader: "PulsingBorder",
  source: "src/vendor/paper-shaders/dist/shaders/pulsing-border.js",
  version: "0.0.77",
};

function schedulePaperShaderInit() {
  requestAnimationFrame(() => initPaperShaders());
}

setPaperShaderStatus("module-loaded");

if (document.readyState === "complete" || document.readyState === "interactive") {
  schedulePaperShaderInit();
} else {
  window.addEventListener("DOMContentLoaded", schedulePaperShaderInit, { once: true });
}
