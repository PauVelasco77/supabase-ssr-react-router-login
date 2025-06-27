# supabase-ssr-react-router-login

A modern, production-ready template for building full-stack React applications with authentication using Supabase, React Router, and SSR.

---

## Features

- 🚀 **Server-side rendering** (SSR) with Express and React Router
- 🔒 **Supabase authentication** (OAuth, session management)
- ⚡️ **Hot Module Replacement** (HMR) for fast development
- 📦 **Asset bundling and optimization** with Vite
- 🔄 **Data loading and mutations** via React Router loaders/actions
- 🛠️ **TypeScript** by default
- 🎨 **TailwindCSS** for styling
- 🧩 **Component-driven** UI with shadcn/ui primitives
- 🐳 **Docker-ready** for easy deployment
- 🧪 **ESLint** and **Prettier** for code quality

---

## Project Structure

```
supabase-ssr-react-router-login/
├── app/
│   ├── components/         # Reusable UI components
│   ├── lib/                # Supabase client/server and utilities
│   ├── routes/             # Route modules (React Router)
│   ├── app.css             # TailwindCSS entrypoint
│   ├── root.tsx            # Root layout and error boundary
│   └── routes.ts           # Route config
├── server/
│   └── app.ts              # Express app handler for SSR
├── server.js               # Main server entry (dev/prod)
├── public/                 # Static assets
├── Dockerfile              # Docker build instructions
├── package.json            # Project metadata and scripts
├── tsconfig*.json          # TypeScript configs
├── vite.config.ts          # Vite build config
└── .env.example            # Example environment variables
```

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Copy the example file and fill in your Supabase credentials:

```bash
cp .env.example .env
```

Edit `.env`:

```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

You can find these in your [Supabase project settings](https://app.supabase.com/).

### 3. Start the development server

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) in your browser.

---

## Building for Production

Create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

---

## Deployment

### Docker

Build and run with Docker:

```bash
docker build -t my-app .
docker run -p 3000:3000 my-app
```

### Manual/DIY

- Deploy the output of `npm run build`
- Serve with Node.js using `npm start`
- The server will run on port 3000 by default

**Directory structure after build:**

```
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
├── server.js
```

---

## Scripts

- `npm run dev` – Start dev server with HMR
- `npm run build` – Build for production
- `npm start` – Start production server
- `npm run lint` – Lint code with ESLint
- `npm run pretty` – Format code with Prettier
- `npm run typecheck` – TypeScript type checking

---

## Styling

This template uses [Tailwind CSS](https://tailwindcss.com/) and [shadcn/ui](https://ui.shadcn.com/) for rapid UI development. You can customize styles in `app/app.css`.

---

## Environment Variables

- `VITE_SUPABASE_URL` – Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` – Your Supabase anon public key

Set these in your `.env` file.

---

## License

MIT

---

Built with ❤️ using React Router, Supabase, and Vite.
