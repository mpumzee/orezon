import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-category-shop',
  standalone: true,
  imports: [],
  templateUrl: './category-shop.component.html',
  styleUrl: './category-shop.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryShopComponent implements OnInit {

  ngOnInit(): void { }

}
