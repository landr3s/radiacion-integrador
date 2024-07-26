import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/api/login`;
  private loggedIn = new BehaviorSubject<boolean>(false);
  private userRole = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { username: email, password });
  }

  setLoggedIn(status: boolean): void {
    this.loggedIn.next(status);
  }

  setRole(role: string): void {
    this.userRole.next(role);
  }

  logout(): void {
    this.setLoggedIn(false);
    this.setRole('');
    localStorage.removeItem('token'); // Asegúrate de eliminar el token al cerrar sesión
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
