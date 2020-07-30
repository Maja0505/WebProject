/**
 * 
 */
Vue.component("guest", {
	data: function () {
	    return {
		  allApartments: null,
		  allReservations: null,
		  loggedUser:null,
		  selectedApartment: {},
		  maxId:0,
		  reservationForApartment:{},
		  reservationForGuest:{},
		  apartmentForGuest:{},
	    }
},
		template: ` 
				<div>
		<p>Apartmani</p>
		<table class="allApartments">
			<tr bgcolor="lightgrey">
				<th>Location</th>
				<th>Price Per Night</th>
				<th>Host</th>
			</tr>
			
			<tr v-for="a in allApartments"  v-on:click="selectApartment(a)" v-bind:class="{selected : selectedApartment.id===a.id}">
				<td>{{a.location.address.city}}</td>
				<td>{{a.pricePerNight }}</td>
				<td>{{a.host.username }}</td>
			</tr>
		</table>
		
		
		<button v-on:click="bookApartment()" v-bind:disabled="selectedApartment == null">Rezervisi</button><br/>

		<p>CAO JA SAM GUEST</p>
		<p v-if = "selectedApartment">{{selectedApartment.id}}</p>
		</div>
		`
			, mounted () {
			 axios
	          .get('rest/apartments/all')
	          .then(response => (this.allApartments = response.data))
	          

	          axios
		          .get('rest/users/currentUser')
		          .then(response => (response.data ? this.loggedUser = response.data : this.loggedUser = null))
		       axios
		          .get('rest/reservations/all')
		          .then(response =>  (this.allReservations = response.data))
	    },	
	    	methods: {
	    	selectApartment : function(apartment) {
	    		
	    			this.selectedApartment = apartment;
	    		  
	    	}
		   , 
		   bookApartment : function() {
			   if(this.allReservations){
					this.maxId = this.allReservations[this.allReservations.length - 1].id + 1; 
				}else{
							this.maxId = 1;
					  }
			   this.reservationForApartment.apartment = this.selectedApartment;
			   this.reservationForApartment.reservation = {"id": '' + this.maxId, "apartment": this.selectedApartment,"startDateOfReservation":null,"numberOfNights":10,"fullPrice":100,"reservationMessage":'EEEJ',"guest":this.loggedUser};
			   this.reservationForGuest.guest = this.loggedUser;
			   this.reservationForGuest.reservation =  {"id": '' + this.maxId, "apartment": this.selectedApartment,"startDateOfReservation":null,"numberOfNights":10,"fullPrice":100,"reservationMessage":'EEEJ',"guest":this.loggedUser};
			   this.apartmentForGuest.guest = this.loggedUser;
			   this.apartmentForGuest.apartment = this.selectedApartment
			   axios
		          .post('rest/reservations/addReservation',
		        		  JSON.stringify({"id":''+ this.maxId, "apartment": this.selectedApartment,"startDateOfReservation":null,"numberOfNights":10,"fullPrice":100,"reservationMessage":'EEEJ',"guest":this.loggedUser}), {
	 			        headers: {
				            'Content-Type': 'application/json',
				        }
				    })
		          .then()
		       axios
		       	   .post('rest/apartments/addReservationToApartment',this.reservationForApartment,
		       			   {
		       			 headers: {
					            'Content-Type': 'application/json',
					        }
		       			  })
		       	   .then()
		       axios
		       	   .post('rest/guests/addReservationToGuest',this.reservationForGuest,
		       			   {
		       			 headers: {
					            'Content-Type': 'application/json',
					        }
		       			  })
		       	   .then()
		       axios
		       	   .post('rest/guests/addApartmentToGuest', this.apartmentForGuest,
		       			   {
		       			 headers: {
					            'Content-Type': 'application/json',
					        }
		       			  })
		       	   .then()
		  
		    }
	    
	    	
	    }
});