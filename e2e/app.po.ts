import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
  
  sendKeys(model, value) {
    return element(by.model(model)).clear().sendKeys(value);
  }
}
