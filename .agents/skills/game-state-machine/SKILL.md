---
name: game-state-machine
description: Design patterns for modeling client-side gameplay screen states, transitions, turn rotations, scoring states, and game lobby states in JavaScript.
risk: low
source: workspace
---

# Game State Machine Design Guide

Use this skill when designing or restructuring the client-side game flow loops, ensuring clean transitions, state resets, and robust multiplayer turn-based rotations.

## Core State Machine Structure
Model gameplay phases explicitly in a central state:
```javascript
const gameState = {
    // Current Screen
    activeScreenId: "screen-home",
    
    // Config Parameters
    language: "en",
    gameMode: "talla3", // or "bent_waled"
    
    // Gameplay data
    bwPlayMode: "solo", // or "passplay"
    bwPlayers: [],      // [{ name: "Name", scores: [] }]
    bwMaxRounds: 3,
    
    // Current turn index trackers
    bwCurrentPlayerIndex: 0,
    bwCurrentRound: 1,
    bwActiveLetter: "a",
    bwSelectedCategories: []
};
```

## Screen Management & Navigation
Define a unified `showScreen(screenId)` router to handle visual states and updates. Hook event loops into this wrapper:
```javascript
function showScreen(screenId) {
    // 1. Deactivate old screen view
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    
    // 2. Activate target screen
    const target = document.getElementById(screenId);
    if (target) target.classList.add("active");
    
    // 3. Trigger screen-specific state initialization
    if (screenId.startsWith("screen-bw-")) {
        updateBwUILanguage(gameState.language);
    }
}
```

## Turn-Based Multi-Player Rotation Flow
For local pass-and-play screen rotations, structure transitions as follows:
```
           [LOBBY / SETUP] ──► click Start
                  │
                  ▼
         [PASS PHONE SCREEN] ──► click Ready
                  │
                  ▼
         [SPINNER / ROULETTE] ──► countdown finished
                  │
                  ▼
          [GAMEPLAY SCREEN] ──► timer finished / submit answers
                  │
                  ▼
         [SELF-GRADING SCREEN] ──► click Next
                  │
                  ▼
        Check: Is last player of round?
           ├──► NO: Increment currentPlayerIndex, go to [PASS PHONE SCREEN]
           └──► YES:
                Check: Is last round?
                   ├──► NO: Increment roundCount, reset playerIndex, go to [PASS PHONE SCREEN]
                   └──► YES: Transition to [FINAL STANDINGS / PODIUM]
```
This state flow is extremely predictable and prevents screen state bugs or incorrect scoring tallies.
