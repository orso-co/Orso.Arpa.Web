import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DoublingInstrumentDto } from '../../../model/doublingInstrumentDto';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { first } from 'rxjs/operators';
import { MusicianProfileDto } from '../../../model/musicianProfileDto';
import { SectionDto } from '../../../model/sectionDto';

@Component({
  selector: 'arpa-musician-instruments',
  templateUrl: './musician-instruments.component.html',
  styleUrls: ['./musician-instruments.component.scss']
})
export class MusicianInstrumentsComponent {

  public form: FormGroup;

  public profile: MusicianProfileDto;
  public sections: Observable<SectionDto[]> = this.config.data.sections;

  public instruments: Observable<DoublingInstrumentDto[]>;

  constructor(public config: DynamicDialogConfig,
              private formBuilder: FormBuilder,
              public ref: DynamicDialogRef) {
    this.config.data.profile.pipe(first()).subscribe((profile: MusicianProfileDto) => {
      this.profile = profile;
    });
  }
}
