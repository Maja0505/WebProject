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
					
				<div class="content-profile">
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
							  <p>User type: {{u.typeOfUser }}</p>
							  <button class="cancel_edit_button" style="float:right;" v-if="u.typeOfUser != 'ADMIN' && u.isBlock == false" v-on:click="blockUser(u)" type='button'>Block user</button>
							  <button class="cancel_edit_button" style="float:right;" v-if="u.typeOfUser != 'ADMIN' && u.isBlock == true" v-on:click="unblockUser(u)" type='button'>Unblock user</button>
							</div>
							<div class="container-user-for-admin" v-if="search.length == 0">
								<h3>User for host doesn't exist</h3>
							</div>
						</div>
					</div>
					</form>
				</div>	
			</div>
	`,
	
	mounted(){
		 this.changeBGImage();
		 this.$root.$on('allUsersForAdmin',(text) => {this.getAllUsers()});
	        this.getAllUsers()    //PROVERITI
		
	},
	
	methods : {
		
		check : function(){
			if(!this.currentUser){
				this.$router.push('/login');
			}else if(this.currentUser.typeOfUser != 'ADMIN'){
				this.$router.push('/403');
			}
								
		},
		
		changeBGImage : function(){
			document.querySelector('body').style.backgroundImage = 'url(' + "images/sea.png" + ')';
		},
		
		getAllUsers:function(){
			 axios
	         .get('rest/users/all')
	         .then(response => (response.data ? this.users = response.data : this.users = null))
	       axios
	         .get('rest/users/currentUser')
	         .then(response => (response.data ? this.currentUser = response.data : this.currentUser = null,this.check()))
		},
		blockUser:function(user){
			user.isBlock = true;
			axios
	          .put('rest/users/updateUser',user);
			
			if(user.typeOfUser=='GUEST'){
				axios
		          .put('rest/guests/updateGuest',user);
			}
			
			if(user.typeOfUser=='HOST'){
				axios
		          .put('rest/hosts/updateHost',user);
			}
		},
		unblockUser:function(user){
			user.isBlock = false;
			axios
	          .put('rest/users/updateUser',user);
			
			if(user.typeOfUser=='GUEST'){
				axios
		          .put('rest/guests/updateGuest',user);
			}
			
			if(user.typeOfUser=='HOST'){
				axios
		          .put('rest/hosts/updateHost',user);
			}
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