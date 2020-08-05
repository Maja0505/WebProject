Vue.component("homePage", {
	data: function () {
	    return {
		  user: null,
		  searchText: "",
		  showProfileInfo: false
	    }
},
		template: ` 
		<div>
		<p>
			<a href="#/login" v-show="!user">Login</a>
			<a href="#/registration" v-show="!user">Registation</a>
			<a href="#/" v-show="user" v-on:click.prevent="logout">Logout</a>
			<a href="#/" v-show="user" v-on:click.prevent="logout">About</a>
			<a href="#/apartment"v-if = "user" v-show="user.typeOfUser == 'HOST'">Add apartment</a>
			
		</p>
		<div v-show="!user">
			<apartmentsForGuestOrUnregistredUser></apartmentsForGuestOrUnregistredUser>
		</div>
		<button type="submit" v-show="user" v-on:click="showProfile()">Show profile</button>
		<div v-if="user" v-show="showProfileInfo">
			<editProfile></editProfile>
		</div>
		<div v-if = "user">
			<div v-show="user.typeOfUser == 'ADMIN'">
				<admin></admin>
			</div>
			<div v-show="user.typeOfUser == 'GUEST'">
				<guest></guest>
			</div>
			<div  v-show="user.typeOfUser == 'HOST'">
				<host></host>
			</div>
		</div>
		
		</div>
		`	,mounted () {
				axios
		          .get('rest/users/currentUser')
		          .then(response => {response.data ? this.user = response.data : this.user = null ;		
		          });
			},
			methods: {
				logout: function(){
					axios
			          .post('rest/users/logout')
			          .then(response => (toast('User ' + response.data + ' successed logout!')) ,this.user = null)
				},

				showProfile: function(){
					if(this.showProfileInfo){
						this.showProfileInfo = false;
					}else{
						this.showProfileInfo = true;
					}
					this.$root.$emit('show');
				}
			}	
});