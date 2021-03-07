<template>
  <div class="NewsManage">
    <span>新闻管理</span>
    <div style="float: right;margin-right: 20px;bottom: 20px;">
      <el-button round @click="addNews">新增</el-button>
    </div>
    <div class="ui divider"></div>
    <div class="datePicker">
      <div class="block" style="float: left">
        <el-date-picker
            v-model="value1"
            type="datetime"
            value-format="yyyy-MM-dd"
            placeholder="请选择选择开始日期">
        </el-date-picker>
      </div>
      <div class="block" style="float: left;  margin-left: 20px;">
        <el-date-picker
            v-model="value2"
            type="datetime"
            value-format="yyyy-MM-dd"
            placeholder="请选择截止日期">
        </el-date-picker>
      </div>
      <el-button round style="float: left;  margin-left: 20px;" @click="searchN">搜索</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" height="450px"
              :row-class-name="tableRowClassName">
      <el-table-column
          prop="title"
          label=""
          width="520">
        <template slot-scope="scope">
          <a @click="detail(scope.row.id)" style="color:black;cursor:pointer;font-size: 16px;">{{ scope.row.title }}</a>
        </template>
      </el-table-column>
      <el-table-column
          prop="date"
          label=""
          width="200">
      </el-table-column>
      <el-table-column
          prop="author"
          label=""
          width="200">
      </el-table-column>
    </el-table>
    <div style="text-align: center; margin-bottom: 10px;">
      <el-pagination
          @current-change="handleCurrentChange"
          :page-size="size"
          :current-page="currentPage"
          layout="prev, pager, next"
          :total="count">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {deleteNews, getNews, getNewsByPage, searchCountDown, searchNews} from "@/api/data";

export default {
  name: "NewsManage",
  data() {
    return {
      currentPage: 1,
      size: 8,
      count: 0,
      value1: '', value2: '', value3: '', pid: '', pContent: '', pTitle: '',
      tableData: []
    };
  },
  methods: {
    deleteItem(id) {
      deleteNews(id).then(res => {
        console.log(res);
        if (res.status === 200) {
          this.$message.success('删除成功!');
        } else {
          this.$message.error('删除失败!');
        }
      })
    },
    searchN() {
      if (this.value1 < this.value2) {
        searchNews(this.value1, this.value2).then(res => {
          console.log(res.data);
          // this.searchRes = res.data;
          this.tableData = res.data;
        })
      } else {
        this.$message.error("时间范围出错");
      }
    }, addNews() {
      if (sessionStorage.getItem('token')) {

        let router = this.$router.resolve({
          path: '/newsAdd',
        });
        window.open(router.href, '_blank');
      } else {
        this.$router.push('/login');
      }
    }, editNews(id, index) {
      if (sessionStorage.getItem('token')) {
        let router = this.$router.resolve({
          path: '/newsEdit',
          query: {
            content: this.searchRes[index].content,
            title: this.searchRes[index].title,
            id: id,
            author: this.searchRes[index].author,
          }
        });
        window.open(router.href, '_blank');
      } else {
        this.$router.push('/login');
      }
    },
    detail(id) {
      console.log(id);
      let router = this.$router.resolve({
        path: '/newsContent',
        query: {id: id}
      });
      window.open(router.href, '_blank');
    },
    tableRowClassName({row, rowIndex}) {
      if (rowIndex === 1) {
        return 'warning-row';
      } else if (rowIndex === 3) {
        return 'success-row';
      }
      return '';
    },
    handleCurrentChange(val) {
      getNewsByPage(this.size, val).then(res => {
        this.tableData = res.results;
        for (var i = 0; i < this.tableData.length; i++) {
          //   var date = new Date(this.article[i].date);
          //   var y = date.getFullYear();
          //   var m = date.getMonth() + 1;
          //   m = m < 10 ? ('0' + m) : m;
          //   var d = date.getDate();
          //   this.article.date[i] = y + "-" + m + "-" + d;
          // console.log(this.tableData);
          this.tableData[i].date = this.tableData[i].date.substring(0, 10);
        }
        this.count = res.count;
      })
    }
  },
  created() {
    this.handleCurrentChange(this.currentPage);
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

.NewsManage {
  margin-left: 10px;
  min-height: 600px;
  height: auto;
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
