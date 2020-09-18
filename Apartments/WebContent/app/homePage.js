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
			<div class="polaroid" v-show="!user || user.typeOfUser === 'GUEST' || user.typeOfUser === 'HOST' || user.typeOfUser === 'ADMIN' ">
			  <img src="https://www.udr.com/globalassets/communities/the-kennedy-building/images/hr_mainheader_overview_1900x874_thekennedybuilding_2012_bdg1_el.jpg" alt="5 Terre" style="width:100%">
			  <div class="container2">
				<button class="btn" v-on:click="showApartments" type="button">View apartments</button>
			  </div>
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