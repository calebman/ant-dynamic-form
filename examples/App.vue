<template>
  <div id="app" class="ant-dynamic-form-container">
    <div class="header">
      <div class="logo">
        <a href="https://github.com/calebman/ant-dynamic-form">
          <img src="/logo.svg" />
        </a>
      </div>
      <div class="menus">
        <span>测试</span>
      </div>
    </div>
    <div class="main">
      <ant-dynamic-form style="height: 100%;"></ant-dynamic-form>
    </div>
    <div class="footer">
      <a href="https://github.com/calebman">Created by JianhuiChen</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style lang="less" scoped>
.ant-dynamic-form-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
  .main {
    flex: 1;
    overflow-y: auto;
  }
  .header {
    height: 60px;
    width: 100%;
    background: #096dd9e0;
    display: flex;
    padding-left: 60px;
    padding-right: 120px;
    align-items: center;
    .menus {
      flex: 1;
      text-align: right;
      & > span {
        color: #fff;
        font-size: 16px;
        cursor: pointer;
      }
    }
  }
  .footer {
    height: 35px;
    width: 100%;
    padding-left: 30px;
    padding-right: 30px;
    border-top: 1px solid #e0e0e0;
    text-align: right;
    line-height: 35px;
    background: #fafafa;
  }
}
</style>
