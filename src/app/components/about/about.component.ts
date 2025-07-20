
import { Component, OnInit } from '@angular/core';
import { ColDef, GridOptions } from 'ag-grid-community';
import {Statistic, TeamMember, TimelineEvent} from '../../interfaces/AboutPage';
import { CHART_DATA, CHART_OPTION, COLUMNS_DEFS, GRID_OPTION, STATISTICS, TEAM_MEMBER, TIME_LINE_EVENT } from '../../model/about-models/about-model';
import { ABOUT_IMPORTS } from '../../model/about-models/about-imports';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [...ABOUT_IMPORTS],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  timelineEvents: TimelineEvent[] =TIME_LINE_EVENT;
  teamMembers: TeamMember[] = TEAM_MEMBER;
  statistics: Statistic[] = STATISTICS;
  chartData: any;
  chartOptions: any;

  columnDefs: ColDef[] = COLUMNS_DEFS;

  gridOptions: GridOptions = GRID_OPTION;

  ngOnInit(): void {
    this.initializeChart();
  }

  initializeChart(): void {
    this.chartData = CHART_DATA;
    this.chartOptions = CHART_OPTION;
  }
}