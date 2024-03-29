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
  isLoading: boolean = true;
  isEmpty: boolean = false;

  constructor(private userService: UserService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.fetchGraphData();
  }

  fetchGraphData() {
    this.isLoading = true;

    this.userService.getAssessmentGraphData(this.id!)
      .subscribe(response => {

        if (response && response.data) {
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
            },
            options: {
              responsive: true
            }
          }

          this.createChart();
        } else {
          this.isEmpty = true;
        }

        this.isLoading = false;
      })
  }

  createChart() {
    if (this.assessmentChart) {
      const ctx = this.assessmentChart?.nativeElement as HTMLCanvasElement;
      new Chart(ctx, this.chartConfig);
    }
  }

}
