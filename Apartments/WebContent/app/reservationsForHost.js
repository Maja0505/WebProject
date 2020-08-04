function fixDate(reservations){
	for(var r of reservations){
		
			r.startDateOfReservation= new Date(parseInt(r.startDateOfReservation));
		
	}
	return reservations;
}
function fixOneDate(date){
	 return new Date(parseInt(date));
}
Vue.component("reservationsForHost", {
	data: function () {
	    return {
	    	showAllReservations:false,
	    	allReservationsForHost:null,
	    	loggedUser:null,
	    	hostReservations:[],
	    	selectedReservation:null,
	    	now: Date.now(),
	    	endDate: Date.now(),
	    }
},
		template: ` 
		<div>
			
			<div v-show="showAllReservations">
			  <table border = "1" class="guestReservations">
					<tr bgcolor="lightgrey">
						<th>Apartment id</th>
						<th>Guest username</th>
						<th>Start date</th>
						<th>Number Of Nights</th>
						<th>Status of reservation</th>
						<th>Change status</th>
						<th>Complete</th>
					</tr>
					<tr v-for="g in hostReservations"  v-on:click="selectReservation(g)">
						<td>{{g.apartment.id}}</td>
						<td>{{g.guest.username }}</td>
						<td>{{g.startDateOfReservation | dateFormat('DD.MM.YYYY')}}</td>
						<td>{{g.numberOfNights}}</td>
						<td>{{g.statusOfReservation }}</td>
						<td><button  v-show = "g.statusOfReservation == 'CREATED'" v-on:click ="accepteReservation(g)" >Accept reservation</button>
							<button  v-show = "(g.statusOfReservation == 'ACCEPTED' || g.statusOfReservation == 'CREATED')" v-on:click = "cancelReservation(g)">Cancel reservation</button>
						</td>
						<td>
							<button  v-show = "(g.statusOfReservation == 'ACCEPTED' && isFinished(g))" v-on:click = "completeReservation(g)">Complete reservation</button>
							<label  v-show = "g.statusOfReservation == 'COMPLETED'">Reservation is completed</label>
							<label  v-show = "(g.statusOfReservation == 'ACCEPTED' && !isFinished(g))">Reservation isn't finished</label>
						</td>
					</tr>
				</table>
			</div>		
		</div>
		`
			,
			
			mounted(){
			        
		        this.$root.$on('showAllReservationsForHost',(text) => {this.showAllReservations = text,this.show()});
			        
			},
			
			methods:{
				selectReservation : function(reservation){
					this.selectedReservation = reservation;
				},
				showReservations : function(){
					axios
				        .get('rest/users/currentUser')
				        .then(response => (response.data ? this.loggedUser = response.data : this.loggedUser = null,
				        axios
				    	     .get('rest/reservations/all')
				    	     .then(response => (response.data ? this.allReservationsForHost = fixDate(response.data) : this.allReservationsForHost = null,
				    	        		this.filteredAllReservations()))))
				},
				
				show : function(){
					if(this.showReservations){
						this.showReservations();
					}
				},filteredAllReservations: function(){
					this.hostReservations = [];
					for(let apartment of this.loggedUser.apartmentsForRent){
						for(let reservation of this.allReservationsForHost){
							if(apartment.id == reservation.apartment.id){
								this.hostReservations.push(reservation);
							}
						}
					}
				},
				accepteReservation: function(reservation){
					this.selectedReservation = reservation;
					this.selectedReservation.statusOfReservation = 'ACCEPTED';
					
					let index = this.hostReservations.indexOf(reservation)
					if(index > -1){
						this.hostReservations[index] = this.selectedReservation;
					}
					
					/*axios
			        	.put('rest/reservations/updateReservation',this.selectedReservation)*/
					
				},
				cancelReservation: function(reservation){
					this.selectedReservation = reservation;
					this.selectedReservation.statusOfReservation = 'REJECTED';
					
					let index = this.hostReservations.indexOf(reservation)
					if(index > -1){
						this.hostReservations[index] = this.selectedReservation;
					}
					/*axios
		        	.put('rest/reservations/updateReservation',this.selectedReservation)*/
				},
				completeReservation: function(reservation){
					this.selectedReservation = reservation;
					this.selectedReservation.statusOfReservation = 'COMPLETED';
					
					let index = this.hostReservations.indexOf(reservation)
					if(index > -1){
						this.hostReservations[index] = this.selectedReservation;
					}
					/*axios
		        	.put('rest/reservations/updateReservation',this.selectedReservation)*/
				},isFinished: function(reservation){
					let date = reservation.startDateOfReservation;

					date.setDate(date.getDate() + reservation.numberOfNights);
					if(date < fixOneDate(this.now) ){
						return true;
					}else{

						return false;
					}
				}
				
				
			},filters: {

				dateFormat: function (value, format) {

				var parsed = moment(value);

				return parsed.format(format);

				}

			}
});