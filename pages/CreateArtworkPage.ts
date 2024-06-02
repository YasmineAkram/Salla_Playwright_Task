import { Page, expect } from "@playwright/test";
import { faker } from '@faker-js/faker';


export class CreateArtworkPage {
    private page: Page;

    //constructor which intiliaze the page
    constructor(page: Page) {
        this.page = page;
    }

    //Create ArtWork elements Locators 
    private get artworkNameTextField() {
        return this.page.getByPlaceholder('Text here...').first();
    }

    private get editionsField() {
        return this.page.getByRole('button', { name: 'Select Edition Type' });
    }

    private get editionslistOptions() {
        return this.page.getByRole('option', { name: 'Limited Edition' });
    }

    private get descriptionField() {
        return this.page.locator("//*[@id='editorblock']//*[@contenteditable]")
    }

    private get currentPriceField() {
        return this.page.locator("#current_price")
    }

    private get primarySaleCurrencyField() {
        return this.page.locator("#primary_sale_price")
    }

    private get dateAtPrimarySaleButton() {
        return this.page.getByRole('button', { name: 'Choose Date' }).first();
    }

    private get activeDatesIncalendarButton() {
        return this.page.locator("//table//button[not(@disabled) and not(contains(@class, 'dark'))]")
    }

    private get primarySaleBuyerField() {
        return this.page.locator('[id="headlessui-combobox-input-\\:r2\\:"]')
    }

    private get styleOfArtworkField() {
        return this.page.locator('div').filter({ hasText: /^Select Style$/ }).first()
    }

    private get styleOfArtworkCheckBoxList() {
        return this.page.getByRole('option').locator('label')

    }

    private get nftGenesisField() {
        return this.page.locator('div').filter({ hasText: /^Select NFT Genesis$/ }).first();
    }

    private get nftGenesisFieldRadioList() {
        return this.page.getByRole('option').locator('label')
    }

    private get supplyField() {
        return this.page.locator('div').filter({ hasText: /^Select Supply$/ }).first();
    }

    private get supplyFieldRadioList() {
        return this.page.getByRole('option').locator('label');
    }

    private get callaboratoeField() {
        return this.page.locator('#react-select-7-input')
    }

    private get callaboratoeList() {
        return this.page.getByRole('option')
    }

    private get ownedByField() {
        return this.page.locator('[id="headlessui-combobox-input-\\:r3\\:"]')
    }

    private get themarketplaceMintedOnfield() {
        return this.page.getByRole('button', { name: 'Select Marketplace' });
    }

    private get themarketplaceMintedOnfieldListOptions() {
        return this.page.getByRole('option').locator('div');
    }

    private get marketplaceURL() {
        return this.page.getByPlaceholder('Enter URL Link');
    }

    private get mintedOnDate() {
        return this.page.getByRole('button', { name: 'Choose Date' }).first();
    }

    private get createdOnDate() {
        return this.page.locator('div').filter({ hasText: /^Created On \*Choose Date$/ }).getByRole('button');
    }

    private get copyRightField() {
        return this.page.getByRole('button', { name: 'Select copyright' });
    }

    private get copyRightFieldListOption() {
        return this.page.getByRole('option', { name: 'COPY RIGHT 1 Lorem ipsum' });
    }

    private get artistLoyalityRadioButton() {
        return this.page.locator("//*[@name='artist_loyalty']")
    }

    private get physicalPiece() {
        return this.page.locator("//*[@name='physical_piece']")
    }

    private get publishButton() {
        return this.page.getByRole('button', { name: 'Publish' })
    }



    //Methods which interact with elements 
    async loadCreateArtworkPage(newArtWorkDir: string) {
        await this.page.goto(newArtWorkDir);
    }

    async fillAllArtWorkFields(testFilePath): Promise<string> {
        const fiveDigitsRandomNumber = faker.number.int({ max: 99999 });
        const newArtworkName = "Artwork#" + fiveDigitsRandomNumber;

        await this.artworkNameTextField.fill(newArtworkName);

        await this.editionsField.click();
        await this.editionslistOptions.click();

        await this.descriptionField.fill(faker.commerce.productName());

        await this.currentPriceField.fill(fiveDigitsRandomNumber.toString());

        await this.primarySaleCurrencyField.fill(fiveDigitsRandomNumber.toString());

        await this.dateAtPrimarySaleButton.click();
        await this.activeDatesIncalendarButton.nth(faker.number.int({ max: await this.activeDatesIncalendarButton.count() - 1 })).click()

        await this.primarySaleBuyerField.fill(faker.internet.email());

        await this.page.setInputFiles('input[type="file"]', testFilePath);
        await this.page.waitForSelector("//div[contains(@style,'.jpeg')]",{timeout: 60000 });

        await this.styleOfArtworkField.click();
        await this.styleOfArtworkCheckBoxList.nth(faker.number.int({ max: await this.styleOfArtworkCheckBoxList.count() - 1 })).click()

        await this.nftGenesisField.click();
        await this.nftGenesisFieldRadioList.nth(faker.number.int({ max: await this.nftGenesisFieldRadioList.count() - 1 })).click()

        await this.supplyField.click();
        await this.supplyFieldRadioList.nth(faker.number.int({ max: await this.supplyFieldRadioList.count() - 1 })).click()


        await this.callaboratoeField.fill(faker.internet.email());
        await this.callaboratoeList.click()

        await this.ownedByField.fill(faker.internet.email());

        await this.themarketplaceMintedOnfield.click()
        await this.themarketplaceMintedOnfieldListOptions.nth(faker.number.int({ max: await this.themarketplaceMintedOnfieldListOptions.count() - 1 })).click();
        await this.marketplaceURL.fill(faker.internet.url());

        await this.mintedOnDate.click();
        await this.activeDatesIncalendarButton.nth(faker.number.int({ max: await this.activeDatesIncalendarButton.count() - 1 })).click()

        await this.createdOnDate.click();
        await this.activeDatesIncalendarButton.nth(faker.number.int({ max: await this.activeDatesIncalendarButton.count() - 1 })).click()

        await this.copyRightField.click();
        await this.copyRightFieldListOption.click();

        await this.artistLoyalityRadioButton.nth(faker.number.int({ max: await this.artistLoyalityRadioButton.count() - 1 })).click()

        await this.physicalPiece.nth(faker.number.int({ max: await this.physicalPiece.count() - 1 })).click()

        await this.publishButton.click();
        await this.page.waitForSelector('role=link[name="Add Artwork"]',{timeout:60000});

        return newArtworkName;
    }


}