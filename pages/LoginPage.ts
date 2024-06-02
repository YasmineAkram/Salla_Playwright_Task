import { Page } from "@playwright/test";


export class LoginPage {
    private page: Page;

    //constructor which intiliaze the page
    constructor(page: Page) {
        this.page = page;
    }

    //Element Locators 
    private get emailAddress() {
        return this.page.getByPlaceholder('Enter Email Address');
    }

    private get password() {
        return this.page.getByPlaceholder('Enter Your Password');
    }
    private get loginButton() {
        return this.page.getByRole('button', { name: 'Login' });
    }

    private get loginSuccessfulButton() {
        return this.page.locator('#dropdownDefaultButton');
    }

    //Methods
    async loadLoginPage(loginDir: string) {
        await this.page.goto(loginDir);
    }

    async login(userEmail: string, userPass: string) {
        await this.emailAddress.fill(userEmail)
        await this.password.fill(userPass)
        await this.loginButton.click();
        await this.loginSuccessfulButton.waitFor({ state: "visible" })
    }
}