Vue.component("homePage", {
	data: function () {
	    return {
		  user: null,
		  searchText: "",
		  showProfileInfo: false,
		  showApartmentsForm:false
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
		      <a class="navbar-brand" href="#myPage">HOME</a>
		    </div>
		    <div class="collapse navbar-collapse" id="myNavbar">
		      <ul class="nav navbar-nav navbar-right">
					<li><a href="#/login" v-show="!user">Login</a></li>
					<li><a href="#/registration" v-show="!user">Registation</a></li>
					<li><a href="#/" v-show="user" v-on:click.prevent="logout">Logout</a></li>
					<li><a href="#/" v-show="user" v-on:click.prevent="logout">About</a></li>
					<li><a href="#/apartment"v-if = "user" v-show="user.typeOfUser == 'HOST'">Add apartment</a></li>
		        
		      </ul>
		    </div>
		  </div>
		</nav>
		
		<!--DEO SA SLIKOM-->
		<div class="polaroid" v-show="!user || user.typeOfUser === 'GUEST'">
		  <img src="https://www.udr.com/globalassets/communities/the-kennedy-building/images/hr_mainheader_overview_1900x874_thekennedybuilding_2012_bdg1_el.jpg" alt="5 Terre" style="width:100%">
		  
		  <div class="container2">
			<button class="btn" v-on:click="showApartments">View apartments</button>
		  </div>
		</div>
		
		<!--Apartments Form-->
		 <div v-show="!user && showApartmentsForm"  class="container polaroid">
			<apartmentsForGuestOrUnregistredUser></apartmentsForGuestOrUnregistredUser>
		</div>
		
		
		
		<!--ABOUT US-->
		<div id="band" class="container text-center">
		  <h3>ABOUT US</h3>
		  <p><em>We love music!</em></p>
		  <p>We have created a fictional band website. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
		  <br>
		 
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
					this.$root.$emit('refreshCurrentUser');
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
				},
				showApartments:function(){
					if(this.showApartmentsForm){
						this.showApartmentsForm = false
					}else{
						this.showApartmentsForm = true
						this.$root.$emit('showApartmentsFormForUnregistredUser');

					}
				}
				
			}	
});