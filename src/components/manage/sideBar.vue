<template>
  <div class="sideBar">
    <el-col :span="20">
      <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose">
        <el-menu-item index="1" @click="messageContent('1')">
          <i class="el-icon-menu"></i>
          <span slot="title">博客管理</span>
        </el-menu-item>
        <el-menu-item index="2" @click="messageContent('2')">
          <i class="el-icon-menu"></i>
          <span slot="title">友情链接管理</span>
        </el-menu-item>
        <el-menu-item index="3" @click="messageContent('3')">
          <i class="el-icon-menu"></i>
          <span slot="title">倒计时管理</span>
        </el-menu-item>
        <el-menu-item index="4" @click="messageContent('4')">
          <i class="el-icon-menu"></i>
          <span slot="title">新闻管理</span>
        </el-menu-item>
        <el-menu-item index="5" @click="messageContent('5')">
          <i class="el-icon-menu"></i>
          <span slot="title">资源管理</span>
        </el-menu-item>
<!--        <el-menu-item index="6" @click="messageContent('6')">-->
        <!--          <i class="el-icon-menu"></i>-->
        <!--          <span slot="title">ACM队员管理</span>-->
        <!--        </el-menu-item>-->
        <el-menu-item index="7" @click="messageContent('7')">
          <i class="el-icon-menu"></i>
          <span slot="title">推荐书籍管理</span>
        </el-menu-item>
        <el-menu-item index="8" @click="messageContent('8')">
          <i class="el-icon-menu"></i>
          <span slot="title">文章种类管理</span>
        </el-menu-item>
        <el-menu-item index="9" @click="messageContent('9')">
          <i class="el-icon-menu"></i>
          <span slot="title">轮播图管理</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </div>
</template>

<script>
import {eventBus} from '@/main'

function messageContent(ele) {
  var index = ele.getAttribute('index');
  console.log(index);
  eventBus.$emit('changeSide', index);
}

export default {
  name: "sideBar",
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    messageContent(index) {
      // var index = ele.getAttribute('index');
      console.log(index);
      eventBus.$emit('changeSide', index);
    },
  }
}
</script>

<style scoped>
.sideBar {
  margin-top: 20px;
  /*height: auto;*/
  /*min-height: 550px;*/
}

</style>
