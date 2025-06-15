
document.addEventListener('DOMContentLoaded', function() {
    
    
    const contactForm = document.getElementById('contactForm');
    const categoryRadios = document.querySelectorAll('input[name="category"]');
    const departmentSection = document.getElementById('departmentSection');
    const messageTextarea = document.querySelector('textarea[name="message"]');
    
    
    categoryRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            
            if (['complaint', 'cooperation', 'media'].includes(this.value)) {
                departmentSection.style.display = 'block';
            } else {
                departmentSection.style.display = 'none';
            }
            
            
            updateMessagePlaceholder(this.value);
        });
    });
    
    
    function updateMessagePlaceholder(category) {
        const placeholders = {
            general: 'سوال یا نظر خود را بنویسید...',
            suggestion: 'پیشنهاد خود را با جزئیات شرح دهید...',
            complaint: 'لطفا موضوع انتقاد یا شکایت خود را توضیح دهید...',
            cooperation: 'نوع همکاری مورد نظر و توانایی‌های خود را شرح دهید...',
            media: 'موضوع درخواست رسانه‌ای خود را توضیح دهید...',
            donation: 'سوال یا درخواست خود در مورد کمک‌های مالی را بنویسید...'
        };
        
        if (messageTextarea && placeholders[category]) {
            messageTextarea.placeholder = placeholders[category];
        }
    }
    
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            event.stopPropagation();
            
            if (this.checkValidity()) {
                
                const message = messageTextarea.value.trim();
                if (message.length < 10) {
                    Swal.fire({
                        title: 'خطا',
                        text: 'متن پیام باید حداقل ۱۰ کاراکتر باشد',
                        icon: 'error',
                        confirmButtonText: 'باشه',
                        confirmButtonColor: '#003366'
                    });
                    return;
                }
                
                
                this.classList.add('form-loading');
                
                
                setTimeout(() => {
                    
                    this.classList.remove('form-loading');
                    
                    
                    const trackingCode = 'MSG-' + Date.now().toString().slice(-8);
                    
                    
                    document.getElementById('trackingCode').textContent = trackingCode;
                    const successModal = new bootstrap.Modal(document.getElementById('successModal'));
                    successModal.show();
                    
                    
                    this.reset();
                    this.classList.remove('was-validated');
                    departmentSection.style.display = 'none';
                    
                    
                    const copyEmail = document.getElementById('copyEmail').checked;
                    if (copyEmail) {
                        console.log('Sending copy to user email...');
                    }
                }, 2000);
            }
            
            this.classList.add('was-validated');
        });
    }
    
    
    const phoneInput = document.querySelector('input[name="phone"]');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9]/g, '').substring(0, 11);
        });
    }
    
    
    const fileInput = document.querySelector('input[name="attachment"]');
    if (fileInput) {
        fileInput.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                
                const maxSize = 5 * 1024 * 1024; 
                if (file.size > maxSize) {
                    Swal.fire({
                        title: 'خطا',
                        text: 'حجم فایل نباید بیشتر از ۵ مگابایت باشد',
                        icon: 'error',
                        confirmButtonText: 'باشه',
                        confirmButtonColor: '#003366'
                    });
                    this.value = '';
                    return;
                }
                
                
                const allowedTypes = ['application/pdf', 'application/msword', 
                                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                                    'image/jpeg', 'image/png'];
                if (!allowedTypes.includes(file.type)) {
                    Swal.fire({
                        title: 'خطا',
                        text: 'فقط فایل‌های PDF، DOC، DOCX، JPG و PNG مجاز هستند',
                        icon: 'error',
                        confirmButtonText: 'باشه',
                        confirmButtonColor: '#003366'
                    });
                    this.value = '';
                }
            }
        });
    }
    
    

    
    refreshCaptcha();
    
    
    window.startLiveChat = function() {
        Swal.fire({
            title: 'چت آنلاین',
            html: `
                <div class="text-center">
                    <i class="fas fa-comments" style="font-size: 3rem; color: var(--primary-color); margin-bottom: 20px;"></i>
                    <p>در حال اتصال به پشتیبان...</p>
                    <div class="spinner-border text-primary mt-3" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            `,
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true
        }).then(() => {
            Swal.fire({
                title: 'چت آنلاین',
                text: 'متاسفانه در حال حاضر پشتیبان آنلاین نداریم. لطفا از طریق فرم تماس پیام خود را ارسال کنید.',
                icon: 'info',
                confirmButtonText: 'باشه',
                confirmButtonColor: '#003366'
            });
        });
    };
    
    
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const question = this.textContent;
            
            
            Swal.fire({
                title: question,
                html: `
                    <div class="text-right">
                        <p>این یک پاسخ نمونه برای سوال متداول است.</p>
                        <p class="mt-3">برای اطلاعات بیشتر می‌توانید با ما تماس بگیرید.</p>
                    </div>
                `,
                icon: 'info',
                confirmButtonText: 'متوجه شدم',
                confirmButtonColor: '#003366',
                width: '600px'
            });
        });
    });
    
    
    const socialLinks = document.querySelectorAll('.social-media-links .social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const platform = this.className.split(' ').find(cls => 
                ['telegram', 'instagram', 'twitter', 'youtube'].includes(cls)
            );
            console.log('Social media click:', platform);
        });
    });
    
    
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            
            if (emailInput.value) {
                Swal.fire({
                    title: 'عضویت در خبرنامه',
                    text: 'ایمیل شما با موفقیت ثبت شد',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                });
                emailInput.value = '';
            }
        });
    }
    
    
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.contact-method-card, .sidebar-widget');
        
        elements.forEach((element, index) => {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible && !element.classList.contains('animated')) {
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                    element.classList.add('animated');
                }, index * 100);
            }
        });
    };
    
    
    document.querySelectorAll('.contact-method-card, .sidebar-widget').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
    
    

    

    
    if (messageTextarea) {
        const updateCharCount = () => {
            const charCount = messageTextarea.value.length;
            const charCountElement = messageTextarea.nextElementSibling;
            
            if (charCountElement && charCountElement.classList.contains('form-text')) {
                if (charCount < 10) {
                    charCountElement.innerHTML = `<span class="text-danger">حداقل ۱۰ کاراکتر (${charCount}/۱۰)</span>`;
                } else {
                    charCountElement.innerHTML = `<span class="text-success">${charCount} کاراکتر</span>`;
                }
            }
        };
        
        messageTextarea.addEventListener('input', updateCharCount);
    }
    
    
    const prioritySelect = document.querySelector('select[name="priority"]');
    if (prioritySelect) {
        prioritySelect.addEventListener('change', function() {
            this.className = 'form-select';
            if (this.value === 'high') {
                this.classList.add('border-warning');
            } else if (this.value === 'urgent') {
                this.classList.add('border-danger');
            }
        });
    }
});
