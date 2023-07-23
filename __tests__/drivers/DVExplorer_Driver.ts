import { driver, By2, windowsAppDriverCapabilities, WebDriver2 } from 'selenium-appium'
import { Key, until } from 'selenium-webdriver';
import * as caps from '../src/session_capabilities'
import * as testCTRL from '../src/test_controler'
import { baseDriver } from './baseDriver';

export class DVExplorer_Driver extends baseDriver {

    TipPopUpClose: string = "10947"

    constructor(VMstring: string) {
        super()
        this.vm = VMstring;
        this.capabilites = windowsAppDriverCapabilities(caps.deltaVexplorerPath)
        this.startWithCapabilities(this.capabilites, this.vm)

    }
    async closeTipPopUp() {
        await By2.nativeAccessibilityId(this.TipPopUpClose, this).click() //Close pop up window with tips
    }

    async addNewController(newControllerName: string) {
        const rootDriver = new WebDriver2;
        await rootDriver.startWithCapabilities(windowsAppDriverCapabilities("Root"), this.vm)
        await this.rightClick("Control Network", "Name")//click to show the context menu to add new controller
        await rootDriver.findElement(By2.nativeName("New")).click()//click "New" in context menu
        await rootDriver.findElement(By2.nativeAccessibilityId("53318")).click()//click "Controller"
        await rootDriver.findElement(By2.nativeName("Decommissioned Nodes")).click()
        await rootDriver.findElement(By2.nativeName("Control Network")).click()
        await this.rightClick("NODE1", "Name")
        await rootDriver.findElement(By2.nativeName("Rename")).click() //click rename in context menu
        await rootDriver.findElement(By2.nativeAccessibilityId("edit")).sendKeys(newControllerName + Key.ENTER) //rename the controller
        await rootDriver.quit()
    }
    async initNewCardPopInit(controllerName: string) {
        const rootDriver = new WebDriver2;
        await rootDriver.startWithCapabilities(windowsAppDriverCapabilities("Root"), this.vm)
        await this.doubleClick(controllerName, "Name")//double click the controller to expand its tree
        await By2.nativeName("Decommissioned Nodes", this).click()//click different button to close right-oriented elements list view 
        await this.rightClick('I/O', "Name") //click with right button the I/O of the controller
        await rootDriver.findElement(By2.nativeName("New Card")).click()
        await rootDriver.quit()//quit root session driver
    }
    async addNewCard(cardClass: string, cardType: string, cardSeries: string, cardDescription: string, ifRedundant: boolean, slotId: string, controllerName: string) {
        const rootDriver = new WebDriver2;

        await this.initNewCardPopInit(controllerName)
        await rootDriver.startWithCapabilities(windowsAppDriverCapabilities("Root"), this.vm)
        await By2.nativeName("RichEdit Control", this).sendKeys(`${cardDescription}`) //Adding descripton to card
        await By2.nativeAccessibilityId("17186", this).click() //click the Card class drop down list
        await By2.nativeAccessibilityId("17186", this).sendKeys(Key.ARROW_DOWN)// enable to click list elements
        await rootDriver.findElement(By2.nativeName(`${cardClass}`)).click() //click the Card Class
        await By2.nativeAccessibilityId("16548", this).click() //click the Card Type drop down list
        await By2.nativeAccessibilityId("16548", this).sendKeys(Key.ARROW_DOWN)// enable to click list elements
        await rootDriver.findElement(By2.nativeName(`${cardType}`)).click()//click the Card Type
        await By2.nativeAccessibilityId("17188", this).click()//click the Card Series drop down list
        await By2.nativeAccessibilityId("17188", this).sendKeys(Key.ARROW_DOWN)// enable to click list elements
        await rootDriver.findElement(By2.nativeName(`${cardSeries}`)).click()//click the Card Series
        if (ifRedundant == true) { //select if want to reduntand config
            await rootDriver.findElement(By2.nativeName("Card is redundant")).click() //click reduntant "select box"
        }
        await rootDriver.findElement(By2.nativeAccessibilityId("16549")).click() //click the Slot position drop down list
        await rootDriver.findElement(By2.nativeName(`${slotId}`)).click() //select slot ID
        await rootDriver.findElement(By2.nativeName(`OK`)).click() //click "OK" button to finish card adding process
        await rootDriver.quit() //quit root session driver
    }

    async deleteController(controllerName: string) {
        const rootDriver = new WebDriver2;

        await rootDriver.startWithCapabilities(windowsAppDriverCapabilities("Root"), this.vm)
        await this.rightClick(controllerName, "Name") //click with right button default controller
        await rootDriver.findElement(By2.nativeName("Delete")).click() //clit delete the controller
        await rootDriver.findElement(By2.nativeName("Yes")).click() //click "yes" to delete the controller
        await rootDriver.quit()//quit root session driver
    }
    async cardPropertiesPopUp(cardName: string) {
        const rootDriver = new WebDriver2;
        await rootDriver.startWithCapabilities(windowsAppDriverCapabilities("Root"), this.vm)
        await this.rightClick(cardName, "Name")
        await rootDriver.findElement(By2.nativeName("Properties")).click()
        let properties = await rootDriver.findElement(By2.nativeAccessibilityId("16641")).getText() //read the description of the card from the pop-up window
        await rootDriver.findElement(By2.nativeName(`OK`)).click() //close the pop-up 
        await rootDriver.quit()//quit root session driver
        return properties
    }

    async profibusPortConfugrationGeneralTab(
        cardName: string,
        portName: string,
        enableCard: boolean,
        portDescription: string,
        actionInEventControllerFailure: string,
        baudRate: string,
        address: string) {
        const rootDriver = new WebDriver2;
        await rootDriver.startWithCapabilities(windowsAppDriverCapabilities("Root"), this.vm)
        await this.doubleClick(cardName, "Name")
        await this.rightClick(portName, "Name")
        await rootDriver.findElement(By2.nativeName("Properties")).click()
        if (enableCard == true) {
            await By2.nativeName("Enabled").click()
        }
        await By2.nativeName("RichEdit Control", this).clear()
        await By2.nativeName("RichEdit Control", this).sendKeys(`${portDescription}`) //Adding descripton to card
        await By2.nativeAccessibilityId("17068", this).click() //click the Card class drop down list
        await By2.nativeAccessibilityId("17068", this).sendKeys(Key.ARROW_DOWN)// enable to click list elements
        await rootDriver.findElement(By2.nativeName(`${actionInEventControllerFailure}`)).click() //click the Card Class
        await By2.nativeAccessibilityId("17019", this).click() //click the Card class drop down list
        await By2.nativeAccessibilityId("17019", this).sendKeys(Key.ARROW_DOWN)// enable to click list elements
        await rootDriver.findElement(By2.nativeName(`${baudRate} bps`)).click() //click the Card Class
        await this.doubleClick("17022", "Id")
        await By2.nativeAccessibilityId("17022", this).sendKeys(`${address}`)// enable to click list elements
        await rootDriver.findElement(By2.nativeName(`OK`)).click() //close the pop-up 
        await rootDriver.quit()
    }

    async expandLibraryDeviceDefinitions(deviceGroupType: string) {
        await By2.nativeName("Decommissioned Nodes", this).click()
        await this.doubleClick("Library", "Name")
        await By2.nativeName("Decommissioned Nodes", this).click()
        await this.doubleClick("Device Definitions", "Name")
        await By2.nativeName("Decommissioned Nodes", this).click()
        await this.doubleClick(`${deviceGroupType} Devices`, "Name")
    }
    async addProfibusGSD(gsdFilePath: string) {
        const rootDriver = new WebDriver2;
        await this.rightClick("Profibus DP Devices", "Name")
        await rootDriver.startWithCapabilities(windowsAppDriverCapabilities("Root"), this.vm)
        await rootDriver.findElement(By2.nativeName("Add Device Definition...")).click()
        await rootDriver.findElement(By2.nativeAccessibilityId("1001")).click()
        await this.delay(1000)
        await this.rightClick("1001", "Id", rootDriver)
        await rootDriver.findElement(By2.nativeName("Edit address")).click()
        await rootDriver.findElement(By2.nativeName("Address")).sendKeys(gsdFilePath + Key.ENTER)
        //await rootDriver.findElement(By2.nativeName("Address")).sendKeys(gsdFilePath+Key.ENTER)
        let filesList = await rootDriver.findElements(By2.nativeName("Name"))
        for (const x in filesList) {
            let fileTxt = await filesList[x].getText()
            if (fileTxt.includes("gsd")) {
                await filesList[x].click()
            }
        }
        await rootDriver.findElement(By2.nativeName("Open")).click()
        await rootDriver.quit()
        await rootDriver.startWithCapabilities(windowsAppDriverCapabilities("Root"), this.vm)
        await this.delay(2000)
        await rootDriver.findElement(By2.nativeName("Import complete")).sendKeys(Key.ESCAPE)
        await rootDriver.quit()
    }
    async commissionControllerInit() {
        const rootDriver = new WebDriver2;
        await this.rightClick("Control Network", "Name")
        await rootDriver.startWithCapabilities(windowsAppDriverCapabilities("Root"), this.vm)
        await rootDriver.findElement(By2.nativeName("Commission Controller")).click()
        await this.delay(1000)
        await rootDriver.findElement(By2.nativeAccessibilityId("10238")).click()
        await rootDriver.findElement(By2.nativeAccessibilityId("10238")).sendKeys(Key.ARROW_DOWN + Key.ENTER)
        rootDriver.quit()
    }
    async commissionControllerProperties(newControllerName: string, newControllerDescription: string, ifRedundant: boolean, newAssignedArea: string, doAutoSens: boolean) {
        let slotNumber: number
        const rootDriver = new WebDriver2;
        await rootDriver.startWithCapabilities(windowsAppDriverCapabilities("Root"), this.vm)
        await By2.nativeAccessibilityId("16662", this).clear()
        await By2.nativeAccessibilityId("16662", this).sendKeys(newControllerName) //Adding controller name 
        await By2.nativeName("RichEdit Control", this).clear()
        await By2.nativeName("RichEdit Control", this).sendKeys(newControllerDescription) //Adding descripton to controller
        await By2.nativeAccessibilityId("17210", this).clear()
        await By2.nativeAccessibilityId("17210", this).sendKeys(newAssignedArea) //Assigning controller to area
        if (ifRedundant == true) { //select if want to reduntand config
            await rootDriver.findElement(By2.nativeName("Node is redundant")).click() //click reduntant "select box"
        }
        await By2.nativeName(`OK`, this).click()//click "OK" button
        if (doAutoSens == true) {
            await rootDriver.findElement(By2.nativeName("Yes")).click() //Do autosens?
            let slotNumberRaw = await rootDriver.wait(until.elementLocated(By2.nativeAccessibilityId("65535")), 130000).getText()
            await rootDriver.wait(until.elementLocated(By2.nativeName("OK")), 130000).click()//wait for 130s to end the autosens process and click "OK"
            let slotNumberString = slotNumberRaw.replace("A card was inserted into slot:", "").trim()
            //console.log(slotNumberString)
            slotNumber = +slotNumberString;
        } else {
            slotNumber = 0
        }
        return slotNumber
    }

    async expandControllerIoTree(controllerName: string, cardName: string) {
        const rootDriver = new WebDriver2;
        await rootDriver.startWithCapabilities(windowsAppDriverCapabilities("Root"), this.vm)
        await this.doubleClick(controllerName, "Name")
        await By2.nativeName("Decommissioned Nodes", this).click()
        await this.doubleClick('I/O', "Name")
        await By2.nativeName("Decommissioned Nodes", this).click()
        await rootDriver.quit()//quit root session driver
    }
    async newProfibusDevice(
        portName: string,
        profibusDevicesGroup: string,
        profibusDeviceProducer: string,
        profibusDeviceModel: string,
        profibusDeviceVersion: string) {
        const rootDriver = new WebDriver2;
        await rootDriver.startWithCapabilities(windowsAppDriverCapabilities("Root"), this.vm)
        await this.rightClick(portName, "Name", driver)
        await rootDriver.findElement(By2.nativeName("New Profibus Device")).click()
        await rootDriver.wait(until.elementLocated(By2.nativeAccessibilityId("10225")), 500).sendKeys(profibusDevicesGroup + Key.ENTER)
        await rootDriver.wait(until.elementLocated(By2.nativeAccessibilityId("10225")), 500).sendKeys(profibusDeviceProducer + Key.ENTER)
        await rootDriver.wait(until.elementLocated(By2.nativeAccessibilityId("10225")), 500).sendKeys(profibusDeviceModel + Key.ENTER)
        await rootDriver.wait(until.elementLocated(By2.nativeAccessibilityId("10225")), 500).sendKeys(profibusDeviceVersion + Key.ENTER)
        await By2.nativeName("Decommissioned Nodes", this).click()
        await this.doubleClick(portName, "Name")
        await rootDriver.quit()//quit root session driver
    }
    async newProfibusSlot(profibusDeviceAssigned: string, parameterToRead: string) {
        const rootDriver = new WebDriver2;
        await rootDriver.startWithCapabilities(windowsAppDriverCapabilities("Root"), this.vm)
        await this.rightClick(profibusDeviceAssigned, "Name", driver)
        await rootDriver.findElement(By2.nativeName("New Profibus Slot")).click()
        await rootDriver.findElement(By2.nativeName(parameterToRead)).click()
        await rootDriver.findElement(By2.nativeName("OK")).click()
        await rootDriver.quit()//quit root session driver
    }
    async profibusDevicePortProperties(profibusDeviceAssigned: string, enabled: boolean, watchdogDisabled: boolean, slaveAddress: string, watchdogTime: string) {
        const rootDriver = new WebDriver2;
        await this.rightClick(profibusDeviceAssigned, "Name")
        await rootDriver.startWithCapabilities(windowsAppDriverCapabilities("Root"), this.vm)
        await rootDriver.findElement(By2.nativeName("Properties")).click()
        if (enabled == true) {
            await rootDriver.findElement(By2.nativeAccessibilityId("17078")).click()
        }
        await rootDriver.findElement(By2.nativeAccessibilityId("17226")).click()// enable to click list elements
        await rootDriver.findElement(By2.nativeAccessibilityId("17226")).sendKeys(Key.ARROW_DOWN)// enable to click list elements
        await rootDriver.findElement(By2.nativeName(slaveAddress)).click() //click the Card Class
        if (watchdogDisabled == true) {
            await rootDriver.findElement(By2.nativeAccessibilityId("17024")).click()
        } else {
            await By2.nativeAccessibilityId("17054", this).click()// enable to click list elements
            await By2.nativeAccessibilityId("17054", this).sendKeys(Key.ARROW_DOWN)// enable to click list elements
            await rootDriver.findElement(By2.nativeName(watchdogTime)).click() //click the Card Class
        }
        await rootDriver.findElement(By2.nativeName("OK")).click()
        await rootDriver.quit()//quit root session driver
    }
    async newProfibusSignal(slotName: string, signalDescription: string, dataType: string, signalTagName: string) {
        await this.rightClick(slotName, "Name", driver)
        const rootDriver = new WebDriver2;
        await rootDriver.startWithCapabilities(windowsAppDriverCapabilities("Root"), this.vm)
        await rootDriver.findElement(By2.nativeName("New Profibus Signal")).click()
        await By2.nativeName("RichEdit Control", this).clear()
        await By2.nativeName("RichEdit Control", this).sendKeys(signalDescription) //Adding descripton to controller
        await By2.nativeAccessibilityId("17100", this).clear()
        await By2.nativeAccessibilityId("17100", this).sendKeys(signalTagName) //Adding descripton to controller
        await By2.nativeAccessibilityId("17234", this).click()// enable to click list elements
        await rootDriver.findElement(By2.nativeName(dataType)).click() //click the Card Class
        await rootDriver.findElement(By2.nativeName("OK")).click()
        await rootDriver.quit()//quit root session driver
    }
    async downloadControlNetwork() {
        await this.rightClick("Control Network", "Name")
        const rootDriver = new WebDriver2;
        await rootDriver.startWithCapabilities(windowsAppDriverCapabilities("Root"), this.vm)
        await rootDriver.findElement(By2.nativeName("Download")).click()
        await rootDriver.findElement(By2.nativeName("Control Network")).click()
        await rootDriver.wait(until.elementLocated(By2.nativeName("Yes")), 500).click()
        await this.delay(12500)
        await rootDriver.findElement(By2.nativeAccessibilityId("8611")).click()
        await rootDriver.quit()
    }
    async decommissionController(controllerName: string) {
        await this.rightClick(controllerName, "Name")
        const rootDriver = new WebDriver2;
        await rootDriver.startWithCapabilities(windowsAppDriverCapabilities("Root"), this.vm)
        await rootDriver.findElement(By2.nativeName("Decommission")).click()
        rootDriver.quit()
    }

    // -----------     Import Export file      ------ //
    /* 
        Import Standart DeltaV Format Configuration file
        You must provide a file name with .fhx
        file should be in this default folder --> D:\DeltaV\DVData\Import-Export
    */
    async ImportStandartDeltaVFormat(fileName: string) {
        const rootDriver = new WebDriver2;
        await rootDriver.startWithCapabilities(windowsAppDriverCapabilities("Root"), this.vm)
        await By2.nativeName("File", this).click()
        await By2.nativeName("Import", this).click()
        await By2.nativeName("Standard DeltaV Format...", this).click()
        await this.delay(1000)
        let filenames = await rootDriver.findElements(By2.nativeAccessibilityId("1148"))
        for (const x in filenames) {
            await filenames[x].sendKeys(fileName + Key.ENTER)
        }
        await this.delay(3000)
        await rootDriver.findElement(By2.nativeAccessibilityId("10023")).click()
        await rootDriver.quit()
    }


    //Export Workstation Configuration 
    async ExportWorkstationConfiguration(filePath: string) { // provide the path where to save the file along with the file name(with extension)
        const rootDriver = new WebDriver2;
        rootDriver.startWithCapabilities(windowsAppDriverCapabilities("Root"), this.vm)
        await By2.nativeName("File", this).click()
        await By2.nativeName("Export", this).click()
        await By2.nativeName("Workstation Configuration...", this).click()
        await rootDriver.findElement(By2.nativeAccessibilityId("1001")).sendKeys(filePath + Key.ENTER)
        await rootDriver.quit()
    }

    //Export Selected Object  
    async ExportSelectedObject(objectName: string) {  //provide object name for export
        const rootDriver = new WebDriver2;
        rootDriver.startWithCapabilities(windowsAppDriverCapabilities("Root"), this.vm)
        await By2.nativeName(objectName, this).click()
        await By2.nativeName("File", this).click()
        await By2.nativeName("Export", this).click()
        await By2.nativeName("Selected Object...", this).click()
        await rootDriver.findElement(By2.nativeAccessibilityId("1001")).sendKeys(Key.ENTER)
        await this.delay(5000)
        await rootDriver.findElement(By2.nativeAccessibilityId("10023")).click()
        await rootDriver.quit()
    }

}
