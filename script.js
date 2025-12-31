// script.js - Animations for Portfolio Website (Updated for Favourite Songs with Pause Fix)

document.addEventListener('DOMContentLoaded', () => {
  // Dynamic Typing Effect for Hero Title (preserves <span> colors for all titles)
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    const originalHTML = heroTitle.innerHTML; // Get the full HTML (e.g., "My <span>Biodata</span>")
    const spanMatch = originalHTML.match(/(.*)<span>(.*?)<\/span>/); // Regex to split before and inside span
    if (spanMatch) {
      const beforeSpan = spanMatch[1]; // Text before <span> (e.g., "My ")
      const insideSpan = spanMatch[2]; // Text inside <span> (e.g., "Biodata")
      heroTitle.innerHTML = ''; // Clear content
      heroTitle.classList.add('typing');
      let i = 0;
      const typeWriter = () => {
        if (i < beforeSpan.length) {
          heroTitle.innerHTML += beforeSpan.charAt(i);
          i++;
          setTimeout(typeWriter, 100);
        } else {
          // Append the <span> with its content
          heroTitle.innerHTML += `<span>${insideSpan}</span>`;
          heroTitle.classList.remove('typing');
        }
      };
      setTimeout(typeWriter, 500); // Delay start
    } else {
      // Fallback if no <span> (though unlikely)
      const text = heroTitle.textContent;
      heroTitle.textContent = '';
      heroTitle.classList.add('typing');
      let i = 0;
      const typeWriter = () => {
        if (i < text.length) {
          heroTitle.textContent += text.charAt(i);
          i++;
          setTimeout(typeWriter, 100);
        } else {
          heroTitle.classList.remove('typing');
        }
      };
      setTimeout(typeWriter, 500);
    }
  }

  // Page Load Fade-In for Key Elements
  const loadElements = document.querySelectorAll('.card, .hero, .cta-strip');
  loadElements.forEach((el, index) => {
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, index * 200);
  });

  // Smooth Scrolling for Nav Links
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Scroll-Triggered Animations
  const animateElements = document.querySelectorAll('[data-animate]');
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, observerOptions);

  animateElements.forEach(el => observer.observe(el));

  // Enhanced Hover Effects for Gallery/Images
  const hoverElements = document.querySelectorAll('.gallery-grid img, .feature-card, .exp-card, .family-card');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      el.style.transform = 'scale(1.05) translateY(-5px)';
      el.style.boxShadow = '0 15px 35px rgba(53, 74, 47, 0.3)';
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = 'scale(1) translateY(0)';
      el.style.boxShadow = '0 6px 20px rgba(53, 74, 47, 0.1)';
    });
  });

  // Favourite Songs Play/Pause Functionality (Fixed: Pause now stops and resets the song)
  const songCards = document.querySelectorAll('.song-card');
  const audioPlayer = document.getElementById('audio-player');
  const audioSource = document.getElementById('audio-source');
  let currentPlayingCard = null;

  songCards.forEach(card => {
    const btn = card.querySelector('.play-pause-btn');
    const src = card.dataset.src;

    btn.addEventListener('click', () => {
      if (audioPlayer.src !== src || audioPlayer.paused) {
        // Play this song
        audioSource.src = src;
        audioPlayer.load();
        audioPlayer.play();
        btn.textContent = '⏸ Pause';

        // Pause any other playing song
        if (currentPlayingCard && currentPlayingCard !== card) {
          const prevBtn = currentPlayingCard.querySelector('.play-pause-btn');
          prevBtn.textContent = '▶ Play';
        }
        currentPlayingCard = card;
      } else {
        // Pause this song (now stops and resets to beginning)
        audioPlayer.pause();
        audioPlayer.currentTime = 0; // Reset to start
        btn.textContent = '▶ Play';
        currentPlayingCard = null;
      }
    });
  });

  // Auto-pause and reset when song ends
  audioPlayer.addEventListener('ended', () => {
    if (currentPlayingCard) {
      const btn = currentPlayingCard.querySelector('.play-pause-btn');
      btn.textContent = '▶ Play';
      currentPlayingCard = null;
    }
  });

  // General Performance: Throttle Scroll Events
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      // Add any scroll-based effects here if needed
    }, 16); // ~60fps
  });
});

// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement; // Use <html> for global theme

// Load saved theme from localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  htmlElement.setAttribute('data-theme', savedTheme);
}

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
  const currentTheme = htmlElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  htmlElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});