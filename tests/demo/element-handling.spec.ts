import { test, expect } from "@playwright/test";

test("Login with valid creds", async ({ page }) => {
  await page.goto('https://katalon-demo-cura.herokuapp.com/');

  //Button element actions
  //Other options tested: press("Enter"), dblclick(), click({button:"right"}), hover()
  await page.getByRole('link', { name: 'Make Appointment' }).click({ timeout: 10_000 });

  //Textbox elements
  await page.getByLabel("Username").fill(process.env.CURA_USER!);
  await page.getByLabel("Password").fill(process.env.CURA_PASSWORD!);
  await page.getByRole("button", { name: "Login" }).click();

  //Dropdown element - default option
  await expect(page.getByLabel("Facility")).toHaveValue('Tokyo CURA Healthcare Center');

  //select by index
  await page.getByLabel("Facility").selectOption({ index: 2 });

  //assert count of options
  let dropdownOptions = page.getByLabel("Facility").locator('option');
  await expect(dropdownOptions).toHaveCount(3);

  //get all option texts
  let listOfElements = await dropdownOptions.all();
  let listOfOptions = [];
  for (let element of listOfElements) {
    let elementText = await element.textContent();
    listOfOptions.push(elementText);
  }
  console.log(listOfOptions);

  //checkbox and radio button - assert default option
  await expect(page.getByRole("radio", { name: "Medicare" })).toBeChecked();
  await page.getByRole("radio", { name: "Medicaid" }).check();
  await expect(page.getByRole("radio", { name: "Medicare" })).not.toBeChecked();
});