export default [{
        id: "0",
        name: "订单管理",
        path: "/manager/order",
        icon: "order",
        children: [{
                id: 0,
                name: "待接订单",
                path: "/manager/index",
                icon: "resource",
                children: []
            },
            {
                id: 1,
                name: "待取衣",
                path: "/manager/awaitClose",
                icon: "resource",
                children: []
            },
            {
                id: 2,
                name: "已取衣",
                path: "/manager/takeColse",
                icon: "resource",
                children: []
            },
            {
                id: 3,
                name: "待发货",
                path: "/manager/make",
                icon: "resource",
                children: []
            },
            {
                id: 4,
                name: "待收货",
                path: "/manager/awaitTake",
                icon: "resource",
                children: []
            },
            {
                id: 5,
                name: "完成订单",
                path: "/manager/accomplish",
                icon: "resource",
                children: []
            },
            {
                id: 6,
                name: "退款订单",
                path: "/manager/refund",
                icon: "resource",
                children: []
            }
        ]
    },
    {
        id: "1",
        name: "财务管理",
        path: "/manager/business",
        icon: "resource",
        children: [{
                id: 1,
                name: "商家财务详情",
                path: "/manager/list",
                icon: "resource",
                children: []
            }
            // {
            //     id: 2,
            //     name: "其它",
            //     path: "/manager/business-order",
            //     icon: "resource",
            //     children: []
            // },

        ]
    },
    {
        id: '2',
        name: '商品管理',
        path: '/manager/goods',
        icon: "resource",
        children: []
    },
    {
        id: "3",
        name: "活动管理",
        path: "/manager/activity",
        icon: "resource",
        children: []
    }
    // {
    //     id: "4",
    //     name: "地图",
    //     path: "/manager/Map",
    //     icon: "resource",
    //     children: []
    // }
];