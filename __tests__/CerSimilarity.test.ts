import assert from 'assert';
import { driver, By2, windowsAppDriverCapabilities, WebDriver2 } from 'selenium-appium'
import * as caps from './src/session_capabilities'
import * as testCTRL from './src/test_controler'
import { Key, until } from 'selenium-webdriver';
import { LegacyActionSequence } from 'selenium-webdriver/lib/actions';
jest.setTimeout(70000);

const VM_url = caps.url_DV_VM_Austin;

beforeAll(() => {
    const capabilites = windowsAppDriverCapabilities(caps.deltaVexplorerPath)
    return driver.startWithCapabilities(capabilites, VM_url);
});

afterAll(() => {
    return driver.quit();
});


test('Check Certificate Similarity',async()=>{
    const rootDriver = new WebDriver2;
    rootDriver.startWithCapabilities(windowsAppDriverCapabilities("Root"),VM_url)
      await By2.nativeAccessibilityId("10947").click()
     
      await By2.nativeName('Maximize').click()

      await testCTRL.doubleClick("PKCTLR-1E5F03", "Name", driver)
      await By2.nativeName("Decommissioned Nodes").click()
      await testCTRL.rightClick("OPC UA Server", "Name", driver)
      await testCTRL.OPCUAServerProperties(VM_url)
      await testCTRL.openNewTab(VM_url)

      let Thumbprint1 = await By2.nativeAccessibilityId("18943").getText()
      //await testCTRL.delay(50000);

      await testCTRL.doubleClick("Generate","Name", driver)
      await testCTRL.GenerateThumprint(VM_url)

     // let Thumbprint2 = "1332AE50D2AB04295125C351E1E675005DADC457"

      let Thumbprint2 = await By2.nativeAccessibilityId("18943").getText()

      console.log("similarity %: " + similarity(Thumbprint1, Thumbprint2))

      //let Thumbprint2 = await By2.nativeAccessibilityId("19008").getText()

      //assert.deepEqual(JSON.stringify(Thumbprint1),JSON.stringify(`${Thumbprint2} kdsjlwhfkjwhf`),"Thumprint not equal")
      
      //assert.deepEqual(JSON.stringify(Thumbprint1),JSON.stringify(Thumbprint2),"Thumprint not equal")
        DragEvent
  

      function checkSimilarity(){
        //-------------
        // var str1 = document.getElementById("lhsInput").value;
        // var str2 = document.getElementById("rhsInput").value;
        // document.getElementById("output").innerHTML = similarity(str1, str2);
        //-------------
      }
      
      function similarity(s1, s2) {
            var longer = s1;
            var shorter = s2;
            if (s1.length < s2.length) {
              longer = s2;
              shorter = s1;
            }
            var longerLength = longer.length;
            if (longerLength == 0) {
              return 1.0;
            }
            return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
          }
      
          function editDistance(s1, s2) {
            s1 = s1.toLowerCase();
            s2 = s2.toLowerCase();
      
            var costs = new Array();
            for (var i = 0; i <= s1.length; i++) {
              var lastValue = i;
              for (var j = 0; j <= s2.length; j++) {
                if (i == 0)
                  costs[j] = j;
                else {
                  if (j > 0) {
                    var newValue = costs[j - 1];
                    if (s1.charAt(i - 1) != s2.charAt(j - 1))
                      newValue = Math.min(Math.min(newValue, lastValue),
                        costs[j]) + 1;
                    costs[j - 1] = lastValue;
                    lastValue = newValue;
                  }
                }
              }
              if (i > 0)
                costs[s2.length] = lastValue;
            }
            return costs[s2.length];
          }

})

