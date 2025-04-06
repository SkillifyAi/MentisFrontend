import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./Styles/Variables.css"
import { GoogleOAuthProvider } from "@react-oauth/google";
import "../app/Styles/App.css"
import "../app/Styles/Dashboard.css"
import "../app/Styles/Header.css"
import "../app/Styles/Login.css"
import "../app/Styles/Questionnaire.css"
import "../app/Styles/SignUp.css"
import "../app/Styles/style.css"
import "../app/Styles/Unauthorized.css"
import "../app/Styles/Variables.css"


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDO7rv2qxfpe4YzIFlVx_a6e-KXPVcRNX4",
  authDomain: "mentis-123.firebaseapp.com",
  projectId: "mentis-123",
  storageBucket: "mentis-123.firebasestorage.app",
  messagingSenderId: "379618210282",
  appId: "1:379618210282:web:483b35a80a2942f7864293",
  measurementId: "G-6TEB0BYF6R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
      <script src="https://apis.google.com/js/platform.js" async defer></script>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <GoogleOAuthProvider clientId="812714492046-huanjh691736sbkp2c1cvfkfkkovip2m.apps.googleusercontent.com">
        {children}
        <ScrollRestoration />
        <Scripts />
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}


export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
