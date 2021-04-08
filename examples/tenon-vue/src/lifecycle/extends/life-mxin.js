export default {
  name: "Name",
  onShow(){
    console.log('Extends LifeCycle OnShow')
  },
  onLoad(){
    console.log('Extends LifeCycle onLoad')
  },
  onBack(){
    // On Back LifeCycle
    console.log('Extends onBack LifeCycle')
    // return true
  }
}