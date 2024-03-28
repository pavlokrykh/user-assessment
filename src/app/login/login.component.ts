import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    this.userService.login(this.email, this.password).subscribe({
      next: (res) => this.handleLoginResponse(res),
      error: (err) => this.handleLoginError(err)
    });
  }

  handleLoginResponse(res: any) {
    console.log('Login successful: ', res);
    this.router.navigate(['/dashboard']);
  }

  handleLoginError(err: any) {
    console.error('Login failed:', err);
  }

}
