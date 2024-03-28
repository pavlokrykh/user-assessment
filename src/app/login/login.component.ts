import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        console.log('Login successful: ', res);
      },
      error: (err) => {
        console.log('Login failed: ', err);
      }
    });
  }



}
