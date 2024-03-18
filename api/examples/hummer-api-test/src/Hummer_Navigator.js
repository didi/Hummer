import{View, Navigator, Hummer} from '../../../packages/hummer-api/dist/hummer-api.es'

export class RootView extends View {
    constructor() {
        super();

        this.style = {
            width: '100%',
            height: '100%',
            paddingLeft: 0,
            paddingRight: 0,
            paddingTop: 10,
        };

        let pageInfo = {
            id: '111',
            url: 'hummer://UPPayOneTrava',
            // url: './test.js',
            // animated: true,
            params: {
                aaa: 111,
                bbb: 222,
            }
        };
        Navigator.openPage(pageInfo, (result) => {
            console.log('Page result: ' + JSON.stringify(result));
        });
         
        // Navigator.popPage({animated: true});
         
        // Navigator.popToPage({id: '111', animated: true});
         
        // Navigator.popToRootPage({animated: true});
        
        // Navigator.popBack(2, {animated: true});


    }

}

Hummer.render(new RootView());