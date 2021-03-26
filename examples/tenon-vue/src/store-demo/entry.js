import * as Tenon from '@hummer/tenon-vue';
import app from './app.vue';
import store from './store';

Tenon.use(store);
Tenon.render(app);
