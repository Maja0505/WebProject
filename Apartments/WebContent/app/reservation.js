/**
 * 
 */
Vue.component("reservation", {
	data: function () {
	    return {
	      showAllApartments: false,
	      showReservationButton:false,
		  allApartments: null,
		  allReservations: null,
		  loggedUser:null,
		  isBook:false,
		  bookingInfo:false,
		  selectedApartment: null,
		  maxId:0,
		  reservation:{},
		  apartmentForGuest:{}
	    }
	},
	
	template: `
	
			<div>
			
					<div v-if="showAllApartments">
							<table border = "1" class="allApartments">
								<tr bgcolor="lightgrey">
									<th>Location</th>
									<th>Price Per Night</th>
									<th>Host</th>
								</tr>
								
								<tr v-for="a in allApartments"  v-on:click="selectApartment(a)">
									<td>{{a.location.address.city}}</td>
									<td>{{a.pricePerNight }}</td>
									<td>{{a.host.username }}</td>
								</tr>
								
							</table>

							<p>Click on apartment from table to create a reservation</p>
								
							<button type="submit" v-if="showReservationButton" v-on:click="showBookingInfo()" >Resevation</button>

							<div v-if="bookingInfo">
						   		<p>Izabrali ste <b>{{selectedApartment.id}}</b> apartman na lokacijom <b>{{selectedApartment.location.address.city}}</b> , cena
						   		po noci je <b>{{selectedApartment.pricePerNight}}</b> i domacin je
						   		 <b>{{selectedApartment.host.username }}</b></p>
						   		<table>	
						   			<tr>
						   				<td>Datum pocetka rezervacije: </td>
						   				<td><vuejs-datepicker v-model="reservation.startDateOfReservation" format="dd.MM.yyyy"></vuejs-datepicker></td>
						   			</tr>
						   			<tr>
						   				<td>Broj nocenja: </td>
						   				<td><input type="number" value = "1" v-on:keydown = "stopKeydown" v-model="reservation.numberOfNIghts" min="1" max="15"></td>
						   			</td>
						   			<tr>
						   				<td>Poruka namenjena domacinu: </td>
						   				<td><input type="text" v-model="reservation.reservationMessage"></td>
						   			</tr>
						   			<tr>
						   				<td>Ukupna cena rezervacije: </td>
						   				<td>{{reservation.numberOfNIghts * selectedApartment.pricePerNight}}</td>
						   			</tr>
						   		</table>
								<button type="submit"  v-on:click="bookingApartment()">Booking apartment</button>
				       		</div>
				   </div>
				   <p>{{this.loggedUser}}</p>
			</div>
		
		`,
		mounted () {
			 axios
		          .get('rest/apartments/all')
		          .then(response => (response.data ? this.allApartments = response.data : this.allApartments = null))

	          axios
		          .get('rest/users/currentUser')
		          .then(response => (response.data ? this.loggedUser = response.data : this.loggedUser = null))
		       
		      axios
		          .get('rest/reservations/all')
		          .then(response =>  (response.data ? this.allReservations = response.data : this.allReservations = null))
		      
		      this.$root.$on('showApartments',(text)=>{this.showApartments()});     
	    },
	
		methods: {
			showApartments : function() {
	    		if(this.showAllApartments)	
	    			this.showAllApartments = false;
	    		else
	    			this.showAllApartments = true;
		    		this.showReservationButton = false;
		    		this.bookingInfo = false;
	    	},
	    	
	    	selectApartment : function(apartment) {
    			this.selectedApartment = apartment;
    			this.showReservationButton = true;
	    	},
	    	
	    	stopKeydown : function(event){
	    		 event.preventDefault();
	    	},
	    	
	    	showBookingInfo : function(){
	    		this.bookingInfo = true;
	    	},
	    	
	    	bookingApartment: function(){
	    		
	    		if(this.allReservations.length != 0){
					this.maxId = parseInt(this.allReservations[this.allReservations.length - 1].id) + 1;
				}else{
					this.maxId = 1;
					  }
	    		
	    	   var objReservation = {"id":this.maxId, "apartment": this.selectedApartment,"startDateOfReservation":this.reservation.startDateOfReservation,
	    		   "numberOfNights":this.reservation.numberOfNIghts,"fullPrice":this.reservation.numberOfNIghts * this.selectedApartment.pricePerNight,
	    		   "reservationMessage":''+this.reservation.reservationMessage,"guest":this.loggedUser,"statusOfReservation":"CREATED"};
	    	   
	    	   var stringGuest = JSON.stringify(this.loggedUser);
	    	   var stringApartment = JSON.stringify(this.selectedApartment);
	    	   
	    	   var objGuest = JSON.parse(stringGuest);
	    	   var objApartment = JSON.parse(stringApartment);
	    	   
	    	   objGuest['reservations'].push(objReservation);
	    	   objApartment['reservations'].push(objReservation);
	    	   	   
	    	   
	    	  //dodavanje rezervacije
	    	   axios
		          .post('rest/reservations/addReservation',JSON.stringify(objReservation),
		        		  {
	 			        	headers: {
	 			        		'Content-Type': 'application/json',
	 			        			}
		        	  })
	    	   //upadte apartmana
		       axios
		       	   .put('rest/apartments/updateApartment',JSON.stringify(objApartment),
		       			{
			        	headers: {
			        		'Content-Type': 'application/json',
			        			}
	        		  })
		       //upadte guesta		  
		       axios
		       	   .put('rest/guests/updateGuest', JSON.stringify(objGuest),
		       			   {
			        	headers: {
 			        		'Content-Type': 'application/json',
 			        			}
	        		  })			  
	    	  }
	
		},
		
		components: {
			vuejsDatepicker
		  }


});