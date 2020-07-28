const Login = { template: '<login></login>' }
const Registation = { template: '<registration></registration>' }
const Comment = { template: '<comment></comment>' }
const HomePage = { template: '<homePage></homePage>' }

const router = new VueRouter({
	  mode: 'hash',
	  routes: [
		{ path: '/', component: HomePage },
	    { path: '/login', component: Login},
	    { path: '/registration', component: Registation },
	    { path: '/comment', component: Comment }
	  ]
});

var app = new Vue({
	router,
	el: '#Apartments'
});