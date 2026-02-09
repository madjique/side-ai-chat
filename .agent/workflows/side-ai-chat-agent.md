---
description: Senior Side AI Chat Developer
---

# Side AI Chat - Development Guidelines

## Architecture Overview

This extension uses a **feature-based modular architecture** with Plasmo framework for Chrome Manifest V3.

## Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Framework | Plasmo | Chrome extension bundling & tooling |
| UI | React 18 | Component rendering |
| State | Zustand | Lightweight reactive state management |
| Storage | Chrome Storage API | Persisted user preferences |
| Components | Radix UI | Accessible, unstyled primitives |
| Icons | Material Symbols | Open source icon set |
| Styling | CSS Custom Properties | Theme tokens & dark mode |

## Project Structure

```
src/
├── features/           # Self-contained feature modules
│   ├── onboarding/     # First-time user experience
│   ├── llm-selector/   # LLM provider dropdown & custom LLM
│   ├── llm-viewer/     # Iframe container for LLM chat
│   └── settings/       # Theme & preferences menu
├── shared/
│   ├── components/     # Reusable UI components (Icon, Button)
│   ├── config/         # LLM configurations
│   ├── hooks/          # Custom React hooks (useTheme)
│   └── stores/         # Zustand stores with persistence
├── styles/             # Global CSS
├── sidepanel.tsx       # Main side panel entry
└── background.ts       # Service worker
```

## Design Decisions

### State Management

- Use **Zustand stores** with Chrome Storage persistence
- Stores location: `src/shared/stores/`
- All stores auto-sync to `chrome.storage.local`

### Adding New Features

1. Create a new folder under `src/features/[feature-name]/`
2. Include: component(s), CSS, and barrel export (`index.ts`)
3. Keep feature logic self-contained
4. Use shared components from `~/shared/components`

### Styling Rules

- Use CSS custom properties from `global.css` for colors
- Never hardcode colors - always use `var(--token-name)`
- Component-level CSS files co-located with components
- Mobile-first responsive approach (extension is narrow)

### Theme System

Three modes: `light`, `dark`, `auto`

```css
:root { /* light theme tokens */ }
[data-theme="dark"] { /* dark overrides */ }
```

Auto mode detects system preference via `prefers-color-scheme`.

### LLM Provider Pattern

Preset LLMs defined in `src/shared/config/llmConfig.ts`:

```typescript
{ id: 'unique-id', name: 'Display Name', url: 'https://...', icon: 'material_icon' }
```

Custom LLMs follow same structure with `isCustom: true`.

## Future Features Placeholder

The architecture supports easy addition of:

- [ ] Content actions (select text on page → send to LLM)
- [ ] Drag & drop content from page
- [ ] Keyboard shortcuts
- [ ] Multiple chat tabs
- [ ] Prompt templates

Add new capabilities as new features under `src/features/`.

## Code Style

- Minimal comments (code should be self-explanatory)
- TypeScript strict mode
- Path aliases: `~/` → `src/`
- Barrel exports for each feature

## Change Log

| Date | Change | Decision |
|------|--------|----------|
| 2026-02-08 | Initial architecture | Feature-based modules, Zustand + Chrome Storage |
| 2026-02-08 | UI library | Radix UI primitives for accessibility |
| 2026-02-08 | Icons | Material Symbols (open source) |
| 2026-02-08 | Extension type | Chrome Side Panel API (v114+) |
| 2026-02-08 | LLM embedding | declarativeNetRequest dynamic rules to strip X-Frame-Options |
| 2026-02-08 | Design refresh | Glassmorphism, official LLM logos, refined animations |
| 2026-02-09 | Iframe compatibility | Comprehensive header rules (CORS, Sec-Fetch spoofing) |
| 2026-02-09 | Auto-favicon | Custom LLMs auto-fetch favicon via Google service |
| 2026-02-09 | Open in tab | Button to open LLM in new tab + close side panel |
| 2026-02-09 | Session persistence | Keep LLM iframes alive when switching, preserve chat state |
| 2026-02-09 | New LLM | Added Grok (grok.com) to presets |
| 2026-02-09 | New LLM | Added Microsoft Copilot to presets (with favicon) |
| 2026-02-09 | Bug fix | Fixed z-index issue where iframe covered Add Custom LLM dialog |
