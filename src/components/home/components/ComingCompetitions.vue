<template>
  <div>
    <sui-card style="width: 90%;left: 5%;margin-top: 2%;">
      <sui-card-content>
        <div class="coders" style="margin-left: 0;">
          <ai></ai>
          <span class="title" style="margin-left: 0;"><strong>COMING COMPETITIONS</strong></span></div>
        <div class="ui divider"></div>
        <sui-list>
          <sui-list-item v-for="(item, key) in competitions" class="suiItem">
            <div style="justify-items: center">
                <span style="font-size: 18px">
                <a :href=item.sign>{{ item.name }}</a>
                </span>
              <br>
              <span style="color:gray">倒计时: {{ stars(item.date) }}天</span>
            </div>
            <div class="ui divider"></div>
          </sui-list-item>
        </sui-list>
      </sui-card-content>
    </sui-card>
  </div>

</template>

<script>

export default {
  name: "ComingCompetitions",
  props: {
    competitions: {
      Type: Array,
      required: true
    }
  },
  computed: {
    stars: function () {
      return function (date) {
        var EndTime = new Date(date);
        // 当前系统时间
        var NowTime = new Date();
        var t = EndTime.getTime() - NowTime.getTime();
        var res = Math.floor(t / 1000 / 60 / 60 / 24) > 0 ? Math.floor(t / 1000 / 60 / 60 / 24) : 0;
        return res;
      }
    }
  },
  data() {
    return {
      countDown: 2
    }
  },
  created() {
    this.countDown = this.count()
  }, methods: {
    count(date) {
    }
  }
}
</script>

<style scoped>
.suiItem {
  height: 50px;
  margin-left: 20px;
  margin-top: 20px;
}
</style>
