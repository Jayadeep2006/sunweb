
# SunSmart DTH - Sri Thirumala Enterprises

An advanced AI-powered customer support and hardware management platform designed specifically for **Sri Thirumala Enterprises**, an authorized Sun Direct DTH service provider.

## 🚀 Key Features

- **SunSmart AI Support**: Powered by Google Gemini 3 Flash, providing 24/7 technical assistance for common DTH errors (E-32-52).
- **Live Interaction Mirroring**: Every keyboard input is mirrored in real-time for absolute transparency.
- **Hardware Catalog**: Real-time inventory of dishes, remotes, and STBs.
- **Order Tracking**: Comprehensive progress tracking for hardware delivery.

## 🛠️ Technology Stack

- **Frontend**: React 19, Tailwind CSS
- **AI Engine**: Google GenAI SDK (Gemini-3-Flash-Preview)
- **Build Tool**: Vite

## 🌐 Deployment (Render)

To deploy this project as a **Static Site** on Render:

1.  **Connect GitHub**: Link your repository to a new Render Static Site.
2.  **Build Settings**:
    - **Build Command**: `npm install && npm run build`
    - **Publish Directory**: `dist`
3.  **Environment Variables**:
    - Go to the **Environment** tab on Render.
    - Add `API_KEY`: `[Your Gemini API Key]`
4.  **Custom Domains**: Add your domain (e.g., `srithirumala.in`) in the Render settings if applicable.

## 📦 Local Setup

1. `npm install`
2. Create `.env` and add `API_KEY=...`
3. `npm run dev`

---
*Authorized Sun Direct Service Provider - Support: 9985265605*
