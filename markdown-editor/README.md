# Write - Minimal Markdown Editor

A calm, beautiful markdown editor inspired by Bear and iA Writer. Built with React, TypeScript, and Tailwind CSS.

## Features

- **Distraction-free** - No toolbars, no sidebars, no UI chrome
- **Split-pane editing** - Live markdown preview as you type
- **Beautiful typography** - Lora serif font with generous spacing
- **Comfortable reading width** - Optimized at 70 characters
- **Warm aesthetic** - Paper-like background (#FAFAF8)
- **Auto-focus** - Start writing immediately
- **Full markdown support** - GitHub Flavored Markdown with syntax highlighting

## Tech Stack

- **React** - UI framework
- **TypeScript** - Type safety
- **Vite** - Fast build tooling
- **Tailwind CSS** - Utility-first styling
- **react-markdown** - Markdown rendering
- **remark-gfm** - GitHub Flavored Markdown
- **rehype-highlight** - Syntax highlighting for code blocks

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Design Philosophy

This editor prioritizes the writing experience above all else:

- **Typography first** - Comfortable reading with Lora serif at 19px and 1.7 line height
- **Generous spacing** - 80px top padding, 40px side padding
- **Muted colors** - Subtle, non-distracting syntax highlighting
- **No configuration** - Sensible defaults that just work
- **Smooth rendering** - No jank, no lag, just writing

## Markdown Support

Supports all standard markdown features:

- Headings (H1-H6)
- Paragraphs and line breaks
- **Bold** and *italic* text
- Lists (ordered and unordered)
- Links and images
- Code blocks with syntax highlighting
- Inline `code`
- Blockquotes
- Tables
- Horizontal rules
- GitHub Flavored Markdown extensions

## Typography

- **Body text**: Lora (Google Font), 19px, 1.7 line height
- **Code**: JetBrains Mono (Google Font), 15px
- **Colors**: Muted grays for a calm writing experience

## Browser Support

Works in all modern browsers that support:
- ES6+
- CSS Grid/Flexbox
- CSS Custom Properties

## License

MIT
