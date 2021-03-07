<template>
  <div class="manageContent">
    <ArticlesManage v-if="msg === '1'"></ArticlesManage>
    <LinkManage v-else-if="msg === '2'"></LinkManage>
    <CountDownManage v-else-if="msg === '3'"></CountDownManage>
    <NewsManage v-else-if="msg === '4'"></NewsManage>
    <ResourceManage v-else-if="msg === '5'"></ResourceManage>
    <coderManage v-else-if="msg === '6'"></coderManage>
    <BooksManage v-else-if="msg === '7'"></BooksManage>
    <AlgorithmManage v-else-if="msg === '8'"></AlgorithmManage>
    <CarouselManage v-else-if="msg === '9'"></CarouselManage>
  </div>
</template>

<script>
import {eventBus} from '@/main'
import NewsManage from "@/components/manage/NewsManage";
import CountDownManage from "@/components/manage/CountDownManage";
import ResourceManage from "@/components/manage/ResourceManage";
import CoderManage from "@/components/manage/coderManage";
import BooksManage from "@/components/manage/BooksManage";
import ArticlesManage from "@/components/manage/articlesManage";
import CommentManage from "@/components/manage/LinkManage";
import AlgorithmManage from "@/components/manage/algorithmManage";
import LinkManage from "@/components/manage/LinkManage";
import CarouselManage from "@/components/manage/CarouselManage";

export default {
  name: "ManageContent",
  components: {
    CarouselManage,
    LinkManage,
    AlgorithmManage,
    CommentManage, ArticlesManage, BooksManage, CoderManage, ResourceManage, CountDownManage, NewsManage
  },
  created() {
    eventBus.$on('changeSide', (message) => {
      this.msg = message
    })
    console.log(this.msg);
  },
  data() {
    return {
      msg: '123'
    }
  }
}
</script>

<style scoped>
.manageContent {
  margin-top: 20px;
  background-color: white;
  /*height: auto;*/
  /*min-height: 650px;*/
}
</style>
