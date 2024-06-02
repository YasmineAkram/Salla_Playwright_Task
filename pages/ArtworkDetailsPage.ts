import { faker } from "@faker-js/faker";
import { Page } from "@playwright/test";

export class ArtworkDetailsPage{
    private page: Page;

    //constructor which intiliaze the page
    constructor(page: Page) {
        this.page = page;
    }

    private get reviewsTab(){
        return this.page.getByRole('tab', { name: 'Reviews' });
    }

    private get reviewTitle(){
        return this.page.getByPlaceholder('Title');
    }
    private get reviewDesc(){
        return this.page.getByPlaceholder('Review Detail');
    }

    private get reviewSubmit(){
        return this.page.getByLabel('Reviews').getByRole('button');
    }

    private get addedReviewTitle(){
        return this.page.locator("h5:has-text('')")
    }


    async addReview(){
        const reviewTitle="Review:#"+ faker.number.int({ max: 99999 });
        await this.reviewsTab.click();
        await this.reviewTitle.fill(reviewTitle)
        await this.reviewDesc.fill("Review Desc:# "+ reviewTitle);
        await this.reviewSubmit.click()
        await this.page.getByRole('heading', { name: reviewTitle });
        return reviewTitle;
    }

    async checkIfReviewAdded(reviewTitle: string): Promise<string> {
        return await this.page.getByRole('heading', { name: reviewTitle }).innerText();
    }
}