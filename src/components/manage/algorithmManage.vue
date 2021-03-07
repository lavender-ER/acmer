<template>
  <div class="algorithmManage">

    <div class="ui modal algorithm edit">
      <div class="header">修改文章种类</div>
      <form class="ui form" style="margin: 20px;">
        <div class="field">
          <label>类型名称</label>
          <input type="text" name="name" v-model="editAlgorithm">
        </div>
      </form>
      <div class="actions">
        <div class="ui cancel button" @click="cancel">取消</div>
        <div class="ui approve button" @click="editAlg">提交</div>
      </div>
    </div>


    <span>文章种类管理</span>
    <div class="ui divider"></div>
    <div class="bot">
      <div class="leftN">
        <ul>
          <li v-for="(item,index) in algorithm">
            <div class="ui grid" style="width: 100%;height: 100px;display: inline">
              <div style="float: left;margin-left: 20px;">
                <span>{{ item.name }}</span>
              </div>
              <div class="el-button-type">
                <el-button type="danger" icon="el-icon-delete" circle @click="deleteAlgorithm(item.id)"></el-button>
                <el-button type="primary" icon="el-icon-edit" circle @click="edit(item.id,index)"></el-button>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="rightN">
        <el-input name="add" type="text" v-model="alg" style="width: 250px;" placeholder="请输入需要添加的文章种类"></el-input>
        <el-button @click="addAlgorithm" style="margin-left: 20px;">添加</el-button>
      </div>
    </div>
  </div>
</template>

<script>

import {addType, deleteType, editType, getType} from "@/api/data";

export default {
  name: "algorithmManage",
  data() {
    return {
      algorithm: [],
      alg: '',
      editAlgorithm: '',
      pid: ''
    }
  },
  methods: {
    deleteAlgorithm(id) {
      deleteType(id).then(res => {
        if (res.status === 200) {
          this.$message.success("删除成功");
        } else {
          this.$message.error("删除失败");
        }
      })
    },
    addAlgorithm() {
      console.log(this.alg);
      addType(this.alg).then(res => {
        if (res.status === 200) {
          this.$message.success("增加成功");
        } else if (res.status === 202) {
          this.$message.error("增加失败，存在相同名称");
        } else {
          this.$message.error("增加失败，数据不合法");
        }
      })
    },
    getAlgorithm() {
      getType().then(res => {
        console.log(res);
        if (res.status === 200) {
          this.algorithm = res.data;
          this.$message.success("数据获取成功");
        } else {
          this.$message.error("数据获取失败");
        }
      })
    }, edit(id) {
      this.pid = id;
      $('.ui.modal.algorithm.edit')
          .modal('show')
      ;
    }, editAlg() {
      editType(this.pid, this.editAlgorithm).then(res => {
        console.log(res);
        if (res.status === 200) {
          this.$message.success("修改成功");
          $('.ui.modal.algorithm.edit')
              .modal('hide')
          ;
        } else {
          this.$message.error("修改失败");
        }
      })
    }, cancel() {
      $('.ui.modal.algorithm.edit')
          .modal('hide')
      ;
    }
  }, created() {
    this.getAlgorithm();
  }
}
</script>

<style scoped>
.algorithmManage {
  margin-left: 10px;
}

ul {
  list-style: none;
}

li {
  height: 70px;
}

span {
  font-size: 18px;
}

.leftN {
  float: left;
  width: 50%;
}

.rightN {
  display: inline;
  float: right;
  margin-left: 5%;
  width: 40%;
}

.el-button-type {
  float: right;
}
</style>
