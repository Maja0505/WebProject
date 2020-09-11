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
		<div class="polaroid" v-show="!user || user.typeOfUser === 'GUEST' || user.typeOfUser === 'HOST' || user.typeOfUser === 'ADMIN' ">
		  <img src="https://www.udr.com/globalassets/communities/the-kennedy-building/images/hr_mainheader_overview_1900x874_thekennedybuilding_2012_bdg1_el.jpg" alt="5 Terre" style="width:100%">
		  
		  <div class="container2">
			<button class="btn" v-on:click="showApartments" type="button">View apartments</button>
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

</div>
		`	,mounted () {
				this.changeBGImage();
				axios
		          .get('rest/users/currentUser')
		          .then(response => {response.data ? this.user = response.data : this.user = null ;		
		          });
				this.$root.$on('logout',(text)=>{this.user = null})
			},
			methods: {

				changeBGImage : function(){
					document.querySelector('body').style.backgroundImage = 'url(' + "images/sea.png" + ')';
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
					if(!this.user || this.user.typeOfUser === 'GUEST'){
						this.$root.$emit('showApartmentsFormForUnregistredUser');
						this.$router.push('/allApartments');
					}else if(this.user.typeOfUser === 'HOST'){
						this.$root.$emit('apartmentsForHost');
						this.$router.push('/host/allApartments');
					}else if(this.user.typeOfUser === 'ADMIN'){
						this.$root.$emit('apartmentsForAdmin');
						this.$router.push('/admin/allApartments');
					}
					
					
				}
				
			}	
});