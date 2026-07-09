import { test, expect } from "@playwright/test";

test.describe("Make Appointment", () => {
  test.beforeEach("Login with valid creds", async ({ page }) => {
    await page.goto('https://katalon-demo-cura.herokuapp.com/');
    await page.getByRole('link', { name: 'Make Appointment' }).click();
    await page.getByLabel("Username").fill("John Doe");
    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.getByRole("heading", { name: "Make Appointment" }),).toBeVisible();
  });

  test("Should make an appointment with non-default values", async ({ page }) => {

    await page.getByLabel('Facility').selectOption('Hongkong CURA Healthcare Center');

    //checkbox
    await page.getByRole("checkbox", { name: "Apply for hospital readmission" }).check();

    //radio button
    await page.getByRole("radio", { name: "Medicaid" }).check();

    //date input box
    await page.getByRole('textbox', { name: 'Visit Date (Required)' }).click();
    await page.getByRole('textbox', { name: 'Visit Date (Required)' }).fill('05/12/2027');
    await page.getByRole('textbox', { name: 'Visit Date (Required)' }).press("Enter")
    
    
    //multi line comments
    await page.getByRole("textbox", { name: "Comment" }).fill("this is a muylti line comments\ncaptured by playwrithgt codege");
    await page.getByRole("button", { name: "Book Appointment" }).click();

    //visibility assert
    await expect(page.locator("h2")).toContainText("Appointment Confirmation");
  });

  //more tests go here...
});
