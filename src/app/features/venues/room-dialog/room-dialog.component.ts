import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { RoomCreateBodyDto, RoomDto, RoomModifyBodyDto } from '@arpa/models';
import { EnumService, SelectValueService, RoomService, VenueService } from '@arpa/services';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem, SelectItem } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'arpa-room-dialog',
  templateUrl: './room-dialog.component.html',
  styleUrls: ['./room-dialog.component.scss'],
})
export class RoomDialogComponent implements OnInit {
  room: RoomDto;
  venueId: string;

  steps: MenuItem[] = [];
  activeIndex = 0;

  constructor(
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    private roomService: RoomService,
    private venueService: VenueService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.room = this.config.data.room;
    this.venueId = this.config.data.venueId;
    this.createStepperMenu(this.room);
  }

  private createStepperMenu(room: RoomDto): void {
    this.steps = [
      {
        label: this.translate.instant('venues.BASIC_DATA'),
        command: () => {
          this.activeIndex = 0;
        },
      },
      {
        label: this.translate.instant('venues.ROOM_EQUIPMENT'),
        disabled: !room,
        command: () => {
          this.activeIndex = 1;
        },
      },
      {
        label: this.translate.instant('venues.ROOM_SECTIONS'),
        disabled: !room,
        command: () => {
          this.activeIndex = 2;
        },
      },
    ];
  }

  cancel() {
    this.ref.close(null);
  }

  onRoomCreatedOrUpdated(room: RoomDto) {
    this.ref.close(room);
  }
}
