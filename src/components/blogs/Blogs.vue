<template>
  <div class="blogs">
  </div>
</template>

<script>
import SiderBar from "@/components/blogs/components/SiderBar";
import BlogList from "@/components/blogs/components/BlogList";
import {getAlgorithms, getBlogs} from "@/api/data";
import {addHref, GetHrefs, getSingleHref, editHref, multiDeleteHref} from "@/api/href/data";

export default {
  name: "BlogsComponents",
  components: {BlogList, SiderBar},
  data() {
    return {
      menu: ['数论', '动态规划', '图论', '贪心算法', '分治算法'],
      bloglist: [
        {
          title: '文章1',
          content: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. ' +
              'Aenean commodo ligula eget dolor. Aenean massa strong. Cum so' +
              'ciis natoque penatibus et magnis dis parturient montes, nasc' +
              'etur ridiculus mus. Donec quam felis, ultricies nec, pellent' +
              'esque eu, pretium quis, sem. Nulla consequat massa quis en' +
              'im. Donec pede justo, fringilla vel, aliquet nec, vulputa' +
              'te eget, arcu. In enim justo, rhoncus ut, imperdiet a, v' +
              'enenatis vitae, justo. Nullam dictum felis eu pede link ' +
              'mollis pretium. Integer tincidunt. Cras dapibus. Vivamus ' +
              'elementum semper nisi. Aenean vulputate eleifend tellus. A' +
              'enean leo ligula, porttitor eu, consequat vitae, eleifend ' +
              'ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feu' +
              'giat a, tellus. Phasellus viverra nulla ut metus varius laor' +
              'eet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel' +
              ' augue. Curabitur ullamcorper ultricies nisi.'
        },
        {
          title: '文章1',
          content: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. ' +
              'Aenean commodo ligula eget dolor. Aenean massa strong. Cum so' +
              'ciis natoque penatibus et magnis dis parturient montes, nasc' +
              'etur ridiculus mus. Donec quam felis, ultricies nec, pellent' +
              'esque eu, pretium quis, sem. Nulla consequat massa quis en' +
              'im. Donec pede justo, fringilla vel, aliquet nec, vulputa' +
              'te eget, arcu. In enim justo, rhoncus ut, imperdiet a, v' +
              'enenatis vitae, justo. Nullam dictum felis eu pede link ' +
              'mollis pretium. Integer tincidunt. Cras dapibus. Vivamus ' +
              'elementum semper nisi. Aenean vulputate eleifend tellus. A' +
              'enean leo ligula, porttitor eu, consequat vitae, eleifend ' +
              'ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feu' +
              'giat a, tellus. Phasellus viverra nulla ut metus varius laor' +
              'eet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel' +
              ' augue. Curabitur ullamcorper ultricies nisi.'
        },
      ]
    }
  },
  methods: {
    blogChange(val) {
      console.log('blog need change:', val.id)
      this.bloglist.pop()
    },
    getAlgorithm() {
      getAlgorithms().then((res) => {
        this.menu = res.data
      })
    },
    getBlogsByAlgorithm(algorithmName) {
      getBlogs(algorithmName).then((res) => {
        this.bloglist = res.data
      })
    },
    addHrefs() {
      addHref()
    }
  },
  created() {
    this.getAlgorithm()
    this.getBlogsByAlgorithm(this.menu[0])
  }
}
</script>

<style scoped lang="less">
.blogs {
  margin: 10px;
  display: flex;

  .left {
    //border: 1px red solid;
    margin: 10px;
    width: 35vm;
  }

  .right {
    flex: 1;
    //border: 1px red solid;
    margin: 10px;
    padding: 10px;
  }
}
</style>
