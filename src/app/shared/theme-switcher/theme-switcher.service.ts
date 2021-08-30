import { Injectable } from '@angular/core';

export enum THEME_NAME {
  DARK = 'arpa-dark',
  LIGHT = 'arpa-light',
}

@Injectable({
  providedIn: 'root',
})
export class ThemeSwitcherService {

  public currentTheme: string;

  constructor() {
    const storedTheme = localStorage.getItem('theme');
    if (window.matchMedia && !storedTheme) {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        this.currentTheme = THEME_NAME.DARK;
      } else {
        this.currentTheme = THEME_NAME.LIGHT;
      }
    } else {
      this.currentTheme = storedTheme || THEME_NAME.DARK;
    }
  }

  setTheme(themeName: string = this.currentTheme) {
    getBody().classList.add(themeName);
    if (themeName !== this.currentTheme) {
      getBody().classList.remove(this.currentTheme);
    }
    localStorage.setItem('theme', themeName);
    this.setStyle(
      'theme',
      `${themeName}.css`,
    );
    this.currentTheme = themeName;
  }

  /**
   * Set the stylesheet with the specified key.
   */
  setStyle(key: string, href: string) {
    getLinkElementForKey(key).setAttribute('href', href);
  }
}

function getLinkElementForKey(key: string) {
  return getExistingLinkElementByKey(key) || createLinkElementWithKey(key);
}

function getExistingLinkElementByKey(key: string) {
  return document.head.querySelector(
    `link[rel="stylesheet"].${getClassNameForKey(key)}`,
  );
}

function getBody() {
  return document.body;
}

function createLinkElementWithKey(key: string) {
  const linkEl = document.createElement('link');
  linkEl.setAttribute('rel', 'stylesheet');
  linkEl.classList.add(getClassNameForKey(key));
  document.head.appendChild(linkEl);
  return linkEl;
}

function getClassNameForKey(key: string) {
  return `arpa-${key}`;
}
