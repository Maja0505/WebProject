const Login = { template: '<login></login>' }
const Registation = { template: '<registration></registration>' }
const Comment = { template: '<comment></comment>' }
const HomePage = { template: '<homePage></homePage>' }
const Apartment = { template: '<apartment></apartment>' }
const Amenities = { template: '<amenities></amenities>' }
const Reservation = { template: '<reservation></reservation>' }
const Admin = { template: '<admin></admin>' }
const Guest = { template: '<guest></guest>' }
const Host = { template: '<host></host>' }



const router = new VueRouter({
	  mode: 'hash',
	  routes: [
		{ path: '/', component: HomePage , children :[{path:'admin' , component: Admin},{path:'guest' , component: Guest},{path:'host' , component: Host}]},
	    { path: '/login', component: Login },
	    { path: '/registration', component: Registation },
	    { path: '/comment', component: Comment },
	    { path: '/apartment' , component: Apartment},
	    { path: '/location' , component: Location},
	    { path: '/amenities' , component: Amenities},
	    { path: '/reservation', component: Reservation}
	    
	  ]
});

var app = new Vue({
	router,
	el: '#Apartments'
});