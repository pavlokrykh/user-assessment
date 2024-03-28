import { Component, ElementRef, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js/auto';

Chart.register(...registerables);

@Component({
  selector: 'app-assessment-report',
  templateUrl: './assessment-report.component.html',
  styleUrl: './assessment-report.component.scss'
})
export class AssessmentReportComponent implements OnInit {
  @ViewChild('assessmentChart') assessmentChart: ElementRef<HTMLCanvasElement> | null = null;

  id: number | null = null;
  graphData: any = null;
  graphType: string | null = null;
  chartConfig: ChartConfiguration = {
    type: this.graphType as ChartType,
    data: this.graphData
  };

  constructor(private userService: UserService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.fetchGraphData();
  }

  fetchGraphData() {
    this.userService.getAssessmentGraphData(this.id!)
      .subscribe(response => {
        
        this.graphData = response.data;
        this.graphType = response.type;

        const labels = Object.keys(this.graphData);
        const values = Object.values(this.graphData) as number[];

        this.chartConfig = {
          type: this.graphType as ChartType,
          data: {
            labels: labels,
            datasets: [
              {
                label: 'Assessment Scores',
                data: values,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)'
              }
            ]
          }
        }
        const ctx = this.assessmentChart?.nativeElement as HTMLCanvasElement;
        new Chart(ctx, this.chartConfig);

      })
  }

}
