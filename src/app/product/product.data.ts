import { Product, ProductContent } from './product.types';

const IMG = '/assets/images/product';

// Placeholder content shared by the products that don't have their own copy yet
const loremContent = (): ProductContent => ({
  whatIs: `
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
    Sed nisi. Nulla quis sem at nibh elementum imperdiet.</p>
    <p>Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue
    semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.</p>
  `,
  content: [
    'Lorem ipsum 500mg',
    'Dolor sit amet extract',
    'Consectetur adipiscing blend',
  ],
  whatIsUsedFor: [
    'Lorem ipsum benefit',
    'Dolor sit amet support',
    'Consectetur adipiscing feature',
    'Sed do eiusmod wellness',
  ],
  haveInMind: [
    'Lorem ipsum precaution',
    'Dolor sit amet warning',
  ],
});

const loremDescription = `
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  Sed non risus. Suspendisse lectus tortor, dignissim sit amet,
  adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam.
`;

export const products: Product[] = [
  {
    id: 1,
    slug: 'camu-camu',
    name: 'Camu Camu',
    description: `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Sed non risus. Suspendisse lectus tortor, dignissim sit amet,
    adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam.
    Maecenas ligula massa, varius a, semper congue, euismod non, mi.
    Proin porttitor, orci nec nonummy molestie, enim est eleifend mi,
    non fermentum diam nisl sit amet erat.
  `,
    image: `${IMG}/camu_camu_small.png`,
    type: 'variable',
    variations: [
      {
        id: 'camu-capsules-100',
        attributes: { presentation: 'capsules', size: '100 caps' },
        content: {
          whatIs: `
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
          Sed nisi. Nulla quis sem at nibh elementum imperdiet.</p>
        `,
          content: [
            'Lorem 250g',
            'Ipsum 100% extract',
            'Dolor sit amet blend',
            'Consectetur adipiscing powder',
          ],
          whatIsUsedFor: [
            'Lorem ipsum benefit',
            'Dolor sit amet support',
            'Consectetur adipiscing feature',
          ],
          haveInMind: [
            'Lorem ipsum precaution',
            'Dolor sit amet warning',
            'Consectetur adipiscing note',
            'Sed do eiusmod tempor consideration',
          ],
        },
        price: { amount: 75, currency: 'PEN', discount: 20 },
        inStock: true,
        image: `${IMG}/camu_camu_small.png`,
      },
      {
        id: 'camu-powder-500',
        attributes: { presentation: 'powder', size: '500 g' },
        content: {
          whatIs: `
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh
          elementum imperdiet. Duis sagittis ipsum.</p>
        `,
          content: [
            'Lorem 500g',
            'Ipsum concentrated powder',
            'Dolor sit amet natural blend',
            'Adipiscing elit formulation',
            'Ut enim ad minim ingredient',
          ],
          whatIsUsedFor: [
            'Lorem ipsum vitality',
            'Dolor sit amet energy',
            'Consectetur adipiscing balance',
            'Sed do eiusmod wellness',
          ],
          haveInMind: [
            'Lorem ipsum storage note',
            'Dolor sit amet dosage warning',
            'Consectetur adipiscing advisory',
            'Ut enim ad minim caution',
            'Tempor incididunt placeholder',
          ],
        },
        price: { amount: 120, currency: 'PEN' },
        inStock: true,
        image: `${IMG}/camu_camu_powder.png`,
      },
    ],
  },
  {
    id: 2,
    slug: 'colageno',
    name: 'Colágeno',
    description: loremDescription,
    image: `${IMG}/collagen_small.png`,
    type: 'simple',
    attributes: { presentation: 'capsules', size: '180 caps' },
    content: loremContent(),
    price: { amount: 89.9, currency: 'PEN', discount: 15 },
    inStock: true,
  },
  {
    id: 3,
    slug: 'moringa',
    name: 'Moringa',
    description: loremDescription,
    image: `${IMG}/moringa_small.png`,
    type: 'variable',
    variations: [
      {
        id: 'moringa-capsules-120',
        attributes: { presentation: 'capsules', size: '120 caps' },
        content: loremContent(),
        price: { amount: 59.9, currency: 'PEN' },
        inStock: true,
        image: `${IMG}/moringa.png`,
      },
      {
        id: 'moringa-capsules-240',
        attributes: { presentation: 'capsules', size: '240 caps' },
        content: loremContent(),
        price: { amount: 99.9, currency: 'PEN', discount: 10 },
        inStock: false,
        image: `${IMG}/moringa.png`,
      },
    ],
  },
  {
    id: 4,
    slug: 'gastry-bye',
    name: 'Gastry Bye',
    description: loremDescription,
    image: `${IMG}/gastry_bye_small.png`,
    type: 'simple',
    attributes: { presentation: 'capsules', size: '60 caps' },
    content: loremContent(),
    price: { amount: 65, currency: 'PEN', discount: 23 },
    inStock: true,
  },
  {
    id: 5,
    slug: 'fem-ease',
    name: 'Fem Ease',
    description: loremDescription,
    image: `${IMG}/fem_ease_small.png`,
    type: 'simple',
    attributes: { presentation: 'capsules', size: '60 caps' },
    content: loremContent(),
    price: { amount: 69.9, currency: 'PEN' },
    inStock: true,
  },
  {
    id: 6,
    slug: 'vigora-vita',
    name: 'Vigora Vita',
    description: loremDescription,
    image: `${IMG}/vigora_vita_small.png`,
    type: 'simple',
    attributes: { presentation: 'capsules', size: '90 caps' },
    content: loremContent(),
    price: { amount: 79.9, currency: 'PEN', discount: 10 },
    inStock: true,
  },

  // TODO: the products below reuse other products' images until their own are made
  {
    id: 7,
    slug: 'ortiga-herbal',
    name: 'Ortiga Herbal',
    description: loremDescription,
    image: `${IMG}/moringa_small.png`,
    type: 'simple',
    attributes: { presentation: 'capsules', size: '100 caps' },
    content: loremContent(),
    price: { amount: 65, currency: 'PEN', discount: 23 },
    inStock: true,
  },
  {
    id: 8,
    slug: 'calzi-colageno',
    name: 'Calzi Colágeno',
    description: loremDescription,
    image: `${IMG}/collagen_small.png`,
    type: 'simple',
    attributes: { presentation: 'capsules', size: '100 caps' },
    content: loremContent(),
    price: { amount: 65, currency: 'PEN', discount: 23 },
    inStock: true,
  },
  {
    id: 9,
    slug: 'slim-forte',
    name: 'Slim Forte',
    description: loremDescription,
    image: `${IMG}/fem_ease_small.png`,
    type: 'simple',
    attributes: { presentation: 'capsules', size: '100 caps' },
    content: loremContent(),
    price: { amount: 65, currency: 'PEN' },
    inStock: true,
  },
  {
    id: 10,
    slug: 'energy-plus',
    name: 'Energy Plus',
    description: loremDescription,
    image: `${IMG}/vigora_vita_small.png`,
    type: 'simple',
    attributes: { presentation: 'capsules', size: '100 caps' },
    content: loremContent(),
    price: { amount: 55, currency: 'PEN' },
    inStock: true,
  },
  {
    id: 11,
    slug: 'zeus-vital',
    name: 'Zeus Vital',
    description: loremDescription,
    image: `${IMG}/gastry_bye_small.png`,
    type: 'simple',
    attributes: { presentation: 'capsules', size: '100 caps' },
    content: loremContent(),
    price: { amount: 85, currency: 'PEN', discount: 12 },
    inStock: true,
  },
  {
    id: 12,
    slug: 'ca-mg-zn',
    name: 'Ca + Mg + Zn',
    description: loremDescription,
    image: `${IMG}/camu_camu_powder_small.png`,
    type: 'variable',
    variations: [
      {
        id: 'ca-mg-zn-powder-500',
        attributes: { presentation: 'powder', size: '500 g' },
        content: loremContent(),
        price: { amount: 95, currency: 'PEN' },
        inStock: true,
        image: `${IMG}/camu_camu_powder.png`,
      },
      {
        id: 'ca-mg-zn-powder-1000',
        attributes: { presentation: 'powder', size: '1 kg' },
        content: loremContent(),
        price: { amount: 170, currency: 'PEN', discount: 10 },
        inStock: true,
        image: `${IMG}/camu_camu_powder.png`,
      },
    ],
  },
];
