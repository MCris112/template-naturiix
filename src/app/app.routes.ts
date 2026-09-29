import { Routes } from '@angular/router';
import { HomePage } from './home/home.page';

export const routes: Routes = [
    {
        path: "",
        component: HomePage,
        title: "Naturiix | Vida y salud natural"
    },
    {
        path: "productos",
        loadComponent: () => import('./products/products.page').then(m => m.ProductsPage),
        title: "Nuestros productos | Naturiix"
    },
    {
        path: "productos/:slug",
        loadComponent: () => import('./product/product.page').then(m => m.ProductPage),
        title: "Producto | Naturiix"
    },
    {
        path: "quienes-somos",
        loadComponent: () => import('./about/about.page').then(m => m.AboutPage),
        title: "¿Quiénes somos? | Naturiix"
    },
    {
        path: "testimonios",
        loadComponent: () => import('./testimonials/testimonials.page').then(m => m.TestimonialsPage),
        title: "Testimonios | Naturiix"
    },
    {
        path: "blog",
        loadComponent: () => import('./blog/blog.page').then(m => m.BlogPage),
        title: "Blog | Naturiix"
    },
    {
        path: "contacto",
        loadComponent: () => import('./contact/contact.page').then(m => m.ContactPage),
        title: "Contacto | Naturiix"
    },
    {
        path: "**",
        redirectTo: ""
    }
];
