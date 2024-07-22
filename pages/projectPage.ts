import { Page, expect, Locator, FrameLocator } from "@playwright/test";
import { BasePage } from "./basePage";

export class ProjectPage extends BasePage {
  private iframe: FrameLocator;
  private deployingProjectText: Locator;
  private defaultProjectText: Locator;
  private consoleTab: Locator;
  private terminalText: Locator;
  private backgroundJobsText: Locator;

  constructor(page: Page) {
    super(page);
    this.iframe = page.frameLocator('iframe[title="Untitled Project"]');
    this.deployingProjectText = page.getByText("Deploying Project");
    this.defaultProjectText = page.getByText("Click to name your project");
    this.consoleTab = this.iframe.getByLabel("ConsoleTabSet");
    this.terminalText = this.iframe.getByText("Terminal");
    this.backgroundJobsText = this.iframe.getByText("Background Jobs");
  }

  /**
   * Verifies message that project is deploying is visible
   */
  async verifyIsDeploying() {
    await expect(this.deployingProjectText).toBeVisible();
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
    await expect(this.defaultProjectText).toBeVisible({
      timeout: 45000,
    });
  }

  /**
   * Verifies the IDE frame of the project displays
   */
  async verifyIdeSection() {
    await expect(this.consoleTab).toBeVisible({
      timeout: 30000,
    });
    await expect(this.terminalText).toBeVisible();
    await expect(this.backgroundJobsText).toBeVisible();
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
