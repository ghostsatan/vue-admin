<template>
  <div class="px-date-shortcut">
    <div
      v-for="(item,index) in items"
      class="el-date-shortcut__item"
      @click="handleItemClick(index)" :key="index"
    >
      <a
        href="javascript:;"
        v-bind:class="{'el-date-shortcut__a':true,active:index === active}"
      >{{item.text}}</a>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
export default {
  props: {
    items: {
      type: Array,
      'default': function () {
        return [{
          text: '今天',
          values: [
            moment().startOf('days').valueOf(),
            moment().endOf('days').valueOf() + 1
          ]
        }, {
          text: '7天',
          values: [
            moment().startOf('days').subtract(6, 'days').valueOf(),
            moment().endOf('days').valueOf() + 1
          ]
        }, {
          text: '15天',
          values: [
            moment().startOf('days').subtract(14, 'days').valueOf(),
            moment().endOf('days').valueOf() + 1
          ]
        }, {
          text: '30天',
          values: [
            moment().startOf('days').subtract(29, 'days').valueOf(),
            moment().endOf('days').valueOf() + 1
          ]
        }];
      }
    },
    onClick: {
      type: Function
    },
    hasDefault: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      active: this.hasDefault ? 0 : ''
    };
  },
  methods: {
    handleItemClick (index) {
      if (this.items[index].active) {
        return;
      }
      this.active = index;
      this.onClick(this.items[this.active].values);
    },
    setActive (index) {
      this.active = index;
    }
  }
};
</script>

<style lang="less">
  .px-date-shortcut {
    .el-date-shortcut__item {
      display: inline-block;
      padding: 0 15px;
      margin-right: 33px;
      cursor: pointer;
    }

    .el-date-shortcut__a {
      text-decoration: none;
      font-size: 12px;
      color: #016cdf;
      letter-spacing: -0.29px;
    }

    .el-date-shortcut__a.active {
      color: #333333;
    }
  }

</style>
