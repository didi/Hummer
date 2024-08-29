import localUnitTest from './LocalUnit.test';
import UtilsUrlTest from './UtilsUrl.test';

export default function testsuite() {
  localUnitTest();
  UtilsUrlTest();
}