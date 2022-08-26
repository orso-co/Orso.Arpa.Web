import { IframeWidgetComponent } from './iframe-widget/iframe-widget.component';
import { IframeWidgetProjectstatsComponent} from './iframe-widget-projectstats/iframe-widget-projectstats.component';
import { UserWidgetComponent } from './user-widget/user-widget.component';
import { MessagesWidgetComponent } from './messages-widget/messages-widget.component';
import { ProjectsWidgetComponent } from './projects-widget/projects-widget.component';
import { TasksWidgetComponent } from './tasks-widget/tasks-widget.component';
import { ChartWidgetComponent } from './chart-widget/chart-widget.component';
import { AppointmentsWidgetComponent } from './appointments-widget/appointments-widget.component';
import { ChoirGridWidgetComponent } from './choir-grid-widget/choir-grid-widget.component';

export const widgets: Record<string, any> = {
  'UserWidget': UserWidgetComponent,
  'MessagesWidget': MessagesWidgetComponent,
  'ProjectsWidget': ProjectsWidgetComponent,
  'TasksWidget': TasksWidgetComponent,
  'ChartWidget': ChartWidgetComponent,
  'AppointmentsWidget': AppointmentsWidgetComponent,
  'ChoirGridWidgetComponent': ChoirGridWidgetComponent,
  'IframeWidget': IframeWidgetComponent,
  'IframeWidgetProjectstats': IframeWidgetProjectstatsComponent,
};

export const dashboards: Record<string, Record<string, any>> = {
  performer: {
    widgets: [
    ['IframeWidget', {
        title: 'NEWS',
    }],
    ['AppointmentsWidget', {
      title: 'APPOINTMENTS',
    }],
    ['ProjectsWidget', {
      title: 'PROJECTS',
    }],
    ['IframeWidgetProjectstats', {
      title: 'PROJECTSTATS',
    }]
  ],
  },
  staff: {
    charts: [['ChartWidget', {
      title: 'PROJECTS',
      store: 'projectsStats',
      props: ['done', 'cancelled', 'confirmed', 'postponed', 'archived'],
      labels: ['DONE', 'CANCELLED', 'CONFIRMED', 'POSTPONED', 'ARCHIVED'],
      type: 'pie',
    }]],
    widgets: [['AppointmentsWidget', {
      title: 'APPOINTMENTS',
    }], ['MessagesWidget', {
      title: 'MESSAGES',
    }], ['ProjectsWidget', {
      title: 'PROJECTS',
    }], ['TasksWidget', {
      title: 'TASKS',
    }]],
    tables: [['ChoirGridWidgetComponent', {
      title: 'CHOIR_GRID',
    }]],
  },
  admin: {
    charts: [['ChartWidget', {
      title: 'USERS',
      store: 'userStats',
      props: ['active', 'pending', 'notConfirmed', 'registered'],
      labels: ['ACTIVE', 'PENDING', 'NOT_CONFIRMED', 'REGISTERED'],
      type: 'doughnut',
    }]],
    tables: [['UserWidget', {
      title: 'USER_MANAGEMENT',
      showReload: true,
    }]],
  },
};
