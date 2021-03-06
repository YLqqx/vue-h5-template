import Web3 from "web3";
import { daoAbi } from "../abis/daoABI"
import { pairAbi } from "../abis/pairABI"
import { poolAbi } from "../abis/poolABI"
class Contract {
    constructor(options) {
            // addr
            this.PoolAddr = options.PoolAddr
            this.PreTokenAddr = options.PreTokenAddr
            this.NextTokenAddr = options.NextTokenAddr
            this.PairAddr = options.PairAddr
            this.dao7ContractAddress='0x3bb9Fb7Bf918727816c04A893b426252498932D1'//7
            this.dao15ContractAddress='0x4615bd8EDA432dF8529f2E83506Eb46d83f32B21'//15
            this.daoContractAddress='0x374D062eb10BB1696E7520C34923883e948D4901'//30
            this.dao60ContractAddress='0xB6DcDFE9c18d24BF0b992b3decE0086C460c4Dc8'//60
            
                // 合约abi
            this.poolABI = poolAbi
            this.PreTokenABI = options.PreTokenABI
            this.NextTokenABI = options.NextTokenABI
            this.PairABI = pairAbi
            this.directordao7ABI = daoAbi
            this.directordao15ABI = daoAbi
            this.directordaoABI = daoAbi
            this.directordao60ABI = daoAbi
                // 合约对象
            this.huiwanUsdtLoopContract = null
            this.huiwanTokenContract = null
            this.usdtTokenContract = null
            this.huiwanUsdtMdexContract = null
            this.web3 = null
            this.account = null
            this.dao7Contract = null
            this.dao15Contract = null
            this.daoContract = null
            this.dao60ontract = null

            this.init(function(){})
        }

        web3account;
        // 初始化
    init(callback) {
        if(this.web3account){
          callback(this.web3account);
        }else{
        //   console.log('调用初始化方法')
        let _this = this
        let web3Provider
        if (window.ethereum) {
            web3Provider = window.ethereum;
            try {
                // 请求用户授权
                window.ethereum.enable()
                    .then(function(accounts) {
                        //创建web3对象;
                        _this.web3 = new Web3(window.ethereum);
                        _this.account = accounts[0]
                            // 创建合约
                            //

                        _this.huiwanUsdtLoopContract = new _this.web3.eth.Contract(_this.poolABI, _this.PoolAddr);
                        //
                        _this.huiwanTokenContract = new _this.web3.eth.Contract(_this.PreTokenABI, _this.PreTokenAddr);
                        //
                        _this.usdtTokenContract = new _this.web3.eth.Contract(_this.NextTokenABI, _this.NextTokenAddr);
                        //
                        _this.huiwanUsdtMdexContract = new _this.web3.eth.Contract(_this.PairABI, _this.PairAddr);
                        //
                        _this.daoContract = new _this.web3.eth.Contract(_this.directordaoABI, _this.daoContractAddress);
                        _this.dao7Contract = new _this.web3.eth.Contract(_this.directordao7ABI, _this.dao7ContractAddress);
                        _this.dao15Contract = new _this.web3.eth.Contract(_this.directordao15ABI, _this.dao15ContractAddress);
                        _this.dao60Contract = new _this.web3.eth.Contract(_this.directordao60ABI, _this.dao60ContractAddress);

                        //
                        window.accountAddress = accounts[0];
                        // console.log(' _this.account ==>', _this.account)
                        // console.log(' accounts[0] ==>', accounts[0])
                        _this.web3account = accounts[0] 
                        callback(accounts[0]);
                    })
            } catch (error) {
                // 用户不授权时
                console.error("User denied account access")
            }
        } else if (window.web3) {
            web3Provider = window.web3.currentProvider;
            //创建web3对象;
            _this.web3 = new Web3(web3Provider);

            _this.web3.eth.getAccounts(function(error, res) {
                if (!error) {
                    _this.account = res[0]

                    // 创建合约
                    _this.huiwanUsdtLoopContract = new _this.web3.eth.Contract(_this.poolABI, _this.PoolAddr);
                    //
                    _this.huiwanTokenContract = new _this.web3.eth.Contract(_this.PreTokenABI, _this.PreTokenAddr);
                    //
                    _this.usdtTokenContract = new _this.web3.eth.Contract(_this.NextTokenABI, _this.NextTokenAddr);
                    //
                    _this.huiwanUsdtMdexContract = new _this.web3.eth.Contract(_this.PairABI, _this.PairAddr);
                    //
                    _this.daoContract = new _this.web3.eth.Contract(_this.directordaoABI, _this.daoContractAddress);
                    //
                    _this.dao7Contract = new _this.web3.eth.Contract(_this.directordao7ABI, _this.dao7ContractAddress);
                    _this.dao15Contract = new _this.web3.eth.Contract(_this.directordao15ABI, _this.dao15ContractAddress);
                    _this.dao60Contract = new _this.web3.eth.Contract(_this.directordao60ABI, _this.dao60ContractAddress);

                    window.accountAddress = res[0];
                    // console.log('_this.account ==>', _this.account)
                    // console.log('res[0] ==>', res[0])
                    _this.web3account = accounts[0]
                    callback(res[0]);
                }
            })

        }
        // else {
        //     alert("Looks like you need a Dapp browser to get started.");
        //     alert("Consider installing MetaMask!");
        // }
      }
    }
     //7
    // 查询 董事会仓名
    getDao7Name(callback, errorCallBack) {
        let _this = this
        this.dao7Contract && this.dao7Contract.methods
            .symbol()
            .call(function(error, res) {
                if (error) {
                    errorCallBack && errorCallBack(_this.handleError(error));
                } else {
                    callback && callback(res);
                }
            });
    }
    // 查询 董事会 总锁仓量
    getDao7TotalSupply(callback, errorCallBack) {
        let _this = this
        this.dao7Contract && this.dao7Contract.methods
            .totalSupply()
            .call(function(error, res) {
                if (error) {
                    errorCallBack && errorCallBack(_this.handleError(error));
                } else {
                    callback && callback(res);
                }
            });
    }
    // 查询 董事会 我的锁仓量
    getDao7BalanceOf(callback, errorCallBack) {
        let _this = this
        this.dao7Contract && this.dao7Contract.methods
            .balanceOf(window.accountAddress)
            .call(function(error, res) {
                if (error) {
                    errorCallBack && errorCallBack(_this.handleError(error));
                } else {
                    callback && callback(res);
                }
            });
    }
    // 查询 董事会 解锁数量
    getDao7allAvailableAmount(callback, errorCallBack) {
        let _this = this
        this.dao7Contract && this.dao7Contract.methods
            .allAvailableAmount(window.accountAddress)
            .call(function(error, res) {
                if (error) {
                    errorCallBack && errorCallBack(_this.handleError(error));
                } else {
                    callback && callback(res);
                }
            });
    }
    // 查询 董事会 解锁时间
    getDao7RestBlocks(callback, errorCallBack) {
        let _this = this
        this.dao7Contract && this.dao7Contract.methods
            .getRestBlocks(window.accountAddress)
            .call(function(error, res) {
                if (error) {
                    errorCallBack && errorCallBack(_this.handleError(error));
                } else {
                    callback && callback(res);
                }
            });
    }
    // 查询 董事会 是否可领取
    getDao7CanWithdraw(callback, errorCallBack) {
        let _this = this
        this.dao7Contract && this.dao7Contract.methods
            .canWithdraw(window.accountAddress)
            .call(function(error, res) {
                if (error) {
                    errorCallBack && errorCallBack(_this.handleError(error));
                } else {
                    callback && callback(res);
                }
            });
    }
    // 查询 解锁值
    getDao7lockBlocks(callback, errorCallBack) {
        let _this = this
        this.dao7Contract && this.dao7Contract.methods
            .lockBlocks(window.accountAddress)
            .call(function(error, res) {
                if (error) {
                    errorCallBack && errorCallBack(_this.handleError(error));
                } else {
                    callback && callback(res);
                }
            });
    }
    // 查询董事会否授权
    getDao7AccountStakedStatus(callback, errorCallBack) {
        let _this = this
        this.huiwanTokenContract.methods
            .allowance(window.accountAddress, this.dao7ContractAddress)
            .call(function(error, res) {
                if (error) {
                    errorCallBack && errorCallBack(_this.handleError(error));
                } else {
                    callback && callback(res);
                }
            });
    }
    // 董事会 提取
    Dao7Withdraw(callback, errorCallBack) {
        let _this = this
        if (!_this.web3) return
        let data = this.dao7Contract.methods
            .withdraw()
            .encodeABI();
        this.sendTransfer(window.accountAddress, this.dao7ContractAddress, data, callback, errorCallBack);
    }
    // 董事会 确认锁仓
    Dao7Deposit(amount, callback, errorCallBack) {
        // let a = new Date().getTime()
        // console.log('index处理请求 =>',a)
        let data = this.dao7Contract.methods
            .deposit(amount)
            .encodeABI();
        this.sendTransfer(window.accountAddress, this.dao7ContractAddress, data, callback, errorCallBack);
        // console.log('index.js 耗时==>',new Date().getTime() - a)

    }
    // 授权 董事会 huiwanUsdtLoop 池子合约可以帮我在 mdex 配对合约花费我的 100000000 个 lp 份额
    approveDao7HuiwanUsdtLoopAddr(callback, errorCallBack) {
        let _this = this
        if (!_this.web3) return
        let data = this.huiwanTokenContract.methods
            .approve(this.dao7ContractAddress, _this.web3.utils.toWei("100000000"))
            .encodeABI();
        this.sendTransfer(window.accountAddress, this.PreTokenAddr, data, callback, errorCallBack);
    }
    //15
    // 查询 董事会仓名
    getDao15Name(callback, errorCallBack) {
        let _this = this
        this.dao15Contract && this.dao15Contract.methods
            .symbol()
            .call(function(error, res) {
                if (error) {
                    errorCallBack && errorCallBack(_this.handleError(error));
                } else {
                    callback && callback(res);
                }
            });
    }
    // 查询 董事会 总锁仓量
    getDao15TotalSupply(callback, errorCallBack) {
        let _this = this
        this.dao15Contract && this.dao15Contract.methods
            .totalSupply()
            .call(function(error, res) {
                if (error) {
                    errorCallBack && errorCallBack(_this.handleError(error));
                } else {
                    callback && callback(res);
                }
            });
    }
    // 查询 董事会 我的锁仓量
    getDao15BalanceOf(callback, errorCallBack) {
        let _this = this
        this.dao15Contract && this.dao15Contract.methods
            .balanceOf(window.accountAddress)
            .call(function(error, res) {
                if (error) {
                    errorCallBack && errorCallBack(_this.handleError(error));
                } else {
                    callback && callback(res);
                }
            });
    }
    // 查询 董事会 解锁数量
    getDao15allAvailableAmount(callback, errorCallBack) {
        let _this = this
        this.dao15Contract && this.dao15Contract.methods
            .allAvailableAmount(window.accountAddress)
            .call(function(error, res) {
                if (error) {
                    errorCallBack && errorCallBack(_this.handleError(error));
                } else {
                    callback && callback(res);
                }
            });
    }
    // 查询 解锁值
    getDao15lockBlocks(callback, errorCallBack) {
        let _this = this
        this.dao15Contract && this.dao15Contract.methods
            .lockBlocks(window.accountAddress)
            .call(function(error, res) {
                if (error) {
                    errorCallBack && errorCallBack(_this.handleError(error));
                } else {
                    callback && callback(res);
                }
            });
    }
    // 查询 董事会 解锁时间
    getDao15RestBlocks(callback, errorCallBack) {
        let _this = this
        this.dao15Contract && this.dao15Contract.methods
            .getRestBlocks(window.accountAddress)
            .call(function(error, res) {
                if (error) {
                    errorCallBack && errorCallBack(_this.handleError(error));
                } else {
                    callback && callback(res);
                }
            });
    }

    // 查询 董事会 是否可领取
    getDao15CanWithdraw(callback, errorCallBack) {
        let _this = this
        this.dao15Contract && this.dao15Contract.methods
            .canWithdraw(window.accountAddress)
            .call(function(error, res) {
                if (error) {
                    errorCallBack && errorCallBack(_this.handleError(error));
                } else {
                    callback && callback(res);
                }
            });
    }

    
    // 查询董事会否授权
    getDao15AccountStakedStatus(callback, errorCallBack) {
        let _this = this
        this.huiwanTokenContract.methods
            .allowance(window.accountAddress, this.dao15ContractAddress)
            .call(function(error, res) {
                if (error) {
                    errorCallBack && errorCallBack(_this.handleError(error));
                } else {
                    callback && callback(res);
                }
            });
    }
    // 董事会 提取
    Dao15Withdraw(callback, errorCallBack) {
        let _this = this
        if (!_this.web3) return
        let data = this.dao15Contract.methods
            .withdraw()
            .encodeABI();
        this.sendTransfer(window.accountAddress, this.dao15ContractAddress, data, callback, errorCallBack);
    }

     // 董事会 确认锁仓
     Dao15Deposit(amount, callback, errorCallBack) {
        let data = this.dao15Contract.methods
            .deposit(amount)
            .encodeABI();
        this.sendTransfer(window.accountAddress, this.dao15ContractAddress, data, callback, errorCallBack);
    }

     // 授权 董事会 huiwanUsdtLoop 池子合约可以帮我在 mdex 配对合约花费我的 100000000 个 lp 份额
     approveDao15HuiwanUsdtLoopAddr(callback, errorCallBack) {
        let _this = this
        if (!_this.web3) return
        let data = this.huiwanTokenContract.methods
            .approve(this.dao15ContractAddress, _this.web3.utils.toWei("100000000"))
            .encodeABI();
        this.sendTransfer(window.accountAddress, this.PreTokenAddr, data, callback, errorCallBack);
    }
    //30
    // 查询 董事会仓名
    getDaoName(callback, errorCallBack) {
        let _this = this
        this.daoContract && this.daoContract.methods
            .symbol()
            .call(function(error, res) {
                if (error) {
                    errorCallBack && errorCallBack(_this.handleError(error));
                } else {
                    callback && callback(res);
                }
            });
    }
    // 查询 董事会 总锁仓量
    getDaoTotalSupply(callback, errorCallBack) {
        let _this = this
        this.daoContract && this.daoContract.methods
            .totalSupply()
            .call(function(error, res) {
                if (error) {
                    errorCallBack && errorCallBack(_this.handleError(error));
                } else {
                    callback && callback(res);
                }
            });
    }
    // 查询 董事会 我的锁仓量
    getDaoBalanceOf(callback, errorCallBack) {
        let _this = this
        this.daoContract && this.daoContract.methods
            .balanceOf(window.accountAddress)
            .call(function(error, res) {
                if (error) {
                    errorCallBack && errorCallBack(_this.handleError(error));
                } else {
                    callback && callback(res);
                }
            });
    }
    // 查询 董事会 解锁数量
    getDaoallAvailableAmount(callback, errorCallBack) {
        let _this = this
        this.daoContract && this.daoContract.methods
            .allAvailableAmount(window.accountAddress)
            .call(function(error, res) {
                if (error) {
                    errorCallBack && errorCallBack(_this.handleError(error));
                } else {
                    callback && callback(res);
                }
            });
    }
    // 查询 董事会 解锁时间
    getDaoRestBlocks(callback, errorCallBack) {
        let _this = this
        this.daoContract && this.daoContract.methods
            .getRestBlocks(window.accountAddress)
            .call(function(error, res) {
                if (error) {
                    errorCallBack && errorCallBack(_this.handleError(error));
                } else {
                    callback && callback(res);
                }
            });
    }
    // 查询 解锁值
    getDaolockBlocks(callback, errorCallBack) {
        let _this = this
        this.daoContract && this.daoContract.methods
            .lockBlocks(window.accountAddress)
            .call(function(error, res) {
                if (error) {
                    errorCallBack && errorCallBack(_this.handleError(error));
                } else {
                    callback && callback(res);
                }
            });
    }
    // 查询 董事会 是否可领取
    getDaoCanWithdraw(callback, errorCallBack) {
        let _this = this
        this.daoContract && this.daoContract.methods
            .canWithdraw(window.accountAddress)
            .call(function(error, res) {
                if (error) {
                    errorCallBack && errorCallBack(_this.handleError(error));
                } else {
                    callback && callback(res);
                }
            });
    }  
    // 查询董事会否授权
    getDaoAccountStakedStatus(callback, errorCallBack) {
        let _this = this
        this.huiwanTokenContract.methods
            .allowance(window.accountAddress, this.daoContractAddress)
            .call(function(error, res) {
                if (error) {
                    errorCallBack && errorCallBack(_this.handleError(error));
                } else {
                    callback && callback(res);
                }
            });
    }
    // 董事会 提取
    DaoWithdraw(callback, errorCallBack) {
        let _this = this
        if (!_this.web3) return
        let data = this.daoContract.methods
            .withdraw()
            .encodeABI();
        this.sendTransfer(window.accountAddress, this.daoContractAddress, data, callback, errorCallBack);
    }
     // 董事会 确认锁仓
     DaoDeposit(amount, callback, errorCallBack) {
        let data = this.daoContract.methods
            .deposit(amount)
            .encodeABI();
        this.sendTransfer(window.accountAddress, this.daoContractAddress, data, callback, errorCallBack);
    }
     // 授权 董事会 huiwanUsdtLoop 池子合约可以帮我在 mdex 配对合约花费我的 100000000 个 lp 份额
     approveDaoHuiwanUsdtLoopAddr(callback, errorCallBack) {
        let _this = this
        if (!_this.web3) return
        let data = this.huiwanTokenContract.methods
            .approve(this.daoContractAddress, _this.web3.utils.toWei("100000000"))
            .encodeABI();
        this.sendTransfer(window.accountAddress, this.PreTokenAddr, data, callback, errorCallBack);
    }

    //60
    // 查询 董事会仓名
    getDao60Name(callback, errorCallBack) {
        let _this = this
        this.dao60Contract && this.dao60Contract.methods
            .symbol()
            .call(function(error, res) {
                if (error) {
                    errorCallBack && errorCallBack(_this.handleError(error));
                } else {
                    callback && callback(res);
                }
            });
    }
    // 查询 董事会 总锁仓量
    getDao60TotalSupply(callback, errorCallBack) {
        let _this = this
        this.dao60Contract && this.dao60Contract.methods
            .totalSupply()
            .call(function(error, res) {
                if (error) {
                    errorCallBack && errorCallBack(_this.handleError(error));
                } else {
                    callback && callback(res);
                }
            });
    }
    // 查询 董事会 我的锁仓量
    getDao60BalanceOf(callback, errorCallBack) {
        let _this = this
        this.dao60Contract && this.dao60Contract.methods
            .balanceOf(window.accountAddress)
            .call(function(error, res) {
                if (error) {
                    errorCallBack && errorCallBack(_this.handleError(error));
                } else {
                    callback && callback(res);
                }
            });
    }
    // 查询 董事会 解锁数量
    getDao60allAvailableAmount(callback, errorCallBack) {
        let _this = this
        this.dao60Contract && this.dao60Contract.methods
            .allAvailableAmount(window.accountAddress)
            .call(function(error, res) {
                if (error) {
                    errorCallBack && errorCallBack(_this.handleError(error));
                } else {
                    callback && callback(res);
                }
            });
    }
    // 查询 董事会 解锁时间
    getDao60RestBlocks(callback, errorCallBack) {
        let _this = this
        this.dao60Contract && this.dao60Contract.methods
            .getRestBlocks(window.accountAddress)
            .call(function(error, res) {
                if (error) {
                    errorCallBack && errorCallBack(_this.handleError(error));
                } else {
                    callback && callback(res);
                }
            });
    }
    // 查询 解锁值
    getDao60lockBlocks(callback, errorCallBack) {
        let _this = this
        this.dao60Contract && this.dao60Contract.methods
            .lockBlocks(window.accountAddress)
            .call(function(error, res) {
                if (error) {
                    errorCallBack && errorCallBack(_this.handleError(error));
                } else {
                    callback && callback(res);
                }
            });
    }
    // 查询 董事会 是否可领取
    getDao60CanWithdraw(callback, errorCallBack) {
        let _this = this
        this.dao60Contract && this.dao60Contract.methods
            .canWithdraw(window.accountAddress)
            .call(function(error, res) {
                if (error) {
                    errorCallBack && errorCallBack(_this.handleError(error));
                } else {
                    callback && callback(res);
                }
            });
    } 
    // 查询董事会否授权
    getDao60AccountStakedStatus(callback, errorCallBack) {
        let _this = this
        this.huiwanTokenContract.methods
            .allowance(window.accountAddress, this.dao60ContractAddress)
            .call(function(error, res) {
                if (error) {
                    errorCallBack && errorCallBack(_this.handleError(error));
                } else {
                    callback && callback(res);
                }
            });
    }
    // 董事会 提取
    Dao60Withdraw(callback, errorCallBack) {
        let _this = this
        if (!_this.web3) return
        let data = this.dao60Contract.methods
            .withdraw()
            .encodeABI();
        this.sendTransfer(window.accountAddress, this.dao60ContractAddress, data, callback, errorCallBack);
    }
    // 董事会 确认锁仓
    Dao60Deposit(amount, callback, errorCallBack) {
        let data = this.dao60Contract.methods
            .deposit(amount)
            .encodeABI();
        this.sendTransfer(window.accountAddress, this.dao60ContractAddress, data, callback, errorCallBack);
    }
    // 授权 董事会 huiwanUsdtLoop 池子合约可以帮我在 mdex 配对合约花费我的 100000000 个 lp 份额
    approveDao60HuiwanUsdtLoopAddr(callback, errorCallBack) {
        let _this = this
        if (!_this.web3) return
        let data = this.huiwanTokenContract.methods
            .approve(this.dao60ContractAddress, _this.web3.utils.toWei("100000000"))
            .encodeABI();
        this.sendTransfer(window.accountAddress, this.PreTokenAddr, data, callback, errorCallBack);
    }
    // 
    // 查询用户是否授权
    getAccountStakedStatus(callback, errorCallBack) {
        let _this = this
        this.huiwanUsdtMdexContract.methods
            .allowance(window.accountAddress, this.PoolAddr)
            .call(function(error, res) {
                if (error) {
                    errorCallBack && errorCallBack(_this.handleError(error));
                } else {
                    callback && callback(res);
                }
            });
    }

    // 查询 huiwanUsdtLoop 池子初始奖励数量 57600000000000000000000
    getInitreward(callback, errorCallBack) {
        let _this = this
        this.huiwanUsdtLoopContract && this.huiwanUsdtLoopContract.methods
            .initreward()
            .call(function(error, res) {
                if (error) {
                    errorCallBack && errorCallBack(_this.handleError(error));
                } else {
                    callback && callback(res);
                }
            });
    }

    // 查询项目方 huiwanUsdtLoop 池子里面的 lp 总数量
    getTotalSupply(callback, errorCallBack) {
        let _this = this
        this.huiwanUsdtLoopContract.methods
            .totalSupply()
            .call(function(error, res) {
                if (error) {
                    errorCallBack && errorCallBack(_this.handleError(error));
                } else {
                    callback && callback(res);
                }
            });
    }

    // 查询某个用户在 huiwanUsdtLoop 池子中的当前收益
    getEarned(account, callback, errorCallBack) {
            let _this = this
            this.huiwanUsdtLoopContract.methods
                .earned(account)
                .call(function(error, res) {
                    if (error) {
                        errorCallBack && errorCallBack(_this.handleError(error));
                    } else {
                        callback && callback(res);
                    }
                });
        }
        // 最新时间
    getLastTime(callback, errorCallBack) {
        let _this = this
        this.huiwanUsdtLoopContract.methods
            .lastTimeRewardApplicable()
            .call(function(error, res) {
                if (error) {
                    errorCallBack && errorCallBack(_this.handleError(error));
                } else {
                    callback && callback(res);
                }
            });
    }

    // 查询 mdex 中配对合约拥有 huiwanToken 的数量
    getBalanceFromHuiwanTokenContract(callback, errorCallBack) {
        let _this = this
        this.huiwanTokenContract.methods
            .balanceOf(_this.PairAddr)
            .call(function(error, res) {
                if (error) {
                    errorCallBack && errorCallBack(_this.handleError(error));
                } else {
                    callback && callback(res);
                }
            });
    }

    // 获取用户trs数量 
    getWalletAllTrs(callback, errorCallBack) {
        let _this = this
        this.huiwanTokenContract.methods
            .balanceOf(_this.account)
            .call(function(error, res) {
                if (error) {
                    errorCallBack && errorCallBack(_this.handleError(error));
                } else {
                    callback && callback(res);
                }
            });
    }

    // 查询 mdex 中配对合约拥有 usdtToken 的数量
    getBalanceFromUsdtTokenContract(callback, errorCallBack) {
        let _this = this
        this.usdtTokenContract.methods
            .balanceOf(_this.PairAddr)
            .call(function(error, res) {
                if (error) {
                    errorCallBack && errorCallBack(_this.handleError(error));
                } else {
                    callback && callback(res);
                }
            });
    }
   
    // 授权 huiwanUsdtLoop 池子合约可以帮我在 mdex 配对合约花费我的 100000000 个 lp 份额
    approveHuiwanUsdtLoopAddr(callback, errorCallBack) {
        let _this = this
        if (!_this.web3) return
        let data = this.huiwanUsdtMdexContract.methods
            .approve(this.PoolAddr, _this.web3.utils.toWei("100000000"))
            .encodeABI();
        this.sendTransfer(window.accountAddress, this.PairAddr, data, callback, errorCallBack);
    }

    // 在 mdex 配对合约中获取我的 lp 数量
    getBalanceFromhuiwanUsdtMdexContract(account, callback, errorCallBack) {
        let _this = this
        this.huiwanUsdtMdexContract.methods
            .balanceOf(account)
            .call(function(error, res) {
                if (error) {
                    errorCallBack && errorCallBack(_this.handleError(error));
                } else {
                    callback && callback(res);
                }
            });
    }

    // 抵押 lp 到 huiwanUsdtLoop 池子
    stakingToHuiwanUsdtLoopContract(amount, callback, errorCallBack) {
        let data = this.huiwanUsdtLoopContract.methods
            .stake(amount)
            .encodeABI();
        this.sendTransfer(window.accountAddress, this.PoolAddr, data, callback, errorCallBack);
    }

    // 查询某个用户在 huiwanUsdtLoop 池子中的余额
    getBalanceFromHuiwanUsdtLoopContract(account, callback, errorCallBack) {
        let _this = this
        this.huiwanUsdtLoopContract.methods
            .balanceOf(account)
            .call(function(error, res) {
                if (error) {
                    errorCallBack && errorCallBack(_this.handleError(error));
                } else {
                    callback && callback(res);
                }
            });
    }

    // 解押
    withdrawFromHuiwanUsdtLoopContract(callback, errorCallBack) {
        let data = this.huiwanUsdtLoopContract.methods.withdraw().encodeABI();
        this.sendTransfer(window.accountAddress, this.PoolAddr, data, callback, errorCallBack);
    }

    // 每秒挖矿产出
    getRewardRate(callback, errorCallBack) {
            let _this = this
            this.huiwanUsdtLoopContract.methods
                .rewardRate().call(function(error, res) {
                    if (error) {
                        errorCallBack && errorCallBack(_this.handleError(error));
                    } else {
                        callback && callback(res);
                    }
                });
        }
        // 矿池开始时间
    getPoolStartTime(callback, errorCallBack) {
        let _this = this
        this.huiwanUsdtLoopContract.methods
            .starttime().call(function(error, res) {
                if (error) {
                    errorCallBack && errorCallBack(_this.handleError(error));
                } else {
                    callback && callback(res);
                }
            });
    }

    // 查询某个用户在 huiwanUsdtLoop 池子中的当前LP余额
    getPoolLP(account, callback, errorCallBack) {
        let _this = this
        this.huiwanUsdtLoopContract.methods
            .balanceOf(account)
            .call(function(error, res) {
                if (error) {
                    errorCallBack && errorCallBack(_this.handleError(error));
                } else {
                    callback && callback(res);
                }
            });
    }

    // 通过交易哈希查询 交易是否成功
    getDealStatusByHash(hash, callback) {
        this.web3 && this.web3.eth.getTransactionReceipt(hash, callback)


    }

    // 获取所有收益
    getReward(callback, errorCallBack) {
        let data = this.huiwanUsdtLoopContract.methods.getReward()
            .encodeABI();
        this.sendTransfer(window.accountAddress, this.PoolAddr, data, callback, errorCallBack)
        // .on('transactionHash', function(hash){
        //     console.log('确定领取');
        // }).on('confirmation', function(confirmationNumber, receipt){
        //     console.log('领取成功');
            
        // });
    }


    // 获取&解押
    getExit(callback, errorCallBack) {
        let data = this.huiwanUsdtLoopContract.methods.exit()
            .encodeABI();
        this.sendTransfer(window.accountAddress, this.PoolAddr, data, callback, errorCallBack);
    }

    sendTransfer2(account,to,data){
      this.web3.eth.sendTransaction({
        data:data,
        from: account,
        to: to
    })
    .then(function(receipt){
        console.log(receipt)
    });
    }

    // /**
    //  * 发送交易
    //  * @param {Object} account 用户地址
    //  * @param {Object} to 合约地址
    //  * @param {Object} data 数据
    //  * @param {Object} callback 返回hash
    //  * @param {Object} errorCallBack 返回的错误
    //  */
    sendTransfer(account, to, data, callback, errorCallBack) {
        let _this = this
        let value = 0x0;
        //获取gaslimit
        _this.web3 && _this.web3.eth.estimateGas({
                from: account,
                to: to,
                data: data,
                value: value,
            },
            function(error1, gaslimit) {
                if (error1) {
                    // alert(error1);
                    errorCallBack(_this.handleError(error1));
                } else {
                    //获取gasprice
                    _this.web3 && _this.web3.eth.getGasPrice(function(error2, gasPrice) {
                        console.log('gasPrice =>',gasPrice)
                        console.log('gaslimit =>',gaslimit)
                        if (error2) {
                            errorCallBack(_this.handleError(error2));
                        } else {
                            gaslimit -= -10000;
                            let params = [{
                                // gasPrice: gasPrice,
                                // gasLimit: gaslimit,
                                to: to,
                                from: account,
                                data: data,
                                value: value,
                            }, ];
                            //提交交易
                            window.ethereum.sendAsync({
                                    method: "eth_sendTransaction",
                                    params: params,
                                    from: account,
                                },
                                function(error, hash) {
                                    // console.log(JSON.stringify(hash))
                                    if (error) {
                                        // console.log("发起交易失败：");
                                        errorCallBack && errorCallBack(_this.handleError(error));
                                    } else {
                                        // console.log("交易参数params:");
                                        // console.log(params);
                                        // console.log(`${hash}`);
                                        callback(JSON.parse(JSON.stringify(hash)));
                                    }
                                }
                            );
                        }
                    });
                }
            }
        );
    }

    // init 进一步封装

    initFnPromise() {
        return new Promise((resolve, reject) => {
            this.init((res) => {
                if (res) {
                    resolve(res)
                } else {
                    reject('error')
                }
            })
        })
    }

    handleError(errorMsg) {
        if ("message" in errorMsg) {
            return errorMsg.message;
        }
        errorMsg = errorMsg.toString();
        errorMsg = errorMsg.replace(/\s+/g, " ");
        errorMsg = errorMsg.replace(/.+\\"message\\"\\:\s*\\"(.+)\\".+/, "$1");
        return errorMsg;
    }


}



export default Contract