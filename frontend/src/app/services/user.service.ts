import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service'; // Asegúrate de tener tu servicio de autenticación

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/api/users`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders() {
    const token = localStorage.getItem('token'); // O como tengas configurado el token
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  createUser(
    username: string,
    password: string,
    role: string
  ): Observable<any> {
    return this.http.post<any>(
      this.apiUrl,
      { username, password, role },
      { headers: this.getHeaders() }
    );
  }

  updateUser(userId: string, username: string): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/${userId}`,
      { username },
      { headers: this.getHeaders() }
    );
  }
}
