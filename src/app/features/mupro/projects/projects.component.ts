import { Component, OnDestroy, OnInit } from '@angular/core';
import { ColumnDefinition } from '../../../../@arpa/components/table/table.component';
import { ProjectDto } from '../../../../@arpa/models/projectDto';
import { DocumentNode } from 'graphql';
import { ProjectsQuery } from './projects.graphql';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'arpa-mupro-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit, OnDestroy {

  query: DocumentNode = ProjectsQuery;

  columns: ColumnDefinition<ProjectDto>[] = [
    { label: 'PROJECT', property: 'title', type: 'text' },
  ];

  personId: string | undefined;

  private routeSubscription: Subscription = Subscription.EMPTY;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe((params) => {
      this.personId = params.get('personId') || undefined;
    });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

}
