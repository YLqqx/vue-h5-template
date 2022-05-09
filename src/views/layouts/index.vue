<template>
  <div class="app-container">
    <div class="layout-content">
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view></router-view>
      </keep-alive>
      <router-view v-else></router-view>
    </div>
    <div class="layout-footer">
      <TabBar :data="tabbars" @change="handleChange" />
    </div>
  </div>
</template>

<script>
import TabBar from '@/components/TabBar'
export default {
  name: 'AppLayout',
  data() {
    return {
      tabbars: [
        {
          title: '矿池',
          to: {
            name: 'Mining'
          },
          icon: 'home-o'
        },
        {
          title: '董事会',
          to: {
            name: 'Dao'
          },
          icon: 'user-o'
        }
      ]
    }
  },
  components: {
    TabBar
  },
  methods: {
    handleChange(v) {
      console.log('tab value:', v)
    }
  }
}
</script>
<style lang="scss" scoped>
.layout-content{
  height: calc(100vh - 50px);
  background-color: #050822;
}
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>