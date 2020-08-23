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
				
				<div>
					<div class="search-container">
					      <input type="text" placeholder="Search.." v-model = "searchText">
					</div>
					<div v-if="currentUser">
						<table  class="table table-hover">
						  <thead>
							<tr bgcolor="lightblue">
								<th>First Name</th>
								<th>Last Name</th>
								<th>Username</th>
								<th>Gender</th>
								<th>User type</th>
							</tr>
						  </thead>
						
						  <tbody>
							<tr v-for="u in search" v-if="currentUser.username != u.username">
								<td>{{u.firstName }}</td>
								<td>{{u.lastName }}</td>
								<td>{{u.username }}</td>
								<td>{{u.gender }}</td>
								<td>{{u.typeOfUser }}</td> 
							</tr>
						  </tbody>
						</table>
					</div>
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
		return	this.users.filter(u => {
		        return u.username.toLowerCase().includes(this.searchText.toLowerCase()) || 
		        	   u.gender.toLowerCase().includes(this.searchText.toLowerCase()) ||
		        	   u.typeOfUser.toLowerCase().includes(this.searchText.toLowerCase())})
		}
	}

})