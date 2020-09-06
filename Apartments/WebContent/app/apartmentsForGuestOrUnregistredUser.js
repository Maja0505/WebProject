/**
 * 
 */
Vue.component("apartmentsForGuestOrUnregistredUser",{
	data : function(){
		return {
			showAllApartments : false,
			allApartments : null,
			currentUser : null,
			activeApartments : [],
			selectedApartment : null,
			allComments : null,
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
	    	isRoom:false,
	    	isWholeApartment:false,
	    	checkedAmenities:[]
		}
	},

	template : `
			<div class="container">
				<h1>APARTMENTS FOR RENT</h1>
				
				<div>
					<searchApartments></searchApartments>
					<button v-on:click="showFilters()" v-if="currentUser" style="margin-top:200px;">Filters</button>
					<div v-show="showFiltersForm">
						
						<p>TYPE OF APARTMENT</p>
						<input type="checkbox" id="withdrawal" name="withdrawal" value="ROOM" v-model="isRoom">
						<label>ROOM</label><br> 
						<input type="checkbox" id="accepted" name="accepted" value="WHOLE_APARTMENT" v-model="isWholeApartment">
						<label>WHOLE_APARTMENT</label><br>
						
						<p>AMENITIES</p>
						<table>
							<tr><td>Name</td><td>Checked</td></tr>
							
							<tr  v-for="a in allAmenities">
								<td><input type="checkbox"  @click="onChange(a,$event)"></td>
								<td>{{a.name}}</td>
							</tr>
						</table>
						
					</div>
					<table border = "1"  class="table table-hover">
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
							<tr v-for="a in searchActive"  v-on:click="selectApartment(a)">
								<td>{{a.id}}</td>
								<td>{{a.location.address.city}}</td>
								<td>{{a.pricePerNight }}</td>
								<td>{{a.host.username }}</td>
								<td>{{a.statusOfApartment}}</td>
							</tr>
						</tbody>
					</table>
					
					<div v-if="selectedApartment">
						<p>Selektovan je apartman sa id {{selectedApartment.id}} 
							<button type="submit" v-if="currentUser" v-on:click="reservation()">Reservation</button>
							<button type="submit" v-on:click="showComments()">Comments of apartment</button>
						</p>
					</div>
					
					<reservation></reservation>
					<commentApartmentForGuestOrUnregistredUser></commentApartmentForGuestOrUnregistredUser>

				</div>
			</div>
	`,
	
	mounted () {
          axios
	         .get('rest/users/currentUser')
	          	.then(response => (response.data ? this.currentUser = response.data : this.currentUser = null))
	      this.$root.$on('loadApartmentForGuest',(text)=>{this.showAllApartments = text, this.selectedApartment = null})
	      this.$root.$on('searchApartmentForGuestOrUnregistredUser',(searchStartDate,searchEndDate,searchPriceFrom,searchPriceTo,searchLocation,searchNumberOfRoomsFrom,searchNumberOfRoomsTo,searchNumberOfGuests)=>
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
          
	      this.$root.$on('refreshCurrentUser',()=>{this.currentUser = null})
	      this.$root.$on('showApartmentsFormForUnregistredUser',()=>{this.showApartments()})
	      this.showApartments();
	},

	
	methods : {
		
		showApartments : function(){
			
			 this.$nextTick(function(){
				 axios    
		          .get('rest/apartments/all')
		          .then(response => (response.data ? this.allApartments = response.data : this.allApartments = null,
		        		  axios
			     	        .get('rest/comments/all')
			     	        .then(response => (response.data ? this.allComments = response.data : this.allComments = null
			     	        	, this.getActiveApartments()	))))
				
			   
			  
				
			 })
				
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
			this.$root.$emit('showReservationPart',{},false);
			this.$root.$emit('showCommentsForGuestOrUnregistrateUser',{},false,[]);
			
		},
		
		reservation : function(){
			this.$root.$emit('showReservationPart',this.selectedApartment,true);
			this.$root.$emit('showCommentsForGuestOrUnregistrateUser',{},false,[]);
		},
		
		showComments : function(){
			this.$root.$emit('showReservationPart',{},false);
			this.$root.$emit('showCommentsForGuestOrUnregistrateUser',this.selectedApartment,true,this.allComments);
		},
		sort:function(s) {
		    if(s === this.currentSort) {
		      this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
		    }
		    this.currentSort = s;
		    
		    this.activeApartments = this.activeApartments.sort((a,b) => {
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
				    	   
				    	   //var numberOfNIght = Math.round((endDate-startDate)/(1000*60*60*24))
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
			filterByRoomType:function(a){
				if(this.isRoom || this.isWholeApartment)
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
				if(this.isRoom || this.isWholeApartment)
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
			if(this.activeApartments)	
				return this.activeApartments.filter(a => {
				         return this.filterByLocation(a) && this.filterByPrice(a) && this.filterByRooms(a) && this.filterByGuests(a) && this.filterByDates(a) && this.filterByAmenites(a.amenities) && (this.filterByRoomType(a) || this.filterByWholeApartmentType(a))})
			}
		}
})