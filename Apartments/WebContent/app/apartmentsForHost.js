Vue.component("apartmentsForHost", {
	
	data: function () {
	    return {
	    	showActive:true,
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
	    	checkedAmenities:[],
	    	sorting:''
	    }
	},
	
	template: `
<div>
	<div>
		<div v-if="showActive">
			<searchApartments ></searchApartments>
			<div class="row" style="margin-top: 225px;">
				<div class="column30-in-apartments-view">
					<div class="column30-in-apartments-view">
						<div class="container-filters-apartment" style="height:47%;">
							<label class="txt4" style="margin-top:5%;font-size:22px;text-align:center;letter-spacing: 3px;">FILTERS</label><br><br>
							<div class="container-filters-content">
								<label class="txt4">TYPE OF APARTMENT</label><br>
								<input type="checkbox" id="withdrawal" name="withdrawal" value="ROOM" v-model="isRoom">
								<label class="txt5">room</label><br> 
								<input type="checkbox" id="accepted" name="accepted" value="WHOLE_APARTMENT" v-model="isWholeApartment">
								<label class="txt5">whole apartment</label><br>
								<label class="txt4">AMENITIES</label><br>
								<div  v-for="a in allAmenities" v-if="a.flag==0">
									<input type="checkbox"  @click="onChange(a,$event)">
									<label class="txt5">{{a.name}}</label><br>
								</div>
							</div>
					 	</div>
					</div>
					<div class="container-filters-apartment" style="margin-top: 390px;height:10%;background:none;">
						<button v-on:click="showInactiveForHost()" class="profile-form-btn" type="button">Show INACTIVE apartments</button>
					</div>
				</div>
				<div class="column70-in-apartments-view">
					<h1>Active apartments</h1>
						<div class="row">
							<div class="container-btn-form" style="width:24%;margin-left:60%">
								<button v-if="searchActive.length != 0" class="form-btn" type="button" v-on:click="sort">SORT BY PRICE
									<span style="visibility:hidden">j</span>
									<img src="images/down.png" class="icon" v-show="sorting=='asc'"></img>
									<img src="images/up-arrow.png" class="icon" v-show="sorting=='desc'"></img>								
								</button>
							</div>
						</div>
						<div class="row" v-for="a in searchActive" v-if="a.flag==0" style="margin-top:2%;">
							<div class="panel panel-default" style="width: 80%;margin-left:5%;" v-if="a!=null && a.flag==0">
								<div class="row">
								 	<div class="container-image-in-search-apartment">
								        <img :src="a.images[0]" style="width: 250px;height:150px;" v-if="a.images[0]">
								 		<img src="images/no_image.jpg" style="width: 250px;height:150px;" v-if="!a.images[0]">
								 	</div>
								 	<div class="container-infoOfApartment-in-search-apartment">
							 			<h2 style="margin-top:3%;">{{a.name}}</h2>
							 			<div class="row">
											<label class="txt6" style="margin-top:1%;">Location: {{a.location.address.city}}</label><br>
											<label class="txt6" style="margin-top:1%;">Price per night: {{a.pricePerNight}}$</label>
								 			<button class="btn-filter" style="width:20%; margin-top:1%;" v-on:click="viewApartment(a)" type="button">View</button>
							 			</div>
								 	</div>
								 </div>
							</div>
						</div>
						<div v-if="searchActive.length == 0" class="row">
							<div class="panel panel-default" style="width: 80%;margin-left:5%;margin-top:3%;">
								<h2>Apartments don't exist</h2>
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
				<commentApartmentForHost></commentApartmentForHost>
			</div>
		</div>
		
		<div v-if="showInactive">
			<div class="content-profile" style="background-image: url('images/sea.png');">
				<form class="container-amenities">
					<div class="row" style="padding-left:5%;padding-right:5%;padding-bottom:5%;">
						<div class="column">
							<h1 style="width:100%;">Inactive apartments</h1>
						</div>
						<div class="column">
							 <button type="button" v-on:click="showActiveForHost()" style="width:50%;float:left;margin-left:28%;" class="addBtn">Show active apartments</button>
						</div>
					</div>
					<div class="row" v-for="a in searchInactive" >
						<div class="panel panel-default" style="width: 80%;margin-left:5%;" v-if="a!=null && a.flag==0">
							<div class="row">
								<div class="container-image-in-search-apartment">
									<img :src="a.images[0]" style="width: 250px;height:150px;" v-if="a.images[0]">
									<img src="images/no_image.jpg" style="width: 250px;height:150px;" v-if="!a.images[0]">
								</div>
								<div class="container-infoOfApartment-in-search-apartment">
									 <h2 style="margin-top:3%;">{{a.name}}</h2>
									 <div class="row">
										<label class="txt6" style="margin-top:1%;">Location: {{a.location.address.city}}</label><br>
										<label class="txt6" style="margin-top:1%;">Price per night: {{a.pricePerNight}}$</label>
										<button class="btn-filter" style="width:20%; margin-top:1%;" type="button" v-on:click="viewApartment(a)">View</button>
									 </div>
								</div>
							</div>
						</div>
					</div>
					<div v-if="searchInactive.length == 0" class="row">
						<div class="panel panel-default" style="width: 80%;margin-left:5%;margin-top:3%;">
							<h2>INACTIVE Apartemnt doesn't exist</h2>
						</div>
					</div>		
				</form>
			 </div>
			 <div v-if="selectedApartment">
				<p>Selektovan je apartman sa id {{selectedApartment.id}} 
				<button type="submit" v-on:click="moreInfo()">More info</button>
				<button type="submit" v-on:click="deleteApartment()">Delete</button>
				<button type="submit" v-on:click="showComments()">Comments of apartment</button>
				</p>
				<editApartment></editApartment>
				<commentApartmentForHost></commentApartmentForHost>
			</div>
		</div>
	</div>
</div>

 
	`	
		,
		
	mounted(){
			this.changeBGImage();
			
			axios
	          .get('rest/amenities/all')
	          .then(response => (response.data ? this.allAmenities = response.data : this.allAmenities = null))

			
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
	        this.showActiveForHost();


		        
			}, 
	methods:{
		
		check : function(){
			if(!this.loggedUser){
				this.$router.push('/login');
			}else if(this.loggedUser.typeOfUser != 'HOST'){
				this.$router.push('/403');
			}
								
		},
		
		viewApartment :  function(apartment){
			axios
	    	  .post('rest/apartments/changeSelectedApartment',apartment)
	          	.then((response)=>{this.$root.$emit('viewApartment',apartment),this.$router.push('/viewApartment/' + apartment.id)})

		},
		
		changeBGImage : function(){
			document.querySelector('body').style.backgroundImage = 'url(' + "images/sea.png" + ')';
		},
		
		deleteApartment : function(){
			this.$root.$emit('showEditForm',{},false);
			this.$root.$emit('showComent',{},false);
			
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
		
		updateApartment : function(newApartment){
			axios
	          .put('rest/apartments/updateApartment',newApartment)
		},
		
		selectApartment : function(apartment){
			this.selectedApartment = apartment;
			//ako ponovo selektujemo da nam se zatvore sve forme
			this.$root.$emit('showEditForm',null,false);
			this.$root.$emit('showComment',null,false);


		},
		showActiveForHost: function(){
			this.showActive = true;	
			this.showInactive = false;
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
	    	
			
			//ako menjamo tabelu,selektovani postaje null i sakrivamo forme za edit i comment
			this.selectedApartment = null;
			this.$root.$emit('showEditForm',null,false);
			this.$root.$emit('showComment',null,false);

			axios
	        .get('rest/users/currentUser')
	        .then(response => (response.data ? this.loggedUser = response.data : this.loggedUser = null,this.check(),
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
	    	

				this.showActive = false;
				this.showInactive = true;

			
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
		    	if(apartment.host.username == this.loggedUser.username ){
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
		sort:function() {
			if(this.currentSortDir == 'asc'){
				this.currentSortDir = 'desc';
				this.sorting = 'asc';
			}else{
				this.currentSortDir = 'asc'
				this.sorting = 'desc';		
			}
			
			if(this.activeApartmentsForHost){
				this.activeApartmentsForHost = this.activeApartmentsForHost.sort((a,b) => {
			      let modifier = 1;
			      if(this.currentSortDir === 'desc') modifier = -1;
			      if(a['pricePerNight'] < b['pricePerNight']) return -1 * modifier;
			      if(a['pricePerNight'] > b['pricePerNight']) return 1 * modifier;
			      return 0;
			    });
			}
		  },
		 
		
		filterByPrice: function(a){
			if(this.searchPriceFrom != '' && this.searchPriceTo != '')
				return a.pricePerNight >= parseInt(this.searchPriceFrom) && a.pricePerNight<=parseInt(this.searchPriceTo)
			else if(this.searchPriceFrom != '' && this.searchPriceTo == '')
				return  a.pricePerNight >= parseInt(this.searchPriceFrom)
			else if(this.searchPriceFrom == '' && this.searchPriceTo != '')
				return a.pricePerNight<=parseInt(this.searchPriceTo)
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
			else if(this.searchNumberOfRoomsFrom != '' && this.searchNumberOfRoomsTo == '')
				return a.numberOfRooms >= parseInt(this.searchNumberOfRoomsFrom)
			else if(this.searchNumberOfRoomsFrom == '' && this.searchNumberOfRoomsTo != '')
				return a.numberOfRooms<=parseInt(this.searchNumberOfRoomsTo)
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
		filterByFlag:function(a){
			if(a.flag == '0')
			{
				return true
			}
			return false
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
			
				return this.activeApartmentsForHost.filter(a => {
				         return this.filterByFlag(a) && this.filterByLocation(a) && this.filterByPrice(a) && this.filterByRooms(a) && this.filterByGuests(a) && this.filterByDates(a) && this.filterByAmenites(a.amenities) && (this.filterByActiveStatus(a) || this.filterByInactiveStatus(a) || this.filterByRoomType(a) || this.filterByWholeApartmentType(a))})
			},
		
		searchInactive(){
			
				return this.inactiveApartmentsForHost.filter(a => {
				         return this.filterByFlag(a) && this.filterByLocation(a) && this.filterByPrice(a) && this.filterByRooms(a) && this.filterByGuests(a) && this.filterByDates(a) && this.filterByAmenites(a.amenities) && (this.filterByActiveStatus(a) || this.filterByInactiveStatus(a) || this.filterByRoomType(a) || this.filterByWholeApartmentType(a))})
			}
	}
});