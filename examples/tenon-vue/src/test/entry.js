import * as Tenon from '@hummer/tenon-vue';
import app from './app.vue';

import VRtl from './directives/v-rtl'

Tenon.directive('rtl', VRtl)

Tenon.render(app);
