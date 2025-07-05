# Nepali Date Picker

[![GitHub Pages](https://img.shields.io/badge/demo-online-blue?logo=github)](https://skybaseinnovations.github.io/nepali-date-picker/demo.html)

A modern, lightweight, and fully-featured Nepali (Bikram Sambat) date picker for web apps. Supports both Nepali and English languages, beautiful UI, and easy integration.

## ✨ Features
- Bikram Sambat (BS) calendar support
- English and Nepali language & digits
- Modern, responsive UI
- Customizable date format
- Min/max date, year range, and validation
- Keyboard and mouse navigation
- Utility functions for AD/BS conversion
- ISC License (permissive, open source)

## 🚀 Demo
See the live demo here:  
👉 [Nepali Date Picker Demo](https://skybaseinnovations.github.io/nepali-date-picker/demo.html)

## 📦 Installation
Clone or download this repo, or use the files directly:

```sh
git clone https://github.com/skybaseinnovations/nepali-date-picker.git
```

## 🛠 Usage
1. Include jQuery and the plugin files in your HTML:

```html
<link rel="stylesheet" href="src/nepaliDatePicker.css">
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="src/nepaliDatePicker.js"></script>
```

2. Add an input and initialize:

```html
<input type="text" id="nepali-date">
<script>
  $('#nepali-date').nepaliDatePicker({ language: 'np' });
</script>
```

See [demo.html](demo.html) for advanced usage and configuration.

## 🌐 GitHub Pages
The demo is hosted on GitHub Pages. To enable your own, push to the `main` branch and enable Pages in your repo settings (set root as `/`).

## 📄 License
[ISC License](LICENSE)

---

Made with ❤️ by [Skybase Innovations](https://github.com/skybaseinnovations) 