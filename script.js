/**
 * Yugant Engineering Custom Interactive Script
 * Handcrafted for premium experience, responsive feedback, and modern animations.
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================
  // 1. SPLASH LOADER
  // ==========================================
  const loader = document.getElementById('splash-loader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      if (loader) {
        loader.classList.add('loaded');
      }
    }, 600); // smooth visual delay
  });

  // Fallback in case load event takes too long
  setTimeout(() => {
    if (loader && !loader.classList.contains('loaded')) {
      loader.classList.add('loaded');
    }
  }, 3000);

  // ==========================================
  // 2. DARK / LIGHT THEME TOGGLE
  // ==========================================
  const themeToggle = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;
  
  // Check local storage or system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    htmlElement.setAttribute('data-theme', 'dark');
  } else {
    htmlElement.setAttribute('data-theme', 'light');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme');
      let newTheme = 'light';
      
      if (currentTheme === 'light') {
        newTheme = 'dark';
      }
      
      htmlElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }

  // ==========================================
  // 3. STICKY NAVBAR & SCROLL PROGRESS BAR
  // ==========================================
  const navbar = document.querySelector('.navbar-custom');
  const scrollProgress = document.getElementById('scroll-progress');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    
    // Sticky navbar check
    if (navbar) {
      if (scrollY > 50) {
        navbar.classList.add('sticky');
      } else {
        navbar.classList.remove('sticky');
      }
    }

    // Scroll Progress bar width
    if (scrollProgress && docHeight > 0) {
      const scrolled = (scrollY / docHeight) * 100;
      scrollProgress.style.width = `${scrolled}%`;
    }

    // Back to top button visibility
    if (backToTopBtn) {
      if (scrollY > 500) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }
  });

  // Smooth scroll back to top on click
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ==========================================
  // 4. HERO TYPING ANIMATION
  // ==========================================
  const typedTextSpan = document.querySelector(".typed-text");
  const cursorSpan = document.querySelector(".cursor");
  const textArray = ["Precision turned parts", "Quality Brass Inserts", "High-Volume Exports", "CNC Machined Hardware"];
  const typingDelay = 100;
  const erasingDelay = 50;
  const newTextDelay = 2000;
  let textArrayIndex = 0;
  let charIndex = 0;

  function type() {
    if (typedTextSpan) {
      if (charIndex < textArray[textArrayIndex].length) {
        if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
      } else {
        cursorSpan.classList.remove("typing");
        setTimeout(erase, newTextDelay);
      }
    }
  }

  function erase() {
    if (typedTextSpan) {
      if (charIndex > 0) {
        if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
      } else {
        cursorSpan.classList.remove("typing");
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
      }
    }
  }

  if (typedTextSpan) {
    setTimeout(type, newTextDelay + 250);
  }

  // ==========================================
  // 5. MOUSE PARALLAX ON HERO GRAPHICS
  // ==========================================
  const heroSection = document.querySelector('.hero-section');
  const parallaxLayers = document.querySelectorAll('.parallax-layer');

  if (heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const mouseX = e.clientX - width / 2;
      const mouseY = e.clientY - height / 2;

      parallaxLayers.forEach((layer) => {
        const speed = parseFloat(layer.getAttribute('data-speed')) || 0.05;
        const x = mouseX * speed;
        const y = mouseY * speed;
        layer.style.transform = `translate(${x}px, ${y}px)`;
      });
    });
  }

  // ==========================================
  // 6. ABOUT SECTION TABS
  // ==========================================
  const tabButtons = document.querySelectorAll('.about-tab-btn');
  const tabPanes = document.querySelectorAll('.about-tab-pane');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabId = button.getAttribute('data-tab');

      // Deactivate all
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabPanes.forEach(pane => pane.classList.remove('active'));

      // Activate clicked
      button.classList.add('active');
      const targetPane = document.getElementById(tabId);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });

  // ==========================================
  // 7. COUNTER NUMBERS SCROLL ANIMATION
  // ==========================================
  const counterItems = document.querySelectorAll('.counter-val');
  
  const animateCounter = (item) => {
    const target = parseFloat(item.getAttribute('data-target'));
    const isDecimal = item.getAttribute('data-decimal') === 'true';
    const duration = 2000; // ms
    const stepTime = 30; // ms
    const stepCount = duration / stepTime;
    const increment = target / stepCount;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      
      if (isDecimal) {
        item.textContent = current.toFixed(1);
      } else {
        item.textContent = Math.floor(current);
      }
    }, stepTime);
  };

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target); // only animate once
      }
    });
  }, observerOptions);

  counterItems.forEach(item => {
    counterObserver.observe(item);
  });

  // ==========================================
  // 8. SCROLL REVEAL TRIGGERS
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-zoom');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    root: null,
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ==========================================
  // 9. TIMELINE SCROLL PROGRESSION
  // ==========================================
  const processSection = document.getElementById('process');
  const progressLine = document.querySelector('.timeline-line-progress');
  const timelineSteps = document.querySelectorAll('.timeline-step');

  const updateTimelineProgress = () => {
    if (!processSection || !progressLine) return;

    const sectionRect = processSection.getBoundingClientRect();
    const sectionHeight = processSection.offsetHeight;
    const viewportHeight = window.innerHeight;
    
    // Calculate how far down the section we scrolled
    let progressPercent = 0;
    
    // Element starts entering from bottom of viewport
    const entryPoint = sectionRect.top - viewportHeight;
    // Element exits out the top of viewport
    const exitPoint = sectionRect.bottom - 100;
    
    if (sectionRect.top < viewportHeight / 2) {
      const totalDist = sectionHeight + viewportHeight / 2;
      const scrolledDist = Math.max(0, (viewportHeight / 2) - sectionRect.top);
      progressPercent = Math.min(100, (scrolledDist / (sectionHeight * 0.7)) * 100);
    }
    
    progressLine.style.width = `${progressPercent}%`;

    // Light up nodes sequentially based on percent
    const stepCount = timelineSteps.length;
    timelineSteps.forEach((step, index) => {
      const stepTriggerPercent = (index / (stepCount - 1)) * 90; // scale bounds
      if (progressPercent >= stepTriggerPercent) {
        step.classList.add('completed');
      } else {
        step.classList.remove('completed');
      }
    });
  };

  window.addEventListener('scroll', updateTimelineProgress);
  updateTimelineProgress(); // init

  // ==========================================
  // 10. PORTFOLIO FILTER & LIGHTBOX
  // ==========================================
  const filterBtns = document.querySelectorAll('.portfolio-filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle button classes
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.style.display = 'flex';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // Lightbox implementation
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  const viewDetailsBtns = document.querySelectorAll('.view-lightbox-btn');

  viewDetailsBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const parentCard = btn.closest('.portfolio-item');
      if (parentCard) {
        const img = parentCard.querySelector('.portfolio-img-box img');
        if (img && lightbox && lightboxImg) {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt;
          lightbox.classList.add('active');
          document.body.style.overflow = 'hidden'; // stop body scroll
        }
      }
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
      if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  }

  // ==========================================
  // 11. FAQ ACCORDION TRANSITIONS
  // ==========================================
  const faqButtons = document.querySelectorAll('.accordion-button-custom');

  faqButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-target');
      const targetCollapse = document.getElementById(targetId);
      
      if (!targetCollapse) return;

      const isExpanded = !button.classList.contains('collapsed');
      
      // Close other FAQs
      faqButtons.forEach(btn => {
        if (btn !== button) {
          btn.classList.add('collapsed');
          const collapseEl = document.getElementById(btn.getAttribute('data-target'));
          if (collapseEl) {
            collapseEl.style.maxHeight = null;
            collapseEl.classList.remove('show');
          }
        }
      });

      if (isExpanded) {
        button.classList.add('collapsed');
        targetCollapse.style.maxHeight = null;
        targetCollapse.classList.remove('show');
      } else {
        button.classList.remove('collapsed');
        targetCollapse.classList.add('show');
        // dynamically set max-height based on content
        targetCollapse.style.maxHeight = targetCollapse.scrollHeight + 'px';
      }
    });
  });

  // ==========================================
  // 12. PRICING BATCH TOGGLE
  // ==========================================
  const pricingToggle = document.getElementById('pricingSwitch');
  const priceValues = document.querySelectorAll('.pricing-value');
  const pricePeriods = document.querySelectorAll('.pricing-period');

  if (pricingToggle) {
    pricingToggle.addEventListener('change', () => {
      const isLargeBatch = pricingToggle.checked;
      
      priceValues.forEach(val => {
        const standardPrice = val.getAttribute('data-standard');
        const customPrice = val.getAttribute('data-custom');
        
        if (isLargeBatch) {
          val.textContent = customPrice;
        } else {
          val.textContent = standardPrice;
        }
      });

      pricePeriods.forEach(p => {
        if (isLargeBatch) {
          p.textContent = p.getAttribute('data-large-text') || '/ bulk batch';
        } else {
          p.textContent = p.getAttribute('data-standard-text') || '/ production run';
        }
      });
    });
  }

  // ==========================================
  // 13. MOCK CONTACT & NEWSLETTER FORM SUBMISSIONS
  // ==========================================
  const contactForm = document.getElementById('contact-form');
  const contactFormStatus = document.getElementById('contact-form-status');

  if (contactForm && contactFormStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Basic client validation
      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const phone = document.getElementById('contact-phone').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      if (!name || !email || !phone || !message) {
        contactFormStatus.innerHTML = '<div class="alert alert-danger" role="alert"><i class="fas fa-exclamation-triangle me-2"></i>Please fill in all required fields.</div>';
        return;
      }

      // Simulate sending
      contactFormStatus.innerHTML = '<div class="alert alert-info" role="alert"><i class="fas fa-circle-notch fa-spin me-2"></i>Processing your enquiry...</div>';
      
      setTimeout(() => {
        contactFormStatus.innerHTML = '<div class="alert alert-success" role="alert"><i class="fas fa-check-circle me-2"></i>Thank you! Your manufacturing enquiry has been received. Our sales team will email you within 24 hours.</div>';
        contactForm.reset();
      }, 1500);
    });
  }

  // Newsletter Form
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input');
      if (emailInput && emailInput.value.trim()) {
        const val = emailInput.value.trim();
        alert(`Thank you for subscribing! Industrial updates will be sent to ${val}.`);
        emailInput.value = '';
      }
    });
  }

  // ==========================================
  // 14. COOKIE BANNER ACTION
  // ==========================================
  const cookieBanner = document.getElementById('cookie-banner');
  const acceptCookiesBtn = document.getElementById('accept-cookies');
  const declineCookiesBtn = document.getElementById('decline-cookies');

  if (cookieBanner) {
    const cookiesAccepted = localStorage.getItem('cookies-accepted');
    if (!cookiesAccepted) {
      setTimeout(() => {
        cookieBanner.classList.add('show');
      }, 2000);
    }

    if (acceptCookiesBtn) {
      acceptCookiesBtn.addEventListener('click', () => {
        localStorage.setItem('cookies-accepted', 'true');
        cookieBanner.classList.remove('show');
      });
    }

    if (declineCookiesBtn) {
      declineCookiesBtn.addEventListener('click', () => {
        localStorage.setItem('cookies-accepted', 'false');
        cookieBanner.classList.remove('show');
      });
    }
  }

  // ==========================================
  // 15. DUPLICATE LOGOS FOR LOOP EFFECTS
  // ==========================================
  const track = document.querySelector('.logo-slider-track');
  if (track) {
    const items = Array.from(track.children);
    // Duplicate the logos to ensure continuous sliding transition
    items.forEach(item => {
      const clone = item.cloneNode(true);
      track.appendChild(clone);
    });
  }
});
