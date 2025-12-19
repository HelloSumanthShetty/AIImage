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

## Current Implementation

The application currently uses a **mock upscaling service** that simulates API processing. The mock service:

- Validates image files (format, size)
- Simulates processing delay (3 seconds)
- Returns a demo upscaled image
- All configurable in `services/upscaler.js`

## Integrating Real AI APIs

To integrate a real upscaling API, update `services/upscaler.js`:

### Option 1: Replicate API (Real-ESRGAN)

```javascript
// services/upscaler.js
async upscaleImage(file, scaleFactor = 4) {
  const validation = this.validateImage(file);
  if (!validation.valid) throw new Error(validation.errors.join(', '));

  // Convert file to base64
  const base64 = await this.fileToBase64(file);

  // Call Replicate API
  const response = await fetch('https://api.replicate.com/v1/predictions', {
    method: 'POST',
    headers: {
      'Authorization': `Token ${process.env.NEXT_PUBLIC_REPLICATE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      version: 'YOUR_MODEL_VERSION',
      input: {
        image: base64,
        scale: scaleFactor
      }
    })
  });

  const prediction = await response.json();
  
  // Poll for results
  let result = prediction;
  while (result.status !== 'succeeded' && result.status !== 'failed') {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const statusResponse = await fetch(prediction.urls.get, {
      headers: { 'Authorization': `Token ${process.env.NEXT_PUBLIC_REPLICATE_API_KEY}` }
    });
    result = await statusResponse.json();
  }

  if (result.status === 'failed') {
    throw new Error('Upscaling failed');
  }

  return {
    success: true,
    originalImage: URL.createObjectURL(file),
    upscaledImage: result.output,
    // ... other fields
  };
}
```

### Option 2: Clipdrop API

```javascript
async upscaleImage(file, scaleFactor = 4) {
  const validation = this.validateImage(file);
  if (!validation.valid) throw new Error(validation.errors.join(', '));

  const formData = new FormData();
  formData.append('image_file', file);
  formData.append('target_width', originalWidth * scaleFactor);
  formData.append('target_height', originalHeight * scaleFactor);

  const response = await fetch('https://clipdrop-api.co/image-upscaling/v1/upscale', {
    method: 'POST',
    headers: {
      'x-api-key': process.env.NEXT_PUBLIC_CLIPDROP_API_KEY,
    },
    body: formData
  });

  const blob = await response.blob();
  const upscaledUrl = URL.createObjectURL(blob);

  return {
    success: true,
    originalImage: URL.createObjectURL(file),
    upscaledImage: upscaledUrl,
    // ... other fields
  };
}
```

### Option 3: Fal.ai

```javascript
import * as fal from "@fal-ai/serverless-client";

async upscaleImage(file, scaleFactor = 4) {
  const validation = this.validateImage(file);
  if (!validation.valid) throw new Error(validation.errors.join(', '));

  // Upload image
  const imageUrl = await fal.storage.upload(file);

  // Run upscaling
  const result = await fal.subscribe("fal-ai/real-esrgan", {
    input: {
      image_url: imageUrl,
      scale: scaleFactor
    }
  });

  return {
    success: true,
    originalImage: URL.createObjectURL(file),
    upscaledImage: result.image.url,
    // ... other fields
  };
}
```

## Configuration

Edit `services/upscaler.js` to configure:

```javascript
const CONFIG = {
  // Change this to test with different demo images
  MOCK_UPSCALED_IMAGE: '/images/portrait-after.png',
  
  // Processing delay for mock service
  PROCESSING_DELAY: 3000,
  
  // Maximum file size (10MB)
  MAX_FILE_SIZE: 10 * 1024 * 1024,
  
  // Supported formats
  SUPPORTED_FORMATS: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/heic'],
};
```

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

## Environment Variables

For production APIs, create a `.env.local` file:

```env
# Replicate
NEXT_PUBLIC_REPLICATE_API_KEY=your_key_here

# Clipdrop
NEXT_PUBLIC_CLIPDROP_API_KEY=your_key_here

# Fal.ai
NEXT_PUBLIC_FAL_KEY=your_key_here
```

## Tech Stack

- **Next.js 14** - React framework
- **TailwindCSS** - Styling
- **JavaScript** - Programming language

## License

MIT

## Notes

- The current implementation is client-side only (static export)
- For server-side API integration, remove `output: 'export'` from `next.config.js`
- All API integrations shown above are examples and may need adjustment based on current API specifications
