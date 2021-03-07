<template>
  <div class="coderManage">

    <div class="ui modal coder edit">
      <div class="header">修改集训队员</div>
      <form class="ui form" style="margin: 20px;">
        <div class="field">
          <label>队员名称</label>
          <input type="text" name="name">
        </div>
        <div class="field">
          <label>届数</label>
          <input type="text" name="year">
        </div>
        <div class="field">
          <label>上传头像</label>
          <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>

        </div>
      </form>
      <div class="actions">
        <div class="ui cancel button">取消</div>
        <div class="ui approve button">提交</div>
      </div>
    </div>

    <div class="ui modal coder">
      <div class="header">新增集训队员</div>
      <form class="ui form" style="margin: 20px;">
        <div class="field">
          <label>队员名称</label>
          <input type="text" name="name">
        </div>
        <div class="field">
          <label>届数</label>
          <input type="text" name="year">
        </div>
        <div class="field">
          <label>上传头像</label>
          <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>

        </div>
      </form>
      <div class="actions">
        <div class="ui cancel button">取消</div>
        <div class="ui approve button">提交</div>
      </div>
    </div>

    <span>队员管理</span>
    <div style="float: right;margin-right: 20px;bottom: 20px;">
      <el-button round @click="addCoder">新增</el-button>
    </div>
    <div class="ui divider"></div>
    <div class="datePicker">
      <div style="float: left;margin-left: 20px;">
        <el-select v-model="value" placeholder="请选择队员届数">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </div>
      <el-button round style="float: left;  margin-left: 20px;" @click="searchC">搜索</el-button>
    </div>
    <div class="article">
      <ul>
        <li v-for="(item,index) in coder">
          <div class="ui grid" style="width: 100%;height: 60px;">
            <div class="three wide column"><span>{{ item.name }}</span></div>
            <div class="three wide column"><span>{{ item.year }}</span></div>
            <div class="three wide column">
              <el-button type="primary" icon="el-icon-edit" circle @click="edit(item.id)"></el-button>
              <el-button type="danger" icon="el-icon-delete" circle></el-button>
            </div>
          </div>
          <div class="ui divider"></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {searchAllCoder, searchCoder} from "@/api/data";

export default {
  name: "coderManage",
  data() {
    return {
      value: '', pid: '',
      options: [{
        value: '1',
        label: '2011'
      }, {
        value: '2',
        label: '2012'
      }, {
        value: '3',
        label: '2013'
      }, {
        value: '4',
        label: '2014'
      }, {
        value: '5',
        label: '2015'
      }, {
        value: '6',
        label: '2016'
      }, {
        value: '7',
        label: '2017'
      }, {
        value: '8',
        label: '2018'
      }, {
        value: '9',
        label: '2019'
      }, {
        value: '10',
        label: '2020'
      }, {
        value: '11',
        label: '2021'
      }],
      coder: []
    };
  },
  methods: {
    addCoder() {
      $('.ui.modal.coder')
          .modal('show')
      ;
    },
    edit(id) {
      this.pid = id;
      console.log(this.pid);
      $('.ui.modal.coder.edit')
          .modal('show')
      ;
    },
    // handleAvatarSuccess(res, file) {
    //   this.imageUrl = URL.createObjectURL(file.raw);
    // },
    // beforeAvatarUpload(file) {
    //   const isJPG = file.type === 'image/jpeg';
    //   const isLt2M = file.size / 1024 / 1024 < 2;
    //
    //   if (!isJPG) {
    //     this.$message.error('上传头像图片只能是 JPG 格式!');
    //   }
    //   if (!isLt2M) {
    //     this.$message.error('上传头像图片大小不能超过 2MB!');
    //   }
    //   return isJPG && isLt2M;
    // },
    searchC() {
      searchCoder(this.value).then(res => {
        console.log(res);
      })
    }
  }, created() {
    searchAllCoder().then(res => {
      console.log(res);
      if (res.status === 200) {
        this.coder = res.data;
      } else {
        this.$message.error("数据获取失败");
      }
    })
  }

}
</script>

<style scoped>

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

span {
  font-size: 18px;
}

.datePicker {
  float: left;
}

.block {
}

.coderManage {
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
