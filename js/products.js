// Products data and management
class ProductManager {
  constructor() {
    this.products = [
      {
        id: 1,
        name: "Classic T-Shirt",
        price: 499,
        originalPrice: 699,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
        category: "clothing",
        description: "Comfortable cotton t-shirt perfect for everyday wear. Available in multiple colors and sizes.",
        rating: 4.5,
        reviews: 128,
        inStock: true,
        featured: true,
        discount: 29
      },
      {
        id: 2,
        name: "Stylish Watch",
        price: 899,
        originalPrice: 1299,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
        category: "accessories",
        description: "Modern analog watch with stainless steel band. Water resistant and perfect for any occasion.",
        rating: 4.8,
        reviews: 89,
        inStock: true,
        featured: true,
        discount: 31
      },
      {
        id: 3,
        name: "Wireless Earbuds",
        price: 1299,
        originalPrice: 1799,
        image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=400&fit=crop",
        category: "electronics",
        description: "High-quality wireless earbuds with noise cancellation and long battery life.",
        rating: 4.7,
        reviews: 256,
        inStock: true,
        featured: true,
        discount: 28
      },
      {
        id: 4,
        name: "Leather Wallet",
        price: 799,
        originalPrice: 999,
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=400&fit=crop",
        category: "accessories",
        description: "Premium leather wallet with multiple card slots and RFID protection.",
        rating: 4.6,
        reviews: 67,
        inStock: true,
        featured: false,
        discount: 20
      },
      {
        id: 5,
        name: "Sneakers",
        price: 1599,
        originalPrice: 2199,
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
        category: "footwear",
        description: "Comfortable and stylish sneakers perfect for daily wear and light sports.",
        rating: 4.4,
        reviews: 143,
        inStock: true,
        featured: false,
        discount: 27
      },
      {
        id: 6,
        name: "Smartphone Case",
        price: 299,
        originalPrice: 499,
        image: "https://images.unsplash.com/photo-1601593346740-925612772716?w=400&h=400&fit=crop",
        category: "electronics",
        description: "Durable smartphone case with shock absorption and wireless charging compatibility.",
        rating: 4.3,
        reviews: 234,
        inStock: true,
        featured: false,
        discount: 40
      },
      {
        id: 7,
        name: "Denim Jacket",
        price: 1299,
        originalPrice: 1699,
        image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&h=400&fit=crop",
        category: "clothing",
        description: "Classic denim jacket with a modern fit. Perfect for layering in any season.",
        rating: 4.5,
        reviews: 92,
        inStock: true,
        featured: false,
        discount: 24
      },
      {
        id: 8,
        name: "Backpack",
        price: 999,
        originalPrice: 1399,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
        category: "accessories",
        description: "Spacious and durable backpack with laptop compartment and water-resistant material.",
        rating: 4.7,
        reviews: 178,
        inStock: true,
        featured: false,
        discount: 29
      }
    ];
    
    this.categories = [
      { id: 'all', name: 'All Products', count: this.products.length },
      { id: 'clothing', name: 'Clothing', count: this.products.filter(p => p.category === 'clothing').length },
      { id: 'electronics', name: 'Electronics', count: this.products.filter(p => p.category === 'electronics').length },
      { id: 'accessories', name: 'Accessories', count: this.products.filter(p => p.category === 'accessories').length },
      { id: 'footwear', name: 'Footwear', count: this.products.filter(p => p.category === 'footwear').length }
    ];
  }

  getAllProducts() {
    return this.products;
  }

  getProductById(id) {
    return this.products.find(product => product.id === parseInt(id));
  }

  getProductsByCategory(category) {
    if (category === 'all') return this.products;
    return this.products.filter(product => product.category === category);
  }

  getFeaturedProducts() {
    return this.products.filter(product => product.featured);
  }

  searchProducts(query) {
    const searchTerm = query.toLowerCase();
    return this.products.filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
    );
  }

  sortProducts(products, sortBy) {
    const sortedProducts = [...products];
    
    switch (sortBy) {
      case 'price-low':
        return sortedProducts.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sortedProducts.sort((a, b) => b.price - a.price);
      case 'rating':
        return sortedProducts.sort((a, b) => b.rating - a.rating);
      case 'name':
        return sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
      case 'newest':
        return sortedProducts.sort((a, b) => b.id - a.id);
      default:
        return sortedProducts;
    }
  }

  getCategories() {
    return this.categories;
  }
}

// Export for use in other modules
window.ProductManager = ProductManager;