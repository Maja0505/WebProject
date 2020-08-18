Vue.component("showGuestsForHost", {
	data: function () {
	    return {
		  users: null,
		  loggedUser:{},
	      selectedStudent: {},
	      myGuests:[],
	      searchField: "",
	      reservations:null,
	      showAllMyGuests:false,
	  	  searchText:''
	    }
},
		template: ` 
		<div>
			<div v-show="showAllMyGuests">
				<div class="search-container">
			  		<p>Pretraga</p>
					<input type="text" placeholder="Search guest" v-model = "searchText">
				</div>
				<label>My guests</label>
				<table  class="table table-hover">
				<thead>
					<tr bgcolor="lightblue">
						<th>Username</th>
						<th>First name</th>
						<th>Last name</th>
						<th>Gender</th>
						<th>User type</th>
					</tr>
				</thead>
				
				<tbody>
					<tr v-for="u in search">
						<td>{{u.username }}</td>
						<td>{{u.firstName }}</td>
						<td>{{u.lastName }}</td>
						<td>{{u.gender }}</td>
						<td>{{u.typeOfUser }}</td>
					</tr>
				</tbody>
				</table>
			</div>
		</div>
		`	
		, mounted () {
	        this.$root.$on('showAllGuestsForHost',(text) => {this.showAllMyGuests = text,this.show()})     
	    }
		,methods: {
			getMyGuests: function(){
				//for(let apartment in loggedUser.apartmentsForRent){
	
					let guests= this.users.filter(user => {
				        return user.typeOfUser == ("GUEST")})

					for (apartment of this.loggedUser.apartmentsForRent) {
						for(reservation of this.reservations){
							if(reservation.apartment.id == apartment.id){
								//iz rezervacije pronalazimo gosta,ukoliko je vise puta rezervisao samo jednom ga ispisujemo
								let guest = guests.filter(function(g) {
								return g.username == reservation.guest.username})
								if(this.myGuests.indexOf(guest[0]) == -1){
									this.myGuests.push(guest[0]);

								}	
							}
						}
					}							
				}
			,getCurrentUser: function(){
			     axios
		          .get('rest/users/currentUser')
		          .then(response => (response.data ? this.loggedUser = response.data : this.loggedUser = null,this.getAllReservation()))
	    
		      
			},
			getAllReservation: function(){
				axios
		          .get('rest/reservations/all')
		          .then(response => (this.reservations = response.data,this.getMyGuests()))
	    
		      
			},show : function(){
				if(this.showAllMyGuests){
					this.getAllUser();
				}
			},getAllUser: function(){
				axios
		          .get('rest/users/all')
		          .then(response => (this.users = response.data,this.getCurrentUser()))
			}
		},
		computed : {

			search(){
			if(this.myGuests)	
				return this.myGuests.filter(a => {
				         return a.username.toLowerCase().includes(this.searchText.toLowerCase()) || a.gender.toLowerCase().includes(this.searchText.toLowerCase()) })
			}
		}
		
});