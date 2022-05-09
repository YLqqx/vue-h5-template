<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App'
}
</script>
<style lang="scss">
.dsp_f{
  display: flex;
  align-items: center;
}
.jc_sb{
  justify-content: space-between;
}
.jc_sa{
  justify-content: space-around;
}
.jc_c{
  justify-content: center;
}
</style>
