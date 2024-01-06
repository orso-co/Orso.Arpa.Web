import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { RoomDto, RoomEquipmentCreateBodyDto, RoomEquipmentDto, RoomEquipmentModifyBodyDto } from '@arpa/models';
import { NotificationsService, RoomEquipmentService, RoomService, SelectValueService } from '@arpa/services';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, SelectItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
@Component({
  selector: 'arpa-room-dialog-equipment',
  templateUrl: './room-dialog-equipment.component.html',
  styleUrls: ['./room-dialog-equipment.component.scss'],
})
export class RoomDialogEquipmentComponent implements OnInit {
  @Input()
  room: RoomDto;
  formGroup: UntypedFormGroup;
  selectedEquipment: RoomEquipmentDto | undefined;
  equipmentTypes$: Observable<SelectItem[]>;
  @Output()
  roomUpdated: EventEmitter<RoomDto> = new EventEmitter<RoomDto>();

  constructor(
    formBuilder: UntypedFormBuilder,
    private roomService: RoomService,
    private roomEquipmentService: RoomEquipmentService,
    private selectValueService: SelectValueService,
    private confirmationService: ConfirmationService,
    private translate: TranslateService,
    private notificationService: NotificationsService
  ) {
    this.formGroup = formBuilder.group({
      equipmentId: [null],
      quantity: [null, [Validators.min(1)]],
      description: [null, [Validators.maxLength(500)]],
    });
  }

  ngOnInit() {
    this.equipmentTypes$ = this.selectValueService.getRoomEquipmentTypes();
  }

  addRoomEquipment() {
    this.onSelectedEquipmentChange(undefined);
  }

  editRoomEquipment(equipment: RoomEquipmentDto) {
    this.onSelectedEquipmentChange(equipment);
  }

  onSelectedEquipmentChange(equipment: RoomEquipmentDto | undefined) {
    this.selectedEquipment = equipment;
    if (equipment) {
      this.formGroup.patchValue({
        equipmentId: equipment.equipmentId,
        quantity: equipment.quantity,
        description: equipment.description,
      });
    } else {
      this.formGroup.reset();
    }
  }

  onSubmit() {
    if (this.formGroup.invalid) {
      return;
    }
    const value = { ...this.formGroup.value } as RoomEquipmentCreateBodyDto | RoomEquipmentModifyBodyDto;
    if (this.selectedEquipment) {
      this.roomEquipmentService
        .update(this.selectedEquipment.id, value)
        .pipe(switchMap(() => this.roomEquipmentService.loadById(this.selectedEquipment!.id)))
        .subscribe((equipment) => {
          const index = this.room.availableEquipment.findIndex((room) => room.id == equipment.id) ?? -1;
          if (~index) {
            this.room.availableEquipment[index] = equipment;
            this.roomUpdated.emit(this.room);
          }
        });
    } else {
      this.roomService.addRoomEquipment(this.room.id, value as RoomEquipmentCreateBodyDto).subscribe((room) => {
        this.room.availableEquipment = [...this.room.availableEquipment, room];
        this.roomUpdated.emit(this.room);
      });
    }
  }

  onCancel() {
    this.onSelectedEquipmentChange(undefined);
  }

  confirmRoomEquipmentDeletion(event: Event, room: RoomDto) {
    this.confirmationService.confirm({
      target: event.target ?? undefined,
      message: this.translate.instant('venues.ARE_YOU_SURE'),
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: this.translate.instant('YES'),
      rejectLabel: this.translate.instant('NO'),
      accept: () => {
        this.deleteRoomEquipment(room);
      },
    });
  }

  deleteRoomEquipment(room: RoomDto) {
    this.roomEquipmentService
      .delete(room.id)
      .pipe(first())
      .subscribe(() => {
        this.notificationService.success('ROOM_EQUIPMENT_DELETED', 'venues');
        const index = this.room.availableEquipment.findIndex((r) => r.id === room.id);
        this.room.availableEquipment.splice(index, 1);
        this.roomUpdated.emit(this.room);
      });
  }
}
