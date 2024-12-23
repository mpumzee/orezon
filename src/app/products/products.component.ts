import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  constructor(private http: HttpClient, 
    private router: Router, private searchService: SearchService){ }
  equipment: any;
  slides: any;

  ngOnInit() {
    this.searchService.currentSearchTerm.subscribe(term => {
      if (term) {
        this.searchEquipment(term); // Call with the updated search term
      }
      else{
        this.getAllEquipment();
      }
      
    });
  }

  getAllEquipment(){
    const url = `http://localhost:8000/api/v1/equipment`;
    this.http.get(url).subscribe({
      next: (data: any) => {
        // console.log(data);
        this.slides = data.data;
      },
      error: (error: any) => {
        console.error(error);
        // Handle the error as needed
      }
    });
    }

  searchEquipment(name?: string){
    const url = `http://localhost:8000/api/v1/equipment/search/${name}`;
    this.http.get(url).subscribe({
      next: (data: any) => {
        console.log("Search result ",data);
        this.slides = data;
      },
      error: (error: any) => {
        console.error(error);
        // Handle the error as needed
      }
    });
    }

    // slides = [
    //   { img: 'http://placehold.it/350x150/000000' },
    //   { img: 'http://placehold.it/350x150/111111' },
    //   // more slides...
    // ];
    
    slideConfig = {
      slidesToShow: 4, // Adjust based on how many slides you want visible
      slidesToScroll: 1,
      dots: true,
      infinite: true,
  };
}
