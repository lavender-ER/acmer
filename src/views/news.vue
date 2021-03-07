<template>
  <div style="overflow: auto">
    <div style="height: 600px; min-width: 1200px;">
      <div class="leftN">
        <div class="coders" style="margin-left: 0;width: 700px;">
          <span class="title" style="margin-left: 0;font-size: 20px;"><strong>ACM NEWS</strong></span></div>
        <el-table :data="tableData" style="width: 100%;height: 450px;"
                  :row-class-name="tableRowClassName">
          :row-class-name="tableRowClassName">
          <el-table-column
              prop="title"
              label=""
              width="500">
            <template slot-scope="scope">
              <a @click="detail(scope.row.id)" style="color:black;cursor:pointer;font-size: 16px;">{{
                  scope.row.title
                }}</a>
            </template>
          </el-table-column>
          <el-table-column
              prop="author"
              label=""
              width="100">
          </el-table-column>
        </el-table>
        <div style="text-align: center; margin-bottom: 10px;float: bottom">
          <el-pagination
              @current-change="handleCurrentChange"
              :page-size="size"
              :current-page="currentPage"
              layout="prev, pager, next"
              :total="count">
          </el-pagination>
        </div>
      </div>
      <div class="rightN">
        <div class="block">
          <el-carousel height="250px">
            <el-carousel-item v-for="item in carousel" :key="item">
              <el-image :src="item.image"></el-image>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="articleTitle" style="margin-left: 0px;margin-top: 20px;">
          <span class="title" style="font-size:20px;margin-left: 0px;"><strong>TOP NEWS</strong></span></div>
        <div class="ui divider"></div>
        <sui-list>
          <sui-list-item v-for="(item, key) in topNews" class="suiItem">
            <div style="justify-items: center">
                <span style="font-size: 18px">
                <a @click="detail(item.id)">{{ item.title }}</a>
                </span>
            </div>
            <div class="ui divider"></div>
          </sui-list-item>
        </sui-list>
      </div>
    </div>
  </div>
</template>

<script>
import {getCarouselInfo, getNewsByPage, getTopNews} from "@/api/data";

export default {
  name: "news",
  data() {
    return {
      currentPage: 1,
      tableData: [],
      topNews: [],
      // pageSize: 6,
      size: 8,
      count: 0,
      carousel: ''
    }
  },
  methods: {
    tableRowClassName({row, rowIndex}) {
      if (rowIndex === 1) {
        return 'warning-row';
      } else if (rowIndex === 3) {
        return 'success-row';
      }
      return '';
    },
    getData() {
      getTopNews().then(res => {
            if (res.status === 200) {
              this.topNews = res.data;
              this.$message.success("数据获取成功");
            } else {
              this.$message.error("数据获取失败");
            }
          }
      );
      getCarouselInfo().then(res => {
        if (res.status === 200) {
          this.carousel = res.data
          this.$message.success("数据获取成功");
        } else {
          this.$message.error("数据获取失败");
        }
      });
    },
    handleCurrentChange(val) {
      getNewsByPage(this.size, val).then(res => {
        this.tableData = res.results;
        this.count = res.count;
      })
    },
    detail(id) {
      console.log(id);
      let router = this.$router.resolve({
        path: '/newsContent',
        query: {id: id}
      });
      window.open(router.href, '_blank');
    }
  },
  created() {
    this.handleCurrentChange(this.currentPage);
    this.getData();
  }
}
</script>

<style scoped>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}

.leftN {
  float: left;
  margin-left: 100px;
  width: 600px;
  margin-top: 20px;
  height: 500px;
}

.rightN {
  float: right;
  width: 450px;
  margin-top: 20px;
  min-height: 500px;
  margin-left: 50px;
}

body {
  margin: 0px;
  width: 100%;
  min-width: 1500px;
  max-width: 100%;
  height: 100%;
  background-color: #F0F0F0;
}

#head {
  background-color: #FFFF00;
  width: 100%;
  height: 100px;
}

#center {
  background-color: #00FFFF;
  width: 100%;
  min-height: 100%;
}

#foot {
  background-color: #FF00FF;
  width: 100%;
  height: 100px;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>
