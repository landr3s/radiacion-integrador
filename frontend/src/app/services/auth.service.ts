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

  handleLoginResponse(response: any): void {
    localStorage.setItem('token', response.token);
    this.setLoggedIn(true);
    this.setRole(response.role);
  }

  setLoggedIn(status: boolean): void {
    this.loggedIn.next(status);
  }

  isLoggedIn(): boolean {
    return this.loggedIn.value;
  }

  setRole(role: string): void {
    this.userRole.next(role);
  }

  getRole(): string {
    return this.userRole.value;
  }

  logout(): void {
    this.setLoggedIn(false);
    this.setRole('');
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
