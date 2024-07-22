import { Locator, Page, expect } from "@playwright/test";

export class LoginPage {
  private page: Page;
  private url = "https://login.posit.cloud/";
  private usernameInput: Locator;
  private passwordInput: Locator;
  private continueButton: Locator;
  private loginButton: Locator;
  private productLink: Locator;
  private headerTitle: Locator;

  constructor(page: Page, product: Product = Product.PositCloud) {
    this.page = page;
    this.usernameInput = page.locator("input[name='email']");
    this.passwordInput = page.locator("input[name='password']");
    this.continueButton = page.getByRole("button", { name: "Continue" });
    this.loginButton = page.getByRole("button", { name: "Log in" });
    this.productLink = page.getByRole("link", { name: product });
    this.headerTitle = page.locator("#headerTitle");
  }

  async navigate() {
    await this.page.goto(this.url);
  }

  async login(
    // to-do: these shouldn't be hardcoded :D. there are much fanciers ways to do login
    username = "marie.defurio+1@gmail.com",
    password = "Test12345!"
  ) {
    await this.navigate();

    // submit email and password
    await this.usernameInput.fill(username);
    await this.continueButton.click();
    await this.passwordInput.fill(password);
    await this.loginButton.click();

    // choose product
    await this.productLink.click();

    // verify redirect
    // todo: based on selected Product verify redirect URL
    await expect(this.headerTitle).toBeVisible();
  }
}

export enum Product {
  PositCloud = "Posit Cloud",
}
