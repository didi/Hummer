import * as Tenon from '@hummer/tenon-vue';
import app from './app.vue';

import ExWebview from './plugin/webView';
Tenon.register(ExWebview);

Tenon.render(app);
