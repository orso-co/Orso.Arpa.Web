import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { RoomCreateBodyDto, RoomDto, RoomModifyBodyDto } from '@arpa/models';
import { EnumService, RoomService, SelectValueService, VenueService } from '@arpa/services';
import { SelectItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'arpa-room-dialog-basic-data',
  templateUrl: './room-dialog-basic-data.component.html',
  styleUrls: ['./room-dialog-basic-data.component.scss'],
})
export class RoomDialogBasicDataComponent implements OnInit, OnChanges {
  formGroup: UntypedFormGroup;
  ceilingHeightTypes$: Observable<SelectItem[]>;
  capacityTypes$: Observable<SelectItem[]>;
  @Input()
  room: RoomDto;
  @Input()
  venueId: string;
  @Output()
  roomCreatedOrUpdated: EventEmitter<RoomDto> = new EventEmitter<RoomDto>();
  @Output()
  cancel: EventEmitter<void> = new EventEmitter<void>();

  constructor(
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
      sizeInSquareMeters: [null, [Validators.min(0)]],
    });
  }

  ngOnInit() {
    this.ceilingHeightTypes$ = this.enumService.getCeilingHeightSelectItems();
    this.capacityTypes$ = this.selectValueService.getRoomCapacityTypes();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.venueId) {
      this.venueId = changes.venueId.currentValue;
    }
    if (changes?.room?.currentValue) {
      this.room = changes.room.currentValue;
      this.formGroup.patchValue({
        name: this.room.name,
        building: this.room.building,
        floor: this.room.floor,
        ceilingHeight: this.room.ceilingHeight,
        capacityId: this.room.capacity?.id,
        sizeInSquareMeters: this.room.sizeInSquareMeters,
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
        .subscribe((room) => this.roomCreatedOrUpdated.emit(room));
    } else {
      this.venueService.addRoom(this.venueId, value).subscribe((room) => this.roomCreatedOrUpdated.emit(room));
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}
