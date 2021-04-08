import * as Tenon from '@hummer/tenon-vue';
import app from './app.vue';
import LifeMixin1 from "./mixins/life-mixin1";

Tenon.mixin(LifeMixin1);
Tenon.render(app);
