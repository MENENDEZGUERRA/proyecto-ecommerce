import { Handlers } from "$fresh/server.ts";

export const products = [
  {
    "id": 1,
    "name": "Espejo Maldito",
    "description": "Un espejo que muestra tu reflejo envejecido 10 años",
    "price": 250.00,
    "discountPercentage": 20,
    "imageUrl": "/media/products/mirror.jpg"
  },
  {
    "id": 2,
    "name": "Cámara Antígua",
    "description": "Una cámara que toma fotos del pasado",
    "price": 150.00,
    "discountPercentage": 10,
    "imageUrl": "/media/products/camera.jpg"
  },
  {
    "id": 3,
    "name": "Reloj de Arena",
    "description": "Un reloj que cuenta el tiempo hacia atrás",
    "price": 50.00,
    "discountPercentage": 5,
    "imageUrl": "/media/products/hourglass.jpg"
  },
  {
    "id": 4,
    "name": "Piedra Filosofal",
    "description": "La mítica piedra que todo lo puede",
    "price": 1000.00,
    "discountPercentage": 15,
    "imageUrl": "/media/products/philosopher_stone.jpg"
  },
  {
    "id": 5,
    "name": "Varita Mágica",
    "description": "Una varita que concede tres deseos",
    "price": 300.00,
    "discountPercentage": 25,
    "imageUrl": "/media/products/magic_wand.jpg"
  },
  {
    "id": 6,
    "name": "Capa de Invisibilidad",
    "description": "Una capa que te hace invisible",
    "price": 450.00,
    "discountPercentage": 30,
    "imageUrl": "/media/products/invisibility_cloak.jpg"
  },
  {
    "id": 7,
    "name": "Anillo de Poder",
    "description": "Un anillo que otorga habilidades sobrehumanas",
    "price": 750.00,
    "discountPercentage": 20,
    "imageUrl": "/media/products/power_ring.jpg"
  },
  {
    "id": 8,
    "name": "Escudo Protector",
    "description": "Un escudo que te protege de todo daño",
    "price": 600.00,
    "discountPercentage": 10,
    "imageUrl": "/media/products/protective_shield.jpg"
  },
  {
    "id": 9,
    "name": "Botella de la Eternidad",
    "description": "Una botella que contiene elixires de la eterna juventud",
    "price": 900.00,
    "discountPercentage": 5,
    "imageUrl": "/media/products/bottle_of_eternity.jpg"
  },
  {
    "id": 10,
    "name": "Mapa del Tesoro",
    "description": "Un mapa que lleva a un tesoro escondido",
    "price": 350.00,
    "discountPercentage": 15,
    "imageUrl": "/media/products/treasure_map.jpg"
  }
];

export const handler: Handlers = {
  async GET(_req, _ctx) {
    return new Response(JSON.stringify(products), {
      headers: { "Content-Type": "application/json" },
    });
  },
};