
document.addEventListener('DOMContentLoaded', function() {
    
    
    if (typeof $ !== 'undefined' && $.fn.select2) {
        $('.select2-multiple').select2({
            placeholder: 'انتخاب کنید',
            dir: 'rtl',
            language: {
                noResults: function() {
                    return 'نتیجه‌ای یافت نشد';
                }
            }
        });
    }
    
    
    window.selectMembership = function(type) {
        const membershipSelect = document.getElementById('membershipTypeSelect');
        if (membershipSelect) {
            membershipSelect.value = type;
            membershipSelect.dispatchEvent(new Event('change'));
            
            
            document.querySelector('.registration-section').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            
            Swal.fire({
                title: 'نوع عضویت انتخاب شد',
                text: 'لطفا فرم ثبت‌نام را تکمیل کنید',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false
            });
        }
    };
    
    
    const membershipTypeSelect = document.getElementById('membershipTypeSelect');
    const sponsorshipAmountDiv = document.getElementById('sponsorshipAmount');
    
    if (membershipTypeSelect) {
        membershipTypeSelect.addEventListener('change', function() {
            if (this.value === 'sponsor') {
                sponsorshipAmountDiv.style.display = 'block';
            } else {
                sponsorshipAmountDiv.style.display = 'none';
            }
        });
    }
    
    
    const membershipForm = document.getElementById('membershipForm');
    
    if (membershipForm) {
        membershipForm.addEventListener('submit', function(event) {
            event.preventDefault();
            event.stopPropagation();
            
            if (this.checkValidity()) {
                
                this.classList.add('form-loading');
                
                
                setTimeout(() => {
                    
                    this.classList.remove('form-loading');
                    
                    
                    Swal.fire({
                        title: 'ثبت‌نام موفق',
                        html: `
                            <div class="text-center">
                                <i class="fas fa-check-circle text-success" style="font-size: 4rem; margin-bottom: 20px;"></i>
                                <p>درخواست عضویت شما با موفقیت ثبت شد.</p>
                                <p>کد پیگیری: <strong>AR-${Math.floor(Math.random() * 900000) + 100000}</strong></p>
                                <p class="text-muted mt-3">همکاران ما به زودی با شما تماس خواهند گرفت.</p>
                            </div>
                        `,
                        icon: null,
                        confirmButtonText: 'باشه',
                        confirmButtonColor: '#003366'
                    }).then(() => {
                        
                        this.reset();
                        this.classList.remove('was-validated');
                        
                        
                        $('.select2-multiple').val(null).trigger('change');
                        
                        
                        window.scrollTo({
                            top: 0,
                            behavior: 'smooth'
                        });
                    });
                }, 2000);
            }
            
            this.classList.add('was-validated');
        });
    }
    
    
    const nationalIdInput = document.querySelector('input[name="nationalId"]');
    if (nationalIdInput) {
        nationalIdInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9]/g, '').substring(0, 10);
        });
    }
    
    
    const mobileInput = document.querySelector('input[name="mobile"]');
    if (mobileInput) {
        mobileInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9]/g, '').substring(0, 11);
        });
    }
    
    
    const persianDateInputs = document.querySelectorAll('.persian-date');
    persianDateInputs.forEach(input => {
        input.addEventListener('focus', function() {
            
            this.placeholder = '۱۳۷۰/۰۱/۰۱';
        });
    });
    
    
    const provinces = {
        tehran: ['تهران', 'ری', 'شمیرانات', 'اسلامشهر', 'ورامین'],
        isfahan: ['اصفهان', 'کاشان', 'خمینی‌شهر', 'نجف‌آباد', 'شاهین‌شهر'],
        fars: ['شیراز', 'مرودشت', 'کازرون', 'لار', 'فسا'],
        khorasan: ['مشهد', 'نیشابور', 'سبزوار', 'قوچان', 'تربت حیدریه'],
        azerbaijan: ['تبریز', 'مراغه', 'میانه', 'اهر', 'مرند']
    };
    
    
    const provinceSelect = document.getElementById('provinceSelect');
    if (provinceSelect) {
        provinceSelect.addEventListener('change', function() {
            const selectedProvince = this.value;
            if (selectedProvince && provinces[selectedProvince]) {
                
                console.log('Cities:', provinces[selectedProvince]);
            }
        });
    }
    
    
    const monthlyAmountSelect = document.querySelector('select[name="monthlyAmount"]');
    if (monthlyAmountSelect) {
        monthlyAmountSelect.addEventListener('change', function() {
            if (this.value === 'custom') {
                Swal.fire({
                    title: 'مبلغ دلخواه',
                    input: 'number',
                    inputLabel: 'مبلغ ماهانه (تومان)',
                    inputPlaceholder: 'مثال: 300000',
                    showCancelButton: true,
                    confirmButtonText: 'تایید',
                    cancelButtonText: 'انصراف',
                    confirmButtonColor: '#003366',
                    inputValidator: (value) => {
                        if (!value || value < 50000) {
                            return 'حداقل مبلغ 50,000 تومان است';
                        }
                    }
                }).then((result) => {
                    if (result.isConfirmed) {
                        
                        const formattedAmount = new Intl.NumberFormat('fa-IR').format(result.value);
                        console.log('Custom amount:', formattedAmount);
                    } else {
                        this.value = '';
                    }
                });
            }
        });
    }
    
    
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.membership-card, .benefit-card');
        
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
    
    
    document.querySelectorAll('.membership-card, .benefit-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
    
    
    const termsLink = document.querySelector('[data-bs-target="#termsModal"]');
    if (termsLink) {
        termsLink.addEventListener('click', function(e) {
            e.preventDefault();
            const termsModal = new bootstrap.Modal(document.getElementById('termsModal'));
            termsModal.show();
        });
    }
    
    
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
    
    

    
    
    const interestCheckboxes = document.querySelectorAll('input[name="interests[]"]');
    let selectedInterests = [];
    
    interestCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                selectedInterests.push(this.value);
            } else {
                selectedInterests = selectedInterests.filter(interest => interest !== this.value);
            }
            
            
            if (selectedInterests.length > 0) {
                
                console.log('Selected interests:', selectedInterests);
            }
        });
    });
    
    
    const requiredFields = document.querySelectorAll('.required');
    requiredFields.forEach(field => {
        field.setAttribute('title', 'این فیلد الزامی است');
    });
    
    
    let autoSaveTimer;
    const formInputs = membershipForm ? membershipForm.querySelectorAll('input, select, textarea') : [];
    
    formInputs.forEach(input => {
        input.addEventListener('input', function() {
            clearTimeout(autoSaveTimer);
            autoSaveTimer = setTimeout(() => {
                
                console.log('Auto-saving draft...');
            }, 2000);
        });
    });
});
