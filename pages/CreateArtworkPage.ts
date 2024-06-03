import { Page, expect } from "@playwright/test";
import { faker } from '@faker-js/faker';
import { BasicPage } from "./BasicPage";


export class CreateArtworkPage extends BasicPage {
    private page: Page;

    //constructor which intiliaze the page
    constructor(page: Page) {
        super()
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
        return this.page.locator(".ce-paragraph")
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
        return this.page.getByPlaceholder('Username or Email address').first()
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
        return this.page.getByPlaceholder('Username or Email address').nth(1);
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
        let randomFiveDigitsNumber = faker.number.int({ max: 99999 });
        let randomEmail=faker.internet.email();
        let randomDescriptionValue: string = faker.commerce.productName();
        let randomnArtworkName = "Artwork#" + randomFiveDigitsNumber;
    
        await this.artworkNameTextField.waitFor({ state: 'visible' });
        await this.fillInputElementWithRetries(this.artworkNameTextField, randomnArtworkName)

        await this.selectFixedmOptionFromList(this.editionsField,this.editionslistOptions);
       
        await this.fillElementWithRetries(this.descriptionField, randomDescriptionValue);

        await this.fillInputElementWithRetries(this.currentPriceField, randomFiveDigitsNumber.toString());

        await this.fillInputElementWithRetries(this.primarySaleCurrencyField, randomFiveDigitsNumber.toString());

        await this.selectRandomOptionFromList(this.dateAtPrimarySaleButton,this.activeDatesIncalendarButton)

        await this.fillInputElementWithRetries(this.primarySaleBuyerField,randomEmail);

        await this.page.setInputFiles('input[type="file"]', testFilePath);
        await this.page.waitForSelector("//div[contains(@style,'.jpeg')]", { timeout: 100000 });

        await this.selectRandomOptionFromList(this.styleOfArtworkField,this.styleOfArtworkCheckBoxList)
    
        await this.selectRandomOptionFromList(this.nftGenesisField,this.nftGenesisFieldRadioList)
      
        await this.selectRandomOptionFromList(this.supplyField,this.supplyFieldRadioList)
       
        await this.fillInputElementWithRetries(this.callaboratoeField, randomFiveDigitsNumber.toString());
        await this.callaboratoeList.click()

        await this.fillInputElementWithRetries(this.ownedByField, randomEmail);

        await this.selectRandomOptionFromList(this.themarketplaceMintedOnfield,this.themarketplaceMintedOnfieldListOptions);
       
        await this.fillInputElementWithRetries(this.marketplaceURL,faker.internet.url());
    
        await this.selectRandomOptionFromList(this.mintedOnDate, this.activeDatesIncalendarButton)
        
        await this.selectRandomOptionFromList(this.createdOnDate,this.activeDatesIncalendarButton)
    
        await this.selectFixedmOptionFromList(this.copyRightField,this.copyRightFieldListOption)

        await this.artistLoyalityRadioButton.nth(faker.number.int({ max: await this.artistLoyalityRadioButton.count() - 1 })).click()

        await this.physicalPiece.nth(faker.number.int({ max: await this.physicalPiece.count() - 1 })).click()

        await this.publishButton.click();
        await this.page.waitForSelector('role=link[name="Add Artwork"]');

        return randomnArtworkName;
    }


}