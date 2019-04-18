<template>
    <div class="goods">
      <el-form :inline="true" :model="searchObj" label-width="5px" size="mini" @submit.native.prevent  class="searchForm">
        <el-form-item class="float_left">
          <el-select v-model="searchObj.productType" placeholder="商品类型" @change="changeValue" clearable>
            <el-option v-for="channel in shopType" :key="channel.id" :label="channel.name" :value="channel.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="float_left">
            <el-button @click="earchForm" type="primary">确定</el-button>
        </el-form-item>
        <el-form-item class="float_right">
          <el-button type="primary" @click="add">添加商品</el-button>
          <!-- <el-button type="primary" @click="addtype">添加商品类型</el-button> -->
        </el-form-item>
      </el-form>

      <el-table class="goods-table" height="calc(100% - 105px)" border :data="list1">
        <el-table-column prop="name" label="商品名称" align="center" ></el-table-column>
        <el-table-column prop="upName" label="商品类型" align="center"></el-table-column>
        <el-table-column prop="img" label="商品logo" align="center">
          <template slot-scope="scope">
            <img :src="'http://www.pigcome.com:81/' + scope.row.img" alt="商品logo" class="itemImage">
          </template>
        </el-table-column>
        <el-table-column prop="price" label="商品价格" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="edit(scope)">编辑</el-button>
            <el-button @click="deleShop(scope.row)" type="text" size="mini">删除</el-button>
          </template>  
        </el-table-column>
      </el-table>
      <el-dialog :modal-append-to-body="false" :title="title" center @close="close(addform)" :visible.sync="dialogVisible" :show-close="false" width="900px">
        <el-form :inline="true" :model="addform" ref="addform" label-width="150px" class="searchFrom demo-form-inline" >
          <el-form-item label="商品类型" prop="upName" class="myitem" >
            <el-select v-model="addform.type" clearable placeholder="请选择商品类型" @change="getShop" :disabled='typeId' value-key="id">
              <el-option v-for="item in this.shopType" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
            <i class="el-icon-question" @click="problem"></i>
          </el-form-item>
          <el-form-item label="商品名称" prop="name" class="myitem">
            <el-select v-model="addform.id" clearable placeholder="请选择商品名称" :disabled="typeId" value-key="id">
              <el-option v-for="item in this.classShop" :key="item.id" :label="item.name" :value="item.id" :disabled="item.type"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品价格" prop="price" class="myitem">
            <el-input type="text" placeholder="请输入商品金额" @blur='input1' v-model="addform.price" >
              <template slot="append">元</template>
            </el-input> 
          </el-form-item>
          <el-form-item label="限购数量：" prop="limitNum" class="myitem">
            <el-input type="text" placeholder="填写限购数量" :disabled='typeId'  v-model="addform.limitNum" >
            </el-input> 
          </el-form-item>
          <el-form-item label="是否包邮" prop="ifMail" class="myitem" value-key="id">
            <el-select v-model="addform.ifMail" clearable placeholder="选择是否包邮" :disabled='typeId' value-key="id">
              <el-option v-for="item in this.MailShop" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品分区" class="myitem">
            <el-select v-model="addform.ifLow" clearable placeholder="是否是起送价商品" :disabled="typeId" value-key="id">
              <el-option v-for="item in this.lowShop" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="close(addform)">取消</el-button>
          <el-button type="primary" @click="save">保存</el-button>
        </span>
      </el-dialog>

      <!-- <el-dialog :modal-append-to-body="false" :title="title" center @close="close(tableData)" :visible.sync="myDisable" :show-close="false" width="900px">
        <el-form :inline="true" :model="tableData" ref="imgType" label-width="150px" class="searchFrom demo-form-inline" >
          <el-form-item label="产品类型：" prop="higherup" class="myitem">
            <el-select v-model="tableData.higherup" clearable placeholder="请选择产品的类型" @change="getShop" :disabled='typeId'>
              <el-option v-for="item in this.shopType" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select> 
          </el-form-item>
          <el-form-item label="产品名称：" prop="name" class="myitem">
            <el-input type="text" placeholder="输入产品名称" v-model="tableData.name" ></el-input> 
          </el-form-item>
          <el-form-item label="上传产品图片：">
            <el-upload
              name="img"
              :data="tableData"
              class="avatar-uploader"
              action="/api/type/addByType"
              :show-file-list="true"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i><br>
              <small class="uploadSmall">建议使用750*750，10M以内的jpg、png图片</small>
            </el-upload>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="ImgClose(tableData)">取消</el-button>
          <el-button type="primary" @click="ImgSave(tableData)">保存</el-button>
        </span>
      </el-dialog> -->
      <el-dialog :modal-append-to-body="false" title="意见和建议" @close="problemeClose(nputVal)" center :show-close="true" :visible.sync='opinion' width="400px">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="没有您想要的商品？提出您想要添加的商品。我们尽快为您添加处理"
          v-model="nputVal">
        </el-input>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="problemeClose(nputVal)">取消</el-button>
          <el-button type="primary" @click="Problemesave">保存</el-button>
        </span>
      </el-dialog>
      <!-- 这里是分页功能 -->
      <div class="pageination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="searchObj.pageNum"
          :page-sizes="[10, 15, 20, 35]"
          :page-size="searchObj.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="searchObj.totalCount">
        </el-pagination> 
      </div>
      <audio src="/static/audio/newgoods.1.mp3"  id="music" hidden></audio>
    </div>
</template>
<script>
  export default {
    data () {
      return {
        shopNameId:null,//编辑商品时候商品的id
        imageUrl:null,
        myDisable:false,
        tableData:{
          name:null,
          higherup:null,
          status:"4"
        },
        opinion:false,//意见控制符
        nputVal:null,//意见字符串
        typeId:false,
        disable:false,//是否禁用select框
        dialogVisible: false,
        dis:false,
        title: null,
        searchObj: {
          createDay: null,
          searchContent: null,
          sortField: null,
          sortOrder: null,
          updateDay: null,
          topicalName: null,
          channelId: null,
          productType: null,
          pageNum: 1,
          pageSize: 10,
          totalCount:0
        },
        actionType:null,//操作类型
        higherup:null, //搜索框需要传递的参数(这是商品类型)
        shopId:null,//商户的id
        remark:' ',//没用的消息
        MailShop:[//是否包邮
          {id:0,name:'不包邮'},
          {id:1,name:'包邮'}
        ],
        lowShop:[//是不是特价商品
          {id:1,name:'普通商品'},
          {id:0,name:'起送价商品'}
        ],
        addform: {//弹出框对象
          id:null,
          merchantid:null,
          name:null,
          number:null,
          type:null,
          upName:null,
          price:null,
           limitNum:0,//限购数量
          ifMail:null,//是否包邮
          ifLow:null//是否是特价区
        },
        type3:null,
        shopType:[],//商品类型
        classShop:[],//根据商品类型获得相应的商品
        addShop:[],
        productTypes: [],
        list1:[]
      }
    },
    created () {
      this.ces();
      this.status();
    },
    methods: {
      problem() {//问题反馈
        this.opinion = true;
        this.$api('merchantChange',{params:{merchantid:this.store.state.id}}).then((res)=>{
          console.log(res);
          this.shopId = res.data.data.userId;
          // this.actionType = 3
        })
        console.log('问题提交问题')
      },
      Problemesave () {
        this.$api('addFeedback',{userid:this.shopId,content:this.nputVal}).then((res)=>{
            if(res.data.retCode==200) {
              this.$message({
                message:'反馈成功',
                type:'success'
              })
            }else {
              this.$message.error('反馈失败，请重试');
            }
            
          this.opinion = false;
          })
      },
      handleAvatarSuccess(res, file) {//图片上传函数
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {//图片上传函数
        const isJPG = /image\/[jpeg|jpg|png]/.test(file.type);
          const isLt1M = file.size / 1024 / 1024 < 10;

          if (!isJPG) {
          this.$message.error("上传LOGO图片格式应为jpeg|jpg|png!");
          }
          if (!isLt1M) {
          this.$message.error("上传LOGO图片大小不能超过 10MB!");
          }
          return isJPG && isLt1M;
      }, 
       
      ImgClose (tableData) {//添加商品类型的函数取消函数
        this.myDisable = false;
        // console.log(tableData)
        for(var i = 0;i<tableData.length;i++) {
          tableData[i].name = null;
          tableData[i].higherup = null;
        }
      },
      ImgSave (tableData) {//
      },
      input1 () {//输入的金额判断
        var num = this.addform.price;
        var re = /([0-9]+\.[0-9]{2})[0-9]*/;
        var aNew = num.replace(re,"$1");
        this.addform.price = aNew;
      },
      stop() {
        this.dis = true;
      },
      getShop(){//这里是点击商品类型获取相应商品
        this.clasShop()
      },
      deleShop(scope) {//删除商品相当于下架订单
        console.log(scope);
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
          }).then(() => {
            this.$api("delshop",{id:scope.id}).then((res)=>{
              if(res.data.retCode==200){
                this.ces()
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              }else {
                this.$message({
                  type: 'success',
                  message: '删除失败!'
                });
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });          
          });
      },
      save () {//保存
        console.log(this.addform)
        if(this.actionType==1){
          this.$api("addshop",{typeid:this.addform.id,price:this.addform.price,remark:"",primaryPrice:this.addform.price,limitNum:this.addform.limitNum,ifMail:this.addform.ifMail,ifLow:this.addform.ifLow}).then((res)=>{
            console.log(res)
            if(res.data.retCode!==200) {
              this.$message('添加失败')
            }else{
              this.$message('添加成功')
              this.ces()
            }
          })
          this.dialogVisible = false;
        }
        if(this.actionType==2) {
          this.$api('upshop',{id:this.shopNameId,price:this.addform.price,remark:'',primaryPrice:0}).then((res)=>{
            console.log(res)
            if(res.data.retCode!==200) {
              this.$message('修改失败')
            }else{
              this.$message('修改成功')
            }
          })
          this.dialogVisible = false;
          this.ces()
        }
        // if(this.actionType ==3) {
          
        // }
      },
      problemeClose(nputVal) {//意见弹框消失
        nputVal = null;
        this.opinion = false;
      },
      close (addform) {//取消的时候数据消失
        this.ces()
        this.dialogVisible = false;
        this.typeId =false;
        for(var i in addform) {
          addform[i] = null;
        }
      },
      changeValue (value) {//这里获取搜索框的id
        var obj={};
        obj = this.productTypes.find((item)=>{
          return item.id == value
        });
         this.higherup = value
         console.log(this.higherup)
         console.log(obj)
      },
      status () {//查询我们的所有商品的类型
        this.$api('typeStatus',{params:{status:"1"}}).then((res)=>{
          console.log(res.data.data);
          this.shopType = res.data.data
        })
      },
      clasShop () {//这里根据商品类型查询相应的商品集
      // debugger;
        this.$api('typeFind',{params:{id:this.addform.type}}).then((res)=>{
          console.log(res);
          this.classShop = res.data.data;
          for(var i=0;i<this.classShop.length;i++) {
            if(this.classShop[i].type) {
              this.classShop[i].type = true;
              console.log(this.dis)
            }else{
              this.classShop[i].type = false;
            }
          }
        })
      },
     
      earchForm () {       //搜索框搜索内容的
         this.$api("myshop",{params:{pageNum:this.searchObj.pageNum,pageSize:this.searchObj.pageSize,higherup:this.searchObj.productType}}).then((res)=>{
           console.log(res)
           var list = res.data.data.list;
          this.searchObj.pageNum = res.data.data.pageNum || 1;  
          this.searchObj.pageSize = res.data.data.pageSize;
          this.searchObj.totalCount = res.data.data.total;
          this.list1 = list;
         })
      },  
      ces (){ //查询所有商品(模版)
        // debugger;
        this.$api("myshop",{params:{pageNum:this.searchObj.pageNum,pageSize:this.searchObj.pageSize}}).then((res)=>{
          console.log(res.data)
          var list = res.data.data.list;
          this.searchObj.pageNum = res.data.data.pageNum || 1;  
          this.searchObj.pageSize = res.data.data.pageSize;
          this.searchObj.totalCount = res.data.data.total;
          this.list1 = list;
        })
      },
      handleSizeChange (val) {   //点击每页多少条的时候触发的函数(end)
        // debugger;
        this.searchObj.pageSize = val
        this.ces()
      },
      handleCurrentChange (val) { //点击前往第几页的时候触发的函数(end)
        this.searchObj.pageNum = val;
        this.ces();
      },
      add () {       //添加商品函数
      this.actionType =1;
      this.disable = false
        this.title = "添加商品"
        this.dialogVisible = true
      },
      edit (myCode) {
        // debugger;        //编辑商品
        this.typeId =true;
        console.log(myCode.row)
        this.dialogVisible = true;
        this.actionType=2;
        this.shopNameId = myCode.row.id;
        this.addform = myCode.row;
        this.addform.type = myCode.row.upName;
        this.addform.id = myCode.row.name;
        console.log(myCode.row)
        this.title = '编辑商品';
        
      },
    },
    computed: {
    } 
  }
</script>
<style long="less" >
  .el-icon-question {
    text-align: center;
    vertical-align: middle;
    font-size: 30px;
    /* background-color: red; */
  }
  .myitem{
    padding: 30px 0;
  }
  .goods{
        width: 100%;
        height:100%;
        text-align: center;
        color: black;
        color: rgba(0, 0, 0, 0.349)
    }
    .searchForm{
        padding: 10px;
    }
    .itemImage{
    height: 50px;
    vertical-align: middle;
  }
  
</style>

