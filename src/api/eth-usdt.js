import { ethAbi } from './abis/ethABI' // pre-abi
import { usdtAbi } from './abis/usdtABI' // next-abi
import Contract from './contract/index'
import API from './contract/api'

// pre-next ETH/USDT
const ethAddr = `0xC628257ceA4F150942291B7331330fB34DC0c3C2` // pre-coin
const usdtAddr = `0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd` // next-coin
const ethUsdtPairAddr = `0x91F88121BadB5708b8Af12d3146AB709BB5D636a` // pre-next-pair
const ethUsdtPoolAddr = `0x7FC15Bfd8a43f5c076D38f89418D2dCBFAEdeF66` // pre-next-pool

const PreTokenAddr = ethAddr
const NextTokenAddr = usdtAddr
const PairAddr = ethUsdtPairAddr
const PoolAddr = ethUsdtPoolAddr

// pre-next TRS/USDT
const PreTokenABI = ethAbi //pre-abi
const NextTokenABI = usdtAbi //next-abi



const contract = new Contract({
    PoolAddr,
    PreTokenAddr,
    NextTokenAddr,
    PairAddr,
    PreTokenABI,
    NextTokenABI,
})


export default new API(contract)