export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
};

export const products: Product[] = [
  {
    id: '1',
    name: 'Laptop X1',
    price: 1200,
    description: 'High performance laptop for developers.',
    image: 'https://picsum.photos/seed/laptop/200'
  },
  {
    id: '2',
    name: 'Smartphone Pro',
    price: 800,
    description: 'Latest model with amazing camera.',
    image: 'https://picsum.photos/seed/phone/200'
  },
  {
    id: '3',
    name: 'Wireless Headphones',
    price: 200,
    description: 'Noise cancelling over-ear headphones.',
    image: 'https://picsum.photos/seed/headphones/200'
  },
  {
    id: '4',
    name: 'Mechanical Keyboard',
    price: 150,
    description: 'RGB backlit mechanical keyboard with tactile switches.',
    image: 'https://picsum.photos/seed/keyboard/200'
  }
];
