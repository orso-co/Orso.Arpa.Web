import { IPersonsDto } from './../../../models/IPersonsDto';
import { PersonsService } from './../../mupro/services/persons.service';
import { IPersonDto } from './../../../models/appointment';
import { Component, OnInit, NgModule } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first, map } from 'rxjs/operators';
import { Unsubscribe } from '../../../core/decorators/unsubscribe.decorator';
import { DialogService } from 'primeng/dynamicdialog';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';
import { NotificationsService } from '../../../core/services/notifications.service';
import { MeService } from '../../../core/services/me.service';
import { SelectValueService } from '../../../core/services/select-value.service';
import { Table } from 'primeng/table';
import { SectionService } from '../../../core/services/section.service';
import { SelectItem } from 'primeng/api';
import { CommonModule } from '@angular/common';

// @NgModule ({
//   imports: [ CommonModule ]
// })

@Component({
  selector: 'arpa-persons-list',
  templateUrl: './persons-list.component.html',
  styleUrls: ['./persons-list.component.scss']
})

@Unsubscribe()
export class PersonsListComponent {

  public persons: Observable<IPersonsDto[]>;

  constructor(
    private route: ActivatedRoute,
    private dialogService: DialogService,
    public translate: TranslateService,
    private PersonsService: PersonsService,
    private notificationsService: NotificationsService,
    private meService: MeService,
    private selectValueService: SelectValueService,
    private sectionService: SectionService,
  ) {
    this.persons = this.route.data.pipe<IPersonsDto[]>(map((data) => data.persons));
  }
  public clear(ref: Table) {
    ref.clear();
  }

}
