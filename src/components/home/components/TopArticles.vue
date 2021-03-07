<template>
  <div>
    <sui-card style="width: 90%;left: 5%">
      <sui-card-content>
        <div class="coders" style="margin-left: 0;">
          <ai></ai>
          <span class="title" style="margin-left: 0;"><strong>TOP ARTICLES</strong></span></div>
        <div class="ui divider"></div>
        <sui-list>
          <sui-list-item v-for="(item, key) in topArticles">
            <div style="justify-items: center">
                <span style="font-size: 18px">
                <a @click="detail(item.id)">{{ item.title }}</a>
                </span>
              <span style="float:right;font-size: 18px;margin-right: auto;">{{ item.author }}</span>
            </div>
            <div class="ui divider"></div>
          </sui-list-item>
        </sui-list>
      </sui-card-content>

    </sui-card>
    <!--    <sui-list>-->
    <!--      <sui-list-item v-for="(item, key) in topArticles">-->
    <!--        <span style="font-size: 18px">{{item.title}}</span>-->
    <!--        <span style="font-size: 18px">{{item.author}}</span>-->
    <!--      </sui-list-item>-->
    <!--    </sui-list>-->
  </div>
</template>

<script>
export default {
  name: "topArticle",
  props: {
    topArticles: {
      // 指定类型
      Type: Array,
      required: true
    },
  }, methods: {
    detail(id) {
      let router = this.$router.resolve({
        path: '/blogContent',
        query: {id: id}
      });
      window.open(router.href, '_blank');
    }
  }
}
</script>

<style scoped>

</style>
