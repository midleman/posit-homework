import { Page, expect } from "@playwright/test";

export class LoginPage {
  private page: Page;
  private url = "https://login.posit.cloud/";
  private usernameInput = "input[name='email']";
  private passwordInput = "input[name='password']";

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto(this.url);
  }

  async login(
    // to-do: these shouldn't be hardcoded :D. there are much fanciers ways to do login
    username = "marie.defurio+1@gmail.com",
    password = "Test12345!",
    product = Product.PositCloud
  ) {
    await this.navigate();

    // submit email and password
    await this.page.fill(this.usernameInput, username);
    await this.page.getByRole("button", { name: "Continue" }).click();
    await this.page.fill(this.passwordInput, password);
    await this.page.getByRole("button", { name: "Log in" }).click();

    // choose product
    await this.page
      .getByRole("link", {
        name: product,
      })
      .click();

    // verify redirect
    // todo: based on selected Product verify redirect URL
    await expect(this.page.locator("#headerTitle")).toBeVisible();
  }
}

export enum Product {
  PositCloud = "Posit Cloud",
}
