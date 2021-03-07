<template>
  <div class="blogList">
    <el-table
        :data="menuData"
        style="width: 100%">
      <el-table-column
          prop="title"
          label="标题"
          width="550"
      >
        <template slot-scope="scope">
          <a @click="detail(scope.row.id)" style="color:black;cursor:pointer;font-size: 16px;">{{ scope.row.title }}</a>
        </template>
      </el-table-column>
      <el-table-column
          prop="algorithm"
          label="类型"
          width="200">
      </el-table-column>
            <el-table-column
          prop="author"
          label="作者"
          width="200">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import BlogItem from "@/components/blogs/components/BlogItem";
import {eventBus} from "@/main";
import {getAllBlogs, getArticlesByAlgId, getBlogs} from "@/api/data";

export default {
  name: "BlogList",
  components: {BlogItem},
  data() {
    return {
      menuData: [],
    }
  }, methods: {
    detail(id) {
      console.log(id);
      let router = this.$router.resolve({
        path: '/blogContent',
        query: {id: id}
      });
      window.open(router.href, '_blank');
    }
  },
  props: {},
  watch: {}, created() {
    eventBus.$on('changeType', (message) => {
      console.log(message);
      // 获取数据
      if (message === 0) {
        getAllBlogs().then(res => {
          console.log(res);
          if (res.status === 200) {
            this.menuData = res.data;
            this.$message.success("数据获取成功");
          } else {
            this.$message.error("数据获取失败");
          }
        })
      } else {
        getArticlesByAlgId(message).then(res => {
          console.log(res);
          if (res.status === 200) {
            this.menuData = res.data;
            this.$message.success("数据获取成功");
          } else {
            this.$message.error("数据获取失败");
          }
        })
      }
    })
  }
}
</script>

<style scoped>

.blogList {

}

.blogItem {
  margin-top: 20px;
}
</style>
