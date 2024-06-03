import { faker } from "@faker-js/faker";
import { Locator, Page } from "@playwright/test";

export class BasicPage {


    async fillElementWithRetries(elementToFill: Locator, textToFill: string) {
        let elementText;
        let numberOfRetries: number = 0;

        await elementToFill.fill(textToFill);
        elementText = await elementToFill.textContent();

        while (elementText != textToFill && numberOfRetries < 6) {
            await elementToFill.fill(textToFill);
            elementText = await elementToFill.textContent();
            numberOfRetries += 1;
        }
    }

    async fillInputElementWithRetries(elementToFill: Locator, textToFill: string) {
        let elementText;
        let numberOfRetries: number = 0;

        await elementToFill.fill(textToFill);
        elementText = await elementToFill.inputValue();

        while (elementText != textToFill && numberOfRetries < 6) {
            await elementToFill.fill(textToFill);
            elementText = await elementToFill.inputValue();
            numberOfRetries += 1;
        }
    }


    async selectFixedmOptionFromList(listElement: Locator, fixedOptionToclick: Locator) {
        await listElement.click();
        await fixedOptionToclick.waitFor({ state: 'visible' });
        await fixedOptionToclick.click();
    }

    async selectRandomOptionFromList(listElement: Locator, fixedOptionToclick: Locator) {
        let randomListOptionCount;
        await listElement.click();
        await fixedOptionToclick.first().waitFor({ state: 'visible' });
        randomListOptionCount = await fixedOptionToclick.count() - 1
        await fixedOptionToclick.nth(faker.number.int({ max: randomListOptionCount })).click();
    }

}