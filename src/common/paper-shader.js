import {
  ShaderMount,
  ShaderFitOptions,
  PulsingBorderAspectRatios,
  getShaderColorFromString,
  getShaderNoiseTexture,
  pulsingBorderFragmentShader,
} from "https://unpkg.com/@paper-design/shaders@0.0.77/dist/index.js";

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
    u_noiseTexture: getShaderNoiseTexture(),
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

  element.paperShaderMount = new ShaderMount(
    element,
    pulsingBorderFragmentShader,
    createUniforms(settings),
    { alpha: true, premultipliedAlpha: false },
    settings.speed,
    0,
    1.5,
    1920 * 1080 * 2
  );

  return element.paperShaderMount;
}

function findShaderTargets() {
  const tabs = document.querySelector("tabs-list");
  const root = tabs?.shadowRoot;

  if (!root) return null;

  return {
    page: root.querySelector("[data-paper-shader=\"page\"]"),
    panel: root.querySelector("[data-paper-shader=\"panel\"]"),
  };
}

function initPaperShaders(tries = 0) {
  const targets = findShaderTargets();

  if (!targets?.page || !targets?.panel) {
    if (tries < 120) {
      requestAnimationFrame(() => initPaperShaders(tries + 1));
    }
    return;
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mobile = window.matchMedia("(max-width: 767px)").matches;
  const responsiveScale = mobile ? 0.9 : shaderSettings.scale;
  const speed = reducedMotion ? 0 : shaderSettings.speed;

  const pageMount = mountShader(targets.page, {
    speed,
    scale: responsiveScale,
  });

  const panelMount = mountShader(targets.panel, {
    speed,
    scale: mobile ? 0.9 : 0.74,
    smoke: 0.62,
    bloom: 0.72,
  });

  const updateScale = () => {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const nextPageScale = isMobile ? 0.9 : shaderSettings.scale;
    const nextPanelScale = isMobile ? 0.9 : 0.74;

    pageMount?.setUniforms(createUniforms({ scale: nextPageScale }));
    panelMount?.setUniforms(createUniforms({
      scale: nextPanelScale,
      smoke: 0.62,
      bloom: 0.72,
    }));
  };

  window.addEventListener("resize", updateScale, { passive: true });
}

initPaperShaders();
