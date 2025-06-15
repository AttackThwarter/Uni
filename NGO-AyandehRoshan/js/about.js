document.addEventListener('DOMContentLoaded', function() {
    
    
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
    
    
    const progressBars = document.querySelectorAll('.progress-bar');
    
    const progressObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const targetWidth = progressBar.style.width;
                progressBar.style.width = '0%';
                
                setTimeout(() => {
                    progressBar.style.width = targetWidth;
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
    
    
    lightbox.option({
        'resizeDuration': 200,
        'wrapAround': true,
        'albumLabel': "تصویر %1 از %2",
        'fadeDuration': 300,
        'imageFadeDuration': 300,
        'positionFromTop': 50
    });
    
    
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.3 });
    
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
    
    
    const placeholderImages = {
        about: {
            main: 'https://via.placeholder.com/600x400/3498db/ffffff?text=انجمن+آینده+روشن',
            sub1: 'https://via.placeholder.com/150x100/2ecc71/ffffff?text=آموزش',
            sub2: 'https://via.placeholder.com/150x100/f1c40f/ffffff?text=حمایت'
        },
        gallery: [
            'https://via.placeholder.com/300x200/3498db/ffffff?text=جشن+کودک',
            'https://via.placeholder.com/300x200/2ecc71/ffffff?text=کلاس+آموزشی',
            'https://via.placeholder.com/300x200/f1c40f/ffffff?text=توزیع+لوازم',
            'https://via.placeholder.com/300x200/9b59b6/ffffff?text=ورزش',
            'https://via.placeholder.com/300x200/e74c3c/ffffff?text=هنر',
            'https://via.placeholder.com/300x200/1abc9c/ffffff?text=اردو',
            'https://via.placeholder.com/300x200/34495e/ffffff?text=افطاری',
            'https://via.placeholder.com/300x200/f39c12/ffffff?text=کلینیک'
        ]
    };
    
    
    const mainImage = document.querySelector('.main-image img');
    if (mainImage && !mainImage.src.includes('http')) {
        mainImage.src = placeholderImages.about.main;
    }
    
    const subImages = document.querySelectorAll('.sub-images img');
    subImages.forEach((img, index) => {
        if (!img.src.includes('http')) {
            img.src = index === 0 ? placeholderImages.about.sub1 : placeholderImages.about.sub2;
        }
    });
    
    
    const galleryImages = document.querySelectorAll('.gallery-item');
    galleryImages.forEach((item, index) => {
        const img = item.querySelector('img');
        if (img && !img.src.includes('http')) {
            img.src = placeholderImages.gallery[index] || placeholderImages.gallery[0];
            item.href = img.src;
        }
    });
    
    
    const pageHeader = document.querySelector('.page-header');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (pageHeader) {
            pageHeader.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
        }
    });
    
    
    const valueCards = document.querySelectorAll('.value-card');
    
    valueCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.value-icon i');
            icon.classList.add('fa-bounce');
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.value-icon i');
            icon.classList.remove('fa-bounce');
        });
    });
    
    
    if (pageHeader && !pageHeader.style.backgroundImage.includes('http')) {
        pageHeader.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://via.placeholder.com/1920x400/34495e/ffffff?text=درباره+ما')`;
    }
    
});
