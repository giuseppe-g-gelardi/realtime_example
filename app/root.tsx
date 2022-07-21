import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from "@remix-run/react";

import type { 
  MetaFunction, 
  LinksFunction, 
  LoaderFunction 
} from "@remix-run/node";

import styles from './tailwind.css'

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }]
}

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

// root loader loads .env and sets window.env with
// dangerouslySetInnerHTML so the client side 
// has database access
export const loader: LoaderFunction = async () => {
  return {
    env: {
      DATABASE_URL: process.env.DATABASE_URL,
      DATABASE_KEY: process.env.DATABASE_KEY
    }
  }
}
export default function App() {
  const { env } = useLoaderData()

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />

        <script dangerouslySetInnerHTML={{
          __html: `window.env = ${JSON.stringify(env)}`
        }} />
        
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
