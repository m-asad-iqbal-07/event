/**
 * Engagement Invitation - Misbah Uddin & Mehwish Saleem
 * Date: Sunday, 22 November 2026 | Location: Utmanzai
 * Warm Welcome by Misbah's Family
 */

// ----------------------------------------------------
// 1. CONFIGURATION & STATE
// ----------------------------------------------------
// Target Date: 22 November 2026 at 11:00 AM
// (Month is 0-indexed in JS Date: 10 = November)
const engagementDate = new Date(2026, 10, 22, 11, 0, 0);

// ----------------------------------------------------
// 2. WAX SEAL & ENVELOPE OPENING ANIMATION
// ----------------------------------------------------
let isEnvelopeOpened = false;

function openInvitation() {
  if (isEnvelopeOpened) return;
  isEnvelopeOpened = true;

  const wrapper = document.getElementById('envelopeWrapper');
  const screen = document.getElementById('envelopeScreen');
  const main = document.getElementById('invitationMain');
  const instruction = document.getElementById('openInstruction');

  // Trigger 3D fold opening
  wrapper.classList.add('opening');
  if (instruction) instruction.style.opacity = '0';

  // Spawn opening sparkle burst
  createSparkleBurst();

  setTimeout(() => {
    // Fade out envelope and reveal full invitation
    screen.classList.add('opened');
    main.classList.remove('hidden');

    // Scroll smoothly to top of main card
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Launch floating petals
    initPetalsCanvas();
  }, 1100);
}

function createSparkleBurst() {
  const seal = document.getElementById('waxSeal');
  if (!seal) return;
  const rect = seal.getBoundingClientRect();
  const burstCount = 22;

  for (let i = 0; i < burstCount; i++) {
    const sparkle = document.createElement('div');
    sparkle.innerText = Math.random() > 0.5 ? '✨' : '🌸';
    sparkle.style.position = 'fixed';
    sparkle.style.left = `${rect.left + rect.width / 2}px`;
    sparkle.style.top = `${rect.top + rect.height / 2}px`;
    sparkle.style.fontSize = `${16 + Math.random() * 16}px`;
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '9999';
    sparkle.style.transition = 'all 1s cubic-bezier(0.1, 0.8, 0.3, 1)';
    document.body.appendChild(sparkle);

    const angle = (Math.PI * 2 * i) / burstCount;
    const distance = 80 + Math.random() * 130;
    const targetX = Math.cos(angle) * distance;
    const targetY = Math.sin(angle) * distance;

    requestAnimationFrame(() => {
      sparkle.style.transform = `translate(${targetX}px, ${targetY}px) scale(0)`;
      sparkle.style.opacity = '0';
    });

    setTimeout(() => sparkle.remove(), 1200);
  }
}

// ----------------------------------------------------
// 3. LIVE COUNTDOWN TIMER (Target: 21 Nov 2026)
// ----------------------------------------------------
function updateCountdown() {
  const now = new Date().getTime();
  const distance = engagementDate.getTime() - now;

  const daysEl = document.getElementById('cdDays');
  const hoursEl = document.getElementById('cdHours');
  const minEl = document.getElementById('cdMinutes');
  const secEl = document.getElementById('cdSeconds');

  if (distance < 0) {
    if (daysEl) daysEl.innerText = "00";
    if (hoursEl) hoursEl.innerText = "00";
    if (minEl) minEl.innerText = "00";
    if (secEl) secEl.innerText = "00";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  if (daysEl) daysEl.innerText = String(days).padStart(2, '0');
  if (hoursEl) hoursEl.innerText = String(hours).padStart(2, '0');
  if (minEl) minEl.innerText = String(minutes).padStart(2, '0');
  if (secEl) secEl.innerText = String(seconds).padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();

// ----------------------------------------------------
// 4. CALENDAR & LOCATION ACTIONS
// ----------------------------------------------------
function addToCalendar(e) {
  e.preventDefault();
  const title = encodeURIComponent("Engagement Ceremony: Misbah Uddin & Mehwish Saleem");
  const details = encodeURIComponent(
    "A warm welcome by Misbah's Family.\n\n" +
    "You are cordially invited to celebrate the blessed Engagement Ceremony of Misbah Uddin & Mehwish Saleem.\n\n" +
    "Date: Sunday, 22 November 2026\n" +
    "Schedule of Events:\n" +
    "• 11:00 AM: Guest Arrival\n" +
    "• 02:00 PM – 03:00 PM: Royal Lunch\n" +
    "• 04:00 PM: Ring Ceremony\n\n" +
    "Venue: Utmanzai, Charsadda, Khyber Pakhtunkhwa"
  );
  const location = encodeURIComponent("Utmanzai, Charsadda, Khyber Pakhtunkhwa");

  // Sunday, 22 November 2026 11:00 AM to 5:00 PM (PKT is UTC+5 -> 06:00 to 12:00 UTC)
  const dates = "20261122T060000Z/20261122T120000Z";

  const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dates}`;
  window.open(googleCalUrl, '_blank');
}

function copyAddress(address) {
  navigator.clipboard.writeText(address).then(() => {
    showToast("📍 Address copied: " + address);
  }).catch(() => {
    showToast("Address: " + address);
  });
}

function copyInviteLink() {
  const url = window.location.href;
  navigator.clipboard.writeText(url).then(() => {
    showToast("🔗 Invitation link copied!");
  }).catch(() => {
    showToast("Link: " + url);
  });
}

function shareOnWhatsApp() {
  const text = encodeURIComponent(
    `💍 *Engagement Invitation* 💍\n\n` +
    `A warm welcome by *Misbah's Family*.\n\n` +
    `You are cordially invited to celebrate the blessed Engagement Ceremony of:\n` +
    `✨ *Misbah Uddin* & *Mehwish Saleem* ✨\n\n` +
    `📅 *Date:* Sunday, 22 November 2026\n` +
    `📍 *Location:* Utmanzai\n\n` +
    `⏰ *Schedule of Events:*\n` +
    `• 11:00 AM: Guest Arrival\n` +
    `• 02:00 PM – 03:00 PM: Royal Lunch\n` +
    `• 04:00 PM: Auspicious Ring Ceremony 💍\n\n` +
    `Tap the link to open the invitation card:\n${window.location.href}`
  );
  window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
}

// ----------------------------------------------------
// 5. TOAST NOTIFICATIONS
// ----------------------------------------------------
let toastTimeout = null;
function showToast(message) {
  const toast = document.getElementById('toastNotice');
  if (!toast) return;
  toast.innerText = message;
  toast.classList.add('show');

  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// ----------------------------------------------------
// 7. DEVICE VIEW MODE SWITCHER
// ----------------------------------------------------
function setDeviceMode(mode) {
  const viewport = document.getElementById('appViewport');
  const mobileBtn = document.getElementById('mobileModeBtn');
  const fullBtn = document.getElementById('fullModeBtn');

  if (mode === 'mobile') {
    viewport.className = 'app-viewport mobile-frame';
    mobileBtn.classList.add('active');
    fullBtn.classList.remove('active');
  } else {
    viewport.className = 'app-viewport full-frame';
    fullBtn.classList.add('active');
    mobileBtn.classList.remove('active');
  }
}

// ----------------------------------------------------
// 8. FALLING ROSE PETALS CANVAS ANIMATION
// ----------------------------------------------------
function initPetalsCanvas() {
  const canvas = document.getElementById('petalsCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  const petals = [];
  const petalCount = 28;

  for (let i = 0; i < petalCount; i++) {
    petals.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: 10 + Math.random() * 14,
      speedY: 1 + Math.random() * 2,
      speedX: (Math.random() - 0.5) * 1.2,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 2,
      color: Math.random() > 0.4 ? 'rgba(180, 24, 48, 0.7)' : 'rgba(235, 120, 140, 0.65)'
    });
  }

  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let p of petals) {
      p.y += p.speedY;
      p.x += p.speedX;
      p.rotation += p.rotSpeed;

      if (p.y > canvas.height + 20) {
        p.y = -20;
        p.x = Math.random() * canvas.width;
      }

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);

      // Draw elegant petal shape
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(p.size / 2, -p.size / 2, p.size, 0);
      ctx.quadraticCurveTo(p.size / 2, p.size / 2, 0, 0);
      ctx.fillStyle = p.color;
      ctx.fill();
      ctx.restore();
    }

    requestAnimationFrame(render);
  }

  render();
}
