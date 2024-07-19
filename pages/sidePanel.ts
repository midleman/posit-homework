import { Page, expect } from "@playwright/test";
import { Chance } from "chance";

export class SidePanel {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
    // to-do: consider extracting and initializing locators
  }

  /**
   * Create a new space
   *
   * @param name - name of the space
   */
  async createNewSpace(name = new Chance().word({ length: 5 })) {
    await this.page.getByRole("button", { name: "New Space" }).click();
    await expect(this.page.locator("#NEW_SPACE_DIALOG-purpose")).toBeVisible();
    await this.page.getByRole("textbox", { name: "Name" }).fill(name);
    await this.page.getByRole("button", { name: "Create" }).click();
    await expect(
      this.page.getByRole("link", { name: `${name} Marie Idleman` })
    ).toBeVisible({ timeout: 15000 });
  }

  /**
   * Get all spaces listed in side panel EXCEPT "Your Workspace"
   *
   * @returns list of spaces
   */
  async getAllSpaces(): Promise<string[]> {
    const allSpaces = await this.page
      .locator('[aria-label="Space Menu"] ul li')
      .allTextContents();
    const mySpaces = allSpaces
      .filter((space) => space !== "Your Workspace" && space !== "New Space")
      .map((space) =>
        // to-do: dynamically get the user's name and replace it
        space.endsWith("Marie Idleman")
          ? space.replace("Marie Idleman", "")
          : space
      );
    return mySpaces;
  }

  /**
   * Delete all spaces listed in side panel (excludes "Your Workspace")
   */
  async deleteAllSpaces() {
    const spaces = await this.getAllSpaces();
    for (const space of spaces) {
      await this.deleteSpace(space);
    }
  }

  /**
   * Navigates to the space and deletes it via More Actions menu
   *
   * @param name - name of the space to delete
   */
  async deleteSpace(name: string) {
    await this.navigateToLink(name);
    await this.page.getByLabel(`${name}: More Actions`).click();
    await this.page.getByRole("button", { name: "Delete Space" }).click();
    await this.page
      .getByLabel("Name of space to delete")
      .fill(`Delete ${name}`);
    await this.page.getByRole("button", { name: "Delete" }).click();
    await expect(
      this.page.getByText(/Success! The space .* has been deleted/)
    ).toBeVisible();
  }

  async navigateToLink(name: string) {
    await this.page.getByRole("link", { name: name }).click();
  }
}
