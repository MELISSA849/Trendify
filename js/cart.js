// Shopping cart management
class CartManager {
  constructor() {
    this.cart = JSON.parse(localStorage.getItem('trendify_cart')) || {};
    this.wishlist = JSON.parse(localStorage.getItem('trendify_wishlist')) || [];
    this.updateCartCount();
  }

  addToCart(productId, quantity = 1) {
    const id = parseInt(productId);
    this.cart[id] = (this.cart[id] || 0) + quantity;
    this.saveCart();
    this.updateCartCount();
    this.showNotification(`Product added to cart!`, 'success');
    return this.cart[id];
  }

  removeFromCart(productId) {
    const id = parseInt(productId);
    delete this.cart[id];
    this.saveCart();
    this.updateCartCount();
    this.showNotification(`Product removed from cart!`, 'info');
  }

  updateQuantity(productId, quantity) {
    const id = parseInt(productId);
    if (quantity <= 0) {
      this.removeFromCart(id);
    } else {
      this.cart[id] = quantity;
      this.saveCart();
      this.updateCartCount();
    }
  }

  getCart() {
    return this.cart;
  }

  getCartItems() {
    const productManager = new ProductManager();
    const items = [];
    
    for (const [productId, quantity] of Object.entries(this.cart)) {
      const product = productManager.getProductById(productId);
      if (product) {
        items.push({
          ...product,
          quantity: quantity,
          total: product.price * quantity
        });
      }
    }
    
    return items;
  }

  getCartTotal() {
    return this.getCartItems().reduce((total, item) => total + item.total, 0);
  }

  getCartCount() {
    return Object.values(this.cart).reduce((total, quantity) => total + quantity, 0);
  }

  clearCart() {
    this.cart = {};
    this.saveCart();
    this.updateCartCount();
    this.showNotification('Cart cleared!', 'info');
  }

  saveCart() {
    localStorage.setItem('trendify_cart', JSON.stringify(this.cart));
  }

  updateCartCount() {
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
      const count = this.getCartCount();
      cartCountElement.textContent = count;
      cartCountElement.style.display = count > 0 ? 'flex' : 'none';
    }
  }

  // Wishlist methods
  addToWishlist(productId) {
    const id = parseInt(productId);
    if (!this.wishlist.includes(id)) {
      this.wishlist.push(id);
      this.saveWishlist();
      this.showNotification('Added to wishlist!', 'success');
      return true;
    }
    return false;
  }

  removeFromWishlist(productId) {
    const id = parseInt(productId);
    this.wishlist = this.wishlist.filter(item => item !== id);
    this.saveWishlist();
    this.showNotification('Removed from wishlist!', 'info');
  }

  isInWishlist(productId) {
    return this.wishlist.includes(parseInt(productId));
  }

  getWishlist() {
    const productManager = new ProductManager();
    return this.wishlist.map(id => productManager.getProductById(id)).filter(Boolean);
  }

  saveWishlist() {
    localStorage.setItem('trendify_wishlist', JSON.stringify(this.wishlist));
  }

  showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    Object.assign(notification.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '1rem 1.5rem',
      borderRadius: '8px',
      color: 'white',
      fontSize: '0.9rem',
      fontWeight: '500',
      zIndex: '10000',
      opacity: '0',
      transform: 'translateX(100%)',
      transition: 'all 0.3s ease'
    });

    // Set background color based on type
    const colors = {
      success: '#10b981',
      error: '#ef4444',
      warning: '#f59e0b',
      info: '#6366f1'
    };
    notification.style.backgroundColor = colors[type] || colors.info;

    // Add to DOM
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.opacity = '1';
      notification.style.transform = 'translateX(0)';
    }, 10);

    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }
}

// Export for use in other modules
window.CartManager = CartManager;