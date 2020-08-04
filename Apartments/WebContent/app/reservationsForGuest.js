/**
 * 
 */
Vue.component("reservationsForGuest", {
	data: function () {
	    return {
		  allReservations:null,
		  user:null,
		  guestReservations:[],
		  showGuestReservations:false,
		  selectedReservation:null
	    }
	},
	
	template: `
		<div>
			<div v-show="showGuestReservations">
				<table border = "1" class="guestReservations">
					<tr bgcolor="lightgrey">
						<th>Apartment id</th>
						<th>Guest username</th>
						<th>Status of reservation</th>
						<th>Change status</th>
					</tr>
					<tr v-for="g in guestReservations"  v-on:click="selectReservation(g)">
						<td>{{g.apartment.id}}</td>
						<td>{{g.guest.username }}</td>
						<td>{{g.statusOfReservation }}</td>
						<td><button v-on:click="changeState(g)" v-bind:disabled="(g.statusOfReservation != 'ACCEPTED' && g.statusOfReservation != 'CREATED')">Change</button></td>
					</tr>
				</table>
			</div>
		</div>
	
	`,
	
	mounted(){
	        
        this.$root.$on('showGuestReservations',(text) => {this.showReservations()});
	        
	},
	
	methods:{
		showReservations : function(){
			
			axios
		        .get('rest/users/currentUser')
		        .then(response => (response.data ? this.user = response.data : this.user = null,
	        		axios
	    	        .get('rest/reservations/all')
	    	        .then(response => (response.data ? this.allReservations = response.data : this.allReservations = null,
	    	        		this.filteredAllReservations(),this.show()))))
		},
		
		show : function(){
			if(this.showGuestReservations){
				this.showGuestReservations = false
			}else
				this.showGuestReservations = true
		},
		
		filteredAllReservations : function(){
			this.guestReservations = [];
			for(let userReservation of this.user.reservations){
				for(let reservation of this.allReservations){
					if(userReservation.id == reservation.id){
						this.guestReservations.push(reservation);
					}
				}
			}
		},
		
		selectReservation : function(reservation){
			this.selectedReservation = reservation;
		},
		
		changeState : function(r){
			this.selectedReservation = r;
			this.selectedReservation.statusOfReservation = 'WITHDRAWAL';
			
			let index = this.guestReservations.indexOf(r)
			if(index > -1){
				this.guestReservations[index] = this.selectedReservation
			}
			/*
			this.selectedReservation.statusOfReservation = 'WITHDRAWAL';
			//ostalo je odraditi update u reservation
			axios
	        	.put('rest/reservations/updateReservation',this.selectedReservation)*/
			
		}
		
	}

});