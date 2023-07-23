import assert from 'assert';
import { driver, By2, windowsAppDriverCapabilities, WebDriver2 } from 'selenium-appium'
import * as caps from './src/session_capabilities'
import * as testCTRL from './src/test_controler'
import * as exp from './drivers/DVExplorer_Driver'
import { Key, until } from 'selenium-webdriver';
import { LegacyActionSequence } from 'selenium-webdriver/lib/actions';
jest.setTimeout(70000);

//const VM_url = caps.url_DV_VM_Austin;
//const VM_url = caps.url_VM_20;
const VM_url = caps.url_VM_10;

let deltaVDriverExp: exp.DVExplorer_Driver

beforeAll(() => {
    const capabilites = windowsAppDriverCapabilities(caps.deltaVexplorerPath)
    return driver.startWithCapabilities(capabilites, VM_url);
});
afterAll(() => {
    return driver.quit();
});

test('opis',async()=>{
    const rootDriver = new WebDriver2;
    deltaVDriverExp = await new exp.DVExplorer_Driver(VM_url)
    rootDriver.startWithCapabilities(windowsAppDriverCapabilities("Root"),VM_url)
      await By2.nativeAccessibilityId("10947").click()
      await By2.nativeName('Maximize').click()
      await deltaVDriverExp.delay(500)
      await deltaVDriverExp.ImportStandartDeltaVFormat("RESTART_TEST.fhx")
      await deltaVDriverExp.downloadControlNetwork()

      /*
      await testCTRL.doubleClick("PKCTLR-1E5F03", "Name", driver)
      await By2.nativeName("Decommissioned Nodes").click()
      await testCTRL.rightClick("OPC UA Server", "Name", driver)
      await testCTRL.OPCUAServerExportCertificate(VM_url)  
      await testCTRL.clickSave(VM_url)
      */

})