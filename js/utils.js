// Utility functions for the Trendify application
class Utils {
  // Format currency
  static formatCurrency(amount) {
    return `₹${amount.toLocaleString('en-IN')}`;
  }

  // Format discount percentage
  static formatDiscount(originalPrice, salePrice) {
    const discount = ((originalPrice - salePrice) / originalPrice) * 100;
    return Math.round(discount);
  }

  // Generate star rating HTML
  static generateStarRating(rating, maxStars = 5) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);

    let starsHTML = '';
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
      starsHTML += '<span class="star star-full">★</span>';
    }
    
    // Half star
    if (hasHalfStar) {
      starsHTML += '<span class="star star-half">★</span>';
    }
    
    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
      starsHTML += '<span class="star star-empty">☆</span>';
    }
    
    return starsHTML;
  }

  // Debounce function for search
  static debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Smooth scroll to element
  static scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Animate elements on scroll
  static animateOnScroll() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
        }
      });
    });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });
  }

  // Local storage helpers
  static setLocalStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      return false;
    }
  }

  static getLocalStorage(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return defaultValue;
    }
  }

  // Form validation
  static validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static validatePhone(phone) {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone.replace(/\s+/g, ''));
  }

  // Loading spinner
  static showLoader(element) {
    element.innerHTML = '<div class="spinner"></div>';
  }

  static hideLoader(element, content) {
    element.innerHTML = content;
  }

  // Image lazy loading
  static lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }

  // Generate product card HTML
  static generateProductCard(product) {
    const discountBadge = product.originalPrice && product.originalPrice > product.price 
      ? `<div class="product-badge">-${this.formatDiscount(product.originalPrice, product.price)}%</div>` 
      : '';

    return `
      <div class="product-card animate-on-scroll" data-product-id="${product.id}">
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}" 
               onerror="this.src='https://via.placeholder.com/400x400/6366f1/ffffff?text=${encodeURIComponent(product.name)}'">
          ${discountBadge}
          <div class="product-actions">
            <button class="product-action wishlist-btn" onclick="toggleWishlist(${product.id})" 
                    title="${window.cartManager?.isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}">
              ${window.cartManager?.isInWishlist(product.id) ? '❤️' : '🤍'}
            </button>
            <button class="product-action quick-view-btn" onclick="quickView(${product.id})" title="Quick view">
              👁️
            </button>
          </div>
        </div>
        <div class="product-info">
          <h3 class="product-title">${product.name}</h3>
          <p class="product-description">${product.description.substring(0, 80)}...</p>
          <div class="product-rating">
            ${this.generateStarRating(product.rating)}
            <span class="rating-count">(${product.reviews})</span>
          </div>
          <div class="product-price">
            <span class="price">${this.formatCurrency(product.price)}</span>
            ${product.originalPrice && product.originalPrice > product.price 
              ? `<span class="original-price">${this.formatCurrency(product.originalPrice)}</span>` 
              : ''}
          </div>
          <div class="product-footer">
            <button class="btn btn-primary" onclick="addToCart(${product.id})">
              Add to Cart
            </button>
            <button class="btn btn-outline" onclick="viewProduct(${product.id})">
              View Details
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // Mobile menu toggle
  static toggleMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const hamburger = document.querySelector('.hamburger');
    
    if (mobileMenu && hamburger) {
      mobileMenu.classList.toggle('active');
      hamburger.classList.toggle('active');
    }
  }

  // Close mobile menu when clicking outside
  static closeMobileMenuOnOutsideClick() {
    document.addEventListener('click', (e) => {
      const mobileMenu = document.querySelector('.mobile-menu');
      const hamburger = document.querySelector('.hamburger');
      
      if (mobileMenu && hamburger && mobileMenu.classList.contains('active')) {
        if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
          mobileMenu.classList.remove('active');
          hamburger.classList.remove('active');
        }
      }
    });
  }

  // Format date
  static formatDate(date) {
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  // Generate order ID
  static generateOrderId() {
    return 'TRD' + Date.now().toString().slice(-8);
  }

  // Initialize tooltips
  static initTooltips() {
    const tooltipTriggers = document.querySelectorAll('[data-tooltip]');
    
    tooltipTriggers.forEach(trigger => {
      trigger.addEventListener('mouseenter', (e) => {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = e.target.dataset.tooltip;
        
        Object.assign(tooltip.style, {
          position: 'absolute',
          background: '#1f2937',
          color: 'white',
          padding: '0.5rem',
          borderRadius: '4px',
          fontSize: '0.8rem',
          zIndex: '10000',
          opacity: '0',
          transition: 'opacity 0.2s'
        });
        
        document.body.appendChild(tooltip);
        
        const rect = e.target.getBoundingClientRect();
        tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 5 + 'px';
        
        setTimeout(() => tooltip.style.opacity = '1', 10);
        
        e.target._tooltip = tooltip;
      });
      
      trigger.addEventListener('mouseleave', (e) => {
        if (e.target._tooltip) {
          e.target._tooltip.remove();
          delete e.target._tooltip;
        }
      });
    });
  }
}

// Export for use in other modules
window.Utils = Utils;