import EventEmitterTest from '@bundle:com.example.hummer/hummer/src/test/EventEmitter.test';
import localUnitTest from '@bundle:com.example.hummer/hummer/src/test/LocalUnit.test';
import UtilsUrlTest from '@bundle:com.example.hummer/hummer/src/test/UtilsUrl.test';
export default function testsuite() {
    localUnitTest();
    UtilsUrlTest();
    EventEmitterTest();
}
//# sourceMappingURL=List.test.js.map