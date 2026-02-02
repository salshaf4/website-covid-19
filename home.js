// JavaScript khusus untuk halaman beranda

document.addEventListener('DOMContentLoaded', function() {
    // Scroll reveal animation
    function revealOnScroll() {
        const elements = document.querySelectorAll('.animate-left, .animate-right, .animate-up, .card-animate');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            // If element is in viewport
            if (elementTop < windowHeight - 100) {
                element.classList.add('animate-in');
                
                // For cards with delay
                if (element.classList.contains('card-animate')) {
                    const delay = element.getAttribute('data-delay') || 0;
                    element.style.transitionDelay = `${delay}s`;
                }
            }
        });
    }
    
    // Run on load and scroll
    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll);
    
    // Animate stats counters
    function animateCounters() {
        const counters = document.querySelectorAll('.hero-stat-number, .chart-value');
        const speed = 200; // Animation speed
        
        counters.forEach(counter => {
            const originalText = counter.textContent;
            let targetValue;
            
            // Parse the number from text
            if (originalText.includes('Juta')) {
                targetValue = parseFloat(originalText) * 1000000;
            } else if (originalText.includes('Ribu')) {
                targetValue = parseFloat(originalText) * 1000;
            } else {
                targetValue = parseFloat(originalText.replace(/[^0-9]/g, ''));
            }
            
            if (!isNaN(targetValue) && targetValue > 0) {
                const increment = targetValue / speed;
                let current = 0;
                
                const updateCount = () => {
                    current += increment;
                    if (current < targetValue) {
                        counter.textContent = formatNumber(Math.floor(current));
                        setTimeout(updateCount, 1);
                    } else {
                        counter.textContent = formatNumber(targetValue);
                    }
                };
                
                updateCount();
            }
        });
    }
    
    // Format number with commas
    function formatNumber(num) {
        if (num >= 1000000000) {
            return (num / 1000000000).toFixed(1) + 'M';
        }
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + ' Juta';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + ' Ribu';
        }
        return num.toLocaleString('id-ID');
    }
    
    // Animate chart bars on scroll
    function animateChartOnScroll() {
        const chartSection = document.querySelector('.stats-section');
        if (!chartSection) return;
        
        const sectionTop = chartSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight - 100) {
            // Animate chart bars
            const bars = document.querySelectorAll('.chart-bar');
            bars.forEach(bar => {
                const height = bar.style.height;
                bar.style.height = '0%';
                
                setTimeout(() => {
                    bar.style.height = height;
                }, 300);
            });
            
            // Animate counters
            setTimeout(animateCounters, 500);
            
            // Remove listener after animation
            window.removeEventListener('scroll', animateChartOnScroll);
        }
    }
    
    // Scroll to important section
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const pentingSection = document.getElementById('penting');
            if (pentingSection) {
                window.scrollTo({
                    top: pentingSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Phone number click effects
    const phoneNumbers = document.querySelectorAll('.contact-number');
    phoneNumbers.forEach(number => {
        number.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add visual feedback
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'pulse 2s infinite';
            }, 10);
            
            // Log the call attempt
            const phone = this.getAttribute('href').replace('tel:', '');
            console.log('Calling:', phone);
            
            // In real implementation, this would initiate a phone call
            // window.location.href = `tel:${phone}`;
        });
    });
    
    // Initialize
    function init() {
        // Initial reveal
        setTimeout(revealOnScroll, 100);
        
        // Setup scroll listeners
        window.addEventListener('scroll', animateChartOnScroll);
        
        // Initial chart animation check
        setTimeout(animateChartOnScroll, 300);
    }
    
    init();
});