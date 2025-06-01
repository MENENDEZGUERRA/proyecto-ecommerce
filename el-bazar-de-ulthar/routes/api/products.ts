import { Handlers } from "$fresh/server.ts";
import { products } from "../../static/data/products.ts";

export const handler: Handlers = {
  async GET(_req, _ctx) {
    return new Response(JSON.stringify(products), {
      headers: { "Content-Type": "application/json" },
    });
  },
};