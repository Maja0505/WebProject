const Login = { template: '<login></login>' }
const Registation = { template: '<registration></registration>' }
const Comment = { template: '<comment></comment>' }
const HomePage = { template: '<homePage></homePage>' }
const Apartment = { template: '<apartment></apartment>' }
const Amenities = { template: '<amenities></amenities>' }



const router = new VueRouter({
	  mode: 'hash',
	  routes: [
		{ path: '/', component: HomePage },
	    { path: '/login', component: Login },
	    { path: '/registration', component: Registation },
	    { path: '/comment', component: Comment },
	    { path: '/apartment' , component: Apartment},
	    { path: '/location' , component: Location},
	    { path: '/amenities' , component: Amenities},
	  ]
});


var app = new Vue({
	router,
	el: '#Apartments',
	
});
