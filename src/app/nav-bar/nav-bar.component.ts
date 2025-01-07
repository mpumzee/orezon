import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  user: any;

  dashboard = false
  logIn = false
  logOut=false
  home=false

  constructor(private router: Router){}

  ngOnInit(): void{

    if (sessionStorage.length == 0) {
      console.log('trueeeee')
      this.logIn = true;
    }
    else{
      console.log('false')
      this.dashboard = true
      this.logOut = true
      this.home = true
      this.logIn = false
    }
  }

}
