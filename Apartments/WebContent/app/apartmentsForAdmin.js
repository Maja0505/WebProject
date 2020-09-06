/**
 * 
 */
Vue.component("apartmentsForAdmin", {
	
	data: function () {
	    return {
	    	allApartments:null,
	    	allComments:null,
	    	selectedApartment:null,
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
				<searchApartments></searchApartments>
				
				<div class="row" style="margin-top: 225px;">
					<div class="column30-in-apartments-view">
						<div class="container-filters-apartment">
							<button class="btn-filter" v-on:click="showFilters()">Click to show filters</button>
							<div v-show="showFiltersForm" class="container-filters-content">
								 
								<label class="txt4">STATUS OF APARTMENT</label><br>
								<input type="checkbox" id="create" name="create" value="ACTIVE" v-model="isActive">
								<label class="txt5">active</label><br>
								<input type="checkbox" id="rejected" name="rejected" value="INACTIVE" v-model="isInactive" >
								<label class="txt5">inactive</label><br>
								
								<label class="txt4">TYPE OF APARTMENT</label><br>
								<input type="checkbox" id="withdrawal" name="withdrawal" value="ROOM" v-model="isRoom">
								<label class="txt5">room</label><br> 
								<input type="checkbox" id="accepted" name="accepted" value="WHOLE_APARTMENT" v-model="isWholeApartment">
								<label class="txt5">whole apartment</label><br>
								
								<label class="txt4">AMENITIES</label><br>
									<div  v-for="a in allAmenities">
										<input type="checkbox"  @click="onChange(a,$event)">
										<label class="txt5">{{a.name}}</label><br>
									</div>
							</div>
					 	</div>	
					</div>
					<div class="column70-in-apartments-view">
						<div class="row" v-for="a in search">
							<div class="panel panel-default" style="width: 80%;margin-left:5%;" v-if="a!=null && a.flag==0">
								<div class="row">
								 	<div class="container-image-in-search-apartment">
								        <img :src="a.images[0]" style="width: 250px;height:150px;" v-if="a.images[0]">
								 		<img src="images/no_image.jpg" style="width: 250px;height:150px;" v-if="!a.images[0]">
								 	</div>
								 	
								 	<div class="container-infoOfApartment-in-search-apartment">
							 			<h2 style="margin-top:3%;">Naziv apartmana koji mora da se doda</h2>
							 			<div class="row">
											<label class="txt6" style="margin-top:1%;">Location: {{a.location.address.city}}</label><br>
											<label class="txt6" style="margin-top:1%;">Price per night: {{a.pricePerNight}}$</label>
								 			<button class="btn-filter" style="width:20%; margin-top:1%;" v-on:click="viewApartment(a)">View</button>
							 			</div>
								 	</div>
								 </div>
							</div>
						</div>
					</div>	
				</div>
				
				
				
								
				
				
				<div v-if="selectedApartment">
					<p>Selektovan je apartman sa id {{selectedApartment.id}} 
						<button type="submit" v-on:click="moreInfo()">More info</button>
						<button type="submit" v-on:click="deleteApartment()">Delete</button>
						<button type="submit" v-on:click="showComments()">Comments of apartment</button>
					</p>
					
					<editApartment></editApartment>
					<commentForAdmin></commentForAdmin>
				</div>
		</div>
	`,
	
	mounted(){
		  this.$root.$on('searchApartmentForAdmin',(searchStartDate,searchEndDate,searchPriceFrom,searchPriceTo,searchLocation,searchNumberOfRoomsFrom,searchNumberOfRoomsTo,searchNumberOfGuests)=>
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
	        
	     this.$root.$on('apartmentsForAdmin',(text) => {this.showApartments()})    
		 this.showApartments();	
	},
	 
	
	methods : {
		
		viewApartment :  function(apartment){
			
			this.$router.push('/admin/viewApartment/' + apartment.id)
			axios
	    	  .post('rest/apartments/changeSelectedApartment',apartment)
	          	.then(this.$root.$emit('viewApartment',apartment))

		},
		
		deleteApartment : function(){
			this.$root.$emit('showEditForm',{},false);
			this.$root.$emit('showComentForAdmin',{},false,[]);
			
			for(let apartment of this.allApartments){
				if(apartment.id == this.selectedApartment.id){
					apartment.flag = 1;
					break;
				}
			}
			
			this.selectedApartment.flag = 1;
			this.updateApartment(this.selectedApartment);
			this.selectedApartment = null;
		},
		
		showComments : function(){
			this.$root.$emit('showEditForm',{},false);
			this.$root.$emit('showComentForAdmin',this.selectedApartment,true,this.allComments);
		},
		
		moreInfo : function(){
			this.$root.$emit('showEditForm',this.selectedApartment,true);
			this.$root.$emit('showComentForAdmin',{},false,[]);
		},
		
		selectApartment : function(a){
			this.selectedApartment = a;
			this.$root.$emit('showEditForm',{},false);
			this.$root.$emit('showComentForAdmin',{},false,[]);
		},
		
		showApartments : function(){
			this.searchText = '';
			this.commentsForSelectedApartment = [];
				axios
			        .get('rest/apartments/all')
			        .then(response => (response.data ? this.allApartments = response.data : this.allApartments = null,
				   		 axios
			     	        .get('rest/comments/all')
			     	        .then(response => (response.data ? this.allComments = response.data : this.allComments = null))))
		},
		
		updateApartment : function(newApartment){
			axios
	          .put('rest/apartments/updateApartment',newApartment)
		},
		
		sort(){
			if(this.currentSortDir == 'asc'){
				this.currentSortDir = 'desc';
			}else
				this.currentSortDir = 'asc'
			
			if(this.allApartments){
				this.allApartments = this.allApartments.sort((a,b) => {
			      let modifier = 1;
			      if(this.currentSortDir === 'desc') modifier = -1;
			      if(a['pricePerNight'] < b['pricePerNight']) return -1 * modifier;
			      if(a['pricePerNight'] > b['pricePerNight']) return 1 * modifier;
			      return 0;
			    });
				this.searchText = this.searchText;
			}
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
	
	computed : {

		search(){
			
			if(this.allApartments)	
				return this.allApartments.filter(a => {
				         return this.filterByLocation(a) && this.filterByPrice(a) && this.filterByRooms(a) && this.filterByGuests(a) && this.filterByDates(a) && this.filterByAmenites(a.amenities) && (this.filterByActiveStatus(a) || this.filterByInactiveStatus(a) || this.filterByRoomType(a) || this.filterByWholeApartmentType(a))})
	
		}
	}
		
		
	
});