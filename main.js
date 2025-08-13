// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    mobileNav.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.mobile-nav a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        mobileNav.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileMenuBtn.classList.remove('active');
        mobileNav.classList.remove('active');
    }
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll animation for sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Animated Counter for Statistics
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;

        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    });
};

// Stats observer
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.getElementById('stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// FAQ Toggle
document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        // Close other FAQ items
        document.querySelectorAll('.faq-item').forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });

        // Toggle current item
        item.classList.toggle('active');
    });
});

// Form submission
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Show loading state
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'جاري الإرسال...';
    submitBtn.disabled = true;

    // Simulate sending (replace with actual form handling)
    setTimeout(() => {
        // Create success message
        const successMessage = document.createElement('div');
        successMessage.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: linear-gradient(45deg, #00f5ff, #ff00ff);
                    color: white;
                    padding: 30px 50px;
                    border-radius: 15px;
                    font-size: 18px;
                    font-weight: bold;
                    z-index: 10000;
                    text-align: center;
                    box-shadow: 0 20px 40px rgba(0, 245, 255, 0.3);
                    animation: slideIn 0.5s ease-out;
                `;
        successMessage.innerHTML = `
                    <div style="font-size: 2rem; margin-bottom: 10px;">✅</div>
                    <div>تم إرسال رسالتك بنجاح!</div>
                    <div style="font-size: 14px; margin-top: 10px; opacity: 0.9;">سأتواصل معك في أقرب وقت ممكن</div>
                `;

        document.body.appendChild(successMessage);

        // Remove message after 4 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 4000);

        // Reset form and button
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// Add slide in animation
const style = document.createElement('style');
style.textContent = `
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(0.8);
                }
                to {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1);
                }
            }
        `;
document.head.appendChild(style);

// Add smooth reveal animation for timeline items
const timelineItems = document.querySelectorAll('.experience-item');
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationDelay = `${Array.from(timelineItems).indexOf(entry.target) * 0.3}s`;
            entry.target.style.animationFillMode = 'forwards';
        }
    });
}, { threshold: 0.3 });

timelineItems.forEach(item => {
    timelineObserver.observe(item);
});

// Parallax effect for floating shapes
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.1;
        shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
});

// Add typing effect to hero title
const heroTitle = document.querySelector('.hero h1');
const titleText = heroTitle.textContent;
heroTitle.textContent = '';

let i = 0;
const typeWriter = () => {
    if (i < titleText.length) {
        heroTitle.textContent += titleText.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
};

// Start typing effect after page load
window.addEventListener('load', () => {
    setTimeout(typeWriter, 1000);
});

// Video play button functionality
document.querySelectorAll('.play-button').forEach(button => {
    button.addEventListener('click', () => {
        // Create modal for video
        const modal = document.createElement('div');
        modal.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.9);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10000;
                    cursor: pointer;
                `;

        modal.innerHTML = `
                    <div style="color: white; text-align: center; font-size: 2rem;">
                        <div style="margin-bottom: 20px;">🎥</div>
                        <div>الفيديو غير متوفر حالياً</div>
                        <div style="font-size: 1rem; margin-top: 10px; opacity: 0.7;">انقر للإغلاق</div>
                    </div>
                `;

        document.body.appendChild(modal);

        modal.addEventListener('click', () => {
            modal.remove();
        });

        setTimeout(() => {
            modal.remove();
        }, 3000);
    });
});

// Gallery item interactions
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
        // Add click effect
        item.style.transform = 'scale(0.95)';
        setTimeout(() => {
            item.style.transform = 'scale(1.05)';
        }, 150);
    });
});

// Service button interactions
document.querySelectorAll('.service-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();

        // Create notification
        const notification = document.createElement('div');
        notification.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: linear-gradient(45deg, #00f5ff, #ff00ff);
                    color: white;
                    padding: 15px 25px;
                    border-radius: 10px;
                    font-weight: bold;
                    z-index: 10000;
                    animation: slideInRight 0.5s ease-out;
                `;
        notification.textContent = 'سيتم توجيهك إلى نموذج التواصل';

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        }, 2000);
    });
});

// Add slide in right animation
const rightSlideStyle = document.createElement('style');
rightSlideStyle.textContent = `
            @keyframes slideInRight {
                from {
                    opacity: 0;
                    transform: translateX(100px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
        `;
document.head.appendChild(rightSlideStyle);

// Testimonial card hover effects
document.querySelectorAll('.testimonial-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) rotateX(5deg)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) rotateX(0deg)';
    });
});

// Achievement card animation on scroll
const achievementObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.animation = 'bounceIn 0.6s ease-out forwards';
            }, index * 200);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.achievement-card').forEach(card => {
    achievementObserver.observe(card);
});

// Add bounce in animation
const bounceStyle = document.createElement('style');
bounceStyle.textContent = `
            @keyframes bounceIn {
                0% {
                    opacity: 0;
                    transform: translateY(30px) scale(0.8);
                }
                50% {
                    opacity: 1;
                    transform: translateY(-10px) scale(1.05);
                }
                100% {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
            }
        `;
document.head.appendChild(bounceStyle);

// Blog card read more functionality
document.querySelectorAll('.read-more').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        const notification = document.createElement('div');
        notification.style.cssText = `
                    position: fixed;
                    bottom: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: linear-gradient(45deg, #ff00ff, #00f5ff);
                    color: white;
                    padding: 15px 30px;
                    border-radius: 25px;
                    font-weight: bold;
                    z-index: 10000;
                    animation: slideInUp 0.5s ease-out;
                `;
        notification.textContent = 'المقال غير متوفر حالياً - قريباً!';

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    });
});

// Add slide in up animation
const upSlideStyle = document.createElement('style');
upSlideStyle.textContent = `
            @keyframes slideInUp {
                from {
                    opacity: 0;
                    transform: translate(-50%, 50px);
                }
                to {
                    opacity: 1;
                    transform: translate(-50%, 0);
                }
            }
        `;
document.head.appendChild(upSlideStyle);

// Add loading screen
window.addEventListener('load', () => {
    const loader = document.createElement('div');
    loader.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                transition: opacity 0.5s ease;
            `;

    loader.innerHTML = `
                <div style="text-align: center; color: white;">
                    <div style="font-size: 3rem; margin-bottom: 20px; animation: spin 1s linear infinite;">⚡</div>
                    <div style="font-size: 1.5rem; background: linear-gradient(45deg, #00f5ff, #ff00ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                        جاري التحميل...
                    </div>
                </div>
            `;

    document.body.prepend(loader);

    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
        }, 500);
    }, 1500);
});

// Add spin animation
const spinStyle = document.createElement('style');
spinStyle.textContent = `
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
        `;
document.head.appendChild(spinStyle);

// Add scroll to top button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '⬆️';
scrollToTopBtn.style.cssText = `
            position: fixed;
            bottom: 30px;
            left: 30px;
            width: 50px;
            height: 50px;
            background: linear-gradient(45deg, #00f5ff, #ff00ff);
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 1.2rem;
            cursor: pointer;
            z-index: 1000;
            opacity: 0;
            transform: translateY(100px);
            transition: all 0.3s ease;
        `;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.transform = 'translateY(0)';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.transform = 'translateY(100px)';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
