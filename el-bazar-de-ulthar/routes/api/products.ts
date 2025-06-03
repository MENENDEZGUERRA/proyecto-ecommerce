import { Handlers } from "$fresh/server.ts";

export const products = [
  {
    "id": 1,
    "name": "Espejo Maldito",
    "description": "Un espejo que muestra tu reflejo envejecido 10 años",
    "price": 250.00,
    "discountPercentage": 20,
    "imageUrl": "https://cdn.pixabay.com/photo/2019/06/03/02/54/skull-4248008_1280.jpg"
  },
  {
    "id": 2,
    "name": "Cámara Antígua",
    "description": "Una cámara que toma fotos del pasado",
    "price": 150.00,
    "discountPercentage": 10,
    "imageUrl": "https://cdn.pixabay.com/photo/2016/04/27/12/26/photo-camera-1356510_1280.jpg"
  },
  {
    "id": 3,
    "name": "Reloj de Arena",
    "description": "Un reloj que cuenta el tiempo hacia atrás",
    "price": 50.00,
    "discountPercentage": 5,
    "imageUrl": "https://images.pexels.com/photos/7703268/pexels-photo-7703268.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    "id": 4,
    "name": "Piedra Filosofal",
    "description": "La mítica piedra que todo lo puede",
    "price": 1000.00,
    "discountPercentage": 15,
    "imageUrl": "https://cdn.pixabay.com/photo/2023/05/23/08/13/crystal-8012176_1280.jpg"
  },
  {
    "id": 5,
    "name": "Varita Mágica",
    "description": "Una varita que concede tres deseos",
    "price": 300.00,
    "discountPercentage": 0,
    "imageUrl": "https://cdn.pixabay.com/photo/2019/09/26/12/37/fabric-4505840_1280.jpg"
  },
  {
    "id": 6,
    "name": "Capa de Invisibilidad",
    "description": "Una capa que te hace invisible",
    "price": 450.00,
    "discountPercentage": 30,
    "imageUrl": "https://statics.memondo.com/p/99/crs/2014/10/CR_929411_97882ba824094ff7ac8ca7540198d02d_mi_disfraz_de_vampiro_thumb_fb.jpg?cb=8396995"
  },
  {
    "id": 7,
    "name": "Anillo de Poder",
    "description": "Un anillo que otorga habilidades sobrehumanas",
    "price": 750.00,
    "discountPercentage": 20,
    "imageUrl": "https://cdn.pixabay.com/photo/2017/08/13/09/25/glass-and-wood-ring-2636613_960_720.jpg"
  },
  {
    "id": 8,
    "name": "Escudo Protector",
    "description": "Un escudo que te protege de todo daño",
    "price": 600.00,
    "discountPercentage": 10,
    "imageUrl": "https://images.steamusercontent.com/ugc/755968118228127437/FD17AFF113F82F60EFAF3F56EC8B3D32C6C239EB/?imw=268&imh=268&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true"
  },
  {
    "id": 9,
    "name": "Botella de la Eternidad",
    "description": "Una botella que contiene elixires de la eterna juventud",
    "price": 900.00,
    "discountPercentage": 5,
    "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO2p1xY0XRj6oX1cGszHyQzezmHbZT3cM88Q&s"
  },
  {
    "id": 10,
    "name": "Mapa del Tesoro",
    "description": "Un mapa que lleva a un tesoro escondido",
    "price": 350.00,
    "discountPercentage": 15,
    "imageUrl": "https://aprende.guatemala.com/wp-content/uploads/2017/03/El-mapa-de-Guatemala-y-sus-cambios-a-través-del-tiempo.jpg"
  }
];

export const handler: Handlers = {
  async GET(_req, _ctx) {
    return new Response(JSON.stringify(products), {
      headers: { "Content-Type": "application/json" },
    });
  },
};