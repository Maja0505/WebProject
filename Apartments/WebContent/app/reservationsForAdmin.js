/**
 * 
 */
Vue.component("reservationsForAdmin",{
	data : function(){
		return {
			allReservations:null,
			searchText:'',
			currentSortDir:'asc',
	    	showFiltersForm:false,
	    	isCreated:false,
	    	isRejected:false,
	    	isWithdrawal:false,
	    	isAccepted:false,
	    	isCompleted:false,
		}
	},
	
	template : `
				<div>
					<div class="content-profile" style="background-image: url('images/apartment3.png');">
						<form class="container-amenities">
						
						
						
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
						
						
							<div class="container-user-for-admin" v-for="r in search">
							 
							  <p><span >{{r.apartment.id}}</span></p>
							  <P>Guest: {{r.guest.username }}</p>
							  <p>Status: {{r.statusOfReservation }}</p>
							  <p>Full price:{{r.fullPrice}}</p>
							</div>
					
					</div>
						
						</form>
					</div>
				</div>
			`,
	mounted(){
        
        this.$root.$on('reservationsForAdmin',(text) => {this.showAllReservations()});
        this.showAllReservations()    //PROVERITI
	},
	
	methods : {
		
		showAllReservations : function(){
			this.searchText = '';
			axios
		        .get('rest/reservations/all')
		        .then(response => (response.data ? this.allReservations = response.data : this.allReservations = null,
		        		this.showReservations = true))
		},
		
		
		sort(){
			if(this.currentSortDir == 'asc'){
				this.currentSortDir = 'desc';
			}else
				this.currentSortDir = 'asc'
			
			if(this.allReservations){
				this.allReservations = this.allReservations.sort((a,b) => {
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
		
		
	},
	
	computed : {
		
		search(){
		if(this.allReservations)	
			return this.allReservations.filter(r => {
			         return r.guest.username.toLowerCase().includes(this.searchText.toLowerCase()) && (this.filterByCreateStatus(r) || this.filterByRejectedStatus(r) || this.filterByWithdrawalStuatus(r) || this.filterByAcceptedStatus(r) || this.filterByCompletedStatus(r))})
		}
	}

});