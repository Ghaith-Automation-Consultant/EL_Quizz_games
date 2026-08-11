---
name: mobile-first-responsive-design
description: UX/UI design guidelines for mobile-first web pages, viewport constraints, touch targets, and layout responsiveness for single-device and mobile gaming.
risk: low
source: workspace
---

# Mobile-First & Touch-First Web Design Guide

Use this skill when designing web pages, forms, or layouts that are optimized for mobile viewports and comfortable finger-tip interactions.

## Viewport & Scaling Controls
Always include the correct viewport meta tag in the HTML head to prevent default desktop browser scaling and latency on tap:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
```

## Styling for Touch Targets
* **Tappable Elements**: Ensure all buttons, links, inputs, and toggle switches have a minimum height/width of `48px` to prevent mis-clicks.
* **Padding & Spacing**: Add spacing between adjacent interactive controls (minimum `8px`) to ensure distinct boundaries.
* **No Hover Reliance**: Do not hide crucial actions behind hover states. Use clear click/tap indicators and visual button states (scale, press shadow) to provide tactile feedback.

## Layout Adaptability
* **Flexbox and Grids**: Use `display: flex; flex-direction: column` on small screens, adapting to rows on larger tablets.
* **Safe Areas**: Use `padding: env(safe-area-inset-bottom)` to prevent key controls from being obstructed by system navigation bars or camera notches.
* **Aspect Ratio**: Keep essential gameplay prompts centered in the viewport, avoiding scrollbars where possible by utilizing `vh` heights correctly.
