import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(private router: Router) { }

  role: string = sessionStorage.getItem('role') || ""

  logout(): void {
    sessionStorage.removeItem('jwtToken');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('role');
    location.reload();
  }

  redirectHome(): void {
    if (this.role == 'ROLE_ADMIN') this.router.navigate(['/admin'])
    else if (this.role == 'ROLE_DOCTOR') this.router.navigate(['/doctor'])
    else if (this.role == 'ROLE_NURSING') this.router.navigate(['/nursing'])
    else this.router.navigate(['/patient'])
  }

}
