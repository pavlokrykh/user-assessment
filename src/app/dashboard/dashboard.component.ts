import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { UserInterceptor } from '../services/user.interceptor';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  assessmentReports: any[] = [];
  isAdmin: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.isAdmin = this.userService.getRole() === 'Admin';
    this.fetchAssessmentReports();
  }

  fetchAssessmentReports() {
    this.userService.getUserAssessments().subscribe({
      next: (reports) => {
        this.assessmentReports = reports;
      },
      error: (error) => {
        console.error('Failed to fetch assessment reports: ', error);
      }
    })
  }

}
