const Login = { template: '<login></login>' }
const Registation = { template: '<registration></registration>' }
const Comment = { template: '<comment></comment>' }
const HomePage = { template: '<homePage></homePage>' }
const Apartment = { template: '<apartment></apartment>' }
const amenities = { template: '<amenities></amenities>' }
const ApartmentsForGuestOrUnregistredUser = {template: '<apartmentsForGuestOrUnregistredUser></apartmentsForGuestOrUnregistredUser>'}
const showGuestsForHost = {template: '<showGuestsForHost></showGuestsForHost>'}
const reservationsForHost = {template: '<reservationsForHost></reservationsForHost>'}
const reservationsForGuest = {template: '<reservationsForGuest></reservationsForGuest>'}
const reservationsForAdmin = {template: '<reservationsForAdmin></reservationsForAdmin>'}
const viewApartmentForAdmin = {template: '<viewApartmentForAdmin></viewApartmentForAdmin>'}


const editProfile = {template: '<editProfile></editProfile>'}
const usersForAdmin = {template: '<usersForAdmin></usersForAdmin>'}


const router = new VueRouter({
	  mode: 'hash',
	  routes: [
		{ path: '/', component: HomePage },
	    { path: '/login', component: Login },
	    { path: '/registration', component: Registation },
	    { path: '/comment', component: Comment },
	    { path: '/apartment' , component: Apartment},
	    { path: '/location' , component: Location},
	    { path: '/amenities' , component: amenities},
	    { path: '/allApartments' , component: ApartmentsForGuestOrUnregistredUser},
	    { path: '/guestsList' , component: showGuestsForHost},
	    { path: '/allReservations' , component: reservationsForHost},
	    { path: '/guest/allReservations' , component: reservationsForGuest},
	    { path: '/admin/allReservations' , component: reservationsForAdmin},
	    { path: '/profile' , component: editProfile},
	    { path: '/admin/allUsers' , component: usersForAdmin},
	    { path: '/admin/viewApartment/*' , component : viewApartmentForAdmin}
	
	  ],
});


var app = new Vue({
	router,
	el: '#Apartments'

});
