/**
 * 
 */
Vue.component("reservation", {
	data: function () {
	    return {
		  allReservations: null,
		  loggedUser:null,
		  selectedApartment: null,
		  maxId:-1,
		  disableDates:{},
		  reservation:{},
		  showReservationForm : false,
		  error: ''
	    }
	},
	
	template: `
	
			<div>
					<div v-if="showReservationForm">
				   		<p>Izabrali ste <b>{{selectedApartment.id}}</b> apartman na lokacijom <b>{{selectedApartment.location.address.city}}</b> , cena
				   		po noci je <b>{{selectedApartment.pricePerNight}}</b> i domacin je
				   		 <b>{{selectedApartment.host.username }}</b></p>
				   		<table>	
				   			<tr>
				   				<td>Datum pocetka rezervacije: </td>
				   				<td><vuejs-datepicker v-model="reservation.startDateOfReservation"  format="dd.MM.yyyy"  :disabled-dates="disableDates"></vuejs-datepicker></td>
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
				   		<p>{{error}}</p>
						<button type="submit"  v-on:click="bookingApartment()">Booking apartment</button>
		       		</div>
			</div>
		
		`,
		mounted () {
		
			axios
				.get('rest/users/currentUser')
	         	.then(response => (response.data ? this.loggedUser = response.data : this.loggedUser = null))

		      axios
		          .get('rest/reservations/all')
		          .then(response =>  (response.data ? this.allReservations = response.data : this.allReservations = null))
		      

			  this.$root.$on('showReservationPart',(text1,text2)=>{this.selectedApartment = text1,
				  this.showReservationForm = text2,this.reservation = {},this.generateDisableDates(),this.findMaxId()});
			  
	    },
	
		methods: {
	    	
			findMaxId : function(){
				for(res of this.allReservations){
	    			if(parseInt(res.id) > this.maxId){
	    				this.maxId = parseInt(res.id);
	    			}
	    		}
			},
			
			generateDisableDates : function(){
				
				this.disableDates = {
					to: new Date(),	
					from :	new Date(this.selectedApartment.dateOfIssue[this.selectedApartment.dateOfIssue.length - 1]),
					dates: this.getDisableDates(),
					ranges: [
						{
							from: new Date(),
							to: new Date(this.selectedApartment.dateOfIssue[0]),
						}
					]
				}
				
			},
			
			getDisableDates : function(){
				let disableDates = [];
				for(let d of this.selectedApartment.dateOfIssue){
					if(this.selectedApartment.availabilityByDates.indexOf(d) == -1){
						disableDates.push(new Date(d));
					}
				}
				return disableDates;
			},
			
	    	stopKeydown : function(event){
	    		 event.preventDefault();
	    	},
	    	
	    	bookingApartment: function(){
	    		
	    		this.maxId++;
	    		
	    	/*	if(this.allReservations.length != 0){
					this.maxId = parseInt(this.allReservations[this.allReservations.length - 1].id) + 1;
				}else{
					this.maxId = 1;
					  }*/
	    	     
	    	   var objReservation = {"id":this.maxId, "apartment": this.selectedApartment,"startDateOfReservation":this.reservation.startDateOfReservation,
	    		   "numberOfNights":this.reservation.numberOfNIghts,"fullPrice":this.reservation.numberOfNIghts * this.selectedApartment.pricePerNight,
	    		   "reservationMessage":''+this.reservation.reservationMessage,"guest":this.loggedUser,"statusOfReservation":"CREATED"};
	    	   
	    	   var selectedDate = this.reservation.startDateOfReservation;
	    	   var yyyy = selectedDate.getYear() + 1900;
	    	   var mm = selectedDate.getMonth();
	    	   var dd = selectedDate.getDate();
	    	   
	    	   var selectedDateNew = new Date(yyyy,mm,dd,0,0,0,0);
	    	  
	    	   var reservationOk = true;
	    	   
	    	   for(let i = 0;i < this.reservation.numberOfNIghts;i++){
	    		   selectedDateNew.setDate(selectedDateNew.getDate() + i);
	    		   var a = selectedDateNew.getTime();
	    		   let index = this.selectedApartment.availabilityByDates.indexOf(a);
	    		   if(index == -1){
	    			   reservationOk = false;
	    			   break;
	    		   }
	    	   }
	    	   
	    	   if(!reservationOk){
	    		   this.error = 'Can not do reservation for ' + this.reservation.numberOfNIghts + ' nights';
	    		   return;
	    	   }else{
	    		   for(let i = 0;i < this.reservation.numberOfNIghts;i++){
	    			   selectedDateNew.setDate(selectedDateNew.getDate() + i);
		    		   var a = selectedDateNew.getTime();
		    		   let index = this.selectedApartment.availabilityByDates.indexOf(a);
		    		   this.selectedApartment.availabilityByDates.splice(index,1);
	    		   }
	    	   }
	    	   
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
	
	           this.$root.$emit('loadApartmentForGuest',false)
     	       toast('Za apartman iz grada ' + this.selectedApartment.location.address.city + ' uspesno ostavljena rezervacija !')
     	       		
	    	}
		},
		
		components: {
			vuejsDatepicker
		  }


});