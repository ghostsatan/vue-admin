<template lang="html">
  <div class="title">
    <h1>{{name}}</h1>
    <div class="legend-wrapper">
    </div>
  </div>
</template>
<script>
export default {
  props: {
    name: String
  },
  created() {
    console.log(1212121212);
    // this._init()
  },
  data() {
    return {
      styleArr: [],
      color: this.$store.state.color
    }
  },
  methods: {
    
    highlight(index) {
      this.myChart.dispatchAction({
        type: 'highlight',
        seriesIndex: index
      });
    },
    donwplay(index) {
      console.log(index)
      this.myChart.dispatchAction({
        type: 'downplay',
        seriesIndex: index
      })
    },
    legendToggle(legend) {
      legend.selected = !legend.selected
      this.myChart.dispatchAction({
        type: 'legendToggleSelect',
        name: legend.name
      })
      this.changeStyle()
    },
    changeStyle() {
      this.legendArr.forEach((data, index) => {
        if (data.selected) {
          this.styleArr[index].background = this.color[index]
          this.styleArr[index].border = '1px solid' + this.color[index]
        } else {
          this.styleArr[index].background = 'transparent'
          this.styleArr[index].border = '1px solid #9C8C84'
        }
      })
    }
  }
}

</script>

<style lang="less" scoped>
.title{
  width: 200px;
  color:red;
}
</style>
