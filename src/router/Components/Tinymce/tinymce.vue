<template>
  <div class="components-container">
    
    <div>
      <tinymce :height="300" v-model="content"/>
    </div>
    <div class="editor-content" v-html="content"/>
  </div>
</template>

<script>
import Tinymce from "@ui/Tinymce"

export default {
  name: 'TinymceDemo',
  components: { Tinymce },
  data() {
    return {
      content:'dafdfasf'
    }
  }
}
</script>

<style lang="less">
.editor-content{
  margin-top: 20px;
}
</style>

