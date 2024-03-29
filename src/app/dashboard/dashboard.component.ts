import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { UserInterceptor } from '../services/user.interceptor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  assessmentReports: any[] = [];
  isLoading: boolean = true;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.fetchAssessmentReports();
  }

  fetchAssessmentReports() {
    this.userService.getUserAssessments().subscribe({
      next: (reports) => {
        this.assessmentReports = reports;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Failed to fetch assessment reports: ', error);
        this.isLoading = false;
      }
    })
  }

  openAssessmentReport(id: string) {
    this.router.navigate(['/assessment', id]);
  }

}
