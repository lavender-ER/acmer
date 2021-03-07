<template>
  <div style="background-color: rgba(0, 0, 0, 0.03);">

    <div class="ui modal info edit">
      <div class="header">修改个人信息</div>
      <div style="float: left;margin-left: 20px;">
        <el-upload
            ref="upload"
            class="upload-demo"
            style="display: inline"
            action=""
            :before-upload="beforeUploadHandle"
            :http-request="handleUploadForm"
            :auto-upload="false"
            multiple
            drag
            :limit="1"
            :on-exceed="handleExceed">
          <el-link icon="el-icon-paperclip" type="primary">请上传头像</el-link>
        </el-upload>
        <div class="field">
          <label>昵称:</label>
          <br>
          <el-input type="text" v-model="pName"></el-input>
        </div>
        <div class="field" style="margin-bottom: 30px;">
          <label>note:</label>
          <br>
          <el-input type="text" v-model="pNote"></el-input>
        </div>
      </div>
      <div class="actions" style="margin-bottom: 20px;">
        <div class="ui cancel button" @click="cancel">取消</div>
        <div class="ui approve button" @click="submitInfo">提交</div>
      </div>
    </div>

    <div style="margin-top:10px;margin-left:10%;width: 80%;min-height: 600px;height: auto;">

      <div style="width: 90%;height:auto;min-height: 600px;margin-top: 10px;">

        <div class="leftP">
          <div class="left1">
            <div class="block">
              <el-avatar :size="150" :src="ImageUrl" fit="cover"
                         style="margin-left: 40px;margin-top: 50px;"></el-avatar>
            </div>
            <el-button @click="edit" class="button-type">信息修改</el-button>
          </div>
          <div class="left2">昵称：{{ this.pName }}</div>
          <div class="left2">格言：{{ this.pNote }}</div>
          <div class="left2">文章数目：{{ this.num }}</div>
        </div>
        <div class="rightP">
          <el-table :data="article" style="width: 100%"
                    :row-class-name="tableRowClassName">
            <el-table-column
                prop="title"
                label=""
                width="400">
              <template slot-scope="scope">
                <a @click="detail(scope.row.id)" style="color:black;cursor:pointer;font-size: 16px;">{{
                    scope.row.title
                  }}</a>
              </template>
            </el-table-column>
            <el-table-column
                prop="date"
                label=""
                width="200">
            </el-table-column>
          </el-table>
        </div>

      </div>
    </div>
  </div>
</template>

<script>

import {deleteBlog, getArticleByAuthorId, getPersonInfo} from "@/api/data";

export default {
  name: "personalInfo",
  methods: {
    beforeUploadHandle(file) {
      // 校验格式
      if (
          file.type !== "image/png" &&
          file.type !== "image/jpeg"
      ) {
        this.$message.error("只支持.jpg、.jpeg、.jpe、.png文件！");
        return false;
      }
    },
    // 超出上传数量的时候调用
    handleExceed(files, fileList) {
      this.$message.warning(
          `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
              files.length + fileList.length
          } 个文件`
      );
    },
    handleUploadForm(param) {
      console.log(this.pid)
      let thisInfo = this
      let formData = new FormData()
      formData.append('file', param.file)
      formData.append('note', this.pNote)
      formData.append('name', this.pName)
      formData.append('type', param.file.type)
      formData.append('uid', param.file.uid)
      formData.append('id', this.pid)


      let loading = thisInfo.$loading({
        lock: true,
        text: '上传中，请稍候...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      thisInfo.$axios.post('api/user/update_Info/', formData).then((res) => {
        if (res.status === 200) {
          thisInfo.$message.success('修改信息成功')
        } else {
          thisInfo.$message.success('修改信息失败')
        }
        thisInfo.formFileList = []
        thisInfo.uploadFormFileList = []
        loading.close()
      })
    }
    , submitInfo() {
      if (this.pName === '' || this.pNote === '') {
        this.$message.error("请完成必要的信息");
      } else {
        this.$refs.upload.submit();
      }
    },
    tableRowClassName({row, rowIndex}) {
      if (rowIndex === 1) {
        return 'warning-row';
      } else if (rowIndex === 3) {
        return 'success-row';
      }
      return '';
    },
    detail(id) {
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
    }, getPersonalInfo(id) {
      getPersonInfo(id).then(res => {
        console.log('giao');
        console.log(res.data);
        if (res.status === 200) {
          this.ImageUrl = res.data[0].uid
          this.num = res.data[0].articles
          this.pNote = res.data[0].note
          this.pName = res.data[0].nickname

          this.$message.success('获取用户信息成功!');
        } else {
          this.$message.error('获取用户信息失败!');
        }
      })
    },
    edit() {
      $('.ui.modal.info.edit')
          .modal('show')
      ;
    },
    cancel() {
      $('.ui.modal.info.edit')
          .modal('hide')
      ;
    }
  },
  created() {
    if (sessionStorage.getItem('token') && sessionStorage.getItem('userId')) {
      var id = sessionStorage.getItem('userId');
      this.pid = id;
      this.getPersonalInfo(id);
      getArticleByAuthorId(id).then(res => {
        console.log(res);
        if (res.status === 200) {
          this.article = res.data;
          for (var i = 0; i < this.article.length; i++) {
            console.log(this.article);
            this.article[i].date = this.article[i].date.substring(0, 10);
          }

          this.$message.success("获取数据成功");
        } else {
          this.$message.error("获取数据失败");
        }
      })
    } else {
      this.$router.push('/login');
    }
    $('.special.cards .image').dimmer({
      on: 'hover'
    });
  },
  data() {
    return {
      url: '',
      article: [],
      num: '',
      note: '',
      head: '',
      pNote: '',
      pName: '',
      pid: '',
      uid: '',
      ImageUrl: '',
      nickname: ''
    }
  }
}
</script>

<style scoped>

.button-type {
  margin-left: 20%;
  margin-top: 40px;
  width: 60%;
}

.rightP {
  margin-top: 20px;
  width: 66%;
  margin-right: 20px;
  float: right;
  background-color: white;
  border-radius: 10px;
  height: auto;
  min-height: 550px;
}


.leftP {
  margin-top: 20px;
  float: left;
  width: 30%;
  border-radius: 10px;
  height: auto;
  min-height: 550px;
}

.block {
  margin-left: 2px;
}

.left1 {
  float: top;
  width: 90%;
  background-color: white;
  border-radius: 10px;
  height: auto;
  min-height: 300px;
}


.left2 {
  text-align: center;
  line-height: 50px;
  margin-top: 20px;
  width: 90%;
  background-color: white;
  border-radius: 10px;
  height: auto;
}

ul {
  list-style: none;
  margin-top: 10px;
  margin-left: 10px;
}

li {
  height: 30px;
  font-size: 18px;
  padding: 0px;
  margin-left: 0px;
}

.edit {
  width: 600px;
}
</style>
