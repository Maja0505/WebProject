/**
 * 
 */
Vue.component("usersForAdmin",{
	
	data : function(){
		return{
			users:null,
			currentUser:null,
			searchText:""
		}
	},
	
	template: `
			<div>
					
				<div class="content-profile" style="background-image: url('images/apartment3.png');">
					<form class="container-amenities">
					<h1 style="margin-left:15%;">USERS</h1>
					<div>
						      <input style=" border-radius: 0;width: 30%; margin-top:5%; padding: 10px;margin-right:15%;margin-left:15%;" type="text" placeholder="Search.." v-model = "searchText">
					</div>
	
					<div style="margin-top:3%;">
						
						<div v-if="currentUser">
							<div class="container-user-for-admin" v-for="u in search" v-if="currentUser.username != u.username">
							  <img src="images/female_image.png" alt="Avatar" style="width:90px" v-if="u.gender == 'FEMALE'">
							  <img src="images/male_image.png" alt="Avatar" style="width:90px" v-if="u.gender == 'MALE'">
							  <p><span >{{u.firstName}} {{u.lastName }}</span></p>
							  <P>Username: {{u.username}}</p>
							  <p>Gender: {{u.gender}}</p>
							  <P>User type: {{u.typeOfUser }}</p>
							</div>
						</div>
					</div>
					</form>
				</div>	
			</div>
	`,
	
	mounted(){
		 this.$root.$on('allUsersForAdmin',(text) => {this.getAllUsers()});
	        this.getAllUsers()    //PROVERITI
		
	},
	
	methods : {
		getAllUsers:function(){
			 axios
	         .get('rest/users/all')
	         .then(response => (response.data ? this.users = response.data : this.users = null))
	       axios
	         .get('rest/users/currentUser')
	         .then(response => (response.data ? this.currentUser = response.data : this.currentUser = null))
		}
	},
	
	computed : {
		search(){
		if(this.users){
			return	this.users.filter(u => {
		        return u.username.toLowerCase().includes(this.searchText.toLowerCase()) || 
		        	   u.gender.toLowerCase().includes(this.searchText.toLowerCase()) ||
		        	   u.typeOfUser.toLowerCase().includes(this.searchText.toLowerCase())})
		}
		}
		
	}

})