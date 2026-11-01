const siteConfig = {
  businessName: 'Summer Axolotls Home',
  whatsappNumber: '14242409780',
  phoneNumber: '+1 (424) 240-9780',
  email: 'summerhome671@gmail.com',
  location: 'Austin, Texas, USA',
  instagram: 'https://instagram.com',
  facebook: 'https://facebook.com',
  tiktok: 'https://tiktok.com'
};

const localGalleryImages = [
  '../image/albino $100 4.jpeg',
  '../image/chimera $1200.jpeg',
  '../image/chimera $1200 1.jpeg',
  '../image/chimera $1500.jpeg',
  '../image/GFP $150.jpeg',
  '../image/GFP $150 1.jpeg',
  '../image/GFP $150 3.jpeg',
  '../image/GFP $200.jpeg',
  '../image/GFP $200 2.jpeg',
  '../image/GFP melanoid.jpeg',
  '../image/Golden $200.jpeg',
  '../image/Lavender $200.jpeg',
  '../image/Leucistic $100 1.jpeg',
  '../image/Leucistic $100 5.jpeg',
  '../image/Leucistic $100 6.jpeg',
  '../image/Leucistic $100 7.jpeg',
  '../image/Leucistic $100 8.jpeg',
  '../image/Leucitic $100 1.jpeg',
  '../image/Leucitic $101.jpeg',
  '../image/Levander $200.jpeg',
  '../image/Mosaic $700.jpeg',
  '../image/Mosaic $500.jpeg',
  '../image/mosaic $500 1.jpeg',
  '../image/mosaic $500 3.jpeg',
  '../image/mosaic $150 2.jpeg',
  '../image/melanoid $200.jpeg',
  '../image/pyrite $200.jpeg',
  '../image/Stardust mosaic.jpeg',
  '../image/stardust mosiac $300.jpeg',
  '../image/white albino $150.jpeg',
  '../image/widcopper3 200$.jpeg',
  '../image/wild copper $200.jpeg'
];

const products = localGalleryImages.map((image, index) => ({
  id: `gallery-${index + 1}`,
  name: `Axolotl Photo ${index + 1}`,
  category: 'Gallery',
  price: 150 + (index % 5) * 25,
  stock: 1,
  image,
  gallery: [image],
  description: 'A photo from the Summer Axolotls Home gallery. This image is available for viewing in the catalog and can be shared or ordered through WhatsApp.',
  featured: index < 4,
  reviews: [
    { name: 'Customer', location: 'Local buyer', rating: 5, text: 'Beautiful axolotl photo from the Summer Axolotls Home gallery.' }
  ]
}));

const testimonials = [
  {
    name: 'Alicia M.',
    location: 'Austin, TX',
    rating: 5,
    text: 'Placeholder testimonial for demo purposes. Replace with real customer feedback before launch.',
    isPlaceholder: true
  },
  {
    name: 'Jordan P.',
    location: 'Dallas, TX',
    rating: 5,
    text: 'Placeholder testimonial for demo purposes. Replace with real customer feedback before launch.',
    isPlaceholder: true
  },
  {
    name: 'Nia S.',
    location: 'Houston, TX',
    rating: 4,
    text: 'Placeholder testimonial for demo purposes. Replace with real customer feedback before launch.',
    isPlaceholder: true
  },
  {
    name: 'Ethan R.',
    location: 'San Antonio, TX',
    rating: 5,
    text: 'Placeholder testimonial for demo purposes. Replace with real customer feedback before launch.',
    isPlaceholder: true
  }
];
