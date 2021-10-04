import { Injectable } from '@angular/core';
import { ThemeService } from 'ng2-charts';
import { ChartOptions } from 'chart.js';
import { THEME_NAME } from '../theme-switcher/theme-switcher.service';

@Injectable({
  providedIn: 'root',
})
export class ChartThemeService {


  constructor(private themeService: ThemeService) {
  }

  private _theme: THEME_NAME;

  public get theme() {
    return this._theme;
  }

  public set theme(theme: THEME_NAME) {
    this._theme = theme;
    let overrides: ChartOptions;
    if (this._theme === THEME_NAME.DARK) {
      overrides = {
        legend: {
          labels: { fontColor: 'white' },
        },
        scales: {
          xAxes: [{
            ticks: { fontColor: 'white' },
            gridLines: { color: 'rgba(255,255,255,0.1)' },
          }],
          yAxes: [{
            ticks: { fontColor: 'white' },
            gridLines: { color: 'rgba(255,255,255,0.1)' },
          }],

        },
      };
    } else {
      overrides = {};
    }
    overrides.elements = {
      arc: {},
    };
    this.themeService.setColorschemesOptions(overrides);
  }
}
