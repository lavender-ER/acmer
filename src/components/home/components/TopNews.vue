<template>
  <div>
    <sui-card style="width: 90%;left: 5%">
      <sui-card-content>
        <div class="coders" style="margin-left: 0;">
          <ai></ai>
          <span class="title" style="margin-left: 0;"><strong>TOP NEWS</strong></span></div>
        <div class="ui divider"></div>
        <sui-list>
          <sui-list-item v-for="(item, index) in news" class="suiItem">
            <div style="justify-items: center">
                <span style="font-size: 18px">
                <a @click="detail(item.id)">{{ item.title }}</a>
                </span>
              <span style="float:right;font-size: 18px;margin-right: 50px;">{{ item.author }}</span>
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
  name: "TopNews",
  props: {
    news: {
      Type: Array,
      required: true
    }
  }, methods: {
    detail(id) {
      console.log(id);
      let router = this.$router.resolve({
        path: '/newsContent',
        query: {id: id}
      });
      window.open(router.href, '_blank');
    }
  }
}
</script>

<style scoped>
.suiItem {
  height: 50px;
  margin-left: 20px;
}
</style>
