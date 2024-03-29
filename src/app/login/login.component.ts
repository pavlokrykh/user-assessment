import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;
  loginError: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService, 
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.userService.login(email, password).subscribe({
        next: (res) => this.handleLoginResponse(res),
        error: (err) => this.handleLoginError(err)
      })
    }
  }

  handleLoginResponse(res: any) {
    console.log('Login successful: ', res);
    this.router.navigate(['/dashboard']);
  }

  handleLoginError(err: any) {
    this.loginError = 'Invalid email or password';
    console.error('Login failed:', err);
  }

}
