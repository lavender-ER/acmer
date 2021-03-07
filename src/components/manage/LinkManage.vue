<template>
  <div class="LinksManage">

    <div class="ui modal link edit">
      <div class="header">修改链接</div>
      <form class="ui form" style="margin: 20px;">
        <div class="field">
          <label>链接名称</label>
          <el-input type="text" name="name" v-model="pName"></el-input>
        </div>
        <div class="field">
          <label>链接地址</label>
          <el-input type="text" name="publisher" v-model="pUrl"></el-input>
        </div>
      </form>
      <div class="actions">
        <div class="ui cancel button" @click="cancelEdit">取消</div>
        <div class="ui approve button" @click="editSubmit">提交</div>
      </div>
    </div>

    <div class="ui modal link">
      <div class="header">新增链接</div>
      <form class="ui form" style="margin: 20px;">
        <div class="field">
          <label>链接名称</label>
          <el-input type="text" v-model="addName"></el-input>
        </div>
        <div class="field">
          <label>链接地址</label>
          <el-input type="text" v-model="addUrl"></el-input>
        </div>
      </form>
      <div class="actions">
        <div class="ui cancel button" @click="cancel">取消</div>
        <div class="ui approve button" @click="addLinkI">提交</div>
      </div>
    </div>


    <span>LinksManage</span>
    <div style="float: right;margin-right: 20px;bottom: 20px;">
      <el-button round @click="addU">新增</el-button>
    </div>
    <div class="ui divider"></div>


    <ul>
      <li v-for="(item,index) in links">
        <div class="ui grid" style="width: 100%;height: 60px;">
          <div class="eight wide column">
            <router-link target="_blank" :to="item.url">{{ item.name }}</router-link>
          </div>
          <div class="four wide column" style="float: right;margin-right: 20px">
            <el-button type="danger" icon="el-icon-delete" circle @click="deleteLink(item.id)"></el-button>
            <el-button type="primary" icon="el-icon-edit" circle @click="editLink(item.id,index)"></el-button>
          </div>
        </div>
        <div class="ui divider"></div>
      </li>
    </ul>


    <!--    <sui-list>-->
    <!--      <sui-list-item v-for="(item, index) in links">-->
    <!--        <div style="display: flex">-->
    <!--          <span style="color:gray;font-size: 18px">{{ item.name }}</span>-->
    <!--          <span style="color:gray;font-size: 18px">{{ item.url }}</span>-->
    <!--          <el-button type="danger" icon="el-icon-delete" circle @click="deleteLink(item.id)"></el-button>-->
    <!--          <el-button type="primary" icon="el-icon-edit" circle @click="editLink(item.id,index)"></el-button>-->
    <!--          <div class="ui divider"></div>-->
    <!--        </div>-->
    <!--      </sui-list-item>-->
    <!--    </sui-list>-->
  </div>
</template>

<script>
import {addHref, deleteHref, editHref, getAllLink} from "@/api/data";

export default {
  name: "LinkManage",
  data() {
    return {
      links: [],
      pName: '',
      pUrl: '',
      pid: '',
      addName: '',
      addUrl: ''
    }
  },
  methods: {
    getLink() {
      getAllLink().then(res => {
        if (res.status === 200) {
          this.links = res.data;
          console.log(this.links)
          this.$message.success("数据获取成功");
          this.pName = '';
          this.pUrl = ''
        } else {
          this.$message.error("数据获取失败");
          this.pName = '';
          this.pUrl = ''
        }
      })
    },
    cancel() {
      $('.ui.modal.link.edit')
          .modal('hide')
      ;
    },
    addU() {
      $('.ui.modal.link')
          .modal('show')
      ;
    },
    editSubmit() {
      editHref(this.pid, this.pName, this.pUrl).then(res => {
        console.log(res);
        if (res.status === 200) {
          this.$message.success("数据修改成功");
          $('.ui.modal.link.edit')
              .modal('hide')
          ;
          this.pName = '';
          this.pUrl = ''
        } else {
          this.$message.error("数据修改失败");
          this.pName = '';
          this.pUrl = ''
        }
      })
    },
    cancelEdit() {
      $('.ui.modal.link.edit')
          .modal('hide')
      ;
    },
    editLink(id, index) {
      this.pid = id;
      console.log(this.links);
      console.log(index);
      this.pName = this.links[index].name;
      this.pUrl = this.links[index].url;
      $('.ui.modal.link.edit')
          .modal('show')
      ;
    }, deleteLink(id) {
      deleteHref(id).then(res => {
        if (res.status === 200) {
          this.$message.success("数据删除成功");
        } else {
          this.$message.error("数据删除失败");
        }
      })
    }, addLinkI() {

      if (this.addName === '' || this.addUrl === '') {
        this.$message.error("请完善数据");
      } else {
        addHref(this.addName, this.addUrl).then(res => {
          console.log(res);
          if (res.status === 200) {
            this.links = res.data;
            this.$message.success("数据添加成功");
            $('.ui.modal.link')
                .modal('hide')
            ;
            document.getElementById("nameAdd").value = '';
            document.getElementById("UrlAdd").value = '';
          } else {
            this.$message.error("数据添加失败");
            document.getElementById("nameAdd").value = '';
            document.getElementById("UrlAdd").value = '';
          }
        })
      }

    }
  }, created() {
    this.getLink();
  }
}
</script>

<style scoped>
span {
  font-size: 18px;
}

.LinksManage {
  margin-left: 10px;
}

ul {
  list-style: none;
  margin: 2px;
  padding: 2px;
}

li {
}
</style>
