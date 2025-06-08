# Hindi Letter Practice Game

A lightweight browser-based game designed to help children (or anyone!) learn to recognise and read Hindi characters while having fun.

The game presents random Hindi letters on screen and challenges the player to say the letter **as quickly as possible**.  As the player improves, the game automatically introduces more complex characters (matras and conjuncts) and changes the background colour to indicate progress.

---

## 🎮 Gameplay Overview

1. **A random letter appears** in large print at the centre of the page.
2. **The player says** (or thinks) the letter aloud.
3. **Click anywhere** to reveal the next letter.
4. The game **records the time** taken between letters and keeps track of the player's average speed.
5. When the player's average reaction time beats the target for a whole round, they are **promoted to the next level**.
6. At any time the player can **pause** (via the button or the space-bar) or **reset** their average.

---

## 📚 Current Levels

| Level | Characters Introduced                              | Target Average (s) |
|-------|----------------------------------------------------|--------------------|
| 1     | Independent **Vowels** & **Consonants**            | 0.50               |
| 2     | Consonants + **Matras** *(vowel diacritics)*       | 0.50               |
| 3     | Common **Conjuncts** + Matras                      | Free play          |

Each level lasts for 20 letters.  If the player's average response time is under the target threshold, they automatically progress.

---

## ✨ Key Features

- **Clean, distraction-free UI** – large central letter and minimal chrome.
- **Adaptive difficulty** with three progressive levels.
- **Real-time timer** and running average display.
- **Pause / Un-pause** with a button **or** the space-bar key.
- **Responsive design** – runs on desktops, tablets and mobiles.
- **Self-contained** – written in vanilla HTML/CSS/JS, no build tools required.

---

## 🚀 Getting Started

1. **Clone or download** this repository.
2. Open `index.html` in any modern web browser.
3. Start clicking (or tapping) the page to generate letters and begin practising!

No additional setup or dependencies are needed.

---

## 🕹️ Controls & Shortcuts

| Action                  | How                           |
|-------------------------|--------------------------------|
| Next letter             | Click / tap anywhere on page  |
| Pause / Unpause         | Click **Pause** button or press **Space-bar** |
| Reset average stats     | Click **Reset Average** button|

---

## 🗺️ Roadmap / Ideas

The project is at an early stage – pull requests and suggestions are welcome!  Potential future enhancements include:

- Sound effects & speech synthesis for auditory reinforcement.
- Scoreboard, streaks and badges to further gamify practice sessions.
- Configurable time targets and level progression rules.
- Support for **other scripts** (Devanagari numerals, Punjabi Gurmukhi, etc.).
- A "teacher" mode to lock to a specific subset of letters for focused practice.
- PWA support so the game can be installed on mobile devices.

---

## 🤝 Contributing

1. Fork the repository & create your branch: `git checkout -b feature/your-feature`.
2. Commit your changes: `git commit -m 'Add some feature'`.
3. Push to the branch: `git push origin feature/your-feature`.
4. Open a Pull Request.

---

## 📜 License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.
