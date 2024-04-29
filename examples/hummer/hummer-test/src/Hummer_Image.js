import{View, Image, Hummer} from './../../../../api/packages/hummer-api/dist/hummer-api.es'

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

        let imageView = new Image();
        imageView.style = {
            width: 80,
            height: 80,
            resize: 'cover',
        };
        imageView.src = 'https://alliance-communityfile-drcn.dbankcdn.com/FileServer/getFile/cmtyPub/011/111/111/0000000000011111111.20240313114657.70011618161416475586236715330306:50001231000000:2800:95134C77B375895D6B23B7B31E13DF0DFC4C0FBFFAD17C691DBD3969A7F365E5.png';

        let imageView1 = new Image();
        imageView1.style = {
            width: 80,
            height: 80,
            resize: 'cover',
        };
        imageView1.gifSrc = 'https://alliance-communityfile-drcn.dbankcdn.com/FileServer/getFile/cmtyPub/011/111/111/0000000000011111111.20240313114657.42541907504511295981817123397937:50001231000000:2800:BEEA6E6886DF6058B3AC25CA788EFEB9E236D4D7BB019D6CD6F36C87BC086092.gif';
        

        let imageView2 = new Image();
        imageView2.style = {
            width: 80,
            height: 80,
            resize: 'stretch',
        };
        imageView2.load('http://xxx/test.jpg', (srcType, isSuccess) => {});
        
        imageView2.load({
            src: 'http://xxx/test.jpg',
            placeholder: 'http://xxx/holder.jpg',
            failedImage: 'http://xxx/failed.jpg'
        }, (srcType, isSuccess) => {});

        this.appendChild(imageView)
        this.appendChild(imageView1)
        this.appendChild(imageView2)
    }

}

Hummer.render(new RootView());