import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  public onRoute(route: string) {
    return this.router.url.toLowerCase() === route.toLocaleLowerCase();
  }

  public goToRoute(route: string) {
    this.router.navigate([route]);
  }
}
