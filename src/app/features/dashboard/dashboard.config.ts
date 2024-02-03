import { IframeWidgetComponent } from './iframe-widget/iframe-widget.component';
import { IframeWidgetProjectstatsComponent } from './iframe-widget-projectstats/iframe-widget-projectstats.component';
import { UserWidgetComponent } from './user-widget/user-widget.component';
import { MessagesWidgetComponent } from './messages-widget/messages-widget.component';
import { ProjectsWidgetComponent } from './projects-widget/projects-widget.component';
import { TasksWidgetComponent } from './tasks-widget/tasks-widget.component';
import { ChartWidgetComponent } from './chart-widget/chart-widget.component';
import { AppointmentsWidgetComponent } from './appointments-widget/appointments-widget.component';
import { ChoirGridWidgetComponent } from './choir-grid-widget/choir-grid-widget.component';
import { NewsWidgetComponent } from './news-widget/news-widget.component';
import { BirthdayWidgetComponent } from './birthday-widget/birthday-widget/birthday-widget.component';
import { PerformerWidgetComponent } from './performer-widget/performer-widget.component';

export const widgets: Record<string, any> = {
  UserWidget: UserWidgetComponent,
  MessagesWidget: MessagesWidgetComponent,
  ProjectsWidget: ProjectsWidgetComponent,
  TasksWidget: TasksWidgetComponent,
  ChartWidget: ChartWidgetComponent,
  AppointmentsWidget: AppointmentsWidgetComponent,
  ChoirGridWidgetComponent: ChoirGridWidgetComponent,
  IframeWidget: IframeWidgetComponent,
  IframeWidgetProjectstats: IframeWidgetProjectstatsComponent,
  NewsWidget: NewsWidgetComponent,
  BirthdayWidget: BirthdayWidgetComponent,
  PerformerWidget: PerformerWidgetComponent,
};

export const dashboards: Record<string, Record<string, any>> = {
  performer: {
    widgets: [
      [
        'NewsWidget',
        {
          title: 'NEWS',
        },
      ],
      [
        'PerformerWidget',
        {
          title: 'PERFORMER',
        },
      ],
      [
        'AppointmentsWidget',
        {
          title: 'APPOINTMENTS',
        },
      ],
    ],
  },
  staff: {
    charts: [
      [
        'ChartWidget',
        {
          title: 'PROJECTS',
          store: 'projectsStats',
          props: ['done', 'cancelled', 'confirmed', 'postponed', 'archived'],
          labels: ['DONE', 'projectStatus.CANCELLED', 'projectStatus.CONFIRMED', 'projectStatus.POSTPONED', 'projectStatus.ARCHIVED'],
          type: 'pie',
        },
      ],
    ],
    widgets: [
      [
        'NewsWidget',
        {
          title: 'NEWS',
        },
      ],
      [
        'BirthdayWidget',
        {
          title: 'BIRTHDAYS',
        },
      ],
      [
        'AppointmentsWidget',
        {
          title: 'APPOINTMENTS',
        },
      ],
      [
        'ProjectsWidget',
        {
          title: 'PROJECTS',
        },
      ],
    ],
    // tables: [['ChoirGridWidgetComponent', {
    //   title: 'CHOIR_GRID',
    // }]],
  },
  admin: {
    tables: [
      [
        'UserWidget',
        {
          title: 'USER_MANAGEMENT',
          showReload: true,
        },
      ],
    ],
  },
};
