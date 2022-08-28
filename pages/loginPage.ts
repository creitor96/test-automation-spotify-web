import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly usernameTextbox: Locator;
    readonly passwordTextbox: Locator;
    readonly submitButton: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.usernameTextbox = page.locator('[data-testid="login-username"]');
        this.passwordTextbox = page.locator('[data-testid="login-password"]');
        this.submitButton = page.locator('[data-testid="login-button"]');
    }

    async goToLoginPage(){
        await this.page.goto('https://accounts.spotify.com/login?continue=https%3A%2F%2Fopen.spotify.com%2F')
    }

    async enterEmail(email: string) {
        await this.usernameTextbox.fill(email);
    }

    async enterPassword(password: string) {
        await this.passwordTextbox.fill(password);
    }

    async submit() {
        await this.submitButton.click();
    }

    async login(email: string, password: string){
        await this.goToLoginPage();
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.submit();
    }
}