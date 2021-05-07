import * as Tenon from '@hummer/tenon-vue';
import app from './app.vue';
import ErrorHandler from '@hummer/vue-plugin-error-handler';

Tenon.use(ErrorHandler);
Tenon.render(app);
