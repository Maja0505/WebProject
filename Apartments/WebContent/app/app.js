const Login = { template: '<login></login>' }
const Registation = { template: '<registration></registration>' }
const HomePage = { template: '<homePage></homePage>' }
const Apartment = { template: '<apartment></apartment>' }
const amenities = { template: '<amenities></amenities>' }
const ApartmentsForGuestOrUnregistredUser = {template: '<apartmentsForGuestOrUnregistredUser></apartmentsForGuestOrUnregistredUser>'}
const showGuestsForHost = {template: '<showGuestsForHost></showGuestsForHost>'}
const reservationsForHost = {template: '<reservationsForHost></reservationsForHost>'}
const reservationsForGuest = {template: '<reservationsForGuest></reservationsForGuest>'}
const reservationsForAdmin = {template: '<reservationsForAdmin></reservationsForAdmin>'}
const viewApartment = {template: '<viewApartment></viewApartment>'}
const AllApartmentsForAdmin = {template: '<apartmentsForAdmin></apartmentsForAdmin>'}
const AddHost = {template: '<addHost></addHost>'}
const AllApartmentsForHost = {template: '<apartmentsForHost></apartmentsForHost>'}
const Forbidden = {template: '<forbidden></forbidden>'}
const AddNotWorkingDates = {template: '<notWorkingDates></notWorkingDates>'}

const editProfile = {template: '<editProfile></editProfile>'}
const usersForAdmin = {template: '<usersForAdmin></usersForAdmin>'}


const router = new VueRouter({
	  mode: 'hash',
	  routes: [
		{ path: '/', component: HomePage },
	    { path: '/login', component: Login },
	    { path: '/registration', component: Registation },
	    { path: '/apartment' , component: Apartment},
	    { path: '/amenities' , component: amenities},
	    { path: '/allApartments' , component: ApartmentsForGuestOrUnregistredUser},
	    { path: '/guestsList' , component: showGuestsForHost},
	    { path: '/host/allReservations' , component: reservationsForHost},
	    { path: '/guest/allReservations' , component: reservationsForGuest},
	    { path: '/admin/allReservations' , component: reservationsForAdmin},
	    { path: '/profile' , component: editProfile},
	    { path: '/admin/allUsers' , component: usersForAdmin},
	    { path: '/viewApartment/*' , component : viewApartment},
	    { path: '/admin/allApartments' , component : AllApartmentsForAdmin},
	    { path:'/admin/addHost', component: AddHost},
	    { path: '/host/allApartments' , component : AllApartmentsForHost},
	    { path: '/403', component : Forbidden},
	    { path: '/addNotWorkingDates', component: AddNotWorkingDates},
	    { path: '/*',component: Forbidden}
	  ],
});


var app = new Vue({
	router,
	el: '#Apartments',
});
