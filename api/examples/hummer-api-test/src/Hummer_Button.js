import{View, Button, Hummer, Storage} from '../../../packages/hummer-api/dist/hummer-api.es'

export class RootView extends View {
    constructor() {
        super();

        this.style = {
            width: '100%',
            height: '100%',
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 10,
        };

        let button = new Button();
        button.text = '按钮文案';
        // button.disabled = true

    
        button.style = {
            width: 300,
            height: 40,
            fontFamily: 'New Times Roma',
            color: '#000000',
        };
        
        button.pressed= {
            backgroundColor: '#FF0000',
            color: '#FFFF00',
        };
        
        // button.disabled = {
        //     backgroundColor: '#0000FF',
        //     color: '#00FFFF',
        // };




        let storage = new Storage()
        
        // storage.exist('daijiaStorage', (res) => {
        //     console.log("----storage查询成功", JSON.stringify(res))
        // })
   
        let isSet = storage.set('daijiaStorage1', JSON.stringify({name:'hummer1', other:'hummer_api1'}))

        console.log("----isSet1storage是否设置成功", JSON.stringify(isSet))


        let isSet2 = storage.set('daijiaStorage2', JSON.stringify({name:'hummer2', other:'hummer_api2'}))

        console.log("----isSet2storage是否设置成功",JSON.stringify(isSet2))



        button.addEventListener('tap', (event) => {
            console.log('my button clicked');
            button.text =  button.text + "1"
            let res1 = storage.exist('daijiaStorage1')
            console.log("----获取到的数据1",JSON.stringify(res1))

            let res2 = storage.get('daijiaStorage2')
            console.log("----获取到的数据2",JSON.stringify(res2))
    
        });

        let button2 = new Button();
        button.text = '按钮文案2';
        // button.disabled = true

    
        button2.style = {
            width: 200,
            height: 50,
            fontFamily: 'New Times Roma',
            color: '#000000',
            marginTop: 10
        };

        button2.addEventListener('tap', (event) => {
         
            storage.remove('daijiaStorage1')
    

            let res1 = storage.get('daijiaStorage1')
            console.log("删除后获取----获取到的数据1",JSON.stringify(res1))
    
        });
      


        this.appendChild(button)
        this.appendChild(button2)
    }

}

Hummer.render(new RootView());