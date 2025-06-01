import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async GET(_req, _ctx) {
    const data = await Deno.readTextFile("./static/data/products.json");
    return new Response(data, {
      headers: { "Content-Type": "application/json" },
    });
  },
};