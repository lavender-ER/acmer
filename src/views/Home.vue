<template>
  <div>
    <nav-bar></nav-bar>
    <router-view></router-view>
    <public-footer></public-footer>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import PublicFooter from "@/components/Footer";
export default {
  name: 'Home',
  components: {
    PublicFooter,
    NavBar
  }
}
</script>
