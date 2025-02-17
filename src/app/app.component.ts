import { Component } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { LoaderService, AlertService } from './tools/services';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'orezon';
  load = false

  constructor(    public loaderService: LoaderService,private meta: Meta,
    public alertService:AlertService,){
      this.loaderService.isLoading.subscribe((resp) => {
        this.load = resp;
      });
    }

  ngOnInit(): void {
    initFlowbite();
    this.loaderService.isLoading.subscribe(resp =>{
      this.load = resp;
      if(this.load){
        this.alertService.loader();
      }else{
        this.alertService.closeLoader();
      }

    });
    this.meta.addTags([
      { name: 'description', content: 'Join our community today and experience the future of minerals and mining equipment trading   Ore-zone is a pioneering online marketplace that facilitates the buying and selling of minerals and mining equipment. Registered with the Government of South Africa, our platform provides a secure,transparent, and efficient way for businesses and individuals to connect and trade.' },
      { name: 'keywords', content: 'Ore-zon ,mining ,minerals , equipment ,drill  ,jack ' }
  ]);
  }
}
