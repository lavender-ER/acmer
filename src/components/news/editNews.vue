<template>
  <div class="NewsEdit">
    <div class="ui from">
      <div class="ui input focus">
        <input type="text" placeholder="新闻标题" style="width: 500px;" v-model="title">
      </div>
      <div class="ui buttons" style="float: right;font-size: 10px;">
        <button class="ui negative basic button" @click="cancel">取消</button>
        <button class="ui positive basic button" style="margin-left: 20px;" @click="submitNews">提交</button>
      </div>
      <div class="ui divider"></div>
      <el-input
          type="textarea"
          :rows="20"
          placeholder="新闻内容"
          v-model="newsContent"
          style="float: left;width:80%;">
      </el-input>
    </div>
  </div>
</template>

<script>
import {addNews, editNews} from "@/api/data";

export default {
  name: "editNews",
  data() {
    return {
      newsContent: '',
      title: '',
      id: '',
      author: '',
    }
  }, created() {
    this.getParams();
  }, methods: {
    getParams() {
      this.newsContent = this.$route.query.content;
      this.title = this.$route.query.title;
      this.id = this.$route.query.id;
      this.author = this.$route.query.author;
    }, cancel() {
      window.close();
    }, submitNews() {
      editNews(this.id, this.title, this.newsContent, this.author).then(res => {
        console.log(this.newsContent);
        console.log(res);
        if (res.status === 200) {
          this.$message.success("修改成功");
        } else {
          this.$message.error("修改失败");
        }
      })
    }
  }
}
</script>

<style scoped>
.NewsEdit {
  height: auto;
  min-height: 500px;
  margin-left: 10%;
  width: 80%;
  margin-bottom: 30px;
}
</style>
