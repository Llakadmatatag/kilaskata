// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const languageBtns = document.querySelectorAll('.language-btn');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const backToTopBtn = document.getElementById('back-to-top');
const currentYear = document.getElementById('current-year');

// Sample data for letters
const lettersData = [
  {
    id: 1,
    title: {
      en: "Overcoming Challenges",
      id: "Mengatasi Tantangan"
    },
    excerpt: {
      en: "A letter about finding strength in difficult times and emerging stronger than before.",
      id: "Sebuah surat tentang menemukan kekuatan di masa sulit dan muncul lebih kuat dari sebelumnya."
    },
    date: "2024-03-15",
    image: "https://source.unsplash.com/random/600x400/?motivation,letter,1"
  },
  {
    id: 2,
    title: {
      en: "The Power of Persistence",
      id: "Kekuatan Ketekunan"
    },
    excerpt: {
      en: "How staying persistent can help you achieve your dreams and overcome obstacles.",
      id: "Bagaimana tetap gigih dapat membantu Anda meraih impian dan mengatasi rintangan."
    },
    date: "2024-03-10",
    image: "https://source.unsplash.com/random/600x400/?motivation,letter,2"
  },
  {
    id: 3,
    title: {
      en: "Embracing Change",
      id: "Menerima Perubahan"
    },
    excerpt: {
      en: "Learning to adapt and grow through life's inevitable changes and challenges.",
      id: "Belajar beradaptasi dan tumbuh melalui perubahan dan tantangan hidup yang tak terhindarkan."
    },
    date: "2024-03-05",
    image: "https://source.unsplash.com/random/600x400/?motivation,letter,3"
  },
  {
    id: 4,
    title: {
      en: "Finding Your Purpose",
      id: "Menemukan Tujuan Hidup"
    },
    excerpt: {
      en: "A journey to discover what truly matters and how to align your life with your values.",
      id: "Sebuah perjalanan untuk menemukan apa yang benar-benar penting dan bagaimana menyelaraskan hidup dengan nilai-nilai Anda."
    },
    date: "2024-02-28",
    image: "https://source.unsplash.com/random/600x400/?motivation,letter,4"
  },
  {
    id: 5,
    title: {
      en: "The Art of Letting Go",
      id: "Seni Melepaskan"
    },
    excerpt: {
      en: "Learning to release what no longer serves you to make room for new opportunities.",
      id: "Belajar melepaskan apa yang tidak lagi melayani Anda untuk memberi ruang bagi peluang baru."
    },
    date: "2024-02-20",
    image: "https://source.unsplash.com/random/600x400/?motivation,letter,5"
  },
  {
    id: 6,
    title: {
      en: "Cultivating Gratitude",
      id: "Menumbuhkan Rasa Syukur"
    },
    excerpt: {
      en: "How practicing gratitude can transform your perspective and improve your well-being.",
      id: "Bagaimana melatih rasa syukur dapat mengubah perspektif dan meningkatkan kesejahteraan Anda."
    },
    date: "2024-02-15",
    image: "https://source.unsplash.com/random/600x400/?motivation,letter,6"
  }
];

// Current language state (default: English)
let currentLanguage = 'en';

// Initialize the application
function init() {
  // Set current year in footer
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }
  
  // Load saved theme preference or use system preference
  const savedTheme = localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  setTheme(savedTheme);
  
  // Load saved language preference
  const savedLanguage = localStorage.getItem('language') || 'en';
  setLanguage(savedLanguage);
  
  // Generate letter cards
  renderLetters();
  
  // Add event listeners
  addEventListeners();
}

// Add all event listeners
function addEventListeners() {
  // Theme toggle
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
  
  // Language switcher
  languageBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      setLanguage(lang);
    });
  });
  
  // Mobile menu toggle
  if (menuToggle) {
    menuToggle.addEventListener('click', toggleMenu);
  }
  
  // Close mobile menu when clicking on a nav link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        navLinks.classList.remove('active');
      }
    });
  });
  
  // Back to top button
  if (backToTopBtn) {
    window.addEventListener('scroll', toggleBackToTopButton);
    backToTopBtn.addEventListener('click', scrollToTop);
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Form submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
  }
}

// Toggle between dark and light theme
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
  
  // Save preference to localStorage
  localStorage.setItem('theme', newTheme);
  
  // Update button icon
  if (themeToggle) {
    const icon = themeToggle.querySelector('i');
    if (icon) {
      icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
  }
}

// Set theme
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  
  // Update button icon
  if (themeToggle) {
    const icon = themeToggle.querySelector('i');
    if (icon) {
      icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
  }
}

// Toggle mobile menu
function toggleMenu() {
  navLinks.classList.toggle('active');
  menuToggle.classList.toggle('active');
}

// Set language
function setLanguage(lang) {
  if (lang === currentLanguage) return;
  
  currentLanguage = lang;
  
  // Update active state of language buttons
  languageBtns.forEach(btn => {
    if (btn.getAttribute('data-lang') === lang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  
  // Save preference to localStorage
  localStorage.setItem('language', lang);
  
  // Update all translatable elements
  updateContentLanguage();
}

// Update content based on selected language
function updateContentLanguage() {
  // Update navigation links
  document.querySelectorAll('[data-en], [data-id]').forEach(element => {
    if (element.hasAttribute(`data-${currentLanguage}`)) {
      element.textContent = element.getAttribute(`data-${currentLanguage}`);
    }
    
    // Update placeholders
    if (element.hasAttribute(`data-${currentLanguage}-placeholder`)) {
      element.placeholder = element.getAttribute(`data-${currentLanguage}-placeholder`);
    }
  });
  
  // Re-render letters with updated language
  renderLetters();
}

// Render letter cards
function renderLetters() {
  const lettersContainer = document.querySelector('.letters-grid');
  if (!lettersContainer) return;
  
  lettersContainer.innerHTML = '';
  
  lettersData.forEach(letter => {
    const letterCard = document.createElement('div');
    letterCard.className = 'letter-card';
    letterCard.innerHTML = `
      <div class="letter-image">
        <img src="${letter.image}" alt="${letter.title[currentLanguage]}">
      </div>
      <div class="letter-content">
        <span class="letter-date">${formatDate(letter.date)}</span>
        <h3 class="letter-title">${letter.title[currentLanguage]}</h3>
        <p class="letter-excerpt">${letter.excerpt[currentLanguage]}</p>
        <a href="#" class="read-more" data-en="Read More" data-id="Baca Selengkapnya">
          <span>${currentLanguage === 'en' ? 'Read More' : 'Baca Selengkapnya'}</span>
          <i class="fas fa-arrow-right"></i>
        </a>
      </div>
    `;
    
    lettersContainer.appendChild(letterCard);
  });
}

// Format date
function formatDate(dateString) {
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    timeZone: 'UTC'
  };
  
  // For Indonesian language
  if (currentLanguage === 'id') {
    const months = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    
    const [year, month, day] = dateString.split('-');
    return `${parseInt(day)} ${months[parseInt(month) - 1]} ${year}`;
  }
  
  // For English
  return new Date(dateString).toLocaleDateString('en-US', options);
}

// Toggle back to top button visibility
function toggleBackToTopButton() {
  if (window.pageYOffset > 300) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
}

// Scroll to top
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Handle contact form submission
function handleFormSubmit(e) {
  e.preventDefault();
  
  // Get form data
  const formData = new FormData(e.target);
  const formObject = {};
  formData.forEach((value, key) => {
    formObject[key] = value;
  });
  
  // Here you would typically send the form data to a server
  console.log('Form submitted:', formObject);
  
  // Show success message
  const successMessage = document.createElement('div');
  successMessage.className = 'success-message';
  successMessage.textContent = currentLanguage === 'en' 
    ? 'Thank you for your message! I will get back to you soon.' 
    : 'Terima kasih atas pesan Anda! Saya akan segera menghubungi Anda.';
  
  const form = e.target;
  form.reset();
  form.appendChild(successMessage);
  
  // Remove success message after 5 seconds
  setTimeout(() => {
    successMessage.remove();
  }, 5000);
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Add animation on scroll
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .zoom-in');
  
  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (elementTop < windowHeight - 100) {
      element.classList.add('animate');
    }
  });
};

// Add scroll event listener for animations
window.addEventListener('scroll', animateOnScroll);

// Initial check for elements in viewport
document.addEventListener('DOMContentLoaded', () => {
  animateOnScroll();
  
  // Add animation classes to sections
  const sections = document.querySelectorAll('section');
  sections.forEach((section, index) => {
    if (index % 2 === 0) {
      section.classList.add('slide-in-left');
    } else {
      section.classList.add('slide-in-right');
    }
  });
});

// Add loading animation
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
  
  // Remove loading animation after page is fully loaded
  const loader = document.querySelector('.page-loader');
  if (loader) {
    setTimeout(() => {
      loader.style.display = 'none';
    }, 500);
  }
});
