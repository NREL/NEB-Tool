# NEB Tool

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.8.

## Dependencies

- We are using NodeJS v 20.9 LTS [nodejs.org](https://nodejs.org/en/download)

- To install all required packages: `npm install`

## For Developers

- When developing in electron window use `npm run build-watch` and a re-build will trigger on save of changes

- To start the electron app (kill and restart app after rebuild on save): `npm run electron`

- When developing for web run `npm run start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

- Built artifacts will be stored in the `/dist` directory.

- General build for electron `npm run build`

- Production Web Build `npm run build-prod`

- Production Electron Build `npm run build-prod-electron`

## Native Installers

- `npm run dist` will create electron installers for your operating system

- Installer will be created in an `/output/neb-tool/` directory in the **parent** directory you run the command in


## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
