# Monthly Poet — Static Site (MVP)

A lightweight, deploy-ready website for **monthlypoet.com**. No frameworks required — just HTML/CSS/JS. Perfect for Vercel or Netlify.

## What it does
- Shows this month’s **theme** and **4 Wordle words**
- Handles monthly **phases** (submit → vote → reveal → archive) based on the visitor’s local time
- Buttons to external **submission** and **voting** forms (Google Forms / Tally / Typeform)
- “How it works”, “Rules”, and an **Archive** card for the current month

## Quick start (Vercel)
1. Create a free account at https://vercel.com/signup
2. Click **Add New… → Project** → **Deploy a static site** → drag this folder in
3. After deploy, open your project → **Settings → Domains → Add** `monthlypoet.com`
4. Follow Vercel’s DNS instructions in your domain registrar (A / CNAME records). Propagation can take minutes to a few hours.

## Edit the month
Open `script.js` and change the `CONFIG` at the top:
```js
const CONFIG = {
  theme: "The joy of a yellow bouncy ball",
  wordleWords: ["POPPY","DREAD","TIZZY","FRILL"],
  submissionFormUrl: "https://tally.so/r/XXXX",
  votingFormUrl: "https://tally.so/r/YYYY",
  submissionCloseDay: 7,   // last day to submit
  votingCloseDay: 14,      // last day to vote
  revealHour: 9,
  revealMinute: 0
};
```
Deploy again and you’re done.

## Suggested workflow (MVP)
- **Day 1**: Update theme + words, open submissions (form link). Generate the stealth-mode AI poem privately.
- **Days 1–7**: Collect poems via form.
- **Days 8–14**: Publish an unlisted Google Doc/Notion page with the anonymised poems. Put that link in your **voting form**. Only share with submitters.
- **Day 15**: Reveal the winner + AI poem on-site (update the Archive card text), and email the group.

## Optional improvements
- Add an email capture (Mailchimp/Substack) embed.
- Replace archive card with dedicated pages.
- Add a countdown timer for each phase.
- Later: build a small backend to store poems and votes.

## Local preview
Just open `index.html` in your browser. No build needed.

— Enjoy, and happy monthly poems! ✍️
