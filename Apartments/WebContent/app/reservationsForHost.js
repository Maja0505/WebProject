function fixDate(reservations){
	for(var r of reservations){
		
			r.startDateOfReservation= new Date(parseInt(r.startDateOfReservation));
		
	}
	return reservations;
}
function f(date){
	 return new Date(parseInt(date));
}
var startDate = null;
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
	    	sorting:'',
	    	allApartments:null,
	    	apartmentForUpdate :null,
	    }
},
		template: ` 
		<div>
		
			<div class="content-profile">
				<form class="container-amenities" method="put">
	
					<h1 style="margin-left:15%;">RESERVATIONS</h1>
					<div>
							<div class="row" style="padding-left:15%;padding-right:15%;">
								<div class="column">
									  <input style=" border-radius: 0;width: 80%; margin-top:10%; padding: 10px;margin-right:0%;margin-left:0%;" type="text" placeholder="Search reservation by username.." v-model = "searchText">							
								</div>
								<div class="column">
									<button type="button" v-on:click="sort()" v-if="search.length != 0" style=" padding: 10px;margin-right:0%;margin-left:0%;margin-top:10%;float:right;width:50%;height:20%;" class="addBtn">SORT BY PRICE
										<span style="visibility:hidden">j</span>
									 	<img src="images/down.png" class="icon" v-show="sorting=='asc'"></img>
										<img src="images/up-arrow.png" class="icon" v-show="sorting=='desc'"></img>	
								  	</button>
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
								 	   			<button class="cancel_edit_button" v-show = "(g.statusOfReservation == 'ACCEPTED' || g.statusOfReservation == 'CREATED')" v-on:click = "cancelReservation(g,g.startDateOfReservation)" type="button" style="padding: 0px;">Reject reservation</button>
								       			<button class="cancel_edit_button"  v-show = "(g.statusOfReservation == 'ACCEPTED' && isFinished(g))" v-on:click = "completeReservation(g)" type="button" style="padding: 0px;">Complete reservation</button>
								 	   </div>
								 </div>
							  </div>
				   		</div>
				   		<div class="container-user-for-admin" v-if="search.length == 0">
								<h3>Reservation doesn't exist</h3>
						</div>
					</div>
						
				</form>
			</div>
		</div>
		`
			,
			
			mounted(){
				this.changeBGImage();    
		        this.$root.$on('reservationsForHost',(text) => {this.showReservations()});
		        this.showReservations()
			},
			
			methods:{
				
				check : function(){
					if(!this.loggedUser){
						this.$router.push('/login');
					}else if(this.loggedUser.typeOfUser != 'HOST'){
						this.$router.push('/403');
					}
										
				},
				
				changeBGImage : function(){
					document.querySelector('body').style.backgroundImage = 'url(' + "images/apartment3.png" + ')';
				},
				
				selectReservation : function(reservation){
					this.selectedReservation = reservation;
				},
				showReservations : function(){
					axios
				        .get('rest/users/currentUser')
				        .then(response => (response.data ? this.loggedUser = response.data : this.loggedUser = null,this.check(),
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
				cancelReservation: function(reservation,s){
					var d = s;
					console.log(d);
					this.selectedReservation = reservation;
					this.selectedReservation.statusOfReservation = 'REJECTED';
					
					let index = this.hostReservations.indexOf(reservation)
					if(index > -1){
						this.hostReservations[index] = this.selectedReservation;
					}
					axios
		        	.put('rest/reservations/updateReservation',this.selectedReservation)
		        	 
		        	this.getAllApartments()
		        	
				},
				getAllApartments:function(){
					 axios
			          .get('rest/apartments/all')
			          .then(response => (response.data ? this.allApartments = response.data : this.allApartments = null,this.findApartment()))
				},
				findApartment:function(){
					let doUpdate = false;
					for(a of this.allApartments){
						if(a.id == this.selectedReservation.apartment.id){
							var startYear = this.selectedReservation.startDateOfReservation.getYear() + 1900;
							 var startMonth = this.selectedReservation.startDateOfReservation.getMonth();
							 var startDay = this.selectedReservation.startDateOfReservation.getDate();
							for(let i = 0; i < this.selectedReservation.numberOfNights;i++){
								startDate = new Date(startYear,startMonth,startDay,0,0,0,0);
								startDate.setDate(startDate.getDate() + i);
								a.availabilityByDates.push(startDate)
								doUpdate = true;
							}
							if(doUpdate){
								this.updateApartment(a)
							}
							break;
						}
					}
					
				},
				updateApartment: function(a){
					 axios
			          .put('rest/apartments/updateApartment',a)
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
				},
				isFinished: function(reservation){
					var startYear = reservation.startDateOfReservation.getYear() + 1900;
					 var startMonth = reservation.startDateOfReservation.getMonth();
					 var startDay = reservation.startDateOfReservation.getDate();
					 var d =  new Date(startYear,startMonth,startDay,0,0,0,0);
					 d.setDate(d.getDate() + reservation.numberOfNights - 1)
					if(d < fixOneDate(this.now) ){
						return true;
					}else{
						return false;
					}
				},
				sort(){
					if(this.currentSortDir == 'asc'){
						this.currentSortDir = 'desc';
						this.sorting = 'asc';
					}else{
						this.currentSortDir = 'asc'
						this.sorting = 'desc';		
					}
					
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
				
					return this.hostReservations.filter(a => {
					         return a.guest.username.toLowerCase().includes(this.searchText.toLowerCase()) && (this.filterByCreateStatus(a) || this.filterByRejectedStatus(a) || this.filterByWithdrawalStuatus(a) || this.filterByAcceptedStatus(a) || this.filterByCompletedStatus(a))  })
				}
			}
});