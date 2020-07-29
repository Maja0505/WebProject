/**
 * 
 */
var searchText = null
Vue.component("admin", {
	data: function () {
	    return {
		  users: null,
		  searchText: null
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
			
			<tr v-for="u in users">
				<td>{{u.firstName }}</td>
				<td>{{u.lastName }}</td>
				<td>{{u.username }}</td>
				<td>{{u.gender }}</td>
				<td>{{u.typeOfUser}}</td> 
			</tr>
		</table>
		<p>CAO JA SAM ADMIN</p>
		<p>{{searchText}}</p>
		</div>
		`,
		mounted () {
        axios
          .get('rest/users/all')
          .then(response => (this.users = response.data))
         
          this.$root.$on('search', (text)=>{
            this.users = this.search(text)})
		},
		methods: {
			search : function(searchText){
				return this.users.filter(post => {
			        return post.username.toLowerCase().includes(searchText.toLowerCase())})
			}
		}
		
});