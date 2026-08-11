---
name: mobile-pass-play
description: UX/UI design guidelines for one-phone local pass-and-play game mechanics, including transitions, countdown timers, privacy screens, and scores grading reviews.
risk: low
source: workspace
---

# Mobile Pass & Play Game Loop UX Guide

Use this skill when designing or refining the local offline multiplayer screens and game loop transitions, ensuring a seamless single-phone player swap experience.

## The Core Loop (Pass & Play)
To maintain surprise and prevent other players from gaining an unfair advantage (mental prep):
1. **Lobby & Setup**: Players enter their names and select active categories.
2. **Intermediate Pass Screen**:
   * Hide any gameplay or category clues.
   * Display a clear, prominent prompt: `Pass the phone to <Player Name>`.
   * Add a large `Ready / Start` button. Only reveal the actual letter and category prompts when that button is clicked.
3. **Spinner / Reveal Phase**: Spin a letter wheel and countdown `3, 2, 1` before starting the timer.
4. **Gameplay Round**: Display the inputs alongside a ticking timer.
5. **Self-Grading / Review**: Enable approval toggles for answers, tallies score, and proceeds to the next player.

## UX Best Practices & Interactions

### 1. Intermediate Pass Screen
* Make the active player name stand out with vibrant accent colors.
* Explicitly alert users with instructions to avoid looking at the screen during passes.

### 2. Gameplay Timers
* Animate the timer text (color shift to red, pulsate scale) when the time drops below 10 seconds.
* Automatically submit answers when the timer reaches 0.

### 3. Review / Grading Layouts
* Use clear thumbs up (👍) / thumbs down (👎) toggle buttons.
* Maintain clean margins and large click targets (minimum 48px height) for comfortable thumb tapping.
