/* 
****************************************************************************** 
Test Controller with various functions to execute in DV Explorer
******************************************************************************
*/
export { }
import assert from 'assert';
import { driver, By2, windowsAppDriverCapabilities, WebDriver2 } from 'selenium-appium'
import { Key, until } from 'selenium-webdriver';
import { LegacyActionSequence } from 'selenium-webdriver/lib/actions';
//let legacyAction = new LegacyActionSequence(driver)

const rootDriver = new WebDriver2; 

//Perform DoubleClick in element by NativeName or AccessibilityID
export async function doubleClick(name_Id: string, type: string, driver: WebDriver2) {
    let legacyAction = new LegacyActionSequence(driver)
    if (type == "Id") {
        await legacyAction.doubleClick(By2.nativeAccessibilityId(name_Id)).perform()
    } else if (type == "Name") {
        await legacyAction.doubleClick(By2.nativeName(name_Id)).perform()
    } else {
        throw new Error("bad argument!!! Type 'Name' for nativeName locator or 'Id' for AccessibilityId' ")
    }
}
//Perform Righ-Click on element with its name or id
export async function rightClick(name_Id: string, type: string, driver: WebDriver2) {
    let legacyAction = new LegacyActionSequence(driver)
    if (type == "Id") {
        await legacyAction.mouseDown(By2.nativeAccessibilityId(name_Id), 2).mouseUp(By2.nativeAccessibilityId(name_Id), 2).perform()
    } else if (type == "Name") {
        await legacyAction.mouseDown(By2.nativeName(name_Id), 2).mouseUp(By2.nativeName(name_Id), 2).perform()
    } else {
        throw new Error("bad argument!!! Type 'Name' for nativeName locator or 'Id' for AccessibilityId' ")
    }
}

//delay in mili seconds
export async function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function addNewController(VM_url: string) {
    const rootDriver = new WebDriver2;   //<<---- dodac
    await rootDriver.startWithCapabilities(windowsAppDriverCapabilities("Root"), VM_url) //<-- dodac
    await rootDriver.findElement(By2.nativeName("New")).click()
    await rootDriver.findElement(By2.nativeAccessibilityId("53318")).click()
    await rootDriver.quit()
}
export async function initNewCardPopInit(VM_url: string, driver: WebDriver2) {
    const rootDriver = new WebDriver2;
    await rootDriver.startWithCapabilities(windowsAppDriverCapabilities("Root"), VM_url)
    await doubleClick("NODE1", "Name", driver)
    await By2.nativeName("Decommissioned Nodes").click()
    await rightClick('I/O', "Name", driver)
    await rootDriver.findElement(By2.nativeName("New Card")).click()
    await rootDriver.quit()
}
export async function addCard(VM_url: string, cardClass: string, cardType: string, cardSeries: string, cardDescription: string, reduntant: boolean, slotId: string) {
    const rootDriver = new WebDriver2;
    await rootDriver.startWithCapabilities(windowsAppDriverCapabilities("Root"), VM_url)
    await By2.nativeName("RichEdit Control").sendKeys(`${cardDescription}`)
    await By2.nativeAccessibilityId("17186").click()
    await By2.nativeAccessibilityId("17186").sendKeys(Key.ARROW_DOWN)
    await rootDriver.findElement(By2.nativeName(`${cardClass}`)).click()
    await By2.nativeAccessibilityId("16548").click()
    await By2.nativeAccessibilityId("16548").sendKeys(Key.ARROW_DOWN)
    await rootDriver.findElement(By2.nativeName(`${cardType}`)).click()
    await By2.nativeAccessibilityId("17188").click()
    await By2.nativeAccessibilityId("17188").sendKeys(Key.ARROW_DOWN)
    await rootDriver.findElement(By2.nativeName(`${cardSeries}`)).click()
    if (reduntant == true) {
        await rootDriver.findElement(By2.nativeName("Card is redundant")).click()
    }
    await rootDriver.findElement(By2.nativeAccessibilityId("16549")).click()
    await rootDriver.findElement(By2.nativeName(`${slotId}`)).click()
    await rootDriver.findElement(By2.nativeName(`OK`)).click()
    await rootDriver.quit()
}
export async function closeTipPopUp_Maximize() {
    await By2.nativeAccessibilityId("10947").click()
    await By2.nativeName('Maximize').click();
}

export async function deleteController(VM_url:string, driver:WebDriver2) {
    const rootDriver = new WebDriver2;
    await rootDriver.startWithCapabilities(windowsAppDriverCapabilities("Root"), VM_url)
    await rightClick('NODE1',"Name", driver)
    await rootDriver.findElement(By2.nativeName("Delete")).click()
    await rootDriver.findElement(By2.nativeName("Yes")).click()
    await rootDriver.quit()

}


export async function clickAutoSense(VM_url: string) {
    const rootDriver = new WebDriver2;   
    await rootDriver.startWithCapabilities(windowsAppDriverCapabilities("Root"), VM_url) 
    await rootDriver.findElement(By2.nativeName("Auto-sense I/O cards")).click() 
    await rootDriver.quit()
}

export async function clickOk(VM_url: string) {
    const rootDriver = new WebDriver2;   
    await rootDriver.startWithCapabilities(windowsAppDriverCapabilities("Root"), VM_url) 
    await rootDriver.findElement(By2.nativeName("OK")).click() 
    await rootDriver.quit()
}

export async function clickSave(VM_url: string) {
    const rootDriver = new WebDriver2;   
    await rootDriver.startWithCapabilities(windowsAppDriverCapabilities("Root"), VM_url) 
    await rootDriver.findElement(By2.nativeName("Save")).click() 
    await rootDriver.quit()
}


export async function OPCUAServerProperties(VM_url: string) {
    const rootDriver = new WebDriver2;   
    await rootDriver.startWithCapabilities(windowsAppDriverCapabilities("Root"), VM_url) 
    await rootDriver.findElement(By2.nativeName("Properties")).click() 
    await rootDriver.quit()
}

export async function OPCUAServerExportCertificate(VM_url: string) {
    const rootDriver = new WebDriver2;   
    await rootDriver.startWithCapabilities(windowsAppDriverCapabilities("Root"), VM_url) 
    await rootDriver.findElement(By2.nativeName("Export Certificate")).click() 
    await rootDriver.quit()
}


export async function openNewTab(VM_url: string) {
    const rootDriver = new WebDriver2;  
    await rootDriver.startWithCapabilities(windowsAppDriverCapabilities("Root"), VM_url)
    await rootDriver.findElement(By2.nativeName("Certificate")).click()
   //await rootDriver.findElement(By2.nativeName("typeName")).click()
    await rootDriver.quit()
}

export async function openNewTabAdvance(VM_url: string) {
    const rootDriver = new WebDriver2;  
    await rootDriver.startWithCapabilities(windowsAppDriverCapabilities("Root"), VM_url)
    await rootDriver.findElement(By2.nativeName("Advanced")).click()
   //await rootDriver.findElement(By2.nativeName("typeName")).click()
    await rootDriver.quit()
}

export async function GenerateThumprint(VM_url: string) {
    const rootDriver = new WebDriver2;   
    await rootDriver.startWithCapabilities(windowsAppDriverCapabilities("Root"), VM_url) 
    await rootDriver.findElement(By2.nativeAccessibilityId("6")).click()
    await rootDriver.quit()
}

export async function DownloadPK(VM_url: string) { // download PK
    const rootDriver = new WebDriver2;   
    await rootDriver.startWithCapabilities(windowsAppDriverCapabilities("Root"), VM_url) 
    await rootDriver.findElement(By2.nativeAccessibilityId("6")).click()

    await rootDriver.quit()

}

export async function downloadControlNetwork(VM_url: string, driver: WebDriver2) {
   // await rightClick("Control Network", "Name", driver)
    await rootDriver.startWithCapabilities(windowsAppDriverCapabilities("Root"), VM_url)
    await rootDriver.findElement(By2.nativeName("Download")).click()
    //await delay(1000)
    await rootDriver.findElement(By2.nativeAccessibilityId("53249")).click()
    await rootDriver.findElement(By2.nativeAccessibilityId("1")).click()
    await rootDriver.quit()
}

export async function checkboxActionCheck(VM_url: string, typeName: string) {
    const rootDriver = new WebDriver2;   
    await rootDriver.startWithCapabilities(windowsAppDriverCapabilities("Root"), VM_url) 
    let CheckboxState = await rootDriver.findElement(By2.nativeName(typeName)).getAttribute("LegacyDefaultAction") 
    await rootDriver.findElement(By2.nativeName(typeName)).click()
   
    await rootDriver.quit()
}

export async function FillUserInfo(VM_url: string, typeName: string ) { //OPCUATEST
    const rootDriver = new WebDriver2;  
    await rootDriver.startWithCapabilities(windowsAppDriverCapabilities("Root"), VM_url) 
    await rootDriver.findElement(By2.nativeAccessibilityId("18893")).sendKeys(typeName)
    await rootDriver.findElement(By2.nativeAccessibilityId("18894")).sendKeys("12345678")
    await rootDriver.findElement(By2.nativeAccessibilityId("18895")).sendKeys("12345678"  + Key.ENTER)
    await rootDriver.quit()
    
    }