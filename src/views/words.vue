<template>
  <div style="height: 600px;width: 100%;">
    <div style="height:600px;width: 20%;float: left;">
      <div class="ui action input" style="margin-top: 10px;margin-left: 5px;">
        <input v-model="txt" placeholder="请输入需要查询的单词">
        <button id="btn" @click="check" class="ui icon button"
                style="width: 40px;height: 40px;text-align: center">
          <i class="search icon"></i>
        </button>
      </div>
      <div class="ui middle aligned animated list" id="words"
           style="margin-top: 20px;margin-left: 20px;font-family: 'Nirmala UI';font-size: 16px;">
        <div class="item" v-for="(item,index) in value">
          <div style="margin-top: 20px;">
            <a>{{ item }}</a>
          </div>
        </div>
      </div>

    </div>
    <div style="height:520px;width: 80%;float: right;">
      <div class="tableStyle">

        <el-table
            :data="tableData"
            style="width: 100%">
          <el-table-column
              prop="words"
              label="单词"
              width="400">
          </el-table-column>
          <el-table-column
              prop="meaning"
              label="释义"
              width="400">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import {getMeaning, getWords} from "@/api/data";

export default {
  name: "words",
  created() {
    let thisContent = this;
    let loading = thisContent.$loading({
      lock: true,
      text: '爬取题目中，请稍候...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    getWords().then(res => {
      if (res.status === 200) {
        this.tableData = res.data;
      } else {
        this.$message('单词获取失败！！！');
      }
    });
    loading.close();
  }, data() {
    return {
      tableData: [],
      value: [],
      txt: ''
    }
  }, methods: {
    check() {
      if (this.txt === '') {
        this.$message.error('请输入要查询的单词');
      } else {
        getMeaning(this.txt).then(res => {
          if (res.data.length === 0) {
            this.$message.error("未查询到");
          }
          this.value = res.data;
        })
      }
    }
  }
}
</script>

<style scoped>
.tableStyle {
  background-color: white;
  height: 500px;
  float: right;
  width: 900px;
  margin-left: 10px;
  margin-top: 20px;
  margin-right: 50px;
  border: none;
}
</style>
