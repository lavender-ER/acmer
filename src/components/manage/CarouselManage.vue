<template>
  <div class="CarouselManage">
    <div>
      <span>轮播图管理</span>
      <div style="float: right;margin-right: 20px;bottom: 20px;">
        <el-button round @click="">新增</el-button>
      </div>
      <div class="ui divider"></div>
    </div>
    <div>
      <div class="rightC">
        <el-upload
            ref="upload"
            class="upload-demo"
            style="display: inline;width: 100%"
            drag
            action=""
            :before-upload="beforeUploadHandle"
            :http-request="handleUploadForm"
            :auto-upload="false"
            multiple
            :limit="1"
            :on-exceed="handleExceed">
          <el-link icon="el-icon-paperclip" type="primary">添加轮播图，一次仅支持上传一个</el-link>
        </el-upload>
        <el-button type="primary" @click="uploadCar">上传</el-button>
      </div>
      <div class="leftC">
        <ul>
          <li v-for="(item,index) in carousel">
            <div>
              <el-image
                  style="width: 100px; height: 100px"
                  :src="item.image"
                  fit="contain"></el-image>
              <el-button type="danger" icon="el-icon-delete" circle @click="deleteItem(item.id)"
                         style="float: right;margin-right: 20px;margin-top: 30px;"
              ></el-button>
            </div>
            <div style="float: right;margin-right: 200px;top: 20px;">
            </div>
            <div class="ui divider"></div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {deleteCarouselInfo, getCarouselInfo} from "@/api/data";

export default {
  name: "CarouselManage",
  methods: { // 上传之前
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
      let thisC = this
      let formData = new FormData()
      formData.append('file', param.file)
      formData.append('type', param.file.type)
      formData.append('uid', param.file.uid)


      let loading = thisC.$loading({
        lock: true,
        text: '上传中，请稍候...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      thisC.$axios.post('../api/carousel/add_carousel/', formData).then((res) => {
        if (res.status === 200) {
          thisC.$message('上传文件成功')
        } else {
          thisC.$message('上传文件失败')
        }
        thisC.formFileList = []
        thisC.uploadFormFileList = []
        loading.close()
      })
    }, uploadCar() {
      if (this.name === '' || this.textarea === '') {
        this.$message.error("请完成必要的信息");
        return false;
      } else {
        this.$refs.upload.submit();
      }
    }, deleteItem(id) {
      deleteCarouselInfo(id).then(res => {
        console.log(res);
        if (res.status === 200) {
          this.$message.success("删除成功");
        } else {
          this.$message.error("删除失败");
        }
      })
    }
  },
  created() {
    getCarouselInfo().then(res => {
      console.log(res);
      if (res.status === 200) {
        this.carousel = res.data;
        this.$message('获取数据成功!');
      } else {
        this.$message.error('获取数据失败!');
      }
    });
  }, data() {
    return {
      carousel: []
    }
  }
}
</script>

<style scoped>
.CarouselManage {
  margin-left: 10px;
}


span {
  font-size: 18px;
}

.leftC {
  border-radius: 10px;
  margin-left: 3%;
  float: left;
  height: auto;
  min-height: 600px;
  width: 45%;
}

.rightC {
  margin-right: 3%;
  float: right;
  min-height: 600px;
  width: 45%;
}

ul {
  list-style: none;
  height: 130px;
  margin-top: 20px;
  margin-left: 20px;
}
</style>
