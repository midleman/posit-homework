import { Page, expect, Locator } from "@playwright/test";
import { Chance } from "chance";

export class SidePanel {
  private page: Page;
  private newSpaceButton: Locator;
  private newSpaceDialog: Locator;
  private nameTextbox: Locator;
  private createButton: Locator;
  private spaceMenu: Locator;
  private moreActionsButton: Locator;
  private deleteSpaceButton: Locator;
  private nameOfSpaceToDeleteTextbox: Locator;
  private confirmDeleteButton: Locator;
  private spaceDeletedSuccessMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newSpaceButton = page.getByRole("button", { name: "New Space" });
    this.newSpaceDialog = page.locator("#NEW_SPACE_DIALOG-purpose");
    this.nameTextbox = page.getByRole("textbox", { name: "Name" });
    this.createButton = page.getByRole("button", { name: "Create" });
    this.spaceMenu = page.locator('[aria-label="Space Menu"] ul li');
    this.moreActionsButton = page.getByLabel("More Actions");
    this.deleteSpaceButton = page.getByRole("button", { name: "Delete Space" });
    this.nameOfSpaceToDeleteTextbox = page.getByLabel(
      "Name of space to delete"
    );
    this.confirmDeleteButton = page.getByRole("button", { name: "Delete" });
    this.spaceDeletedSuccessMessage = page.getByText(
      /Success! The space .* has been deleted/
    );
  }

  /**
   * Create a new space
   *
   * @param name - name of the space
   */
  async createNewSpace(name = new Chance().word({ length: 5 })) {
    await this.newSpaceButton.click();
    await expect(this.newSpaceDialog).toBeVisible();
    await this.nameTextbox.fill(name);
    await this.createButton.click();
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
    const allSpaces = await this.spaceMenu.allTextContents();
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
    await this.moreActionsButton.click();
    await this.deleteSpaceButton.click();
    await this.nameOfSpaceToDeleteTextbox.fill(`Delete ${name}`);
    await this.confirmDeleteButton.click();
    await expect(this.spaceDeletedSuccessMessage).toBeVisible();
  }

  async navigateToLink(name: string) {
    await this.page.getByRole("link", { name: name }).click();
  }
}
