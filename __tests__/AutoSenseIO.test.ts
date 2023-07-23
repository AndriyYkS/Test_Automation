import assert from 'assert';
import { driver, By2, windowsAppDriverCapabilities, WebDriver2 } from 'selenium-appium'
import * as caps from './src/session_capabilities'
import * as testCTRL from './src/test_controler'
import { Key, until } from 'selenium-webdriver';
import { LegacyActionSequence } from 'selenium-webdriver/lib/actions';
jest.setTimeout(70000);

const VM_url = caps.url_DV_VM_Austin;

beforeAll(() => {
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
     
      await By2.nativeName('Maximize').click()
      await testCTRL.doubleClick("PKCTLR-1E5F03", "Name", driver)
      await By2.nativeName("Decommissioned Nodes").click()
      await testCTRL.rightClick("I/O", "Name", driver)
      await testCTRL.clickAutoSense(VM_url)
    //await testCTRL.delay(50000);
      await driver.wait(until.elementIsVisible(By2.nativeAccessibilityId("2")))
       
      await testCTRL.clickOk(VM_url);
})