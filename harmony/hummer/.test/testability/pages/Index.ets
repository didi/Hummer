import hilog from '@ohos.hilog';
import AbilityDelegatorRegistry from '@ohos.app.ability.abilityDelegatorRegistry'

import {Hypium} from '@ohos/hypium'
import testsuite from '../../../src/test/List.test'

@Entry
@Component
struct Index1 {
    aboutToAppear()
    {
        console.info('[LOCAL_TEST] START')
        let abilityDelegator: AbilityDelegatorRegistry.AbilityDelegator;
        abilityDelegator = AbilityDelegatorRegistry.getAbilityDelegator();
        let abilityDelegatorArguments: AbilityDelegatorRegistry.AbilityDelegatorArgs;
        abilityDelegatorArguments = AbilityDelegatorRegistry.getArguments();
        abilityDelegatorArguments.bundleName = "com.example.hummer";
        abilityDelegatorArguments.parameters = {
            "-b": "com.example.hummer",
            "-m": "hummer",
            "-s class": "EventEmitterTest#testOnEmitOff",
            "-s timeout": "15000",
            "-s coverage": "false"
        };
        abilityDelegatorArguments.testCaseNames = "EventEmitterTest#testOnEmitOff"
        console.info("[LOCAL_TEST] " + abilityDelegatorArguments);
        Hypium.hypiumTest(abilityDelegator, abilityDelegatorArguments, testsuite)
        console.info('[LOCAL_TEST] END')
    }
@State
    message
:
    string = 'Hello World'
    build()
    {
        Row()
        {
            Column()
            {
                Text(this.message)
                    .fontSize(50)
                    .fontWeight(FontWeight.Bold)
                Button()
                {
                    Text('next page')
                        .fontSize(20)
                        .fontWeight(FontWeight.Bold)
                }
            .
                type(ButtonType.Capsule)
                    .margin({
                        top: 20
                    })
                    .backgroundColor('#0D9FFB')
                    .width('35%')
                    .height('5%')
                    .onClick(() => {
                    })
            }
        .
            width('100%')
        }
    .
        height('100%')
    }
}