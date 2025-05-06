//globalObj -> Hummer -> document
export function renderFunc(__Hummer__, __GLOBAL__) {
    let Hummer = __Hummer__;
    let doc = Hummer.document;
    let v = doc.createElement('View')
    doc.render(v);
    v.addEventListener('tap');
    v.setStyles(
        {'backgroundColor': 'linear-gradient(90deg #00DC3200 #00C3C2FF)',
            'shadow': '5 5 10 #000000',
            'width':300,
            'height':500
        }
    )


    // {
    // for(let i = 0; i<100;i++){
    //     let v2 = doc.createElement('View')
    //   v2.setStyles(
    //     {'backgroundColor':"#000000",
    //       'width':50,
    //       'height':50
    //     }
    //   )
    //   v.appendChild(v2)
    // }
    //
    // }

    let v2 = doc.createElement('Image')
    v2.setAttributes({'src':'https://pics5.baidu.com/feed/96dda144ad345982388c07eb677393a5caef84d1.jpeg?token=107954507c353194c02ec41b734b1762'})
    v2.setStyles(
        {
            'width':50,
            'height':50,
        }
    )
    v.appendChild(v2)

    let v3 = doc.createElement('Button')
    v3.setAttributes({'text':'我是按钮', pressed: {
        backgroundColor: 'red'
    }})
    v3.setStyles({
        color:'#000000',
        'width':100,
        'height':20,
        backgroundColor: 'red'
    })
    v.appendChild(v3)

    let isFixed = false;
    v.setEventTarget((e)=>{
        if(e == 'tap'){
            // v.setStyles(
            //   {
            //     backgroundColor: isFixed ? 'red' : 'blue'
            //   }
            // )
            // v2.setStyles(
            //   {
            //     position:isFixed?'fixed':'flex',
            //   }
            // )
            // isFixed = !isFixed;
            //动态设置样式
            popPage();

            //动画
            // addAnimation();

        }
    })
    function addAnimation() {
        v.addAnimation({
            property: 'rotationZ',
            duration:2,
            value: '90deg',
            type:'basic'
            // 线性运动｜ 先加速后减速（结束时会特别慢）｜ 加速运动｜ 减速运动 ｜ 先加速后减速
        }
        );
    }
    function popPage(params) {
        let pageInfo = {
            id: '111',
            // url: 'hummer://UPPayOneTrava',
            url: 'http://172.23.161.84:9292/Test_Page.js',
            animated: true,
            params: {
                aaa: 111,
                bbb: 222,
            }
        };
        let nav = doc.createComponent('Navigator')
        nav.invoke('popPage', pageInfo, (result) => {
            console.log('Page result: ' + JSON.stringify(result));
        })
    }
}