# 🎂 Smart Next.js Age Finder & Life Analytics

A Next.js application that calculates exact age, life breakdown statistics, next birthday countdowns, and astrological insights with auto-jumping segmented date inputs.

## ✨ Features

- **⚡ Auto-Jump Date Input**:
  - Automatically shifts focus: **Day (DD)** $\rightarrow$ **Month (MM)** $\rightarrow$ **Year (YYYY)** as you type.
  - Automatically detects single-digit entries (e.g. typing `4` auto-formats to `04` and jumps to Month).
  - Smooth keyboard navigation (Backspace jumps backward when empty, Left/Right arrow keys navigate between segments).
  - Delimiter shortcuts: Pressing `/`, `-`, or `Enter` automatically pads and jumps to the next input.
- **📋 Multi-Format Paste Support**:
  - Paste any standard format directly into any of the boxes:
    - `12/06/2001`
    - `12-06-2001`
    - `12.06.2001`
    - `2001-06-12`
    - `12062001`
- **⏱️ Live Real-Time Age Breakdown**:
  - Exact **Years**, **Months**, and **Days** lived.
  - Real-time live seconds counter ticking upward second by second.
  - Total months, total weeks, total days, total hours, and total minutes.
- **🎂 Next Birthday Countdown**:
  - Months and days remaining until your next birthday.
  - Day of the week of your next birthday.
  - Interactive birthday confetti celebration if today is your birthday!
- **🔮 Astrology & Life Milestones**:
  - Born day of the week (e.g., Tuesday).
  - Western Zodiac sign (symbol, element, personality traits).
  - Chinese Zodiac animal & element.
  - Milestone tracker (1st, 18th, 21st, 25th, 30th, 50th... birthdays reached vs. upcoming).
  - Solar System planetary ages (age on Mercury, Venus, Mars, Jupiter, etc.).

---

## 🚀 Getting Started

To run the development server locally:

```bash
# In C:\Users\ashis\Desktop\Self-Knowledge\Automation
pnpm dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Build for Production

```bash
pnpm build
pnpm start
```
