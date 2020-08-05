/**
 * 
 */
Vue.component("apartmentsForGuestOrUnregistredUser",{
	data : function(){
		return {
			showAllApartments : false,
			allApartments : null,
			currentUser : null,
			activeApartments : null,
			selectedApartment : null,
			showingMode : 'NOTHING',
			commentsForSelectedApartment : null,
			allComments : null
		}
	},

	template : `
			<div>
				<button type="submit" v-on:click="showApartments()">Show apartments for reservation</button>
				
				<div v-if="showAllApartments">
					<table border = "1" class="activeApartments">
						<tr bgcolor="lightgrey">
							<th>Location</th>
							<th>Price Per Night</th>
							<th>Host</th>
						</tr>
						<tr v-for="a in activeApartments"  v-on:click="selectApartment(a)">
							<td>{{a.location.address.city}}</td>
							<td>{{a.pricePerNight }}</td>
							<td>{{a.host.username }}</td>
						</tr>
					</table>
					
					<div v-if="selectedApartment">
						<p>Selektovan je apartman sa id {{selectedApartment.id}} 
							<button type="submit" v-if="currentUser" v-on:click="reservation()">Reservation</button>
							<button type="submit" v-on:click="showComments()">Comments of apartment</button>
						</p>
					</div>
					
					<div v-show="showingMode != 'COMMENTS'">
							<reservation></reservation>
					</div>
					<div v-if="showingMode == 'COMMENTS'">
							<table v-for="comment in commentsForSelectedApartment">
								<tr>
									<td>Guest : </td>
									<td>{{comment.guest.username}}</td>
								</tr>
								<tr>
									<td>Comment : </td>
									<td>{{comment.text}}</td>
								</tr>
								<tr>
									<td>Rate : </td>
									<td>{{comment.rate}}</td>
								</tr>
							</table>
							<div v-if="!commentsForSelectedApartment.length">
								Selected apartment don't have any comment
							</div>
					</div>
				</div>
			</div>
	`,
	
	mounted () {
	          axios
		         .get('rest/users/currentUser')
		          	.then(response => (response.data ? this.currentUser = response.data : this.currentUser = null))
	    },

	
	methods : {
		
		showApartments : function(){
			if(!this.showAllApartments){
				 axios    
		          .get('rest/apartments/all')
		          .then(response => (response.data ? this.allApartments = response.data : this.allApartments = null,
		        		  axios
			     	        .get('rest/comments/all')
			     	        .then(response => (response.data ? this.allComments = response.data : this.allComments = null,
			     	        		this.getActiveApartments(),this.showAllApartments = true))))
			}else{
				this.showAllApartments = false;
				this.activeApartments = null;
				this.selectedApartment = null;
				this.showingMode = 'NOTHING';
				this.commentsForSelectedApartment = null;
			}
				
		},
		
		getActiveApartments : function(){
			this.activeApartments = [];
				for(let apartment of this.allApartments){
					if(apartment.statusOfApartment == 'ACTIVE'){
						this.activeApartments.push(apartment);
					}
				}
		},
		
		selectApartment : function(apartment){
			this.selectedApartment = apartment;
			this.$root.$emit('showReservationPart',null);
			this.showingMode = 'NOTHING';
			this.getCommentsOfApartment();
		},
		
		reservation : function(){
			if(this.showingMode != 'RESERVATION'){
				this.$root.$emit('showReservationPart',this.selectedApartment);
				this.showingMode = 'RESERVATION';
			}
		},
		
		getCommentsOfApartment : function(){
			this.commentsForSelectedApartment = [];
			for(let comment of this.allComments){
				if(comment.apartment.id == this.selectedApartment.id){
					this.commentsForSelectedApartment.push(comment);
				}
			}
		},
		
		showComments : function(){
			this.showingMode = 'COMMENTS';
		}
		
	}
})