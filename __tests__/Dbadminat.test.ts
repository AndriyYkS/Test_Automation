import assert from 'assert';
import { driver, By2, windowsAppDriverCapabilities, WebDriver2 } from 'selenium-appium'
import * as caps from './src/session_capabilities'
import * as testCTRL from './src/test_controler'
import * as dba from './drivers/DVDatabaseAdmin_Driver'
import { Key, until } from 'selenium-webdriver';
import { LegacyActionSequence } from 'selenium-webdriver/lib/actions';
jest.setTimeout(70000);

//const VM_url = caps.url_DV_VM_Austin;
//const VM_url = caps.url_VM_20;
const VM_url = caps.url_VM_10;

let deltaVDriverDba: dba.DVDatabaseAdmin_Driver

beforeAll(() => {
    const capabilites = windowsAppDriverCapabilities(caps.deltaDatabaseAdminPath)
    return driver.startWithCapabilities(capabilites, VM_url);
});
afterAll(() => {
    return driver.quit();
});

test('opis',async()=>{
    const rootDriver = new WebDriver2;
    deltaVDriverDba = await new dba.DVDatabaseAdmin_Driver(VM_url)
    rootDriver.startWithCapabilities(windowsAppDriverCapabilities("Root"),VM_url)
      await By2.nativeName('Maximize').click()
      await deltaVDriverDba.ShutdownServer()
      await deltaVDriverDba.delay(10000)
      await deltaVDriverDba.ConnectToServer()

})