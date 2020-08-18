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
				<table class="table table-hover">
				<thead>
					<tr bgcolor="lightblue">
						<th>Apartment id</th>
						<th>Guest username</th>
						<th>Status of reservation</th>
						<th v-on:click="sort()">Full price</th>
						<th>Change status</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="g in guestReservations"  v-on:click="selectReservation(g)">
						<td>{{g.apartment.id}}</td>
						<td>{{g.guest.username }}</td>
						<td>{{g.statusOfReservation }}</td>
						<td>{{g.fullPrice}}</td>
						<td><button v-on:click="changeState(g)" v-bind:disabled="(g.statusOfReservation != 'ACCEPTED' && g.statusOfReservation != 'CREATED')">Change</button></td>
					</tr>
				</tbody>
				</table>
			</div>
		</div>
	
	`,
	
	mounted(){
	        
        this.$root.$on('showGuestReservations',(text) => {this.showReservations()});
	        
	},
	
	methods:{
		showReservations : function(){
		
		if(!this.showGuestReservations)	
			axios
		        .get('rest/users/currentUser')
		        .then(response => (response.data ? this.user = response.data : this.user = null,
	        		axios
	    	        .get('rest/reservations/all')
	    	        .then(response => (response.data ? this.allReservations = response.data : this.allReservations = null,
	    	        		this.filteredAllReservations(),this.showGuestReservations = true))))
	    else
	    	this.showGuestReservations = false;
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
			
			axios
	        	.put('rest/reservations/updateReservation',this.selectedReservation)
			
		},
		sort(){
			if(this.currentSortDir == 'asc'){
				this.currentSortDir = 'desc';
			}else
				this.currentSortDir = 'asc'
			
			if(this.guestReservations){
				this.guestReservations = this.guestReservations.sort((a,b) => {
			      let modifier = 1;
			      if(this.currentSortDir === 'desc') modifier = -1;
			      if(a['fullPrice'] < b['fullPrice']) return -1 * modifier;
			      if(a['fullPrice'] > b['fullPrice']) return 1 * modifier;
			      return 0;
			    });
				this.searchText = this.searchText;
			}
		}
		
	}

});