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
	    	showEditButton:false,
	    	searchText:'',
	    	showFiltersForm:false,
	    	isCreated:false,
	    	isRejected:false,
	    	isWithdrawal:false,
	    	isAccepted:false,
	    	isCompleted:false,
	    	
	    }
},
		template: ` 
		<div>
			
			<div v-show="showAllReservations">
			 <div class="search-container">
			  		<p>Pretraga</p>
					<input type="text" placeholder="Search reservation" v-model = "searchText">
			</div>
			<button v-on:click="showFilters()">Filters</button>
			<div v-show="showFiltersForm">
				<input type="checkbox" id="create" name="create" value="CREATED" v-model="isCreated">
				<label>CREATED</label><br>
				<input type="checkbox" id="rejected" name="rejected" value="REJECTED" v-model="isRejected" >
				<label>REJECTED</label><br>
				<input type="checkbox" id="withdrawal" name="withdrawal" value="WITHDRAWAL" v-model="isWithdrawal">
				<label>WITHDRAWAL</label><br> 
				<input type="checkbox" id="accepted" name="accepted" value="ACCEPTED" v-model="isAccepted">
				<label>ACCEPTED</label><br>
				<input type="checkbox" id="completed" name="completed" value="COMPLETED" v-model="isCompleted">
				<label>COMPLETED</label><br>
			</div>
			 <table border = "1" class="guestReservations">
					<tr bgcolor="lightgrey">
						<th>Apartment id</th>
						<th>Guest username</th>
						<th>Start date</th>
						<th>Number Of Nights</th>
						<th v-on:click="sort()">Full price</th>
						<th>Status of reservation</th>
						<th>Change status</th>
						<th>Complete</th>
					</tr>
					<tr v-for="g in search"  v-on:click="selectReservation(g)">
						<td>{{g.apartment.id}}</td>
						<td>{{g.guest.username }}</td>
						<td>{{g.startDateOfReservation | dateFormat('DD.MM.YYYY')}}</td>
						<td>{{g.numberOfNights}}</td>
						<td>{{g.fullPrice}}</td>
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
					
					axios
			        	.put('rest/reservations/updateReservation',this.selectedReservation)
					
				},
				cancelReservation: function(reservation){
					this.selectedReservation = reservation;
					this.selectedReservation.statusOfReservation = 'REJECTED';
					
					let index = this.hostReservations.indexOf(reservation)
					if(index > -1){
						this.hostReservations[index] = this.selectedReservation;
					}
					axios
		        	.put('rest/reservations/updateReservation',this.selectedReservation)
				},
				completeReservation: function(reservation){
					this.selectedReservation = reservation;
					this.selectedReservation.statusOfReservation = 'COMPLETED';
					
					let index = this.hostReservations.indexOf(reservation)
					if(index > -1){
						this.hostReservations[index] = this.selectedReservation;
					}
					axios
		        	.put('rest/reservations/updateReservation',this.selectedReservation)
				},isFinished: function(reservation){
					let date = reservation.startDateOfReservation;

					date.setDate(date.getDate() + reservation.numberOfNights);
					if(date < fixOneDate(this.now) ){
						return true;
					}else{

						return false;
					}
				},
				sort(){
					if(this.currentSortDir == 'asc'){
						this.currentSortDir = 'desc';
					}else
						this.currentSortDir = 'asc'
					
					if(this.hostReservations){
						this.hostReservations = this.hostReservations.sort((a,b) => {
					      let modifier = 1;
					      if(this.currentSortDir === 'desc') modifier = -1;
					      if(a['fullPrice'] < b['fullPrice']) return -1 * modifier;
					      if(a['fullPrice'] > b['fullPrice']) return 1 * modifier;
					      return 0;
					    });
						this.searchText = this.searchText;
					}
				},
				showFilters: function(){
					if(this.showFiltersForm){
						this.showFiltersForm = false;
					}else{
						this.showFiltersForm = true;
					}
				},
				filterByCreateStatus:function(a){
					if(this.isCompleted || this.isAccepted || this.isWithdrawal || this.isRejected || this.isCompleted || this.isCreated)
					{
						if(this.isCreated){
							if(a.statusOfReservation === 'CREATED'){
								return true
							}else{
								return false
							}

						}else{
							return false
						}
					}else{
						return true
					}

				},
				filterByRejectedStatus:function(a){
					if(this.isCompleted || this.isAccepted || this.isWithdrawal || this.isRejected || this.isCompleted || this.isCreated)
					{
						if(this.isRejected){
							if(a.statusOfReservation === 'REJECTED'){
								return true
							}else{
								return false
							}

						}else{
							return false
						}
					}else{
						return true
					}

				},filterByWithdrawalStuatus:function(a){
					if(this.isCompleted || this.isAccepted || this.isWithdrawal || this.isRejected || this.isCompleted || this.isCreated)
					{
						if(this.isWithdrawal){
							if(a.statusOfReservation === 'WITHDRAWAL'){
								return true
							}else{
								return false
							}

						}else{
							return false
						}
					}else{
						return true
					}

				},filterByAcceptedStatus:function(a){
					if(this.isCompleted || this.isAccepted || this.isWithdrawal || this.isRejected || this.isCompleted || this.isCreated)
					{
						if(this.isAccepted){
							if(a.statusOfReservation === 'ACCEPTED'){
								return true
							}else{
								return false
							}

						}else{
							return false
						}
					}else{
						return true
					}

				},filterByCompletedStatus:function(a){
					if(this.isCompleted || this.isAccepted || this.isWithdrawal || this.isRejected || this.isCompleted || this.isCreated)
					{
						if(this.isCompleted){
							if(a.statusOfReservation === 'COMPLETED'){
								return true
							}else{
								return false
							}

						}else{
							return false
						}

					}else{
						return true
					}
				}
				
				
			},filters: {

				dateFormat: function (value, format) {

				var parsed = moment(value);

				return parsed.format(format);

				}

			},
			computed : {

				search(){
				if(this.hostReservations)	
					return this.hostReservations.filter(a => {
					         return a.guest.username.toLowerCase().includes(this.searchText.toLowerCase()) && (this.filterByCreateStatus(a) || this.filterByRejectedStatus(a) || this.filterByWithdrawalStuatus(a) || this.filterByAcceptedStatus(a) || this.filterByCompletedStatus(a))  })
				}
			}
});