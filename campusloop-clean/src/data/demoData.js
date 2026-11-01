export const INITIAL_USER = {
  id: "user-demo-ramsha",
  name: "Ramsha Azra",
  email: "ramsha@amity.edu",
  academicYear: "Final Year",
  college: "Amity University",
  avatar: "RA",
  joined: "August 2023"
};

export const CATEGORIES = [
  "All",
  "Books",
  "Notes",
  "Equipment",
  "Appliances",
  "Stationery",
  "Electronics",
  "Other"
];

export const CONDITIONS = [
  "New",
  "Like New",
  "Good",
  "Fair"
];

export const DEMO_LISTINGS = [
  {
    id: "item-1",
    title: "Python Programming Handbook",
    category: "Books",
    condition: "Like New",
    marketPrice: 1200,
    resalePrice: 500,
    description: "Comprehensive guide to Core & Advanced Python, Data Structures and Algorithms with clean code examples. Zero highlights or torn pages. Used for CS201 semester exam.",
    image: "https://images.unsplash.com/photo-1532012164546-f432f2e37271?auto=format&fit=crop&w=800&q=80",
    sellerId: "user-demo-ramsha",
    sellerName: "Ramsha Azra",
    sellerEmail: "ramsha@amity.edu",
    sellerCollege: "Amity University · Final Year CSE",
    status: "Available", // Available | Reserved | Sold
    createdAt: "2026-10-28T10:30:00Z",
    location: "Block A - CS Department"
  },
  {
    id: "item-2",
    title: "Engineering Mathematics — R.K. Jain",
    category: "Books",
    condition: "Good",
    marketPrice: 900,
    resalePrice: 400,
    description: "Standard text for 1st & 2nd year Engineering Mathematics. Includes solved examples for differential equations, linear algebra, and Fourier series. Binding is intact.",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
    sellerId: "user-aarav",
    sellerName: "Aarav Sharma",
    sellerEmail: "aarav@amity.edu",
    sellerCollege: "Amity University · 3rd Year ME",
    status: "Available",
    createdAt: "2026-10-29T14:15:00Z",
    location: "Hostel 3 Common Room"
  },
  {
    id: "item-3",
    title: "Casio FX-991EX ClassWiz Scientific Calculator",
    category: "Equipment",
    condition: "Good",
    marketPrice: 1800,
    resalePrice: 850,
    description: "High-resolution natural textbook display with 552 functions. Allowed in university examinations. Comes with hard slide-on case and fresh battery.",
    image: "https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&w=800&q=80",
    sellerId: "user-demo-ramsha",
    sellerName: "Ramsha Azra",
    sellerEmail: "ramsha@amity.edu",
    sellerCollege: "Amity University · Final Year CSE",
    status: "Available",
    createdAt: "2026-10-27T09:00:00Z",
    location: "Central Library Desk"
  },
  {
    id: "item-4",
    title: "DBMS Complete Handwritten Notes",
    category: "Notes",
    condition: "Like New",
    marketPrice: 500,
    resalePrice: 200,
    description: "Neatly handwritten lecture notes covering SQL, Relational Algebra, Normalization (1NF to BCNF), ACID transactions and Concurrency Control. Spiral bound, color-coded diagrams.",
    image: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=800&q=80",
    sellerId: "user-sneha",
    sellerName: "Sneha Patel",
    sellerEmail: "sneha.p@amity.edu",
    sellerCollege: "Amity University · 3rd Year IT",
    status: "Available",
    createdAt: "2026-10-30T11:45:00Z",
    location: "Academic Block 4"
  },
  {
    id: "item-5",
    title: "Complete Engineering Drawing Kit with Mini Drafter",
    category: "Equipment",
    condition: "Good",
    marketPrice: 1000,
    resalePrice: 450,
    description: "Includes calibrated mini-drafter, set squares, roller scale, French curves, mechanical clutch pencils, and A2 drawing sheet holder folder. Essential for First Year Engineering.",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    sellerId: "user-rohan",
    sellerName: "Rohan Verma",
    sellerEmail: "rohan.v@amity.edu",
    sellerCollege: "Amity University · 2nd Year Civil",
    status: "Available",
    createdAt: "2026-10-26T16:20:00Z",
    location: "Mechanical Workshop Block"
  },
  {
    id: "item-6",
    title: "Rechargeable LED Mini Study Lamp",
    category: "Appliances",
    condition: "Good",
    marketPrice: 900,
    resalePrice: 350,
    description: "3 brightness levels with eye-protection warm/white light modes. 2000mAh battery provides 6+ hours of night study during exams. USB-C charging cable included.",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
    sellerId: "user-ananya",
    sellerName: "Ananya Roy",
    sellerEmail: "ananya.r@amity.edu",
    sellerCollege: "Amity University · 4th Year ECE",
    status: "Available",
    createdAt: "2026-10-25T13:10:00Z",
    location: "Girls Hostel B, Room 204"
  },
  {
    id: "item-7",
    title: "Java & Object Oriented Programming Notes",
    category: "Notes",
    condition: "Like New",
    marketPrice: 600,
    resalePrice: 250,
    description: "Concise exam-oriented notes for OOPs concepts, Java Collections Framework, Exception Handling, Multithreading, and previous 5 years' university solved papers.",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80",
    sellerId: "user-vikram",
    sellerName: "Vikram Nair",
    sellerEmail: "vikram.n@amity.edu",
    sellerCollege: "Amity University · Final Year CSE",
    status: "Available",
    createdAt: "2026-10-31T08:30:00Z",
    location: "Canteen Plaza"
  },
  {
    id: "item-8",
    title: "Pure Cotton Laboratory Apron / Lab Coat (Size M)",
    category: "Other",
    condition: "Good",
    marketPrice: 700,
    resalePrice: 300,
    description: "100% thick white cotton lab coat with deep side pockets and college emblem space. Freshly laundered, no acid burns or chemical stains. Fits medium/large.",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    sellerId: "user-priya",
    sellerName: "Priya Singh",
    sellerEmail: "priya.s@amity.edu",
    sellerCollege: "Amity University · 2nd Year Biotech",
    status: "Available",
    createdAt: "2026-10-24T18:00:00Z",
    location: "Biotech Lab 2"
  },
  {
    id: "item-9",
    title: "Pigeon 1.5L Multi-Cooker & Electric Kettle",
    category: "Appliances",
    condition: "Good",
    marketPrice: 1400,
    resalePrice: 600,
    description: "Great for making instant noodles, boiling eggs, coffee and tea in hostel rooms. Stainless steel interior with automatic cut-off and dry-boil safety protection.",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
    sellerId: "user-demo-ramsha",
    sellerName: "Ramsha Azra",
    sellerEmail: "ramsha@amity.edu",
    sellerCollege: "Amity University · Final Year CSE",
    status: "Available",
    createdAt: "2026-10-23T15:20:00Z",
    location: "Hostel 1 Common Area"
  },
  {
    id: "item-10",
    title: "Drafting & Architectural Precision Compass Set",
    category: "Stationery",
    condition: "Like New",
    marketPrice: 400,
    resalePrice: 150,
    description: "Includes heavy-duty metal bow compass, beam extension, lead replacement box and spare needles in a protective hard case. Precision calibrated for engineering graphics.",
    image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=800&q=80",
    sellerId: "user-sneha",
    sellerName: "Sneha Patel",
    sellerEmail: "sneha.p@amity.edu",
    sellerCollege: "Amity University · 3rd Year IT",
    status: "Available",
    createdAt: "2026-10-22T12:00:00Z",
    location: "Block 4 Reception"
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: "notif-1",
    title: "Interest on your Listing",
    message: "Aarav Sharma sent an inquiry about 'Casio FX-991EX Scientific Calculator'.",
    time: "10 mins ago",
    unread: true,
    type: "inquiry"
  },
  {
    id: "notif-2",
    title: "Price Compliance Approved",
    message: "Your listing 'Python Programming Handbook' conforms to the 50% fair-resale cap.",
    time: "2 hours ago",
    unread: false,
    type: "system"
  },
  {
    id: "notif-3",
    title: "Welcome to CampusLoop!",
    message: "Welcome Ramsha Azra (Final Year · Amity University) to the campus student marketplace.",
    time: "1 day ago",
    unread: false,
    type: "welcome"
  }
];
