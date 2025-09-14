# Fake News Detector 📰⚠️

A lightweight **Chrome Extension** that scans webpages for potential **fake news indicators** and **reliable news markers**, giving users a quick risk/reliability score.

It uses keyword analysis to highlight suspicious language and provide visual warnings directly on the page.

---

## 🚀 Features

* ✅ **Automatic Scanning** – Scans every webpage when loaded.
* ⚠️ **Fake News Risk Score** – Calculates and displays a percentage of potential fake content.
* 📊 **Real News Indicators** – Highlights credible sources and reliability factors.
* 🔔 **On-Page Banners** – Inserts warning or success banners at the top of the page.
* 🎛 **Popup Dashboard** – Shows risk & reliability percentages with quick rescan option.
* 🛠 **Custom Keywords** – Add your own fake-news keywords from the Options page.

---

## 📂 Project Structure

```
├── manifest.json        # Chrome extension manifest (v3)
├── background.js        # Handles installation & auto-scanning
├── content.js           # Scans webpage content & injects banners
├── popup.html           # Popup UI layout
├── popup.js             # Logic for displaying scan results in popup
├── options.html         # Options page for adding custom keywords
├── options.js           # Logic for managing custom keywords
├── styles.css           # Popup styling
└── images/              # Extension icons (16px, 48px, 128px)
```

---

## 📥 Installation

1. Clone this repository or download the ZIP.

   ```bash
   git clone https://github.com/Prabhas-gorusu/fake-news-detector.git
   ```
2. Open **Chrome** and go to:
   `chrome://extensions/`
3. Enable **Developer mode** (top right).
4. Click **Load unpacked** and select this project folder.
5. The extension should now appear in your toolbar!

---

## 🖼️ Screenshots

> Add your extension screenshots here to show how it looks in action.

* **Popup View**
  <img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/2818116f-3c07-45a3-9640-c802b2d70b87" />


* **On-Page Warning Banner**
  <img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/b4190efb-f342-4d1c-8931-888040cfbbc0" />


*(Place your images inside a `docs/screenshots/` folder in the repo.)*

---

## 🖼️ Usage

1. Browse any website.
2. The extension automatically scans the page for fake/reliable indicators.
3. If risk is detected, a **banner warning** will appear at the top of the page.
4. Open the extension popup for detailed scores:

   * **Fake News Risk %**
   * **Real News Reliability %**
5. (Optional) Add your own keywords under **Options** → `chrome-extension://.../options.html`

---

## 👥 Team

* **Prabhas Gorusu** – Developer

*Sharief SK* - Co - Developer

---

## ⚠️ Disclaimer

This tool is a **simple keyword-based detector**.
It **does not guarantee accuracy** and should **not replace critical thinking or fact-checking**.

Always verify information using trusted sources.

---

## 📌 Future Improvements

* 🔍 Machine learning–based detection
* 🌐 Multi-language support
* 📰 Integration with fact-checking APIs
* 📊 Detailed reports on keyword frequency

---

## 🧑‍💻 Contributing

Contributions are welcome!

* Fork this repo
* Create a new branch (`feature/your-feature`)
* Commit your changes
* Submit a Pull Request 🚀

---

## 📜 License

MIT License.
Feel free to modify and share.
