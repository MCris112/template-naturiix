export type Testimonial = {
  id: number;
  name: string;
  city: string;
  rating: number;           // 1 - 5
  productSlug: string;      // product the customer talks about
  quote: string;
};

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'María G.',
    city: 'Lima',
    rating: 5,
    productSlug: 'camu-camu',
    quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam, sed nisi nulla quis sem.',
  },
  {
    id: 2,
    name: 'Jorge R.',
    city: 'Arequipa',
    rating: 5,
    productSlug: 'colageno',
    quote: 'Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.',
  },
  {
    id: 3,
    name: 'Lucía P.',
    city: 'Cusco',
    rating: 4,
    productSlug: 'moringa',
    quote: 'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.',
  },
  {
    id: 4,
    name: 'Carlos M.',
    city: 'Trujillo',
    rating: 5,
    productSlug: 'gastry-bye',
    quote: 'Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis.',
  },
  {
    id: 5,
    name: 'Ana V.',
    city: 'Piura',
    rating: 5,
    productSlug: 'fem-ease',
    quote: 'Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa.',
  },
  {
    id: 6,
    name: 'Roberto S.',
    city: 'Chiclayo',
    rating: 4,
    productSlug: 'vigora-vita',
    quote: 'Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh.',
  },
];
