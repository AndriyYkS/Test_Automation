import { driver, By2, windowsAppDriverCapabilities, WebDriver2 } from 'selenium-appium'

import * as caps from '../src/session_capabilities'
import * as testCTRL from '../src/test_controler'
import {baseDriver} from './baseDriver';
import { Key, until,} from 'selenium-webdriver';
import assert from 'assert';

export class DVDatabaseAdmin_Driver extends baseDriver{

    

constructor(VMstring: string ){  
    super()
    this.vm = VMstring;
    this.capabilites = windowsAppDriverCapabilities(caps.deltaDatabaseAdminPath)
    this.startWithCapabilities(this.capabilites,this.vm)
   
}

async  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async ShutdownServer(){
    const rootDriver = new WebDriver2;
    await rootDriver.startWithCapabilities(windowsAppDriverCapabilities("Root"), this.vm)
    await rootDriver.findElement(By2.nativeName("File")).click()
    await rootDriver.findElement(By2.nativeName("Shutdown Server...")).click()
    await this.delay(2000)
    await rootDriver.findElement(By2.nativeName("OK")).click()
   
}

async ConnectToServer(){
    const rootDriver = new WebDriver2;
    await rootDriver.startWithCapabilities(windowsAppDriverCapabilities("Root"), this.vm)
    await rootDriver.findElement(By2.nativeName("File")).click()
    await rootDriver.findElement(By2.nativeName("Connect to Server")).click()
    await this.delay(3000)
}




}