<template>
  <div class="custom-list">
    <v-header :name="name" class="header"></v-header>
    <v-main></v-main>
  </div>
 
</template>

<script>
import Tree from "@ui/Tree/tree"
import Header from "@ui/Header"

export default {
  components:{
    'v-main':Tree,
    'v-header':Header
  },
  data() {
    return {
      props: {
        value: "label"
      },
      name:'这是一个头组件'
     
    };
  },
  created() {
    console.log('树结构');
  },
  
  methods: {
  }
};
</script>
<style lang='less'>
.custom-list {
  .header{
    color:red;
  }
  
}
</style>
