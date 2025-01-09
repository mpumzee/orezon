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
        'Equipment used to drill holes in the ground for such activities as prospecting.',
    },
    {
      id: 2,
      name: 'Rotary Drills',
      img: 'assets/img/rotary.png',
      description:
        'Equipment used to drill holes in the ground for such activities as prospecting.',
    },
    {
      id: 3,
      name: 'Pneumatic Drills',
      img: 'assets/img/drill.png',
      description:
        'Equipment used to drill holes in the ground for such activities as prospecting.',
    },
    {
      id: 4,
      name: 'Jackhammers',
      img: 'assets/img/jackhammer.png',
      description:
        'Equipment used to drill holes in the ground for such activities as prospecting.',
    },
  ];

  haulingList = [
    {
      id: 1,
      name: 'Loaders',
      img: 'assets/img/hauling.png',
      description:
        'Equipment used to remove overburden and waste rocks from the mine site.',
    },
    {
      id: 2,
      name: 'Haul Trucks',
      img: 'assets/img/hauling.png',
      description:
        'Equipment used to remove overburden and waste rocks from the mine site.',
    },
    {
      id: 3,
      name: 'Conveyor Belts',
      img: 'assets/img/hauling.png',
      description:
        'Equipment used to remove overburden and waste rocks from the mine site.',
    },
    {
      id: 4,
      name: 'Skid-Steer Loaders',
      img: 'assets/img/hauling.png',
      description:
        'Equipment used to remove overburden and waste rocks from the mine site.',
    },
  ];

  crushingList = [
    {
      id: 1,
      name: 'Jaw Crushers',
      img: 'assets/img/crushing.png',
      description:
        'Equipment used in the liberation and reduction of the size of the ore.',
    },
    {
      id: 2,
      name: 'Cone Crushers',
      img: 'assets/img/crushing.png',
      description:
        'Equipment used in the liberation and reduction of the size of the ore.',
    },
    {
      id: 3,
      name: 'Ball Mills',
      img: 'assets/img/crushing.png',
      description:
        'Equipment used in the liberation and reduction of the size of the ore.',
    },
    {
      id: 4,
      name: 'Rod Mills',
      img: 'assets/img/crushing.png',
      description:
        'Equipment used in the liberation and reduction of the size of the ore.',
    },
  ];

  seperationList = [
    {
      id: 1,
      name: 'Floatation Cells',
      img: 'assets/img/separation.png',
      description:
        'Equipment for separating commercially valuable minerals from their ores.',
    },
    {
      id: 2,
      name: 'Magnetic Separators',
      img: 'assets/img/separation.png',
      description:
        'Equipment for separating commercially valuable minerals from their ores.',
    },
    {
      id: 3,
      name: 'centrifuges',
      img: 'assets/img/separation.png',
      description:
        'Equipment for separating commercially valuable minerals from their ores.',
    },
    {
      id: 4,
      name: 'Spiral Concentrators',
      img: 'assets/img/separation.png',
      description:
        'Equipment for separating commercially valuable minerals from their ores.',
    },
  ];

  undergroudList = [
    {
      id: 1,
      name: 'Jumbos',
      img: 'assets/img/underground.png',
      description:
        'A variety of subsurface mining techniques used to extract hard minerals.',
    },
    {
      id: 2,
      name: 'Load-Haul-Dump (LHD) Machnies',
      img: 'assets/img/underground.png',
      description:
        'A variety of subsurface mining techniques used to extract hard minerals.',
    },
    {
      id: 3,
      name: 'Scissor Lifts',
      img: 'assets/img/underground.png',
      description:
        'A variety of subsurface mining techniques used to extract hard minerals.',
    },
    {
      id: 4,
      name: 'Underground Trucks',
      img: 'assets/img/underground.png',
      description:
        'A variety of subsurface mining techniques used to extract hard minerals.',
    },
  ];

  safetyList = [
    {
      id: 1,
      name: 'Hard Hats',
      img: 'assets/img/safety.png',
      description:
        'Collection of tools and protective gear that miners use to protect themselves.',
    },
    {
      id: 2,
      name: 'Safety Glasses',
      img: 'assets/img/safety.png',
      description:
        'Collection of tools and protective gear that miners use to protect themselves.',
    },
    {
      id: 3,
      name: 'Respirators',
      img: 'assets/img/safety.png',
      description:
        'Collection of tools and protective gear that miners use to protect themselves.',
    },
    {
      id: 4,
      name: 'Fall Protection Gear',
      img: 'assets/img/safety.png',
      description:
        'Collection of tools and protective gear that miners use to protect themselves.',
    },
  ];

  miscellaneousList = [
    {
      id: 1,
      name: 'Spares',
      img: 'assets/img/miscellaneous.png',
      description: 'Their availability is important for ensuring high output.',
    },
    {
      id: 2,
      name: 'Generators',
      img: 'assets/img/miscellaneous.png',
      description: 'Their availability is important for ensuring high output.',
    },
    {
      id: 3,
      name: 'Pumps',
      img: 'assets/img/miscellaneous.png',
      description: 'Their availability is important for ensuring high output.',
    },
    {
      id: 4,
      name: 'Conveyor Belt Systems',
      img: 'assets/img/miscellaneous.png',
      description: 'Their availability is important for ensuring high output.',
    },
    {
      id: 5,
      name: 'Explosives',
      img: 'assets/img/miscellaneous.png',
      description: 'Their availability is important for ensuring high output.',
    },
  ];

  goToCategoryProducts(id: any) {
    this.router.navigate(['/category-shop', id]);
  }
}
