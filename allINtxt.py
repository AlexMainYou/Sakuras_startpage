import os

def create_project_tree(start_path, output_file):
    """
    Создает текстовый файл с деревом каталогов и содержимым текстовых файлов.

    Args:
        start_path (str): Путь к корневой папке проекта.
        output_file (str): Путь к файлу, в который будет записан результат.
    """
    # Список расширений файлов, содержимое которых нужно включить
    text_extensions = ['.py', '.html', '.css', '.js', '.json', '.md', '.txt', '.xml', '.yaml', '.yml', '.ini', '.cfg', '.toml']

    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(f"Структура проекта для: {start_path}\n\n")
        for root, dirs, files in os.walk(start_path):
            level = root.replace(start_path, '').count(os.sep)
            indent = ' ' * 4 * (level)
            f.write(f"{indent}{os.path.basename(root)}/\n")
            sub_indent = ' ' * 4 * (level + 1)
            for file in files:
                f.write(f"{sub_indent}{file}\n")
                # Проверяем, является ли файл текстовым
                if any(file.endswith(ext) for ext in text_extensions):
                    try:
                        file_path = os.path.join(root, file)
                        with open(file_path, 'r', encoding='utf-8', errors='ignore') as content_file:
                            content = content_file.read()
                            f.write(f"\n{sub_indent}---------- СОДЕРЖИМОЕ ФАЙЛА ----------\n")
                            # Добавляем отступы к каждой строке содержимого
                            indented_content = ''.join([f"{sub_indent}{line}" for line in content.splitlines(True)])
                            f.write(f"{indented_content}\n")
                            f.write(f"{sub_indent}---------- КОНЕЦ ФАЙЛА ----------\n\n")
                    except Exception as e:
                        f.write(f"{sub_indent}*** Не удалось прочитать файл: {e} ***\n\n")

# --- НАСТРОЙКА ---
# Укажите путь к папке вашего проекта
project_directory = r"D:\!FastStart\Package\Start Page"
# Укажите путь и имя файла для сохранения результата
output_filename = r"D:\!FastStart\Package\Start Page\ssp.txt"

# --- ЗАПУСК СКРИПТА ---
if os.path.isdir(project_directory):
    create_project_tree(project_directory, output_filename)
    print(f"Структура проекта успешно сохранена в файл: {output_filename}")
else:
    print(f"Ошибка: Директория не найдена - {project_directory}")