<template>
    <router-view></router-view>
</template>

<script>
import audio from './pages/audio'
export default {
    data(){
        return {
            index : "login",
            a:null,
            b:null
        }
    },
    created(){
        this.showPage();
        // audio();
    },
    methods : {
        NO1 () {
            return  this.$api ('orderAll',{params:{pageNum:1,pageSize:20,type:'5'}})
            // .then((res)=>{
            //     this.a = true;
            //     var list = res.data.data.list;
            //     console.log(list)
            //     var id = {
            //         id:list[0].merchantid
            //     }
            //     this.store.commit('increment',id)
            //     console.log(this.store.state.id);
            //     console.log(this.a)
            // }).catch(error=>{
            //     this.a = false;
            // })
        },
        No2 () {
            return  this.$api('findBy',{params:{commodityid:'55'}})
            // .then(res=>{
            //     if(res.data.retCode == 200) {
            //         this.b = true;
            //     }else {
            //        this.b = false; 
            //     }
            // }).catch((errr =>{
            //     this.$message({
            //         message: '接口错误，请刷新页面',
            //         center: true
            //     });
            // }))
        },
        async showPage(){
            // debugger;
            // const that = this;
            // this.$api("findBy",{params:{commodityid:'55'}}).then(res => {
            //     // 已登录
            //     if(res.data.retCode == 200) {
            //         // console.log(this.NO1().then().value);
            //         this.$api('orderAll',{params:{pageNum:1,pageSize:20,type:"5"}}).then((res)=>{
            //             var list = res.data.data.list;
            //             console.log(list)
            //             var id = {
            //                 id:list[0].merchantid
            //             }
            //             this.store.commit('increment',id)
            //             console.log(this.store.state.id);
            //         })
            //         var AppHref = window.location.href
            //         console.log(AppHref.split('shangjie/panel'));
            //         var nweHref = AppHref.split('shangjie/panel');
            //         if(nweHref[1]!=''&&nweHref[1]!='/') {
            //             this.$router.replace({path:nweHref[1]})
            //         }else {
            //             this.$router.replace({path:'/manager'});
            //         }
            //     }else {
            //         that.$router.replace({ path: "/login" });
            //     }
            // // const { token } = res;
            // // localStorage.setItem('token', token);
            // }).catch(error => {
            //     this.$message({
            //         message: '接口错误，请刷新页面',
            //         center: true
            //     });
            // });
            // debugger;
            let location = await this.No2();
            console.log(location)
            if(location.data.retCode == 200) {
                let list = await this.NO1();
                console.log(list)
                if(list.data.retCode == 200) {
                    console.log(list)
                    let shopId = list.data.data.list[0].merchantid;
                    let id = {
                            id:shopId
                        }
                    this.store.commit('increment',id)
                    console.log(this.store.state.id);
                    audio();
                    if(this.store.state.id!=null) {
                        var AppHref = window.location.href
                        console.log(AppHref.split('shangjie/panel'));
                        var nweHref = AppHref.split('shangjie/panel');
                        if(nweHref[1]!=''&&nweHref[1]!='/') {
                            this.$router.replace({path:nweHref[1]})
                        }else {
                            this.$router.replace({path:'/manager'});
                        }
                    }
                                       
                }
                // if(this.a) {
                //     var AppHref = window.location.href
                //     console.log(AppHref.split('shangjie/panel'));
                //     var nweHref = AppHref.split('shangjie/panel');
                //     if(nweHref[1]!=''&&nweHref[1]!='/') {
                //         this.$router.replace({path:nweHref[1]})
                //     }else {
                //         this.$router.replace({path:'/manager'});
                //     }
                // }
            }else {
                this.$router.replace({path:'/login'});
            }
        }
    }
}
</script>

<style lang="less" scoped>
</style>