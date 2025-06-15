document.addEventListener('DOMContentLoaded', function() {
    
    
    const teamMembers = {
        1: {
            name: 'دکتر محمد رضایی',
            position: 'مدیرعامل و عضو هیئت مدیره',
            image: 'images/team/member1.jpg',
            email: 'm.rezaei@ayandehroshan.org',
            phone: '09121234567',
            linkedin: 'https://linkedin.com/in/mrezaei',
            education: [
                'دکترای مدیریت استراتژیک - دانشگاه تهران (۱۳۸۵)',
                'کارشناسی ارشد MBA - دانشگاه شریف (۱۳۸۰)',
                'کارشناسی مدیریت صنعتی - دانشگاه امیرکبیر (۱۳۷۷)'
            ],
            experience: [
                'مدیرعامل انجمن آینده روشن (۱۳۹۵ تاکنون)',
                'معاون اجرایی بنیاد کودک (۱۳۹۰-۱۳۹۵)',
                'مشاور مدیریت سازمان‌های غیردولتی (۱۳۸۵-۱۳۹۰)',
                'مدیر پروژه یونیسف ایران (۱۳۸۰-۱۳۸۵)'
            ],
            articles: [
                {
                    title: 'نقش NGOها در توسعه پایدار',
                    date: 'مهر ۱۴۰۲',
                    journal: 'فصلنامه توسعه اجتماعی'
                },
                {
                    title: 'مدیریت منابع انسانی در سازمان‌های خیریه',
                    date: 'تیر ۱۴۰۲',
                    journal: 'ماهنامه مدیریت'
                },
                {
                    title: 'الگوی بهینه تأمین مالی مؤسسات خیریه',
                    date: 'اسفند ۱۴۰۱',
                    journal: 'پژوهشنامه اقتصاد اجتماعی'
                }
            ]
        },
        2: {
            name: 'مهندس زهرا احمدی',
            position: 'قائم مقام مدیرعامل',
            image: 'images/team/member2.jpg',
            email: 'z.ahmadi@ayandehroshan.org',
            phone: '09123456789',
            linkedin: 'https://linkedin.com/in/zahmadi',
            education: [
                'کارشناسی ارشد مهندسی صنایع - دانشگاه صنعتی شریف (۱۳۸۸)',
                'کارشناسی مهندسی صنایع - دانشگاه علم و صنعت (۱۳۸۵)'
            ],
            experience: [
                'قائم مقام مدیرعامل انجمن آینده روشن (۱۳۹۸ تاکنون)',
                'مدیر برنامه‌ریزی استراتژیک انجمن (۱۳۹۴-۱۳۹۸)',
                'کارشناس ارشد برنامه‌ریزی سازمان بهزیستی (۱۳۸۸-۱۳۹۴)'
            ],
            articles: [
                {
                    title: 'بهینه‌سازی فرآیندهای عملیاتی در NGOها',
                    date: 'آبان ۱۴۰۲',
                    journal: 'نشریه مهندسی صنایع'
                },
                {
                    title: 'مدل‌سازی سیستم‌های پشتیبانی تصمیم',
                    date: 'شهریور ۱۴۰۲',
                    journal: 'کنفرانس ملی مدیریت'
                }
            ]
        },
        3: {
            name: 'حسین کریمی',
            position: 'مدیر امور مالی',
            image: 'images/team/member3.jpg',
            email: 'h.karimi@ayandehroshan.org',
            phone: '09124567890',
            linkedin: 'https://linkedin.com/in/hkarimi',
            education: [
                'حسابدار رسمی - جامعه حسابداران رسمی ایران (۱۳۹۰)',
                'کارشناسی ارشد حسابداری - دانشگاه علامه طباطبایی (۱۳۸۷)',
                'کارشناسی حسابداری - دانشگاه تهران (۱۳۸۴)'
            ],
            experience: [
                'مدیر امور مالی انجمن آینده روشن (۱۳۹۶ تاکنون)',
                'حسابرس ارشد مؤسسه حسابرسی مفید راهبر (۱۳۹۰-۱۳۹۶)',
                'مدیر مالی بنیاد نیکوکاری پارسیان (۱۳۸۷-۱۳۹۰)'
            ],
            articles: [
                {
                    title: 'شفافیت مالی در مؤسسات خیریه',
                    date: 'دی ۱۴۰۲',
                    journal: 'ماهنامه حسابدار'
                }
            ]
        },
        4: {
            name: 'دکتر فاطمه نوری',
            position: 'مدیر آموزش و پژوهش',
            image: 'images/team/member4.jpg',
            email: 'f.nouri@ayandehroshan.org',
            phone: '09125678901',
            linkedin: 'https://linkedin.com/in/fnouri',
            education: [
                'دکترای روانشناسی کودک - دانشگاه شهید بهشتی (۱۳۹۳)',
                'کارشناسی ارشد روانشناسی بالینی - دانشگاه تهران (۱۳۸۸)',
                'کارشناسی روانشناسی - دانشگاه الزهرا (۱۳۸۵)'
            ],
            experience: [
                'مدیر آموزش انجمن آینده روشن (۱۳۹۷ تاکنون)',
                'روانشناس کودک کلینیک مهر (۱۳۹۳-۱۳۹۷)',
                'پژوهشگر مرکز تحقیقات کودکان (۱۳۸۸-۱۳۹۳)'
            ],
            articles: [
                {
                    title: 'تأثیر محرومیت عاطفی بر رشد کودکان',
                    date: 'بهمن ۱۴۰۲',
                    journal: 'فصلنامه روانشناسی تحولی'
                },
                {
                    title: 'برنامه‌های مداخله زودهنگام در کودکان آسیب‌دیده',
                    date: 'مهر ۱۴۰۲',
                    journal: 'مجله روانشناسی کودک'
                }
            ]
        },
        5: {
            name: 'علی محمدی',
            position: 'مدیر روابط عمومی',
            image: 'images/team/member5.jpg',
            email: 'a.mohammadi@ayandehroshan.org',
            phone: '09126789012',
            linkedin: 'https://linkedin.com/in/amohammadi',
            education: [
                'کارشناسی ارشد علوم ارتباطات - دانشگاه علامه طباطبایی (۱۳۹۱)',
                'کارشناسی روابط عمومی - دانشگاه تهران (۱۳۸۸)'
            ],
            experience: [
                'مدیر روابط عمومی انجمن آینده روشن (۱۳۹۹ تاکنون)',
                'کارشناس روابط عمومی صندوق کودکان سازمان ملل (۱۳۹۴-۱۳۹۹)',
                'مدیر تبلیغات آژانس خلاق پارس (۱۳۹۱-۱۳۹۴)'
            ],
            articles: [
                {
                    title: 'نقش رسانه‌های اجتماعی در جذب حامیان',
                    date: 'آذر ۱۴۰۲',
                    journal: 'ماهنامه روابط عمومی'
                }
            ]
        },
        6: {
            name: 'سارا جعفری',
            position: 'مدیر امور خیرین و حامیان',
            image: 'images/team/member6.jpg',
            email: 's.jafari@ayandehroshan.org',
            phone: '09127890123',
            linkedin: 'https://linkedin.com/in/sjafari',
            education: [
                'کارشناسی ارشد مدیریت بازاریابی - دانشگاه تهران (۱۳۹۲)',
                'کارشناسی مدیریت بازرگانی - دانشگاه شهید بهشتی (۱۳۸۹)'
            ],
            experience: [
                'مدیر امور خیرین انجمن آینده روشن (۱۴۰۰ تاکنون)',
                'مدیر توسعه منابع بنیاد محک (۱۳۹۵-۱۴۰۰)',
                'کارشناس ارشد بازاریابی شرکت همراه اول (۱۳۹۲-۱۳۹۵)'
            ],
            articles: [
                {
                    title: 'استراتژی‌های نوین در جذب منابع خیریه',
                    date: 'اسفند ۱۴۰۲',
                    journal: 'فصلنامه مدیریت منابع'
                }
            ]
        }
    };
    
    
    window.showMemberDetails = function(memberId) {
        const member = teamMembers[memberId];
        if (!member) return;
        
        const detailsHTML = `
            <div class="member-detail-header">
                <div class="member-detail-image">
                    <img src="${member.image}" alt="${member.name}" onerror="this.src='https://via.placeholder.com/120/3498db/ffffff?text=${member.name.charAt(0)}'">
                </div>
                <div class="member-detail-info">
                    <h3>${member.name}</h3>
                    <p class="position">${member.position}</p>
                    <div class="contact-info">
                        <span><i class="fas fa-envelope"></i> ${member.email}</span>
                        <span><i class="fas fa-phone"></i> ${member.phone}</span>
                        <span><i class="fab fa-linkedin"></i> <a href="${member.linkedin}" target="_blank">LinkedIn</a></span>
                    </div>
                </div>
            </div>
            
            <div class="detail-section">
                <h4><i class="fas fa-graduation-cap text-primary"></i> تحصیلات</h4>
                <ul>
                    ${member.education.map(edu => `<li>${edu}</li>`).join('')}
                </ul>
            </div>
            
            <div class="detail-section">
                <h4><i class="fas fa-briefcase text-success"></i> سوابق کاری</h4>
                <ul>
                    ${member.experience.map(exp => `<li>${exp}</li>`).join('')}
                </ul>
            </div>
            
            <div class="detail-section">
                <h4><i class="fas fa-newspaper text-warning"></i> مقالات و پژوهش‌ها</h4>
                <div class="member-articles">
                    ${member.articles.map(article => `
                        <div class="article-item">
                            <div class="article-icon">
                                <i class="fas fa-file-alt"></i>
                            </div>
                            <div class="article-info">
                                <h5>${article.title}</h5>
                                <small>${article.journal} - ${article.date}</small>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        document.getElementById('memberDetails').innerHTML = detailsHTML;
        
        const modal = new bootstrap.Modal(document.getElementById('memberModal'));
        modal.show();
    };
    
    
    const placeholderImages = {
        members: [
            'images/team/mohammad.jpg',
            'images/team/zahra.jpg',
            'images/team/hossain.jpg'
        ],
        advisors: [
            'images/team/ahmad.png',
            'images/team/defult.png',
            'images/team/mohammad.png',
            'images/team/defult.png'
        ]
    };
    
    
    document.querySelectorAll('.team-card').forEach((card, index) => {
        const img = card.querySelector('.team-image img');
        if (img && !img.src.includes('http')) {
            img.src = placeholderImages.members[index] || placeholderImages.members[0];
        }
    });
    
    
    document.querySelectorAll('.advisor-card').forEach((card, index) => {
        const img = card.querySelector('.advisor-image img');
        if (img && !img.src.includes('http')) {
            img.src = placeholderImages.advisors[index] || placeholderImages.advisors[0];
        }
    });
    
    
    const socialLinks = document.querySelectorAll('.team-social a');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) rotate(360deg)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0deg)';
        });
    });
    
    
    // const pageHeader = document.querySelector('.page-header');
    // if (pageHeader && !pageHeader.style.backgroundImage.includes('http')) {
    //     pageHeader.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://via.placeholder.com/1920x400/2c3e50/ffffff?text=تیم+مدیریت')`;
    // }
    
});
