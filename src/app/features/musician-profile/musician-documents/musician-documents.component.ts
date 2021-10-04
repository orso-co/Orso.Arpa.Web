import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, map } from 'rxjs/operators';
import { SelectValueService } from '../../../shared/services/select-value.service';
import { MusicianProfileDto } from '../../../../@arpa/models/musicianProfileDto';
import { MusicianService } from '../services/musician.service';
import { NotificationsService } from '../../../../@arpa/services/notifications.service';
import { Observable } from 'rxjs';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'arpa-musician-documents',
  templateUrl: './musician-documents.component.html',
  styleUrls: ['./musician-documents.component.scss'],
})
export class MusicianDocumentsComponent implements OnInit {

  public form: FormGroup;

  public profile: MusicianProfileDto;

  public documentTypes: Observable<SelectItem[]>;

  public documents: Array<any>;

  constructor(public config: DynamicDialogConfig,
              private formBuilder: FormBuilder,
              public ref: DynamicDialogRef,
              private selectValueService: SelectValueService,
              private musicianService: MusicianService,
              private notificationsService: NotificationsService) {

    this.config.data.profile.pipe(first()).subscribe((profile: MusicianProfileDto) => {
      this.profile = profile;
    });
    this.documentTypes = this.selectValueService.load('MusicianProfile', 'Documents')
      .pipe(map(() => this.selectValueService.get('MusicianProfile', 'Documents')));

  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      documentId: [null, [Validators.required]],
    });

    this.documents = (this.profile.documents && this.profile.documents.length) ? this.profile.documents : [];
  }

  add(): void {
    this.musicianService.addDocument(this.profile.id, { ...this.form.value })
      .pipe(first())
      .subscribe(() => {
        this.documents.push(this.form.value.documentId);
        this.notificationsService.success('DOCUMENT_ADDED');
      });
  }

  remove(id: string): void {
    this.musicianService.removeDocument(this.profile.id, id)
      .pipe(first())
      .subscribe(() => {
        this.documents = this.documents.filter(document => document != id);
        this.notificationsService.success('DOCUMENT_REMOVED');
      });
  }
}
