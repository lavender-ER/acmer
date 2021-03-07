<template>
  <div>
    <div class="ui sidebar inverted vertical menu">
      <a class="item" :href=item.url target="_blank" v-for="(item,index) in href">
        {{ item.name }}
      </a>
    </div>
    <div class="ui secondary  menu" id="nav"
         style="-webkit-transition:font-size 0.1s ease-in; height: 60px;margin: 0; font-family: 'Nirmala UI';font-size: 16px;background-color: white;">
      <a class="item" href="../home/" id="Home">
        Home
      </a>
      <a class="item" id="News" href="../news/">
        News
      </a>
      <a class="item" href="../circle/" id="circle">Circle</a>
      <a id="DailyWords" class="item" href="../words/">
        DailyWords
      </a>
      <a class="item" id="DailyAC" href="../dailyac/">
        DailyAC
      </a>
      <a class="item" @click="toogle">
        Links
      </a>
      <a class="item" id="Resources" href="../manage/">
        Management
      </a>
      <div class="right menu" v-if="!verifyLogin()">
        <a class="ui item " id="register" href="../register/">
          Register
        </a>
        <a class="ui item" id="login" href="../login/">
          Login
        </a>
      </div>
      <div class="right menu" v-else>
        <div class="head">
          <div class="box_none"></div>
          <div class="head_box">
            <!--            <img class="image_box" src="../assets/avatar_1569504708.png">-->
            <el-avatar :size="50" :src="imageUrl"></el-avatar>
            <div class="message_box">
              <el-menu
                  default-active="2"
                  class="el-menu-vertical-demo">
                <el-menu-item index="1" @click="writeBlog">
                  <i class="el-icon-menu"></i>
                  <span slot="title">写博客</span>
                </el-menu-item>
                <el-menu-item index="2" @click="uploadRes">
                  <i class="el-icon-menu"></i>
                  <span slot="title">上传资源</span>
                </el-menu-item>
                <el-menu-item index="3" @click="info">
                  <i class="el-icon-menu"></i>
                  <span slot="title">个人中心</span>
                </el-menu-item>
                <el-menu-item index="4" @click="out">
                  <i class="el-icon-menu"></i>
                  <span slot="title">退出登录</span>
                </el-menu-item>
              </el-menu>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>

import {getDailyWords, getHref, getPersonInfo} from "@/api/data";

export default {
  name: "NavBar",
  data() {
    return {
      activeRoute: false,
      visible: true,
      href: [],
      visible2: false,
      imageUrl: ''
    }
  },
  methods: {
    getData() {
      getHref().then(res => {
        console.log(res.data);
        if (res.status === 200) {
          for (var i = 0; i < res.data.length; i++) {
            this.href.push({
              name: res.data[i].name,
              url: res.data[i].url,
            })
          }
          // this.href = res.data
          console.log(this.href)
        } else {
          this.$message.error("无可用链接");
        }
      })
    },
    toogle() {
      $('.ui.sidebar')
          .sidebar('toggle')
      ;
    },
    out() {
      sessionStorage.removeItem("token");
      this.$message.success("退出成功");
      this.$router.push('/login');
    },
    onExit: function () {
      sessionStorage.removeItem("token");
      window.location.reload()
    },
    verifyLogin() {
      let check = sessionStorage.getItem('token')
      console.log(check)
      return check
    }
    , writeBlog() {
      let router = this.$router.resolve({
        path: '/write',
      });
      window.open(router.href, '_blank');
    }, uploadRes() {
      let router = this.$router.resolve({
        path: '/upload',
      });
      window.open(router.href, '_blank');
    }, info() {
      this.$router.push('/personalInfo');
    }
  },
  created() {
    if (sessionStorage.getItem('token') && sessionStorage.getItem('userId')) {
      var id = sessionStorage.getItem('userId');
      $('.ui.pointing.dropdown.link.item').dropdown();
      this.getData();
      this.verifyLogin();

      getPersonInfo(id).then(res => {
        if (res.status === 200) {
          this.imageUrl = res.data[0].uid;
          console.log(this.imageUrl)
        }
      });
    } else {
            this.$router.push('/login');
    }

  },
  watch: {
    verifyLogin: {
      handler(n, o) {
        return n
      }
    }
  }
}
</script>

<style scoped>


.head {
  height: 50px;
  padding: 0 20px;
}

.box_none {
  width: 300px;
}

.head_box {
  float: right;
  margin-right: 30px;
  position: relative;
  width: 32px;
  height: 30px;
  margin-top: 10px;
}

.image_box {
  margin-top: 10px;
  left: 5%;
  width: 45px;
  height: 40px;
  background-color: #333;
  border-radius: 50%;
  vertical-align: middle;
  z-index: 1;
  transform: translate(-50%, 0);
  transition: transform .3s, width .3s, height .3s;
}

.head_box:hover .image_box {
  width: 52px;
  height: 52px;
  transform: translate(-50%, 28%);
}

.message_box {
  background: white;
  border-radius: 10px;
  position: absolute;
  top: 70px;
  left: 50%;
  width: 250px;
  height: 250px;
  transform: translate(-50%, 0);
  opacity: 0;
  visibility: hidden;
  transition: opacity .3s, visibility .3s;
  z-index: 10;
}

.head_box:hover .message_box {
  opacity: 1;
  visibility: visible;
}


.avatarContent {
  margin-top: 15px;
  margin-right: 150px;
}

a {
  color: black;
}

</style>
