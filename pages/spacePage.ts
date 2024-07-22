import { Page, Locator } from "@playwright/test";
import { BasePage } from "./basePage";

export class SpacePage extends BasePage {
  private newProjectButton: Locator;
  private newRStudioProjectButton: Locator;

  constructor(page: Page) {
    super(page);
    this.newProjectButton = page.getByRole("button", { name: "New Project" });
    this.newRStudioProjectButton = page.getByRole("button", {
      name: "New RStudio Project",
    });
  }

  /**
   * Selects the "New Project" button and then the "New RStudio Project" button
   */
  async createNewProject() {
    await this.newProjectButton.click();
    await this.newRStudioProjectButton.click();
  }
}
