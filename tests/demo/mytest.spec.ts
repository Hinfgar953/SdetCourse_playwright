import { test, expect } from "@playwright/test";

test("Should load homepage with correct tittle", async ({ page }) => {
  //1. Go to home page
  await page.goto("https://sauce-demo.myshopify.com/");
  //2.Tittle is correct
  await expect(page).toHaveTitle("Sauce Demo");
  //3.Asser header text
  await expect(page.locator("//h1")).toHaveId("logo");
});

test("should test something", async({page})=>{
//steps to test


}

)