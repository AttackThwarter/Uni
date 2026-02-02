from kivymd.app import MDApp
from kivymd.uix.screen import MDScreen
from kivymd.uix.screenmanager import MDScreenManager
from kivymd.uix.list import MDList, ThreeLineAvatarIconListItem, IconLeftWidget
from kivymd.uix.dialog import MDDialog
from kivymd.uix.button import MDFlatButton, MDFillRoundFlatButton, MDIconButton, MDFloatingActionButton
from kivymd.uix.boxlayout import MDBoxLayout
from kivymd.uix.relativelayout import MDRelativeLayout  # اضافه شده برای چیدمان دقیق
from kivymd.uix.scrollview import MDScrollView
from kivymd.uix.textfield import MDTextField
from kivymd.uix.label import MDLabel, MDIcon
from kivymd.uix.card import MDCard
from kivy.core.text import LabelBase
from kivy.metrics import dp
from kivy.lang import Builder
import arabic_reshaper
from bidi.algorithm import get_display
from database_manager import DatabaseManager

# --- Register Fonts ---
LabelBase.register(name='Vazir', fn_regular='assets/vazir.ttf')
LabelBase.register(name='Roboto', fn_regular='assets/vazir.ttf', fn_bold='assets/vazir.ttf')

# --- Persian Reshaper Helper Function ---
def fa(text):
    if text is None: return ""
    try:
        reshaped_text = arabic_reshaper.reshape(str(text))
        return get_display(reshaped_text)
    except:
        return text

# --- KV Builder for Custom Widgets ---
KV_BUILDER = '''
<PersianTextField@MDTextField>:
    font_name: 'Vazir'
    font_name_hint_text: 'Vazir'
    font_name_helper_text: 'Vazir'
    mode: "rectangle"
    halign: "right"
'''
Builder.load_string(KV_BUILDER)

class PersianTextField(MDTextField):
    pass

class MarketingApp(MDApp):
    dialog = None
    db = None
    current_user = None 
    result_title_label = None 

    def build(self):
        self.theme_cls.primary_palette = "Indigo"
        self.theme_cls.theme_style = "Light"
        
        font_name = "Vazir"
        for style in self.theme_cls.font_styles:
            self.theme_cls.font_styles[style][0] = font_name

        self.db = DatabaseManager()
        self.sm = MDScreenManager()
        
        self.sm.add_widget(self.build_login_screen())
        self.sm.add_widget(self.build_signup_screen())
        self.sm.add_widget(self.build_home_screen())
        self.sm.add_widget(self.build_result_screen())
        
        return self.sm

    # ------------------ Login Screen ------------------
    def build_login_screen(self):
        screen = MDScreen(name='login')
        
        card = MDCard(
            orientation='vertical', padding=dp(25), spacing=dp(20),
            size_hint=(None, None), size=(dp(320), dp(450)),
            pos_hint={'center_x': 0.5}, radius=[20,]
        )
        
        icon_label = MDIcon(
            icon='account-circle', halign='center', theme_text_color='Primary',
            font_size=dp(80), pos_hint={'center_x': 0.5}
        )
        card.add_widget(icon_label)
        card.add_widget(MDLabel(text=fa("ورود به سامانه"), halign="center", font_style="H5"))
        
        self.login_user = PersianTextField(hint_text=fa("نام کاربری"), icon_right="account")
        card.add_widget(self.login_user)
        self.login_pass = PersianTextField(hint_text=fa("رمز عبور"), icon_right="key", password=True)
        card.add_widget(self.login_pass)
        
        btn_login = MDFillRoundFlatButton(text=fa("ورود"), size_hint_x=1, on_release=self.do_login)
        card.add_widget(btn_login)
        
        btn_signup = MDFlatButton(
            text=fa("حساب ندارید؟ ثبت‌نام کنید"), pos_hint={'center_x': 0.5},
            on_release=lambda x: self.change_screen('signup')
        )
        card.add_widget(btn_signup)
        
        scroll = MDScrollView()
        content = MDBoxLayout(orientation='vertical', adaptive_height=True, padding=[0, dp(50), 0, dp(50)])
        content.add_widget(card)
        wrapper = MDBoxLayout(orientation='vertical', pos_hint={'center_x': 0.5})
        wrapper.add_widget(MDBoxLayout(size_hint_y=None, height=dp(50)))
        wrapper.add_widget(content)
        wrapper.add_widget(MDBoxLayout(size_hint_y=None, height=dp(50)))
        
        scroll.add_widget(wrapper)
        screen.add_widget(scroll)
        return screen

    # ------------------ Signup Screen ------------------
    def build_signup_screen(self):
        screen = MDScreen(name='signup')
        
        card = MDCard(
            orientation='vertical', padding=dp(25), spacing=dp(15),
            size_hint=(None, None), size=(dp(320), dp(520)),
            pos_hint={'center_x': 0.5}, radius=[20,]
        )
        
        icon_label = MDIcon(
            icon='account-plus', halign='center', theme_text_color='Primary',
            font_size=dp(70), pos_hint={'center_x': 0.5}
        )
        card.add_widget(icon_label)
        card.add_widget(MDLabel(text=fa("ثبت‌نام کاربر جدید"), halign="center", font_style="H5"))
        
        self.reg_name = PersianTextField(hint_text=fa("نام کامل"), icon_right="rename-box")
        card.add_widget(self.reg_name)
        self.reg_user = PersianTextField(hint_text=fa("نام کاربری"), icon_right="account")
        card.add_widget(self.reg_user)
        self.reg_pass = PersianTextField(hint_text=fa("رمز عبور"), icon_right="key", password=True)
        card.add_widget(self.reg_pass)
        
        btn_reg = MDFillRoundFlatButton(text=fa("تکمیل ثبت‌نام"), size_hint_x=1, on_release=self.do_register)
        card.add_widget(btn_reg)
        
        btn_back = MDFlatButton(
            text=fa("بازگشت به ورود"), pos_hint={'center_x': 0.5},
            on_release=lambda x: self.change_screen('login')
        )
        card.add_widget(btn_back)
        
        scroll = MDScrollView()
        content = MDBoxLayout(orientation='vertical', adaptive_height=True)
        content.add_widget(MDBoxLayout(size_hint_y=None, height=dp(50)))
        content.add_widget(card)
        content.add_widget(MDBoxLayout(size_hint_y=None, height=dp(50)))
        wrapper = MDBoxLayout(orientation='vertical', pos_hint={'center_x': 0.5})
        wrapper.add_widget(content)
        scroll.add_widget(wrapper)
        screen.add_widget(scroll)
        return screen

    # ------------------ Home Screen ------------------
    def build_home_screen(self):
        screen = MDScreen(name='home')
        layout = MDBoxLayout(orientation='vertical', spacing=dp(20), padding=dp(30))
        
        self.welcome_label = MDLabel(text="", halign="center", font_style="H5", theme_text_color="Primary")
        layout.add_widget(MDBoxLayout(size_hint_y=0.1))
        layout.add_widget(self.welcome_label)
        
        btns = [
            ('محصولات صادراتی (زعفران)', 'product', 'لیست صادرکنندگان'),
            ('اعزام دانشجو', 'student', 'موسسات اعزام دانشجو'),
            ('کاریابی بین‌المللی', 'job', 'کاریابی‌های بین‌المللی')
        ]
        
        for txt, cat, title in btns:
            b = MDFillRoundFlatButton(
                text=fa(txt), font_size=dp(18), size_hint=(1, None), height=dp(60),
                on_release=lambda x, c=cat, t=title: self.show_results(c, t)
            )
            layout.add_widget(b)
            
        logout_btn = MDFlatButton(
            text=fa("خروج از حساب"), theme_text_color="Error", pos_hint={'center_x': 0.5},
            on_release=lambda x: self.logout()
        )
        layout.add_widget(logout_btn)
        
        layout.add_widget(MDBoxLayout(size_hint_y=0.2))
        screen.add_widget(layout)
        return screen

    # ------------------ Results Screen (FIXED BUTTONS) ------------------
    # def build_result_screen(self):
    #     screen = MDScreen(name='results')
        
    #     # Main Layout is Relative to allow floating button at bottom
    #     main_layout = MDRelativeLayout()

    #     # Content Layout (Toolbar + List)
    #     content_layout = MDBoxLayout(orientation='vertical')
        
    #     # --- NEW CUSTOM TOOLBAR USING RELATIVE LAYOUT ---
    #     # Using MDRelativeLayout ensures buttons stick to corners and don't get squashed
    #     toolbar = MDRelativeLayout(
    #         size_hint_y=None,
    #         height=dp(64),
    #         md_bg_color=self.theme_cls.primary_color,
    #     )
        
    #     # 1. Back Button (FIXED LEFT)
    #     btn_back = MDIconButton(
    #         icon="arrow-left",

    #         pos_hint={'center_y': 0.5, 'x': 0.02}, # Fix to left
    #         icon_size=dp(30),
    #         on_release=lambda x: self.change_screen('home')
    #     )
        
    #     # 2. Title Label (FIXED CENTER)
    #     self.result_title_label = MDLabel(
    #         text=fa("نتایج"),
    #         halign="center",
    #         theme_text_color="Custom",
    #         text_color=(1, 1, 1, 1), # White
    #         font_style="H6",
    #         pos_hint={'center_x': 0.5, 'center_y': 0.5}
    #     )
        
    #     # 3. Home Button (FIXED RIGHT)
    #     btn_home = MDIconButton(
    #         icon="home",
    #         theme_text_color="Custom",
    #         text_color=(1, 1, 1, 1), # White
    #         pos_hint={'center_y': 0.5, 'right': 0.98}, # Fix to right
    #         icon_size=dp(30),
    #         on_release=lambda x: self.change_screen('home')
    #     )
        
    #     toolbar.add_widget(self.result_title_label) # Add label
    #     toolbar.add_widget(btn_back)                # Add buttons on top
    #     toolbar.add_widget(btn_home)
        
    #     content_layout.add_widget(toolbar)
        
    #     # Results List
    #     scroll = MDScrollView()
    #     self.list_view = MDList()
    #     scroll.add_widget(self.list_view)
    #     content_layout.add_widget(scroll)
        
    #     main_layout.add_widget(content_layout)

    #     # --- FAIL-SAFE FLOATING BUTTON (BOTTOM LEFT) ---
    #     # If the top bar buttons still fail visually, this button is guaranteed to show
    #     fab = MDFloatingActionButton(
    #         icon="arrow-left",
    #         pos_hint={'x': 0.05, 'y': 0.05},
    #         md_bg_color=self.theme_cls.primary_color,
    #         text_color=(1,1,1,1),
    #         elevation=4,
    #         on_release=lambda x: self.change_screen('home')
    #     )
    #     main_layout.add_widget(fab)
        
    #     screen.add_widget(main_layout)
    #     return screen

    def build_result_screen(self):
        screen = MDScreen(name='results')
        
        main_layout = MDRelativeLayout()

        content_box = MDBoxLayout(orientation='vertical')
        
        toolbar = MDBoxLayout(
            orientation='horizontal',
            size_hint_y=None,
            height=dp(60),
            md_bg_color=self.theme_cls.primary_color,
            padding=[dp(10), 0, dp(10), 0],
            spacing=dp(5)
        )
        
        btn_back = MDIconButton(
            icon="arrow-left",
            theme_text_color="Custom",
            text_color=(1, 1, 1, 1),
            pos_hint={'center_y': 0.5},
            on_release=lambda x: self.change_screen('home')
        )
        
        self.result_title_label = MDLabel(
            text=fa("نتایج"),
            halign="center",
            theme_text_color="Custom",
            text_color=(1, 1, 1, 1),
            font_style="H6",
            size_hint_x=1,
            pos_hint={'center_y': 0.5}
        )
        
        btn_home = MDIconButton(
            icon="home",
            theme_text_color="Custom",
            text_color=(1, 1, 1, 1),
            pos_hint={'center_y': 0.5},
            on_release=lambda x: self.change_screen('home')
        )
        
        toolbar.add_widget(btn_back)
        toolbar.add_widget(self.result_title_label)
        toolbar.add_widget(btn_home)
        
        content_box.add_widget(toolbar)
        
        scroll = MDScrollView()
        self.list_view = MDList(padding=[0, 0, 0, dp(80)])
        scroll.add_widget(self.list_view)
        content_box.add_widget(scroll)
        
        main_layout.add_widget(content_box)

        return_btn = MDFillRoundFlatButton(
            text=fa("بازگشت به خانه"),
            icon="arrow-left",
            pos_hint={'center_x': 0.5, 'y': 0.05},
            md_bg_color=self.theme_cls.primary_color,
            theme_text_color="Custom",
            text_color=(1, 1, 1, 1), 
            on_release=lambda x: self.change_screen('home')
        )
        
        main_layout.add_widget(return_btn)
        
        screen.add_widget(main_layout)
        return screen


    # ------------------ App Logic ------------------
    def do_login(self, instance):
        user = self.login_user.text
        pwd = self.login_pass.text
        success, fullname = self.db.validate_login(user, pwd)
        if success:
            self.current_user = fullname
            self.welcome_label.text = fa(f"سلام {fullname}، خوش آمدید")
            self.change_screen('home')
            self.login_user.text = ""
            self.login_pass.text = ""
        else:
            self.show_dialog("خطا", "نام کاربری یا رمز عبور اشتباه است.")

    def do_register(self, instance):
        name = self.reg_name.text
        user = self.reg_user.text
        pwd = self.reg_pass.text
        if not name or not user or not pwd:
            self.show_dialog("خطا", "لطفا تمام فیلدها را پر کنید.")
            return
        success, msg = self.db.register_user(name, user, pwd)
        if success:
            self.show_dialog("موفق", msg)
            self.change_screen('login')
            self.reg_name.text = ""
            self.reg_user.text = ""
            self.reg_pass.text = ""
        else:
            self.show_dialog("خطا", msg)

    def logout(self):
        self.current_user = None
        self.change_screen('login')

    def change_screen(self, screen_name):
        self.sm.current = screen_name

    def show_results(self, category, title_text):
        if self.result_title_label:
            self.result_title_label.text = fa(title_text)
            
        self.list_view.clear_widgets()
        
        companies = self.db.get_companies_by_category(category)
        
        if not companies:
            self.list_view.add_widget(ThreeLineAvatarIconListItem(text=fa("موردی یافت نشد")))
            return
            
        for comp in companies:
            c_name, c_desc, c_phone, c_web, c_budget = comp[2], comp[3], comp[4], comp[5], comp[6]
            
            icon_name = "star" if c_budget > 20000 else "briefcase"
            
            item = ThreeLineAvatarIconListItem(
                text=fa(c_name),
                secondary_text=fa(c_desc),
                tertiary_text=fa(f"تماس: {c_phone}"),
                on_release=lambda x, p=c_phone, w=c_web, n=c_name: self.show_detail_dialog(n, p, w)
            )
            
            icon = IconLeftWidget(icon=icon_name)
            if c_budget > 20000:
                icon.theme_text_color = "Custom"
                icon.text_color = (1, 0.8, 0, 1) # Gold color for premium
            
            item.add_widget(icon)
            self.list_view.add_widget(item)
            
        self.change_screen('results')

    def show_detail_dialog(self, name, phone, website):
        if self.dialog: self.dialog.dismiss()
        self.dialog = MDDialog(
            title=fa(f"اطلاعات تماس: {name}"),
            text=fa(f"شماره تماس: {phone}\n\nوبسایت: {website}"),
            buttons=[MDFlatButton(text=fa("بستن"), on_release=lambda x: self.dialog.dismiss())]
        )
        self.dialog.open()

    def show_dialog(self, title, text):
        if self.dialog: self.dialog.dismiss()
        self.dialog = MDDialog(
            title=fa(title),
            text=fa(text),
            buttons=[MDFlatButton(text=fa("باشه"), on_release=lambda x: self.dialog.dismiss())]
        )
        self.dialog.open()

if __name__ == '__main__':
    MarketingApp().run()
