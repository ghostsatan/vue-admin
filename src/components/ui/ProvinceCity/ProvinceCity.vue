<template>
  <el-cascader
    size="small"
    :options="city"
    v-model="selectedOptions"
    clearable
    :props="props"
    @change="selectCity"
  ></el-cascader>
</template>
<script>
import { provinceAndCityDataPlus } from "element-china-area-data";
export default {
  data() {
    return {
      props: {
        value: "label"
      },
      selectedOptions: [],
    };
  },
  created () {
    this.city = provinceAndCityDataPlus.slice(1);
  },
  methods: {
    selectCity () {
      if (this.selectedOptions[0] === "全部") {
        this.selectedOptions[0] = this.selectedOptions[1] = "";
      } else if (this.selectedOptions[1] === "全部") {
        this.selectedOptions[1] = "";
      }
      this.$emit('getProvinceCity',this.selectedOptions);
    },
    reset (){
      this.selectedOptions = [];
      this.selectCity();
    },
    //回显省市数据
    echo (marketProvince,marketCity) { 
      this.$set(this.selectedOptions,[0],marketProvince);
      this.$set(this.selectedOptions,[1],marketCity);
    }
  }
}
</script>
