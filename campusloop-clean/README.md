# CampusLoop — College Marketplace Platform
> **B.Tech Final Year Capstone Project Demonstration**  
> **Project Title:** *Design and Implementation of a College Marketplace Platform*  
> **Candidate:** Ramsha Azra (Final Year B.Tech CSE, Amity University)  
> **Core Innovation:** Automated 50% Resale Price Affordability Enforcement Engine

---

## 🎓 1. Project Overview & Motivation

Commercial second-hand platforms (OLX, Quikr, Facebook Marketplace) are plagued by scalping, predatory markups, lack of student verification, and high friction for on-campus exchanges. 

**CampusLoop** solves this through a dedicated, student-to-student peer marketplace designed around university ecosystems:
1. **Affordable by Design (50% Fair Price Rule):** Resale prices are strictly capped at $\le 50\%$ of the reference market retail price. The application dynamically rejects listings priced above this limit.
2. **Campus-Verified Ecosystem:** Student profiles require official college domain email addresses (`@amity.edu`, `.ac.in`, `.edu`).
3. **Hyperlocal Exchange:** Eliminates packaging and shipping overheads through designated on-campus meetup checkpoints (Libraries, Department blocks, Hostels).
4. **Circularity & Reuse:** Facilitates reuse of textbooks, lab kits, calculators, engineering drafters, and handwritten notes across senior and junior batches.

---

## 🌟 2. Key Features

- **Dynamic 50% Price Validator & Visualizer:** Real-time dual-slider gauge comparing Market Price vs. Campus Cap vs. Seller's Price vs. Student Savings.
- **Interactive Multi-Parameter Search & Filter:** Simultaneous filtering across keywords, 8 academic categories, item condition, and price range.
- **Product Details Modal & "Affordable by Design" Highlight:** Transparent cost breakdown and savings calculations.
- **Peer-to-Peer Inquiry System:** Instant in-app messaging modal with prefilled inquiry templates and meeting spot selector.
- **Seller Dashboard (`/listings`):** Dynamic metrics: Total Listings, Available, Reserved, Sold, and Total Campus Savings generated.
- **Full Lifecycle Status Transitions:** 
  - `Available`: Live on marketplace
  - `Reserved`: Locked for buyer meetup
  - `Sold`: Archived from public view while retained in seller records
- **Zero-Alert Modern Toast Notification Engine:** Clean, non-blocking slide-in toasts for every lifecycle event.
- **Persistent LocalStorage Layer:** Data persists across browser refreshes and tab reloads, with a 1-click **"Reset Demo Data"** button for examiners.

---

## 🚀 3. External Examiner 8-Step Viva Demonstration Script

Follow this step-by-step sequence during the project evaluation:

| Step | Action | Expected Output |
| :--- | :--- | :--- |
| **Step 1** | Open Homepage (`/`) | Displays the hero stats (250+ listings, savings tracker), search bar, 8 categories, and verified student listings. |
| **Step 2** | Type `"python"` into the Search Bar | Live filtering instantly displays Python textbooks and notes. |
| **Step 3** | Click the **"Python Programming Handbook"** Card | Opens the large Item Modal showing Market Price (₹1,200), Campus Price (₹500), Savings (₹700), seller profile, and the **"Affordable by design"** 50% cap guarantee badge. |
| **Step 4** | Click **"Contact Seller"** and press **"Send Interest"** | Dispatches message and triggers the toast: *"Interest sent successfully. The seller can now respond to your request."* |
| **Step 5** | Navigate to **"Sell an Item"** (`/sell`) and test the 50% rule: <br>1. Set Market: `₹1,000`, Resale: `₹700`<br>2. Change Resale to: `₹450` | 1. **Immediate rejection**: Price bar turns red, showing *"✕ Price exceeds maximum allowed resale price of ₹500"*, and Publish button is disabled.<br>2. **Immediate validation**: Status turns green with *"✓ Great! Your price follows CampusLoop's affordability rule. Buyer saves ₹550"*. |
| **Step 6** | Click **"Publish Listing"** | Triggers confetti, success toast, and immediately lists the new item in the Marketplace (`/`). |
| **Step 7** | Navigate to **"My Listings"** (`/listings`) | Dashboard stats update dynamically. Change the item status from **Available** → **Reserved** → **Sold**. |
| **Step 8** | Return to Marketplace (`/`) | The item marked as **Sold** is automatically excluded from public marketplace results (satisfying Rule 4). |

---

## 🛠️ 4. Technical Architecture

```
bookstore/
├── index.html                  # HTML entry point with Manrope & Inter web fonts
├── vite.config.js              # Vite bundler configuration
├── tailwind.config.js          # Tailwind CSS utility configuration
├── postcss.config.js           # PostCSS autoprefixer setup
├── package.json                # Project dependencies
└── src/
    ├── main.jsx                # React root bootstrap
    ├── App.jsx                 # Route definitions and modal layout
    ├── index.css               # Design system & custom CSS variables
    ├── context/
    │   ├── AuthContext.jsx         # College authentication & demo profile state
    │   ├── MarketplaceContext.jsx  # Listings state, search/filter algorithms, and stats
    │   └── ToastContext.jsx        # Notification dispatch and toast rendering
    ├── components/
    │   ├── Navbar.jsx              # Sticky header with logo, search & profile dropdown
    │   ├── Footer.jsx              # Minimal project capstone footer
    │   ├── ProductCard.jsx         # Modern card with hover lift and savings tag
    │   ├── ProductGrid.jsx         # Responsive grid with sorting and empty state
    │   ├── SearchBar.jsx           # Live multi-field search bar
    │   ├── CategoryFilter.jsx      # Scrollable category pills
    │   ├── PriceValidator.jsx      # Live 50% affordability engine visualizer
    │   ├── ItemModal.jsx           # Detailed product modal
    │   ├── ContactModal.jsx        # Peer-to-peer message dialog
    │   ├── AuthModal.jsx           # Student login & registration modal
    │   ├── EditItemModal.jsx       # Listing editor with 50% re-validation
    │   ├── DeleteConfirmModal.jsx  # Safety delete modal
    │   ├── NotificationDrawer.jsx  # Side drawer for campus alerts
    │   └── MobileFilterDrawer.jsx  # Bottom sheet filters for mobile devices
    ├── pages/
    │   ├── Marketplace.jsx         # Homepage with hero, stats, & products
    │   ├── SellItem.jsx            # Two-column listing form + live preview
    │   └── MyListings.jsx          # Seller dashboard with status switches
    ├── data/
    │   └── demoData.js             # Realistic academic listings and preloaded items
    └── utils/
        ├── storage.js              # LocalStorage persistence manager
        └── validation.js           # 50% price formula, email check, image validator
```

---

## 💻 5. Running the Application Locally

### Prerequisites
- Node.js (v18.0 or newer)
- npm (v9.0 or newer)

### Installation & Launch
```bash
# 1. Clone or open the project directory
cd bookstore

# 2. Install dependencies
npm install

# 3. Start the local development server
npm run dev

# 4. Open in browser:
# http://localhost:5173
```

### Production Build
```bash
npm run build
npm run preview
```

---

## 🔮 6. Backend Integration Roadmap (Node.js / Express / MongoDB)

The frontend is architected with clean separation of concerns. To connect an enterprise backend:
1. Replace `storage.js` with Axios / Fetch calls pointing to:
   - `POST /api/auth/login` and `POST /api/auth/register` (JWT auth with bcrypt password hashing)
   - `GET /api/items` (MongoDB queries with pagination and indexing)
   - `POST /api/items` (Multer + Cloudinary image upload)
   - `PATCH /api/items/:id/status` (Listing state management)
   - `POST /api/messages` (Socket.io or MongoDB message store)
2. Enforce the same 50% price ceiling in an Express controller middleware:
   ```javascript
   if (req.body.resalePrice > req.body.marketPrice * 0.5) {
     return res.status(400).json({ error: "Resale price exceeds 50% market cap" });
   }
   ```

---

## 📄 Academic Citation
- **Project Title:** Design and Implementation of a College Marketplace Platform
- **Degree:** Bachelor of Technology (B.Tech) in Computer Science & Engineering
- **Platform Name:** CampusLoop — College Marketplace
- **Year:** 2026
