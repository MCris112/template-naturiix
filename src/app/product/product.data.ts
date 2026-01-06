import { Product } from './product.types';

export const products: Product[] = [
  {
    id: 1,
    name: 'Camu Camu',
    description: `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
    Sed non risus. Suspendisse lectus tortor, dignissim sit amet, 
    adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. 
    Maecenas ligula massa, varius a, semper congue, euismod non, mi. 
    Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, 
    non fermentum diam nisl sit amet erat.
  `,
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
        price: { amount: 75, currency: 'PEN' },
        inStock: true,
        image: '/assets/images/product/camu_camu_small.png',
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
        image: '/assets/images/product/camu_camu_small.png',
      },
    ],
  },
];
