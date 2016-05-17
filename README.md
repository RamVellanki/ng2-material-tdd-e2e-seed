# Intro
This repository is an example Angular2 application, which is built using Angular2 RC1, Material2 Alpha 4 with a basic setup for TDD and E2E Testing.

# Software Prerequisities
In order to run this seed, following software is required

* Git
* Node

# Getting Started

## Install Global Dependencies
`npm install -g protractor`
`npm install ts`

## Project Setup
* Clone the project
* Install dependencies using
`npm install`
* To start the development build run
`npm run dev`
* To start the production build run
`npm run prod`
* To run Unit Tests
`npm run test` or `karma start`
* To run E2E Tests
`npm run e2e` or `protractor protractor.conf.js`

## Additing additional material components
In order add additional material components, install them using
`npm install @angular2-material/component`
Modify `src/systemjs.config.js` and update `materialPackages` with the new component 
 