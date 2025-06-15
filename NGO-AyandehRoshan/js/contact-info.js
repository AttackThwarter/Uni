
document.addEventListener('DOMContentLoaded', function() {
    
    
    let map;
    let markers = [];
    let branchesData = {
        tehran: {
            coords: [35.6892, 51.3890],
            name: 'دفتر مرکزی تهران',
            address: 'تهران، خیابان ولیعصر، بالاتر از میدان ولیعصر، کوچه شهید احمدی، پلاک ۱۲۳',
            phone: '۰۲۱-۱۲۳۴۵۶۷۸'
        },
        isfahan: {
            coords: [32.6546, 51.6680],
            name: 'شعبه اصفهان',
            address: 'اصفهان، خیابان چهارباغ، کوچه گلستان',
            phone: '۰۳۱-۳۲۲۲۳۳۴۴'
        },
        shiraz: {
            coords: [29.5918, 52.5836],
            name: 'شعبه شیراز',
            address: 'شیراز، بلوار زند، نبش کوچه ۱۵',
            phone: '۰۷۱-۳۶۳۶۳۷۳۸'
        },
        mashhad: {
            coords: [36.2605, 59.6168],
            name: 'شعبه مشهد',
            address: 'مشهد، بلوار سجاد، میدان احمدآباد',
            phone: '۰۵۱-۳۷۶۵۴۳۲۱'
        },
        tabriz: {
            coords: [38.0962, 46.2738],
            name: 'شعبه تبریز',
            address: 'تبریز، خیابان امام، کوی ولیعصر',
            phone: '۰۴۱-۳۳۳۳۴۴۵۵'
        }
    };
    
    function initializeMap() {
        
        const iranCenter = [32.4279, 53.6880];
        
        
        map = L.map('map').setView(iranCenter, 6);
        
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19
        }).addTo(map);
        
        
        const mainOfficeIcon = L.divIcon({
            html: '<i class="fas fa-building" style="color: #003366; font-size: 24px;"></i>',
            iconSize: [30, 30],
            className: 'custom-div-icon'
        });
        
        
        const branchIcon = L.divIcon({
            html: '<i class="fas fa-map-marker-alt" style="color: #FF6B6B; font-size: 20px;"></i>',
            iconSize: [25, 25],
            className: 'custom-div-icon'
        });
        
        
        const mainOfficeMarker = L.marker(branchesData.tehran.coords, {icon: mainOfficeIcon}).addTo(map);
        mainOfficeMarker.bindPopup(`
            <div style="text-align: center; font-family: Vazirmatn; direction: rtl;">
                <h5 style="color: #003366; margin-bottom: 10px;">${branchesData.tehran.name}</h5>
                <p style="margin: 5px 0;"><i class="fas fa-map-marker-alt"></i> ${branchesData.tehran.address}</p>
                <p style="margin: 5px 0;"><i class="fas fa-phone"></i> ${branchesData.tehran.phone}</p>
                <button class="btn btn-sm btn-primary mt-2" onclick="getDirections(${branchesData.tehran.coords[0]}, ${branchesData.tehran.coords[1]})">
                    <i class="fas fa-directions"></i> مسیریابی
                </button>
            </div>
        `, {maxWidth: 300});
        
        markers.push(mainOfficeMarker);
        
        
        Object.keys(branchesData).forEach(city => {
            if (city !== 'tehran') {
                const branch = branchesData[city];
                const branchMarker = L.marker(branch.coords, {icon: branchIcon}).addTo(map);
                branchMarker.bindPopup(`
                    <div style="text-align: center; font-family: Vazirmatn; direction: rtl;">
                        <h6 style="color: #003366; margin-bottom: 10px;">${branch.name}</h6>
                        <p style="margin: 5px 0; font-size: 0.9em;"><i class="fas fa-map-marker-alt"></i> ${branch.address}</p>
                        <p style="margin: 5px 0; font-size: 0.9em;"><i class="fas fa-phone"></i> ${branch.phone}</p>
                        <button class="btn btn-sm btn-primary mt-2" onclick="getDirections(${branch.coords[0]}, ${branch.coords[1]})">
                            <i class="fas fa-directions"></i> مسیریابی
                        </button>
                    </div>
                `, {maxWidth: 250});
                markers.push(branchMarker);
            }
        });
        
        
        L.control.zoom({
            position: 'bottomleft',
            zoomInTitle: 'بزرگنمایی',
            zoomOutTitle: 'کوچک‌نمایی'
        }).addTo(map);
        
        
        const resetViewControl = L.Control.extend({
            options: {
                position: 'topleft'
            },
            onAdd: function(map) {
                const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
                container.innerHTML = '<a href="#" title="نمایش کل ایران" style="width: 34px; height: 34px; line-height: 34px; text-align: center; display: block;"><i class="fas fa-home"></i></a>';
                container.onclick = function(e) {
                    e.preventDefault();
                    map.setView(iranCenter, 6);
                };
                return container;
            }
        });
        
        map.addControl(new resetViewControl());
        
        
        L.control.scale({
            position: 'bottomright',
            metric: true,
            imperial: false
        }).addTo(map);
    }
    
    
    if (document.getElementById('map')) {
        initializeMap();
    }
    
    
    window.showBranchOnMap = function(lat, lng) {
        if (map) {
            
            map.flyTo([lat, lng], 13, {
                duration: 2
            });
            
            
            markers.forEach(marker => {
                const markerLatLng = marker.getLatLng();
                if (Math.abs(markerLatLng.lat - lat) < 0.001 && Math.abs(markerLatLng.lng - lng) < 0.001) {
                    marker.openPopup();
                }
            });
            
            
            document.getElementById('map-section').scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    };
    
    
    window.openInGoogleMaps = function() {
        const lat = branchesData.tehran.coords[0];
        const lng = branchesData.tehran.coords[1];
        const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
        window.open(url, '_blank');
    };
    
    
    window.getDirections = function(lat, lng) {
        const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
        window.open(url, '_blank');
    };
    
    
    document.querySelectorAll('.branch-card button').forEach((button, index) => {
        const cities = ['isfahan', 'shiraz', 'mashhad', 'tabriz'];
        if (cities[index]) {
            const branch = branchesData[cities[index]];
            button.setAttribute('onclick', `showBranchOnMap(${branch.coords[0]}, ${branch.coords[1]})`);
        }
    });
    
    
    window.startChat = function() {
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
                html: `
                    <div class="chat-simulation">
                        <div class="chat-message support">
                            <p>سلام! من مریم هستم، چطور می‌تونم کمکتون کنم؟</p>
                        </div>
                        <input type="text" class="form-control mt-3" placeholder="پیام خود را بنویسید..." id="chatInput">
                    </div>
                `,
                confirmButtonText: 'ارسال',
                confirmButtonColor: '#003366',
                showCancelButton: true,
                cancelButtonText: 'بستن'
            });
        });
    };
    
    
    window.bookVideoCall = function() {
        Swal.fire({
            title: 'رزرو مشاوره ویدئویی',
            html: `
                <form id="videoCallForm">
                    <div class="mb-3">
                        <label class="form-label">نام و نام خانوادگی</label>
                        <input type="text" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">شماره تماس</label>
                        <input type="tel" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">موضوع مشاوره</label>
                        <select class="form-select">
                            <option>عضویت و همکاری</option>
                            <option>کمک‌های مالی</option>
                            <option>حمایت از کودکان</option>
                            <option>سایر موضوعات</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">تاریخ مورد نظر</label>
                        <input type="date" class="form-control" required>
                    </div>
                </form>
            `,
            confirmButtonText: 'ثبت درخواست',
            confirmButtonColor: '#003366',
            showCancelButton: true,
            cancelButtonText: 'انصراف',
            preConfirm: () => {
                
                const form = document.getElementById('videoCallForm');
                if (!form.checkValidity()) {
                    Swal.showValidationMessage('لطفا همه فیلدها را تکمیل کنید');
                    return false;
                }
                return true;
            }
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'درخواست ثبت شد',
                    text: 'همکاران ما به زودی برای هماهنگی زمان مشاوره با شما تماس خواهند گرفت',
                    icon: 'success',
                    confirmButtonText: 'باشه',
                    confirmButtonColor: '#003366'
                });
            }
        });
    };
    
    
    const contactNumbers = document.querySelectorAll('.contact-numbers p, .email-list p');
    contactNumbers.forEach(element => {
        element.addEventListener('click', function() {
            const text = this.innerText;
            const value = text.split(':')[1].trim();
            
            navigator.clipboard.writeText(value).then(() => {
                
                const originalHtml = this.innerHTML;
                this.innerHTML = '<span class="text-success"><i class="fas fa-check"></i> کپی شد!</span>';
                
                setTimeout(() => {
                    this.innerHTML = originalHtml;
                }, 2000);
            });
        });
    });
    
    
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.info-card, .branch-card, .access-card');
        
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
    
    
    document.querySelectorAll('.info-card, .branch-card, .access-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
    
    
    function checkIfOpen() {
        const now = new Date();
        const day = now.getDay();
        const hour = now.getHours();
        const minute = now.getMinutes();
        const time = hour + (minute / 60);
        
        let isOpen = false;
        let message = '';
        
        
        if (day >= 6 || day === 5) { 
            if (day === 5) { 
                isOpen = time >= 8.5 && time < 13;
                message = isOpen ? 'باز است (تا ساعت ۱:۰۰)' : 'تعطیل است';
            } else {
                message = 'تعطیل است (آخر هفته)';
            }
        } else { 
            isOpen = time >= 8.5 && time < 17;
            message = isOpen ? 'باز است (تا ساعت ۵:۰۰)' : 'تعطیل است';
        }
        
        
        const statusElement = document.createElement('div');
        statusElement.className = `office-status ${isOpen ? 'open' : 'closed'}`;
        statusElement.innerHTML = `
            <i class="fas fa-circle"></i> دفتر مرکزی: ${message}
        `;
        
        
        const pageHeader = document.querySelector('.page-header .container');
        if (pageHeader && !document.querySelector('.office-status')) {
            pageHeader.appendChild(statusElement);
        }
    }
    
    checkIfOpen();
    
    
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
    
    
    const pageHeader = document.querySelector('.page-header');
    if (pageHeader && !pageHeader.style.backgroundImage.includes('contact-info-header.jpg')) {
        pageHeader.style.backgroundImage = 'linear-gradient(rgba(0, 51, 102, 0.8), rgba(0, 51, 102, 0.8)), url("https://picsum.photos/1920/400?random=location")';
    }
    
    const workingHoursImg = document.querySelector('img[src*="working-hours.svg"]');
    if (workingHoursImg) {
        workingHoursImg.src = 'https://picsum.photos/600/400?random=hours';
    }
    
    
    const style = document.createElement('style');
    style.textContent = `
        .office-status {
            position: absolute;
            bottom: 20px;
            right: 20px;
            background: rgba(255, 255, 255, 0.9);
            padding: 10px 20px;
            border-radius: 25px;
            font-size: 0.9rem;
            font-weight: 600;
            z-index: 1000;
        }
        
        .office-status.open {
            color: #28a745;
        }
        
        .office-status.closed {
            color: #dc3545;
        }
        
        .office-status i {
            font-size: 0.6rem;
            margin-left: 5px;
        }
        
        .chat-simulation {
            text-align: right;
        }
        
        .chat-message {
            padding: 10px 15px;
            border-radius: 15px;
            margin-bottom: 10px;
            max-width: 80%;
        }
        
        .chat-message.support {
            background: #e3f2fd;
            margin-right: 0;
        }
        
        .custom-div-icon {
            background: transparent;
            border: none;
        }
        
        .leaflet-popup-content {
            font-family: Vazirmatn !important;
        }
        
        .leaflet-control-custom {
            background-color: white;
            box-shadow: 0 1px 5px rgba(0,0,0,0.4);
        }
        
        .leaflet-control-custom a {
            color: #333;
        }
        
        .leaflet-control-custom a:hover {
            background-color: #f4f4f4;
            color: var(--primary-color);
        }
    `;
    document.head.appendChild(style);
});
