import { test, expect } from "@playwright/test";
/**
 * Scenario:
 * 1.Login as a standard user
 * 2.Get a list of products
 * 3.Assert that all the products have non-zero dollar
 */

test.describe("Inventory feature", () => {
  test.beforeEach("Login", async ({ page }) => {
    //Launch url
    await page.goto("https://www.saucedemo.com/");

    //login
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();

    //Assertion
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    await expect(page).toHaveURL(/.*\/inventory/);
  });

  test("should not be any zero value", async ({ page }) => {
    let productsElements = page.locator(".inventory_item");
    await expect(productsElements).toHaveCount(6);

    //get product name and prices
    let totalProducts = await productsElements.count();
    let productPriceArray = [];

    for (let i = 0; i < totalProducts; i++) {
      let eleNode = productsElements.nth(i);

      //product name
      let productName = await eleNode
        .locator(".inventory_item_name")
        .innerText();

      //price
      let price = await eleNode.locator(".inventory_item_price").innerText();

      productPriceArray.push(price);
    }
    //replace $ symbols
    //compare price >0

    let priceArrayNum = productPriceArray.map((item) =>
      parseFloat(item.replace("$", "")),
    );
    let priceArrayInvalid = priceArrayNum.filter((item) => item <= 0);

    if (priceArrayInvalid.length > 0) {
      console.log("error price values 0 found");
    } else {
      console.log("all prices are non-zero");
    }

   expect(priceArrayInvalid).toHaveLength(0); 
  });
});
