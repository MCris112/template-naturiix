import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from "@angular/router";

type MenuItem = {
  label: string;
  route: string;
}

@Component({
  selector: 'app-header',
  templateUrl: 'header.html',
  imports: [RouterLink]
})

export class HeaderComponent implements OnInit {

  isOpen$ = signal(true)

  menu: MenuItem[] = [
    {
      label: "Home",
      route: "/"
    },
    {
      label: "Our Products",
      route: "/products"
    },
    {
      label: "Testimonials",
      route: "/testimonials"
    },
    {
      label: "About Us",
      route: "/about-us"
    }
  ]

  constructor() { }

  ngOnInit() { }
}
