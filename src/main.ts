/**
 * 24@Home Hotel - Google Ads Conversion Tracking & Interactive Logic
 */

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    gtag_report_conversion?: (url: string, send_to: string, target: string | null) => boolean;
  }
}

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  setupConversionTracking();
  setupSmoothScrolling();
  setupMobileMenu();
  handleInitialHashScroll();
});

/**
 * Google Ads Conversion Tracker Helper
 * @param {string | null} action - 'call', 'line', 'map', 'form', 'link'
 * @param {string} label - Unique identifier label for Google Ads analytics
 */
function trackConversion(action: string | null, label: string) {
  console.log(`[Google Ads Conversion Tracked] Action: ${action} | Label: ${label}`);

  if (typeof window.gtag === 'function') {
    // Send event to Google Analytics & Google Ads Tag Manager
    window.gtag('event', `conversion_${action}`, {
      event_category: 'Google Ads Sale Page',
      event_label: label,
      value: 1.0,
    });
  }
}

/**
 * Setup Click Listeners for all Conversion Elements
 */
function setupConversionTracking() {
  const conversionElements = document.querySelectorAll('[data-conversion]');

  conversionElements.forEach((el) => {
    el.addEventListener('click', (e) => {
      const action = el.getAttribute('data-conversion');
      const label = el.getAttribute('data-label') || 'General Click';
      const url = el.getAttribute('href');
      const target = el.getAttribute('target');

      if (action === 'call' && typeof window.gtag_report_conversion === 'function' && url) {
        e.preventDefault();
        window.gtag_report_conversion(url, 'AW-18127691604/fAeFCPLn-uAcENS--sND', target);
      } else if (action === 'line' && typeof window.gtag_report_conversion === 'function' && url) {
        e.preventDefault();
        window.gtag_report_conversion(url, 'AW-18127691604/29UjCPjQ--AcENS--sND', target);
      } else {
        trackConversion(action, label);
      }

      // Visual Toast Feedback for Line / Call
      if (action === 'line') {
        showToast('กำลังเปิดแอปพลิเคชัน Line เพื่อติดต่อ 24@Home Hotel...');
      } else if (action === 'call') {
        showToast('กำลังเชื่อมต่อสายโทรหา 081-9888-544...');
      }
    });
  });
}

/**
 * Toast Notification Utility
 */
let toastTimeout: number;
function showToast(message: string) {
  const toast = document.getElementById('toastNotification');
  const toastText = document.getElementById('toastMessage');

  if (!toast || !toastText) return;

  toastText.textContent = message;
  toast.classList.remove('hidden');

  clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => {
    toast.classList.add('hidden');
  }, 4000);
}

/**
 * Smooth Scroll for Navigation Links
 */
function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (this: HTMLAnchorElement, e: Event) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href as string);
      if (target) {
        e.preventDefault();
        
        // Update URL hash without jumping
        history.pushState(null, '', href);
        
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  });
}

/**
 * Mobile Menu Toggle
 */
function setupMobileMenu() {
  const btn = document.getElementById('mobileMenuBtn');
  const nav = document.getElementById('navLinks');
  
  if (btn && nav) {
    btn.addEventListener('click', () => {
      nav.classList.toggle('active');
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
      });
    });
  }
}

/**
 * Handle initial scroll based on URL hash (e.g. after refresh or coming from Sitelinks)
 */
function handleInitialHashScroll() {
  const hash = window.location.hash;
  if (hash && hash !== '#') {
    // Small timeout to ensure DOM layout is complete before scrolling
    setTimeout(() => {
      try {
        const target = document.querySelector(hash);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        } else {
          // Fallback if element not found
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } catch (e) {
        // Fallback if hash is invalid selector
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  }
}
