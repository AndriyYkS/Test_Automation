import assert from 'assert';
import AssertWrapper from 'codeceptjs-assert';
import { driver, By2, windowsAppDriverCapabilities, WebDriver2 } from 'selenium-appium'
//mport { Actions, Builder, By, Session, until, WebDriver, WebElement } from 'selenium-webdriver';

import * as caps from '../__tests__/src/session_capabilities'
import * as testCTRL from '../__tests__/src/test_controler'
import { Key } from 'selenium-webdriver';
import {Command} from 'selenium-webdriver/lib/command'
import { LegacyActionSequence } from 'selenium-webdriver/lib/actions';
let legacyAction = new LegacyActionSequence(driver)
jest.setTimeout(50000);

const VM_url = caps.url_DV_VM_Austin;


beforeAll(() => {
  // const capabilites = windowsAppDriverCapabilities(caps.appPath)
  const capabilites = windowsAppDriverCapabilities(caps.deltaVexplorerPath)
  return driver.startWithCapabilities(capabilites, VM_url);
});
afterAll(() => {
  
  return driver.quit();

});

test('opis',async()=>{
  const rootDriver = new WebDriver2;
  rootDriver.startWithCapabilities(windowsAppDriverCapabilities("Root"),VM_url)
    await By2.nativeAccessibilityId("10947").click()
   // await test_controler.delay(2000)
    //await test_controler.clickTwice()
    await By2.nativeName('Maximize').click();
    //await testCTRL.clickTwice("Setup", "Name")
    // const actions = driver.actions({async: true});
    // await actions.click().doubleClick('abc').perform();
  //driver.actions().click(By2.nativeName("Setup"))
 // await legacyAction.mouseDown(By2.nativeName("Setup"),2).mouseUp(By2.nativeName("Setup"),2).perform()
  //await testCTRL.doubleClick("Setup","Name")
  await testCTRL.rightClick("Setup","Name", driver)
 // const rootcaps = windowsAppDriverCapabilities("Root")
 //await rootDriver.startWithCapabilities(rootcaps,caps.url_DV_VM1_72)
 //let contextHelp = await rootDriver.findElement(By2.nativeAccessibilityId("32891"))
 //await contextHelp.click()
 await testCTRL.delay(1000)
 await rootDriver.findElement(By2.nativeAccessibilityId("32891")).click()
  await testCTRL.delay(1000)
    // let action = new Actions(driver.getExecutor()).doubleClick(By2.nativeName("Setup"))
  // await action.perform()
   //await driver.actions().doubleClick(By2.nativeName("Setup"))
  await  testCTRL.delay(2000)
  //   await By2.nativeName('Alarm Preferences').click()
  //  await testCTRL.delay(5000)
  //  await testCTRL.clickTwice("Setup", "Name")
  //   driver.actions().doubleClick(By2.nativeName("Setup")) 
  //   await testCTRL.clickTwice("Setup", "Name")
  //    By2.nativeName("Setup").click
  //    let zmienna = 1
  //    assert.strictEqual(zmienna,1,"nie równe sobie")
  //    assert.strictEqual(zmienna,0,`nie równe sobie bo wartość zmiennej = ${zmienna} i przyjęła inną wartość niż oczekiwana`)
     
  // await testCTRL.rightClick("Setup","Name") 
  // await By2.nativeName("Setup").sendKeys(Key.ARROW_DOWN + Key.ARROW_DOWN + Key.ARROW_DOWN + Key.ENTER )
  



  // console.log(await By2.findElements(element))
     
})

    //await elementIsVisible(driver.findElement(By2.nativeAccessibilityId("10947")))
    
     //await By2.nativeName('Help').click()
     //await By2.nativeAccessibilityId("32845").click()

//     //await By2.nativeXpath("//menu item[@AutomationId=\"32845\"]").click();

//     //delay(1000)
//     //let element = await driver.findElement(By2.nativeName("Setup"))
//     //delay(500)
//     //await elementIsVisible(element)
//     //delay(500)
//     //let alarmPreferencesTesxt = await By2.nativeName('Alarm Preferences').getText()
//     //delay(500)
//     //console.log(alarmPreferencesTesxt)
//     //assert.strictEqual()

