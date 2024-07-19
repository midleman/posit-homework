import { test } from "@playwright/test";
import { LoginPage } from "../../pages/loginPage";
import { SidePanel } from "../../pages/sidePanel";

test.describe.skip("project", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const sidePanel = new SidePanel(page);

    await loginPage.login();
    await sidePanel.deleteAllSpaces();
  });

  test("should be able to edit a project", async ({ page }) => {
    // to-do: implement
  });
});
