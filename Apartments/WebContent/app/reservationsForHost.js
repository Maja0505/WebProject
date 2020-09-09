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
		
			<div class="content-profile" style="background-image: url('images/apartment3.png');">
				<form class="container-amenities" method="put">
	
					<h1 style="margin-left:15%;">RESERVATIONS</h1>
					<div>
							<div class="row" style="padding-left:15%;padding-right:15%;">
								<div class="column">
									  <input style=" border-radius: 0;width: 80%; margin-top:10%; padding: 10px;margin-right:0%;margin-left:0%;" type="text" placeholder="Search reservation by username.." v-model = "searchText">							
								</div>
								<div class="column">
									  <button v-on:click="sort()" style=" padding: 10px;margin-right:0%;margin-left:0%;margin-top:10%;float:right;width:40%;height:20%;" class="addBtn">Sort by price</button>
								</div>
	
							</div>
					 </div>
					 <div class="container-user-for-admin"  v-on:click="showFilters()">
							 <p><span >FILTERS</span></p>
							 <div v-if="showFiltersForm">
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
					 </div>
					
						
					
					<div style="margin-top:3%;">
						<div class="container-user-for-admin" v-for="g in search">
							 <p><span >Reservation ID: {{g.id}}</span></p>
							 <div class="row">
							 		<div class="column">
										<p>Apartnet id: {{g.apartment.id}}</p>
								  	</div>
								    <div class="column">
								    	<p>Guest: {{g.guest.username }}</p>
								  	</div>
							 </div>
							 <div class="row">
									<div class="column">
							    		<p>Status: {{g.statusOfReservation }}</p>
							  		</div>
							   		<div class="column">
							    		<p>Full price: {{g.fullPrice}}</p>
							  		</div>
							 </div>
							 <div class="row">
							  		<div class="column">
							      		<p>Start date: {{g.startDateOfReservation | dateFormat('DD.MM.YYYY')}}</p>
							  		</div>
							   		<div class="column">
							    		<p>Number Of Nights: {{g.numberOfNights}}</p>
							  		</div>
							 </div>
							 
							 <div class="row">
								  <div class="column">
								       <label v-show = "(g.statusOfReservation == 'CREATED' && !isFinished(g))" style="visibility:hidden;">Reservation isn't finished</label>
								       <label  v-show = "g.statusOfReservation == 'COMPLETED'">Reservation is completed</label>
									   <label  v-show = "(g.statusOfReservation == 'ACCEPTED' && !isFinished(g))">Reservation isn't finished</label>
								  </div>
							  	  <div class="column">
								   	   <div class="column">
								           <button class="confirm_edit_button" v-show = "g.statusOfReservation == 'CREATED'" v-on:click ="accepteReservation(g)" type="button" style="padding: 0px;">Accept reservation</button>
								 	   </div>
								 	   <div class="column" >
								 	   			<button class="cancel_edit_button" v-show = "(g.statusOfReservation == 'ACCEPTED' || g.statusOfReservation == 'CREATED')" v-on:click = "cancelReservation(g)" type="button" style="padding: 0px;">Reject reservation</button>
								       			<button class="cancel_edit_button"  v-show = "(g.statusOfReservation == 'ACCEPTED' && isFinished(g))" v-on:click = "completeReservation(g)" type="button" style="padding: 0px;">Complete reservation</button>
								 	   </div>
								 </div>
							  </div>
				   		</div>
					</div>
						
				</form>
			</div>
		</div>
		`
			,
			
			mounted(){
			        
		        this.$root.$on('reservationsForHost',(text) => {this.showReservations()});
		        this.showReservations()
			        
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
				
				filteredAllReservations: function(){
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