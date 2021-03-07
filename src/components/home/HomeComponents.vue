<template>
  <div style="width: 100%;min-width: 1200px;">
    <div class="home-wraper">
      <div class="left">
        <div class="top">
          <top-articles class="articles" :top-articles="topArticle"></top-articles>
        </div>
        <div class="down">
          <top-news class="news" :news="news"></top-news>
        </div>
      </div>
      <div class="right">
        <coming-competitions class="competitions" :competitions="Competitions"></coming-competitions>
      </div>
    </div>
  </div>
</template>

<script>
import TopArticles from "@/components/home/components/TopArticles";
import TopCoders from "@/components/home/components/TopCoders";
import ComingCompetitions from "@/components/home/components/ComingCompetitions";
import TopNews from "@/components/home/components/TopNews";
import {getCountDown, getTopArticle, getTopNews} from "@/api/data";

export default {
  name: "HomeComponents",
  components: {TopCoders, TopArticles, ComingCompetitions, TopNews},
  data() {
    return {
      topCoders: [],
      topArticle: [],
      Competitions: [],
      news: []
    }
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      getCountDown().then(res => {
        this.Competitions = res.data;
      });
      getTopArticle().then(res => {
        this.topArticle = res.data;
      });
      getTopNews().then(res => {
        console.log(res);
        this.news = res.data;
      })
    }
  }
}
</script>

<style scoped lang="less">
.home-wraper {
  background-color: rgba(0, 0, 0, 0.03);
  display: flex;
  justify-content: space-between;
  margin: 10px;
  min-height: 500px;
}

.left {
  width: 80%;
  margin-right: 10px;
}

.top {
  //display: flex;

  .articles {
    width: 95%;
    margin: 10px;
  }
}

.down {
  margin-top: 30px;
  .news {
    width: 95%;
    height: 400px;
    margin: 10px;
  }
}

.right {
  //border: 1px red solid;
  width: 50%;
}

</style>
