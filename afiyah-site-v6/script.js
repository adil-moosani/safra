// Analytics hook: events land in window.dataLayer (works with GTM / GA4 / Meta Pixel setups)
window.dataLayer = window.dataLayer || [];
function track(event, props) {
  window.dataLayer.push(Object.assign({ event: event, ts: Date.now() }, props || {}));
  console.log('[afiya]', event, props || {});
}
track('page_view');

// Submissions go to Netlify Forms when hosted. Opened as a local file, the form runs in demo mode.
const DEMO_MODE = location.protocol === 'file:';

const dlg = document.getElementById('waitlist');
const form = document.getElementById('wl-form');
const email = document.getElementById('wl-email');
const err = document.getElementById('wl-error');
const formView = document.getElementById('wl-form-view');
const doneView = document.getElementById('wl-done-view');
let chosen = { plan: '', price: '' };

document.querySelectorAll('a[href="#reserve"]').forEach(a =>
  a.addEventListener('click', () => track('cta_scroll', { location: a.classList.contains('nav-link') ? 'nav' : 'hero' }))
);

document.querySelectorAll('.reserve-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    chosen = { plan: btn.dataset.plan, price: btn.dataset.price };
    track('reserve_click', chosen);
    document.getElementById('wl-plan').textContent =
      chosen.plan === 'subscribe' ? 'your $39 founding price' : 'your $49 founding price';
    document.getElementById('wl-plan-input').value = chosen.plan;
    document.getElementById('wl-price-input').value = chosen.price;
    formView.hidden = false; doneView.hidden = true; err.textContent = '';
    dlg.showModal();
    email.focus();
  });
});

function closeDlg() { dlg.close(); }
dlg.querySelector('.close').addEventListener('click', () => { track('waitlist_dismiss', chosen); closeDlg(); });
document.getElementById('wl-done-close').addEventListener('click', closeDlg);
dlg.addEventListener('click', e => { if (e.target === dlg) closeDlg(); });

form.addEventListener('submit', async e => {
  e.preventDefault();
  const value = email.value.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    err.textContent = 'Enter an email address, like name@example.com.';
    email.focus();
    return;
  }
  err.textContent = '';
  try {
    if (!DEMO_MODE) {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form)).toString()
      });
      if (!res.ok) throw new Error('bad status');
    }
    track('waitlist_submit', chosen);
    document.getElementById('wl-done-email').textContent = value;
    formView.hidden = true; doneView.hidden = false;
    form.reset();
  } catch (_) {
    err.textContent = "Your email didn't send. Check your connection and try again.";
  }
});
