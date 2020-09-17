var base64Image = null;
var arrayImageString = [];

var postalCode = {};
var city = {};
var street = {};

var latitude = {}; 
var longitude = {};
Vue.component("editApartment", {
	data: function () {
	    return {
	    	location:null,
	    	streetNumber:"",
			address:{},
			locationOfApartment:{},
	    	selectedApartment:null,
	    	showEditForm:false,
	    	startDate:null,
	    	endDate:null,
	    	allAmenities:null,
	    	viewAmenitiesForm:false,
	    	backup:[],
	    	mode: "NOT_EDIT_YET",
	    	typeOfApartment:'Choose type of apartment',
			  errorTypeOfApartment:"",
			  errorNumberOfRooms:"",
			  errorNumberOfGuests:"",
			  errorLongitude:"",
			  errorLatitude:"",
			  errorStreet:"",
			  errorStreetNumber:"",
			  errorCity:"",
			  errorPostalCode:"",
			  errorDateOfIssue:"",
			  errorPricePerNight:"",
			  errorCheckInTime:"",
			  errorCheckOutTime:"",
			  image:null,
			  productSpect:"",
			  errorNameOfApartment:'',
			  image:null,
			  imagesForApartment:[],
			  imagesForApartmentForConvert:[],
			  errorLocation:"",
			  errorStartDate:"",
			  errorEndDate:"",
			  currentLocation:"",
			  showLocationInput:false
	    }
},
		template: ` 
		<div>
			<div class="row m-t-5">
						<div class="column33-in-form-search-apartment">
							<div class="container-form-input">
									<input v-if="selectedApartment" class="form-input" type="text" placeholder="Name of apartment" v-model="selectedApartment.name" v-bind:disabled="mode=='NOT_EDIT_YET'" style="border-color: black;color: #000;">
									<span class="focus-form-input"></span>
									<p class="form-input-error"><span style="color:gray;">Name of apartment</span> {{errorNameOfApartment}}</p>
							</div>
						</div>
						<div class="column33-in-form-search-apartment">
							<div class="container-form-input">
									<input v-if="selectedApartment" class="form-input" type="number" min="1" onkeydown="javascript: return event.keyCode === 8 || event.keyCode === 46 ? true : !isNaN(Number(event.key))" placeholder="Price per night" v-model="selectedApartment.pricePerNight" v-bind:disabled="mode=='NOT_EDIT_YET'" style="border-color: black;color: #000;">
									<span class="focus-form-input"></span>
									<p class="form-input-error"><span style="color:gray;">Price per night</span> {{errorPricePerNight}}</p>
							</div>
						</div>
						<div class="column33-in-form-search-apartment">
							<div class="container-form-input">
										<select v-if="selectedApartment"class="form-select" v-model="selectedApartment.statusOfApartment" style="color: #000;border-color: black;" v-bind:disabled="mode=='NOT_EDIT_YET'">
									 		<option value="Choose status of apartment" hidden>Choose status of apartment</option>
										    <option value="ACTIVE" style="color:#666666">Active</option>
											<option value="INACTIVE" style="color:#666666">Inactive</option>
									  	</select>
										<p class="form-input-error"><span style="color:grey;">Status of apartment</span> </p>
							</div>
						</div>
					</div>
					
					<div class="row">
						<div class="column50-in-form-search-apartment">
							<div class="container-form-input">
								      	<select v-if="selectedApartment" class="form-select" v-model="selectedApartment.typeOfApartment" style="color: #000;border-color: black;" v-bind:disabled="mode=='NOT_EDIT_YET'" >
										    <option value="Choose gender" hidden>Choose gender</option>
										    <option value="ROOM" style="color:#666666">Room</option>
											<option value="WHOLE_APARTMENT" style="color:#666666">Whole apartment</option>
									  	</select>
										<p class="form-input-error"><span style="color:grey;">Type of apartment</span> {{errorTypeOfApartment}}</p>
							</div>
						</div>
						<div class="column25-in-form-search-apartment">
							<div class="container-form-input">
									<input v-if="selectedApartment" class="form-input" type="number" min="1" onkeydown="javascript: return event.keyCode === 8 || event.keyCode === 46 ? true : !isNaN(Number(event.key))" placeholder="Number of rooms" v-model="selectedApartment.numberOfRooms" v-bind:disabled="mode=='NOT_EDIT_YET'" style="border-color: black;color: #000;">
									<span class="focus-form-input"></span>
									<p class="form-input-error"><span style="color:grey;">Numebr of rooms</span> {{errorNumberOfRooms}}</p>
							</div>
						</div>
						<div class="column25-in-form-search-apartment">
							<div class="container-form-input">
									<input v-if="selectedApartment" class="form-input" type="number" min="1" onkeydown="javascript: return event.keyCode === 8 || event.keyCode === 46 ? true : !isNaN(Number(event.key))" placeholder="Number of guest" v-model="selectedApartment.numberOfGuests" v-bind:disabled="mode=='NOT_EDIT_YET'" style="border-color: black;color: #000;">
									<span class="focus-form-input"></span>
									<p class="form-input-error"><span style="color:grey;">Number of guest</span> {{errorNumberOfGuests}}</p>
							</div>
						</div>
					</div>
					
					<div class="row">
						<div class="column25-in-form-search-apartment">
							<div class="container-form-input">
									<input v-if="selectedApartment" class="form-input" type="text" placeholder="Street number" v-model="selectedApartment.location.address.streetNumber" v-bind:disabled="mode=='NOT_EDIT_YET'" style="border-color: black;color: #000;">
									<span class="focus-form-input"></span>
									<p class="form-input-error"><span style="color:grey;">Street number</span> {{errorStreetNumber}}</p>
							</div>
						</div>
						<div class="column75-in-form-search-apartment" style="text-align:left;">
							<div class="container-form-input">
									<input v-if="selectedApartment && !showLocationInput" class="form-input" type="text" placeholder="Street number" v-model="currentLocation" v-bind:disabled="mode=='NOT_EDIT_YET'" style="border-color: black;color: #000;"  @focusin="inFocusLocation()">
									<input class="form-input-vuejs" type="search" id="address" placeholder="Search street"  style="color: #000;" v-bind:disabled="mode=='NOT_EDIT_YET'"  @focusout="lostFocusLocation()" v-show="showLocationInput">
									<span class="focus-form-input"></span>
									<p class="form-input-error"><span style="color:grey;">Location</span> {{errorLocation}}</p>
							</div>
						</div>
					</div>
					
					
					
					
					<div class="row">
						<div class="column50-in-form-search-apartment" style="padding-top: 0px;">
							<div class="column50-in-form-search-apartment">
								<div class="container-form-input">
										<vuejs-datepicker  input-class="form-input-vuejs" placeholder="Date from" format="dd.MM.yyyy" v-model="startDate" v-bind:disabled="mode=='NOT_EDIT_YET'" style="border-color: black;color: #000;"></vuejs-datepicker>
										<span class="focus-form-input"></span>
										<p class="form-input-error"><span style="color:grey;">Start date</span> {{errorStartDate}}</p>
								</div>	
							</div>	
							<div class="column50-in-form-search-apartment">
								<div class="container-form-input">
										<vuejs-datepicker  input-class="form-input-vuejs" placeholder="Date to" format="dd.MM.yyyy" v-model="endDate" v-bind:disabled="mode=='NOT_EDIT_YET'" style="border-color: black;color: #000;"></vuejs-datepicker>
										<span class="focus-form-input"></span>
										<p class="form-input-error"><span style="color:grey;">End date</span> {{errorEndDate}}</p>
								</div>	
							</div>
						</div>
						<div class="column50-in-form-search-apartment">
							<div class="column50-in-form-search-apartment" style="padding-top:0px;">
								<div class="container-form-input">
										<input v-if="selectedApartment" type="time" class="form-input" format="dd:HH"  v-model="selectedApartment.checkInTime" v-bind:disabled="mode=='NOT_EDIT_YET'" style="border-color: black;color: #000;">
										<span class="focus-form-input"></span>
										<p class="form-input-error"><span style="color:grey;">Check in time</span> {{errorCheckInTime}}</p>
								</div>	
							</div>
							<div class="column50-in-form-search-apartment" style="padding-top:0px;">
								<div class="container-form-input">
										<input v-if="selectedApartment" type="time" class="form-input" format="dd:HH"  v-model="selectedApartment.checkOutTime" v-bind:disabled="mode=='NOT_EDIT_YET'" style="border-color: black;color: #000;">
										<span class="focus-form-input"></span>
										<p class="form-input-error"><span style="color:grey;">Check out time</span> {{errorCheckOutTime}}</p>
								</div>	
							</div>
						</div>	
						
					</div>
					
					
					<div class="row">
						<div class="column25-in-form-search-apartment" style="padding-top:0px;margin-left:25%;">
							<div class="container-btn-form m-t-30">
								<button class="form-btn" type="button" style="background:gray;" v-on:click="checkForm()" v-bind:disabled="(mode=='NOT_EDIT_YET'|| mode=='AMENITIES')" v-show="!(mode=='NOT_EDIT_YET'|| mode=='AMENITIES')">CONFIRM CHANGES</button>
							</div>	
						</div>
						<div class="column25-in-form-search-apartment" style="padding-top:0px;">
							<div class="container-btn-form m-t-30">
								<button type="button" class="form-btn" v-on:click="cancel()"  style="background:gray;" v-bind:disabled="(mode=='NOT_EDIT_YET'|| mode=='AMENITIES')" v-show="!(mode=='NOT_EDIT_YET'|| mode=='AMENITIES')">CANCEL EDIT</button>
							</div>	
						</div>
					</div>
					
					
					
					
					
					
					<div class="row">
						<div class="column50-in-form-search-apartment" style="margin-left:25.5%;">
							<div class="container-btn-form">
								<button type="button" class="form-btn"v-on:click="edit()" v-bind:disabled="(mode=='EDITING' || mode=='AMENITIES')">EDIT APARTMENT</button>
							</div>
						</div>
					</div>
		</div>
		`,
		mounted () {
			
		    document.querySelector('#address').style.visibility = 'hidden'; 	
			
	        this.$root.$on('showEditForm',(text) => {this.loadData(),this.getStartEndDate()});
	        this.loadData()
	        this.allPlaces();
	        
	        
	        
	        
	        
		},

		methods:{
			
			loadData : function(){
				
				axios
	          	 .get('rest/apartments/currentSelectedApartment')
	        		.then(response => (response.data ? this.selectedApartment = response.data : this.selectedApartment = null,this.getStartEndDate()))
	        	
	       
			},
			
			allPlaces : function() {
	            
		
				var placesAutocomplete = places({
				    appId: 'plQ4P1ZY8JUZ',
				    apiKey: 'bc14d56a6d158cbec4cdf98c18aced26',
				    container: this.$el.querySelector('#address'),
				    type: 'address',
				    templates:{
				    	value : function(suggestion){
				    		return suggestion.name;
				    	}
				    }
				  }).configure({
					  type: 'address',
				  });

				
				placesAutocomplete.on('change',function(e){
					//pravljenje adrese i lokacije za apartman
					 postalCode = e.suggestion.postcode || "";
					 city = e.suggestion.city || "";
					 street = e.suggestion.name || "";
					
					latitude = e.suggestion.latlng.lat || ""; 
					longitude = e.suggestion.latlng.lng  || "";
					
				});
				
				
				
			

				
				
				
		},
		inFocusLocation: function(){
			this.showLocationInput = true;
		},
		lostFocusLocation: function(){
			if(street != "" && city != ""){
				this.locationOfApartment.longitude = longitude;
				this.locationOfApartment.latitude = latitude;
				this.address.postalCode = postalCode;
				this.address.city = city;
				this.address.street = street;
				
				this.address.streetNumber = this.streetNumber;
				this.locationOfApartment.address = this.address;
				this.selectedApartment.location = this.locationOfApartment;
				this.currentLocation = street +',' + city;

			}
		
			this.showLocationInput = false;

		},
			
			isInApartmentList:function(amenitie){
				let amenitieExist = this.selectedApartment.amenities.filter(function(a) {
						return a.name == amenitie.name});
				if(amenitieExist.length != 0){
					return true;
				}
				return false;
			},
			onChange:function(amenitie,event){
				  if (event.target.checked){
					  var stringApartment = JSON.stringify(this.selectedApartment);
						 var objApartment = JSON.parse(stringApartment);
						 objApartment['amenities'].push(amenitie);
						
				  }else{
					  var stringApartment = JSON.stringify(this.selectedApartment);
						 var objApartment = JSON.parse(stringApartment);
						 let i = this.selectedApartment.amenities.map(item => item.id).indexOf(amenitie.id)
						 objApartment['amenities'].splice(i, 1);

				  }
				  
				
				 axios
			         .put('rest/apartments/updateApartment',JSON.stringify(objApartment),
			       		  {
		 		        	headers: {
		 		        		'Content-Type': 'application/json;charset=UTF-8',
				        			}
		        	  }).then(response=>{ this.selectedApartment = objApartment,this.$root.$emit('refreshTable','');
})
				
			},
			
			viewAmenities : function(){
				if(this.viewAmenitiesForm){
					this.viewAmenitiesForm = false
					this.mode="NOT_EDIT_YET"
				}else{
					this.mode="AMENITIES"
					this.viewAmenitiesForm = true
					 axios
			          .get('rest/amenities/all')
			          .then(response => (response.data ? this.allAmenities = response.data : this.allAmenities = null))

				}
			},
			
			getStartEndDate : function(){
					if(this.selectedApartment){
						this.currentLocation = this.selectedApartment.location.address.street + "," + this.selectedApartment.location.address.city;
						this.startDate = this.selectedApartment.dateOfIssue[0];
						this.endDate = this.selectedApartment.dateOfIssue[this.selectedApartment.dateOfIssue.length - 1];	
						
					}
				
				

			},
			
			edit: function(){
				this.backup = [];
				this.backup=[this.selectedApartment.typeOfApartment,this.selectedApartment.numberOfRooms,this.selectedApartment.numberOfGuests,
				this.selectedApartment.location.longitude,this.selectedApartment.location.latitude,this.selectedApartment.location.address.street,
			    this.selectedApartment.location.address.streetNumber,this.selectedApartment.location.address.city,this.selectedApartment.location.address.postalCode,
			    this.startDate,this.endDate,this.selectedApartment.pricePerNight,this.selectedApartment.checkInTime,this.selectedApartment.checkOutTime,this.selectedApartment.statusOfApartment,this.selectedApartment.name];
				this.mode = "EDITING";
			},
			
			confirm: function(){
 
				 //update Apartmana
				
				this.mode = "NOT_EDIT_YET";
				 axios
			          .put('rest/apartments/updateApartment',this.selectedApartment)
		            .then(response => (toast('Apartment is successful update')))
			},
			
			cancel: function(){
				 var a = this.$el.querySelector('#address')
				 console.log(a);
				  this.errorTypeOfApartment = "";
				  this.errorNumberOfRooms = "";
				  this.errorNumberOfGuests = "";
				  this.errorStreetNumber = "";
				  this.errorPricePerNight = "";
				  this.errorCheckInTime = "";
				  this.errorCheckOutTime = "";
				  this.errorNameOfApartment = '';
				  this.errorLocation="";
				  this.errorStartDate="";
				  this.errorEndDate="";
		        
				  this.selectedApartment.typeOfApartment = this.backup[0];
				  this.selectedApartment.numberOfRooms = this.backup[1];
				  this.selectedApartment.numberOfGuests = this.backup[2];
				  this.selectedApartment.location.longitude =  this.backup[3];
				  this.selectedApartment.location.latitude =  this.backup[4];
				  this.selectedApartment.location.address.street =  this.backup[5];
				  this.selectedApartment.location.address.streetNumber  = this.backup[6];
				  this.selectedApartment.location.address.city =  this.backup[7];
				  this.selectedApartment.location.address.postalCode =  this.backup[8];
			 	  this.startDate = this.backup[9];
				  this.endDate = this.backup[10];
				  this.selectedApartment.pricePerNight  = this.backup[11];
				  this.selectedApartment.checkInTime  = this.backup[12];
				  this.selectedApartment.checkOutTime  = this.backup[13];
				  this.selectedApartment.statusOfApartment = this.backup[14];
				  this.selectedApartment.name = this.backup[15];
				  this.currentLocation = this.backup[5]; +',' + this.backup[7];
				  this.mode = "NOT_EDIT_YET";
			},
			
			checkForm: function(){
					
				  this.errorTypeOfApartment = "";
				  this.errorNumberOfRooms = "";
				  this.errorNumberOfGuests = "";
				  this.errorStreetNumber = "";
				  this.errorPricePerNight = "";
				  this.errorCheckInTime = "";
				  this.errorCheckOutTime = "";
				  this.errorNameOfApartment = '';
				  this.errorLocation="";
				  this.errorStartDate="";
				  this.errorEndDate="";
				
		
				
				  if(!this.selectedApartment.name){
					this.errorNameOfApartment = "can't be empty"
				}
				  
				  
				if(!this.selectedApartment.typeOfApartment){
					this.errorTypeOfApartment = "can't be empty"
				}
				if(!this.selectedApartment.numberOfRooms){
					this.errorNumberOfRooms = "can't be empty"
				}else if(!this.startWith(this.selectedApartment.numberOfRooms,'0')){
					this.errorNumberOfRooms = "must be > 0";
				}
				
				if(!this.selectedApartment.numberOfGuests){
					this.errorNumberOfGuests = "can't be empty"
				}else if(!this.startWith(this.selectedApartment.numberOfGuests,'0')){
					this.errorNumberOfGuests = "must be > 0";
				}

				if(!this.selectedApartment.location.address.streetNumber){
					this.errorStreetNumber= "can't be empty"
				}
				if(!this.startDate){
					this.errorStartDate = "can't be empty"
				}
				if(!this.endDate){
					this.errorEndDate = "can't be empty"
				}
				
				if(!this.selectedApartment.pricePerNight){
					this.errorPricePerNight = "can't be empty"
						
				}else if(!this.startWith(this.selectedApartment.pricePerNight,'0')){
					this.errorPricePerNight = "must be > 0";
				}
				
				if(!this.selectedApartment.checkInTime){
					this.errorCheckInTime = "can't be empty"
				}
				if(!this.selectedApartment.checkOutTime){
					this.errorCheckOutTime = "can't be empty"
				}
			
			 if( this.errorTypeOfApartment == "" && this.errorNumberOfRooms == "" && this.errorNumberOfGuests == "" && this.errorStartDate == "" && this.errorEndDate == "" && this.errorNameOfApartment == "" && this.errorLocation  == "" && this.errorStreetNumber == ""   && this.errorPricePerNight == "" && this.errorCheckInTime == "" && this.errorCheckOutTime == ""){
					
					if(this.$el.querySelector("#address").value != ''){
						this.locationOfApartment.longitude = longitude;
						this.locationOfApartment.latitude = latitude;
						this.address.postalCode = postalCode;
						this.address.city = city;
						this.address.street = street;
						
						this.address.streetNumber = this.selectedApartment.location.address.streetNumber;
						this.locationOfApartment.address = this.address;
						this.selectedApartment.location = this.locationOfApartment;
						
					}
					this.generateDateOfIssue();
				 //za generisanje lokacije
					
			 }
			
			},
			
			generateDateOfIssue: function(){
				
				if(this.selectedApartment.dateOfIssue[0] != this.startDate ||  this.selectedApartment.dateOfIssue[this.selectedApartment.dateOfIssue.length - 1] != this.endDate){
					this.selectedApartment.dateOfIssue = [];
					this.selectedApartment.availabilityByDates = [];
					
					 var startYear = this.startDate.getYear() + 1900;
					 var startMonth = this.startDate.getMonth();
					 var startDay = this.startDate.getDate();
					 
					 //kako bismo dobili samo datum bez time dela
					 var newStartDate = new Date(startYear,startMonth,startDay,0,0,0,0);
					 
					 var endYear = this.endDate.getYear() + 1900;
					 var endMonth = this.endDate.getMonth();
					 var endDay = this.endDate.getDate();
					 
					 var newEndDate = new Date(endYear,endMonth,endDay,0,0,0,0);
					 
					
					 while( newStartDate <= newEndDate){
						   this.selectedApartment.dateOfIssue.push(new Date(newStartDate));
						   this.selectedApartment.availabilityByDates.push(new Date(newStartDate));
						   newStartDate.setDate(newStartDate.getDate() + 1);
					 }
				
				}
				
				this.confirm();
				
			},
			startWith :function(str, word) {
			    if(str[0] == word){
			    	return false
			    }
			    return true
			}
		
			
					
	 


		},
		components: {
			vuejsDatepicker
		  }
		
});