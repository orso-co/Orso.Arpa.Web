import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { RoomDto, RoomSectionCreateBodyDto, RoomSectionDto, RoomSectionModifyBodyDto } from '@arpa/models';
import { NotificationsService, RoomSectionService, RoomService, SectionService } from '@arpa/services';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, SelectItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'arpa-room-dialog-section',
  templateUrl: './room-dialog-section.component.html',
  styleUrls: ['./room-dialog-section.component.scss'],
})
export class RoomDialogSectionComponent implements OnInit {
  @Input()
  room: RoomDto;
  formGroup: UntypedFormGroup;
  selectedSection: RoomSectionDto | undefined;
  sectionOptions$: Observable<SelectItem[]>;
  @Output()
  roomUpdated: EventEmitter<RoomDto> = new EventEmitter<RoomDto>();

  constructor(
    formBuilder: UntypedFormBuilder,
    private roomService: RoomService,
    private roomSectionService: RoomSectionService,
    private confirmationService: ConfirmationService,
    private translate: TranslateService,
    private notificationService: NotificationsService,
    private sectionService: SectionService
  ) {
    this.formGroup = formBuilder.group({
      instrumentId: [null],
      quantity: [null, [Validators.min(1)]],
      description: [null, [Validators.maxLength(500)]],
    });
  }

  ngOnInit() {
    const sections$ = this.sectionService.sectionsLoaded ? this.sectionService.sections$ : this.sectionService.load();
    this.sectionOptions$ = sections$.pipe(map((sections) => sections.map((section) => ({ label: section.name, value: section.id }))));
  }

  addRoomSection() {
    this.onSelectedSectionChange(undefined);
  }

  editRoomSection(section: RoomSectionDto) {
    this.onSelectedSectionChange(section);
  }

  onSelectedSectionChange(section: RoomSectionDto | undefined) {
    this.selectedSection = section;
    if (section) {
      this.formGroup.patchValue({
        instrumentId: section.instrumentId,
        quantity: section.quantity,
        description: section.description,
      });
    } else {
      this.formGroup.reset();
    }
  }

  onSubmit() {
    if (this.formGroup.invalid) {
      return;
    }
    const value = { ...this.formGroup.value } as RoomSectionCreateBodyDto | RoomSectionModifyBodyDto;
    if (this.selectedSection) {
      this.roomSectionService
        .update(this.selectedSection.id, value)
        .pipe(switchMap(() => this.roomSectionService.loadById(this.selectedSection!.id)))
        .subscribe((section) => {
          const index = this.room.availableInstruments.findIndex((s) => s.id == section.id) ?? -1;
          if (~index) {
            this.room.availableInstruments[index] = section;
            this.roomUpdated.emit(this.room);
          }
        });
    } else {
      this.roomService.addRoomSection(this.room.id, value as RoomSectionCreateBodyDto).subscribe((room) => {
        this.room.availableInstruments = [...this.room.availableInstruments, room];
        this.roomUpdated.emit(this.room);
      });
    }
  }

  onCancel() {
    this.onSelectedSectionChange(undefined);
  }

  confirmRoomSectionDeletion(event: Event, section: RoomSectionDto) {
    this.confirmationService.confirm({
      target: event.target ?? undefined,
      message: this.translate.instant('venues.ARE_YOU_SURE'),
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: this.translate.instant('YES'),
      rejectLabel: this.translate.instant('NO'),
      accept: () => {
        this.deleteRoomSection(section);
      },
    });
  }

  deleteRoomSection(section: RoomSectionDto) {
    this.roomSectionService
      .delete(section.id)
      .pipe(first())
      .subscribe(() => {
        this.notificationService.success('ROOM_SECTION_DELETED', 'venues');
        const index = this.room.availableInstruments.findIndex((r) => r.id === section.id);
        this.room.availableInstruments.splice(index, 1);
        this.roomUpdated.emit(this.room);
      });
  }
}
