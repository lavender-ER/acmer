<template>
  <div class="sideBar">
    <el-col :span="20">
      <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose">
        <el-menu-item index="index" @click="messageType(item.id)" v-for="(item,index) in algorithm">
          <i class="el-icon-menu"></i>
          <span slot="title">{{ item.name }}</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </div>

</template>

<script>
import {eventBus} from '@/main'
import {getType} from "@/api/data";

export default {
  name: "SiderBar",
  props: {},
  watch: {}, created() {
    getType().then(res => {
      if (res.status === 200) {
        console.log(res);
        this.algorithm = res.data;
        this.$message.success("获取数据成功");
      } else {
        this.$message.error("获取数据失败");
      }
    });
  },
  methods: {
    change(item, index) {
      this.$emit('blogChange', {
        id: item
      })
    },
    messageType(index) {
      eventBus.$emit('changeType', index);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    messageContent(index) {
      eventBus.$emit('changeSide', index);
    },
  }, data() {
    return {
      algorithm: []
    }
  },
}
</script>

<style scoped>
.siderBar {
  background-color: white;
}
</style>
