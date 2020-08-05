Vue.component("apartmentsForHost", {
	
	data: function () {
	    return {
	    	showOptions:false,
	    	showActive:false,
	    	showInactive:false,
	    	allApartments:null,
	    	selectedApartment:null,
	    	activeApartmentsForHost:[],
	    	inactiveApartmentsForHost:[],
	    	loggedUser:null
	    }
	},
	
	template: `
		<div>
			<div v-show="showOptions" style="border: 5px solid red">
			<button v-on:click="showActiveForHost()">Show ACTIVE apartments</button>
			<button v-on:click="showInactiveForHost()">Show INACTIVE apartments</button>
			
			<div v-show="showActive">
					<h3>ACTIVE Apartments</h3>
					<label v-show="activeApartmentsForHost.length == 0">Apartments with status ACTIVE doesn't exist</label>
					<table v-show="activeApartmentsForHost.length != 0" border = "1" class="activeApartmentsForHost">
						<tr bgcolor="lightgrey">
							<th>ID</th>
							<th>Location</th>
							<th>Price Per Night</th>
							<th>Host</th>
							<th>Status</th>
						</tr>
					    
						<tr v-for="a in activeApartmentsForHost"  v-on:click="selectApartment(a)" v-if="a.statusOfApartment == 'ACTIVE'">
							<td>{{a.id}}</td>
							<td>{{a.location.address.city}}</td>
							<td>{{a.pricePerNight }}</td>
							<td>{{a.host.username }}</td>
							<td>{{a.statusOfApartment}}</td>
							
						</tr>
					</table>
					<editApartment></editApartment>
				</div>
				<div v-show="showInactive">
					<h3>INACTIVE Apartments</h3>
					<label v-show="inactiveApartmentsForHost.length == 0">Apartments with status INACTIVE doesn't exist</label>
					<table v-show="inactiveApartmentsForHost.length != 0" border = "1" class="inactiveApartmentsForHost">
						<tr bgcolor="lightgrey">
							<th>ID</th>
							<th>Location</th>
							<th>Price Per Night</th>
							<th>Host</th>
							<th>Status</th>
						</tr>
					    
						<tr v-for="a in inactiveApartmentsForHost"  v-on:click="selectApartment(a)" v-if="a.statusOfApartment == 'INACTIVE'">
							<td>{{a.id}}</td>
							<td>{{a.location.address.city}}</td>
							<td>{{a.pricePerNight }}</td>
							<td>{{a.host.username }}</td>
							<td>{{a.statusOfApartment}}</td>
							
						</tr>
					</table>
					<editApartment></editApartment>
				</div>
			</div>
		</div>
	`	
		,
		
	mounted(){
		        
	        this.$root.$on('showApartments',(text) => {this.showOptions = text});
		        
			},
	methods:{
		selectApartment : function(apartment){
			this.selectedApartment = apartment;
			this.$root.$emit('showEditButton',this.selectedApartment,false);

		},
		showActiveForHost: function(){
			if(this.showActive){
				this.showActive = false;
			}else{
				this.showActive = true;
				this.showInactive = false;
			}
			this.$root.$emit('showEditButton',null);

			axios
	        .get('rest/users/currentUser')
	        .then(response => (response.data ? this.loggedUser = response.data : this.loggedUser = null,
	        axios
	    	     .get('rest/apartments/all')
	    	     .then(response => (response.data ? this.allApartments = response.data : this.allApartments = null,
	    	        		this.getActiveApartments()))))
			
		},
		
		showInactiveForHost: function(){
			if(this.showInactive){
				this.showInactive = false;
			}else{
				this.showActive = false;
				this.showInactive = true;
			}
			this.$root.$emit('showEditButton',null);

			axios
	        .get('rest/users/currentUser')
	        .then(response => (response.data ? this.loggedUser = response.data : this.loggedUser = null,
	        axios
	    	     .get('rest/apartments/all')
	    	     .then(response => (response.data ? this.allApartments = response.data : this.allApartments = null,
	    	        		this.getInactiveApartments()))))
		},
		getActiveApartments: function(){
		   let allActiveApartments= this.allApartments.filter(apartment => {
		        return apartment.statusOfApartment == ("ACTIVE")})
		     
		   this.activeApartmentsForHost = [];
		    for(apartment of allActiveApartments){
		    	if(apartment.host.id == this.loggedUser.id ){
		    		this.activeApartmentsForHost.push(apartment);
		    	}
		    }
		},
		getInactiveApartments: function(){
			   let allInactiveApartments= this.allApartments.filter(apartment => {
			        return apartment.statusOfApartment == ("INACTIVE")})
			     
			   this.inactiveApartmentsForHost = [];
			    for(apartment of allInactiveApartments){
			    	if(apartment.host.username == this.loggedUser.username ){
			    		this.inactiveApartmentsForHost.push(apartment);
			    	}
			    }
			}
		
		
	}
});