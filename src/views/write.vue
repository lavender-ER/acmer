<template>
  <div class="write">
    <!--    32431-->
    <div class="ui modal sub">
      <div class="header">
        发表文章
      </div>
      <div class="segment">
        文章描述：
        <el-input v-model="value1"></el-input>
      </div>
      <br>
      文章种类：
      <el-select v-model="value2" placeholder="请选择文章种类">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>

      <div class="actions">
        <div class="ui black deny button" @click="cancelSubmit">
          再想想
        </div>
        <div class="ui positive right labeled icon button" @click="submit">
          发表
          <i class="checkmark icon"></i>
        </div>
      </div>
    </div>

    <div class="ui from">
      <div class="ui input focus">
        <input type="text" placeholder="请输入标题" style="width: 500px;" v-model="title">
      </div>
      <div class="ui buttons" style="float: right;font-size: 10px;">
        <button class="ui negative basic button" @click="cancelWrite">取消</button>
        <button class="ui positive basic button" style="margin-left: 20px;" @click="check">提交</button>
      </div>
      <div class="ui divider"></div>
      <el-input
          type="textarea"
          :rows="20"
          placeholder="请输入内容"
          v-model="textarea"
          style="float: left;width:45%;">
      </el-input>
      <div class="show" id="show">这里用于展示博客效果</div>
    </div>
  </div>
</template>

<script>
import {addBlog, getType} from "@/api/data";

export default {
  name: "write",
  data() {
    return {
      textarea: '',
      converter: null,
      title: '',
      value1: '',
      value2: '',
      options: [],
    }
  },
  watch: {
    textarea: 'Changed'
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      var showdown = require('showdown');
      this.converter = new showdown.Converter();
    },
    Changed() {
      document.getElementById('show').innerHTML = this.converter.makeHtml(this.textarea);
    },
    check() {
      if (this.textarea === '' || this.title === '') {
        this.$message.error("内容或者标题为空");
      } else {
        $('.ui.modal.sub')
            .modal('show')
        ;
      }
    },
    submit() {
      var id = sessionStorage.getItem("userId");
      var name = sessionStorage.getItem("username");
      addBlog(id, this.title, this.textarea, this.value2, this.value1, name).then(res => {
        console.log(res);
        if (res.status === 200) {
          this.$message.success("添加成功");
          $('.ui.modal.sub')
              .modal('hide')
          ;
          this.$router.push('/circle');
        } else {
          this.$message.success("添加失败");
        }
      })
    }, cancelSubmit() {

    }, cancelWrite() {
      window.close();
    }
  },
  created() {
    getType().then(res => {
      if (res.status === 200) {
        console.log(res);
        for (var i = 0; i < res.data.length; i++) {
          this.options.push(
              {
                label: res.data[i].name,
                value: res.data[i].name
              }
          )
        }
        console.log(this.options);
        this.$message.success("获取数据成功");
      } else {
        this.$message.error("获取数据失败");
      }
    });
  }
}
</script>

<style scoped>
span {
  font-size: 22px;
}

.show {
  float: right;
  left: 5%;
  width: 45%;
  height: auto;
  min-height: 400px;
  margin-bottom: 30px;
}

blockquote {
  border-left: #eee solid 5px;
  padding-left: 20px;
}


ul li {
  line-height: 20px;
}

code {
  color: #D34B62;
  background: #F6F6F6;
}

.write {
  height: auto;
  min-height: 500px;
  margin-left: 10%;
  width: 80%;
  margin-bottom: 30px;
}
</style>
