const MenuConfig = [
    {
        title:'Home',
        key:'/admin/home',
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
        title:'My orders',
        key:'/myorders',
        icon:'reconciliation'
    },
    {
        title:'Settings',
        key:'/settings',
        icon:'setting'
    },
]

export default MenuConfig;