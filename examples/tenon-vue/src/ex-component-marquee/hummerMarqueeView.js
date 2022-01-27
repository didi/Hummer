import { Base, View as TenonView } from '@hummer/tenon-vue'
const { View, Text, KeyframeAnimation } = __GLOBAL__

class HummerMarqueeView extends View {
  constructor(data) {
    super();
    this.tv1 = ''
    this.tv2 = ''
    this.anim1 = null
    this.anim2 = null
    this.anim3 = null
    this.anim4 = null
    this.data = []
    this.curIndex = -1

    this.style = {
      width: '100%',
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#aaaaaa',
      overflow: 'hidden',
    }

    this.data = data;
    this.curIndex = 0;

    this.tv1 = new Text();
    this.tv1.text = this.data[this.curIndex];
    this.tv1.style = {
      position: 'absolute',
      fontSize: 30,
      color: '#000000',
    };

    this.tv2 = new Text();
    this.tv2.text = this.data[this.getNextIndex(this.curIndex)];
    this.tv2.style = {
      position: 'absolute',
      fontSize: 30,
      color: '#000000',
      marginTop: 40,
      opacity: 0,
    };

    this.appendChild(this.tv1);
    this.appendChild(this.tv2);

    this.initAnims();

    setInterval(() => {
      this.doAnim(this.tv1, this.tv2);
    }, 2000);
  }
  initAnims() {
    this.anim1 = new KeyframeAnimation('position');
    this.anim1.keyframes = [{
      percent: 0,
      value: { x: 0, y: 0 },
    }, {
      percent: 1,
      value: { x: 0, y: -40 },
    }];
    this.anim1.duration = 0.3;
    this.anim1.easing = 'ease-out';

    this.anim2 = new KeyframeAnimation('opacity');
    this.anim2.keyframes = [{
      percent: 0,
      value: 1,
    }, {
      percent: 1,
      value: 0,
    }];
    this.anim2.duration = 0.3;
    this.anim2.easing = 'ease-out';

    this.anim3 = new KeyframeAnimation('position');
    this.anim3.keyframes = [{
      percent: 0,
      value: { x: 0, y: 40 },
    }, {
      percent: 1,
      value: { x: 0, y: 0 },
    }];
    this.anim3.duration = 0.3;
    this.anim3.easing = 'ease-out';
    this.anim3.on('end', () => {
      this.tv1.style = {
        transform: 'translate(0, 40)',
      }
    });

    this.anim4 = new KeyframeAnimation('opacity');
    this.anim4.keyframes = [{
      percent: 0,
      value: 0,
    }, {
      percent: 1,
      value: 1,
    }];
    this.anim4.duration = 0.3;
    this.anim4.easing = 'ease-out';

    this.anim1.on('end', () => {
      this.curIndex = this.getNextIndex(this.curIndex);
    });
  }

  doAnim(tv1, tv2) {
    tv1.text = this.data[this.curIndex];
    tv2.text = this.data[this.getNextIndex(this.curIndex)];

    tv1.addAnimation(this.anim1, 'key1');
    tv1.addAnimation(this.anim2, 'key2');
    tv2.addAnimation(this.anim3, 'key3');
    tv2.addAnimation(this.anim4, 'key4');
  }

  getNextIndex(curIndex) {
    return (curIndex + 1) % this.data.length;
  }
}

class MarqueeView extends Base {
  constructor() {
    super()
  }
  // 页面布局的变化，会导致重新绘制，重新设定属性
  _setAttribute(key, value) {
    switch (key) {
      case 'textArray':
        this.element = new HummerMarqueeView(value)
        break;
      default:
        break;
    }
  }
}

export default {
  name: 'marquee-view',
  factory() {
    let component = new MarqueeView()
    return component
  }
}
