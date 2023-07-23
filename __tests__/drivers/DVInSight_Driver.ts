import { driver, By2, windowsAppDriverCapabilities, WebDriver2 } from 'selenium-appium'
import { Key, until } from 'selenium-webdriver';
import * as caps from '../src/session_capabilities'
import * as testCTRL from '../src/test_controler'
import { baseDriver } from './baseDriver';

export class DVInSight_Driver extends baseDriver {

    constructor(VMstring: string) {
        super()
        this.vm = VMstring;
        this.capabilites = windowsAppDriverCapabilities(caps.deltInSightPath)
        this.startWithCapabilities(this.capabilites, this.vm)
    }

    async delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async openPerformanceReports(){
        const rootDriver = new WebDriver2;
        await rootDriver.startWithCapabilities(windowsAppDriverCapabilities("Root"), this.vm)
        await rootDriver.findElement(By2.nativeName("File")).click()
        await rootDriver.findElement(By2.nativeName("Performance Report")).click()
        await this.delay(2000)
    
    }

    async PerformanceReportsWidow(){
        const rootDriver = new WebDriver2;
        await rootDriver.startWithCapabilities(windowsAppDriverCapabilities("Root"), this.vm)
        await this.delay(4000)
        await rootDriver.findElement(By2.nativeAccessibilityId("File")).click()
       // await rootDriver.findElement(By2.nativeName("File")).click()
        await rootDriver.findElement(By2.nativeName("Open")).click()

    }

}