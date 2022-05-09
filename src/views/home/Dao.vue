<!-- home -->
<template>
  <div class="about-container">
    DAO
  </div>
</template>

<script>
// 请求接口
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters(['userName'])
  },
  mounted() {
  },
  methods: {
  }
}
</script>
<style lang="scss">
</style>
