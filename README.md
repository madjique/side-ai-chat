# Side AI Chat

<p align="center">
  <img src="assets/icon.svg" width="128" alt="Side AI Chat Logo">
</p>

<p align="center">
  <strong>Access your favorite LLM chats in a convenient Chrome side panel</strong>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#installation">Installation</a> •
  <a href="#development">Development</a> •
  <a href="#contributing">Contributing</a> •
  <a href="#license">License</a>
</p>

---

## Features

- 🎯 **Side Panel Integration** — Chat with LLMs without leaving your current tab
- 🤖 **Multiple LLMs** — ChatGPT, Gemini, Claude, Perplexity, Mistral out of the box
- ➕ **Custom LLMs** — Add any LLM by URL
- 💾 **Persistent Preferences** — Your settings sync across browser sessions
- 🔒 **Privacy First** — No backend, no data collection, runs entirely in your browser

## Installation

### From Chrome Web Store

> Coming soon

### Manual Installation (Developer Mode)

1. Clone or download this repository
2. Install dependencies and build:
   ```bash
   pnpm install
   pnpm build
   ```
3. Open Chrome and navigate to `chrome://extensions`
4. Enable **Developer mode** (toggle in top right)
5. Click **Load unpacked**
6. Select the `build/chrome-mv3-prod` folder

## Usage

1. Click the extension icon in your toolbar to open the side panel
2. On first launch, select your preferred LLM
3. Start chatting!

**Switching LLMs:** Use the dropdown in the top-left corner

**Adding Custom LLMs:** Click the dropdown → "Add custom LLM" → Enter name and URL

## Development

### Prerequisites

- Node.js 18+
- pnpm

### Setup

```bash
# Clone the repository
git clone https://github.com/your-username/side-ai-chat-browser-extension.git
cd side-ai-chat-browser-extension

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Load the extension from `build/chrome-mv3-dev` in Chrome.

### Project Structure

```
src/
├── features/           # Self-contained feature modules
│   ├── onboarding/     # First-time user experience
│   ├── llm-selector/   # LLM provider dropdown & custom LLM
│   ├── llm-viewer/     # Iframe container for LLM chat
│   └── settings/       # Theme & preferences menu
├── shared/
│   ├── components/     # Reusable UI components
│   ├── config/         # LLM configurations
│   ├── hooks/          # Custom React hooks
│   └── stores/         # Zustand stores with persistence
├── styles/             # Global CSS
├── sidepanel.tsx       # Main side panel entry
└── background.ts       # Service worker
```

### Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [Plasmo](https://plasmo.com) |
| UI | React 18 |
| State | Zustand + Chrome Storage |
| Components | Radix UI |
| Icons | Material Symbols |

### Scripts

```bash
pnpm dev      # Start dev server with hot reload
pnpm build    # Production build
pnpm package  # Package for distribution
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

See [.agent/workflows/side-ai-chat-agent.md](.agent/workflows/side-ai-chat-agent.md) for architecture decisions and coding patterns.

## Roadmap

- [ ] Keyboard shortcuts
- [ ] Content selection → Send to LLM
- [ ] Drag & drop from page
- [ ] Multiple chat tabs
- [ ] Prompt templates

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Made with ❤️ for the open source community
</p>
