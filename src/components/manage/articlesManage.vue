<template>
  <div class="articlesManage">
    <span>ArticlesManage</span>
    <div class="ui divider"></div>
    <div class="datePicker">
      <div class="block" style="float: left">
        <el-date-picker
            v-model="value1"
            type="datetime"
            value-format="yyyy-MM-dd"
            placeholder="请选择开始时间">
        </el-date-picker>
      </div>
      <div class="block" style="float: left;  margin-left: 20px;">
        <el-date-picker
            v-model="value2"
            type="datetime"
            value-format="yyyy-MM-dd"
            placeholder="请选择截止时间">
        </el-date-picker>
      </div>
      <div style="float: left;margin-left: 20px;">
        <el-select v-model="value3" placeholder="请选择文章种类">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </div>
      <el-button round style="float: left;  margin-left: 20px;" @click="search">搜索</el-button>
    </div>
    <div class="article">
      <ul>
        <li v-for="(item,index) in article">
          <div class="ui grid" style="width: 100%;height: 60px;">
            <div class="six wide column">
              <a @click="detail(item.id)" style="color:black;cursor:pointer;font-size: 16px;">{{ item.title }}</a>
            </div>
            <div class="three wide column">{{ item.date }}</div>
            <div class="two wide column">{{ item.author }}</div>
            <div style="margin-left: 150px;">
              <el-button type="danger" icon="el-icon-delete" circle @click="deleteItem(item.id)"></el-button>
            </div>
          </div>
          <div class="ui divider"></div>
        </li>
      </ul>
    </div>
    <div class="block" style="margin-left: 30%;margin-top: 20px;">
    </div>
  </div>
</template>

<script>
import {deleteBlog, getAllBlogs, getBlogs, searchNews} from "@/api/data";

export default {
  name: "articlesManage",
  data() {
    return {
      value1: '', value2: '', value3: '',
      options: [],
      article: [],
    };
  },
  methods: {
    search() {
      if (this.value1 < this.value2) {
        var alg = '';
        if (this.value3 === '') {
          alg = 'all'
        } else {
          alg = this.value3;
        }
        getBlogs(this.value1, this.value2, alg).then(res => {
          if (res.status === 200) {
            this.article = res.data;
            this.$message.success("查询成功");
          } else {
            this.$message.error("查询失败");
          }
        })
      } else {
        this.$message.error("时间范围出错");
      }
    }, detail(id) {
      console.log(id);
      let router = this.$router.resolve({
        path: '/blogContent',
        query: {id: id}
      });
      window.open(router.href, '_blank');
    },
    deleteItem(id) {
      deleteBlog(id).then(res => {
        console.log(res);
        if (res.status === 200) {
          this.$message.success('删除成功!');
        } else {
          this.$message.error('删除失败!');
        }
      })
    }
  },
  created() {
    getAllBlogs().then(res => {
          if (res.status === 200) {
            this.article = res.data;
            for (var i = 0; i < this.article.length; i++) {
              console.log(this.article);
              this.article[i].date = this.article[i].date.substring(0, 10);
            }
            this.$message.success("获取数据成功");
          } else {
            this.$message.error("获取数据成功");
          }
        }
    )
  }
}
</script>

<style scoped>
span {
  font-size: 18px;
}

.datePicker {
  float: left;
}

.block {
}

.articlesManage {
  margin-left: 10px;
}

ul {
  list-style: none;
  margin: 2px;
  padding: 2px;
}

li {
}

.article {
  margin-top: 20px;
}
</style>
