// routes/_app.tsx
import { AppProps } from "$fresh/server.ts";
import CartProvider from "../islands/CartProvider.tsx";
import { RecentlyViewedProvider } from "../context/RecentlyViewedContext.tsx";

export default function App({ Component }: AppProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/styles/Header.css" />
        <link rel="stylesheet" href="/styles/ProductCard.css" />
        <link rel="stylesheet" href="/styles/SearchBar.css" />
        <link rel="stylesheet" href="/styles/ProductDetail.css" />
        <link rel="stylesheet" href="/styles/BagPage.css" />
        <link rel="stylesheet" href="/styles/RecentlyViewed.css" />
        <link rel="stylesheet" href="/styles/global.css" />
        <link href="https://fonts.googleapis.com/css2?family=Jolly+Lodger&family=Roboto:wght@400;700&display=swap" rel="stylesheet"/>
      </head>
      <body>
        <RecentlyViewedProvider>
          <CartProvider>
            <Component />
          </CartProvider>
        </RecentlyViewedProvider>
      </body>
    </html>
  );
}