<template>
  <div style="width:90%; min-height:600px;margin-left: 5%;height: auto;margin-bottom: 20px;">
    <div class="ui segment que">
      <div class="articleTitle">
        <ai></ai>
        <span class="title"
              style="margin-left: 10px;font-family: 'Nirmala UI'"><strong>{{ title }}</strong></span>
        <span class="title"
              style="float: right;margin-right: 20px;font-family: 'Nirmala UI'"><a
            style="text-decoration: none;"
            target="view_window" :href="getUrl()"><strong>去提交</strong></a></span>
      </div>
      <div class="ui divider"></div>
      <div class="section-martor" id="code" style="height: auto; min-height: 530px;">
      </div>
    </div>
  </div>
</template>


<script>
import {getAC} from "@/api/data";

export default {
  name: "dailyAC",
  data() {
    return {
      title: '获取数据未成功',
      url: [
        '#'
      ]
    }
  },
  created() {
    let thisContent = this;
    let loading = thisContent.$loading({
      lock: true,
      text: '爬取题目中，请稍候...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    this.getQ();
    loading.close();
  },
  mounted() {
    this.init();
  },
  methods: {
    getUrl() {
      return this.url
    },
    getQ() {
      getAC().then(res => {
        console.log(res.data);
        document.getElementById("code").innerHTML = res.data;
        this.title = res.title;
        this.url = res.url;
      })
    }, init() {
      var showdown = require('showdown');
      this.converter = new showdown.Converter();
    },
    Changed() {
      document.getElementById('code').innerHTML = this.converter.makeHtml(this.textarea);
    },
  }
}
</script>

<style scoped>
.que {
  width: 70%;
  margin-left: 15%;
  font-size: 18px;
  margin-top: 10px;
  background-color: #fbfcfc;
  margin-bottom: 150px;
  min-height: 500px;
  height: auto;
}

</style>
