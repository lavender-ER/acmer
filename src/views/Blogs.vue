<template>
  <div class="blog">
    <div class="leftC">
      <sider-bar></sider-bar>
    </div>
    <div class="rightC">
      <BlogList :blogList="blogInfo"></BlogList>
    </div>
  </div>
</template>

<script>
import BlogsComponents from '@/components/blogs/Blogs'
import BlogList from "@/components/blogs/components/BlogList";
import SiderBar from "@/components/blogs/components/SiderBar";
import {getAlgorithms, getBlogs} from "@/api/data";

export default {
  name: "Blogs",
  components: {SiderBar, BlogList, BlogsComponents},
  data() {
    return {
      algorithm: [],
      'converter': null,
      'textarea': '',
      blogInfo: []
    }
  },
  watch: {
    'textarea': 'Changed'
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      var showdown = require('showdown');
      this.converter = new showdown.Converter();
    },
    Changed() {
      document.getElementById('show').innerHTML = this.converter.makeHtml(this.textarea);
    },
    blogChange(val) {
      console.log('blog need change:', val.id)
      this.bloglist.pop()
    },
    getAlgorithm() {
      getAlgorithms().then((res) => {
        this.menu = res.data
      })
    },
    getBlogsByAlgorithm(algorithmName) {
      getBlogs(algorithmName).then((res) => {
        this.bloglist = res.data
      })
    },
  }
}
</script>

<style scoped>
.blog {
  /*background: #f8a74b;*/
  min-height: 600px;
  height: auto;
  margin-left: 1%;
  width: 98%;
  margin-bottom: 30px;
  margin-top: 20px;
  background-color: rgba(0, 0, 0, 0.03);
}

.rightC {
  float: left;
  width: 80%;
  /*background: #00FFFF;*/
  min-height: 500px;
  height: auto;
  overflow-y: auto;
  overflow-x: hidden;
}

.leftC {
  float: left;
  width: 18%;
  /*background: antiquewhite;*/
  height: 500px;
  overflow: auto;
}

/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  background-color: #F5F5F5;
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  background-color: #F5F5F5;
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
  /*background-color: #555;*/
}
</style>
