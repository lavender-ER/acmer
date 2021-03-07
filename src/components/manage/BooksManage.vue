<template>
  <div class="BooksManage">

    <div class="ui modal book edit">
      <div class="header">修改书籍</div>
      <form class="ui form" style="margin: 20px;">
        <div class="field">
          <label>书籍名称</label>
          <input type="text" name="name" v-model="pName">
        </div>
        <div class="field">
          <label>书籍出版社</label>
          <input type="text" name="publisher" v-model="pPublisher">
        </div>
      </form>
      <div class="actions">
        <div class="ui cancel button" @click="cancel">取消</div>
        <div class="ui approve button" @click="editSubmit">提交</div>
      </div>
    </div>

    <div class="ui modal book">
      <div class="header">新增书籍</div>
      <form class="ui form" style="margin: 20px;">
        <div class="field">
          <label>书籍名称</label>
          <input type="text" id="nameAdd">
        </div>
        <div class="field">
          <label>书籍出版社</label>
          <input type="text" id="publisherAdd">
        </div>
      </form>
      <div class="actions">
        <div class="ui cancel button">取消</div>
        <div class="ui approve button" @click="addB">提交</div>
      </div>
    </div>


    <span>书籍管理</span>
    <div style="float: right;margin-right: 20px;bottom: 20px;">
      <el-button round @click="addBook">新增</el-button>
    </div>
    <div class="ui divider"></div>
    <div class="article">
      <ul>
        <li v-for="(item,index) in books">
          <div class="ui grid" style="width: 100%;height: 60px;">
            <div class="eight wide column"><span>{{ item.name }}</span></div>
            <div class="five wide column"><span>{{ item.publisher }}</span></div>
            <div class="three wide column">
              <el-button type="primary" icon="el-icon-edit" circle
                         @click="edit(item.id,index)"></el-button>
              <el-button type="danger" icon="el-icon-delete" circle @click="deleteItem(item.id,index)"></el-button>
            </div>
          </div>
          <div class="ui divider"></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {addBooks, deleteBooks, editBooks, searchAllBooks, searchNews} from "@/api/data";
import books from "@/views/books";

export default {
  name: "BooksManage",
  data() {
    return {
      pid: '', pName: '', pPublisher: '',
      books: []
    };
  },
  methods: {
    cancel() {
      $('.ui.modal.book.edit')
          .modal('hide')
      ;
    },
    editSubmit() {
      editBooks(this.pid, this.pName, this.pPublisher).then(res => {
        if (res.status === 200) {
          this.$message.success("修改成功");
        } else {
          this.$message.error("修改失败");
        }
      })
    },
    deleteItem(id) {
      deleteBooks(id).then(res => {
        if (res.status) {
          this.$message.success("删除成功");
        } else {
          this.$message.error("删除失败");
        }
      })
    },
    editB() {

    },
    addB() {
      var name = document.getElementById('nameAdd').value;
      var publisher = document.getElementById('publisherAdd').value;
      if (name === '' || publisher === '') {
        this.$message.error('请完成需要填写的信息');
        return false;
      } else {
        addBooks(name, publisher).then(res => {
          console.log(res);
          if (res.id) {
            this.$message('添加成功!');
            $('.ui.modal.book')
                .modal('hide')
            ;
          } else {
            this.$message.error('添加失败');
            return false;
          }
        })
      }
    },
    addBook() {
      $('.ui.modal.book')
          .modal('show')
      ;
    },
    edit(id, index) {
      this.pid = id;
      this.pPublisher = this.books[index].publisher;
      this.pName = this.books[index].name;
      $('.ui.modal.book.edit')
          .modal('show')
      ;
    }
  }, created() {
    searchAllBooks().then(res => {
      if (res.status === 200) {
        this.books = res.data;
      } else {
        this.$message.error("数据获取失败");
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

.BooksManage {
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
