---
name: vanilla-css-styling
description: Guidelines for styling high-fidelity, premium web interfaces using Vanilla CSS, focusing on dark modes, glassmorphism, dynamic variables, and custom micro-animations.
risk: low
source: workspace
---

# Vanilla CSS Styling & Visual Design Guide

Use this skill when designing, reviewing, or styling HTML interfaces using Vanilla CSS, ensuring modern premium layouts, responsiveness, and polished interactive states.

## Design System & Tokens
Always define variables inside `:root` for consistency:
```css
:root {
    --primary: #10b981;      /* Emerald */
    --primary-hover: #059669;
    --background: #0f172a;   /* Slate 900 */
    --surface: #1e293b;      /* Slate 800 */
    --text-primary: #f8fafc;
    --text-secondary: #94a3b8;
    --accent-yellow: #fde047;
    --glass: rgba(255, 255, 255, 0.06);
    --border-glass: rgba(255, 255, 255, 0.1);
    --font-en: 'Outfit', 'Inter', sans-serif;
    --font-ar: 'Cairo', 'Almarai', sans-serif;
}
```

## Premium Components Layouts

### 1. Glassmorphic Card
To create premium looking control cards:
```css
.card-glass {
    background: var(--glass);
    border: 1px solid var(--border-glass);
    border-radius: 16px;
    padding: 20px;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
}
```

### 2. Micro-Animations & Buttons
All interactive components must feel responsive and alive:
```css
.btn-animated {
    font-family: inherit;
    font-weight: bold;
    background: var(--primary);
    color: white;
    border: none;
    border-radius: 8px;
    padding: 10px 20px;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.btn-animated:hover {
    background: var(--primary-hover);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
}
.btn-animated:active {
    transform: translateY(0);
}
```

## Responsiveness & Layout
* Use **CSS Grid** for equal distribution tables (e.g. `grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))`).
* Use **Flexbox** for alignment of rows, icons, and control states.
* Ensure all sizes use relative units (`rem`, `em`, `%`, `vh/vw`) rather than hardcoded pixels for robust responsive viewport scalability.
