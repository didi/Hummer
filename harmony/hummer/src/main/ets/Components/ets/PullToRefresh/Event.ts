import { timestamp } from '../../../Utils/Utils';
import { HMEvent } from '../../Event';

export const OnRefreshEventName = 'onRefresh'
export const OnLoadMoreEventName = 'onLoadMore'


export enum RefreshEventState {
  start = 0, // 开始下拉/上拉
  loading,// 开始加载/刷新
  end,//上拉/下拉结束
  noMore//没有更多,只有下拉
}


export interface RefreshEvent extends HMEvent<RefreshEventState> {}
export interface LoadMoreEvent extends HMEvent<RefreshEventState> {}

export function createRefreshEvent(state: RefreshEventState) : RefreshEvent {

  const event:RefreshEvent = {
    type : OnRefreshEventName,
    state : state,
    timestamp : timestamp(),
  }
  return event;
}

export function createLoadMoreEvent(state: RefreshEventState) : LoadMoreEvent {

  const event:LoadMoreEvent = {
    type : OnLoadMoreEventName,
    state : state,
    timestamp : timestamp(),
  }
  return event;
}