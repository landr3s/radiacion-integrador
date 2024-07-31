// sensor.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SensorService {
  private apiUrl = `${environment.apiUrl}/api/sensor`;

  constructor(private http: HttpClient) {}

  getSensorData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
