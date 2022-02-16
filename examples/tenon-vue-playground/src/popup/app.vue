<template>
  <view class="page">
    <CommonPage
      titleText="Popup"
      :showDisplayLayout="false"
      :showOption="false"
    >
      <template v-slot:content>
        <view class="demo-container">
          <view class="demo-item">
            <view class="operation-container">
              <button class="btn" @tap="openDialog(1)">打开弹窗1</button>
              <button class="btn" @tap="openDialog(2)">打开弹窗2</button>
            </view>
          </view>
        </view>
        <dialog
          :show="showPopup"
          title="PopupOne"
          @close="closeDialog(1)"
        ></dialog>
        <dialog
          :show="showPopup2"
          title="PopupTwo"
          @close="closeDialog(2)"
        ></dialog>
      </template>
    </CommonPage>
  </view>
</template>
<style lang="less" scoped>
.demo-container {
  margin-top: 0.2rem;
  .demo-item {
    background-color: #ffffff;
    width: 100%;
    margin-bottom: 0.2rem;
    padding: 0.2rem 0;
    .operation-container {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .btn {
        flex: 1;
        margin: 0 0.2rem;
        height: 0.8rem;
        text-align: center;
        color: white;
        background: #fa9153;
        border-radius: 0.1rem;
        margin-top: 0.1rem;
      }
    }
  }
}
</style>

<script>
import CommonPage from "../component/CommonPage.vue";
import Dialog from "./components/dialog";
export default {
  components: {
    Dialog,
    CommonPage,
  },
  data() {
    return {
      showPopup: true,
      showPopup2: false,
    };
  },
  methods: {
    openDialog(type) {
      if (type === 1) {
        this.showPopup = true;
      } else if (type === 2) {
        this.showPopup2 = true;
      }
    },
    closeDialog(type) {
      if (type === 1) {
        this.showPopup = false;
      } else if (type === 2) {
        this.showPopup2 = false;
      }
    },
  },
};
</script>