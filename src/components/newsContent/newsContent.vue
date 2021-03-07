<template>
  <div style="height: 600px; min-width: 1200px;">
    <div class="leftN">
      <div class="ui piled segment">
        <h4 class="ui header">{{ this.title }}</h4>
        <div class="content" id="show">
        </div>
      </div>
    </div>
    <div class="rightN">
      <div class="block">
        <span class="demonstration">默认 Hover 指示器触发</span>
        <el-carousel height="150px">
          <el-carousel-item v-for="item in 4" :key="item">
            <h3 class="small">{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="articleTitle" style="margin-left: 0px;">
        <span class="title" style="font-size:20px;margin-left: 0px;"><strong>TOP NEWS</strong></span></div>
      <div class="ui divider"></div>
      <sui-list>
        <sui-list-item v-for="(item, key) in topNews" class="suiItem">
          <div style="justify-items: center">
                <span style="font-size: 18px">
                <a @click="detail(item.id)">{{ item.title }}</a>
                </span>
            <span style="float:right;font-size: 18px;margin-right: 50px;">{{ item.author }}</span>
          </div>
          <div class="ui divider"></div>
        </sui-list-item>
      </sui-list>
    </div>

  </div>

</template>

<script>
import {getArticleById, getNews, getNewsById, getTopArticle, getTopNews} from "@/api/data";

export default {
  name: "newsC",
  data() {
    return {
      topNews: [],
      title: '',
      id: ''
    }
  },
  methods: {
    init() {
      var showdown = require('showdown');
      this.converter = new showdown.Converter();
    }, getParams() {
      this.id = this.$route.query.id;
      console.log("id" + this.id);
      getNewsById(this.id).then(res => {
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
    },
    getData() {
      getTopNews().then(res => {
            console.log(res);
            this.topNews = res.data;
          }
      );
    },
    detail(id) {
      console.log(id);
      let router = this.$router.resolve({
        path: '/newsContent',
        query: {id: id}
      });
      window.open(router.href, '_blank');
    }
  }, created() {
    this.getParams();
    this.init();
    this.getData();
  },
}
</script>

<style scoped>
.leftN {
  float: left;
  margin-left: 100px;
  width: 600px;
  margin-top: 20px;
  min-height: 500px;
}

.rightN {
  float: right;
  width: 450px;
  margin-top: 20px;
  min-height: 500px;
  margin-left: 50px;
}
</style>
