import { Page, expect } from "@playwright/test";

export class Header {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}
