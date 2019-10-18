<template>
  <div class="components-container board">
    <Kanban :key="1" :list="list1" :options="options" class="kanban todo" header-text="计划中"/>
    <Kanban :key="2" :list="list2" :options="options" class="kanban working" header-text="进行中"/>
    <Kanban :key="3" :list="list3" :options="options" class="kanban done" header-text="已完成"/>
  </div>
</template>
<script>
import Kanban from '@ui/Dragable/Dragable'

export default {
  name: 'Dragable',
  components: {
    Kanban
  },
  data() {
    return {
      options: {
        group: 'mission'
      },
      list1: [
        { name: '吃饭', id: 1 },
        { name: '睡觉', id: 2 },
        { name: '打豆豆', id: 3 },
        { name: '写代码', id: 4 }
      ],
      list2: [
        { name: '提需求', id: 5 },
        { name: '测试', id: 6 },
        { name: '改bug', id: 7 }
      ],
      list3: [
        { name: '互怼', id: 8 },
        { name: 'ns', id: 9 },
        { name: '放大法师', id: 10 }
      ]
    }
  }
}
</script>
<style lang="less">
.board {
  width: 1000px;
  margin-left: 20px;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  align-items: flex-start;
}
.kanban {
  &todo {
    .board-column-header {
      background: #4A9FF9;
    }
  }
  &working {
    .board-column-header {
      background: #f9944a;
    }
  }
  &done {
    .board-column-header {
      background: #2ac06d;
    }
  }
}
</style>

