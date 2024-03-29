import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
  users: any[] = [];
  isLoading: boolean = true;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    if (atob(this.userService.getToken()!) !== 'AdminUser') {
      this.router.navigate(['/dashboard']);
    }

    this.fetchUsers();
  }

  fetchUsers() {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Failed to fetch users: ', error);
        this.isLoading = false;
      }
  })
  }

}
