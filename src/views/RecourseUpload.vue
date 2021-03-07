<template>
  <div class="upload">
    <span> <strong>上传资源</strong></span>
    <p>声明：请确保您上传的内容合法合规，涉及侵权内容将会被移除</p>
    <div class="ui divider"></div>
    <el-upload
        ref="upload"
        class="upload-demo"
        style="display: inline"
        drag
        action=""
        :before-upload="beforeUploadHandle"
        :http-request="handleUploadForm"
        :auto-upload="false"
        multiple
        :limit="1"
        :on-exceed="handleExceed">
      <el-link icon="el-icon-paperclip" type="primary">添加文档或视频</el-link>
    </el-upload>
    <div class="inline fields">
      <el-input placeholder="请给出一个能简单描述本文件的名字" v-model="name"></el-input>
      <span>资源描述：</span>
      <el-input
          type="textarea"
          :rows="6"
          placeholder="请输入内容"
          v-model="textarea">
      </el-input>
    </div>
    <el-button type="primary" @click="uploadRes">上传</el-button>
  </div>
</template>

<script>

export default {
  name: "RecourseUpload",
  methods: { // 上传之前
    beforeUploadHandle(file) {
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
      let thisC = this
      let formData = new FormData()
      formData.append('file', param.file)
      formData.append('desc', this.textarea)
      formData.append('name', this.name)
      formData.append('type', param.file.type)
      formData.append('uid', param.file.uid)
      formData.append('size', param.file.size)
      formData.append('uploader', sessionStorage.getItem('username'))


      let loading = thisC.$loading({
        lock: true,
        text: '上传中，请稍候...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      thisC.$axios.post('api/resource/add_resource/', formData).then((res) => {
        if (res.status === 200) {
          thisC.$message('上传文件成功')
        } else {
          thisC.$message('上传文件失败')
        }
        thisC.formFileList = []
        thisC.uploadFormFileList = []
        loading.close()
      })
    }
    , uploadRes() {
      if (this.name === '' || this.textarea === '') {
        this.$message.error("请完成必要的信息");
        return false;
      } else {
        this.$refs.upload.submit();
      }
    },
  },
  data() {
    return {
      textarea: '',
      name: ''
    }
  }
}
</script>

<style scoped>
.upload {
  width: 800px;
  height: auto;
  min-height: 500px;
  margin-left: 200px;
}

li {
  padding-top: 20px;
}

ul {
  list-style: none;
}

span {
  font-size: 20px;
  white-space: nowrap
}

p {
  float: right;
  font-size: 16px;
}
</style>
