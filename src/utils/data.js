import TrsUsdt from './../api/trs-usdt'
import BnbUsdt from './../api/bnb-usdt'
import EthUsdt from './../api/eth-usdt'
import Icon from './icon.js'
import Web3 from "web3";

import {
    multiNum,
    addNum
} from './calc'


function getCurrentPool(type) {
    let API, coinInfo
    switch (type) {
        case "TrsUsdt":
            API = TrsUsdt
            coinInfo = Icon[0]
            break;
        default:
            console.log('error')
    }
    return {
        API,
        coinInfo
    }
}

function getPoolListData(type) {
    return new Promise((resolve, reject) => {
        Promise.all([
            TrsUsdt.getPoolData(),

        ]).then(async res => {
            let coinRate = await getCoinRate() //  汇率
            let trsRate = await getTrsRate() //trs 价格
            let allBalance = 0
            let data = {
                "main": [],
                "flat": [],
                "ideas": []
            }
            let tvl, apy, isall = false
            Icon.forEach((item, index) => {
                console.log('item =>',item)
                // if (index == 14) { debugger }
                // precoin nextcoin 数量 2倍的usdt 取前/后币类的汇率 coinRate[0].rate
                switch (item.coin_price) {
                    case 'ETHPRE':
                        tvl = (((multiNum(res[index].precoin, 2)) * 1) * coinRate[0].rate).toFixed(2)
                        break;
                    case 'USDTPRE':
                        tvl = (((multiNum(res[index].precoin, 2)) * 1)).toFixed(2)
                        break;
                    case 'USDTNEXT':
                        tvl = (((multiNum(res[index].nextcoin, 2)) * 1)).toFixed(2)
                        break;
                    case 'BNBPRE':
                        tvl = (((multiNum(res[index].precoin, 2)) * 1) * coinRate[2].rate).toFixed(2)
                        break;
                    case 'BNBNEXT':
                        tvl = (((multiNum(res[index].nextcoin, 2)) * 1) * coinRate[2].rate).toFixed(2)
                        break;
                    case 'TRSPRE':
                        tvl = (((multiNum(res[index].precoin, 2)) * 1) * coinRate[1].rate).toFixed(2)
                        break;
                    default:
                        console.log(`error`);
                }
                console.log(`tvl`,tvl);
                if (type !== 'all') {
                    if (res[index].supply === '0') {
                        apy = `0.00%`
                        tvl = `0.00`
                    } else {
                        apy = (((res[index].per_day * trsRate.rate) / tvl) * 360 * 100).toFixed(2) + "%"
                    }
                    data[item.key_word].push({
                        ...item,
                        ...res[index],
                        tvl,
                        apy
                    })
                }
                console.log(`res`,res);
                allBalance = addNum(tvl, allBalance)
                // console.log('apy ==>', apy, 'tvl ==>', tvl)

                if (res[index].supply !== '0') {
                    isall = true;
                    // return;
                }

            })
            // Icon.forEach((item, index) => {
            //     if (res[index].supply !== '0') {
            //         isall = true;
            //         return;
            //     }
            // })
            if (type === 'all') {
                if (isall) {
                    resolve(allBalance)
                } else {
                    resolve(0)
                }

            } else {
                resolve(data)

            }

        })
    })

}

function getAllBlock() {
    return new Promise((resolve, reject) => {
        Promise.all([
            TrsUsdt.getLastTime(),
        ]).then(lastTime => {
            getAllRewardRate().then(allRate => {
                getAllStartTime().then(allTime => {
                    let allBalance = 0
                    allTime.forEach((item, index) => {
                        allBalance = allBalance + (lastTime[index] * 1 - item * 1) * allRate[index]
                    })
                    let a = allBalance + 1932500 - 2592245
                    resolve(a)
                })
            })
        }, error => {
            reject(error)
        })
    })
}
// 所有每秒奖励
function getAllRewardRate() {
    return new Promise((resolve, reject) => {
        Promise.all([
            TrsUsdt.getRewardRate(),
        ]).then(res => {
            resolve(res.map((item) => {
                return Web3.utils.fromWei(item, 'ether')
            }))
        }).catch(err => {
            reject(err)
        })
    })
}
// 所有时间
function getAllStartTime() {
    return new Promise((resolve, reject) => {
        Promise.all([
            TrsUsdt.getPoolStartTime(),
        ]).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}
//获取行情的每一个价格 判断usdt前/后
function getAllTrsRate(){
    return new Promise((resolve, reject) => {
        Promise.all([
            TrsUsdt.getTrsRate(),
        ]).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}
function getTrsRate() {
    return TrsUsdt.getTrsRate()
}
// function getTrsRate1() {
//     return Two.getTrsRate('USDTPRE')
// }

//获取汇率
function getCoinRate() {
    return new Promise((resolve, reject) => {
        Promise.all([
            // EthUsdt.getTrsRate(),//ETH
            TrsUsdt.getTrsRate(),//TRS
            // BnbUsdt.getTrsRate(),//BNB
            
        ]).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}
export default {
    getCurrentPool,
    getPoolListData,
    getTrsRate,
    getAllBlock,
    getAllTrsRate
}