

document.addEventListener('DOMContentLoaded', function() {
    
    
    const heroSwiper = new Swiper('.heroSwiper', {
        direction: 'horizontal',
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
    
    
    const sponsorsSwiper = new Swiper('.sponsors-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        breakpoints: {
            480: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 3,
            },
            992: {
                slidesPerView: 4,
            },
            1200: {
                slidesPerView: 5,
            }
        }
    });
    
    
    const counters = document.querySelectorAll('.counter');
    const speed = 200; 
    
    const countUp = (counter) => {
        const target = +counter.getAttribute('data-target');
        const increment = target / speed;
        
        const updateCount = () => {
            const count = +counter.innerText.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d));
            
            if (count < target) {
                counter.innerText = window.toPersianNumber(Math.ceil(count + increment));
                setTimeout(updateCount, 10);
            } else {
                counter.innerText = window.toPersianNumber(target);
                counter.classList.add('counting');
            }
        };
        
        updateCount();
    };
    
    
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                countUp(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counter.innerText = '۰';
        counterObserver.observe(counter);
    });
    
    
    const tickerContent = document.querySelector('.ticker-content');
    if (tickerContent) {
        const tickerItems = tickerContent.innerHTML;
        
        tickerContent.innerHTML = tickerItems + tickerItems + tickerItems;
    }
    
    
    const placeholderImages = {
        articles: [
            'images/articles/bazi.jpg',
            'images/articles/taghzie.webp',
            'images/articles/maharat.jpg'
        ],
        slider: [
            'images/slider/eshgh.webp',
            'images/slider/amoozash.jpg',
            'images/slider/salamat.jpg'
        ],
        sponsors: [
            'images/articles/sp1.jpg',
            'images/articles/sp2.gif.crdownload',
            'images/articles/sp3.png',
            'images/articles/sp4.png',
            'images/articles/sp5.png',
            'images/articles/sp6.png'
        ]
    };
    
    
    document.querySelectorAll('.article-image img').forEach((img, index) => {
        if (!img.src || img.src.includes('article')) {
            img.src = placeholderImages.articles[index] || placeholderImages.articles[0];
        }
    });
    
    document.querySelectorAll('.slide-content').forEach((slide, index) => {
        if (!slide.style.backgroundImage || slide.style.backgroundImage.includes('slide')) {
            slide.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${placeholderImages.slider[index]}')`;
        }
    });
    
    document.querySelectorAll('.sponsor-item img').forEach((img, index) => {
        if (!img.src || img.src.includes('sponsor')) {
            img.src = placeholderImages.sponsors[index] || placeholderImages.sponsors[0];
        }
    });
    
    
    const donateBtn = document.querySelector('.donate-btn');
    if (donateBtn) {
        donateBtn.addEventListener('click', function() {
            Swal.fire({
                title: 'کمک به کودکان',
                html: `
                    <p>شما می‌توانید از طریق روش‌های زیر به کودکان بی‌سرپرست کمک کنید:</p>
                    <div class="text-center mt-3">
                        <button class="btn btn-primary m-2" onclick="window.location.href='membership.html'">
                            <i class="fas fa-users"></i> عضویت در انجمن
                        </button>
                        <button class="btn btn-success m-2">
                            <i class="fas fa-credit-card"></i> کمک نقدی
                        </button>
                        <button class="btn btn-info m-2">
                            <i class="fas fa-gift"></i> کمک غیرنقدی
                        </button>
                    </div>
                `,
                showCloseButton: true,
                showConfirmButton: false,
                width: '600px'
            });
        });
    }
    
    
    const linkItems = document.querySelectorAll('.link-item');
    linkItems.forEach((link, index) => {
        link.style.animationDelay = `${index * 0.1}s`;
        link.classList.add('animate-fade-in-up');
    });
    
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroSlides = document.querySelectorAll('.slide-content');
        
        heroSlides.forEach(slide => {
            slide.style.transform = `translateY(${scrolled * 0.5}px)`;
        });
    });
    
});
