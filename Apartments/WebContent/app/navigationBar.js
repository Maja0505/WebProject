/**
 * 
 */
Vue.component("navigationbar",{
	data: function(){
		return {
			user: null,
			
		}
	},
	
	template: `
		<div>
			<!--NAVBAR-->
			<nav class="navbar navbar-default navbar-fixed-top">
			  <div class="container-fluid">
			    <div class="navbar-header">
			      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
			        <span class="icon-bar"></span>
			        <span class="icon-bar"></span>
			        <span class="icon-bar"></span>                        
			      </button>
			      <a class="navbar-brand" href="#/">HOME</a>
			    </div>
			    <div class="collapse navbar-collapse" id="myNavbar">
			      <ul class="nav navbar-nav navbar-right">
			      		
			      		<li><a href="#/profile" v-if = "user" v-show="user.typeOfUser == 'HOST'">Profile</a></li>
			      		<li><a href="#/apartment" v-if = "user" v-show="user.typeOfUser == 'HOST'">Add apartment</a></li>
						<li><a href="#/guestsList" v-if = "user" v-show="user.typeOfUser == 'HOST'" v-on:click="getGuestsForHost">My guests</a></li>
						<li><a href="#/allReservations" v-if = "user" v-show="user.typeOfUser == 'HOST'" v-on:click="getReservationsForHost">My reservations</a></li>
	    				
	    				
	    				<li><a href="#/profile" v-if = "user" v-show="user.typeOfUser == 'GUEST'">Profile</a></li>
						<li><a href="#/guest/allReservations" v-if = "user" v-show="user.typeOfUser == 'GUEST'" v-on:click="getReservationsForGuest">My reservations</a></li>
	    				
	    				
	    				<li><a href="#/profile" v-if = "user" v-show="user.typeOfUser == 'ADMIN'">Profile</a></li>
	    				<li><a href="#/admin/allApartments" v-if = "user" v-show="user.typeOfUser == 'ADMIN'" v-on:click="getAllApartmentsForAdmin">All apartments</a></li>
	    				<li><a href="#/admin/allUsers" v-if = "user" v-show="user.typeOfUser == 'ADMIN'" v-on:click="getAllUsersForAdmin">All users</a></li>
	    				<li><a href="#/admin/allReservations" v-if = "user" v-show="user.typeOfUser == 'ADMIN'" v-on:click="getReservationsForAdmin">All reservations</a></li>
	    				<li><a href="#/amenities" v-if = "user" v-show="user.typeOfUser == 'ADMIN'" v-on:click="getAmnenitiesForAdmin">All amnenites</a></li>
	    				<li><a href="#/admin/addHost" v-if = "user" v-show="user.typeOfUser == 'ADMIN'">Add host</a></li>


						<li><a href="#/login" v-show="!user">Login</a></li>
						<li><a href="#/registration" v-show="!user">Registation</a></li>
						<li><a href="#/" v-show="user" v-on:click="logout">Logout</a></li>
					
						
			      </ul>
			    </div>
			  </div>
			</nav>
		</div>
	`,
	
	mounted(){
		axios
	        .get('rest/users/currentUser')
	        .then(response => {response.data ? this.user = response.data : this.user = null ;		
	        });
		this.$root.$on('changeCurentUser',(text)=>{this.user = text});
	},
	
	methods: {
		
		logout: function(){
			
			this.$root.$emit('refreshCurrentUser');
			axios
	          .post('rest/users/logout')
	          .then(response => (toast('User ' + response.data + ' successed logout!')) ,this.user = null,
	        		  this.$root.$emit('logout'),this.$router.push('/'))
		},
		getGuestsForHost:function(){
			this.$root.$emit('guestsForHost');
		},
		getReservationsForHost:function(){
			this.$root.$emit('reservationsForHost');
		},
		getReservationsForGuest:function(){
			this.$root.$emit('reservationsForGuest');
		},
		getAllUsersForAdmin:function(){
			this.$root.$emit('allUsersForAdmin');
		},
		getReservationsForAdmin:function(){
			this.$root.$emit('reservationsForAdmin');
		},
		getAmnenitiesForAdmin:function(){
			this.$root.$emit('amenitiesForAdmin');
		},
		getAllApartmentsForAdmin : function(){
			this.$root.$emit('apartmentsForAdmin');
		}
	}
	
});