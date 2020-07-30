Vue.component("apartment", {
	data: function () {
	    return {
		  location:{},
		  address:{},
		  apartment:{},
		  allApartments:null,
		  loggedUser:null,
		  length:0,
		  hostApartment:{}
		  
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
				</tr>
				<tr>
						<th>Number Of Rooms</th>
					    <td><input type="text"  v-model="apartment.numberOfRooms"/></td>
	
				</tr>
				<tr>
							<th>Number Of Guests</th>
							<td><input type="text"  v-model="apartment.numberOfGuests"/></td>
				</tr>
				<tr>
					<th>logitude</th>
					<td><input type="text"  v-model="location.longitude"/></td>
				</tr>
				<tr>
					<th>latitude</th>
					<td><input type="text"  v-model="location.latitude"/></td>
				</tr>
				<tr>
					<th>street</th>
					<td><input type="text" v-model="address.street"/></td>
				</tr>
				<tr>
					<th>streetNumber</th>
					<td><input type="text" v-model="address.streetNumber"/></td>
				</tr>
				<tr>
					<th>city</th>
					<td><input type="text" v-model="address.city"/></td>
				</tr>
	      		<tr>
					<th>postalCode</th>
					<td><input type="text" v-model="address.postalCode"/></td>
				</tr>
				
				<tr>
						<th>Date Of Issue</th>
						<td><input type="text" v-model="apartment.dateOfIssue"/></td>
				</tr>
				<tr>
						<th>Price Per Night</th>
						<td><input type="text" v-model="apartment.pricePerNight"/></td>
				</tr>
				<tr>
						<th>Check In Time</th>
						<td><input type="text" v-model="apartment.checkInTime"/></td>
				</tr>
				<tr>
						<th>Check Out Time</th>
						<td><input type="text" v-model="apartment.checkOutTime"/></td>
				</tr>
				
				<tr>
			                <td><button v-on:click="add()">Dodaj</button></td>
			    </tr>
				
			</table>
			

		</div>
		`	
		, mounted () {
			 axios
	          .get('rest/apartments/all')
	          .then(response => (this.allApartments = response.data))
	          axios
		          .get('rest/users/currentUser')
		          .then(response => (response.data ? this.loggedUser = response.data : this.loggedUser = null))
	    }
		,methods: {
			add: function() {
				if(this.allApartments){
					this.length = this.allApartments[this.allApartments.length - 1].id + 1; 
				}else{
							this.length = 1;
					  }
				this.location.address = this.address;
				this.apartment.location = this.location;
				this.hostApartment.host = this.loggedUser;
				this.hostApartment.apartment = {"id":this.length + 1, "typeOfApartment": this.apartment.typeOfApartment,"numberOfRooms":''+ this.apartment.numberOfRooms,"numberOfGuests":''+ this.apartment.numberOfGuests,"location":this.apartment.location,"dateOfIssue":null,"availabilityByDates":null,"host":this.loggedUser,"comments": null,"images":null,"pricePerNight":this.apartment.pricePerNight,"checkInTime":null,"checkOutTime":null,"statusOfApartment":'INACTIVE',"amenities":null,"reservations":null};

				console.log(this.apartment);
				 axios
		          .post('rest/apartments/addApartment', 
		        	JSON.stringify({"id":this.length + 1, "typeOfApartment": this.apartment.typeOfApartment,"numberOfRooms":''+ this.apartment.numberOfRooms,"numberOfGuests":''+ this.apartment.numberOfGuests,"location":this.apartment.location,"dateOfIssue":null,"availabilityByDates":null,"host":this.loggedUser,"comments": null,"images":null,"pricePerNight":this.apartment.pricePerNight,"checkInTime":null,"checkOutTime":null,"statusOfApartment":'INACTIVE',"amenities":null,"reservations":null}), {
 			        headers: {
			            'Content-Type': 'application/json',
			        }
			    })
		          .then(response => (toast('Aparmtent ' + this.apartment + ' successed create!')))
	            
		          
			         axios
			          .post('rest/hosts/addApartmentToHost', this.hostApartment,
			            {
	 			        headers: {
				            'Content-Type': 'application/json',
				        }
				    })
			          .then(response => (toast('Aparmtent ' + this.apartment + ' successed add to host!')))  
			          
				}
			}
	        
		

			
		
});