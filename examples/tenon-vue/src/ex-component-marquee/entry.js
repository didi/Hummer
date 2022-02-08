import * as Tenon from '@hummer/tenon-vue';
import app from './app';

import MarqueeView from './hummerMarqueeView.js';
Tenon.register(MarqueeView);

Tenon.render(app);
