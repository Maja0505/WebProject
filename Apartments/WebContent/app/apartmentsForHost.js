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
	    	loggedUser:null,
	    	currentSort:'id',
	        currentSortDir:'asc',
	        searchStartDate:'',
		    searchEndDate:'',
		   	searchPriceFrom:'',
		   	searchPriceTo:'',
		   	searchLocation:'',
		   	searchNumberOfRoomsFrom:'',
	    	searchNumberOfRoomsTo:'',
	    	searchNumberOfGuests:'',
	    	showFiltersForm:false,
	    	allAmenities:[],
	    	isActive:false,
	    	isInactive:false,
	    	isRoom:false,
	    	isWholeApartment:false,
	    	checkedAmenities:[]
	    }
	},
	
	template: `
		<div>
			<div v-show="showOptions" style="border: 5px solid red">
			<button v-on:click="showActiveForHost()">Show ACTIVE apartments</button>
			<button v-on:click="showInactiveForHost()">Show INACTIVE apartments</button>
			
			<div v-show="showActive">
					<searchApartments></searchApartments>
					<button v-on:click="showFilters()">Filters</button>
					<div v-show="showFiltersForm">
						<p>STATUS OF APARTMENT</p>
						<input type="checkbox" id="create" name="create" value="ACTIVE" v-model="isActive">
						<label>ACTIVE</label><br>
						<input type="checkbox" id="rejected" name="rejected" value="INACTIVE" v-model="isInactive" >
						<label>INACTIVE</label><br>
						
						<p>TYPE OF APARTMENT</p>
						<input type="checkbox" id="withdrawal" name="withdrawal" value="ROOM" v-model="isRoom">
						<label>ROOM</label><br> 
						<input type="checkbox" id="accepted" name="accepted" value="WHOLE_APARTMENT" v-model="isWholeApartment">
						<label>WHOLE_APARTMENT</label><br>
						
						<p>AMENITIES</p>
						<table class="allAmenities">
							<tr><td>Name</td><td>Checked</td></tr>
							
							<tr  v-for="a in allAmenities">
								<td><input type="checkbox"  @click="onChange(a,$event)"></td>
								<td>{{a.name}}</td>
							</tr>
						</table>
						
					</div>
					<h3>ACTIVE Apartments</h3>
					<label v-show="activeApartmentsForHost.length == 0">Apartments with status ACTIVE doesn't exist</label>
					<table v-show="activeApartmentsForHost.length != 0" border = "1" class="table table-hover">
						<thead>
							<tr bgcolor="lightblue">
								<th @click="sort('id')">ID</th>
								<th @click="sort('location')">Location</th>
								<th @click="sort('pricePerNight')">Price Per Night</th>
								<th @click="sort('hostName')">Host</th>
								<th @click="sort('status')">Status</th>
							</tr>
						</thead>
					    <tbody>
							<tr v-for="a in searchActive"  v-on:click="selectApartment(a)" v-if="a.statusOfApartment == 'ACTIVE'">
								<td>{{a.id}}</td>
								<td>{{a.location.address.city}}</td>
								<td>{{a.pricePerNight }}</td>
								<td>{{a.host.username }}</td>
								<td>{{a.statusOfApartment}}</td>
								
							</tr>
						</tbody>
					</table>
					<button style="background-color:MediumSeaGreen;" v-on:click="openEditForm()" v-show="selectedApartment">Show details of apartment</button>
					<button style="background-color:MediumSeaGreen;"  v-on:click="showCommentForApartment()" v-show="selectedApartment">Show comment for apartment</button>
					<editApartment></editApartment>
			    	<commentApartmentForHost></commentApartmentForHost>
				</div>
				<div v-show="showInactive">
					<searchApartments></searchApartments>
					<button v-on:click="showFilters()">Filters</button>
					<div v-show="showFiltersForm">
						<p>STATUS OF APARTMENT</p>
						<input type="checkbox" id="create" name="create" value="ACTIVE" v-model="isActive">
						<label>ACTIVE</label><br>
						<input type="checkbox" id="rejected" name="rejected" value="INACTIVE" v-model="isInactive" >
						<label>INACTIVE</label><br>
						
						<p>TYPE OF APARTMENT</p>
						<input type="checkbox" id="withdrawal" name="withdrawal" value="ROOM" v-model="isRoom">
						<label>ROOM</label><br> 
						<input type="checkbox" id="accepted" name="accepted" value="WHOLE_APARTMENT" v-model="isWholeApartment">
						<label>WHOLE_APARTMENT</label><br>
						
						<p>AMENITIES</p>
						<table class="allAmenities">
							<tr><td>Name</td><td>Checked</td></tr>
							
							<tr  v-for="a in allAmenities">
								<td><input type="checkbox"  @click="onChange(a,$event)"></td>
								<td>{{a.name}}</td>
							</tr>
						</table>
						
					</div>
					<h3>INACTIVE Apartments</h3>
					<label v-show="inactiveApartmentsForHost.length == 0">Apartments with status INACTIVE doesn't exist</label>
					<table v-show="inactiveApartmentsForHost.length != 0" border = "1" class="table table-hover">
						<thead>
							<tr bgcolor="lightblue">
								<th @click="sort('id')">ID</th>
								<th @click="sort('location')">Location</th>
								<th @click="sort('pricePerNight')">Price Per Night</th>
								<th @click="sort('hostName')">Host</th>
								<th @click="sort('status')">Status</th>
							</tr>
						</thead>
						
					    <tbody>
							<tr v-for="a in searchInactive"  v-on:click="selectApartment(a)" v-if="a.statusOfApartment == 'INACTIVE'">
								<td>{{a.id}}</td>
								<td>{{a.location.address.city}}</td>
								<td>{{a.pricePerNight }}</td>
								<td>{{a.host.username }}</td>
								<td>{{a.statusOfApartment}}</td>
								
							</tr>
					   </tbody>
					</table>
					<button style="background-color:MediumSeaGreen;" v-on:click="openEditForm()" v-show="selectedApartment">Show details of apartment</button>
					<button style="background-color:MediumSeaGreen;"  v-on:click="showCommentForApartment()" v-show="selectedApartment">Show comment for apartment</button>
					<editApartment></editApartment>
			    	<commentApartmentForHost></commentApartmentForHost>
				</div>
			</div>
		</div>
	`	
		,
		
	mounted(){
		        
	        this.$root.$on('showApartments',(text) => {this.showOptions = text});
	        this.$root.$on('searchApartmentForHost',(searchStartDate,searchEndDate,searchPriceFrom,searchPriceTo,searchLocation,searchNumberOfRoomsFrom,searchNumberOfRoomsTo,searchNumberOfGuests)=>
	        {
	        	
	        this.searchStartDate='',
	 	   	this.searchEndDate='',
	 	   	this.searchPriceFrom='',
	 	   	this.searchPriceTo='',
	     	this.searchLocation='',
	    	this.searchNumberOfRoomsFrom='',
	    	this.searchNumberOfRoomsTo='',
	 	   	this.searchNumberOfGuests='',
	 	   
	        	
	        this.searchStartDate=searchStartDate,
	    	this.searchEndDate=searchEndDate,
	    	this.searchPriceFrom=searchPriceFrom,
	    	this.searchPriceTo=searchPriceTo,
	    	this.searchLocation=searchLocation,
	    	this.searchNumberOfRoomsFrom=searchNumberOfRoomsFrom,
	    	this.searchNumberOfRoomsTo=searchNumberOfRoomsTo,
	    	this.searchNumberOfGuests=searchNumberOfGuests

	    	});
	        this.$root.$on('refreshTable',(text) => {
	        	
		        axios
		    	  .get('rest/apartments/all')
		          .then(response => (response.data ? this.allApartments = response.data : this.allApartments = null,this.getInactiveApartments(),this.getActiveApartments()))

	        });


		        
			},
	methods:{
		selectApartment : function(apartment){
			this.selectedApartment = apartment;
			//ako ponovo selektujemo da nam se zatvore sve forme
			this.$root.$emit('showEditForm',null,false);
			this.$root.$emit('showComment',null,false);


		},
		showActiveForHost: function(){
			
	        this.searchStartDate='';
		    this.searchEndDate='';
		   	this.searchPriceFrom='';
		   	this.searchPriceTo='';
		   	this.searchLocation='';
		   	this.searchNumberOfRoomsFrom='';
	    	this.searchNumberOfRoomsTo='';
	    	this.searchNumberOfGuests='';
	    	
	    	this.isActive=false,
	    	this.isInactive=false,
	    	this.isRoom=false,
	    	this.isWholeAparmtnet=false
	    	
	    	this.$root.$emit('clearSearch','');
	    	
			if(this.showActive){
				this.showActive = false;
			}else{
				this.showActive = true;
				this.showInactive = false;
			}
			
			//ako menjamo tabelu,selektovani postaje null i sakrivamo forme za edit i comment
			this.selectedApartment = null;
			this.$root.$emit('showEditForm',null,false);
			this.$root.$emit('showComment',null,false);

			axios
	        .get('rest/users/currentUser')
	        .then(response => (response.data ? this.loggedUser = response.data : this.loggedUser = null,
	        axios
	    	     .get('rest/apartments/all')
	    	     .then(response => (response.data ? this.allApartments = response.data : this.allApartments = null,
	    	        		this.getActiveApartments()))))
			
		},
		
		showInactiveForHost: function(){
			
	        this.searchStartDate='';
		    this.searchEndDate='';
		   	this.searchPriceFrom='';
		   	this.searchPriceTo='';
		   	this.searchLocation='';
		   	this.searchNumberOfRoomsFrom='';
	    	this.searchNumberOfRoomsTo='';
	    	this.searchNumberOfGuests='';
	    	this.$root.$emit('clearSearch','');
	    	
	    	this.isActive=false,
	    	this.isInactive=false,
	    	this.isRoom=false,
	    	this.isWholeAparmtnet=false
	    	
			if(this.showInactive){
				this.showInactive = false;
			}else{
				this.showActive = false;
				this.showInactive = true;
			}
			
			//ako menjamo tabelu,selektovani postaje null i sakrivamo forme za edit i comment
			this.selectedApartment = null;
			this.$root.$emit('showEditForm',null,false);
			this.$root.$emit('showComment',null,false);

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
			},
		openEditForm : function(){
			this.$root.$emit('showComment',null,false);
			this.$root.$emit('showEditForm',this.selectedApartment,true);
			

		},
		showCommentForApartment: function(){
			this.$root.$emit('showEditForm',null,false);
			this.$root.$emit('showComment',this.selectedApartment,true);
				
			
		},
		sort:function(s) {
		    if(s === this.currentSort) {
		      this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
		    }
		    this.currentSort = s;
		    
		    this.activeApartmentsForHost = this.activeApartmentsForHost.sort((a,b) => {
			      let modifier = 1;
			      if(this.currentSortDir === 'desc') modifier = -1;
			      if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
			      if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
			      return 0;
			    });
		  },
		 
		
		filterByPrice: function(a){
			if(this.searchPriceFrom != '')
				return a.pricePerNight >= parseInt(this.searchPriceFrom) && a.pricePerNight<=parseInt(this.searchPriceTo)
			else
				return true
		},
		filterByLocation: function(a){
			if(this.searchLocation != '')
				return a.location.address.city.toLowerCase().includes(this.searchLocation.toLowerCase())
			else
				return true
		},
		filterByRooms: function(a){
			if(this.searchNumberOfRoomsFrom != '' && this.searchNumberOfRoomsTo != '')
				return a.numberOfRooms >= parseInt(this.searchNumberOfRoomsFrom) && a.numberOfRooms<=parseInt(this.searchNumberOfRoomsTo)
			else
				return true
		},
		filterByGuests: function(a){
			if(this.searchNumberOfGuests!= '')
				return a.numberOfGuests === parseInt(this.searchNumberOfGuests)
			else
				return true
		},
		filterByDates: function(a){
				if(this.searchStartDate != '' && this.searchEndDate != '')
					{
			    	   var startYear = this.searchStartDate.getYear() + 1900;
			    	   var startMonth = this.searchStartDate.getMonth();
			    	   var startDay = this.searchStartDate.getDate();
			    	   var startDate = new Date(startYear,startMonth,startDay,0,0,0,0);
			    	   var endYear = this.searchEndDate.getYear() + 1900;
			    	   var endMonth = this.searchEndDate.getMonth();
			    	   var endDay= this.searchEndDate.getDate();
			    	   var endDate = new Date(endYear,endMonth,endDay,0,0,0,0);
			    	   
			    	   while(startDate < endDate){
				    	   let indexOfStartDate = a.availabilityByDates.indexOf(startDate.getTime());
				    	   if(indexOfStartDate == -1){
				    		   return false
				    	   }
						   startDate.setDate(startDate.getDate() + 1);
			    	   }
			    	   return true
  
					}else
						return true
		},
		filterByActiveStatus:function(a){
			if(this.isActive || this.isInactive || this.isRoom || this.isWholeApartment )
			{
				if(this.isActive){
					if(a.statusOfApartment === 'ACTIVE'){
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
		filterByInactiveStatus:function(a){
			if(this.isActive || this.isInactive || this.isRoom || this.isWholeApartment)
			{
				if(this.isInactive){
					if(a.statusOfApartment === 'INACTIVE'){
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
		filterByRoomType:function(a){
			if(this.isRoom || this.isWholeApartment || this.isActive || this.isInactive)
			{
				if(this.isRoom){
					if(a.typeOfApartment === 'ROOM'){
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
		filterByWholeApartmentType:function(a){
			if(this.isRoom || this.isWholeApartment || this.isActive || this.isInactive)
			{
				if(this.isWholeApartment){
					if(a.typeOfApartment === 'WHOLE_APARTMENT'){
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
		showFilters: function(){
			if(this.showFiltersForm){
				this.showFiltersForm = false;
			}else{
				this.showFiltersForm = true;
				axios
		          .get('rest/amenities/all')
		          .then(response => (response.data ? this.allAmenities = response.data : this.allAmenities = null))
		          
			}
		},
		onChange:function(amenitie,event){
			  if (event.target.checked){
				  this.checkedAmenities.push(amenitie.name);
					
			  }else{
				  
				  let i = this.checkedAmenities.indexOf(amenitie.name)
					  this.checkedAmenities.splice(i, 1);

			  }
			
		},
		filterByAmenites:function(amenitiesList){
			if(this.checkedAmenities.length != 0){
				list = []
				for(amenitie of this.checkedAmenities){
					isExist = this.isInAmenitieList(amenitie,amenitiesList)
					list.push(isExist);
				}
				if (list.includes(true)){
					return true
				}else{
					return false
				}
			}else{
				return true
			}

		},
		isInAmenitieList:function(amenitie,amenitiesList){
			for(a of amenitiesList){
				if(a.name == amenitie){
					return true;
				}
			}
			return false
		}

	},
	computed:{
		searchActive(){
			if(this.activeApartmentsForHost)	
				return this.activeApartmentsForHost.filter(a => {
				         return this.filterByLocation(a) && this.filterByPrice(a) && this.filterByRooms(a) && this.filterByGuests(a) && this.filterByDates(a) && this.filterByAmenites(a.amenities) && (this.filterByActiveStatus(a) || this.filterByInactiveStatus(a) || this.filterByRoomType(a) || this.filterByWholeApartmentType(a))})
			},
		
		searchInactive(){
			if(this.inactiveApartmentsForHost)	
				return this.inactiveApartmentsForHost.filter(a => {
				         return this.filterByLocation(a) && this.filterByPrice(a) && this.filterByRooms(a) && this.filterByGuests(a) && this.filterByDates(a) && this.filterByAmenites(a.amenities) && (this.filterByActiveStatus(a) || this.filterByInactiveStatus(a) || this.filterByRoomType(a) || this.filterByWholeApartmentType(a))})
			}
	}
});