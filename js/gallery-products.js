const productListings = [
  ['chimera $1500.jpeg', 'Chimera', 1500],
  ['Mosaic $1200.jpeg', 'Mosaic', 1200],
  ['chimera $1200 1.jpeg', 'Chimera', 1200],
  ['Mosaic $700.jpeg', 'Mosaic', 700],
  ['Mosaic $500.jpeg', 'Mosaic', 500],
  ['mosaic $500 1.jpeg', 'Mosaic', 500],
  ['mosaic $500 3.jpeg', 'Mosaic', 500],
  ['mosaic $150 2.jpeg', 'Mosaic', 150],
  ['GFP $200.jpeg', 'GFP', 200],
  ['GFP $200 2.jpeg', 'GFP', 200],
  ['GFP $150.jpeg', 'GFP', 150],
  ['GFP $150 1.jpeg', 'GFP', 150],
  ['GFP $150 3.jpeg', 'GFP', 150],
  ['GFP melanoid.jpeg', 'GFP Melanoid', null],
  ['Golden $200.jpeg', 'Golden', 200],
  ['Lavender $200.jpeg', 'Lavender', 200],
  ['Levander $200.jpeg', 'Lavender', 200],
  ['albino $100 4.jpeg', 'Albino', 100],
  ['melanoid $200.jpeg', 'Melanoid', 200],
  ['pyrite $200.jpeg', 'Pyrite', 200],
  ['wild copper $200.jpeg', 'Wild Copper', 200],
  ['widcopper3 200$.jpeg', 'Wild Copper', 200],
  ['Stardust mosaic.jpeg', 'Stardust Mosaic', 300],
  ['white albino $150.jpeg', 'White Albino', 150],
  ['Leucistic $100 1.jpeg', 'Leucistic', 100],
  ['Leucistic $100 5.jpeg', 'Leucistic', 100],
  ['Leucistic $100 6.jpeg', 'Leucistic', 100],
  ['Leucistic $100 7.jpeg', 'Leucistic', 100],
  ['Leucistic $100 8.jpeg', 'Leucistic', 100],
  ['Leucitic $100 1.jpeg', 'Leucistic', 100],
  ['Leucitic $101.jpeg', 'Leucistic', 101]
];

const categoryDescriptions = {
  Albino: 'Albino color morph. Contact us to confirm this individual’s availability and details.',
  Chimera: 'Chimera color morph. Contact us to confirm this individual’s availability and details.',
  'GFP Melanoid': 'GFP Melanoid color morph. Contact us for this individual’s price and availability.',
  GFP: 'GFP color morph. Contact us to confirm this individual’s availability and details.',
  Golden: 'Golden color morph. Contact us to confirm this individual’s availability and details.',
  Lavender: 'Lavender color morph. Contact us to confirm this individual’s availability and details.',
  Leucistic: 'Leucistic color morph. Contact us to confirm this individual’s availability and details.',
  Melanoid: 'Melanoid color morph. Contact us to confirm this individual’s availability and details.',
  Mosaic: 'Mosaic color morph. Contact us to confirm this individual’s availability and details.',
  Pyrite: 'Pyrite color morph. Contact us to confirm this individual’s availability and details.',
  'Stardust Mosaic': 'Stardust Mosaic color morph. Contact us to confirm this individual’s availability and details.',
  'White Albino': 'White Albino color morph. Contact us to confirm this individual’s availability and details.',
  'Wild Copper': 'Wild Copper color morph. Contact us to confirm this individual’s availability and details.'
};

window.galleryProducts = productListings.map(([file, category, price], index) => ({
  id: `axolotl-${index + 1}`,
  name: category,
  category,
  price,
  image: `../image/${encodeURIComponent(file)}`,
  description: categoryDescriptions[category]
}));
