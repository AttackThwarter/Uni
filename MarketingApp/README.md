# KivyMD Marketing & Directory App

A cross-platform mobile application built with Python and KivyMD for managing business directories (Exporters, Student Agencies, Recruitment). This application supports **Persian (Farsi)** text rendering and includes a complete User Authentication system (Login/Signup) and a local SQLite database.

## 📱 Features

- **User Authentication:** Secure Login and Signup pages with SQLite backend.
- **Persian Language Support:** Full support for RTL (Right-to-Left) text rendering using `arabic-reshaper` and `python-bidi`.
- **Categorized Directory:** Browse companies by categories (Exports, Student Services, Jobs).
- **Interactive UI:**
  - Custom Persian TextFields.
  - Floating and Fixed navigation buttons.
  - Detailed dialog boxes for company contact info.
- **Data Persistence:** Automatically generates a local database (`marketing.db`) with dummy data for testing.

## 🛠 Prerequisites

Before running the application, ensure you have the following installed:

- Python 3.7+
- Kivy & KivyMD
- Arabic Reshaper & Python Bidi

## 📦 Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/AttackThwarter/MarketingApp.git
    cd MarketingApp
    ```

2.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

3.  **Setup Font:**
    *   Create a folder named `assets` in the project root.
    *   Download the **Vazir** font (e.g., `vazir.ttf`) and place it inside `assets/`.
    *   *Note: The app requires 'assets/vazir.ttf' to launch.*
    *   
        ```I Add All Project Folders And Its Ready To Use ```

## 🚀 Usage

Run the main application file:

```bash
python main.py
```

### Credentials (for testing)
Since the database is created locally, you can register a new user via the **Signup** screen, or check the `users` table in `marketing.db` if you want to inspect records.

## 📂 Project Structure

- `main.py`: The entry point of the application containing UI logic (Screens, Navigation, KivyMD widgets).
- `database_manager.py`: Handles SQLite database connections, table creation, and queries (CRUD).
- `assets/`: Directory containing font files (Required).

## 🖼 Screenshots
*(Add screenshots of your app here)*

## 📄 License
This project is open-source and available under the MIT License but you can use any Licenses just for this project not others.
