import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { ProjectDto } from '../../../../@arpa/models/projectDto';
import { VenueDto } from '../../../../@arpa/models/venueDto';
import { SelectItem } from 'primeng/api';
import { map } from 'rxjs/operators';

@Component({
  selector: 'arpa-project-layout',
  templateUrl: './project-layout.component.html',
  styleUrls: ['./project-layout.component.scss'],
})
export class ProjectLayoutComponent {
  project: ProjectDto = this.config.data.project;
  venues: Observable<SelectItem[]> = this.config.data.venues.pipe(
    map((venues: VenueDto[]) =>
      venues.map(
        (v) =>
          ({
            label: this.getAddress(v),
            value: v.id,
          } as SelectItem)
      )
    )
  );
  type: Observable<SelectItem[]> = this.config.data.type;
  genre: Observable<SelectItem[]> = this.config.data.genre;
  state: Observable<SelectItem[]> = this.config.data.state;
  public index = 0;

  constructor(public config: DynamicDialogConfig) {}

  private getAddress(venue: VenueDto): string {
    if (venue.address) {
      const { city, urbanDistrict } = venue.address;
      const comb = `${city ? city : ''}${city && urbanDistrict ? ' ' : ''}${urbanDistrict ? urbanDistrict : ''}`;
      return `${comb}${comb ? ' | ' : ''}${venue.name}`;
    } else {
      return venue?.name || '';
    }
  }
}
