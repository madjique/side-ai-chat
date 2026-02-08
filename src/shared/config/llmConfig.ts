export type LLMProvider = {
  id: string
  name: string
  url: string
  icon: string
  logo?: string
  isCustom?: boolean
}

export const PRESET_LLMS: LLMProvider[] = [
  { 
    id: 'chatgpt', 
    name: 'ChatGPT', 
    url: 'https://chat.openai.com', 
    icon: 'smart_toy',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg'
  },
  { 
    id: 'gemini', 
    name: 'Gemini', 
    url: 'https://gemini.google.com/app', 
    icon: 'auto_awesome',
    logo: 'https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg'
  },
  { 
    id: 'claude', 
    name: 'Claude', 
    url: 'https://claude.ai', 
    icon: 'psychology',
    logo: 'https://claude.ai/images/claude_app_icon.png'
  },
  { 
    id: 'perplexity', 
    name: 'Perplexity', 
    url: 'https://perplexity.ai', 
    icon: 'search',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/1/1d/Perplexity_AI_logo.svg'
  },
  { 
    id: 'mistral', 
    name: 'Mistral', 
    url: 'https://chat.mistral.ai', 
    icon: 'air',
    logo: 'https://www.google.com/s2/favicons?domain=chat.mistral.ai&sz=64'
  },
  {
    id: 'grok',
    name: 'Grok',
    url: 'https://grok.com',
    icon: 'bolt',
    logo: 'https://www.google.com/s2/favicons?domain=grok.com&sz=64'
  },
  {
    id: 'copilot',
    name: 'Copilot',
    url: 'https://copilot.microsoft.com',
    icon: 'chat_bubble',
    logo: 'https://www.google.com/s2/favicons?domain=copilot.microsoft.com&sz=64'
  }
]
