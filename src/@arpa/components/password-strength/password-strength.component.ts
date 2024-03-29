import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'arpa-password-strength',
  templateUrl: './password-strength.component.html',
  styleUrls: ['./password-strength.component.scss'],
})
export class PasswordStrengthComponent implements OnInit, OnDestroy {
  @Input() control: AbstractControl;
  @Output() valid = new EventEmitter<boolean>();
  public bar0: string;
  public bar1: string;
  public bar2: string;
  public strength = 'weak';
  private validationPattern: RegExp;
  private validationPatternStrong: RegExp;
  private controlSubscription: Subscription;

  constructor(private configService: ConfigService) {
    this.validationPattern = new RegExp(configService.getEnv('validation').password);
    this.validationPatternStrong = new RegExp(configService.getEnv('validation').passwordStrong);
  }

  ngOnInit() {
    this.controlSubscription = this.control.valueChanges.subscribe((value: string) => this.setIndicator(value));
  }

  ngOnDestroy() {
    this.controlSubscription.unsubscribe();
  }

  setIndicator(value: string) {
    this.setColors(3, null);
    let idx = 0;

    if (6 <= value.length && value.length <= 32) {
      if (RegExp(/(?=.*\d)/).exec(value)) {
        idx++;
      }
      if (RegExp(/(?=.*[a-z])/).exec(value)) {
        idx++;
      }
      if (RegExp(/(?=.*[A-Z])/).exec(value)) {
        idx++;
      }
      if (RegExp(/(?=.*[^a-zA-Z0-9])/).exec(value)) {
        idx++;
      }
      if (idx > 3 && value.length > 11) {
        idx++;
      }
    }

    let barIndex = 0;
    if (idx < 4) {
      barIndex = 1;
      this.strength = 'weak';
      this.valid.emit(false);
    } else if (idx === 4) {
      barIndex = 2;
      this.strength = 'normal';
      this.valid.emit(true);
    } else if (idx > 4) {
      barIndex = 3;
      this.strength = 'strong';
      this.valid.emit(true);
    }
    this.setColors(barIndex, this.strength);
  }

  private setColors(index: number, strength: string | null) {
    for (let _n = 0; _n < index; _n++) {
      // @ts-ignore
      this[`bar${_n}`] = strength;
    }
  }
}
