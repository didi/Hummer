import { HMEntrance, HMEntranceController, HarmonyRuntimeContentProvider , IPageData} from 'hummer';
import {renderFunc} from '../unit_test/Comp_View_Touch'

@Entry
@Component
export struct Template_Comp_View_Touch {

  public pageData?:IPageData;
  private entranceController: HMEntranceController = new HMEntranceController();
  aboutToAppear(): void {
  }

  aboutToDisappear(): void {

  }

  onBackPress(): boolean | void {
    return this.entranceController.onBackPress();
  }
  onPageShow(): void {
    this.entranceController.onPageShow();
  }

  onPageHide(): void {
    this.entranceController.onPageHide();
  }
  build() {
    NavDestination() {
      HMEntrance({controller:this.entranceController, pageData:this.pageData, contentProvider:new HarmonyRuntimeContentProvider(renderFunc)})
        // .backgroundColor(Color.Red)
        .width('100%')
        .height('100%')
    }
    .onBackPressed(() => {
      if(this.onBackPress()){
        return true;
      }
      return false;
    })
    .onShown(()=>{
      this.onPageShow();
    })
    .onHidden(()=>{
      this.onPageHide();
    })
  }
}