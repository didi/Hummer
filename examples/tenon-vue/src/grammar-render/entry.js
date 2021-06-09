import * as Tenon from '@hummer/tenon-vue';
import app from './app.vue';
import DemoComponent from './components/demo-component';

Tenon.component("DemoComponent", DemoComponent);

Tenon.render(app);
