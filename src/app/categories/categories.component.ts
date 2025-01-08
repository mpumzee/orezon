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
        'A rock, a mineral or other naturally occurring material of economic value.',
    },
    {
      id: 3,
      name: 'Energy Minerals',
      img: 'assets/img/energy.png',
      description:
        'Minerals that can be burned to release energy, such as coal and uranium.',
    },
    {
      id: 4,
      name: 'Metallic Minerals',
      img: 'assets/img/metallic.png',
      description:
        'Minerals which contain one or more metallic elements in their raw form.',
    },
    {
      id: 5,
      name: 'Non-Metallic Minerals',
      img: 'assets/img/non-metallic.png',
      description:
        'Composed of chemical elements that dont have the properties of any metals.',
    },
  ];

  goToCategoryProducts(id: any) {
    this.router.navigate(['/category-shop', id]);
  }
}
