/**
 * 24@Home Hotel - Google Ads Conversion Tracking & Interactive Logic
 */

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  setupConversionTracking();
  setupContactForm();
  setupSmoothScrolling();
});

/**
 * Google Ads Conversion Tracker Helper
 * @param {string} action - 'call', 'line', 'map', 'form', 'link'
 * @param {string} label - Unique identifier label for Google Ads analytics
 */
function trackConversion(action, label) {
  console.log(`[Google Ads Conversion Tracked] Action: ${action} | Label: ${label}`);

  if (typeof window.gtag === 'function') {
    // Send event to Google Analytics & Google Ads Tag Manager
    window.gtag('event', `conversion_${action}`, {
      event_category: 'Google Ads Sale Page',
      event_label: label,
      value: 1.0,
    });

    // If specific Google Ads conversion Send_To label is provided:
    /*
    window.gtag('event', 'conversion', {
      'send_to': `${window.GOOGLE_ADS_ID || 'AW-CONVERSION_ID'}/YOUR_CONVERSION_LABEL`,
      'event_label': label
    });
    */
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

      trackConversion(action, label);

      // Visual Toast Feedback for Line / Call
      if (action === 'line') {
        showToast('กำลังเปิดแอปพลิเคชัน Line เพื่อติดต่อ 24@Home Hotel...');
      } else if (action === 'call') {
        showToast('กำลังเชื่อมต่อสายโทรหา 081-9888-544 / 02-582-2255...');
      }
    });
  });
}

/**
 * Setup Contact Us Form Logic
 */
function setupContactForm() {
  const form = document.getElementById('adsContactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const fullName = document.getElementById('fullName')?.value.trim();
    const phone = document.getElementById('phone')?.value.trim();
    const checkIn = document.getElementById('checkIn')?.value;
    const stayType = document.getElementById('stayType')?.value;
    const message = document.getElementById('message')?.value.trim();

    if (!fullName || !phone) {
      showToast('กรุณากรอกชื่อและเบอร์โทรศัพท์ติดต่อกลับให้ครบถ้วน');
      return;
    }

    // Trigger Form Conversion Event
    trackConversion('form', `Form Submit: ${fullName} (${phone})`);

    // Reset Form & Show Success Feedback
    form.reset();
    showToast('✅ ข้อมูลของคุณถูกส่งเรียบร้อย! เจ้าหน้าที่โรงแรมจะติดต่อกลับด่วนที่สุดครับ');
  });
}

/**
 * Toast Notification Utility
 */
let toastTimeout;
function showToast(message) {
  const toast = document.getElementById('toastNotification');
  const toastText = document.getElementById('toastMessage');

  if (!toast || !toastText) return;

  toastText.textContent = message;
  toast.classList.remove('hidden');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.add('hidden');
  }, 4000);
}

/**
 * Smooth Scroll for Navigation Links
 */
function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  });
}
