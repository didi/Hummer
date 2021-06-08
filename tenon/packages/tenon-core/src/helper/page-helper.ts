export type PageConfig = {
  canScroll: boolean
}


export interface PageComponent {
  onLoad: Function | null,
  onShow: Function | null,
  onHide: Function | null,
  onUnload: Function | null,
  onBack: Function | null,
  pageConfig: PageConfig | null
}