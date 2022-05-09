<!-- home -->
<template>
  <div class="home">
    <div class="poolitem">
      <div class="head">
        <div>交易对/TVL</div>
        <div>产量(TRS)</div>
        <div>APY</div>
      </div>
      <div>
        <div @click="Gopath('/provideLiquidity',item.poolIndex)" v-for="(item,index) in PoolData" :key="index" class="minItem">
          <div class="minItemCol1">
              <div class="minItemColH">
                  <div class="minItemImg">
                      <img :src='item.pre_coin' alt="" />
                      <img :src='item.next_coin' alt="" />
                  </div>
                  <span>{{ item.coin_name }}</span>
              </div>
              <div>${{ item.tvl }}</div>
          </div>
          <div class="minItemCol2">
              <div>{{ item.per_day }}(每天)</div>
              <div>{{ item.per_month }}(每月})</div>
          </div>
          <div class="minItemCol3">
              <span>{{ item.apy }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Data from "./../../utils/data"
export default {
  data() {
    return {
      PoolData:[]
    }
  },

  computed: {},

  mounted() { 
    this.info()
  },

  methods: {
    //路由跳转
    Gopath(path,data = ''){
      if (data) {
        this.$router.push({path,query:{data}})
      }else{
        this.$router.push({path})
      }
    },
    info(){
      console.log('data .',Data);
      Data.getPoolListData().then(res => {
          console.log(`setMainList`, res);
          this.PoolData = res.flat
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.home{
  background: #050822;
  height: 100%;
  overflow-y: scroll;
}
.poolitem{
  width: 90%;
  margin: 0 auto;
  border-radius: 15px;
  color: #E3F4FD;
  padding: 10px;
  margin: 20px auto;
  background-color: #14223d;
  .head{
    display: flex;
    justify-content:space-between;
    align-items: center;
    padding:20px 15px;
  }
}
.minItem {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 73px;
    border-top: 1px solid #114749;
    color: #E3F4FD;
    font-family: 'CenturyGothic';
    font-size: 12px;
    text-decoration: none;
}
.minItemCol1 {
    display: flex;
    flex-direction: column;
    width: 45%;
    height: 100%;
    justify-content: center;
}
.minItemColH {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: 5px;
    font-size: 16px;
}
.minItemImg {
    display: inline-block;
    width: 25px;
    height: 16px;
    position: relative;
    margin-right: 5px;
}
.minItemImg img {
    position: absolute;
    top: 0;
    width: 16px;
    height: 16px;
}
.minItemImg img:first-child {
    left: 0;
}
.minItemImg img:last-child {
    right: 0;
}
.minItemCol2 {
    display: flex;
    flex-direction: column;
    width: 30%;
    height: 100%;
    justify-content: center;
    line-height: 20px;
    text-align: center;
}
.minItemCol3 {
    display: flex;
    flex-wrap: wrap;
    width: 25%;
    height: 100%;
    align-items: center;
    justify-content: center;
}
</style>
