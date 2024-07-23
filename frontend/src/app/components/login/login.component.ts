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
        // Actualizar el estado de autenticación y el rol
        this.authService.setLoggedIn(true);
        this.authService.setRole(response.role);

        // Redirigir según el rol del usuario
        const role = response.role;
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
