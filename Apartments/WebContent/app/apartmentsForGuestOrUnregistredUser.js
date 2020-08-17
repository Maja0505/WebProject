/**
 * 
 */
Vue.component("apartmentsForGuestOrUnregistredUser",{
	data : function(){
		return {
			showAllApartments : false,
			allApartments : null,
			currentUser : null,
			activeApartments : null,
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
	    	searchNumberOfGuests:''
		}
	},

	template : `
			<div>
				<button type="submit" v-on:click="showApartments()">Show apartments for reservation</button>
				
				<div v-if="showAllApartments">
					<searchApartments></searchApartments>
					<table border = "1" class="activeApartments">
						<tr bgcolor="lightgrey">
							<th @click="sort('id')">ID</th>
							<th @click="sort('location')">Location</th>
							<th @click="sort('pricePerNight')">Price Per Night</th>
							<th @click="sort('hostName')">Host</th>
							<th @click="sort('status')">Status</th>
						</tr>
						<tr v-for="a in searchActive"  v-on:click="selectApartment(a)">
							<td>{{a.id}}</td>
							<td>{{a.location.address.city}}</td>
							<td>{{a.pricePerNight }}</td>
							<td>{{a.host.username }}</td>
							<td>{{a.statusOfApartment}}</td>
						</tr>
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
	},

	
	methods : {
		
		showApartments : function(){
			if(!this.showAllApartments){
				 axios    
		          .get('rest/apartments/all')
		          .then(response => (response.data ? this.allApartments = response.data : this.allApartments = null,
		        		  axios
			     	        .get('rest/comments/all')
			     	        .then(response => (response.data ? this.allComments = response.data : this.allComments = null,
			     	        		this.getActiveApartments(),this.showAllApartments = true))))
			}else{
				this.showAllApartments = false;
				this.activeApartments = null;
				this.selectedApartment = null;
			}
				
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
			}
		
	},
	computed:{
		searchActive(){
			if(this.activeApartments)	
				return this.activeApartments.filter(a => {
				         return this.filterByLocation(a) && this.filterByPrice(a) && this.filterByRooms(a) && this.filterByGuests(a) && this.filterByDates(a)})
			}
		}
})