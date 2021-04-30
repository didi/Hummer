export default {
  onShow(){
    console.log('Base Lifecycle Mixin On Show!')
  },
  onHide(){
    console.log('Base Lifecycle Mixin On Hide!')
  },
  onBack(){
    // On Back LifeCycle
    console.log('Base Lifecycle Mixin On Back!')
    console.log("this.disabledBack", this.disabledBack)
    return this.disabledBack
    // return true
  }
}