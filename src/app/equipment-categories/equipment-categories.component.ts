import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-equipment-categories',
  templateUrl: './equipment-categories.component.html',
  styleUrl: './equipment-categories.component.css',
})
export class EquipmentCategoriesComponent {
  constructor(private router: Router) {}

  ngOnInit() {}

  drillingList = [
    {
      id: 1,
      name: 'Drill Rigs',
      img: 'assets/img/drill_rig.png',
      description:
        'Rare, naturally occurring metallic chemical elements of high economic value.',
    },
    {
      id: 2,
      name: 'Rotary Drills',
      img: 'assets/img/rotary.png',
      description:
        'A rock, a mineral or other naturally occurring material of economic value.',
    },
    {
      id: 3,
      name: 'Pneumatic Drills',
      img: 'assets/img/drill.png',
      description:
        'Minerals that can be burned to release energy, such as coal and uranium.',
    },
    {
      id: 4,
      name: 'Jackhammers',
      img: 'assets/img/jackhammer.png',
      description:
        'Minerals which contain one or more metallic elements in their raw form.',
    },
  ];

  haulingList = [
    {
      id: 1,
      name: 'Loaders',
      img: 'assets/img/precious.png',
      description:
        'Rare, naturally occurring metallic chemical elements of high economic value.',
    },
    {
      id: 2,
      name: 'Haul Trucks',
      img: 'assets/img/industrial.png',
      description:
        'A rock, a mineral or other naturally occurring material of economic value.',
    },
    {
      id: 3,
      name: 'Conveyor Belts',
      img: 'assets/img/energy.png',
      description:
        'Minerals that can be burned to release energy, such as coal and uranium.',
    },
    {
      id: 4,
      name: 'Skid-Steer Loaders',
      img: 'assets/img/metallic.png',
      description:
        'Minerals which contain one or more metallic elements in their raw form.',
    },
  ];

  crushingList = [
    {
      id: 1,
      name: 'Jaw Crushers',
      img: 'assets/img/precious.png',
      description:
        'Rare, naturally occurring metallic chemical elements of high economic value.',
    },
    {
      id: 2,
      name: 'Cone Crushers',
      img: 'assets/img/industrial.png',
      description:
        'A rock, a mineral or other naturally occurring material of economic value.',
    },
    {
      id: 3,
      name: 'Ball Mills',
      img: 'assets/img/energy.png',
      description:
        'Minerals that can be burned to release energy, such as coal and uranium.',
    },
    {
      id: 4,
      name: 'Rod Mills',
      img: 'assets/img/metallic.png',
      description:
        'Minerals which contain one or more metallic elements in their raw form.',
    },
  ];

  seperationList = [
    {
      id: 1,
      name: 'Floatation Cells',
      img: 'assets/img/precious.png',
      description:
        'Rare, naturally occurring metallic chemical elements of high economic value.',
    },
    {
      id: 2,
      name: 'Magnetic Separators',
      img: 'assets/img/industrial.png',
      description:
        'A rock, a mineral or other naturally occurring material of economic value.',
    },
    {
      id: 3,
      name: 'centrifuges',
      img: 'assets/img/energy.png',
      description:
        'Minerals that can be burned to release energy, such as coal and uranium.',
    },
    {
      id: 4,
      name: 'Spiral Concentrators',
      img: 'assets/img/metallic.png',
      description:
        'Minerals which contain one or more metallic elements in their raw form.',
    },
  ];

  undergroudList = [
    {
      id: 1,
      name: 'Jumbos',
      img: 'assets/img/precious.png',
      description:
        'Rare, naturally occurring metallic chemical elements of high economic value.',
    },
    {
      id: 2,
      name: 'Load-Haul-Dump (LHD) Machnies',
      img: 'assets/img/industrial.png',
      description:
        'A rock, a mineral or other naturally occurring material of economic value.',
    },
    {
      id: 3,
      name: 'Scissor Lifts',
      img: 'assets/img/energy.png',
      description:
        'Minerals that can be burned to release energy, such as coal and uranium.',
    },
    {
      id: 4,
      name: 'Underground Trucks',
      img: 'assets/img/metallic.png',
      description:
        'Minerals which contain one or more metallic elements in their raw form.',
    },
  ];

  safetyList = [
    {
      id: 1,
      name: 'Hard Hats',
      img: 'assets/img/precious.png',
      description:
        'Rare, naturally occurring metallic chemical elements of high economic value.',
    },
    {
      id: 2,
      name: 'Safety Glasses',
      img: 'assets/img/industrial.png',
      description:
        'A rock, a mineral or other naturally occurring material of economic value.',
    },
    {
      id: 3,
      name: 'Respirators',
      img: 'assets/img/energy.png',
      description:
        'Minerals that can be burned to release energy, such as coal and uranium.',
    },
    {
      id: 4,
      name: 'Fall Protection Gear',
      img: 'assets/img/metallic.png',
      description:
        'Minerals which contain one or more metallic elements in their raw form.',
    },
  ];

  miscellaneousList = [
    {
      id: 1,
      name: 'Precious Minerals',
      img: 'assets/img/precious.png',
      description:
        'Rare, naturally occurring metallic chemical elements of high economic value.',
    },
    {
      id: 2,
      name: 'Generators',
      img: 'assets/img/industrial.png',
      description:
        'A rock, a mineral or other naturally occurring material of economic value.',
    },
    {
      id: 3,
      name: 'Pumps',
      img: 'assets/img/energy.png',
      description:
        'Minerals that can be burned to release energy, such as coal and uranium.',
    },
    {
      id: 4,
      name: 'Conveyor Belt Systems',
      img: 'assets/img/metallic.png',
      description:
        'Minerals which contain one or more metallic elements in their raw form.',
    },
    {
      id: 5,
      name: 'Explosives',
      img: 'assets/img/metallic.png',
      description:
        'Minerals which contain one or more metallic elements in their raw form.',
    },
    {
      id: 6,
      name: 'Spares',
      img: 'assets/img/metallic.png',
      description:
        'Minerals which contain one or more metallic elements in their raw form.',
    },
  ];

  goToCategoryProducts(id: any) {
    this.router.navigate(['/category-shop', id]);
  }
}
