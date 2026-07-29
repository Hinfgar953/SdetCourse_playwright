import { test, expect } from "@playwright/test";

test.describe("Make Appointment", () => {
  test.beforeEach("Login with valid creds", async ({ page }) => {
    await page.goto('https://katalon-demo-cura.herokuapp.com/');
    await page.getByRole('link', { name: 'Make Appointment' }).click();
    await page.getByLabel('Username').fill(process.env.CURA_USER!);
    await page.getByLabel('Password').fill(process.env.CURA_PASSWORD!);
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.getByRole("heading", { name: "Make Appointment" })).toBeVisible();
  });
  

  test("Should make an appointment with non-default values", async ({ page }) => {

    await page.getByLabel('Facility').selectOption('Hongkong CURA Healthcare Center');

    //checkbox
    const readmissionCheckbox = page.getByRole("checkbox", { name: "Apply for hospital readmission" });
    await readmissionCheckbox.check();
    await expect(readmissionCheckbox).toBeChecked();

    //radio button
    const medicaidRadio = page.getByRole("radio", { name: "Medicaid" });
    await medicaidRadio.check();
    await expect(medicaidRadio).toBeChecked();

    //date input box - generate a date 30 days in the future to avoid hardcoded/expired dates
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 30);
    const formattedDate = `${(futureDate.getMonth() + 1).toString().padStart(2, '0')}/${futureDate.getDate().toString().padStart(2, '0')}/${futureDate.getFullYear()}`;

    const visitDateInput = page.getByRole('textbox', { name: 'Visit Date (Required)' });
    await visitDateInput.click();
    await visitDateInput.fill(formattedDate);
    await visitDateInput.press("Enter");

    //multi line comment
    await page.getByRole("textbox", { name: "Comment" }).fill("This is a multi line comment\ncaptured by Playwright codegen");
    await page.getByRole("button", { name: "Book Appointment" }).click();

    //visibility assert - use getByRole for consistency and to avoid strict-mode violations
    await expect(page.getByRole("heading", { name: "Appointment Confirmation" })).toBeVisible();
  });

  //more tests go here...
});