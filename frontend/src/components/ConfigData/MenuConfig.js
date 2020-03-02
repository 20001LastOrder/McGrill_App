const MenuConfig = {always:[
    {
        title:'Home',
        key:'/',
        icon:'home'
    },
    {
        title:'Restaurants',
        key:'/restaurants',
        icon:'coffee',
        children:[
            {
                title: 'All',
                key: '/restaurants/all',
                icon:'bars',
            },
            {
                title: 'Featured',
                key: '/restaurants/featured',
                icon:'fire',
            },
            {
                title: 'Discount',
                key: '/restaurants/discount',
                icon:'bulb',
            }
        ],
    },
    {
        title:'restaurantOwner',
        key:'/restaurantHome',
    }
],
guest:[
    {
        title: 'Sign Up',
        key: '/user/signup',
        icon:'user-add'
    },
    {
        title: 'Sign In',
        key: '/login',
        icon: 'user'
    },
    {
        title: 'Restaurant Signup',
        key: '/owner/signup',
        icon:'usergroup-add'
    },
],
allUser:[
    {
        title:'My orders',
        key:'/myorders',
        icon:'reconciliation'
    },
    {
        title:'Settings',
        key:'/settings',
        icon:'setting'
    },
    {
        title: 'Logout',
        key: '/logout',
        icon: 'user'
    }
],
restaurantOwner: [
    {
        title:'Home',
        key:'/owner/home',
        icon: 'home'
    },
    {
        title:'All Orders',
        key:'/owner/orders',
        icon:'reconciliation'
    },
    {
        title:'Cancelled Orders',
        key:'/owner/cancelled',
        icon:'reconciliation'
    },
    {
        title:'Menu',
        key:'/owner/menu',
        icon:'coffee'
    }

]

}

export default MenuConfig;