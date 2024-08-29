import abilityTest from './Ability.test';
import EventEmitterTest from './EventEmitter.test';
import NotifyCenterTest from './NotifyCenter.test';
import HMNotifyCenterTest from './HMNotifyCenter.test';
import FixedTest from './Fixed.test';

export default function testsuite() {
  abilityTest();
  EventEmitterTest()
  NotifyCenterTest()
  HMNotifyCenterTest()
  FixedTest()
}