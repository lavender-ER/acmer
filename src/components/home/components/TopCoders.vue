<template>
  <div style="width: 90%;left: 5%">
    <sui-card>
      <sui-card-content>
        <div class="coders" style="margin-left: 0;">
          <ai></ai>
          <span class="title" style="margin-left: 0;"><strong>TOP CODERS</strong></span></div>
        <div class="ui divider"></div>
        <sui-list>
          <sui-list-item v-for="(item, key) in topcoders">
            <div style="display: flex">
<!--              <img src="https://himg.bdimg.com/sys/portraitn/item/72a1ced6ccd8b0accec4b6f94cdbed">-->
              <div style="justify-items: center">
                <span style="font-size: 18px">{{ item.name }}</span>
                <br>
                <span style="color:gray">AC:{{ item.ac }}RE: {{ item.re }}</span>
              </div>
            </div>
          </sui-list-item>
        </sui-list>
      </sui-card-content>

    </sui-card>
  </div>
</template>
<script>
export default {
  name: "TopCoders",
  props: {
    topcoders: {
      Type: Array,
      required: true
    }
  },
  watch: {
    topcoders: {
      // eslint-disable-next-line no-unused-vars
      handler(n, o) {
        this.topcoders = n
      }
    }
  },
  data() {
    return {

    }
  },
  created() {
  },
  methods: {
  }
}
</script>

<style scoped>
</style>
