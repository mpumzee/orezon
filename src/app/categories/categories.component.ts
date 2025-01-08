import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent {
  constructor(private router: Router) {}

  categoriesList = [
    {
      id: 1,
      name: 'Precious Minerals',
      img: 'assets/img/precious.png',
      description:
        'Rare, naturally occurring metallic chemical elements of high economic value.',
    },
    {
      id: 2,
      name: 'Industrial Minerals',
      img: 'assets/img/industrial.png',
      description:
        'Rare, naturally occurring metallic chemical elements of high economic value.',
    },
    {
      id: 3,
      name: 'Energy Minerals',
      img: 'assets/img/energy.png',
      description:
        'Rare, naturally occurring metallic chemical elements of high economic value.',
    },
    {
      id: 4,
      name: 'Metallic Minerals',
      img: 'assets/img/metallic.png',
      description:
        'Rare, naturally occurring metallic chemical elements of high economic value.',
    },
    {
      id: 5,
      name: 'Non-Metallic Minerals',
      img: 'assets/img/non-metallic.png',
      description:
        'Rare, naturally occurring metallic chemical elements of high economic value.',
    },
  ];

  goToCategoryProducts(id: any) {
    this.router.navigate(['/category-shop', id]);
  }
}
