<template>
  <div class="blogItem">
    <div class="ui three column grid">
      <div class="row">
        <div class="column blog"><span @click="BlogDetail(item.id)">{{ blogInfo.title }}</span></div>
        <div class="column">{{ blogInfo.algorithm }}</div>
        <div class="column"></div>
      </div>
      <div class="ui divider"></div>
      <div class="row">
        <div class="column"><span>{{blogInfo.author}}</span></div>
        <div class="column"><span>{{ blogInfo.date }}</span></div>
        <div class="column"><span>{{blogInfo.desc}}</span></div>
      </div>
    </div>


  </div>
</template>

<script>
export default {
  name: "BlogItem",
  props: {
    blogInfo: {
      Type: Array,
      required: true
    }
  },
  watch: {
    blogInfo: {
      handler(n, o) {
        this.blogInfo = n
      }
    }
  }, methods: {
    BlogDetail(id) {
      console.log(id);

    }
  }
}
</script>

<style scoped>
.blogItem {
  border-radius: 5px;
  height: 150px;
  width: 800px;
  margin-left: 50px;
  background-color: white;
}

.blog {
  font-size: 20px;
  font-family: 楷体;
}

.divC {
  height: 50px;
}
</style>
