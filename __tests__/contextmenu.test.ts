import assert from 'assert';
import AssertWrapper from 'codeceptjs-assert';
import { driver, By2, windowsAppDriverCapabilities, WebDriver2 } from 'selenium-appium'
//mport { Actions, Builder, By, Session, until, WebDriver, WebElement } from 'selenium-webdriver';

import * as caps from '../__tests__/src/session_capabilities'
import * as testCTRL from '../__tests__/src/test_controler'
import { Key } from 'selenium-webdriver';
import { Command } from 'selenium-webdriver/lib/command'
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

test('contxt menu', async () => {
    //set up parallel root session  
    const rootDriver = new WebDriver2;
    rootDriver.startWithCapabilities(windowsAppDriverCapabilities("Root"), VM_url)
    //close pop up 
    await By2.nativeAccessibilityId("10947").click()
    //maximize window
    await By2.nativeName('Maximize').click();
    //roght click with default driver
    await testCTRL.rightClick("Setup", "Name", driver)
    await testCTRL.delay(1000)
    //context menu element click with Id using rootSessionDriver
    await rootDriver.findElement(By2.nativeAccessibilityId("32891")).click()
    await By2.nativeName("Setup").click()
    await By2.nativeName("Alarm Preferences").click()
    await testCTRL.delay(1000)

    await testCTRL.rightClick("Alarm Preferences", "Name", driver)
    await testCTRL.delay(1000)
    //context menu click in "Properties"
    await rootDriver.findElement(By2.nativeAccessibilityId("32830")).click()
    await testCTRL.delay(1000)
    //close Pop-up with root session
    await rootDriver.findElement(By2.nativeAccessibilityId("2")).click()

    await testCTRL.delay(1000)
})
