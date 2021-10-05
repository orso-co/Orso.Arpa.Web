import { PersonService } from '../services/person.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first, map } from 'rxjs/operators';
import { DialogService } from 'primeng/dynamicdialog';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';
import { NotificationsService } from '../../../../@arpa/services/notifications.service';
import { MeService } from '../../../shared/services/me.service';
import { SelectValueService } from '../../../shared/services/select-value.service';
import { Table } from 'primeng/table';
import { SectionService } from '../../../shared/services/section.service';
import { SelectItem } from 'primeng/api';
import { PersonDto } from '../../../../@arpa/models/personDto';
import { Unsubscribe } from '../../../../@arpa/decorators/unsubscribe.decorator';

@Component({
  selector: 'arpa-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})

@Unsubscribe()
export class PersonListComponent {

   persons: Observable<PersonDto[]>;

  constructor(

    private route: ActivatedRoute,
    private dialogService: DialogService,
    public translate: TranslateService,
    private PersonService: PersonService,
    private notificationsService: NotificationsService,
    private meService: MeService,
    private selectValueService: SelectValueService,
    private sectionService: SectionService,
  ) {
    this.persons = this.route.data.pipe<PersonDto[]>(map((data) => data.persons));
  }


  public clear(ref: Table) {
    ref.clear();
  }

}
