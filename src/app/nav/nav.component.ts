import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  isAdmin: boolean = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.isAdmin = atob(this.userService.getToken()!) === 'AdminUser';
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}