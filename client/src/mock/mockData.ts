export interface FoodItem {
  id: string;
  name: string;
  price: number;
  deliveryTime: number;
  rating: number;
  image: string;
  category: string;
  restaurantId: string;
  restaurantName: string;
  badge?: string; // e.g. "Student fav", "Study fuel", "-20%", "Group", "Vegan"
  description: string;
  addons?: { name: string; price: number }[];
}

export interface Restaurant {
  id: string;
  name: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  minOrder: number;
  category: string;
  image: string;
  bannerImage: string;
  studentDeal: string;
  featured?: boolean;
}

export interface Review {
  id: string;
  studentName: string;
  university: string;
  avatar: string;
  text: string;
  likes: number;
  rating: number;
  dish: string;
}

export interface Campus {
  id: string;
  name: string;
  fullName: string;
  buildings: string[];
}

export const CAMPUSES: Campus[] = [
  {
    id: "squ",
    name: "SQU",
    fullName: "Sultan Qaboos University",
    buildings: [
      "Main Library Hall",
      "College of Engineering (Block B)",
      "College of Medicine (Auditorium)",
      "Student Center Lounge",
      "Hostel 4 Ground Lobby",
      "SQU Gate 3 Drop-off",
      "Cultural Center Plaza"
    ]
  },
  {
    id: "gutech",
    name: "GUtech",
    fullName: "German University of Technology in Oman",
    buildings: [
      "Main Amphitheater",
      "Block C Main Entrance",
      "Academic Building 2 Lobby",
      "Student Dorms Zone A",
      "GUtech Square Cafeteria"
    ]
  },
  {
    id: "utas",
    name: "UTAS Muscat",
    fullName: "University of Technology and Applied Sciences",
    buildings: [
      "IT Department Entrance",
      "Engineering Workshops Lobby",
      "Business Studies Hub",
      "Main UTAS Gate"
    ]
  },
  {
    id: "nizwa",
    name: "Nizwa Uni",
    fullName: "University of Nizwa",
    buildings: [
      "Initial Stage Hallway",
      "Ishraqa Student Hub",
      "Dormitory Block D",
      "Main Library Reception"
    ]
  },
  {
    id: "mec",
    name: "Middle East College",
    fullName: "Middle East College (KBZ Campus)",
    buildings: [
      "MEC Student Hub",
      "PG Block Reception",
      "Academic Block A Lobby",
      "MEC Campus Courtyard"
    ]
  }
];

export const CATEGORIES = [
  { id: "all", name: "All Fuel", icon: "🔥" },
  { id: "wraps", name: "Wraps & Shawarma", icon: "🌯" },
  { id: "burgers", name: "Juicy Burgers", icon: "🍔" },
  { id: "grill", name: "Omani Grill", icon: "🍢" },
  { id: "study-fuel", name: "Study Fuel & Karak", icon: "☕" },
  { id: "vegan", name: "Vegan & Healthy", icon: "🥗" },
  { id: "sweet", name: "Sweets & Desserts", icon: "🍰" }
];

export const RESTAURANTS: Restaurant[] = [
  {
    id: "r1",
    name: "Levant Grill",
    rating: 4.9,
    deliveryTime: "12-16 min",
    deliveryFee: 0.400,
    minOrder: 1.000,
    category: "Wraps & Shawarma",
    image: "https://images.unsplash.com/photo-1561651823-34fed022540e?auto=format&fit=crop&q=80&w=600",
    bannerImage: "https://images.unsplash.com/photo-1529003600303-bd51f39627fb?auto=format&fit=crop&q=80&w=1200",
    studentDeal: "Student Combo: Shawarma + Karak + Fries for OMR 1.500",
    featured: true
  },
  {
    id: "r2",
    name: "Souq Café",
    rating: 4.8,
    deliveryTime: "5-10 min",
    deliveryFee: 0.200,
    minOrder: 0.300,
    category: "Study Fuel & Karak",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&q=80&w=600",
    bannerImage: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=1200",
    studentDeal: "Exam fuel special: Buy 3 Karak, get 1 free",
    featured: true
  },
  {
    id: "r3",
    name: "Patty Block",
    rating: 4.7,
    deliveryTime: "18-24 min",
    deliveryFee: 0.500,
    minOrder: 1.500,
    category: "Juicy Burgers",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=600",
    bannerImage: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=1200",
    studentDeal: "Flat 20% off all loaded burger meals with code STUDENT15",
    featured: true
  },
  {
    id: "r4",
    name: "Bayt Mishwi",
    rating: 4.9,
    deliveryTime: "22-28 min",
    deliveryFee: 0.600,
    minOrder: 2.000,
    category: "Omani Grill",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=600",
    bannerImage: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1200",
    studentDeal: "Group Platter: Save 25% on 4+ grills combo",
    featured: true
  },
  {
    id: "r5",
    name: "Olive & Sun",
    rating: 4.8,
    deliveryTime: "10-15 min",
    deliveryFee: 0.400,
    minOrder: 1.000,
    category: "Vegan & Healthy",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600",
    bannerImage: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=1200",
    studentDeal: "15% discount for environmental club student card holders",
    featured: false
  },
  {
    id: "r6",
    name: "Karak Corner",
    rating: 4.6,
    deliveryTime: "6-12 min",
    deliveryFee: 0.300,
    minOrder: 0.500,
    category: "Study Fuel & Karak",
    image: "https://images.unsplash.com/photo-1594631252845-29fc4cc8cdf9?auto=format&fit=crop&q=80&w=600",
    bannerImage: "https://images.unsplash.com/photo-1517254485383-a2416b8d27ec?auto=format&fit=crop&q=80&w=1200",
    studentDeal: "Free mini Luqaimat pack with any specialty Karak",
    featured: false
  }
];

export const FOOD_ITEMS: FoodItem[] = [
  {
    id: "f1",
    name: "Beef Shawarma",
    price: 1.200,
    deliveryTime: 14,
    rating: 4.9,
    image: "/beef-shawarma.jpg",
    category: "wraps",
    restaurantId: "r1",
    restaurantName: "Levant Grill",
    badge: "Student fav",
    description: "Premium sliced spiced beef wrap, cooked on a vertical rotisserie, packed with Omani garlic toum, pickles, and crispy fries wrapped in warm Lebanese bread.",
    addons: [
      { name: "Extra Garlic Toum", price: 0.100 },
      { name: "Double Beef Portion", price: 0.500 },
      { name: "Add Cheddar Cheese", price: 0.150 }
    ]
  },
  {
    id: "f2",
    name: "Karak Cup",
    price: 0.300,
    deliveryTime: 8,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=600",
    category: "study-fuel",
    restaurantId: "r2",
    restaurantName: "Souq Café",
    badge: "Study fuel",
    description: "Rich black tea leaves slow-simmered with cardamom, cloves, cinnamon, saffron, and creamy evaporated rainbow milk. The absolute fuel for library study sessions.",
    addons: [
      { name: "Double Saffron", price: 0.100 },
      { name: "Less Sugar", price: 0.000 },
      { name: "Extra Cardamom", price: 0.050 }
    ]
  },
  {
    id: "f3",
    name: "Smash Burger",
    price: 2.500,
    deliveryTime: 20,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&q=80&w=600",
    category: "burgers",
    restaurantId: "r3",
    restaurantName: "Patty Block",
    badge: "-20%",
    description: "Double smashed Angus beef patties, dual melted American cheese, secret block sauce, grilled onions, house pickles on a toasted buttered brioche bun.",
    addons: [
      { name: "Extra Beef Patty", price: 0.800 },
      { name: "Crispy Bacon (Halal)", price: 0.400 },
      { name: "Spicy Jalapeno Slices", price: 0.100 }
    ]
  },
  {
    id: "f4",
    name: "Mixed Grill",
    price: 3.900,
    deliveryTime: 26,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1603073163308-9654c3fb70b5?auto=format&fit=crop&q=80&w=600",
    category: "grill",
    restaurantId: "r4",
    restaurantName: "Bayt Mishwi",
    badge: "Group",
    description: "Authentic platter featuring Omani-style spiced beef skewers, succulent chicken tikka kebab, lamb chops grilled over active charcoal charcoal, served with hummus and garlic dip.",
    addons: [
      { name: "Extra Skewer Tikka", price: 0.900 },
      { name: "Warm Bread Basket (3 pcs)", price: 0.200 },
      { name: "Side Arabic Salad", price: 0.400 }
    ]
  },
  {
    id: "f5",
    name: "Falafel Bowl",
    price: 1.100,
    deliveryTime: 12,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1547058886-af77992d478c?auto=format&fit=crop&q=80&w=600",
    category: "vegan",
    restaurantId: "r5",
    restaurantName: "Olive & Sun",
    badge: "Vegan",
    description: "Six crispy golden herb-infused falafels served over wild red quinoa, mixed greens, pickled turnips, cucumbers, red cabbage, topped with premium creamy tahini dressing.",
    addons: [
      { name: "Extra Falafel (3 pcs)", price: 0.300 },
      { name: "Add Avocado Slices", price: 0.400 },
      { name: "Hummus Scoop", price: 0.200 }
    ]
  },
  {
    id: "f6",
    name: "Shuwa Burger",
    price: 2.800,
    deliveryTime: 18,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&q=80&w=600",
    category: "burgers",
    restaurantId: "r4",
    restaurantName: "Bayt Mishwi",
    badge: "Omani Special",
    description: "24-hour slow cooked traditional Omani banana-leaf Shuwa lamb, shredded and mixed with mild cheddar and local dynamic honey-mustard, on a soft potato bun.",
    addons: [
      { name: "Extra Shuwa Lamb Portion", price: 1.200 },
      { name: "Fried Egg", price: 0.150 }
    ]
  },
  {
    id: "f7",
    name: "Kunafa Plate",
    price: 1.500,
    deliveryTime: 15,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&q=80&w=600",
    category: "sweet",
    restaurantId: "r2",
    restaurantName: "Souq Café",
    badge: "Dessert fav",
    description: "Crispy shredded noodle pastry layer baked around sweet melted akawi cheese, soaked in cardamom-rose scented orange blossom syrup, dusted with fine green pistachios.",
    addons: [
      { name: "Extra Sugar Syrup", price: 0.000 },
      { name: "Double Pistachio Dusting", price: 0.150 },
      { name: "Vanilla Ice Cream Scoop", price: 0.300 }
    ]
  },
  {
    id: "f8",
    name: "Loaded Cheese Fries",
    price: 1.400,
    deliveryTime: 12,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&q=80&w=600",
    category: "burgers",
    restaurantId: "r3",
    restaurantName: "Patty Block",
    badge: "Student fav",
    description: "Golden farm fries loaded with warm liquid yellow cheddar cheese sauce, customized minced beef bits, jalapeños, crispy dry onion flakes, and premium spicy block dressing.",
    addons: [
      { name: "Extra Liquid Cheese", price: 0.200 },
      { name: "Add Shredded Chicken", price: 0.400 }
    ]
  },
  {
    id: "f9",
    name: "Saffron Karak Latte",
    price: 0.600,
    deliveryTime: 10,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&q=80&w=600",
    category: "study-fuel",
    restaurantId: "r6",
    restaurantName: "Karak Corner",
    badge: "Study fuel",
    description: "Premium iced espresso shot blended with our aromatic spice tea mix, infused with real high-grade Omani saffron syrup and light coconut milk.",
    addons: [
      { name: "Whipped Cream Top", price: 0.100 },
      { name: "Add Espresso Shot", price: 0.200 }
    ]
  },
  {
    id: "f10",
    name: "Healthy Hummus Bowl",
    price: 0.900,
    deliveryTime: 10,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1628294895520-5890d9f364bc?auto=format&fit=crop&q=80&w=600",
    category: "vegan",
    restaurantId: "r5",
    restaurantName: "Olive & Sun",
    badge: "Budget friendly",
    description: "Traditional chickpea and tahini spread topped with high-grade extra virgin olive oil from Jabal Akhdar, active chickpeas, microgreens, and served with 2 freshly baked pita breads.",
    addons: [
      { name: "Extra Pita Bread (2 pcs)", price: 0.150 },
      { name: "Olive Tapenade Topping", price: 0.100 }
    ]
  }
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: "rev1",
    studentName: "Layla M.",
    university: "SQU • Engineering",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
    text: "Got the Levant combo before my 8AM math lecture — complete lifesaver! Fast delivery directly to the Engineering Block B entrance. 🌯🔥",
    likes: 42,
    rating: 5,
    dish: "Beef Shawarma"
  },
  {
    id: "rev2",
    studentName: "Omar K.",
    university: "GUtech • Computer Science",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
    text: "Karak streak: 14 days in a row! Fast delivery at the library. The evaporated milk is slow cooked to perfection. Highly recommend adding extra saffron! ☕",
    likes: 88,
    rating: 5,
    dish: "Karak Cup"
  },
  {
    id: "rev3",
    studentName: "Sara A.",
    university: "Nizwa Uni • Business",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
    text: "Ordered a bunch of Patty Block smash burgers with the study squad. Split with friends, got the 20% discount instantly. 0 regrets. 🍔",
    likes: 61,
    rating: 5,
    dish: "Smash Burger"
  }
];

export const TRENDING_MEALS = [
  { rank: 1, name: "Beef Shawarma", ordersToday: 312, trendIcon: "📈" },
  { rank: 2, name: "Karak Cup", ordersToday: 198, trendIcon: "🔥" },
  { rank: 3, name: "Smash Burger", ordersToday: 154, trendIcon: "🍔" },
  { rank: 4, name: "Mixed Grill", ordersToday: 96, trendIcon: "🍢" }
];

export interface StudentDeal {
  id: string;
  title: string;
  sub: string;
  gradient: string;
  icon: string;
}

export const STUDENT_DEALS: StudentDeal[] = [
  {
    id: "d1",
    title: "Student Combos",
    sub: "Wrap + drink + fries from OMR 1.500",
    gradient: "from-[#FF7A00] to-[#E64A19]",
    icon: "🍔"
  },
  {
    id: "d2",
    title: "Exam Week Deals",
    sub: "30% off high study-fuel orders",
    gradient: "from-[#FF5C00] to-[#E64A19]",
    icon: "📖"
  },
  {
    id: "d3",
    title: "Late Night Meals",
    sub: "Free hot karak after 10 PM",
    gradient: "from-[#2C3E50] to-[#0F2027]",
    icon: "🌙"
  },
  {
    id: "d4",
    title: "Group Orders",
    sub: "Split with friends, save 20% flat",
    gradient: "from-[#F39C12] to-[#D35400]",
    icon: "👥"
  },
  {
    id: "d5",
    title: "Budget Meals",
    sub: "Filling food plates under OMR 1.000",
    gradient: "from-[#FF7A00] to-[#FF8C00]",
    icon: "🪙"
  }
];
