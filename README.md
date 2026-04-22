# AI Chat Studio

A modern, production-grade AI chat application built with Next.js 15, Groq, and Tailwind CSS.
🔗 Live Demo: https://your-app.vercel.app

🔗 Live Demo: https://your-app.vercel.app

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwind-css)
![Groq](https://img.shields.io/badge/Groq-llama--3.1--8b-orange?style=flat-square)

## Features

- **AI Chat Interface** — Send prompts and receive responses powered by Groq + Llama 3.1
- **Chat History** — All conversations saved to localStorage and persist across sessions
- **Sidebar** — Browse, switch between, and delete past conversations
- **Clear All** — One-click clear with confirmation guard
- **Suggestion Cards** — Clickable prompts on the empty state screen
- **Copy Messages** — Hover any message to reveal a copy button
- **Responsive** — Works on mobile and desktop
- **Error Handling** — Toast notifications for API errors and loading states

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + shadcn/ui |
| State | Zustand |
| AI API | Groq (llama-3.1-8b-instant) |
| Storage | localStorage |
| Deployment | Vercel |

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/ai-chat-studio.git
cd ai-chat-studio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root:

```
GROQ_API_KEY=your_groq_api_key_here
```

Get your free API key at https://console.groq.com

### 4. Run the development server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Project Structure

```
ai-chat-studio/
├── app/
│   ├── api/chat/route.ts     # Server-side Groq API handler
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── chat/
│   │   ├── ChatWindow.tsx    # Message list + empty state
│   │   ├── Header.tsx        # Top bar with status + new chat
│   │   ├── MessageBubble.tsx # Individual message with copy
│   │   ├── PromptInput.tsx   # Input textarea + send button
│   │   └── TypingIndicator.tsx
│   └── sidebar/
│       ├── ClearButton.tsx   # Clear all with confirmation
│       ├── ConversationItem.tsx
│       └── Sidebar.tsx
├── hooks/
│   └── useChat.ts
└── lib/
    ├── localStorage.ts
    ├── store.ts
    └── types.ts
```

## Deployment

This app is deployed on Vercel. To deploy your own:

1. Push this repository to GitHub
2. Go to https://vercel.com and import the repository
3. Add `GROQ_API_KEY` to the Environment Variables section
4. Click Deploy
