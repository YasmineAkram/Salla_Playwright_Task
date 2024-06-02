import { Page, expect } from "@playwright/test";

export class ArtworkListPage {
  private page: Page;

  //constructor which intiliaze the page
  constructor(page: Page) {
    this.page = page;
  }

  private get searchBox() {
    return this.page.locator("//input[@id='searchbox']/../..")
  }

  private get searchBoxInputField() {
    return this.page.locator("//input[@id='searchbox']")
  }


  async checkNewArtworkelement(artworkName: string): Promise<string> {
    return await this.page.getByRole('heading', { name: artworkName }).innerText();
  }

  async openTheArtWorkPage(artworkName: string) {

    await this.page.getByRole('heading', { name: artworkName }).click()
    await this.page.waitForFunction(() => document.title === 'NFT Artwork Detail | Alt Art Community');
  }


}