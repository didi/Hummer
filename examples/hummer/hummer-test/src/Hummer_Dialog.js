import{View, Hummer, Dialog} from './../../../../api/packages/hummer-api/dist/hummer-api.es'

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

        let dialog = new Dialog();

        // 显示提示对话框
        dialog.alert("test");
        dialog.alert("test", "OK", () => {
            Toast.show('ok click');
        });
        
        // 显示确认对话框
        dialog.confirm("title", "test");
        dialog.confirm("title", "test", "OK", "Cancel",
            () => {
                Toast.show('ok click');
            }, () => {
                Toast.show('cancel click');
            });
        
        // 显示等待对话框
        dialog.loading("loading...");
        
        // 显示自定义对话框
        let view = new View();
        view.style = {
            width: 200,
            height: 100,
            backgroundColor: '#FF0000',
        }
        view.addEventListener('tap', (event) => {
            // 关闭对话框
            dialog.dismiss();
        })
        dialog.custom(view);

    }

}

Hummer.render(new RootView());