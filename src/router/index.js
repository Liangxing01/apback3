import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

const Devicce = {template: '<h1>devicce</h1>'};

export default new Router({
  routes: [
    {
      path: '/hello',
      component: resolve => require(['../components/Hello'], resolve),
    },
    {
    	path: '/index',
    	component: resolve => require(['../components/Index'], resolve),
      children:[
      {
        path: 'devicce',
        component: resolve => require(['../components/deveice'], resolve),
      },
      {
        path: 'baseSetting',
        component: resolve => require(['../components/BaseSetting'], resolve)
      },
      {
        path: 'IPWMenu',
        component: resolve => require(['../components/IPWMenu'], resolve)
      },
      {
        path: 'MACMenu',
        component: resolve => require(['../components/MACMenu'], resolve)
      },
      {
        path: 'TcpMenu',
        component: resolve => require(['../components/TCPMenu'], resolve)
      },
      {
        path: 'DnsMenu',
        component: resolve => require(['../components/DNSMenu'], resolve)
      },
      {
        path: 'WebReNav',
        component: resolve => require(['../components/WebReNav'], resolve)
      },
      {
        path: 'base',
        component: resolve => require(['../components/base'], resolve)
      },
      {
        path: 'record',
        component: resolve => require(['../components/record'], resolve)
      },
      {
        path: 'legitimateIp',
        component: resolve => require(['../components/legitimateIp'], resolve)
      }
      ]
    }
  ]
})
