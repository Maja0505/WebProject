const Login = { template: '<login><login>' }
const Registation = { template: '<registration></registration>' }
const HomePage = { template: '<homePage></homePage>' }

const router = new VueRouter({
	  mode: 'hash',
	  routes: [
		{ path: '/', component: HomePage },
	    { path: '/login', component: Login},
	    { path: '/registration', component: Registation }
	  ]
});

var app = new Vue({
	router,
	el: '#Apartments'
});