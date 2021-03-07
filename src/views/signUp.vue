<template>
  <div class="ui form" style="width: 40%;margin-left: 30%;margin-top: 50px;height: 420px;">

    <div class="ui field" style="position: center;margin-top: 30px;width: 70%;margin-left: 15%;">
      <div class="ui input">
        <input type="text" id="name" style="font-size: 16px;" placeholder="请输入您的昵称">
      </div>
    </div>
    <div class="ui field" style="position: center;margin-top: 30px;width: 70%;margin-left: 15%;">
      <div class="ui input">
        <input type="text" id="pwd" style="font-size: 16px;" placeholder="请输入您的密码">
      </div>
    </div>
    <div class="ui field" style="position: center;margin-top: 30px;width: 70%;margin-left: 15%;">
      <div class="ui toggle checkbox">
        <input type="checkbox" name="gift" id="box" tabindex="0">
        <label>我已同意本网站的协议</label>
      </div>
    </div>
    <div class="ui field" style="position: center;margin-top: 30px;width: 70%;margin-left: 15%;">{{ error }}</div>
    <div class="ui field" style="position: center;margin-top: 30px;width: 70%;margin-left: 15%;">
      <center>
        <button class="ui button" style="font-size: 14px;width: 100%;" @click="register">注册</button>
      </center>
      <a href="../login/" style="float: right;text-decoration: none;margin-top: 15px;">已有账号，直接登录></a>
    </div>
  </div>
</template>

<script>
import {registerM} from "@/api/data";

$('.ui.toggle.checkbox')
    .checkbox()
;
export default {
  name: "signUp",
  created() {

  },
  data() {
    return {
      error: '123'
    }
  },
  methods: {
    check() {
      var name = document.getElementById('name').value;
      var pwd = document.getElementById('pwd').value;
      if (name == '' || name == undefined || name == null || pwd === '' || pwd == undefined || pwd == null) {
        this.error = '密码或者账户不可以为空哦~';
        return false;
      } else if (document.getElementById('box').checked === false) {
        this.error = '请先同意本站的协议';
        return false;
      }
      return true;
    },
    register() {
      if (this.check()) {
        var name = document.getElementById("name").value;
        var pwd = document.getElementById("pwd").value;
        registerM(name, pwd).then(res => {
          console.log(res);
          if (res.status === 200) {
            sessionStorage.username = name;
            sessionStorage.password = pwd;
            sessionStorage.token = res.data;
            sessionStorage.isLogin = true;
            sessionStorage.userId = res.id;
            this.$router.push('/home');
          } else {
            this.$message.error("注册失败");
            sessionStorage.isLogin = false;
          }
        });
      }
    }
  }
}
</script>

<style scoped>

</style>
