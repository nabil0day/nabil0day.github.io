// Add this to your JavaScript section
// ... existing code ...
document.addEventListener('DOMContentLoaded', () => {
  const newsTabBtns = document.querySelectorAll('.news-tabs .tab-btn');
  const timelineItems = document.querySelectorAll('.timeline-item');
  const timelineYears = document.querySelectorAll('.timeline-year');

  newsTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      newsTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const selectedYear = btn.getAttribute('data-year');

      // Show/hide timeline items based on year
      timelineItems.forEach(item => {
        const itemYear = item.getAttribute('data-year');
        
        if (selectedYear === 'all' || selectedYear === itemYear) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });

      // Show/hide year markers
      timelineYears.forEach(year => {
        const yearText = year.getAttribute('data-year');
        if (selectedYear === 'all' || selectedYear === yearText) {
          year.style.display = 'block';
        } else {
          year.style.display = 'none';
        }
      });
    });
  });
});
// ... existing code ...
// // Recommendations Slider
// const slider = document.querySelector('.recommendations-slider');
// const cards = document.querySelectorAll('.recommendation-card');
// const prevBtn = document.querySelector('.prev-btn');
// const nextBtn = document.querySelector('.next-btn');
// const dotsContainer = document.querySelector('.slider-dots');

// let currentSlide = 0;
// let autoSlideInterval;

// // Create dots
// cards.forEach((_, index) => {
//   const dot = document.createElement('div');
//   dot.classList.add('dot');
//   if (index === 0) dot.classList.add('active');
//   dot.addEventListener('click', () => goToSlide(index));
//   dotsContainer.appendChild(dot);
// });

// const dots = document.querySelectorAll('.dot');

// function updateSlider() {
//   cards.forEach((card, index) => {
//     card.classList.remove('active');
//     if (index === currentSlide) {
//       card.classList.add('active');
//     }
//   });
  
//   dots.forEach((dot, index) => {
//     dot.classList.toggle('active', index === currentSlide);
//   });
// }

// function goToSlide(index) {
//   currentSlide = index;
//   updateSlider();
//   resetAutoSlide();
// }

// function nextSlide() {
//   currentSlide = (currentSlide + 1) % cards.length;
//   updateSlider();
// }

// function prevSlide() {
//   currentSlide = (currentSlide - 1 + cards.length) % cards.length;
//   updateSlider();
// }

// function resetAutoSlide() {
//   clearInterval(autoSlideInterval);
//   autoSlideInterval = setInterval(nextSlide, 5000);
// }

// prevBtn.addEventListener('click', () => {
//   prevSlide();
//   resetAutoSlide();
// });

// nextBtn.addEventListener('click', () => {
//   nextSlide();
//   resetAutoSlide();
// });

// // Start auto-sliding
// resetAutoSlide();

// // Pause auto-sliding when hovering over the slider
// slider.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
// slider.addEventListener('mouseleave', resetAutoSlide);
  // Contact Form (mailto, with honeypot + time-trap spam defenses)
const formStatus = document.getElementById('form-status');
const formLoadedAt = Date.now();

const setStatus = (msg, type) => {
  formStatus.textContent = msg;
  formStatus.classList.remove('is-success', 'is-error');
  if (type) formStatus.classList.add(type);
};

// Only present on the contact page
const sendBtn = document.getElementById('send-btn');

if (sendBtn) sendBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();

  // Honeypot: only bots fill in this hidden field
  if (document.getElementById('website').value) {
    setStatus('Something went wrong. Please try again.', 'is-error');
    return;
  }

  // Time-trap: humans don't submit within two seconds of page load
  if (Date.now() - formLoadedAt < 2000) {
    setStatus('That was a little too quick — please try again.', 'is-error');
    return;
  }

  if (!name || !email || !subject || !message) {
    setStatus('Please fill in all fields.', 'is-error');
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setStatus('Please enter a valid email address.', 'is-error');
    return;
  }

  const mailtoLink = `mailto:hadiurrahmannabil@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
  window.location.href = mailtoLink;

  setStatus('Opening your email app — press send there to deliver the message.', 'is-success');

  // Reset form
  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
  document.getElementById('subject').value = '';
  document.getElementById('message').value = '';
  document.getElementById('website').value = '';
});
// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');
// Check system theme preference
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
// Function to set theme
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  themeIcon.classList.replace(
    theme === 'dark' ? 'fa-sun' : 'fa-moon',
    theme === 'dark' ? 'fa-moon' : 'fa-sun'
  );
}

  
// Check for saved theme or use system preference
if (localStorage.getItem('theme')) {
  setTheme(localStorage.getItem('theme'));
} else {
  setTheme(prefersDarkScheme.matches ? 'dark' : 'light');
}
// Listen for theme toggle click
themeToggle.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  setTheme(currentTheme === 'dark' ? 'light' : 'dark');
});

// Listen for system theme changes
prefersDarkScheme.addEventListener('change', (e) => {
  if (!localStorage.getItem('theme')) {
    setTheme(e.matches ? 'dark' : 'light');
  }
});
  
  // Mobile Navigation
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('show');
  });
  
  // Close mobile nav when clicking a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('show');
    });
  });
  
  // Research Tabs
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');

      // News tabs use data-year and are handled separately
      if (!tabId) return;

      // Remove active class from all buttons and contents
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      
      // Add active class to current button and content
      btn.classList.add('active');
      document.getElementById(tabId).classList.add('active');
    });
  });


  // Scroll to Top functionality
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {  // Show button after scrolling 300px
    scrollTopBtn.classList.add('show');
  } else {
    scrollTopBtn.classList.remove('show');
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const hash = this.getAttribute('href');
      e.preventDefault();

      // Bare "#" is the dropdown toggle, not a scroll target
      if (hash === '#') return;

      const target = document.querySelector(hash);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    });
  });

  // Neural Network Background Animation
  const canvas = document.getElementById('neural-network-bg');
  if (canvas) {
    const ctx = canvas.getContext('2d');
  
  // Set canvas dimensions
  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  // Track mouse position
  const mousePosition = {
    x: undefined,
    y: undefined
  };
  
  // Add mouse move event listener
  window.addEventListener('mousemove', (event) => {
    mousePosition.x = event.x;
    mousePosition.y = event.y;
  });
  
  // Neural network nodes and connections
  const nodes = [];
  const maxNodes = 50;
  const connectionDistance = 150;
  
  // Create initial nodes
  for (let i = 0; i < maxNodes; i++) {
    nodes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 1,
      vx: Math.random() * 1 - 0.5,
      vy: Math.random() * 1 - 0.5
    });
  }
  
  // Animation function
  function animate() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update node positions
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      
      // Check for mouse interaction
      if (mousePosition.x !== undefined && mousePosition.y !== undefined) {
        const dx = mousePosition.x - node.x;
        const dy = mousePosition.y - node.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Move nodes away from cursor within a certain radius
        const moveRadius = 100;
        if (distance < moveRadius) {
          // Calculate force (stronger when closer)
          const force = (moveRadius - distance) / moveRadius;
          // Move away from cursor
          node.x -= dx * force * 0.03;
          node.y -= dy * force * 0.03;
        }
      }
      
      // Original movement
      node.x += node.vx;
      node.y += node.vy;
      
      // Bounce off edges
      if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
      if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
      
      // Draw node
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fillStyle = document.documentElement.getAttribute('data-theme') === 'dark' 
        ? 'rgba(63, 81, 181, 0.6)' 
        : 'rgba(4, 2, 115, 0.6)';
      ctx.fill();
      
      // Draw connections
      for (let j = i + 1; j < nodes.length; j++) {
        const otherNode = nodes[j];
        const dx = otherNode.x - node.x;
        const dy = otherNode.y - node.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < connectionDistance) {
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(otherNode.x, otherNode.y);
          
          // Opacity based on distance
          const opacity = 1 - distance / connectionDistance;
          ctx.strokeStyle = document.documentElement.getAttribute('data-theme') === 'dark' 
            ? `rgba(63, 81, 181, ${opacity * 0.3})` 
            : `rgba(4, 2, 115, ${opacity * 0.3})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
    
    requestAnimationFrame(animate);
  }
  
  // Start animation
  animate();
  }

// Highlight the current page in the navigation
const navCurrent = location.pathname.split('/').pop() || 'index.html';

document.querySelectorAll('.nav-link, .dropdown-item').forEach(link => {
  const href = link.getAttribute('href') || '';
  if (!href || href.charAt(0) === '#') return;
  if (href.split('#')[0] === navCurrent) link.classList.add('active');
});
