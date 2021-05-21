export const ListMixin = {
  data() {
    return {
      curPage: 0,
      list: Array.apply(null, new Array(20)).map((item, index) => {
        return {
          name: "Index-" + index,
        };
      }),
    };
  },
  methods: {
    handleRefresh(state, list) {
      console.log("refresh state", state);
      if (state === 1) {
        console.log("下拉刷新");
      } else if (state === 2) {
        console.log("加载中");
        this.refreshList(list);
      } else {
        console.log("加载完毕");
      }
    },
    handleLoadMore(state, list) {
      console.log("loadmore state:", state);
      if (state === 0) {
        console.log("上拉加载");
      } else if (state === 1) {
        console.log("加载中...");
        this.loadMoreData(list);
      } else {
        console.log("加载完成");
      }
    },
    refreshList(list) {
      setTimeout(() => {
        this.list = Array.apply(null, new Array(10)).map((item, index) => {
          return {
            index: index,
            name: "Index Refresh - " + index,
          };
        });
        list.stopPullRefresh();
      }, 2000);
    },
    loadMoreData(list) {
      setTimeout(() => {
        this.curPage++;
        this.list = this.list.concat(
          Array.apply(null, new Array(10)).map((item, index) => {
            let i = this.curPage * 10 + index;
            return {
              index: i,
              name: "Index Refresh - " + i,
            };
          })
        );
        if (this.curPage >= 3) {
          list.stopLoadMore(false);
        } else {
          list.stopLoadMore(true);
        }
      }, 500);
    },
  },
}