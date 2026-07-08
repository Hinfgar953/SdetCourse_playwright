import { test, expect } from "@playwright/test";

test("Test to login successfully", async ({ page }) => {
  //1. Go to home page
  await page.goto("");

  //2.Tittle is correct
  await expect(page).toHaveTitle("Sauce Demo");

  //3.Asser header text
  await expect(page.locator("//h1")).toHaveId("logo");

  //4.Clicking on the login button 
  await page.getByText("Log In").click()

  //5.Verify that we are on login page 
  await expect(page.getByText("Customer Login")).toBeVisible()

  //6.Make a login
  await page.getByLabel("Email Address").fill("humbertoinfgar3@email.com")
  await page.getByLabel("Password").fill("password")
  await (page.getByRole("button").getByText("SIGN IN")).click()
  await expect (page.getByText("humberto garcia")).toBeVisible()
})