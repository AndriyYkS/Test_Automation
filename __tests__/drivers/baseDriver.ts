import { driver, By2, windowsAppDriverCapabilities, WebDriver2 } from 'selenium-appium'
import { LegacyActionSequence } from 'selenium-webdriver/lib/actions';
import * as caps from '../src/session_capabilities'
import * as testCTRL from '../src/test_controler'
export abstract class baseDriver extends WebDriver2{
capabilites;
vm;
async  doubleClick(name_Id: string, type: string) {
    let legacyAction = new LegacyActionSequence(this)

    if (type == "Id") {
        await legacyAction.doubleClick(By2.nativeAccessibilityId(name_Id,this)).perform()
    } else if (type == "Name") {
        await legacyAction.doubleClick(By2.nativeName(name_Id,this)).perform()
    } else {
        throw new Error("bad argument!!! Type 'Name' for nativeName locator or 'Id' for AccessibilityId' ")
    }
}
async rightClick(name_Id: string, type: string, driver?:WebDriver2) {
    let legacyAction
    if (driver!= null)  legacyAction = new LegacyActionSequence(this)
    else  legacyAction = new LegacyActionSequence(this)
    if (type == "Id") {
        await legacyAction.mouseDown(By2.nativeAccessibilityId(name_Id,this), 2).mouseUp(By2.nativeAccessibilityId(name_Id,this), 2).perform()
    } else if (type == "Name") {
        await legacyAction.mouseDown(By2.nativeName(name_Id,this), 2).mouseUp(By2.nativeName(name_Id,this), 2).perform()
    } else {
        throw new Error("bad argument!!! Type 'Name' for nativeName locator or 'Id' for AccessibilityId' ")
    }
}

 async  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
 async maximizeApp() {
    await By2.nativeName('Maximize',this).click(); //maximize DV Explorer app view
}
}
