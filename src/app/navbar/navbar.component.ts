import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

constructor(public router: Router){}


  name: string = localStorage.getItem('apodo') ?? '';

  logout(){
    localStorage.clear();
    this.router.navigate(["login"]);
  }
}
