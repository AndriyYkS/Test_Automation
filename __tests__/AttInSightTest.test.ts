import assert from 'assert';
import { driver, By2, windowsAppDriverCapabilities, WebDriver2 } from 'selenium-appium'
import * as caps from './src/session_capabilities'
import * as testCTRL from './src/test_controler'
import * as exp from './drivers/DVExplorer_Driver'
import * as ins from './drivers/DVInSight_Driver'
import { Key, until } from 'selenium-webdriver';
import { LegacyActionSequence } from 'selenium-webdriver/lib/actions';
import { baseDriver } from './drivers/baseDriver';
jest.setTimeout(70000);

//const VM_url = caps.url_DV_VM_Austin;
//const VM_url = caps.url_VM_20;
const VM_url = caps.url_VM_10;

let deltaVDriverExp: exp.DVExplorer_Driver
let deltaVDriverInSight: ins.DVInSight_Driver


beforeAll(() => {
   const capabilites = windowsAppDriverCapabilities(caps.deltInSightPath)
   return driver.startWithCapabilities(capabilites, VM_url);

});
afterAll(() => {
    return driver.quit();
});

test('opis',async()=>{
    const rootDriver = new WebDriver2;
   deltaVDriverInSight = await new ins.DVInSight_Driver(VM_url)
    rootDriver.startWithCapabilities(windowsAppDriverCapabilities("Root"),VM_url)
    await deltaVDriverInSight.delay(2000)
    await deltaVDriverInSight.openPerformanceReports()
    await deltaVDriverInSight.delay(10000)
    await deltaVDriverInSight.PerformanceReportsWidow()
      

})