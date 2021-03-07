<template>
  <div class="ui form" style="width: 40%;margin-left: 30%;margin-top: 50px;height: 420px;">
    <span><strong>Sign In</strong></span>
    <div class="ui divider"></div>
    <div class="ui field" style="position: center;margin-top: 30px;width: 70%;margin-left: 15%;">
      <div class="ui input">
        <input type="text" style="font-size: 16px;" placeholder="请输入您的账户名" id="name">
      </div>
    </div>
    <div class="ui field" style="position: center;margin-top: 20px;width: 70%;margin-left: 15%;">
      <div class="ui input">
        <input type="password" style="font-size: 16px;" id="pwd" placeholder="请输入您的密码">
      </div>
    </div>
    <div style="position: center;margin-top: 20px;width: 70%;margin-left: 15%;">{{ error }}</div>
    <div class="ui field" style="position: center;margin-top: 20px;width: 70%;margin-left: 15%;">
      <center>
        <button class="ui button" style="font-size: 14px;width: 100%;" @click="SignIn">登录</button>
      </center>
      <a href="../register/" style="float: right;text-decoration: none;margin-top: 15px;">New to us? Sign Up</a>
    </div>
  </div>
</template>

<script>
import {SignInM} from "@/api/data";

export default {
  name: "signIn",
  watch: {},
  methods: {
    SignIn() {
      var name = document.getElementById("name").value;
      var pwd = document.getElementById("pwd").value;

      console.log(name);
      console.log(pwd);

      SignInM(name, pwd).then(res => {
        console.log(res);
        if (res.status === 200) {
          this.error = '';
          sessionStorage.username = name;
          sessionStorage.password = pwd;
          sessionStorage.token = res.token;
          sessionStorage.isLogin = true;
          sessionStorage.userId = res.id;
          this.$router.push('/home');
        } else {
          this.error = '密码或者用户名错误';
          console.log("密码或者用户名错误");
          sessionStorage.isLogin = false;
        }
      });
    }
  },
  data() {
    return {
      error: ''
    }
  }
}
</script>

<style scoped>
span {
  font-size: 25px;
  font-family: 'Nirmala UI';
}
</style>
