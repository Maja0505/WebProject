/**
 * 
 */
Vue.component("reservation", {
	data: function () {
	    return {
		  allReservations: null,
		  loggedUser:null,
		  selectedApartment: null,
		  maxId:0,
		  disableDates:{},
		  reservation:{},
		  showReservationForm : false,
		  error: '',
		  fullPriceOfReservation:0,
	    }
	},
	
	template: `
	
			<div>
					<div v-if="showReservationForm" class="container-reservation">
						<div class="row">
							<label class="txt7">Reservation</label>
						</div>
						<div class="row">
							<div class="column66-in-form-search-apartment">
								<div class="column50-in-form-search-apartment"  style="text-align:left;padding:0px;">
									<label class="txt8" style="margin-left:5%;">Date of start reservation: </label>
								</div>
								<div class="column50-in-form-search-apartment"  style="text-align:left;padding:0px;">	
									<vuejs-datepicker @input="getFullPrice" input-class="reservation-input" style="width:70%;" v-model="reservation.startDateOfReservation"  format="dd.MM.yyyy"  :disabled-dates="disableDates"></vuejs-datepicker>
									<span class="focus-reservation-input"></span>
								</div>
							</div>
							<div class="column33-in-form-search-apartment">
								<div class="column66-in-form-search-apartment" style="padding:0px;text-align:left;">
									<label class="txt8">Number of nights: </label>
								</div>
								<div class="column33-in-form-search-apartment" style="padding:0px;text-align:left;">
									<div class="container-reservation-input">
										<input class="reservation-input" @input="getFullPrice" v-on:keydown = "getFullPrice" type="number" onkeydown="javascript: return event.keyCode === 8 || event.keyCode === 46 ? true : !isNaN(Number(event.key))" v-model="reservation.numberOfNIghts" min="1" max="15">
										<span class="focus-reservation-input"></span>
									</div>
								</div>	
							</div>
						</div>
						<div class="row">
							<div class="column66-in-form-search-apartment" style="padding-top: 0px;">
								<div class="column50-in-form-search-apartment"  style="text-align:left;">
									<label class="txt8" style="margin-left:4%;">Message for host: </label>
								</div>
								<div class="column50-in-form-search-apartment"  style="text-align:left;padding:0px;">	
									<div class="container-reservation-input" style="width:70%;">
										<textarea class="reservation-input"  type="text" v-model="reservation.reservationMessage"></textarea>
										<span class="focus-reservation-input"></span>
									</div>
								</div>	
							</div>
							<div class="column33-in-form-search-apartment">
								<div class="column66-in-form-search-apartment" style="padding:0px;text-align:left;">
									<label class="txt8">Price per night: </label>
								</div>
								<div class="column33-in-form-search-apartment" style="padding:0px;text-align:left;">
									<label class="txt8">{{selectedApartment.pricePerNight}} $</label>
								</div>	
							</div>
						</div>
						<div class="row">
							<div class="column50-in-form-search-apartment"  style="text-align:left;padding-top:10px;">
								<label class="txt8" style="margin-left:4%;">Full price for reservation: </label>
							</div>
							<div class="column50-in-form-search-apartment" style="text-align:left;padding:10px;">
								<div  v-show="reservation.numberOfNIghts" class="column66-in-form-search-apartment"  style="text-align:left;padding:0px;">
									<label class="txt8" v-show="reservation.numberOfNIghts * selectedApartment.pricePerNight !== fullPriceOfReservation"><span style="color:green;">{{fullPriceOfReservation}}</span>$ <span style="text-decoration-line: line-through;color:red;">{{reservation.numberOfNIghts * selectedApartment.pricePerNight}} $</span></label>
									<label class="txt8" v-show="reservation.numberOfNIghts * selectedApartment.pricePerNight == fullPriceOfReservation">{{fullPriceOfReservation}}</label>
								</div>
								<div v-show="!reservation.numberOfNIghts" class="column66-in-form-search-apartment"  style="text-align:left;padding:0px;">	
									<label class="txt8">0 $</label>
								</div>
								<div class="column33-in-form-search-apartment" style="margin-left:0%;padding-top:0px;">
									<div class="container-btn-form">
										<button type="button" class="form-btn" style="height:30%;" v-on:click="bookingApartment()">CONFIRM</button>
									</div>
								</div>
							</div>
						</div>
						
						<div class="row">
				   			<label class="txt8" style="color:red;margin-left:2.5%;">{{error}}</label>
						</div>
						
		       		</div>
			</div>
		
		`,
		mounted () {
		  this.changeBGImage();
		  this.$root.$on('showReservationPart',(text1,text2)=>{ this.loadData(),
			  this.showReservationForm = text2,this.reservation = {},this.generateDisableDates(),this.findMaxId(),this.error=""});
		  this.loadData();	
	    },
	
		methods: {
			
			changeBGImage : function(){
				document.querySelector('body').style.backgroundImage = 'url(' + "images/apartment3.png" + ')';
			},
			
			loadData: function(){
				
				axios
		          .get('rest/apartments/currentSelectedApartment')
		          .then(response => (this.selectedApartment = response.data))
				
				axios
				  .get('rest/users/currentUser')
	         	  .then(response => (response.data ? this.loggedUser = response.data : this.loggedUser = null))

		        axios
		          .get('rest/reservations/all')
		          .then(response =>  (response.data ? this.allReservations = response.data : this.allReservations = null))

			},
			
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
			
	    	bookingApartment: function(){
	    		
	    		this.error="";
	    		
	    		if(!this.reservation.numberOfNIghts || !this.reservation.startDateOfReservation){
	    			this.error = "You need to choose start date and number of nights!";
	    			return;
	    		}
	    	    if(this.reservation.numberOfNIghts.startsWith("0")){
					this.error = "Number of nights must be bigger then 0";
					return;
				}
	    		
	    	   this.maxId++;
	    	     
	    	   var objReservation = {"id":this.maxId, "apartment": this.selectedApartment,"startDateOfReservation":this.reservation.startDateOfReservation,
		    		   "numberOfNights":this.reservation.numberOfNIghts,"fullPrice":this.fullPriceOfReservation,
		    		   "reservationMessage":''+this.reservation.reservationMessage,"guest":this.loggedUser,"statusOfReservation":"CREATED"};

	    	   
	    	   var selectedDate = this.reservation.startDateOfReservation;
	    	   var yyyy = selectedDate.getYear() + 1900;
	    	   var mm = selectedDate.getMonth();
	    	   var dd = selectedDate.getDate();
	    	   
	    	   
	    	  
	    	   var reservationOk = true;
	    	   
	    	   for(let i = 0;i < this.reservation.numberOfNIghts;i++){
	    		   var selectedDateNew = new Date(yyyy,mm,dd,0,0,0,0);
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
	    			   var selectedDateNew = new Date(yyyy,mm,dd,0,0,0,0);
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
		        	  }).then(response => {
		        		  alert('Success booked apartment!')
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
	    	   this.showReservationForm = false;
	    	   this.$root.$emit('showReservationFormInView');
	    	},
	    	
	    	getFullPrice : function(){
	    			
    			this.fullPriceOfReservation = 0;
    			if(!this.reservation.startDateOfReservation || !this.reservation.numberOfNIghts){
    				this.fullPriceOfReservation = 0;
    				return
    			}
    		
    		   var selectedDate = this.reservation.startDateOfReservation;
	    	   var yyyy = selectedDate.getYear() + 1900;
	    	   var mm = selectedDate.getMonth();
	    	   var dd = selectedDate.getDate();
	    		
	    		for(let i = 0;i < this.reservation.numberOfNIghts;i++){
	    			   var selectedDateNew = new Date(yyyy,mm,dd,0,0,0,0);
	    			   selectedDateNew.setDate(selectedDateNew.getDate() + i);
	    			   if(selectedDateNew.getDay() >= 5){
	    				   this.fullPriceOfReservation += this.selectedApartment.pricePerNight * 0.9
	    			   }else{
	    				   this.fullPriceOfReservation += this.selectedApartment.pricePerNight
	    			   }
	    		   }
	    	}
		},
		
		components: {
			vuejsDatepicker
		  }


});