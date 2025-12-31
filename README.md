
# SunSmart DTH - Sri Thirumala Enterprises

An advanced AI-powered customer support and hardware management platform designed specifically for **Sri Thirumala Enterprises**, an authorized Sun Direct DTH service provider.

## 🚀 Key Features

- **SunSmart AI Support**: Powered by Google Gemini 3 Flash, providing 24/7 technical assistance for common DTH errors (E-32-52), hardware troubleshooting, and price quotes.
- **Live Interaction Mirroring**: Every keyboard input is mirrored in real-time, ensuring absolute transparency for customers during checkout and support queries.
- **DTH Hardware Catalog**: A comprehensive inventory of antennas, remotes, cables, LNBs, and STBs with quantity-aware ordering.
- **Smart Order Tracking**: Real-time progress updates from order confirmation to technician installation.
- **Technician Workforce Portal**: Manage field visits, run simulations, and track job statuses for a network of 20+ field technicians.

## 🛠️ Technology Stack

- **Frontend**: React 19 (ES6+), Tailwind CSS (Mobile-first responsive design)
- **AI Engine**: Google GenAI SDK (Gemini-3-Flash-Preview)
- **State Management**: React Hooks (useState, useEffect, useRef)
- **Icons/UI**: Custom shadow-driven neumorphic components

## 📦 Setup & Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/sunsmart-dth.git
   cd sunsmart-dth
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory and add your Gemini API Key:
   ```env
   API_KEY=your_google_ai_studio_api_key
   ```

4. **Run the application**:
   ```bash
   npm run dev
   ```

## 🏗️ Architecture

The app follows a modular component-based architecture:
- `/components`: UI units like `SupportChat`, `PartsGrid`, and `OrderTracking`.
- `/services`: Integration with external APIs (Gemini AI).
- `/types`: TypeScript definitions for Orders, Tickets, and Inventory.

---
*Authorized Sun Direct Service Provider - Support: 9985265605*
