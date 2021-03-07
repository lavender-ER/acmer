<template>
  <div>
    <div class="ui modal source edit">
      <div class="header">修改资源</div>
      <form class="ui form" style="margin: 20px;">
        <div class="field">
          <label>资源名称</label>
          <input type="text" name="name" v-model="pname">
          <label>资源描述</label>
          <textarea v-model="textarea"></textarea>
        </div>
      </form>
      <div class="actions">
        <div class="ui cancel button" @click="cancel">取消</div>
        <div class="ui approve button" @click="submitEdit">提交</div>
      </div>
    </div>

    <div class="ResourceManage">
      <span>资源管理</span>
      <div style="float: right;margin-right: 20px;bottom: 20px;">
        <el-button round @click="addResource">新增</el-button>
      </div>
      <div class="ui divider"></div>
      <div class="article">
        <ul>
          <li v-for="(item,index) in source">
            <div class="ui grid" style="width: 100%;height: 60px;">
              <div class="four wide column"><span>{{ item.name }}</span></div>
              <div class="four wide column"><span>{{ item.desc }}</span></div>
              <div class="four wide column"><span>{{ item.uploader }}</span></div>
              <div class="four wide column">
                <el-button type="primary" icon="el-icon-edit" circle @click="edit(item.id,index)"></el-button>
                <el-button type="danger" icon="el-icon-delete" circle @click="deleteItem(item.id)"
                ></el-button>
                <el-button size="small" type="primary" @click="download(item.file)">点击下载</el-button>
              </div>
            </div>
            <div class="ui divider"></div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {deleteSourceInfo, editSourceInfo, getSourceInfo} from "@/api/data";

export default {
  name: "ResourceManage",
  data() {
    return {
      value1: '', value2: '', value3: '', pid: '',
      source: [], pname: '', textarea: ''
    };
  },
  methods: {
    addResource() {
      this.$router.push('/upload');
    },
    edit(id, index) {
      this.pid = id;
      this.pname = this.source[index].name;
      this.textarea = this.source[index].desc;
      console.log(this.pid);
      $('.ui.modal.source.edit')
          .modal('show')
      ;
    }, submitEdit() {
      editSourceInfo(this.pid, this.pname, this.textarea).then(res => {
        if (res.status === 200) {
          console.log(res);
          this.$message.success("修改成功");
          $('.ui.modal.source.edit')
              .modal('hide')
          ;
        } else {
          this.$message.error("修改失败");
        }
      })
    },
    download(href) {
      window.open(href);
    },
    deleteItem(id) {
      deleteSourceInfo(id).then(res => {
        console.log(res);
        if (res.status === 200) {
          this.$message.success("删除成功");
        } else {
          this.$message.error("删除失败");
        }
      })
    }, cancel() {
      $('.ui.modal.source.edit')
          .modal('hide')
      ;
    }
  }, created() {
    getSourceInfo().then(res => {
      console.log(res);
      this.source = res.data;
      if (res.status === 200) {
        this.$message('获取数据成功!');
      } else {
        this.$message.error('获取数据失败!');
      }
    });
  }
}
</script>

<style scoped>
span {
  font-size: 18px;
}

.ResourceManage {
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
