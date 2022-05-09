<template>
    <div class="liquidity">
        <div class="title">质押 TRS/USDT 赚取TRS</div>
        <div class="content">
            <div class="dsp_f jc_sb">
                <div>未领取挖矿收益</div>
                <div>{{current}}</div>
            </div>
            <div>我的仓位</div>
            <div class="dsp_f jc_sb">
                <div class="providet dsp_f">
                    <div class="provideTwoImg">
                        <img :src='coinInfo.pre_coin' alt="" />
                        <img :src='coinInfo.next_coin' alt="" />
                    </div>
                    <div>TRS/USDT</div>
                </div>
                <div>{{unStakedLp}}</div>
            </div>
            <div>质押</div>
            <div class="tips">获得流动资金LP，需质押后才开始流动性挖矿</div>
            <div class="dsp_f jc_sb">
                <div>已质押LP</div>
                <div>{{stakedLp}}</div>
            </div>
            <button :disabled="!isApprove" @click="GetReward()" class="btn-box colorget">
                领取收益
            </button>
            <button @click="stakedtrigger()" :disabled="!isApprove" class="btn-box">
                质押
            </button>
            <button @click="GetstakedLpOutPool()" :disabled="!isApprove" class="btn-box">
                取回流动性
            </button>
            <button @click="approveFn()" v-if="!isApprove" class="btn-box">
                授权
            </button>
            <button @click="Goback()" class="btn-box colorback">
                返回
            </button>
        </div>
        <van-popup class="stakepopup" v-model="stakepopup">
            <div>质押</div>
            <div class="balance dsp_f jc_sb">
                <div>可用余额</div>
                <div class="strong">{{unStakedLp}}</div>
            </div>
            <div class="inp_box dsp_f jc_sb">
                <input v-model="inputValue" placeholder="0" class="inp" type="text">
                <div class="btn_max">最大</div>
            </div>
            <div class="btns dsp_f jc_sb">
                <div class="btn" @click="stakedtrigger()">取消</div>
                <div class="btn config">确认</div>
            </div>
        </van-popup>
    </div>
</template>

<script>
import API from "./../api/contract/api"
import Data from "./../utils/data"
let APIs
export default {
    name: 'StakingFrontendProvideliquidity',

    data() {
        return {
            isApprove:false,//是否授权
            stakedLp:0,//抵押的LP
            unStakedLp:0,//未抵押的
            current:0,//当前收益
            coinInfo:'',
            stakepopup:false,//质押弹窗
            inputValue:0,//质押数量
        };
    },

    mounted() {
        console.log("this.$route.query.data =>", this.$route.query.data);
        const poolIndex = this.$route.query.data
        APIs = Data.getCurrentPool(poolIndex).API
        this.coinInfo = Data.getCurrentPool(poolIndex).coinInfo

        this.getdata()
    },

    methods: {
        //质押点击最大
        MaxBtn(){
            this.inputValue = this.unStakedLp
        },
        //质押弹窗
        stakedtrigger(){
            this.stakepopup = !this.stakepopup
        },
        //返回上一页
        Goback() {
            this.$router.go(-1);
        },
        //领取收益
        GetReward(){
            APIs.getReward().then(res => {
                console.log('领取成功',res);
            }).catch( error => {
                console.error(error);
            })
        },
        //授权
         approveFn(){
            APIs.approve().then(res => {
                this.isApprove = res
                console.log('授权成功');
            }).catch(error => {
                console.log("授权失败");
            })
        },
        //质押
        SetstakedLpToPool(){
            if (!this.inputValue) {
                return
            }
            APIs.stakedLpToPool(this.inputValue).then(res => {
                console.log('质押成功');
            })
        },
        //取回流动性
        GetstakedLpOutPool(){
            APIs.stakedLpOutPool().then(res => {
                console.log("stakedLpOutPool:" + res)
            })
        },
        //当前收益
        GetEarned(){
            console.log('开始获取收益');
            APIs.getEarned().then(res => {
                this.current = res
            }).catch( error => {
                console.log('获取失败');
                console.error(error);
            })
        },
        getdata(){
            
            let that = this

            APIs.isApprove().then(res => {
                console.log("是否授权" + res)
                that.isApprove = res
            })
            // 抵押的LP
            APIs.getStakedLp().then(res => {
                that.stakedLp = res
                // console.log("抵押的LP" + res)
            })
            // 未抵押的
            APIs.getUnStakedLp().then(res => {
                that.unStakedLp = res
                // console.log("未抵押的" + res)
            })
            this.GetEarned()
            
        }
    },
};
</script>

<style lang="scss" scoped>
button{
    display: block;
    width: 100%;
    background-color: transparent;
}
.strong{
    font-weight: bold;
}
.liquidity{
    padding: 40px 20px;
    .title{
        color: #06DD7A;
        font-size: 20px;
    }
    .content{
        background-color: #14223d;
        border-radius: 12px;
        margin-top: 15px;
        padding: 15px;
        color: #E3F4FD;
        font-family: 'MicrosoftYaHei';
        >div{
            padding: 5px 0;
        }
        .providet{
        
        }
        .provideTwoImg {
            display: inline-block;
            width: 26px;
            height: 16px;
            position: relative;
            margin-right: 7px;
        }

        .provideTwoImg img {
            position: absolute;
            top: 0;
            width: 16px;
            height: 16px;
        }
        .provideTwoImg img:first-child {
            left: 0;
        }
        .provideTwoImg img:last-child {
            right: 0;
        }
        .tips{
            font-size: 12px;
            color: #667182;
            margin-bottom: 5px;
            padding: 0;
        }
        .btn-box{
            margin: 10px 0;
            color: #fff;
            border: 1px solid #06DD7A;
            border-radius: 6px;
            text-align: center;
            padding: 10px 0;
            cursor: pointer;
        }
        .btn-box[disabled]{
            cursor: not-allowed;
            background-color: rgba(197, 197, 197, 0.1);
            border-color: rgba(6,221,112, 0.1);
            color: rgba(255,255,255,0.3);
        }
        .colorget{
            background-color: #06DD7A;
        }
        .colorback{
            border-color: #667182;
            color: #667182;
        }
    }
    .stakepopup{
        padding: 10px;
        border-radius: 10px;
        width: 80%;
        font-size: 16px;
        .balance{
            padding: 8px 0;
        }
        .inp_box{
            padding: 4px 10px;
            background-color: #bdbcbf;
            border-radius: 4px;
            .inp{
                border: none;
                width: 80%;
                background-color: transparent;
            }
            .btn_max{
                padding: 4px 10px;
                background-color: #06dd7a;
                border-radius: 8px;
                color: #fff;
                font-size: 14px;
            }
            

        }
        .btns{
            margin: 20px 0;
            .btn{
                width: 40%;
                border: 1px solid #06DD7A;
                border-radius: 6px;
                font-size: 15px;
                text-align: center;
                padding: 6px 0;
                color: #06DD7A;
            }
            .config{
                background-color: #06DD7A;
                color: #fff;
            }
        }
    }
}
</style>