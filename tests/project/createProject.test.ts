import { test } from "@playwright/test";
import { LoginPage } from "../../pages/loginPage";
import { SidePanel } from "../../pages/sidePanel";
import { SpacePage } from "../../pages/spacePage";
import { ProjectPage } from "../../pages/projectPage";

test.describe("modify project", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const sidePanel = new SidePanel(page);

    await loginPage.login();
    await sidePanel.deleteAllSpaces();
  });

  test(
    "should be able to create a new project in a new space",
    {
      tag: ["@smoke"],
    },
    async ({ page }) => {
      // create a new project within a new space
      const sidePanel = new SidePanel(page);
      await sidePanel.createNewSpace();
      const space = new SpacePage(page);
      await space.createNewProject();

      // verify the project has successfully deployed
      const project = new ProjectPage(page);
      await project.verifyIsDeploying();
      await project.verifyHasDeployed();
    }
  );
});
