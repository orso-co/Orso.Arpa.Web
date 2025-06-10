# Orso.Arpa.Web

Frontend Arpa 2.0

<img src="https://github.com/chipper-teapot/test/raw/main/Scanned_By_Snyk.png" alt="Scanned By Snyk Badge" width="25%" style="display: inline-block;">

## Project Structure

```
Orso.Arpa.Web.git
│   README.md
│   ... npm and angular configurations ...
│
└─── .github Githooks
└─── @arpa // Global components library
└─── src
    └─── @arpa
    └─── app
    └─── assets
    │   └─── common // Default fonts, icons, images
    │   └─── i18n
    │   │   └─── default // Global translations
    │   │       │   de.json
    │   │       │   <other_lang>.json
    │   │   └─── <feature1> // Feature 1 translations
    │   │       │   de.json
    │   │       │   <other_lang>.json
    │   │   └─── <feature2> // Feature 2 translations
    │   │       │   de.json
    │   │       │   <other_lang>.json
    │   │
    │   └─── organization  // org specific assets
    │
    └─── environments
    └─── testing
    └─── themes

```

## npm

version used for development: 6.14.11

## Installation Steps (in Console/Terminal)

1. git clone https://github.com/orso-co/Orso.Arpa.Web.git
2. npm i

## Run on local server (in Console/Terminal)

1. ng serve

## show local (in web browser)

Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## test to do before push

1. ng lint
2. ng test
