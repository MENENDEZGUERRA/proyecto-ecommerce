// routes/_app.tsx
import { AppProps } from "$fresh/server.ts";

export default function App({ Component }: AppProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>El bazar de Ulthar</title>
        <link rel="stylesheet" href="/styles/Header.css" />
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
}
