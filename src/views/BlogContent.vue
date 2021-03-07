<template>
  <div class="blogContent">
    <div class="ui card" style="float:left;margin-left: 5%;width: 60%;margin-top: 30px;margin-bottom: 10px;">
      <div class="articleTitle">
        <ai></ai>
        <span class="title"
              style="margin-left: 20px;font-family: 'Nirmala UI'"><strong>{{ this.title }}</strong></span>
      </div>
      <div class="content" id="show">
      </div>
    </div>
    <div style="float: right;margin-left: 2%;width: 30%;margin-top: 30px;margin-bottom: 10px;">
      <sui-card style="width: 90%;left: 5%">
        <sui-card-content>
          <div class="coders" style="margin-left: 0;">
            <ai></ai>
            <span class="title" style="margin-left: 0;"><strong>TOP ARTICLES</strong></span></div>
          <div class="ui divider"></div>
          <sui-list>
            <sui-list-item v-for="(item, key) in topArticle">
              <div style="justify-items: center">
                <span style="font-size: 18px">
                <a @click="detail(item.id)">{{ item.title }}</a>
                </span>
              </div>
              <div class="ui divider"></div>
            </sui-list-item>
          </sui-list>
        </sui-card-content>

      </sui-card>
    </div>
  </div>

</template>

<script>
import TopArticle from "@/components/home/components/TopArticles";
import {getArticleById, getTopArticle} from "@/api/data";

export default {
  name: "BlogContent",
  components: {TopArticle},
  watch: {
    'text': 'Changed'
  },
  mounted() {
    this.init();
  },
  data() {
    return {
      content: '',
      converter: null,
      topArticle: [],
      id: '',
      title: '',
    }
  }, methods: {
    detail(id) {
      let router = this.$router.resolve({
        path: '/blogContent',
        query: {id: id}
      });
      window.open(router.href, '_blank');
    },
    init() {
      var showdown = require('showdown');
      this.converter = new showdown.Converter();
    }, getParams() {
      this.id = this.$route.query.id;
      getArticleById(this.id).then(res => {
        console.log(res);
        if (res.status === 200) {
          this.$message.success("数据获取成功");
          this.content = res.data[0].content;
          this.title = res.data[0].title;
          document.getElementById('show').innerHTML = this.converter.makeHtml(this.content);
        } else {
          this.$message.error("数据获取失败");
        }
      })
    }
  }, created() {
    this.getParams();
    this.init();
    getTopArticle().then(res => {
      this.topArticle = res.data;
    });
  },
}
</script>

<style scoped>
.commentDiv {
  transition: height 2s;
  -moz-transition: height 2s; /* Firefox 4 */
  -webkit-transition: height 2s; /* Safari 和 Chrome */
  -o-transition: height 2s; /* Opera */
  margin-left: 10%;
  width: 80%;
  margin-top: 1px;
  margin-bottom: 50px;
}

.articleTitle {
  height: 60px;
  line-height: 60px;
  background: #fff;
  border-bottom: #f4f5f8 2px solid;
  position: relative;
  font-size: 18px;
  font-family: "Nirmala UI";
}

.blogContent {
  height: auto;
  min-height: 500px;
  overflow-y: auto;
  overflow-x: hidden;
  margin-bottom: 30px;
}

a {
  font-size: 20px;
}

.auth {
  font-size: 20px;
  font-family: 'Nirmala UI';
}
</style>
