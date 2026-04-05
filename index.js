// ============================================
// TYPING EFFECT
// ============================================
const typingText = "Build Something Amazing";
let typingIndex = 0;

function typeEffect() {
  if (typingIndex < typingText.length) {
    const char = typingText.charAt(typingIndex);
    const span = document.createElement("span");

    if (char === " ") {
      span.innerHTML = "&nbsp;";
    } else {
      span.textContent = char;
      span.className = "inline-block transform transition-transform duration-300 hover:-translate-y-2";
    }

    document.getElementById("typing-text").appendChild(span);
    typingIndex++;

    const delay = 80 + Math.random() * 40;
    setTimeout(typeEffect, delay);
  }
}

// Start typing effect when page loads
window.addEventListener("load", typeEffect);

// ============================================
// MOBILE MENU TOGGLE
// ============================================
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileNav = document.getElementById("mobile-nav");

mobileMenuBtn.addEventListener("click", () => {
  mobileNav.classList.toggle("hidden");
});

// Close mobile menu when link is clicked
const mobileNavLinks = mobileNav.querySelectorAll("a");
mobileNavLinks.forEach(link => {
  link.addEventListener("click", () => {
    mobileNav.classList.add("hidden");
  });
});

// ============================================
// MODAL FUNCTIONS
// ============================================
const modal = document.getElementById("modal");
const authForm = document.getElementById("authForm");

function openModal(type) {
  const formTitle = document.getElementById("form-title");
  const confirmPasswordGroup = document.getElementById("confirm-password-group");
  const switchText = document.getElementById("switch-text");
  const submitBtn = document.getElementById("submitBtn");
  
  // Reset form
  authForm.reset();
  clearFormErrors();
  document.getElementById("successMessage").classList.add("hidden");
  document.getElementById("errorMessage").classList.add("hidden");
  submitBtn.disabled = false;
  submitBtn.textContent = "Sign In";

  // Show modal
  modal.classList.remove("hidden");
  modal.classList.add("flex");

  if (type === "login") {
    formTitle.textContent = "Login";
    confirmPasswordGroup.classList.add("hidden");
    submitBtn.textContent = "Login";
    
    switchText.innerHTML = `
      Don't have an account? 
      <button type="button" onclick="openModal('signup')" 
        class="text-blue-500 cursor-pointer hover:underline font-semibold">
        Sign Up
      </button>
    `;
  } else {
    formTitle.textContent = "Sign Up";
    confirmPasswordGroup.classList.remove("hidden");
    submitBtn.textContent = "Create Account";
    
    switchText.innerHTML = `
      Already have an account? 
      <button type="button" onclick="openModal('login')" 
        class="text-blue-500 cursor-pointer hover:underline font-semibold">
        Login
      </button>
    `;
  }
}

function closeModal() {
  modal.classList.add("hidden");
  modal.classList.remove("flex");
}

// Close modal when clicking outside
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// Close modal with ESC key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// ============================================
// FORM VALIDATION
// ============================================
function clearFormErrors() {
  document.querySelectorAll("[id$='-error']").forEach(el => {
    el.classList.add("hidden");
  });
}

function showError(fieldId, message) {
  const errorEl = document.getElementById(`${fieldId}-error`);
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.classList.remove("hidden");
  }
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateAuthForm() {
  clearFormErrors();
  let isValid = true;

  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirm-password");
  const isSignup = !document.getElementById("confirm-password-group").classList.contains("hidden");

  // Email validation
  if (!email.value.trim()) {
    showError("email", "Email is required");
    isValid = false;
  } else if (!validateEmail(email.value)) {
    showError("email", "Please enter a valid email");
    isValid = false;
  }

  // Password validation
  if (!password.value) {
    showError("password", "Password is required");
    isValid = false;
  } else if (password.value.length < 6) {
    showError("password", "Password must be at least 6 characters");
    isValid = false;
  }

  // Confirm password validation (for signup)
  if (isSignup) {
    if (!confirmPassword.value) {
      showError("confirm-password", "Please confirm your password");
      isValid = false;
    } else if (confirmPassword.value !== password.value) {
      showError("confirm-password", "Passwords do not match");
      isValid = false;
    }
  }

  return isValid;
}

// Auth Form Submit
authForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!validateAuthForm()) {
    return;
  }

  const submitBtn = document.getElementById("submitBtn");
  const successMessage = document.getElementById("successMessage");
  const errorMessage = document.getElementById("errorMessage");

  // Show loading state
  submitBtn.disabled = true;
  const originalText = submitBtn.textContent;
  submitBtn.textContent = "Processing...";

  // Simulate API call
  setTimeout(() => {
    // Show success message
    successMessage.textContent = `Success! Welcome to AwesomeWebsite.`;
    successMessage.classList.remove("hidden");
    errorMessage.classList.add("hidden");

    // Reset button
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;

    // Close modal after 2 seconds
    setTimeout(() => {
      closeModal();
    }, 2000);
  }, 1500);
});

// ============================================
// CONTACT FORM VALIDATION & SUBMISSION
// ============================================
const contactForm = document.getElementById("contactForm");

function validateContactForm() {
  let isValid = true;
  const name = document.getElementById("name");
  const email = document.getElementById("contact-email");
  const message = document.getElementById("message");

  // Clear previous errors
  document.getElementById("name-error").classList.add("hidden");
  document.getElementById("contact-email-error").classList.add("hidden");
  document.getElementById("message-error").classList.add("hidden");

  // Name validation
  if (!name.value.trim()) {
    document.getElementById("name-error").textContent = "Name is required";
    document.getElementById("name-error").classList.remove("hidden");
    isValid = false;
  }

  // Email validation
  if (!email.value.trim()) {
    document.getElementById("contact-email-error").textContent = "Email is required";
    document.getElementById("contact-email-error").classList.remove("hidden");
    isValid = false;
  } else if (!validateEmail(email.value)) {
    document.getElementById("contact-email-error").textContent = "Please enter a valid email";
    document.getElementById("contact-email-error").classList.remove("hidden");
    isValid = false;
  }

  // Message validation
  if (!message.value.trim()) {
    document.getElementById("message-error").textContent = "Message is required";
    document.getElementById("message-error").classList.remove("hidden");
    isValid = false;
  } else if (message.value.trim().length < 10) {
    document.getElementById("message-error").textContent = "Message must be at least 10 characters";
    document.getElementById("message-error").classList.remove("hidden");
    isValid = false;
  }

  return isValid;
}

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!validateContactForm()) {
    return;
  }

  const submitBtn = document.getElementById("contactSubmitBtn");
  const successMessage = document.getElementById("contactSuccessMessage");
  const errorMessage = document.getElementById("contactErrorMessage");

  // Hide previous messages
  successMessage.classList.add("hidden");
  errorMessage.classList.add("hidden");

  // Show loading state
  submitBtn.disabled = true;
  const originalText = submitBtn.textContent;
  submitBtn.textContent = "Sending...";

  try {
    // Simulate API call
    setTimeout(() => {
      // Show success message
      successMessage.textContent = "✓ Message sent successfully! We'll get back to you soon.";
      successMessage.classList.remove("hidden");

      // Reset form
      contactForm.reset();

      // Reset button
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }, 1500);
  } catch (error) {
    // Show error message
    errorMessage.textContent = "✗ Failed to send message. Please try again.";
    errorMessage.classList.remove("hidden");

    // Reset button
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  }
});

// ============================================
// SMOOTH SCROLL BEHAVIOR (Already in CSS but here for reference)
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all service cards
document.querySelectorAll('section[id] > div > div').forEach(el => {
  observer.observe(el);
});

// ============================================
// ACCESSIBILITY - SKIP TO MAIN CONTENT
// ============================================
const skipLink = document.createElement('a');
skipLink.href = '#about';
skipLink.textContent = 'Skip to main content';
skipLink.className = 'absolute top-0 left-0 z-[100] bg-blue-500 text-white px-4 py-2 transform -translate-y-full focus:translate-y-0 transition-transform';
document.body.insertBefore(skipLink, document.body.firstChild);

// ============================================
// FOCUS VISIBLE FOR KEYBOARD NAVIGATION
// ============================================
const style = document.createElement('style');
style.textContent = `
  *:focus-visible {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }

  input:focus,
  textarea:focus,
  button:focus {
    outline: none;
  }
`;
document.head.appendChild(style);

console.log("✓ All scripts loaded successfully!");
