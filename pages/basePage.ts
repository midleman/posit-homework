import { Page } from "@playwright/test";
import { Header } from "./header";
import { SidePanel } from "./sidePanel";

export class BasePage {
  protected page: Page;
  header: Header;
  sidePanel: SidePanel;

  constructor(page: Page) {
    this.page = page;
    this.header = new Header(page);
    this.sidePanel = new SidePanel(page);
  }

  async navigate(url: string) {
    await this.page.goto(url);
  }
}
