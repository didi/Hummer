import{View, Text, Button, ViewPager, Hummer} from './../../../../api/packages/hummer-api/dist/hummer-api.es'

class RootView extends View {
    constructor() {
        super();

        this.style = {
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#FFFF00',
        }

        let textView = new Text(11);
        textView.text = "~ Hello Hummer~";
        textView.style = {
            fontSize: 20,
            color: '#FF0000',
        }

        let v = new View();
        let t = new Text();
        t.text = '111';
        v.appendChild(t);

        this.appendChild(textView);
        this.appendChild(v);


        let vv = new View();
        this.l = (event) => {
            let vvv = vv;
            this.removeChild(v);
            textView.removeEventListener('tap', this.l);
            // textView.removeEventListener('tap');
            this.l = undefined;

            // this.f(textView);

            // this.removeChild(v);
            // this.removeChild(textView);
            // v=undefined;
        }
        textView.addEventListener('tap', ()=>{});
        textView.addEventListener('tap', this.l);
        textView.addEventListener('tap', ()=>{});

        // this.removeChild(v);
        // textView.removeEventListener('tap', this.l);
        // this.l = undefined;


        // let rr = new View();
        // setTimeout(() => {
        //     // let rrr = rr;
        //     console.log('timeout');
        //     // this.removeChild(v);
        //     textView.removeEventListener('tap', this.l);
        //     this.l = undefined;
        // }, 3000);



        // Promise.resolve().then(() => {
        //     console.log('do sth');
        //     textView.removeEventListener('tap', this.l);
        //     this.l = undefined;
        // })

        console.log('end...');

        let ttt = this.getElementById(11);
        console.log('end...');
        console.log('end...');
        console.log('end...');
        console.log('end...');
        console.log('end...');
        console.log('end...');
        console.log('end...');
        console.log('end...');
        console.log('end...');
        console.log('end...');
        console.log('end...');


        Promise.resolve().then(() => {
            ttt.text = '222';
        })
    }

    f(textView) {
        // this.removeChild(v);

        // setTimeout(() => {
        //     console.log('timeout');
        //     textView.removeEventListener('tap', this.l);
        //     this.l = undefined;
        //     // this.removeChild(v);
        // }, 1000);

        textView.removeEventListener('tap', this.l);
        this.l = undefined;
    }
}

Hummer.render(new RootView());