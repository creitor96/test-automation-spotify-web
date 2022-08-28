import { expect, Locator, Page } from '@playwright/test';

export class MainPage {
    readonly page: Page;
    readonly acceptCookiesButton: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.acceptCookiesButton = page.locator('text=Accept cookies');
    }

    async goToMainPage(){
        await this.page.goto('https://open.spotify.com/');
    }

    async acceptCookies() {
        await this.page.waitForLoadState('domcontentloaded');
        await this.acceptCookiesButton.click();
    }
}