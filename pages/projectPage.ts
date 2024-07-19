import { Page, expect } from "@playwright/test";
import { BasePage } from "./basePage";

export class ProjectPage extends BasePage {
  private iframe = this.page.frameLocator('iframe[title="Untitled Project"]');

  super(page: Page) {
    this.page = page;
  }

  /**
   * Verifies message that project is deploying is visible
   */
  async verifyIsDeploying() {
    await expect(this.page.getByText("Deploying Project")).toBeVisible();
  }

  /**
   * Verifies all sections of the project have loaded as expected
   */
  async verifyHasDeployed() {
    await this.verifyHeader();
    await this.verifyIdeSection();
    await this.verifyDetailSection();
    await this.verifyFileSection();
  }

  /**
   * Verifies the default header of the project displays
   */
  async verifyHeader() {
    await expect(this.page.getByText("Click to name your project")).toBeVisible(
      {
        timeout: 45000,
      }
    );
  }

  /**
   * Verifies the IDE frame of the project displays
   */
  async verifyIdeSection() {
    await expect(this.iframe.getByLabel("ConsoleTabSet")).toBeVisible({
      timeout: 30000,
    });
    await expect(this.iframe.getByText("Terminal")).toBeVisible();
    await expect(this.iframe.getByText("Background Jobs")).toBeVisible();
  }

  /**
   * Verifies the detail section of the project displays
   */
  async verifyDetailSection() {
    // to-do: implement
  }

  /**
   * Verifies the file section of the project displays
   */
  async verifyFileSection() {
    // to-do: implement
  }
}
