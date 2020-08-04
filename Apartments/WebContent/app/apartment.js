function fixDate(apartments){
	for(var a of apartments){
		for(var date of a.dateOfIssue){
			a.date = new Date(parseInt(date));
		}
	}
	return apartments;
}


Vue.component("apartment", {
	data: function () {
	    return {
		  location:{},
		  address:{},
		  apartment:{},
		  allApartments:null,
		  loggedUser:null,
		  id:0,
		  startDate:null,
		  endDate:null,
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

	    }
	},
		template: ` 
		<div>
			<p>DODAVANJE APARTMANA</p>
			<table>
				<tr>
					<th>Type of Apartment</th>
					<td><select name="cars" id="cars"  v-model="apartment.typeOfApartment">
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
						<th>logitude</th>
						<td><input type="text"  v-model="location.longitude"/></td>
						<td>{{errorLongitude}}</td>

				</tr>
				<tr>
					<th>latitude</th>
					<td><input type="text"  v-model="location.latitude"/></td>
					<td>{{errorLatitude}}</td>

				</tr>
				<tr>
					<th>street</th>
					<td><input type="text" v-model="address.street"/></td>
					<td>{{errorStreet}}</td>

				</tr>
				<tr>
					<th>streetNumber</th>
					<td><input type="text" v-model="address.streetNumber"/></td>
					<td>{{errorStreetNumber}}</td>

				</tr>
				<tr>
					<th>city</th>
					<td><input type="text" v-model="address.city"/></td>
					<td>{{errorCity}}</td>

				</tr>
	      		<tr>
					<th>postalCode</th>
					<td><input type="text" v-model="address.postalCode"/></td>
					<td>{{errorPostalCode}}</td>

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
						<th>Check In Time OD:</th>
						<td><input type="time" format="dd:HH" v-model="apartment.checkInTime"></td>
						<td>{{errorCheckInTime}}</td>

				</tr>
				<tr>
						<th>Check Out Time</th>
						<td><input type="time" format="dd:HH" v-model="apartment.checkOutTime"></td>
						<td>{{errorCheckOutTime}}</td>

					
						</script>
				</tr>
				<tr>
				<td colspan="3"><button v-on:click="checkForm()">Dodaj</button></td>

				</tr>
				
			</table>
			
			</div>
			
			

		`	
		, mounted () {
			 axios
	          .get('rest/apartments/all')
	          .then(response => (this.allApartments = response.data,this.allApartments = fixDate(response.data)))
	         axios
		      .get('rest/users/currentUser')
		      .then(response => (response.data ? this.loggedUser = response.data : this.loggedUser = null))
	    }
		,methods: {
			add: function() {
				
				
				//generisanje id-a apartmana
			    if(this.allApartments.length != 0){
					this.id = parseInt(this.allApartments[this.allApartments.length - 1].id) + 1; 

				}else{
							this.id = 1;
				}
			    //moramo napraviti za odabir lokacije(tada ovo brisem)
				this.location.address = this.address;
				this.apartment.location = this.location;

				
				//za generisanje datuma
				 var dateOfIssue = [];
				 while( this.startDate < this.endDate ){
				 
				   this.startDate.setDate(this.startDate.getDate() + 1);
				
				  dateOfIssue.push(new Date(this.startDate));
				 }
				
				
				var objApartment = {"id":''+ this.id, "typeOfApartment": this.apartment.typeOfApartment,"numberOfRooms":''+ this.apartment.numberOfRooms,"numberOfGuests":''+ this.apartment.numberOfGuests,"location":this.apartment.location,"dateOfIssue":dateOfIssue,"availabilityByDates":dateOfIssue,"host":this.loggedUser,"comments": null,"images":null,"pricePerNight":this.apartment.pricePerNight,"checkInTime":''+this.apartment.checkInTime,"checkOutTime":''+this.apartment.checkOutTime,"statusOfApartment":'INACTIVE',"amenities":[],"reservations":[]}
				//var apartmentForRent = JSON.stringify(this.loggedUser.apartmentsForRent)
					
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
			  this.errorLongitude = "";
			  this.errorLatitude = "";
			  this.errorStreet  = "";
			  this.errorStreetNumber = "";
			  this.errorCity = "";
			  this.errorPostalCode = "";
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
			if(!this.location.longitude){
				this.errorLongitude = "can't be empty"
			}
			if(!this.location.latitude){
				this.errorLatitude = "can't be empty"
			}
			
			if(!this.address.street){
				this.errorStreet = "can't be empty"
			}
			
			if(!this.address.streetNumber){
				this.errorStreetNumber = "can't be empty"
			}
			
			if(!this.address.city){
				this.errorCity = "can't be empty"
			}
			if(!this.address.postalCode){
				this.errorPostalCode = "can't be empty"
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
		
		 if( this.errorTypeOfApartment == "" && this.errorNumberOfRooms == "" && this.errorNumberOfGuests == "" && this.errorLongitude == "" && this.errorLatitude == "" && this.errorStreet  == "" && this.errorStreetNumber == "" && this.errorCity == "" && this.errorPostalCode =="" &&    this.errorDateOfIssue == "" && this.errorPricePerNight == "" && this.errorCheckInTime == "" && this.errorCheckOutTime == ""){
			 this.add();
		 }
		
		}
	},
	
	components: {
		vuejsDatepicker
	  }
		
});