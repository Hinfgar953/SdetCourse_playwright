import { test, expect } from "@playwright/test";


  test("Login with valid creds", async ({ page }) => {
    await page.goto('https://katalon-demo-cura.herokuapp.com/');
    
    //Button elment actions

    //await page.getByRole('link', { name: 'Make Appointment' }).click();
    //await page.getByRole('link', { name: 'Make Appointment' }).press("Enter");
    //await page.getByRole('link', { name: 'Make Appointment' }).dblclick()
    //await page.getByRole('link', { name: 'Make Appointment' }).click({button:"right"})
    //await page.getByRole('link', { name: 'Make Appointment' }).hover()
    await page.getByRole('link', { name: 'Make Appointment' }).click({timeout:10_000})

   //Textbox element

   await page.getByLabel("Username").fill("John Doe");
   // await page.getByLabel("Password").fill("ThisIsNotAPassword");
   //await page.getByLabel("Password").clear();
   await page.getByLabel("Password").fill("ThisIsNotAPassword");
   //await page.getByLabel("Password").pressSequentially("John Doe",{delay:300})
   await page.getByRole("button", { name: "Login" }).click();

  //Dropdown element

  //default option
  await expect(page.getByLabel("Facility")).toHaveValue('Tokyo CURA Healthcare Center')
  //select labe:
  //await page.getByLabel("Facility").selectOption({label:"Seoul CURA Healthcare Center"})
  await page.getByLabel("Facility").selectOption({index:2})

  //assert count
  let dropdownoptons=page.getByLabel("Facility").locator('option')
  await expect(dropdownoptons).toHaveCount(3)

  //get all values
  let listofelements=await page.getByLabel("Facility").all()

  //for--off loop
  let listofoptions=[]
  for(let element of listofelements){
   let elementstext=await element.textContent()
   listofoptions.push(elementstext)
  }
  console.log(listofoptions)


//checkbox and radio button
//assert default option

 await expect(page.getByRole("radio", { name: "Medicare" })).toBeChecked()
 await page.getByRole("radio",{name:"Medicaid"}).check()
 await expect(page.getByRole("radio", { name: "Medicare" })).not.toBeChecked()
})
