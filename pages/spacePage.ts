import { Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class SpacePage extends BasePage {
  super(page: Page) {
    this.page = page;
  }

  /**
   * Selects the "New Project" button and then the "New RStudio Project" button
   */
  async createNewProject() {
    await this.page.getByRole("button", { name: "New Project" }).click();
    await this.page
      .getByRole("button", { name: "New RStudio Project" })
      .click();
  }
}
