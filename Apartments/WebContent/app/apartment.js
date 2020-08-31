function fixDate(apartments){
	for(var a of apartments){
		for(var date of a.dateOfIssue){
			a.date = new Date(parseInt(date));
		}
	}
	return apartments;
}

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
		  errorDateOfIssue:"",
		  errorPricePerNight:"",
		  errorCheckInTime:"",
		  errorCheckOutTime:"",
		  
	    }
	},
		template: ` 
		<div>
			<p>DODAVANJE APARTMANA</p>
			<table>
				<tr>
					<th>Type of Apartment</th>
					<td><select name="type" id="type"  v-model="apartment.typeOfApartment">
						  <option value="ROOM">ROOM</option>
						  <option value="WHOLE_APARTMENT">WHOLE APARTMENT</option>
						</select>
					</td>
					<td>{{errorTypeOfApartment}}</td>
				</tr>
				<tr>
						<th>Number Of Rooms</th>
					    <td><input type="text"  v-model="apartment.numberOfRooms"/></td>
						<td>{{errorNumberOfRooms}}</td>

				</tr>
				<tr>
						<th>Number Of Guests</th>
						<td><input type="text"  v-model="apartment.numberOfGuests"/></td>
						<td>{{errorNumberOfGuests}}</td>

				</tr>
				<tr>
						<td>Street number</td>
						<td><input type="text" v-model="streetNumber"/></td>
						<td>{{errorStreetNumber}}</td>
						<td>Street name</td>
						<td><input type="search" id="address" class="form-control" placeholder="Search street" style="width: 70rem;"/></td>
						<td>{{errorLocation}}</td>
				</tr>
				<tr>
						<th>Date Of Issue OD:</th>
						<td><vuejs-datepicker format="dd.MM.yyyy" v-model="startDate"></vuejs-datepicker></td>
						<th>Date Of Issue DO:</th>
						<td><vuejs-datepicker  format="dd.MM.yyyy"  v-model="endDate"></vuejs-datepicker></td>
						<td>{{errorDateOfIssue}}</td>

				</tr>
				<tr>
						<th>Price Per Night</th>
						<td><input type="text" v-model="apartment.pricePerNight"/></td>
						<td>{{errorPricePerNight}}</td>

				</tr>
				<tr>
						<th>Check In Time:</th>
						<td><input type="time" format="dd:HH" v-model="apartment.checkInTime"></td>
						<td>{{errorCheckInTime}}</td>

				</tr>
				<tr>
						<th>Check Out Time</th>
						<td><input type="time" format="dd:HH" v-model="apartment.checkOutTime"></td>
						<td>{{errorCheckOutTime}}</td>

					
				</tr>
				<tr>
				<td colspan="3"><button v-on:click="checkForm()">Dodaj</button></td>

				</tr>
				
			</table>
			
			</div>
			
			

		`	
		, mounted () {
			 this.allPlaces();
	         axios
		      .get('rest/users/currentUser')
		      .then(response => (response.data ? this.loggedUser = response.data : this.loggedUser = null))
	    }
		,methods: {
			
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
			update: function(){
			
				
				  objApartment = {"id":''+ this.maxId, "typeOfApartment": this.apartment.typeOfApartment,"numberOfRooms":''+ this.apartment.numberOfRooms,"numberOfGuests":''+ this.apartment.numberOfGuests,"location":this.apartment.location,"dateOfIssue":this.dateOfIssue,"availabilityByDates":this.dateOfIssue,"host":this.loggedUser,"comments": [],"images":[],"pricePerNight":this.apartment.pricePerNight,"checkInTime":''+this.apartment.checkInTime,"checkOutTime":''+this.apartment.checkOutTime,"statusOfApartment":'INACTIVE',"amenities":[],"reservations":[]}
					var stringHost = JSON.stringify(this.loggedUser);
					var objHost = JSON.parse(stringHost);
				
				  objHost['apartmentsForRent'].push(objApartment);
				 
				 //dodajemo u listu svih apartmana
				 axios
			          .post('rest/apartments/addApartment',JSON.stringify(objApartment), 
		        	{
			       		headers: {
			       					'Content-Type': 'application/json',
			    				 }
		        	})
		            .then(response => (toast('Apartment is successful created')))
	            
		         //dodajemo  u apartmentsForRent(atribut od hosta)
			     axios
			      .put('rest/hosts/updateHost',JSON.stringify(objHost),
			    	{
			       		headers: {
			       					'Content-Type': 'application/json',
			    				 }
			    	})
		}
		, checkForm: function(){
			
			  this.errorTypeOfApartment = "";
			  this.errorNumberOfRooms = "";
			  this.errorNumberOfGuests = "";
			  this.errorLocation  = "";
			  this.errorStreetNumber  = "";
			  this.errorDateOfIssue = "";
			  this.errorPricePerNight = "";
			  this.errorCheckInTime = "";
			  this.errorCheckOutTime = "";
			
			if(!this.apartment.typeOfApartment){
				this.errorTypeOfApartment = "can't be empty"
			}
			if(!this.apartment.numberOfRooms){
				this.errorNumberOfRooms = "can't be empty"
			}else if(Number.isInteger(this.apartment.numberOfRooms)){
				this.errorNumberOfRooms = "must be an integer";
			}
			
			if(!this.apartment.numberOfGuests){
				this.errorNumberOfGuests = "can't be empty"
			}else if(Number.isInteger(this.apartment.numberOfGuests)){
				this.errorNumberOfGuests = "must be an integer";
			}
			if(!street){
				this.errorLocation= "can't be empty"
			}
			if(!this.streetNumber){
				this.errorStreetNumber= "can't be empty"
			}
			if(!this.startDate){
				this.errorDateOfIssue = "can't be empty"
			}
			if(!this.endDate){
				this.errorDateOfIssue = "can't be empty"
			}
			if(!this.apartment.pricePerNight){
				this.errorPricePerNight = "can't be empty"
					
			}else if(Number.isInteger(this.apartment.pricePerNight)){
				this.errorPricePerNight = "must be an integer";
			}
			if(!this.apartment.checkInTime){
				this.errorCheckInTime = "can't be empty"
			}
			if(!this.apartment.checkOutTime){
				this.errorCheckOutTime = "can't be empty"
			}
		
		 if( this.errorTypeOfApartment == "" && this.errorNumberOfRooms == "" && this.errorNumberOfGuests == "" && this.errorLocation == "" && this.errorStreetNumber == ""&&    this.errorDateOfIssue == "" && this.errorPricePerNight == "" && this.errorCheckInTime == "" && this.errorCheckOutTime == ""){
			 this.getAllApartments();
		 }
		
		}
	},
	
	components: {
		vuejsDatepicker
	  }
		
});