Vue.component("showGuestsForHost", {
	data: function () {
	    return {
		  users: null,
		  loggedUser:null,
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
		
			<div class="content-profile" style="background-image: url('images/apartment3.png');">
					<form class="container-amenities">
					<h1 style="margin-left:15%;">MY GUESTS</h1>
					<div>
						      <input style=" border-radius: 0;width: 30%; margin-top:5%; padding: 10px;margin-right:15%;margin-left:15%;" type="text" placeholder="Search.." v-model = "searchText">
					</div>
					
					
					<div style="margin-top:3%;">
						
						<div v-if="loggedUser">
							<div class="container-user-for-admin" v-for="u in search">
							  <img src="images/female_image.png" alt="Avatar" style="width:90px" v-if="u.gender == 'FEMALE'">
							  <img src="images/male_image.png" alt="Avatar" style="width:90px" v-if="u.gender == 'MALE'">
							  <p><span >{{u.firstName}} {{u.lastName }}</span></p>
							  <p>Username: {{u.username}}</p>
							  <p>Gender: {{u.gender}}</p>
							  <P>User type: {{u.typeOfUser}}</p>
							</div>
							<div class="container-user-for-admin" v-if="search.length == 0">
								<h3>User for host doesn't exist</h3>
							</div>
						</div>
					</div>
					
					
					</form>
		   </div>
		</div>
		`	
		, mounted () {
			this.changeBGImage();
	        this.$root.$on('guestsForHost',() => {this. myGuests = [],this.getAllUser()})     
	        this.getAllUser()
	    }
		,methods: {
			
			changeBGImage : function(){
				document.querySelector('body').style.backgroundImage = 'url(' + "images/sea.png" + ')';
			},
			
			getMyGuests: function(){
				//for(let apartment in loggedUser.apartmentsForRent){
	
					let guests= this.users.filter(user => {
				        return user.typeOfUser == ("GUEST")})
				   if(this.loggedUser.apartmentsForRent)
				{
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
	    
		      
			},
			getAllUser: function(){
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