export class RefreshLoadMoreInfoClass {
    isVisiblePullDown: boolean = false;
    isVisiblePullUpLoad: boolean = false;
    pullDownRefreshHeight: number = 70;
    pullUpLoadHeight: number = 70;
    offsetY: number = 0;
    hasMore: boolean = true;
    startIndex = 0;
    endIndex = 0;
    downY = 0;
    lastMoveY = 0;
    isRefreshing: boolean = false;
    isCanRefresh = false;
    isPullRefreshOperation = false;
    isLoading: boolean = false;
    isCanLoadMore: boolean = false;
    isReachStart: boolean = false;
    isReachEnd: boolean = false;
}
export class CommonConstant {
    /**
     * The off set coefficient.
     */
    static readonly Y_OFF_SET_COEFFICIENT: number = 0.1;
    /**
     * The refresh and load height.
     */
    static readonly CUSTOM_LAYOUT_HEIGHT: number = 70;
    /**
     * The animation delay time.
     */
    static readonly DELAY_ANIMATION_DURATION: number = 300;
    /**
     * The delay time.
     */
    static readonly DELAY_TIME: number = 1000;
    /**
     * The animation duration.
     */
    static readonly ANIMATION_DURATION: number = 2000;
    /**
     * The http timeout duration.
     */
    static readonly HTTP_READ_TIMEOUT: number = 10000;
    /**
     * The NewsGrid constants.
     */
    static readonly NewsGrid_MARGIN_LEFT: string = '3.5%';
    static readonly NewsGrid_MARGIN_RIGHT: string = '3.5%';
    static readonly NewsGrid_MARGIN_TOP: string = '5.1%';
    static readonly NewsGrid_WIDTH: string = '93%';
    static readonly NewsGrid_HEIGHT: string = '31.5%';
    static readonly NewsGrid_ASPECT_RATIO: number = 4;
    static readonly NewsGrid_COLUMNS_GAP: number = 5;
    static readonly NewsGrid_ROWS_TEMPLATE: string = '1fr';
    static readonly NewsGrid_IMAGE_BORDER_RADIUS: number = 8;
    /**
     * The RefreshLayout constants.
     */
    static readonly RefreshLayout_MARGIN_LEFT: string = '40%';
    static readonly RefreshLayout_TEXT_MARGIN_BOTTOM: number = 1;
    static readonly RefreshLayout_TEXT_MARGIN_LEFT: number = 7;
    static readonly RefreshLayout_TEXT_FONT_SIZE: number = 17;
    static readonly RefreshLayout_IMAGE_WIDTH: number = 18;
    static readonly RefreshLayout_IMAGE_HEIGHT: number = 18;
    /**
     * The NoMoreLayout constants.
     */
    static readonly NoMoreLayoutConstant_NORMAL_PADDING: number = 8;
    static readonly NoMoreLayoutConstant_TITLE_FONT: string = '16fp';
    /**
     * The RefreshConstant constants.
     */
    static readonly RefreshConstant_DELAY_PULL_DOWN_REFRESH: number = 50;
    static readonly RefreshConstant_CLOSE_PULL_DOWN_REFRESH_TIME: number = 150;
    static readonly RefreshConstant_DELAY_SHRINK_ANIMATION_TIME: number = 500;
    /**
     * Grid column templates.
     */
    static readonly GRID_COLUMN_TEMPLATES: string = '1fr ';
    /**
     * List offset unit.
     */
    static readonly LIST_OFFSET_UNIT: string = 'px';
}
/**
 * The refresh state enum.
 */
export const enum RefreshState {
    DropDown = 0,
    Release = 1,
    Refreshing = 2,
    Success = 3,
    Fail = 4
}
export function listTouchEvent(refreshLoadMoreInfo: RefreshLoadMoreInfoClass, event: TouchEvent) {
    switch (event.type) {
        case TouchType.Down:
            refreshLoadMoreInfo.downY = event.touches[0].y;
            refreshLoadMoreInfo.lastMoveY = event.touches[0].y;
            break;
        case TouchType.Move:
            if ((refreshLoadMoreInfo.isRefreshing === true) || (refreshLoadMoreInfo.isLoading === true)) {
                return;
            }
            let isDownPull = event.touches[0].y - refreshLoadMoreInfo.lastMoveY > 0;
            if (((isDownPull === true) || (refreshLoadMoreInfo.isPullRefreshOperation === true)) && (refreshLoadMoreInfo.isCanLoadMore === false)) {
                // Finger movement, processing pull-down refresh.
                touchMovePullRefresh(refreshLoadMoreInfo, event);
            }
            else {
                // Finger movement, processing load more.
                touchMoveLoadMore(refreshLoadMoreInfo, event);
            }
            refreshLoadMoreInfo.lastMoveY = event.touches[0].y;
            break;
        case TouchType.Cancel:
            break;
        case TouchType.Up:
            if ((refreshLoadMoreInfo.isRefreshing === true) || (refreshLoadMoreInfo.isLoading === true)) {
                return;
            }
            if ((refreshLoadMoreInfo.isPullRefreshOperation === true)) {
                // Lift your finger and pull down to refresh.
                touchUpPullRefresh(refreshLoadMoreInfo);
            }
            else {
                // Fingers up, handle loading more.
                touchUpLoadMore(refreshLoadMoreInfo);
            }
            break;
        default:
            break;
    }
}
export function touchMovePullRefresh(refreshLoadMoreInfo: RefreshLoadMoreInfoClass, event: TouchEvent) {
    if (refreshLoadMoreInfo.isReachStart) {
        refreshLoadMoreInfo.isPullRefreshOperation = true;
        let height = vp2px(refreshLoadMoreInfo.pullDownRefreshHeight);
        refreshLoadMoreInfo.offsetY = event.touches[0].y - refreshLoadMoreInfo.downY;
        // The sliding offset is greater than the pull-down refresh layout height, and the refresh condition is met.
        if (refreshLoadMoreInfo.offsetY >= height) {
            pullRefreshState(refreshLoadMoreInfo, 1);
            refreshLoadMoreInfo.offsetY = height + refreshLoadMoreInfo.offsetY * 0.1;
        }
        else {
            pullRefreshState(refreshLoadMoreInfo, 0);
        }
        if (refreshLoadMoreInfo.offsetY < 0) {
            refreshLoadMoreInfo.offsetY = 0;
            refreshLoadMoreInfo.isPullRefreshOperation = false;
        }
    }
}
export function touchUpPullRefresh(refreshLoadMoreInfo: RefreshLoadMoreInfoClass) {
    if (refreshLoadMoreInfo.isCanRefresh === true) {
        refreshLoadMoreInfo.offsetY = vp2px(refreshLoadMoreInfo.pullDownRefreshHeight);
        pullRefreshState(refreshLoadMoreInfo, 2);
        setTimeout(() => {
            let self: RefreshLoadMoreInfoClass = refreshLoadMoreInfo;
            closeRefresh(self, true);
            // TODO: 调用业务刷新函数
        }, 1000);
    }
    else {
        closeRefresh(refreshLoadMoreInfo, false);
    }
}
export function pullRefreshState(refreshLoadMoreInfo: RefreshLoadMoreInfoClass, state: number) {
    switch (state) {
        case 0:
            refreshLoadMoreInfo.isCanRefresh = false;
            refreshLoadMoreInfo.isRefreshing = false;
            refreshLoadMoreInfo.isVisiblePullDown = true;
            break;
        case 1:
            refreshLoadMoreInfo.isCanRefresh = true;
            refreshLoadMoreInfo.isRefreshing = false;
            break;
        case 2:
            refreshLoadMoreInfo.offsetY = vp2px(refreshLoadMoreInfo.pullDownRefreshHeight);
            refreshLoadMoreInfo.isCanRefresh = true;
            refreshLoadMoreInfo.isRefreshing = true;
            break;
        case 3:
            refreshLoadMoreInfo.isCanRefresh = true;
            refreshLoadMoreInfo.isRefreshing = true;
            break;
        case 4:
            refreshLoadMoreInfo.isCanRefresh = true;
            refreshLoadMoreInfo.isRefreshing = true;
            break;
        default:
            break;
    }
}
export function closeRefresh(refreshLoadMoreInfo: RefreshLoadMoreInfoClass, isRefreshSuccess: boolean) {
    let self = refreshLoadMoreInfo;
    setTimeout(() => {
        let delay = 50;
        if (self.isCanRefresh === true) {
            pullRefreshState(refreshLoadMoreInfo, isRefreshSuccess ? 3 : 4);
            delay = 500;
        }
        self.offsetY = 0;
        pullRefreshState(refreshLoadMoreInfo, 0);
        self.isVisiblePullDown = false;
        self.isPullRefreshOperation = false;
        // animateTo({
        //   duration: 150,
        //   delay: delay,
        //   onFinish: () => {
        //     pullRefreshState(refreshLoadMoreInfo, RefreshState.DropDown);
        //     self.isVisiblePullDown = false;
        //     self.isPullRefreshOperation = false;
        //     self.isReachStart = false;
        //   }
        // }, () => {
        //   self.offsetY = 0;
        // })
    }, self.isCanRefresh ? 300 : 0);
}
export function touchMoveLoadMore(refreshLoadMoreInfo: RefreshLoadMoreInfoClass, event: TouchEvent) {
    if (refreshLoadMoreInfo.isReachEnd) {
        refreshLoadMoreInfo.offsetY = event.touches[0].y - refreshLoadMoreInfo.downY;
        if (Math.abs(refreshLoadMoreInfo.offsetY) > vp2px(refreshLoadMoreInfo.pullUpLoadHeight) / 2) {
            refreshLoadMoreInfo.isCanLoadMore = true;
            refreshLoadMoreInfo.isVisiblePullUpLoad = true;
            refreshLoadMoreInfo.offsetY = -vp2px(refreshLoadMoreInfo.pullUpLoadHeight) + refreshLoadMoreInfo.offsetY * 0.1;
        }
    }
}
export function touchUpLoadMore(refreshLoadMoreInfo: RefreshLoadMoreInfoClass) {
    let self: RefreshLoadMoreInfoClass = refreshLoadMoreInfo;
    Context.animateTo({
        duration: 2000,
    }, () => {
        self.offsetY = 0;
    });
    if ((self.isCanLoadMore === true) && (self.hasMore === true)) {
        self.isLoading = true;
        setTimeout(() => {
            closeLoadMore(refreshLoadMoreInfo);
            // TODO: 业务加载函数
        }, 1000);
    }
    else {
        closeLoadMore(self);
    }
}
export function closeLoadMore(refreshLoadMoreInfo: RefreshLoadMoreInfoClass) {
    refreshLoadMoreInfo.isCanLoadMore = false;
    refreshLoadMoreInfo.isLoading = false;
    refreshLoadMoreInfo.isVisiblePullUpLoad = false;
}
