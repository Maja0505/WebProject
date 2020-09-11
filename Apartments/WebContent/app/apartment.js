function fixDate(apartments){
	for(var a of apartments){
		for(var date of a.dateOfIssue){
			a.date = new Date(parseInt(date));
		}
	}
	return apartments;
}
var base64Image = null;
var arrayImageString = [];

var postalCode = {};
var city = {};
var street = {};

var latitude = {}; 
var longitude = {};

Vue.component("apartment", {
	data: function () {
	    return {
		  location:null,
		  streetNumber:"",
		  address:{},
		  locationOfApartment:{},
		  typeOfApartment:'Choose type of apartment',
		  apartment:{},
		  allApartments:null,
		  loggedUser:null,
		  maxId:0,
		  startDate:null,
		  endDate:null,
		  dateOfIssue:[],
		  errorTypeOfApartment:"",
		  errorNumberOfRooms:"",
		  errorNumberOfGuests:"",
		  errorLongitude:"",
		  errorLatitude:"",
		  errorStreet:"",
		  errorLocation:"",
		  errorStreetNumber:"",
		  errorCity:"",
		  errorPostalCode:"",
		  errorStartDate:"",
		  errorEndDate:"",
		  errorPricePerNight:"",
		  errorCheckInTime:"",
		  errorCheckOutTime:"",
		  errorNameOfApartment:'',
		  image:null,
		  imagesForApartment:[],
		  imagesForApartmentForConvert:[],
		  sendRequest:false,
		  disableDatesStartDate:{},
		  disableDatesEndDate:{},
		
	    }
	},
		template: ` 
		<div>
			<div id="myOverlay" class="overlay" v-show="sendRequest">
				<div class="loader" ></div>
				<div><label style="margin-top:420px;">Wait a moment..</label></div>
			</div>
			<div class="content-profile">
				<form class="container-profile" style="width:70%;" v-show="!sendRequest">
					<div class="row m-t-50">
						<div class="column75-in-form-search-apartment">
							<div class="container-form-input">
									<input class="form-input" type="text" placeholder="Name of apartment" v-model="apartment.name">
									<span class="focus-form-input"></span>
									<p class="form-input-error">{{errorNameOfApartment}}</p>
							</div>
						</div>
						<div class="column25-in-form-search-apartment">
							<div class="container-form-input">
									<input class="form-input" type="number" min="1" onkeydown="javascript: return event.keyCode === 8 || event.keyCode === 46 ? true : !isNaN(Number(event.key))" placeholder="Price per night" v-model="apartment.pricePerNight">
									<span class="focus-form-input"></span>
									<p class="form-input-error">{{errorPricePerNight}}</p>
							</div>
						</div>
					</div>
					
					<div class="row">
						<div class="column50-in-form-search-apartment">
							<div class="container-form-input">
										<select class="form-select" v-model="typeOfApartment" v-if="typeOfApartment=='Choose type of apartment'" style="color:#bbbbbb">
									 		<option value="Choose type of apartment" hidden>Choose type of apartment</option>
										    <option value="ROOM" style="color:#666666">Room</option>
											<option value="WHOLE_APARTMENT" style="color:#666666">Whole apartment</option>
									  	</select>
								      	<select class="form-select" v-model="typeOfApartment" v-if="typeOfApartment!='Choose type of apartment'"style="color:#666666">
										    <option value="Choose gender" hidden>Choose gender</option>
										    <option value="ROOM" style="color:#666666">Room</option>
											<option value="WHOLE_APARTMENT" style="color:#666666">Whole apartment</option>
									  	</select>
										<p class="form-input-error">{{errorTypeOfApartment}}</p>
							</div>
						</div>
						<div class="column25-in-form-search-apartment">
							<div class="container-form-input">
									<input class="form-input" type="number" min="1" onkeydown="javascript: return event.keyCode === 8 || event.keyCode === 46 ? true : !isNaN(Number(event.key))" placeholder="Number of rooms" v-model="apartment.numberOfRooms">
									<span class="focus-form-input"></span>
									<p class="form-input-error">{{errorNumberOfRooms}}</p>
							</div>
						</div>
						<div class="column25-in-form-search-apartment">
							<div class="container-form-input">
									<input class="form-input" type="number" min="1" onkeydown="javascript: return event.keyCode === 8 || event.keyCode === 46 ? true : !isNaN(Number(event.key))" placeholder="Number of guest" v-model="apartment.numberOfGuests">
									<span class="focus-form-input"></span>
									<p class="form-input-error">{{errorNumberOfGuests}}</p>
							</div>
						</div>
					</div>
					
					<div class="row">
						<div class="column25-in-form-search-apartment">
							<div class="container-form-input">
									<input class="form-input" type="text" placeholder="Street number" v-model="streetNumber">
									<span class="focus-form-input"></span>
									<p class="form-input-error">{{errorStreetNumber}}</p>
							</div>
						</div>
						<div class="column75-in-form-search-apartment" style="text-align:left;">
							<div class="container-form-input">
									<input class="form-input" type="search" id="address" placeholder="Search street">
									<span class="focus-form-input"></span>
									<p class="form-input-error">{{errorLocation}}</p>
							</div>
						</div>
					</div>
					
					<div class="row">
						<div class="column33-in-form-search-apartment">
									<vuejs-datepicker input-class="form-input" @input="genereteDisableDateEndDate" placeholder="Date from" format="dd.MM.yyyy" v-model="startDate" :disabled-dates="disableDatesStartDate"></vuejs-datepicker>
									<span class="focus-form-input"></span>
									<p class="form-input-error">{{errorStartDate}}</p>
						</div>	
						<div class="column33-in-form-search-apartment">
							<div class="container-form-input">
									<vuejs-datepicker input-class="form-input" placeholder="Date to" format="dd.MM.yyyy" v-model="endDate" :disabled-dates="disableDatesEndDate"></vuejs-datepicker>
									<span class="focus-form-input"></span>
									<p class="form-input-error">{{errorEndDate}}</p>
							</div>	
						</div>
						<div class="column33-in-form-search-apartment">
							<div class="column50-in-form-search-apartment" style="padding-top:0px;">
								<div class="container-form-input">
										<input type="time" class="form-input" format="dd:HH"  v-model="apartment.checkInTime">
										<span class="focus-form-input"></span>
										<p class="form-input-error"><span style="color:grey;">Check in time</span> {{errorCheckInTime}}</p>
								</div>	
							</div>
							<div class="column50-in-form-search-apartment" style="padding-top:0px;">
								<div class="container-form-input">
										<input type="time" class="form-input" format="dd:HH"  v-model="apartment.checkOutTime">
										<span class="focus-form-input"></span>
										<p class="form-input-error"><span style="color:grey;">Check out time</span> {{errorCheckOutTime}}</p>
								</div>	
							</div>
						</div>	
						
					</div>
					
					<div class="row">
						<div class="column25-in-form-search-apartment" style="padding-top:0px;margin-left:25%;">
							<div class="container-btn-form m-t-30">
								<label for="image_uploads" class="form-btn" type="button" style="background:gray;">ADD IMAGES</label>
								<input type="file" style="opacity: 0;" @change="addImage" name="image_uploads" id="image_uploads"  accept="image/*" multiple><span class="focus-form-input"></span>
							</div>	
						</div>
						<div class="column25-in-form-search-apartment" style="padding-top:0px;">
							<div class="container-btn-form m-t-30">
								<button type="button" class="form-btn" v-show="imagesForApartment.length>0" style="background:gray;" v-on:click="deleteImage">DELETE LAST IMAGE</button>
							</div>	
						</div>
					</div>
					
					<div class="row" style="height:20%;" v-if="imagesForApartment.length>0">
						<div class="apartment-images" style="margin-left:12.5%;">
							<ul>
								<li v-for="img in imagesForApartment">
									<img :src="img" style="width:200px;height:100px;"></img>
									<span style="visibility:hidden;">relative</span> path : {{img}}
								</li>
							</ul>
						</div>
					</div>
					
					<div class="row">
						<div class="column50-in-form-search-apartment" style="margin-left:25.5%;">
							<div class="container-btn-form">
								<button type="button" class="form-btn" v-on:click="checkForm">ADD APARTMENT</button>
							</div>
						</div>
					</div>
					
				</form>
			</div>
		</div>
			
			

		`	
		, mounted () {
			this.changeBGImage();
			 this.allPlaces();
	         axios
		      .get('rest/users/currentUser')
		      .then(response => (response.data ? this.loggedUser = response.data : this.loggedUser = null))
		      this.generateDisableDatesStartDate() 
	    }
		,methods: {
			
			changeBGImage : function(){
				document.querySelector('body').style.backgroundImage = 'url(' + "images/apartment3.png" + ')';
			},
			
			reloadData : function(){
				this.location = null
				this.streetNumber = ""
				this.$el.querySelector('#address').value = ''
				this.address = {}
				this.locationOfApartment = {}
				this.typeOfApartment = 'Choose type of apartment'
				this.apartment = {}
				this.allApartments = null
				this.maxId = 0
				this.startDate = null
				this.endDate = null
				this.dateOfIssue = []
				this.image = null
				this.imagesForApartment = []
				this.imagesForApartmentForConvert = []

			},
			
			generateDisableDatesStartDate : function(){
				this.disableDatesStartDate = {
						to: new Date(),	
					}
				this.disableDatesEndDate = {
						to: new Date(),	
				}
			},
			
			genereteDisableDateEndDate : function(){
				this.endDate = null;
				 let startYear = this.startDate.getYear() + 1900;
				 let startMonth = this.startDate.getMonth();
				 let startDay = this.startDate.getDate();
				
				this.disableDatesEndDate = {
						to: new Date(),	
						dates : [new Date(startYear,startMonth,startDay)],
						ranges: [
							{
								from: new Date(),
								to: new Date(startYear,startMonth,startDay),
							}
						]
					}
				
				
			},
			
			addImage : function(e){
				
				let images = e.target.files;
				
				for(img of images){
					this.imagesForApartment.push(URL.createObjectURL(img))
					this.imagesForApartmentForConvert.push(img)
				}
				
			},
			
			deleteImage : function(){
				if(this.imagesForApartment.length>0){
					this.imagesForApartment.splice(-1,1);
					this.imagesForApartmentForConvert.splice(-1,1);					
				}
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
			
			getLoggedUser:function(){
				 axios
			      .get('rest/users/currentUser')
			      .then(response => (response.data ? this.loggedUser = response.data : this.loggedUser = null))
			},
			getAllApartments:function(){
				 axios
		          .get('rest/apartments/all')
		          .then(response => (response.data ? this.allApartments = response.data : this.allApartments = null,this.getLoggedUser(),this.add(),this.update()))
			},
			 add: function() {
				
				//generisanje id-a apartmana
				for(res of this.allApartments){
	    			if(parseInt(res.id) > this.maxId){
	    				this.maxId = parseInt(res.id);
	    			}
	    		}
				this.maxId++;
				
				this.convertImagesFromBlobToBase64();
				
				//za generisanje lokacije
				this.locationOfApartment.longitude = longitude;
				this.locationOfApartment.latitude = latitude;
				this.address.postalCode = postalCode;
				this.address.city = city;
				this.address.street = street;
				
				this.address.streetNumber = this.streetNumber;
				this.locationOfApartment.address = this.address;
				this.apartment.location = this.locationOfApartment;

				
				//za generisanje datuma
				 this.dateOfIssue = [];
				
				 var startYear = this.startDate.getYear() + 1900;
				 var startMonth = this.startDate.getMonth();
				 var startDay = this.startDate.getDate();
				 
				 var newStartDate = new Date(startYear,startMonth,startDay,0,0,0,0);
				 
				 var endYear = this.endDate.getYear() + 1900;
				 var endMonth = this.endDate.getMonth();
				 var endDay = this.endDate.getDate();
				 
				 var newEndDate = new Date(endYear,endMonth,endDay,0,0,0,0);
				 
				
				 while( newStartDate <= newEndDate){
				   this.dateOfIssue.push(new Date(newStartDate));
				   newStartDate.setDate(newStartDate.getDate() + 1);
				 }
			
			},
			
			convertImagesFromBlobToBase64 : function(){
				this.apartment.images = [];
				arrayImageString = [];
				var i = 1;
				let promises = [];
				for(image of this.imagesForApartmentForConvert){
					promises.push(new Promise((resolve,reject) => {
						var reader = new FileReader();
						reader.readAsDataURL(image); 
						reader.onloadend =  function() {
							 arrayImageString.push(reader.result);
						 }
					}
					))
					 //stavljanje slike u listu slika od apartmana
					 this.apartment.images.push("images/" + this.maxId + "-" + i++ + ".png");
				}
				return Promise.all(promises)
			},
			
			update: function(){
			
				
				  objApartment = {"id":''+ this.maxId, "name":''+ this.apartment.name,"typeOfApartment": this.apartment.typeOfApartment,"numberOfRooms":''+ this.apartment.numberOfRooms,"numberOfGuests":''+ this.apartment.numberOfGuests,"location":this.apartment.location,"dateOfIssue":this.dateOfIssue,"availabilityByDates":this.dateOfIssue,"host":this.loggedUser,"comments": [],"images":this.apartment.images,"pricePerNight":this.apartment.pricePerNight,"checkInTime":''+this.apartment.checkInTime,"checkOutTime":''+this.apartment.checkOutTime,"statusOfApartment":'INACTIVE',"amenities":[],"reservations":[]}
					var stringHost = JSON.stringify(this.loggedUser);
					var objHost = JSON.parse(stringHost);
				
				  objHost['apartmentsForRent'].push(objApartment);
				 
				 axios
			          .post('rest/apartments/addApartment',JSON.stringify(objApartment), 
		        	{
			       		headers: {
			       					'Content-Type': 'application/json',
			    				 }
		        	})
		            .then(response => {
		            	axios
					      .put('rest/hosts/updateHost',JSON.stringify(objHost),
							    	{
							       		headers: {
							       					'Content-Type': 'application/json',
							    				 }
							    	}).then(response => {
							    		this.sendRequest = true;
										document.getElementById('navigationMenu').style.visibility='hidden';
							    		axios
							 	     		.post('rest/apartments/saveImages/' + this.maxId,JSON.stringify(arrayImageString),
									       		  {
							 		        	headers: {
							 		        		'Content-Type': 'application/json'
									        			}
							 	     	}).then(response => {
							 	     		alert('Success add apartment!');
								    		this.sendRequest = false;
								    		document.getElementById('navigationMenu').style.visibility='visible';
								    		this.reloadData()
							 	     	})
							 	     	})
							 		})
	            
		}
		, checkForm: function(){
			
			  this.apartment.typeOfApartment = this.typeOfApartment;	
			  this.errorTypeOfApartment = "";
			  this.errorNumberOfRooms = "";
			  this.errorNumberOfGuests = "";
			  this.errorLocation  = "";
			  this.errorStreetNumber  = "";
			  this.errorStartDate = "";
			  this.errorEndDate = "";
			  this.errorPricePerNight = "";
			  this.errorCheckInTime = "";
			  this.errorCheckOutTime = "";
			  this.errorNameOfApartment = "";
			
			if(!this.apartment.name){
				this.errorNameOfApartment = "can't be empty"
			}  
			if(this.typeOfApartment == 'Choose type of apartment'){
				this.errorTypeOfApartment = "can't be empty"
			}
			if(!this.apartment.numberOfRooms){
				this.errorNumberOfRooms = "can't be empty"
			}else if(this.apartment.numberOfRooms.startsWith("0")){
				this.errorNumberOfRooms = "must be value bigger then 0";
			}
			
			if(!this.apartment.numberOfGuests){
				this.errorNumberOfGuests = "can't be empty"
			}else if(this.apartment.numberOfGuests.startsWith("0")){
				this.errorNumberOfGuests = "must be value bigger then 0";
			}
			if(!street || this.$el.querySelector("#address").value == ''){
				this.errorLocation= "can't be empty"
			}
			if(!this.streetNumber){
				this.errorStreetNumber= "can't be empty"
			}
			if(!this.startDate){
				this.errorStartDate = "can't be empty"
			}
			if(!this.endDate){
				this.errorEndDate = "can't be empty"
			}
			if(!this.apartment.pricePerNight){
				this.errorPricePerNight = "can't be empty"
					
			}else if(this.apartment.pricePerNight.startsWith("0")){
				this.errorPricePerNight = "must be value bigger then 0";
			}
			if(!this.apartment.checkInTime){
				this.errorCheckInTime = "can't be empty"
			}
			if(!this.apartment.checkOutTime){
				this.errorCheckOutTime = "can't be empty"
			}
		
		 if( this.errorTypeOfApartment == "" && this.errorNumberOfRooms == "" && this.errorNumberOfGuests == "" && this.errorLocation == "" && this.errorStreetNumber == "" &&    this.errorEndDate == "" && this.errorStartDate == "" && this.errorPricePerNight == "" && this.errorCheckInTime == "" && this.errorCheckOutTime == ""){
			 this.getAllApartments();
		 }
		
		}
	},
	
	components: {
		vuejsDatepicker
	  }
		
});