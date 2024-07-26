import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        this.authService.handleLoginResponse(response);
        const role = this.authService.getRole();
        if (role === 'admin') {
          this.router.navigate(['/admin']);
        } else if (role === 'operator') {
          this.router.navigate(['/operator']);
        } else {
          this.router.navigate(['/guest']);
        }
      },
      (error) => {
        console.error('Login failed', error);
      }
    );
  }
}
