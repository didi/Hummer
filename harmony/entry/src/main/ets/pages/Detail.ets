@Entry
@Component
export struct Detail {
   public stackPath!: NavPathStack;
  aboutToAppear(): void {

  }
  build() {
    NavDestination() {
      Row() {
        Column() {
          Text('replacePath')
            .fontSize(50)
            .fontColor(Color.Red)
            .fontWeight(FontWeight.Bold)
            .onClick(()=>{
              this.stackPath.replacePath({name:'Detail'})
            })
          Text('pop')
            .fontSize(50)
            .fontColor(Color.Red)
            .fontWeight(FontWeight.Bold)
            .onClick(()=>{
              this.stackPath.pop()
            })
          Text('push')
            .fontSize(50)
            .fontColor(Color.Red)
            .fontWeight(FontWeight.Bold)
            .onClick(()=>{
              this.stackPath.pushPath({name:'Detail'})
            })
          Text('get')
            .fontSize(50)
            .fontColor(Color.Red)
            .fontWeight(FontWeight.Bold)
            .onClick(()=>{
              const pages = this.stackPath.getAllPathName();
              console.log(JSON.stringify(pages));
            })
        }
        .width('100%')
      }
      .height('100%')
    }
  }
}