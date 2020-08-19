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
				this.$root.$on('logout',(text)=>{this.user = null})
			},
			methods: {

				showProfile: function(){
					if(this.showProfileInfo){
						this.showProfileInfo = false;
					}else{
						this.showProfileInfo = true;
					}
					this.$root.$emit('show');
				},
				showApartments:function(){

					this.$router.push('/allApartments');
					
				}
				
			}	
});