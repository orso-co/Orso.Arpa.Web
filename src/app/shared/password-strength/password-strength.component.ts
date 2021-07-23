import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ConfigService } from '../../core/services/config.service';

@Component({
  selector: 'arpa-password-strength',
  templateUrl: './password-strength.component.html',
  styleUrls: ['./password-strength.component.scss']
})
export class PasswordStrengthComponent implements OnInit, OnDestroy {

  @Input() control: AbstractControl;

  public bar0: string;
  public bar1: string;
  public bar2: string;
  public strength = 'weak';
  private validationPattern: RegExp;
  private validationPatternStrong: RegExp;
  private controlSubscription: Subscription;

  constructor(
    private configService: ConfigService
  ) {
    this.validationPattern = new RegExp(configService.getEnv('validation').password);
    this.validationPatternStrong = new RegExp(configService.getEnv('validation').passwordStrong);
  }

  ngOnInit() {
    this.controlSubscription = this.control.valueChanges.subscribe((value:string) => this.setIndicator(value));
  }

  ngOnDestroy() {
    this.controlSubscription.unsubscribe();
  }

  setIndicator(value:string){
    this.setColors(3, null);
    let idx = 0;

    if( 6 <= value.length && value.length <= 32  )
    {
      if( /.*\d.*/.test(value) ) {
        idx++;
      }
      if( /.*[a-z].*/.test(value) ) {
        idx++;
      }
      if( /.*[A-Z].*/.test(value) ) {
        idx++;
      }
      if(/.*[*.!@#$%^&(){}[]:";'<>,.?~`_+-=|].*/.test(value)) {
        idx++;
      }
      if(idx > 2 && value.length > 10) {
        idx++;
      }
    }

    let barIndex = 0;
    if(idx <= 3 ) {
      barIndex = 1;
      this.strength = 'weak';
    } else if (idx <= 4) {
      barIndex = 2;
      this.strength = 'normal';
    } else if (idx > 4) {
      barIndex = 3;
      this.strength = 'strong';
    }
    this.setColors(barIndex, this.strength);
  }

  private setColors(index:number, strength:string | null){
    for (let _n = 0; _n < index; _n++) {
      // @ts-ignore
      this[`bar${_n}`] = strength;
    }
  }

}
