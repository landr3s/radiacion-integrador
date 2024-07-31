// dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { SensorService } from '../../../services/sensor.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  sensorData: any[] = [];

  constructor(private sensorService: SensorService) {}

  ngOnInit(): void {
    this.loadSensorData();
  }

  loadSensorData() {
    this.sensorService.getSensorData().subscribe(
      (data) => {
        this.sensorData = data;
      },
      (error) => {
        console.error('Error loading sensor data', error);
      }
    );
  }
}
