/// <reference path="../typings/main/ambient/jasmine/index.d.ts" />
/// <reference path="../typings/main/ambient/selenium-webdriver/index.d.ts" />
/// <reference path="../typings/main/ambient/angular-protractor/index.d.ts" />

import { AppPage } from './app.page';

describe('Angular2 Material App', function() {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  })

  it('should have title Angular2 Material App', () => {
    page.navigateTo();
    expect(page.getTitle()).toEqual('Angular2 Material App');
  });
});
