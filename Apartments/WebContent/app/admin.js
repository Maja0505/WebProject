/**
 * 
 */
Vue.component("admin", {
	data: function () {
	    return {
		  users: null,
		  currentUser:{}
	    }
},
		template: ` 
		<div>
		<table class="users">
			<tr bgcolor="lightgrey">
				<th>First Name</th>
				<th>Last Name</th>
				<th>Username</th>
				<th>Gender</th>
				<th>User type</th>
			</tr>
			
			<tr v-for="u in users" v-if="currentUser.username != u.username">
				<td>{{u.firstName }}</td>
				<td>{{u.lastName }}</td>
				<td>{{u.username }}</td>
				<td>{{u.gender }}</td>
				<td>{{u.typeOfUser}}</td> 
			</tr>
		</table>
		
		<apartmentsForAdmin></apartmentsForAdmin>
		<p>CAO JA SAM ADMIN</p>
		</div>
		`,
		mounted () {
        axios
          .get('rest/users/all')
          .then(response => (this.users = response.data))
         
        axios
          .get('rest/users/currentUser')
          .then(response => (this.currentUser = response.data ))
          
          this.$root.$on('search', (text)=>{ axios
              .get('rest/users/all').then(response => (this.users = response.data,this.users = this.search(text)))
            })
		},
		methods: {
			search : function(searchText){
				return this.users.filter(post => {
			        return post.username.toLowerCase().includes(searchText.toLowerCase()) || 
					       post.gender.toLowerCase().includes(searchText.toLowerCase()) ||
					       post.typeOfUser.toLowerCase().includes(searchText.toLowerCase())})
			}
		}
		
});