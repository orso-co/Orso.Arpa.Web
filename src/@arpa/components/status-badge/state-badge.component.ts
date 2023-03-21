import { Component, Input, OnInit } from '@angular/core';

export interface StateItem {
  label: string,
  severity: string,
  value: string,
}

@Component({
  selector: 'arpa-state-badge',
  templateUrl: './state-badge.component.html',
  styleUrls: ['./state-badge.component.scss'],
})
export class StateBadgeComponent implements OnInit {

  @Input()
  value: string;

  @Input()
  stateMap: StateItem[] | undefined;

  constructor() {
  }

  get label(): string {
    return this.getStateItem().label;
  };

  get severity(): string {
    return this.getStateItem().severity;
  };

  ngOnInit() {
    if (!this.stateMap) {
      this.stateMap = [
        {
          label: 'ACTIVE',
          severity: 'success',
          value: 'active',
        },
        {
          label: 'PENDING',
          severity: 'info',
          value: 'pending',
        },
        {
          label: 'POSTPONED',
          severity: 'danger',
          value: 'postponed',
        },
        {
          label: 'CANCELLED',
          severity: 'warning',
          value: 'cancelled',
        },
        {
          label: 'UNKNOWN',
          severity: 'info',
          value: 'unknown',
        },
        {
          label: 'ARCHIVED',
          severity: 'info',
          value: 'archived',
        },
        {
          label:'CONFIRMED',
          severity: 'success',
          value: 'confirmed',
        },
        {
          label: 'NOT_CONFIRMED',
          severity: 'warning',
          value: 'not_confirmed',
        },
        {
          label: 'CONCERT',
          severity: 'success',
          value: 'concert',
        },
        {
          label: 'CONCERT_TOUR',
          severity: 'warning',
          value: 'concert_tour',
        },
        {
          label: 'CANDIDATE',
          severity: 'danger',
          value: 'candidate',
        },
        {
          label: 'ACCEPTANCE',
          severity: 'success',
          value: 'acceptance',
        },
        {
          label: 'REFUSAL',
          severity: 'danger',
          value: 'refusal',
        },
        {
          label: 'SCHEDULED',
          severity: 'warning',
          value: 'scheduled',
        },
        {
          label:'REHEARSALS_ONLY',
          severity: 'info',
          value: 'rehearsals_only'
        }
      ];
    }
  }

  private getStateItem(): StateItem {
    const state = this.stateMap ? this.stateMap.find(item => item.value === this.value) : undefined;
    return state || {
      label: this.value,
      severity: 'default',
      value: 'default',
    };
  }

}
