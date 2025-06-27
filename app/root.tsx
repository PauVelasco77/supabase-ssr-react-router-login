import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from 'react-router';

import type { Route } from './+types/root';
import './app.css';
import { createClient } from './lib/supabase/server';

export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
];

export async function loader({ request }: Route.LoaderArgs) {
  const ENV_VARS = {
    SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
    SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
  };

  const hasEnvVars = !!(ENV_VARS.SUPABASE_URL && ENV_VARS.SUPABASE_ANON_KEY);

  let user = undefined;
  if (hasEnvVars) {
    const { supabase } = await createClient(request);
    const {
      data: { user: supabaseUser },
    } = await supabase.auth.getUser();
    user = supabaseUser;
  }

  return {
    user,
    hasEnvVars,
    ENV_VARS,
  };
}

export function meta() {
  return [
    { title: 'Supabase x React Router Quickstart' },
    {
      property: 'og:title',
      content: 'Supabase x React Router Quickstart',
    },
    {
      name: 'description',
      content: 'A Supabase x React Router Quickstart',
    },
  ];
}

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useLoaderData() as {
    ENV_VARS: {
      SUPABASE_URL: string;
      SUPABASE_ANON_KEY: string;
    };
  };
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-white text-black antialiased selection:bg-blue-200 selection:text-black dark:bg-black dark:text-white dark:selection:bg-blue-800 dark:selection:text-white">
        {children}
        <ScrollRestoration />
        <Scripts />

        {/* Inject ENV vars after Scripts */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(data.ENV_VARS)}`,
          }}
        />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details =
      error.status === 404
        ? 'The requested page could not be found.'
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="container mx-auto p-4 pt-16">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full overflow-x-auto p-4">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
