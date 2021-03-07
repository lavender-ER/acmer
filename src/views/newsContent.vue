<template>
  <div style="overflow: auto">
    <news-c></news-c>
  </div>
</template>

<script>
import NewsC from "@/components/newsContent/newsContent";

export default {
  name: "newsContent",
  components: {NewsC},
  data() {
    return {
      topNews: []
    }
  },

}
</script>

<style scoped>


.rightN {
  float: right;
  width: 450px;
  margin-top: 20px;
  min-height: 500px;
  margin-left: 50px;
}

body {
  margin: 0px;
  width: 100%;
  min-width: 1500px;
  max-width: 100%;
  height: 100%;
  background-color: #F0F0F0;
}

#head {
  background-color: #FFFF00;
  width: 100%;
  height: 100px;
}

#center {
  background-color: #00FFFF;
  width: 100%;
  min-height: 100%;
}

#foot {
  background-color: #FF00FF;
  width: 100%;
  height: 100px;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>
