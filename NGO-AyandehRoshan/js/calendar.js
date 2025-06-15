
document.addEventListener('DOMContentLoaded', function() {
    
    
    const events = {
        1: {
            title: 'کارگاه نقاشی کودکان',
            date: '۱۴۰۴/۰۳/۱۵',
            time: '۱۰:۰۰ - ۱۲:۰۰',
            location: 'سالن اصلی انجمن',
            capacity: 30,
            registered: 22,
            description: 'کارگاه آموزش نقاشی برای کودکان ۷ تا ۱۲ سال با حضور مربیان مجرب',
            requirements: ['همراه داشتن لباس مناسب', 'ثبت‌نام قبلی الزامی']
        },
        2: {
            title: 'جشن روز کودک',
            date: '۱۴۰۴/۰۳/۲۲',
            time: '۱۶:۰۰ - ۲۰:۰۰',
            location: 'پارک شهر',
            capacity: 100,
            registered: 67,
            description: 'جشن بزرگ روز کودک با اجرای برنامه‌های متنوع و شاد',
            requirements: ['رایگان برای همه کودکان', 'همراهی والدین']
        },
        3: {
            title: 'مسابقه کتابخوانی',
            date: '۱۴۰۴/۰۴/۰۵',
            time: '۱۴:۰۰ - ۱۷:۰۰',
            location: 'کتابخانه انجمن',
            capacity: 50,
            registered: 38,
            description: 'مسابقه کتابخوانی برای نوجوانان با جوایز ارزنده',
            requirements: ['گروه سنی ۱۳-۱۸ سال', 'مطالعه کتاب معرفی شده']
        },
        4: {
            title: 'کمپ تابستانی',
            date: '۱۴۰۴/۰۴/۲۰',
            time: 'سه روزه',
            location: 'اردوگاه آیت',
            capacity: 40,
            registered: 35,
            description: 'اردوی سه روزه با برنامه‌های آموزشی و تفریحی',
            requirements: ['رضایت‌نامه والدین', 'تجهیزات شخصی کمپینگ']
        }
    };
    
    
    window.showEventDetails = function(eventId) {
        const event = events[eventId];
        if (!event) return;
        
        const modalBody = document.querySelector('#eventModal .modal-body');
        const remainingCapacity = event.capacity - event.registered;
        
        modalBody.innerHTML = `
            <div class="event-detail-header mb-4">
                <h5 class="text-primary">${event.title}</h5>
                <div class="d-flex flex-wrap gap-3 mt-3">
                    <span><i class="fas fa-calendar"></i> ${event.date}</span>
                    <span><i class="fas fa-clock"></i> ${event.time}</span>
                    <span><i class="fas fa-map-marker-alt"></i> ${event.location}</span>
                </div>
            </div>
            
            <div class="mb-4">
                <h6>توضیحات برنامه:</h6>
                <p>${event.description}</p>
            </div>
            
            <div class="mb-4">
                <h6>ظرفیت:</h6>
                <div class="progress mb-2" style="height: 25px;">
                    <div class="progress-bar bg-success" role="progressbar" 
                         style="width: ${(event.registered / event.capacity) * 100}%">
                        ${event.registered} نفر ثبت‌نام شده
                    </div>
                    <div class="progress-bar bg-light text-dark" role="progressbar" 
                         style="width: ${(remainingCapacity / event.capacity) * 100}%">
                        ${remainingCapacity} جای خالی
                    </div>
                </div>
            </div>
            
            <div class="mb-4">
                <h6>شرایط شرکت:</h6>
                <ul>
                    ${event.requirements.map(req => `<li>${req}</li>`).join('')}
                </ul>
            </div>
            
            ${remainingCapacity > 0 ? `
            <div class="registration-form">
                <h6>فرم ثبت‌نام:</h6>
                <form id="eventRegistrationForm">
                    <div class="mb-3">
                        <input type="text" class="form-control" placeholder="نام و نام خانوادگی" required>
                    </div>
                    <div class="mb-3">
                        <input type="tel" class="form-control" placeholder="شماره تماس" required>
                    </div>
                    <div class="mb-3">
                        <input type="number" class="form-control" placeholder="سن شرکت‌کننده" required>
                    </div>
                    <button type="button" class="btn btn-primary" onclick="registerForEvent(${eventId})">
                        ثبت‌نام در برنامه
                    </button>
                </form>
            </div>
            ` : `
            <div class="alert alert-warning">
                <i class="fas fa-info-circle"></i> متأسفانه ظرفیت این برنامه تکمیل شده است.
            </div>
            `}
        `;
        
        const modal = new bootstrap.Modal(document.getElementById('eventModal'));
        modal.show();
    };
    
    
    window.registerForEvent = function(eventId) {
        Swal.fire({
            title: 'ثبت‌نام شما با موفقیت انجام شد',
            text: 'اطلاعات تکمیلی از طریق پیامک ارسال خواهد شد.',
            icon: 'success',
            confirmButtonText: 'باشه'
        }).then(() => {
            bootstrap.Modal.getInstance(document.getElementById('eventModal')).hide();
        });
    };
    
    
    function initializeCalendar(elementId) {
        const calendarEl = document.getElementById(elementId);
        if (!calendarEl) return;
        
        const calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,dayGridWeek'
            },
            locale: 'fa',
            direction: 'rtl',
            events: [
                {
                    title: 'کارگاه نقاشی کودکان',
                    start: '2025-06-05',
                    className: 'event-workshop'
                },
                {
                    title: 'جشن روز کودک',
                    start: '2025-06-12',
                    className: 'event-celebration'
                },
                {
                    title: 'مسابقه کتابخوانی',
                    start: '2025-06-26',
                    className: 'event-competition'
                },
                {
                    title: 'کمپ تابستانی',
                    start: '2025-07-11',
                    end: '2025-07-14',
                    className: 'event-camp'
                },
                {
                    title: 'کارگاه خلاقیت',
                    start: '2025-06-15',
                    className: 'event-workshop'
                },
                {
                    title: 'تئاتر کودک',
                    start: '2025-06-20',
                    className: 'event-theater'
                },
                {
                    title: 'المپیاد ورزشی',
                    start: '2025-06-28',
                    className: 'event-sport'
                },
                {
                    title: 'جشنواره غذای سالم',
                    start: '2025-07-02',
                    className: 'event-festival'
                }
            ],
            eventClick: function(info) {
                
                const eventTitle = info.event.title;
                const eventId = Object.keys(events).find(key => events[key].title === eventTitle);
                if (eventId) {
                    showEventDetails(eventId);
                } else {
                    Swal.fire({
                        title: info.event.title,
                        text: 'برای اطلاعات بیشتر با ما تماس بگیرید',
                        icon: 'info',
                        confirmButtonText: 'باشه'
                    });
                }
            }
        });
        
        calendar.render();
        return calendar;
    }
    
    
    const calendarTab = document.querySelector('button[data-bs-target="#calendar-view"]');
    if (calendarTab) {
        let mainCalendar = null;
        calendarTab.addEventListener('shown.bs.tab', function (e) {
            
            if (!mainCalendar) {
                setTimeout(() => {
                    mainCalendar = initializeCalendar('calendar');
                }, 100);
            }
        });
    }
    
    
    setTimeout(() => {
        initializeCalendar('calendar-bottom');
    }, 500);
    
    
    window.applyFilters = function() {
        const eventType = document.getElementById('eventType').value;
        const ageGroup = document.getElementById('ageGroup').value;
        const location = document.getElementById('location').value;
        
        console.log('Filters applied:', { eventType, ageGroup, location });
        
    };
    
    
    window.resetFilters = function() {
        document.getElementById('eventType').value = '';
        document.getElementById('ageGroup').value = '';
        document.getElementById('location').value = '';
        
        console.log('Filters reset');
    };
    
    
    function countUp(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current).toLocaleString('fa-IR');
        }, 16);
    }
    
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                countUp(counter, target);
                counterObserver.unobserve(counter);
            }
        });
    });
    
    document.querySelectorAll('.counter').forEach(counter => {
        counterObserver.observe(counter);
    });
    
    
    document.querySelectorAll('img').forEach(img => {
        if (img.src.includes('event')) {
            img.src = `https://via.placeholder.com/400x250/FF6B6B/FFFFFF?text=رویداد+${Math.floor(Math.random() * 10) + 1}`;
        }
        if (img.src.includes('gallery')) {
            img.src = `https://via.placeholder.com/300x200/4ECDC4/FFFFFF?text=گالری+${Math.floor(Math.random() * 10) + 1}`;
        }
    });
    
    
    // const pageHeader = document.querySelector('.page-header');
    // if (pageHeader && !pageHeader.style.backgroundImage) {
    //     pageHeader.style.backgroundImage = 'url(https://via.placeholder.com/1920x400/95E1D3/FFFFFF?text=تقویم+برنامه‌ها)';
    // }
    
    
    function toPersianDate(gregorianDate) {
        const months = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
        const date = new Date(gregorianDate);
        const month = date.getMonth();
        const day = date.getDate();
        return `${day} ${months[month]} ۱۴۰۴`;
    }
});

