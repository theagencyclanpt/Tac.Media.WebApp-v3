import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from "@services/authentication/authentication.service";

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  mobile: boolean = false;

  constructor(
    private router: Router,
    private _authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    if (window.screen.width <= 924) {
      this.mobile = true;
    }
  }

  public onRoute(route: string) {
    return this.router.url.toLowerCase() === route.toLocaleLowerCase();
  }

  public goToRoute(route: string) {
    this.router.navigate([route]);
  }

  public onLogout() {
    this._authService.logout();
    window.location.reload();
  }

  public getUserName() {
    return this._authService.getUser()?.name;
  }
}
