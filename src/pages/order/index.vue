<template>
    <div class="home">
    <!-- 搜索框的展示  -->
        <el-form :inline="true" :model="formObj" label-width="5px" size="mini"  class="searchForm">
            <el-form-item class="float_left">
                <el-input placeholder="请输入订单手机号" v-model="formObj.val" @keyup.enter.native="earchForm" clearable></el-input>
            </el-form-item>
            <el-form-item class="float_left">
                <el-input placeholder="请输入订单号" v-model="formObj.merId" @keyup.enter.native="earchForm" clearable></el-input>
            </el-form-item>
            <el-form-item class="float_left">
                <el-date-picker
                v-model="formObj.startTime"
                clearable
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择开始时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item class="float_left">
                <el-date-picker
                v-model="formObj.endTime"
                type="datetime"
                clearable
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择结束时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item class="float_left">
                <el-button @click="earchForm" type="primary">确定</el-button>
            </el-form-item>
        </el-form>
    <!-- 表格的展示 -->
        <el-table
            :data="list"
            empty-text="没有新东西"
            v-loading="loading" 
            :default-sort = "{prop: 'condition', order: 'descending'}"
            element-loading-text="加载中..."
            style="
            height: calc(100% -130px)"
            class="home-table">
            <el-table-column prop="orderNum" align="center" label="订单号"></el-table-column>
            <el-table-column prop="number"  align="center" label="商品名称"></el-table-column>
            <el-table-column prop="address" align="center" label="客户地址"></el-table-column>
            <el-table-column prop="phone" align="center" label="客户电话"></el-table-column>
            <el-table-column prop="shName" align="center" label="客户姓名"></el-table-column>
            <el-table-column prop="startTime" align="center" label="取件时间"></el-table-column>
            <el-table-column prop="endTime" align="center" label="送件时间"></el-table-column>
            <el-table-column prop="iftake" align="center" label="取送方式">
                <template slot-scope="scope">
                    <span v-if="scope.row.iftake==0">达达配送</span>
                    <span v-if="scope.row.iftake==1">用户自取自送</span>
                </template>
            </el-table-column>
            <el-table-column prop="status" align="center" label="支付状况">
                <template slot-scope="scope"> 
                <span v-if="scope.row.status==0">未支付</span>
                <span v-if="scope.row.status==1">支付失败</span>
                <span v-if="scope.row.status==2">支付成功</span>
              </template>
            </el-table-column>
            <el-table-column prop="payMethod" align="center" label="支付方式">
                <template slot-scope="scope"> 
                <span v-if="scope.row.payMethod==0">微信支付</span>
                <span v-if="scope.row.payMethod==1">支付宝支付</span>
              </template>
            </el-table-column>
            <el-table-column prop="createTime" align="center" label="创建时间"></el-table-column>
            <el-table-column prop="remark" align="center" label="客户备注">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" :content="scope.row.remark" placement="top">
                        <span>{{scope.row.remark}}</span>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column
             align="center"
             width="200px"
             label="操作">
            <template slot-scope="scope" width="80%">
                <el-button
                size="mini"
                @click="handleEdit(scope)">接单</el-button>
                <!-- <el-button
                size="mini"
                @click="cexunTuikuan">测试查询接口</el-button> -->
            </template>
            </el-table-column>
        </el-table>
        <div class="pageination">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="searchObj.pageNum"
                :page-sizes="[60, 80, 100, 120, 200]"
                :page-size="searchObj.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="searchObj.totalCount">
            </el-pagination>
        </div>
        <audio src="/static/audio/newgoods.1.mp3"  :id="music" hidden></audio>
    </div>
</template>
<script>
    import qs from 'qs';
    export default {
        components:{
            qs
        },
        data(){
            return {
                music:'music',
                formObj:{//搜索框值
                    val:null,
                    startTime:null,
                    endTime:null,
                    merId:null
                },
                playFlay:false,
                autoplay:' ',
                loading:false,
                list:[],
                arrObj:[],
                searchObj:{
                pageSize:100,
                pageNum:1,
                totalCount:0
                },
                newTotalCount:null,
                vuexTotal:null,
            }
        },
        created () {
            // this.getList()
            this.orderAll();
        },
        computed: {
            listenShowPage () {
                return this.store.state.newTotalCount
            }
        },
        watch: {
            listenShowPage (val,newval) {
                if(val!=0) {
                    this.orderAll();
                }else {
                    this.orderAll();
                }
                console.log('老的val' + val);
                console.log('新的val' + newval);
            }
        },
        methods: {
            //测试调
            ceshiQiTa(scope) {//支付宝退款调试
                console.log(scope);
                let data = qs.stringify({
                    'out_trade_no':scope.row.orderNum,
                    'type':1
                });
                let allApi;
                let api = '/test/alipayRefund/refund?' + data;
                let wechatApi = '/test/weixin/wxRefund?' + data;
                if(scope.row.payMethod==0) {
                    allApi = wechatApi;
                    console.log(allApi);
                }else if(scope.row.payMethod==1){
                    allApi = api;
                    console.log(allApi)
                }
                console.log(api);
                this.$axios.post(api).then((res)=>{
                    console.log(res);
                    if(res.data.retCode == 200) {
                        this.$message('退款成功')
                        this.orderAll();
                    }else {
                        this.$message.error('退款失败');
                    }
                })
            },
            cexunTuikuan () {
                this.$api('findChiltid',{params:{
                    pageNum:'1',pageSize:'10',merchantid:this.store.state.id
                }}).then((res)=>{
                    console.log(res);
                })
            },
            earchForm() {//搜索函数
                // console.log('搜索按钮')
                this.$api('orderAll',{params:{pageNum:this.searchObj.pageNum,pageSize:this.searchObj.pageSize,phone:this.formObj.val,createtime:this.formObj.startTime,endtime:this.formObj.endTime,ordernum:this.formObj.merId,type:"0"}}).then((res)=>{
                    var list = res.data.data.list;
                    this.list = list;
                    this.searchObj.pageSize = res.data.data.pageSize;
                    this.searchObj.pageNum = res.data.data.pageNum;
                    this.searchObj.totalCount = res.data.data.total;
                    console.log(res);
                })
            },
            //点击接单以后前往待发货状态
            handleEdit(scope) {
                console.log(scope)

                this.$confirm('确定接下这单订单？','提示',{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    type:'warning'
                }).then(()=>{
                    console.log(scope.row);
                     this.$api("orderType",{params:{type:"1",orderId:scope.row.id,outTradeNo:scope.row.orderNum,status:"2"}}).then((res)=>{
                        console.log(res);
                        if(res.data.retCode == 200) {
                            this.$message({
                                type:'success',
                                message:'接单成功'
                            })
                            this.orderAll();
                        }else{
                            this.$message({
                                type:'error',
                                message:'接单失败,请重试'
                            })
                        }
                    })
                }).catch(()=>{
                    this.$message({
                        type:'info',
                        message:'取消操作'
                    })
                })
                // this.$api("orderType",{params:{type:"1",orderId:scope.row.id,outTradeNo:scope.row.orderNum,status:"2"}}).then((res)=>{
                //     // debugger;
                //     console.log(res)
                //     var num = scope.$index
                //     console.log(num)
                //     this.orderAll();
                //     this.list[num] = null;
                //     this.music = "music2"
                // })
            },
            //查询所有订单
            orderAll () {
                this.$api('orderAll',{params:{pageNum:this.searchObj.pageNum,pageSize:this.searchObj.pageSize,type:"0"}}).then((res)=>{
                    this.list = [];
                    console.log(res)
                    var list = res.data.data.list;
                    for (var i = 0;i<list.length;i++) {
                        // console.log(list[i].refundStatus);
                        if(list[i].refundStatus==10) {
                            this.list.push(list[i]);
                        }
                    }
                    console.log(this.list)
                    this.store.state.newTotalCount = this.list.length;
                    this.searchObj.pageSize = res.data.data.pageSize;
                    this.searchObj.pageNum = res.data.data.pageNum;
                    this.searchObj.totalCount = this.list.length;
                    // this.newTotalCount = res.data.data.total;
                    // this.store.state.newTotalCount = res.data.data.total;

                })
            },
            handleSizeChange (val) {//改变每页显示多少条
                this.searchObj.pageSize = val;
                this.orderAll()
            },
            handleCurrentChange (val) { //改变前往多少页
                this.searchObj.pageNum = val;
                this.orderAll()
            }
        }
    }
</script>
<style lang="less" scoped>
    .home{
        width: 100%;
        height:100%;
        text-align: center;
        color: black;
        color: rgba(0, 0, 0, 0.349)
        // background-color: aqua;
    }
    .searchForm{
        padding: 10px;

    }
    .searchForm1{
        display: flex;
        flex-wrap: wrap;
        justify-content:center;
        align-items: center;
    }
    .pageination{
        margin-top:10px;
    }
</style>
<style lang="less">
    .home-table{
        width: 100%;
        height: calc(100% - 130px);
        // border:1px solid blue;
    }
    .block{
        padding:10px;
    }
</style>



