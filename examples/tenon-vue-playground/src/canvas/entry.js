import * as Tenon from '@hummer/tenon-vue';
import ExCanvas from '@hummer/vue-plugin-canvas';
import app from './app';

Tenon.register(ExCanvas);
Tenon.render(app);
