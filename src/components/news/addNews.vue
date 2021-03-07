<template>
  <div class="NewsAdd">
    <div class="ui from">
      <div class="ui input focus">
        <input type="text" placeholder="请输入新闻标题" style="width: 500px;" v-model="title">
      </div>
      <div class="ui buttons" style="float: right;font-size: 10px;">
        <button class="ui negative basic button" @click="cancel">取消</button>
        <button class="ui positive basic button" style="margin-left: 20px;" @click="submitNews">提交</button>
      </div>
      <div class="ui divider"></div>
      <el-input
          type="textarea"
          :rows="20"
          placeholder="请输入新闻内容"
          v-model="newsContent"
          style="float: left;width:80%;">
      </el-input>
    </div>
  </div>
</template>

<script>
import {addNews} from "@/api/data";

export default {
  name: "addNews",
  data() {
    return {
      newsContent: '',
      title: '',
      author: 'admin',
    }
  }, methods: {
    cancel() {
      window.close();
    }, submitNews() {
      addNews(this.title, this.newsContent, this.author).then(res => {
        if (res.status === 200) {
          this.$message.success("添加成功");
        } else {
          this.$message.error("添加失败");
        }
      })
    }
  }
}
</script>

<style scoped>
.NewsAdd {
  height: auto;
  min-height: 500px;
  margin-left: 10%;
  width: 80%;
  margin-bottom: 30px;
}
</style>
