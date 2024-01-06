import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { RoomCreateBodyDto, RoomDto, RoomModifyBodyDto } from '@arpa/models';
import { EnumService, SelectValueService, RoomService, VenueService } from '@arpa/services';
import { SelectItem } from 'primeng/api';
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
  formGroup: UntypedFormGroup;
  ceilingHeightTypes$: Observable<SelectItem[]>;
  capacityTypes$: Observable<SelectItem[]>;

  constructor(
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    formBuilder: UntypedFormBuilder,
    private enumService: EnumService,
    private selectValueService: SelectValueService,
    private roomService: RoomService,
    private venueService: VenueService
  ) {
    this.formGroup = formBuilder.group({
      name: [null, [Validators.required, Validators.maxLength(50)]],
      building: [null, [Validators.maxLength(50)]],
      floor: [null, [Validators.maxLength(50)]],
      ceilingHeight: [null, []],
      capacityId: [null, []],
    });
  }

  ngOnInit() {
    this.ceilingHeightTypes$ = this.enumService.getCeilingHeightSelectItems();
    this.capacityTypes$ = this.selectValueService.getRoomCapacityTypes();
    this.room = this.config.data.room;
    this.venueId = this.config.data.venueId;
    if (this.room) {
      this.formGroup.patchValue({
        name: this.room.name,
        building: this.room.building,
        floor: this.room.floor,
        ceilingHeight: this.room.ceilingHeight,
        capacityId: this.room.capacity?.id,
      });
    }
  }

  onSubmit() {
    if (this.formGroup.invalid) {
      return;
    }
    const value = { ...this.formGroup.value } as RoomCreateBodyDto | RoomModifyBodyDto;
    if (this.room) {
      this.roomService
        .update(this.room.id, value)
        .pipe(switchMap(() => this.roomService.loadById(this.room.id)))
        .subscribe((room) => this.ref.close(room));
    } else {
      this.venueService.addRoom(this.venueId, value).subscribe((room) => this.ref.close(room));
    }
  }

  cancel() {
    this.ref.close(null);
  }
}
