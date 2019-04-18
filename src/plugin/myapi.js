import axios from 'axios'
// import Vue from 'vue';
const baseURL = process.env.baseURL || "/api";
// console.log(process.env.baseURL);

// 请求对象实例，具体的方法
const create = function() {
    let http = axios.create({
        baseURL: baseURL,
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    });
    // 请求拦截器
    http.interceptors.request.use(config => {
        // debugger;
        // if (config.method === 'post') {
        //     config.data = JSON.stringify(config.data)
        // } 
        // const token = localStorage.getItem('token');
        // if(token){
        //     config.headers = {
        //         cookie: `token=${token}`
        //     }
        // }

        return config
    }, error => {
        return Promise.reject(error)
    })

    // 响应拦截器
    http.interceptors.response.use(response => {
        // debugger;
        return response;
        // 响应状态统一处理
        // if (response.data.retCode == 200) {
        //     return response;
        // } else if (response.data.retCode == -200) {
        //     window.location.replace('/sangjie/panel/login');
        //     // Vue.prototype.$router.replace('/login');
        // }
    }, error => {
        return Promise.reject(error)
    })

    return http
}
const instance = create();

// 柯理化

// const ['get', 'post'] = ['get', 'post'].map(item => {
//     return (url) => {
//         return (data) => {
//             return (config) => {
//                 instance[item](url, data, config);
//             }
//         };
//     };
// });
const get = (url) => {
    return (data) => {
        return (config) => {
            return instance.get(url, data, config);
        }
    }
};
const post = (url) => {
    return (data) => {
        return (config) => {
            return instance.post(url, data, config);
        }
    }
};

// 接口map 表
const apis = {
    //订单查询
    orderAll: get("/merchant/order/all"),
    //修改订单
    orderType: get("/merchant/order/updateByOrderType"),
    //修改取衣订单状态
    updataByOrder: get('/merchant/order/updateByOrderIfhave'),
    //商户后台登录的接口
    login: post('/merchant/login'),
    cancellation: get('/merchant/cancellation'),
    //商家认证信息
    archivesAll: get("/archives/all"),
    //查询商家个人基本信息
    merchantChange: get("/merchant/order/findByMerchantidDetail"),
    //查询商品下活动
    findBy: get('/activity/findByActivityAll'),
    //查询用户退款信息
    findChiltid: get('/merchant/order/findByMerchantidRefund'),
    //修改商家个人信息
    updataByMer: post("/archives/updateByMerchant"),
    //查询达达订单详情
    dadaQuery: get('/archives/dadaQuery'),
    //商品接口
    myshop: get('/commodity/all'), //查询所有商品
    addshop: post('/commodity/addCommodity'), //添加商品
    delshop: post('/commodity/deleteByCommodityid'), //删除商品
    upshop: post('/commodity/updateByCommodityid'), //修改商品
    //商品类型
    typeFind: get('/type/findByTypeHigherup'), //根据一级下单栏查询下级
    typeStatus: get('/type/findByTypeStatus'), //查询一级下单栏
    commitFindMerId: get('/commodity/findByTypeIdAndMerId'), //根据快速下单栏查询商品接口
    //优惠活动
    discountAll: get('/discount/all'), //查询所有优惠
    discountAddDis: post('/discount/addDiscount'), //新增打折优惠
    discountFull: post('/discount/addDiscountByFull'), //新增满减优惠
    deledDiscount: post('/discount/delteDiscount'), //删除优惠
    updateDiscount: post('/discount/updateDiscount'), //修改优惠
    //意见
    proposalAll: get('/proposal/all'), //所有意见和建议
    proposalAdd: post('/proposal/insertProposal'), //添加意见
    updataProposal: get('/proposal/updateByMerchant'), //修改意见信息
    //添加反馈
    addFeedback: post('/feedback/addFeedback'),
    //自动或者手动接单
    AutoOrder: post('/archives/updateMerchantByifAuto')

}
const request = function(name, data, config) {
    return apis[name](data)(config);
}
export default request;