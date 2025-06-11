




let isMenuOpen = false;
let isDarkMode = localStorage.getItem('darkMode') === 'true';


document.addEventListener('DOMContentLoaded', function() {
    initializeDarkMode();
    initializeMobileMenu();
    initializeScrollToTop();
    initializeStickyHeader();
    initializeFormValidation();
    initializeAnimations();
    initializeCounters();
    initializeTooltips();
});




function initializeDarkMode() {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    
    
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            isDarkMode = !isDarkMode;
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', isDarkMode);
            
            
            this.classList.add('rotate');
            setTimeout(() => {
                this.classList.remove('rotate');
            }, 300);
        });
    }
}




function initializeMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuClose = document.querySelector('.mobile-menu-close');
    const menuLinks = document.querySelectorAll('.mobile-menu-list a');
    
    if (menuToggle && mobileMenu) {
        
        menuToggle.addEventListener('click', function() {
            openMobileMenu();
        });
        
        
        menuClose.addEventListener('click', function() {
            closeMobileMenu();
        });
        
        
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                closeMobileMenu();
            });
        });
        
        
        document.addEventListener('click', function(e) {
            if (isMenuOpen && !mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                closeMobileMenu();
            }
        });
    }
}

function openMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    isMenuOpen = true;
    mobileMenu.style.display = 'block';
    setTimeout(() => {
        mobileMenu.classList.add('active');
    }, 10);
}

function closeMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    isMenuOpen = false;
    mobileMenu.classList.remove('active');
    setTimeout(() => {
        mobileMenu.style.display = 'none';
    }, 300);
}




function initializeScrollToTop() {
    const scrollBtn = document.querySelector('.scroll-to-top');
    
    if (scrollBtn) {
        
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollBtn.classList.add('visible');
            } else {
                scrollBtn.classList.remove('visible');
            }
        });
        
        
        scrollBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}




function initializeStickyHeader() {
    const header = document.querySelector('.site-header');
    let lastScroll = 0;
    
    if (header) {
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll <= 0) {
                header.classList.remove('scroll-up');
                return;
            }
            
            if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
                
                header.classList.remove('scroll-up');
                header.classList.add('scroll-down');
            } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
                
                header.classList.remove('scroll-down');
                header.classList.add('scroll-up');
            }
            
            lastScroll = currentScroll;
        });
    }
}




function initializeFormValidation() {
    const forms = document.querySelectorAll('.needs-validation');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            
            form.classList.add('was-validated');
        });
    });
}




function initializeAnimations() {
    
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, {
            threshold: 0.1
        });
        
        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }
}




function initializeCounters() {
    const counters = document.querySelectorAll('.counter');
    
    if (counters.length > 0 && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    animateCounter(counter, target);
                    observer.unobserve(counter);
                }
            });
        }, {
            threshold: 0.5
        });
        
        counters.forEach(counter => {
            observer.observe(counter);
        });
    }
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString('fa-IR');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString('fa-IR');
        }
    }, 30);
}




function initializeTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}




function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        
        images.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
}




function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type} notification-slide`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}




function toPersianDate(date) {
    return new Date(date).toLocaleDateString('fa-IR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}




function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('متن با موفقیت کپی شد!', 'success');
        }).catch(() => {
            showNotification('خطا در کپی متن', 'error');
        });
    }
}




const mobileMenuStyles = `
.mobile-menu {
    position: fixed;
    top: 0;
    right: -300px;
    width: 300px;
    height: 100vh;
    background: white;
    box-shadow: -5px 0 15px rgba(0,0,0,0.1);
    transition: right 0.3s ease;
    z-index: 2000;
    display: none;
}

.mobile-menu.active {
    right: 0;
}

.mobile-menu-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid #eee;
}

.mobile-menu-header img {
    width: 40px;
}

.mobile-menu-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
}

.mobile-menu-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.mobile-menu-list li {
    border-bottom: 1px solid #eee;
}

.mobile-menu-list a {
    display: block;
    padding: 1rem;
    color: #333;
    text-decoration: none;
    transition: all 0.3s ease;
}

.mobile-menu-list a:hover {
    background: #f8f9fa;
    color: var(--primary-blue);
}

.scroll-to-top {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    background: var(--primary-blue);
    color: white;
    border: none;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
}

.scroll-to-top.visible {
    opacity: 1;
    visibility: visible;
}

.scroll-to-top:hover {
    background: var(--primary-purple);
    transform: translateY(-3px);
}

.notification {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%) translateY(-100%);
    background: white;
    padding: 1rem 2rem;
    border-radius: 5px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    z-index: 3000;
    transition: all 0.3s ease;
}

.notification-success {
    border-right: 4px solid var(--success);
}

.notification-error {
    border-right: 4px solid var(--danger);
}

.site-header.scroll-down {
    transform: translateY(-100%);
}

.site-header.scroll-up {
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}
`;


const styleSheet = document.createElement('style');
styleSheet.textContent = mobileMenuStyles;
document.head.appendChild(styleSheet);
