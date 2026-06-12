export interface FoodItem {
  id: string;
  name: string;
  price: number;
  calories: number;
  protein: number;
  availability: string; // e.g. "Available Today"
  pickupWindow: string; // e.g. "12:30 PM - 2:00 PM"
  orderCutoff: string; // e.g. "11:00 AM"
  remainingQuantity: number;
  rating: number;
  image: string;
  category: string;
  kitchenName: string; // Replaced restaurantName
  badge?: string; // e.g. "Student fav", "High Protein", "-20%", "Group", "Vegan"
  description: string;
  addons?: { name: string; price: number }[];
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
      "Main Library Station",
      "Engineering Block B Pickup",
      "Student Center Station",
      "Gate 3 Collection Point"
    ]
  },
  {
    id: "gutech",
    name: "GUtech",
    fullName: "German University of Technology in Oman",
    buildings: [
      "Main Amphitheater Kiosk",
      "Block C Station",
      "Student Dorms Zone A"
    ]
  },
  {
    id: "utas",
    name: "UTAS Muscat",
    fullName: "University of Technology and Applied Sciences",
    buildings: [
      "IT Department Kiosk",
      "Business Studies Station"
    ]
  }
];

export const CORPORATE_LOCATIONS: Campus[] = [
  {
    id: "bank_muscat",
    name: "Bank Muscat",
    fullName: "Bank Muscat Head Office",
    buildings: [
      "Bank Muscat Head Office Pickup Point",
      "Seeb Branch Pickup Point"
    ]
  },
  {
    id: "sohar_international",
    name: "Sohar Intl",
    fullName: "Sohar International Bank",
    buildings: [
      "Sohar International Head Office Pickup Point",
      "Al Qurum Branch Pickup Point"
    ]
  },
  {
    id: "nbo",
    name: "NBO",
    fullName: "National Bank of Oman",
    buildings: [
      "NBO Head Office Pickup Point",
      "Azaiba Branch Pickup Point"
    ]
  },
  {
    id: "ahlibank",
    name: "Ahlibank",
    fullName: "Ahlibank Oman",
    buildings: [
      "Ahlibank HQ Pickup Point"
    ]
  },
  {
    id: "hsbc",
    name: "HSBC",
    fullName: "HSBC Oman",
    buildings: [
      "HSBC Main Branch Pickup Point"
    ]
  }
];

export const CATEGORIES = [
  { id: "all", name: "All Meals", icon: "🔥" },
  { id: "biryani", name: "Biryani", icon: "🍚" },
  { id: "mandi", name: "Mandi", icon: "🍖" },
  { id: "combos", name: "Combos", icon: "🍱" },
  { id: "high-protein", name: "High Protein", icon: "💪" },
  { id: "budget", name: "Budget Meals", icon: "🪙" },
  { id: "specials", name: "Specials", icon: "✨" },
  { id: "drinks", name: "Drinks", icon: "🥤" },
  { id: "desserts", name: "Desserts", icon: "🍰" }
];

export const FOOD_ITEMS: FoodItem[] = [
  {
    id: "f1",
    name: "Chicken Biryani",
    price: 0.799,
    calories: 650,
    protein: 45,
    availability: "Available Today",
    pickupWindow: "12:30 PM - 2:00 PM",
    orderCutoff: "11:00 AM",
    remainingQuantity: 42,
    rating: 4.9,
    image: "/biryani.png",
    category: "biryani",
    kitchenName: "Central Kitchen",
    badge: "Student fav",
    description: "Premium spiced chicken biryani, cooked in bulk for the campus. Authentic taste with raita and salad.",
    addons: [
      { name: "Extra Raita", price: 0.100 },
      { name: "Double Chicken Portion", price: 0.500 },
      { name: "Boiled Egg", price: 0.150 }
    ]
  },
  {
    id: "f2",
    name: "Chicken Mandi",
    price: 0.899,
    calories: 720,
    protein: 50,
    availability: "Available Today",
    pickupWindow: "12:30 PM - 2:00 PM",
    orderCutoff: "11:00 AM",
    remainingQuantity: 32,
    rating: 4.8,
    image: "/mandi.png",
    category: "mandi",
    kitchenName: "Central Kitchen",
    badge: "High Protein",
    description: "Traditional slow-cooked Chicken Mandi served with smoked rice and special spicy tomato salsa (Daqoos).",
    addons: [
      { name: "Extra Rice", price: 0.200 },
      { name: "Extra Salsa", price: 0.050 }
    ]
  },
  {
    id: "f3",
    name: "Exam Week Combo",
    price: 1.500,
    calories: 850,
    protein: 35,
    availability: "Available Today",
    pickupWindow: "12:00 PM - 3:00 PM",
    orderCutoff: "11:30 AM",
    remainingQuantity: 15,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&q=80&w=600",
    category: "combos",
    kitchenName: "Campus Prep",
    badge: "-20%",
    description: "The ultimate fuel combo for exams: Double smashed burger, energy drink, and loaded fries.",
    addons: [
      { name: "Upgrade to Large Fries", price: 0.200 }
    ]
  },
  {
    id: "f4",
    name: "Mixed Grill Bowl",
    price: 1.900,
    calories: 550,
    protein: 60,
    availability: "Available Today",
    pickupWindow: "1:00 PM - 2:30 PM",
    orderCutoff: "10:30 AM",
    remainingQuantity: 20,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=600",
    category: "high-protein",
    kitchenName: "Grill Station",
    badge: "Gym fuel",
    description: "High protein mixed grill featuring chicken tikka, beef skewers, and a side of hummus and brown bread.",
    addons: [
      { name: "Extra Skewer", price: 0.900 }
    ]
  },
  {
    id: "f5",
    name: "Budget Falafel Wrap",
    price: 0.500,
    calories: 400,
    protein: 15,
    availability: "Available Today",
    pickupWindow: "11:00 AM - 4:00 PM",
    orderCutoff: "10:00 AM",
    remainingQuantity: 100,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1547058886-af77992d478c?auto=format&fit=crop&q=80&w=600",
    category: "budget",
    kitchenName: "Vegan Kitchen",
    badge: "Budget",
    description: "Crispy falafels with tahini and fresh greens wrapped in warm bread.",
    addons: [
      { name: "Add Hummus", price: 0.100 }
    ]
  },
  {
    id: "f6",
    name: "Iced Saffron Latte",
    price: 0.600,
    calories: 120,
    protein: 4,
    availability: "Available Today",
    pickupWindow: "All Day",
    orderCutoff: "None",
    remainingQuantity: 200,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&q=80&w=600",
    category: "drinks",
    kitchenName: "Coffee Kiosk",
    badge: "Specials",
    description: "Premium iced espresso shot blended with saffron syrup and light milk.",
    addons: []
  },
  {
    id: "f7",
    name: "Kunafa Bites",
    price: 0.800,
    calories: 350,
    protein: 5,
    availability: "Available Today",
    pickupWindow: "1:00 PM - 5:00 PM",
    orderCutoff: "12:00 PM",
    remainingQuantity: 50,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&q=80&w=600",
    category: "desserts",
    kitchenName: "Sweets Station",
    badge: "Dessert fav",
    description: "Bite-sized crispy kunafa with cream, soaked in orange blossom syrup.",
    addons: []
  }
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: "rev1",
    studentName: "Layla M.",
    university: "SQU • Engineering",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
    text: "Pre-ordered the Biryani before my 8AM math lecture. Picked it up at 12:30 with zero waiting in line! Complete lifesaver! 🍚🔥",
    likes: 42,
    rating: 5,
    dish: "Chicken Biryani"
  },
  {
    id: "rev2",
    studentName: "Omar K.",
    university: "GUtech • Computer Science",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
    text: "Mandi streak: 14 days in a row! Fast pickup at the Block C station. The meal is always hot and fresh. Highly recommend! 🍖",
    likes: 88,
    rating: 5,
    dish: "Chicken Mandi"
  },
  {
    id: "rev3",
    studentName: "Sara A.",
    university: "UTAS • Business",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
    text: "Got the Exam Week Combo with the study squad. Pre-ordered and picked up seamlessly using the QR pass. 🍔",
    likes: 61,
    rating: 5,
    dish: "Exam Week Combo"
  }
];

export const TRENDING_MEALS = [
  { rank: 1, name: "Chicken Biryani", ordersToday: 312, trendIcon: "📈" },
  { rank: 2, name: "Chicken Mandi", ordersToday: 198, trendIcon: "🔥" },
  { rank: 3, name: "Mixed Grill Bowl", ordersToday: 154, trendIcon: "🍢" },
  { rank: 4, name: "Budget Falafel Wrap", ordersToday: 96, trendIcon: "🌯" }
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
    title: "Weekly Meal Plan",
    sub: "Secure 5 lunches for OMR 4.000",
    gradient: "from-[#FF7A00] to-[#E64A19]",
    icon: "📅"
  },
  {
    id: "d2",
    title: "Student Combo",
    sub: "Main + Drink + Snack from OMR 1.500",
    gradient: "from-[#FF5C00] to-[#E64A19]",
    icon: "🍱"
  },
  {
    id: "d3",
    title: "Exam Week Combo",
    sub: "High energy meals 20% off",
    gradient: "from-[#2C3E50] to-[#0F2027]",
    icon: "🌙"
  },
  {
    id: "d4",
    title: "Group Meal Bundle",
    sub: "Pre-order for 4 friends, save 25%",
    gradient: "from-[#F39C12] to-[#D35400]",
    icon: "👥"
  },
  {
    id: "d5",
    title: "Budget Meal Specials",
    sub: "Filling food plates under OMR 1.000",
    gradient: "from-[#FF7A00] to-[#FF8C00]",
    icon: "🪙"
  }
];
