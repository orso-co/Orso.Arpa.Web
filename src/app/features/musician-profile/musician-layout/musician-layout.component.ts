import { Component } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { MusicianProfileDto } from '../../../../@arpa/models/musicianProfileDto';
import { Observable } from 'rxjs';
import { DoublingInstrumentDto } from '../../../../@arpa/models/doublingInstrumentDto';

export enum ViewState {
  MAIN_INSTRUMENT,
  DOUBLING_INSTRUMENT,
  EDUCATION,
  DOCUMENTS,
}

@Component({
  selector: 'arpa-musician-layout',
  templateUrl: './musician-layout.component.html',
  styleUrls: ['./musician-layout.component.scss'],
})
export class MusicianLayoutComponent {

  public comboInstrumentView: boolean = this.config.data.comboInstrumentView;
  public index = 0;
  public profile: Observable<MusicianProfileDto> = this.config.data.profile;
  public doublingInstruments: Observable<DoublingInstrumentDto[]> = this.config.data.doublingInstruments;

  constructor(public config: DynamicDialogConfig) {

  }

  viewStateEvents(event: any) {
    this.index = event.state || 0;
  }
}
