# AI Image Upscaler

A modern, responsive web application for AI-powered image upscaling built with Next.js and TailwindCSS.

## Features

✅ **Drag & Drop Upload** - Easy file upload with validation  
✅ **Multiple Scale Factors** - 2x, 4x, and 8x upscaling options  
✅ **Interactive Comparison** - Slider and side-by-side views  
✅ **Download Results** - Save enhanced images directly  
✅ **Responsive Design** - Works on mobile and desktop  
✅ **Error Handling** - User-friendly error messages  
✅ **Loading States** - Clear visual feedback during processing  
✅ **Enhanced Security & Auth** - Better authentication mechanisms integrated  
✅ **Payment Support** - Stripe integration for monetizing AI features  

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build for Production

```bash
npm run build
```

## Environment Variables

The following environment variables are required to configure the application. Create a `.env.local` file in your project and include the following:

```env
# Cloudinary - Used for image handling
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
NEXT_PUBLIC_CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Supabase - Authentication and backend services
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Stripe - Payment integration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key

# BetterAuth - Enhanced authentication
NEXT_PUBLIC_BETTERAUTH_KEY=your_betterauth_key
NEXT_PUBLIC_BETTERAUTH_URL=your_betterauth_url

# Database - Application backend database connection
DATABASE_URL=your_database_url
```


## Current Implementation

The application includes robust integrations such as **Supabase** for authentication, **Cloudinary** for image handling, and **Stripe** for payment processing. A mock upscaling service is used for development purposes, which can be replaced with real AI-powered APIs in production. The mock service:

- Validates image files (format, size)
- Simulates processing delay (3 seconds)
- Returns a demo upscaled image
- All configurable in `services/upscaler.js`

For production, update the mock implementation with your preferred AI API.

---

## Tech Stack

- **Next.js 14** - React framework
- **TailwindCSS** - Styling
- **Supabase** - Authentication
- **Cloudinary** - Image handling
- **Stripe** - Payment integration
- **BetterAuth** - Enhanced authentication
- **JavaScript** - Programming language

---

## Project Structure

```
├── app/
│   ├── globals.css          # Global styles and Tailwind
│   ├── layout.js            # Root layout
│   └── page.js              # Main page
├── components/
│   ├── Hero.js              # Upload & processing UI
│   ├── ResultDisplay.js     # Before/after comparison
│   ├── ImageShowcase.js     # Example demonstrations
│   ├── Features.js          # Features section
│   ├── HowItWorks.js        # How it works section
│   ├── FAQ.js               # FAQ section
│   ├── Footer.js            # Footer
│   └── Navbar.js            # Navigation bar
├── services/
│   └── upscaler.js          # Upscaling service (mock/real API)
└── public/
    └── images/              # Demo images
```

---

## License

MIT

---

## Notes

- The current implementation is client-side only (static export).
- For server-side API integration, remove `output: 'export'` from `next.config.js`.
- Replace the mock service in `services/upscaler.js` with real API logic when ready for production.
