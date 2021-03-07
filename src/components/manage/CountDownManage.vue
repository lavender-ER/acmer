<template>
  <div class="CountDownManage">

    <div class="ui modal countDown edit">
      <div class="header">修改倒计时</div>
      <form class="ui form" style="margin: 20px;">
        <div class="field">
          <label>竞赛名称</label>
          <input type="text" v-model="EditName">
        </div>
        <div class="field">
          <label>报名网站</label>
          <input type="text" v-model="EditLink">
        </div>
        <div class="field">
          <label>比赛时间</label>
          <div class="block">
            <el-date-picker
                v-model="value5"
                type="date"
                value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </div>
        </div>
      </form>
      <div class="actions">
        <div class="ui cancel button" @click="cancelEdit">取消</div>
        <div class="ui approve button" @click="submitEdit">提交</div>
      </div>
    </div>

    <div class="ui modal countDown">
      <div class="header">新增倒计时</div>
      <form class="ui form" style="margin: 20px;">
        <div class="field">
          <label>竞赛名称</label>
          <input type="text" v-model="nameCountDown">
        </div>
        <div class="field">
          <label>报名网站</label>
          <input type="text" v-model="linkCountDown">
        </div>
        <div class="field">
          <label>比赛时间</label>
          <div class="block">
            <el-date-picker
                v-model="value4"
                type="date"
                value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </div>
        </div>
      </form>
      <div class="actions">
        <div class="ui cancel button">取消</div>
        <div class="ui approve button" @click="addC">提交</div>
      </div>
    </div>

    <span>倒计时管理</span>
    <div style="float: right;margin-right: 20px;bottom: 20px;">
      <el-button round @click="add">新增</el-button>
    </div>
    <div class="ui divider"></div>
    <div class="datePicker">
      <div class="block" style="float: left">
        <!--        <span class="demonstration">开始时间:&ensp;</span>-->
        <el-date-picker
            v-model="value1"
            type="datetime"
            value-format="yyyy-MM-dd"
            placeholder="请选择选择开始日期">
        </el-date-picker>
      </div>
      <div class="block" style="float: left;  margin-left: 20px;">
        <!--        <span class="demonstration">截止时间:&ensp;</span>-->
        <el-date-picker
            v-model="value2"
            type="datetime"
            value-format="yyyy-MM-dd"
            placeholder="请选择截止日期">
        </el-date-picker>
      </div>
      <el-button round style="float: left;  margin-left: 20px;" @click="searchC">搜索</el-button>
    </div>
    <div class="article">
      <ul>
        <li v-for="(item,index) in searchRes">
          <div class="ui grid" style="width: 100%;height: 60px;">
            <div class="eight wide column">
              <router-link target="_blank" :to="item.sign">{{ item.name }}</router-link>
            </div>
            <div class="four wide column"><span>{{ item.date }}</span></div>
            <div class="four wide column">
              <el-button type="danger" icon="el-icon-delete" circle @click="deleteC(item.id)"></el-button>
              <el-button type="primary" icon="el-icon-edit" circle @click="edit(item.id,index)"></el-button>
            </div>
          </div>
          <div class="ui divider"></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {addBooks, addCountDown, deleteCountDown, editCountDown, getCountDown, searchCountDown} from "@/api/data";

export default {
  name: "CountDownManage",
  data() {
    return {
      value1: '', value2: '', value3: '', value4: '', pid: '', value5: '',
      nameCountDown: '',
      linkCountDown: '',
      searchRes: [],
      EditName: '',
      EditLink: ''
    };
  },
  methods: {
    add() {
      $('.ui.modal.countDown')
          .modal('show')
      ;
    },
    cancelEdit() {
      $('.ui.modal.countDown.edit')
          .modal('hide')
      ;
    },
    edit(id, index) {
      this.value5 = this.searchRes[index].date;
      this.EditLink = this.searchRes[index].sign;
      this.EditName = this.searchRes[index].name;
      this.pid = id;
      $('.ui.modal.countDown.edit')
          .modal('show')
      ;
    },
    submitEdit() {
      editCountDown(this.pid, this.EditLink, this.EditName, this.value5).then(res => {
        console.log(res);
        if (res.status === 200) {
          this.$message.success("修改成功");
          $('.ui.modal.countDown.edit')
              .modal('hide')
          ;
        } else {
          this.$message.error("修改数据不合法!!!");
        }
      })
    },
    searchC() {
      console.log(this.value1);
      console.log(this.value2);
      if (this.value1 < this.value2) {
        searchCountDown(this.value1, this.value2).then(res => {
          console.log(res.data);
          this.searchRes = res.data;
        })
      } else {
        this.$message.error("时间范围出错");
      }
    },
    addC() {
      var name = this.nameCountDown;
      var link = this.linkCountDown;
      console.log(name);
      console.log(link);
      if (name === '' || link === '' || this.value4 === '') {
        this.$message.error('请完成需要填写的信息');
        return false;
      } else {
        addCountDown(name, link, this.value4).then(res => {
          console.log(res);
          if (res.status === 200) {
            this.$message('添加成功!');
            $('.ui.modal.countDown')
                .modal('hide')
            ;

          } else {
            this.$message.error('添加失败');
          }
        })
      }
    },
    deleteC(id) {
      deleteCountDown(id).then(res => {
        console.log(res);
        if (res.code === 200) {
          this.$message('删除成功!');
        } else {
          this.$message.error('删除失败!');
        }
      })
    }
  }, created() {
    getCountDown().then(res => {
      console.log(res);
      if (res.status === 200) {
        this.$message.success("获取数据成功");
        this.searchRes = res.data
      } else {
        this.$message.error("获取数据失败");
      }
    })
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

.CountDownManage {
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
