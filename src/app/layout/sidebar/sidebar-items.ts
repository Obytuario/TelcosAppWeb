import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
  {
    path: '',
    title: 'MENUITEMS.MAIN.TEXT',
    icon: '',
    class: '',
    groupTitle: true,
    submenu: []
  },
  {
    path: '',
    title: 'MENUITEMS.HOME.TEXT',
    icon: 'monitor',
    class: 'menu-toggle',
    groupTitle: false,
    submenu: [
      {
        path: 'dashboard/main',
        title: 'MENUITEMS.HOME.LIST.DASHBOARD1',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      }
      // {
      //   path: 'dashboard/dashboard2',
      //   title: 'MENUITEMS.HOME.LIST.DASHBOARD2',
      //   icon: '',
      //   class: 'ml-menu',
      //   groupTitle: false,
      //   submenu: []
      // },
      // {
      //   path: 'dashboard/dashboard3',
      //   title: 'MENUITEMS.HOME.LIST.DASHBOARD3',
      //   icon: '',
      //   class: 'ml-menu',
      //   groupTitle: false,
      //   submenu: []
      // }
    ]
  },
  // {
  //   path: '',
  //   title: 'Authentication',
  //   icon: 'user-check',
  //   class: 'menu-toggle',
  //   groupTitle: false,
  //   submenu: [
  //     {
  //       path: '/authentication/signin',
  //       title: 'Sign In',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       submenu: []
  //     },
  //     {
  //       path: '/authentication/signup',
  //       title: 'Sign Up',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       submenu: []
  //     },
  //     {
  //       path: '/authentication/forgot-password',
  //       title: 'Forgot Password',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       submenu: []
  //     },
  //     {
  //       path: '/authentication/locked',
  //       title: 'Locked',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       submenu: []
  //     },
  //     {
  //       path: '/authentication/page404',
  //       title: '404 - Not Found',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       submenu: []
  //     },
  //     {
  //       path: '/authentication/page500',
  //       title: '500 - Server Error',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       submenu: []
  //     }
  //   ]
  // },
  {
    path: 'users/management',
    title: 'MENUITEMS.USER-TABLE.TEXT',
    icon: 'user-check',
    class: '',
    groupTitle: false,
    submenu: []
  },
  {
    path: '',
    title: 'MENUITEMS.TABLES.TEXT',
    icon: 'grid',
    class: 'menu-toggle',
    groupTitle: false,
    submenu: [
      {
        path: '/tables/basic-tables',
        title: 'MENUITEMS.TABLES.LIST.BASIC',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      {
        path: '/tables/material-tables',
        title: 'MENUITEMS.TABLES.LIST.MATERIAL',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      }      
    ]
  },
  {
    path: '',
    title: 'MENUITEMS.LOCATION-TABLE.TEXT',
    icon: 'map-pin',
    class: 'menu-toggle',
    groupTitle: false,
    submenu: [
      {
        path: '/maps/google',
        title: 'MENUITEMS.LOCATION-TABLE.LIST.WORKORDER',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      {
        path: '/maps/google2',
        title: 'MENUITEMS.LOCATION-TABLE.LIST.TECHNICAL',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      }
    ]
  },
  {
    path: '/tables/facturacion',
    title: 'MENUITEMS.FACT.TEXT',
    icon: 'grid',
    class: '',
    groupTitle: false,
    submenu: [
       
    ]
  },
];
