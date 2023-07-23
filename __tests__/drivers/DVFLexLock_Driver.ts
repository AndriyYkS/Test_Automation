import { driver, By2, windowsAppDriverCapabilities, WebDriver2 } from 'selenium-appium'
import { Key, until } from 'selenium-webdriver';
import * as caps from '../src/session_capabilities'
import * as testCTRL from '../src/test_controler'
import { baseDriver } from './baseDriver';


export class DVFLexLock_Driver extends baseDriver {

    constructor(VMstring: string) {
        super()
        this.vm = VMstring;
        this.capabilites = windowsAppDriverCapabilities(caps.deltaFlexLockPath)
        this.startWithCapabilities(this.capabilites, this.vm)
    }

    async FLexlockClose(){
        const rootDriver = new WebDriver2;
        await rootDriver.startWithCapabilities(windowsAppDriverCapabilities("Root"), this.vm)
        await rootDriver.findElement(By2.nativeAccessibilityId("Close")).click()
        await rootDriver.quit()
    }

    async DeltaVLogon(){
        const rootDriver = new WebDriver2;
        rootDriver.startWithCapabilities(windowsAppDriverCapabilities("Root"), this.vm)
        By2.nativeAccessibilityId("1009", this).click()
        await rootDriver.quit()
    }
    
    async WindowsDesktop(){
        const rootDriver = new WebDriver2;
        rootDriver.startWithCapabilities(windowsAppDriverCapabilities("Root"), this.vm)
        By2.nativeAccessibilityId("1011", this).click()
        await rootDriver.quit()
    }

    async DeltaVOperate(){
            const rootDriver = new WebDriver2;
            rootDriver.startWithCapabilities(windowsAppDriverCapabilities("Root"), this.vm)
            By2.nativeAccessibilityId("1008", this).click()
            await rootDriver.quit()
    }
    
    async DeltaVLive(){
        const rootDriver = new WebDriver2;
        rootDriver.startWithCapabilities(windowsAppDriverCapabilities("Root"), this.vm)
        await this.delay(2000)
        await rootDriver.findElement(By2.nativeAccessibilityId("1022")).click()
        await rootDriver.quit()
    }

    async DeltaBlackWindow(){
        const rootDriver = new WebDriver2;
        rootDriver.startWithCapabilities(windowsAppDriverCapabilities("Root"), this.vm)
        await this.delay(2000)
        await rootDriver.findElement(By2.nativeAccessibilityId("1010")).click()
        await rootDriver.quit()
    }

}

