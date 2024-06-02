import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { CreateArtworkPage } from '../pages/CreateArtworkPage';
import { ArtworkListPage } from '../pages/ArtworkListPage';
import { ArtworkDetailsPage } from '../pages/ArtworkDetailsPage';


const credentials = JSON.parse(JSON.stringify(require("../utils/userCredentials.json")))
const urlDir = JSON.parse(JSON.stringify(require("../utils/urlPaths.json")))


//TestCase: Create art work and add review to it 
test("Check if Artwork added and displayed correctly on the art list", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const createArtworkPage = new CreateArtworkPage(page);
    const artworkListPage = new ArtworkListPage(page);
    const artDetailsPage = new ArtworkDetailsPage(page);

    await loginPage.loadLoginPage(urlDir.login);
    await loginPage.login(credentials.userEmail, credentials.userPassword)

    await createArtworkPage.loadCreateArtworkPage(urlDir.createArtwork);
    let newArtWorkName = await createArtworkPage.fillAllArtWorkFields(credentials.uploadedTestFilePath);

    let  resultText=await artworkListPage.checkNewArtworkelement(newArtWorkName);
    await expect(resultText).toBe(newArtWorkName);



    await artworkListPage.openTheArtWorkPage(newArtWorkName);
    let newReviewTitle=await artDetailsPage.addReview();
    let  resultReviewText=await artDetailsPage.checkIfReviewAdded(newReviewTitle);
    await expect(resultReviewText).toBe(newReviewTitle);

})

