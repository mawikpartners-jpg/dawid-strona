const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
    }
  });
});

if (!prefersReducedMotion) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
  });
} else {
  document.querySelectorAll('.reveal').forEach(el => {
    el.classList.add('is-in');
  });
}

const nav = document.querySelector('.nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  if (prefersReducedMotion) return;

  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    nav.style.background = 'rgba(0, 0, 0, 0.95)';
    nav.style.boxShadow = '0 4px 24px rgba(0, 0, 0, 0.5)';
  } else {
    nav.style.background = 'rgba(0, 0, 0, 0.7)';
    nav.style.boxShadow = 'none';
  }

  lastScroll = currentScroll;
});

document.querySelectorAll('.service-card').forEach(card => {
  if (prefersReducedMotion) return;

  card.addEventListener('mouseenter', function() {
    this.style.zIndex = '10';
  });

  card.addEventListener('mouseleave', function() {
    this.style.zIndex = '1';
  });
});

document.querySelectorAll('.quality-card').forEach((card, index) => {
  if (prefersReducedMotion) return;

  card.style.animationDelay = `${index * 0.1}s`;
});

const faqItems = document.querySelectorAll('.faq-item');
const faqQuestions = document.querySelectorAll('.faq-question');

function updateFaqHeight(element) {
  if (!element) return;
  
  requestAnimationFrame(() => {
    if (element.parentElement && element.parentElement.classList.contains('active')) {
      const height = element.scrollHeight;
      if (height > 0) {
        element.style.maxHeight = `${height}px`;
      }
    }
  });
}

faqQuestions.forEach(question => {
  question.addEventListener('click', function(e) {
    e.preventDefault();
    
    const faqItem = this.closest('.faq-item');
    if (!faqItem) return;
    
    const answer = faqItem.querySelector('.faq-answer');
    const isActive = faqItem.classList.contains('active');

    // Close all other items
    faqItems.forEach(item => {
      if (item !== faqItem && item.classList.contains('active')) {
        item.classList.remove('active');
        const btn = item.querySelector('.faq-question');
        const itemAnswer = item.querySelector('.faq-answer');
        
        if (btn) {
          btn.setAttribute('aria-expanded', 'false');
        }
        
        if (itemAnswer) {
          itemAnswer.style.maxHeight = '0px';
        }
      }
    });

    // Toggle current item
    if (isActive) {
      faqItem.classList.remove('active');
      this.setAttribute('aria-expanded', 'false');
      if (answer) {
        answer.style.maxHeight = '0px';
      }
    } else {
      faqItem.classList.add('active');
      this.setAttribute('aria-expanded', 'true');
      if (answer) {
        updateFaqHeight(answer);
      }
    }
  });
});

// Recalculate heights on window resize
window.addEventListener('resize', () => {
  faqItems.forEach(item => {
    if (item.classList.contains('active')) {
      const answer = item.querySelector('.faq-answer');
      updateFaqHeight(answer);
    }
  });
});

window.addEventListener('load', () => {
  if (prefersReducedMotion) return;

  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(30px)';

    setTimeout(() => {
      heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
      heroContent.style.opacity = '1';
      heroContent.style.transform = 'translateY(0)';
    }, 100);
  }
});

const parallaxElements = document.querySelectorAll('.floating-shapes .shape');
window.addEventListener('scroll', () => {
  if (prefersReducedMotion) return;

  const scrolled = window.pageYOffset;
  parallaxElements.forEach((el, index) => {
    const speed = 0.5 + (index * 0.2);
    el.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

document.querySelectorAll('.btn').forEach(btn => {
  if (prefersReducedMotion) return;

  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const deltaX = (x - centerX) / centerX;
    const deltaY = (y - centerY) / centerY;

    const rotateX = deltaY * 5;
    const rotateY = deltaX * -5;

    btn.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
  });

  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
const body = document.body;

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener('click', function() {
    const isExpanded = this.getAttribute('aria-expanded') === 'true';

    this.setAttribute('aria-expanded', !isExpanded);
    this.classList.toggle('active');
    mobileNav.classList.toggle('active');
    body.classList.toggle('menu-open');
  });

  document.querySelectorAll('.mobile-nav-item').forEach(item => {
    item.addEventListener('click', () => {
      mobileMenuToggle.classList.remove('active');
      mobileMenuToggle.setAttribute('aria-expanded', 'false');
      mobileNav.classList.remove('active');
      body.classList.remove('menu-open');
    });
  });

  document.addEventListener('click', (e) => {
    if (!mobileNav.contains(e.target) && !mobileMenuToggle.contains(e.target) && mobileNav.classList.contains('active')) {
      mobileMenuToggle.classList.remove('active');
      mobileMenuToggle.setAttribute('aria-expanded', 'false');
      mobileNav.classList.remove('active');
      body.classList.remove('menu-open');
    }
  });
}

const bookingModal = document.getElementById('booking-modal');
const bookingTriggers = document.querySelectorAll('.booking-trigger');
const bookingClose = document.querySelector('.booking-modal-close');
const bookingBackdrop = document.querySelector('.booking-modal-backdrop');

function openBookingModal() {
  bookingModal.classList.add('active');
  body.style.overflow = 'hidden';
}

function closeBookingModal() {
  bookingModal.classList.remove('active');
  body.style.overflow = '';
}

bookingTriggers.forEach(trigger => {
  trigger.addEventListener('click', openBookingModal);
});

if (bookingClose) {
  bookingClose.addEventListener('click', closeBookingModal);
}

if (bookingBackdrop) {
  bookingBackdrop.addEventListener('click', closeBookingModal);
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && bookingModal.classList.contains('active')) {
    closeBookingModal();
  }
});

const copyPhoneBtns = document.querySelectorAll('.copy-phone-btn');
const copyPhoneTextBtns = document.querySelectorAll('.copy-phone-text-btn');
const copyPhoneIconBtns = document.querySelectorAll('.copy-phone-icon-btn');

async function copyPhoneNumber(phoneNumber, element, textElement) {
  const originalText = textElement ? textElement.textContent : '';

  try {
    await navigator.clipboard.writeText(phoneNumber);

    if (textElement) {
      textElement.textContent = 'Skopiowano!';
    }

    if (element.classList.contains('btn-primary') || element.classList.contains('btn-secondary')) {
      const originalBg = element.style.background;
      const originalBorder = element.style.borderColor;
      element.style.background = 'rgba(255, 59, 48, 0.2)';
      element.style.borderColor = '#ff3b30';

      setTimeout(() => {
        if (textElement) {
          textElement.textContent = originalText;
        }
        element.style.background = originalBg;
        element.style.borderColor = originalBorder;
      }, 2000);
    } else {
      setTimeout(() => {
        if (textElement) {
          textElement.textContent = originalText;
        }
      }, 2000);
    }
  } catch (err) {
    console.error('Failed to copy phone number:', err);
    if (textElement) {
      textElement.textContent = 'Chyba kopírování';
      setTimeout(() => {
        textElement.textContent = originalText;
      }, 2000);
    }
  }
}

copyPhoneBtns.forEach(btn => {
  btn.addEventListener('click', async function(e) {
    e.preventDefault();
    const phoneNumber = this.getAttribute('data-phone');
    const textElement = this.querySelector('.btn-text');

    if (phoneNumber.startsWith('http://') || phoneNumber.startsWith('https://')) {
      window.open(phoneNumber, '_blank');
      if (textElement) {
        const originalText = textElement.textContent;
        textElement.textContent = 'Skopiowano!';
        setTimeout(() => {
          textElement.textContent = originalText;
        }, 2000);
      }
    } else {
      await copyPhoneNumber(phoneNumber, this, textElement);
    }
  });
});

copyPhoneTextBtns.forEach(btn => {
  btn.addEventListener('click', async function() {
    const phoneNumber = this.getAttribute('data-phone');
    await copyPhoneNumber(phoneNumber, this, this);
  });
});

copyPhoneIconBtns.forEach(btn => {
  btn.addEventListener('click', async function() {
    const phoneNumber = this.getAttribute('data-phone');
    await copyPhoneNumber(phoneNumber, this, null);

    const originalColor = this.style.color;
    this.style.color = 'var(--accent-primary)';
    setTimeout(() => {
      this.style.color = originalColor;
    }, 2000);
  });
});

const audio = document.getElementById('hero-audio');
const playBtn = document.getElementById('play-btn');
const playIcon = playBtn.querySelector('.play-icon');
const pauseIcon = playBtn.querySelector('.pause-icon');
const progressBar = document.getElementById('progress-bar');
const progressFill = document.getElementById('progress-fill');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const volumeBtn = document.getElementById('volume-btn');
const volumeIcon = volumeBtn.querySelector('.volume-icon');
const muteIcon = volumeBtn.querySelector('.mute-icon');
const volumeSlider = document.getElementById('volume-slider');
const musicPlayerContainer = document.querySelector('.music-player');

let audioInitialized = false;
let audioContext = null;

function formatTime(seconds) {
  if (!isFinite(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function initializeAudioContext() {
  if (!audioContext && (window.AudioContext || window.webkitAudioContext)) {
    try {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }
    } catch (err) {
      console.warn('Web Audio API not supported:', err);
    }
  }
}

function showError(message) {
  const errorEl = document.createElement('div');
  errorEl.style.cssText = 'position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: var(--accent-primary); font-size: 0.85rem; text-align: center; width: 100%; padding: 0 1rem;';
  errorEl.textContent = message;
  musicPlayerContainer.style.position = 'relative';
  musicPlayerContainer.appendChild(errorEl);

  playBtn.disabled = true;
  playBtn.style.opacity = '0.5';
  playBtn.style.cursor = 'not-allowed';
}

function updatePlayPauseIcon(isPlaying) {
  if (isPlaying) {
    playIcon.style.display = 'none';
    pauseIcon.style.display = 'block';
  } else {
    playIcon.style.display = 'block';
    pauseIcon.style.display = 'none';
  }
}

async function togglePlayPause() {
  if (!audioInitialized) {
    audioInitialized = true;
    initializeAudioContext();

    try {
      await audio.load();
    } catch (err) {
      console.error('Failed to load audio:', err);
      showError('Nepodařilo se načíst audio. Zkuste to znovu.');
      return;
    }
  }

  try {
    if (audio.paused) {
      const playPromise = audio.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            updatePlayPauseIcon(true);
          })
          .catch((error) => {
            console.error('Playback failed:', error);
            updatePlayPauseIcon(false);

            if (error.name === 'NotAllowedError') {
              showError('Klikněte pro přehrání hudby');
            } else if (error.name === 'NotSupportedError') {
              showError('Váš prohlížeč nepodporuje tento audio formát');
            } else {
              showError('Chyba při přehrávání. Zkuste to znovu.');
            }
          });
      }
    } else {
      audio.pause();
      updatePlayPauseIcon(false);
    }
  } catch (error) {
    console.error('Toggle play/pause error:', error);
    showError('Chyba při ovládání přehrávače');
  }
}

playBtn.addEventListener('click', togglePlayPause);

audio.addEventListener('loadedmetadata', () => {
  if (isFinite(audio.duration)) {
    durationEl.textContent = formatTime(audio.duration);
  }
});

audio.addEventListener('durationchange', () => {
  if (isFinite(audio.duration)) {
    durationEl.textContent = formatTime(audio.duration);
  }
});

audio.addEventListener('timeupdate', () => {
  if (isFinite(audio.duration) && audio.duration > 0) {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressFill.style.width = `${progress}%`;
    currentTimeEl.textContent = formatTime(audio.currentTime);
  }
});

audio.addEventListener('error', (e) => {
  console.error('Audio error:', e);
  const error = audio.error;

  if (error) {
    switch (error.code) {
      case error.MEDIA_ERR_ABORTED:
        showError('Načítání zvuku bylo přerušeno');
        break;
      case error.MEDIA_ERR_NETWORK:
        showError('Chyba sítě při načítání zvuku');
        break;
      case error.MEDIA_ERR_DECODE:
        showError('Chyba dekódování zvuku');
        break;
      case error.MEDIA_ERR_SRC_NOT_SUPPORTED:
        showError('Audio formát není podporován');
        break;
      default:
        showError('Neznámá chyba při načítání zvuku');
    }
  }
});

audio.addEventListener('canplay', () => {
  const existingError = musicPlayerContainer.querySelector('div[style*="position: absolute"]');
  if (existingError) {
    existingError.remove();
    playBtn.disabled = false;
    playBtn.style.opacity = '';
    playBtn.style.cursor = '';
  }
});

function seekAudio(event) {
  if (!isFinite(audio.duration) || audio.duration === 0) return;

  const rect = progressBar.getBoundingClientRect();
  const clientX = event.type.includes('touch') ? event.touches[0].clientX : event.clientX;
  const clickX = clientX - rect.left;
  const width = rect.width;
  const percentage = Math.max(0, Math.min(1, clickX / width));
  audio.currentTime = percentage * audio.duration;
}

progressBar.addEventListener('click', seekAudio);
progressBar.addEventListener('touchend', (e) => {
  if (e.touches.length === 0 && e.changedTouches.length > 0) {
    seekAudio({
      type: 'touchend',
      touches: [e.changedTouches[0]]
    });
  }
});

volumeBtn.addEventListener('click', () => {
  if (audio.muted) {
    audio.muted = false;
    volumeIcon.style.display = 'block';
    muteIcon.style.display = 'none';
    volumeSlider.value = audio.volume * 100;
  } else {
    audio.muted = true;
    volumeIcon.style.display = 'none';
    muteIcon.style.display = 'block';
  }
});

volumeSlider.addEventListener('input', (e) => {
  const volume = e.target.value / 100;
  audio.volume = volume;
  audio.muted = false;
  volumeIcon.style.display = 'block';
  muteIcon.style.display = 'none';
});

volumeSlider.addEventListener('change', (e) => {
  const volume = e.target.value / 100;
  audio.volume = volume;
});

audio.volume = 0.7;

if ('ontouchstart' in window) {
  progressBar.style.cursor = 'pointer';
  playBtn.style.minWidth = '44px';
  playBtn.style.minHeight = '44px';
  volumeBtn.style.minWidth = '44px';
  volumeBtn.style.minHeight = '44px';
}

function attemptAutoplay() {
  initializeAudioContext();

  const playPromise = audio.play();

  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        audioInitialized = true;
        updatePlayPauseIcon(true);
        document.removeEventListener('click', handleFirstInteraction);
        document.removeEventListener('touchstart', handleFirstInteraction);
        document.removeEventListener('keydown', handleFirstInteraction);
      })
      .catch((error) => {
        console.log('Autoplay blocked, waiting for user interaction');
        updatePlayPauseIcon(false);
      });
  }
}

function handleFirstInteraction() {
  if (!audioInitialized || audio.paused) {
    attemptAutoplay();
  }
}

window.addEventListener('load', () => {
  attemptAutoplay();

  document.addEventListener('click', handleFirstInteraction, { once: true });
  document.addEventListener('touchstart', handleFirstInteraction, { once: true });
  document.addEventListener('keydown', handleFirstInteraction, { once: true });
});
