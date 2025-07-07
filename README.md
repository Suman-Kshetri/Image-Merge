# 🖼️ Image Tools

A lightweight **React + TypeScript + Tailwind CSS** app that helps you quickly:

- 🖼️ **Merge images** — upload, crop, and overlay images using canvas  
- 📱 **Generate QR codes** from text, URLs, or uploaded files  
- 🌙 **Toggle between Light/Dark mode** — preferences are saved and applied on reload

---

## 🚀 Features

- **Image Merger**  
  Crop two images and merge them into a single downloadable result.

- **QR Code Generator**  
  Instantly create a downloadable QR code from user input.

- **Light/Dark Theme Toggle**  
  - Theme state is initialized from `localStorage` or system preferences.  
  - A toggle button allows switching themes.  
  - The `<html>` class (`.light` / `.dark`) is updated immediately to avoid flashes.  
  - Theme choices are stored to persist across visits.

- **Responsive** and **accessible** UI built with Tailwind CSS

---

## 🧠 Tech Stack

- **React 18** + **TypeScript**
- **React Router v6** for navigation between tools
- **Tailwind CSS** (`darkMode: 'class'`) + CSS variables for theming
- `react-image-crop` for cropping in the image merger
- `qrcode.react` for generating QR codes
- Theme persistence via `localStorage`

---

## 🛠 Setup & Installation

1. **Clone the repo:**
   ```bash
   git clone https://github.com/Suman‑Kshetri/Image‑Tools.git
   cd Image‑Tools
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in the browser.

---

## ⚙ Theme Integration Details

- **`tailwind.config.js`** is set with:
  ```js
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx}']
  ```

- **Inline script in `index.html`:**  
  Reads `localStorage` or system setting before React loads and adds `.light`/`.dark` to `<html>`, preventing a flash of wrong theme.

- **`useTheme` hook:**  
  - Initializes theme based on stored preference or OS.  
  - Syncs `<html>` class and `localStorage` whenever the theme toggles.  
  - Returns `theme` and `toggleTheme()` to manage UI.

---

## 🧭 Usage

- **Home Page:**  
  - Toggle between light and dark themes using the fixed button  
  - Navigate using the cards to:  
    - **Image Merger** (`/merge-image`)  
    - **QR Code Generator** (`/qr-generator`)

- **Image Merger Page:**  
  Upload, crop, and merge images side by side.

- **QR Generator Page:**  
  Enter text or URL → click "Generate" → download your QR code.

---


> Built by **Suman Kshetri**
