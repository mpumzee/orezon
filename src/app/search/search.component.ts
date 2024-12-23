import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
URL = environment.domain;
searchTerm = "";
filterValue = "";
constructor(private http: HttpClient, private router: Router, private searchService: SearchService){}


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

