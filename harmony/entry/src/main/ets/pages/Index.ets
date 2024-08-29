import { HMEntrance, HMEntranceController, HarmonyRuntimeContentProvider , IPageData, EventEmitter} from 'hummer';

import {renderFunc} from '../unit_test/Module_NotifyCenter'
// import { Template_HelloWorld } from '../template/Template_HelloWorld';
// import { Template_Comp_View } from '../template/Template_Comp_View';
// import { Template_Comp_Text } from '../template/Template_Comp_Text';
// import { Template_Comp_Button } from '../template/Template_Comp_Button';
// import { Template_Comp_Image } from '../template/Template_Comp_Image';
// import { Template_Comp_Input } from '../template/Template_Comp_Input';
// import { Template_Comp_Dialog } from '../template/Template_Comp_Dialog';
// import { Template_Comp_Toast } from '../template/Template_Comp_Toast';
// import { Template_Comp_View_Layout } from '../template/Template_Comp_View_Layout';
// import { Template_Comp_Scroller } from '../template/Template_Comp_Scroller';
// import { Template_Comp_View_Child } from '../template/Template_Comp_View_Child';
// import { Template_Comp_RichText } from '../template/Template_Comp_RichText';
// import { Template_Comp_View_Deg } from '../template/Template_Comp_View_Deg';
// import { Template_Comp_Navigator_Page1 } from '../template/Template_Comp_Navigator_Page1';
// import { Template_Comp_Navigator_Page2 } from '../template/Template_Comp_Navigator_Page2';
// import { Template_Comp_Navigator_Page3 } from '../template/Template_Comp_Navigator_Page3';
// import { Template_Module_Lifecycle } from '../template/Template_Module_Lifecycle';
// import { Template_Module_Memory } from '../template/Template_Module_Memory';
// import { Template_Module_Storage } from '../template/Template_Module_Storage';
// import { Template_Module_Request } from '../template/Template_Module_Request';
// import { Template_Module_Timer } from '../template/Template_Module_Timer';
// import { Template_Module_NotifyCenter } from '../template/Template_Module_NotifyCenter';
// import { Template_Comp_Animation } from '../template/Template_Comp_Animation';
// import { Template_Comp_Canvas } from '../template/Template_Comp_Canvas';
// import { Template_Comp_HorizontalScroller } from '../template/Template_Comp_HorizontalScroller';
// import { Template_Comp_Image_base64 } from '../template/Template_Comp_Image_base64';
// import { Template_Comp_Input_Type } from '../template/Template_Comp_Input_Type';
// import { Template_Comp_Layout } from '../template/Template_Comp_Layout';
// import { Template_Comp_List } from '../template/Template_Comp_List';
// import { Template_Comp_Transform } from '../template/Template_Comp_Transform';
// import { Template_Comp_View_Touch } from '../template/Template_Comp_View_Touch';
// import { Template_Module_WebSocket } from '../template/Template_Module_WebSocket';
// import { Template_Test_Env } from '../template/Template_Test_Env';

@Entry
@Component
struct Index {
  @State pageInfos: NavPathStack = new NavPathStack()
  private controller = new HMEntranceController();
  aboutToAppear(): void {
  }

  aboutToDisappear(): void {
  }
  build() {


    Navigation(this.pageInfos) {
      HMEntrance(
        {
          controller: this.controller,
          pageData:
          {
            pageInfo: undefined,
            navStack: this.pageInfos,
          },
          contentProvider: new HarmonyRuntimeContentProvider(renderFunc)
        })
        .width('100%')
        .height('100%')
    }.hideTitleBar(true)
    .title('NavIndex').navDestination(this.PageMap)
  }

  @Builder
  PageMap(name: string, param: IPageData){
    // if (param.pageInfo?.url.includes("HelloWorld.js")) {
    //   Template_HelloWorld({pageData: param});
    // } else if (param.pageInfo?.url.includes("Comp_View.js")) {
    //   Template_Comp_View({pageData: param});
    // } else if (param.pageInfo?.url.includes("Comp_View_Layout.js")) {
    //   Template_Comp_View_Layout({pageData: param});
    // } else if (param.pageInfo?.url.includes("Comp_View_Child.js")) {
    //   Template_Comp_View_Child({pageData: param});
    // } else if (param.pageInfo?.url.includes("Comp_View_Deg.js")) {
    //   Template_Comp_View_Deg({pageData: param});
    // } else if (param.pageInfo?.url.includes("Comp_View_Touch.js")) {
    //   Template_Comp_View_Touch({pageData: param});
    // } else if (param.pageInfo?.url.includes("Comp_Text.js")) {
    //   Template_Comp_Text({pageData: param});
    // } else if (param.pageInfo?.url.includes("Comp_RichText.js")) {
    //   Template_Comp_RichText({pageData: param});
    // } else if (param.pageInfo?.url.includes("Comp_Button.js")) {
    //   Template_Comp_Button({pageData: param});
    // } else if (param.pageInfo?.url.includes("Comp_Image.js")) {
    //   Template_Comp_Image({pageData: param});
    // } else if (param.pageInfo?.url.includes("Comp_Image_base64.js")) {
    //   Template_Comp_Image_base64({pageData: param});
    // } else if (param.pageInfo?.url.includes("Comp_Input.js")) {
    //   Template_Comp_Input({pageData: param});
    // } else if (param.pageInfo?.url.includes("Comp_Input_Type.js")) {
    //   Template_Comp_Input_Type({pageData: param});
    // } else if (param.pageInfo?.url.includes("Comp_Scroller.js")) {
    //   Template_Comp_Scroller({pageData: param});
    // } else if (param.pageInfo?.url.includes("Comp_HorizontalScroller.js")) {
    //   Template_Comp_HorizontalScroller({pageData: param});
    // } else if (param.pageInfo?.url.includes("Comp_List.js")) {
    //   Template_Comp_List({pageData: param});
    // } else if (param.pageInfo?.url.includes("Comp_Layout.js")) {
    //   Template_Comp_Layout({pageData: param});
    // } else if (param.pageInfo?.url.includes("Comp_Dialog.js")) {
    //   Template_Comp_Dialog({pageData: param});
    // } else if (param.pageInfo?.url.includes("Comp_Toast.js")) {
    //   Template_Comp_Toast({pageData: param});
    // } else if (param.pageInfo?.url.includes("Comp_Navigator_Page1.js")) {
    //   Template_Comp_Navigator_Page1({pageData: param});
    // } else if (param.pageInfo?.url.includes("Comp_Navigator_Page2.js")) {
    //   Template_Comp_Navigator_Page2({pageData: param});
    // } else if (param.pageInfo?.url.includes("Comp_Navigator_Page3.js")) {
    //   Template_Comp_Navigator_Page3({pageData: param});
    // } else if (param.pageInfo?.url.includes("Comp_Animation.js")) {
    //   Template_Comp_Animation({pageData: param});
    // } else if (param.pageInfo?.url.includes("Comp_Transform.js")) {
    //   Template_Comp_Transform({pageData: param});
    // } else if (param.pageInfo?.url.includes("Comp_Canvas.js")) {
    //   Template_Comp_Canvas({pageData: param});
    // } else if (param.pageInfo?.url.includes("Module_Lifecycle.js")) {
    //   Template_Module_Lifecycle({pageData: param});
    // } else if (param.pageInfo?.url.includes("Module_Memory.js")) {
    //   Template_Module_Memory({pageData: param});
    // } else if (param.pageInfo?.url.includes("Module_Storage.js")) {
    //   Template_Module_Storage({pageData: param});
    // } else if (param.pageInfo?.url.includes("Module_Request.js")) {
    //   Template_Module_Request({pageData: param});
    // } else if (param.pageInfo?.url.includes("Module_Timer.js")) {
    //   Template_Module_Timer({pageData: param});
    // } else if (param.pageInfo?.url.includes("Module_NotifyCenter.js")) {
    //   Template_Module_NotifyCenter({pageData: param});
    // } else if (param.pageInfo?.url.includes("Module_WebSocket.js")) {
    //   Template_Module_WebSocket({pageData: param});
    // } else if (param.pageInfo?.url.includes("Test_Env.js")) {
    //   Template_Test_Env({pageData: param});
    // }
  }
}