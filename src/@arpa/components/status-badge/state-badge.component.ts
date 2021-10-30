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
          severity: 'warning',
          value: 'postponed',
        },
        {
          label: 'CANCELLED',
          severity: '',
          value: 'cancelled',
        },
        {
          label: 'UNKNOWN',
          severity: '',
          value: 'unknown',
        },
        {
          label: 'ARCHIVED',
          severity: '',
          value: 'archived',
        },
        {
          label: 'CONFIRMED',
          severity: 'success',
          value: 'confirmed',
        },
        {
          label: 'NOT_CONFIRMED',
          severity: 'warning',
          value: 'not_confirmed',
        },
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
