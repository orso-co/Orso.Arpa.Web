import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { VenueService, NotificationsService } from '@arpa/services';
import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { first, map } from 'rxjs/operators';
import { VenueDto } from 'src/@arpa/models/venueDto';

@Component({
  selector: 'arpa-venues',
  templateUrl: './venues.component.html',
  styleUrls: ['./venues.component.scss'],
})
export class VenuesComponent implements OnInit {
  venues: any[] = [];
  selectedVenue: any | undefined;
  formGroup: UntypedFormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    formBuilder: UntypedFormBuilder,
    private venueService: VenueService,
    private notificationService: NotificationsService,
    private confirmationService: ConfirmationService,
    private translate: TranslateService
  ) {
    this.formGroup = formBuilder.group({
      name: [null, [Validators.required, Validators.maxLength(50)]],
      description: [null, [Validators.maxLength(255)]],
      address1: [null, [Validators.maxLength(100)]],
      address2: [null, [Validators.maxLength(100)]],
      zip: [null, [Validators.required, Validators.maxLength(20)]],
      city: [null, [Validators.required, Validators.maxLength(100)]],
      urbanDistrict: [null, []],
      country: [null, [Validators.required, Validators.maxLength(100)]],
      state: [null, [Validators.maxLength(100)]],
      addressCommentInner: [null, [Validators.maxLength(500)]],
    });
  }

  ngOnInit() {
    this.activatedRoute.data
      .pipe(
        first(),
        map((data) => data.venues),
        map((venues) => venues.map((venue: VenueDto) => this.addLabelToVenue(venue)))
      )
      .subscribe((venues) => (this.venues = venues));
  }

  onSubmit() {
    if (this.formGroup.invalid) {
      return;
    }
    const value = { ...this.formGroup.value };
    if (this.selectedVenue) {
      const id = this.selectedVenue.id!;
      this.venueService
        .update(id, value)
        .pipe(first())
        .subscribe(() => {
          this.notificationService.success('VENUE_UPDATED', 'venues');
          const index = this.venues.findIndex((venue) => venue.id === id);
          this.venues[index] = { ...this.selectedVenue, ...this.addLabelToVenue(value) };
          this.resetForm();
        });
    } else {
      this.venueService
        .create(value)
        .pipe(first())
        .subscribe((result) => {
          this.notificationService.success('VENUE_CREATED', 'venues');
          this.resetForm();
          this.venues = [...this.venues, { ...this.addLabelToVenue(result) }];
        });
    }
  }

  delete(event: any) {
    this.confirmationService.confirm({
      target: event.target || undefined,
      message: this.translate.instant('venues.ARE_YOU_SURE'),
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: this.translate.instant('YES'),
      rejectLabel: this.translate.instant('NO'),
      accept: () => {
        this.deleteVenue();
      },
    });
  }

  deleteVenue() {
    this.venueService
      .delete(this.selectedVenue.id)
      .pipe(first())
      .subscribe(() => {
        this.notificationService.success('VENUE_DELETED', 'venues');
        const index = this.venues.findIndex((venue) => venue.id === this.selectedVenue.id);
        this.venues.splice(index, 1);
        this.resetForm();
      });
  }

  onSelectionChange(event: { value: any }) {
    this.formGroup.patchValue({
      ...event.value,
      address1: event.value.address?.address1,
      address2: event.value.address?.address2,
      zip: event.value.address?.zip,
      city: event.value.address?.city,
      country: event.value.address?.country,
      urbanDistrict: event.value.address?.urbanDistrict,
      state: event.value.address?.state,
      addressCommentInner: event.value.address?.commentInner,
    });
  }

  resetForm() {
    this.formGroup.reset({});
    this.selectedVenue = undefined;
  }

  private addLabelToVenue(venue: VenueDto): any {
    if (!venue) {
      return null;
    }
    return { ...venue, label: `${venue.name}|${venue.address?.zip}|${venue.address?.city}|${venue.address?.country}` };
  }
}
