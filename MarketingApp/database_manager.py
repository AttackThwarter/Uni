import sqlite3
import os

DB_NAME = "marketing.db"

class DatabaseManager:
    def __init__(self):
        self.conn = sqlite3.connect(DB_NAME)
        self.cursor = self.conn.cursor()
        self.create_tables()
        self.check_and_fill_data()

    def create_tables(self):
        # Create Companies Table
        self.cursor.execute("""
        CREATE TABLE IF NOT EXISTS companies (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            category TEXT,
            name TEXT,
            description TEXT,
            phone TEXT,
            website TEXT,
            ad_budget INTEGER
        )
        """)
        
        # Create Users Table (For Login/Signup)
        self.cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT,
            fullname TEXT
        )
        """)
        self.conn.commit()

    # --- User Management Section ---
    def register_user(self, fullname, username, password):
        try:
            self.cursor.execute("INSERT INTO users (fullname, username, password) VALUES (?, ?, ?)", 
                                (fullname, username, password))
            self.conn.commit()
            return True, "Registration successful."
        except sqlite3.IntegrityError:
            return False, "Username already taken."

    def validate_login(self, username, password):
        self.cursor.execute("SELECT * FROM users WHERE username=? AND password=?", (username, password))
        user = self.cursor.fetchone()
        if user:
            return True, user[3] # Return full name
        return False, None

    # --- Company Data Management ---
    def check_and_fill_data(self):
        self.cursor.execute("SELECT COUNT(*) FROM companies")
        if self.cursor.fetchone()[0] == 0:
            self.insert_dummy_data()

    def insert_dummy_data(self):
        # Inserting dummy data for testing purposes
        data = [
            ('product', 'زعفران صادراتی قائنات (ویژه)', 'بزرگترین صادرکننده زعفران نگین در بسته‌بندی‌های لوکس کادویی', '09121111111', 'www.saffron-co.com', 50000),
            ('product', 'طلای سرخ خراسان', 'فروش عمده زعفران پوشال و سرگل با برگه آزمایش', '09122222222', 'www.redgold.ir', 1000),
            ('product', 'بازرگانی زعفران ایران', 'ارسال مستقیم زعفران ارگانیک به اروپا و خلیج فارس', '09123333333', 'www.iran-saffron.net', 25000),
            ('student', 'موسسه دانش‌پویان ملل (VIP)', 'با سابقه ۱۲۰۰ پرونده موفق ویزای تحصیلی کانادا و آلمان', '02188888888', 'www.study-abroad.com', 60000),
            ('student', 'آینده سازان اپلای', 'مشاوره رایگان برای دانشگاه‌های ایتالیا - ۳۰۰ پذیرش موفق', '02177777777', 'www.future-apply.com', 5000),
            ('student', 'گروه مهاجرتی علم و فن', 'تضمین بازگشت وجه در صورت عدم پذیرش - ۵۰ پرونده موفق', '02166666666', 'www.science-fan.ir', 500),
            ('job', 'کاریابی بین‌الملل جاب‌یک', 'تخصص در جاب‌آفر پرستاری آلمان و عمان', '02155555555', 'www.job-yek.com', 30000),
            ('job', 'ریموت جاب', 'استخدام برنامه‌نویس در شرکت‌های خارجی به صورت دلاری', '09350000000', 'www.remote-dev.io', 2000)
        ]
        self.cursor.executemany("""
            INSERT INTO companies (category, name, description, phone, website, ad_budget)
            VALUES (?, ?, ?, ?, ?, ?)
        """, data)
        self.conn.commit()

    def get_companies_by_category(self, category):
        # Sort by ad_budget DESC to show higher paying ads first
        query = "SELECT * FROM companies WHERE category=? ORDER BY ad_budget DESC"
        self.cursor.execute(query, (category,))
        return self.cursor.fetchall()

    def close(self):
        self.conn.close()
