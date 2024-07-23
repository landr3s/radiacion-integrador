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

  isLoggedIn(): boolean {
    return this.loggedIn.value;
  }

  setLoggedIn(status: boolean): void {
    this.loggedIn.next(status);
  }

  getRole(): string {
    return this.userRole.value;
  }

  setRole(role: string): void {
    this.userRole.next(role);
  }

  logout(): void {
    this.setLoggedIn(false);
    this.setRole('');
  }
}
