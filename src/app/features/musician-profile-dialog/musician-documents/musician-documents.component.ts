import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, map } from 'rxjs/operators';
import { SelectValueService, NotificationsService } from '@arpa/services';
import { MusicianProfileDto } from '@arpa/models';
import { MusicianService } from '../services/musician.service';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { SelectItem } from 'primeng/api';
import { ColumnDefinition } from '../../../../@arpa/components/table/table.component';

@Component({
  selector: 'arpa-musician-documents',
  templateUrl: './musician-documents.component.html',
  styleUrls: ['./musician-documents.component.scss'],
})
export class MusicianDocumentsComponent implements OnInit {
  public form: FormGroup;

  public profile: MusicianProfileDto;

  public documentTypes: Observable<SelectItem[]>;
  public documents: BehaviorSubject<[]> = new BehaviorSubject([]);
  columns: ColumnDefinition<any>[] = [
    { label: 'musician-profile-dialog.DOCUMENT_TYPE', property: 'label', type: 'text', hideFilter: true },
  ];
  public documentList: Observable<any>;
  private _documents: any;

  constructor(
    public config: DynamicDialogConfig,
    private formBuilder: FormBuilder,
    public ref: DynamicDialogRef,
    private selectValueService: SelectValueService,
    private musicianService: MusicianService,
    private notificationsService: NotificationsService
  ) {
    this.config.data.profile.pipe(first()).subscribe((profile: MusicianProfileDto) => {
      this.profile = profile;
    });
    this.documentTypes = this.selectValueService.get('MusicianProfile', 'Documents');

    this.documentList = combineLatest(this.documentTypes, this.documents).pipe(
      map(([types, documents]) => {
        const list: Array<any> = [];
        documents.forEach((document) => {
          list.push(types.find((t) => t.value === document));
        });
        return list;
      })
    );
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      documentId: [null, [Validators.required]],
    });

    this._documents = this.profile.documents && this.profile.documents.length ? this.profile.documents : [];
    this.documents.next(this._documents);
  }

  add(): void {
    this.musicianService
      .addDocument(this.profile.id, { ...this.form.value })
      .pipe(first())
      .subscribe(() => {
        this._documents.push(this.form.value.documentId);
        this.documents.next(this._documents);
        this.notificationsService.success('DOCUMENT_ADDED', 'musician-profile-dialog');
      });
  }

  remove(id: string): void {
    this.musicianService
      .removeDocument(this.profile.id, id)
      .pipe(first())
      .subscribe(() => {
        this._documents = this._documents.filter((document: any) => document != id);
        this.documents.next(this._documents);
        this.notificationsService.success('DOCUMENT_REMOVED', 'musician-profile-dialog');
      });
  }
}
