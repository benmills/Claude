# Fuzzy Search App

A clean, minimal web application featuring fuzzy search with suggestion bubbles - inspired by the UI breakthroughs of Alfred and Spotlight.

## Features

- **Real-time Fuzzy Search**: As you type, suggestions appear instantly
- **Suggestion Bubbles**: Results display as elegant cards/bubbles at the bottom of the screen
- **Smart Matching**: Fuzzy search algorithm that scores and ranks results
- **Beautiful Animations**: Smooth, staggered animations for suggestion bubbles
- **Keyboard Shortcuts**:
  - `Cmd/Ctrl + K` - Focus search
  - `Escape` - Clear search and unfocus
- **Mobile Responsive**: Works beautifully on all screen sizes

## How It Works

### Fuzzy Search Algorithm

The app uses a custom fuzzy matching algorithm that:
1. Matches characters in order (but not necessarily consecutive)
2. Scores matches based on:
   - Consecutive character matches (higher score)
   - Match position (start of string gets bonus)
   - Distance between matches (closer is better)
3. Returns top 10 results sorted by score

### UI/UX Design

- **Centered search input** with focus on simplicity
- **Bottom-aligned suggestion bubbles** that pop up as you type
- **Gradient background** for modern aesthetic
- **Glass-morphism effects** with backdrop blur
- **Staggered animations** for visual delight

## Files

- `index.html` - Main HTML structure
- `styles.css` - All styling and animations
- `app.js` - Fuzzy search logic and interactivity

## Usage

Simply open `index.html` in a modern web browser. No build process or dependencies required.

### Example Searches

Try typing:
- `msg` → Finds "Messages"
- `wth` → Finds "Weather"
- `cal` → Finds "Calendar"
- `stk` → Finds "Stocks"
- `gms` → Finds "Games"

The fuzzy search will match partial and non-consecutive characters, making it quick to find what you need.

## Customization

### Adding Your Own Suggestions

Edit the `suggestions` array in `app.js`:

```javascript
const suggestions = [
    {
        icon: '📧',
        title: 'Your App',
        subtitle: 'Description',
        keywords: 'searchable keywords here'
    },
    // ... more suggestions
];
```

### Styling

All styles are in `styles.css`. Key customization points:
- Background gradient: `body { background: ... }`
- Bubble colors: `.suggestion-bubble { background: ... }`
- Animation timing: `.suggestion-bubble { animation: ... }`

## Browser Support

Works in all modern browsers that support:
- CSS Grid/Flexbox
- CSS Animations
- ES6 JavaScript
- Backdrop Filter (optional, degrades gracefully)

## Inspiration

This app reimagines the keyboard-centric fuzzy search UI paradigm popularized by:
- **Alfred** (macOS productivity app)
- **Spotlight** (macOS system search)

Optimized for the web with a mobile-first, modern aesthetic.
