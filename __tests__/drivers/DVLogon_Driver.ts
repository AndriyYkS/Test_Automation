import { driver, By2, windowsAppDriverCapabilities, WebDriver2 } from 'selenium-appium'
import { Key, until } from 'selenium-webdriver';
import * as caps from '../src/session_capabilities'
import * as testCTRL from '../src/test_controler'
import { baseDriver } from './baseDriver';

export class DVLogon_Driver extends baseDriver {

    constructor(VMstring: string) {
        super()
        this.vm = VMstring;
        this.capabilites = windowsAppDriverCapabilities(caps.deltaLogonPath)
        this.startWithCapabilities(this.capabilites, this.vm)
    }

    async LogonClose(){
        const rootDriver = new WebDriver2;
        rootDriver.startWithCapabilities(windowsAppDriverCapabilities("Root"), this.vm)
        await this.delay(2000)
        await rootDriver.findElement(By2.nativeAccessibilityId("Close")).click()
        await rootDriver.quit()
    }

    async LogonUserLogin(userName: string, UserPass: string ){ //logowanie usera
        const rootDriver = new WebDriver2;
        rootDriver.startWithCapabilities(windowsAppDriverCapabilities("Root"), this.vm)
        await this.delay(2000)

        await rootDriver.findElement(By2.nativeAccessibilityId("1000")).click() // Drop Down list 

        let userNames = await rootDriver.findElements(By2.nativeAccessibilityId("1000")) // parameter click
        for (const item in userNames) {
            await userNames[item].sendKeys(userName + Key.ENTER)
        }
        await rootDriver.findElement(By2.nativeAccessibilityId("1001")).sendKeys(UserPass+ Key.ENTER)
        await rootDriver.quit()
    }

}