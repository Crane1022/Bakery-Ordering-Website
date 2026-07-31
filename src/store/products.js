// ---------------------------------------------------------------------------
// SINGLE SOURCE OF TRUTH FOR PRODUCTS
// Both the Home page (Product_List.vue) and the Shop page (Shop.vue) import
// from here, so there's only one place to add/edit/remove a biscuit — no more
// keeping two separate product lists in sync by hand.
// ---------------------------------------------------------------------------

export const categories = ['All', 'Traditional', 'Indulgent', 'Seasonal', 'Gluten-Free']

export const products = [
  {
    id: 1,
    name: "Classic Honey Oat",
    description: "Slow-baked with organic wild honey and rolled oats.",
    price: 12.00,
    category: "Traditional",
    tag: "Best Seller",
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Dark Cacao & Sea Salt",
    description: "Rich 70% dark chocolate with a pinch of hand-harvested salt.",
    price: 14.00,
    category: "Indulgent",
    tag: "New",
    image: "https://images.unsplash.com/photo-1590080874088-eec64895b423?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Lavender Lemon Shortbread",
    description: "Delicate floral notes paired with fresh zesty citrus.",
    price: 13.00,
    category: "Seasonal",
    tag: "Seasonal",
    image: "https://images.unsplash.com/photo-1530648672449-81f6c723e2c1?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Matcha Shortbread",
    description: "Earthy ceremonial-grade matcha baked into a delicate, buttery crumb.",
    price: 15.00,
    category: "Seasonal",
    tag: null,
    image: "https://images.unsplash.com/photo-1515706886582-54c73c5eaf41?q=80&w=500&auto=format&fit=crop"
  }
]