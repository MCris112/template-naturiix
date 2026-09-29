export type BlogCategory = 'Adultos mayores' | 'Adultos' | 'Jóvenes' | 'Niños';

export type BlogPost = {
  id: number;
  title: string;
  headline: string;         // big text on the promo cover
  bullets: string[];        // highlights on the promo cover
  excerpt: string;
  productSlug: string;
  category: BlogCategory;
  tags: string[];
  cover: 'green' | 'purple' | 'amber' | 'teal';
  date: string;             // ISO date
};

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Moringa en cápsulas',
    headline: '¿Lorem ipsum?',
    bullets: ['Dolor sit amet', 'Consectetur adipiscing', 'Sed do eiusmod', 'Tempor incididunt'],
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.',
    productSlug: 'moringa',
    category: 'Adultos mayores',
    tags: ['Corazón', 'Sistema inmune', 'Vitamina'],
    cover: 'green',
    date: '2025-03-12',
  },
  {
    id: 2,
    title: 'Camu Camu: fortalece tu sistema inmune',
    headline: 'Fortalece tu sistema',
    bullets: ['Rico en vitamina C', 'Lorem ipsum dolor', 'Mejora tu organismo', 'Protección antiviral'],
    excerpt: 'Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent.',
    productSlug: 'camu-camu',
    category: 'Adultos',
    tags: ['Sistema inmune', 'Vitamina', 'Protector'],
    cover: 'purple',
    date: '2025-02-24',
  },
  {
    id: 3,
    title: 'Colágeno para tus huesos',
    headline: 'Cuida tus huesos',
    bullets: ['Lorem ipsum dolor', 'Regenera tejidos', 'Sit amet consectetur', 'Contra el dolor'],
    excerpt: 'Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis.',
    productSlug: 'colageno',
    category: 'Adultos mayores',
    tags: ['Dolores', 'Protector'],
    cover: 'teal',
    date: '2025-02-02',
  },
  {
    id: 4,
    title: 'Gastry Bye y tu estómago',
    headline: 'Adiós al malestar',
    bullets: ['Lorem ipsum', 'Alivio estomacal', 'Dolor sit amet', 'Digestión ligera'],
    excerpt: 'Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet.',
    productSlug: 'gastry-bye',
    category: 'Adultos',
    tags: ['Estómago', 'Cólicos', 'Relajante'],
    cover: 'amber',
    date: '2025-01-18',
  },
  {
    id: 5,
    title: 'Fem Ease: bienestar femenino',
    headline: 'Tu bienestar primero',
    bullets: ['Lorem ipsum dolor', 'Alivio natural', 'Consectetur elit', 'Equilibrio hormonal'],
    excerpt: 'Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent.',
    productSlug: 'fem-ease',
    category: 'Jóvenes',
    tags: ['Menopausia', 'Cólicos', 'Relajante'],
    cover: 'purple',
    date: '2024-12-30',
  },
  {
    id: 6,
    title: 'Vigora Vita para toda la familia',
    headline: 'Energía todo el día',
    bullets: ['Lorem ipsum', 'Más energía', 'Dolor sit amet', 'Mente activa'],
    excerpt: 'Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla. Suspendisse potenti.',
    productSlug: 'vigora-vita',
    category: 'Niños',
    tags: ['Cerebro', 'Vitamina', 'Vista'],
    cover: 'green',
    date: '2024-12-11',
  },
];
