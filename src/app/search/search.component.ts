import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { CartService } from '../../services/cart.service';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  URL = environment.domain;
  currentCart: any = [];
  searchTerm = '';
  filterValue = '';
  totalCart = 0;
  cartTotalAmount = 0;


  constructor(
    private http: HttpClient,
    private router: Router,
    private searchService: SearchService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.cartService.updateTotal.subscribe((resp) => {
      if (resp) {
        this.currentCart = this.cartService.getCurrentCart();
        this.totalCart = this.cartService.getTotaltems();
        this.cartTotalAmount = this.cartService.getTotal();
      }
    });
    this.currentCart = this.cartService.getCurrentCart();
    this.totalCart = this.cartService.getTotaltems();
    this.cartTotalAmount = this.cartService.getTotal();
    this.currentCart = this.currentCart.slice(0, 2);
  }

  deleteItem(item: any) {
    this.cartService.removeFromCart(item);
  }

  removeItem(item){
     this.cartService.removeFromCart(item)
  }


  // search(){
  //   const url = this.URL + "/search";
  //   this.http.get(url).subscribe((result) =>{

  //   })
  // }

  onSearch() {
    console.log(this.searchTerm);
    this.searchService.changeSearchTerm(this.searchTerm); // Update the search term in the service
  }
}
