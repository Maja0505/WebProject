Vue.component("editApartment", {
	data: function () {
	    return {
	    	selectedApartment:null,
	    	showEditForm:false,
	    	startDate:null,
	    	endDate:null,
	    	allAmenities:null,
	    	viewAmenitiesForm:false,
	    	backup:[],
	    	mode: "NOT_EDIT_YET",
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
			  slideIndex : 1

	    }
},
		template: ` 
		<div>
			
			<div v-show="showEditForm" v-if="showEditForm">

 <!-- Container for the image gallery -->
<div class="container">

  <!-- Full-width images with number text -->
  <div class="mySlides" v-for="image in selectedApartment.images">
    <div class="numbertext">1 / 6</div>
      <img :src="image" style="width:100%">
  </div>

  <!-- Next and previous buttons -->
  <a class="prev" v-on:click="plusSlides(-1)">&#10094;</a>
  <a class="next" v-on:click="plusSlides(1)">&#10095;</a>

  <!-- Image text -->
  <div class="caption-container">
    <p id="caption"></p>
  </div>

  <!-- Thumbnail images -->
  <div class="row">
    <div class="column"  v-for="(item, index) in selectedApartment.images">
      <img class="demo cursor" :src="item" style="width:100%"  v-on:click="currentSlide(index+1)" alt="The Woods">
    </div>
    
  </div>
</div> 




				<table>
					<tr>
						<th>STATUS of Apartment</th>
						<td><select name="status" id="status"  v-model="selectedApartment.statusOfApartment" v-bind:disabled="mode=='NOT_EDIT_YET'">
							  <option value="ACTIVE">ACTIVE</option>
							  <option value="INACTIVE">INACTIVE</option>
							</select>
						</td>
					</tr>
					<tr>
						<th>Type of Apartment</th>
						<td><select name="type" id="type"  v-model="selectedApartment.typeOfApartment" v-bind:disabled="mode=='NOT_EDIT_YET'">
							  <option value="ROOM">ROOM</option>
							  <option value="WHOLE_APARTMENT">WHOLE APARTMENT</option>
							</select>
						</td>
						<td>{{errorTypeOfApartment}}</td>
					</tr>
					<tr>
							<th>Number Of Rooms</th>
						    <td><input type="text"  v-model="selectedApartment.numberOfRooms" v-bind:disabled="mode=='NOT_EDIT_YET'"/></td>
							<td>{{errorNumberOfRooms}}</td>
	
					</tr>
					<tr>
							<th>Number Of Guests</th>
							<td><input type="text"  v-model="selectedApartment.numberOfGuests" v-bind:disabled="mode=='NOT_EDIT_YET'"/></td>
							<td>{{errorNumberOfGuests}}</td>
	
					</tr>
					<tr>
							<th>logitude</th>
							<td><input type="text"  v-model="selectedApartment.location.longitude" v-bind:disabled="mode=='NOT_EDIT_YET'"/></td>
							<td>{{errorLongitude}}</td>
	
					</tr>
					<tr>
						<th>latitude</th>
						<td><input type="text"  v-model="selectedApartment.location.latitude" v-bind:disabled="mode=='NOT_EDIT_YET'"/></td>
						<td>{{errorLatitude}}</td>
	
					</tr>
					<tr>
						<th>street</th>
						<td><input type="text" v-model="selectedApartment.location.address.street" v-bind:disabled="mode=='NOT_EDIT_YET'"/></td>
						<td>{{errorStreet}}</td>
	
					</tr>
					<tr>
						<th>streetNumber</th>
						<td><input type="text" v-model="selectedApartment.location.address.streetNumber" v-bind:disabled="mode=='NOT_EDIT_YET'"/></td>
						<td>{{errorStreetNumber}}</td>
	
					</tr>
					<tr>
						<th>city</th>
						<td><input type="text" v-model="selectedApartment.location.address.city" v-bind:disabled="mode=='NOT_EDIT_YET'"/></td>
						<td>{{errorCity}}</td>
	
					</tr>
		      		<tr>
						<th>postalCode</th>
						<td><input type="text" v-model="selectedApartment.location.address.postalCode" v-bind:disabled="mode=='NOT_EDIT_YET'"/></td>
						<td>{{errorPostalCode}}</td>
	
					</tr>
					
					<tr>
							<th>Date Of Issue OD:</th>
							<td><vuejs-datepicker format="dd.MM.yyyy" v-model="startDate" v-bind:disabled="mode=='NOT_EDIT_YET'"></vuejs-datepicker></td>
							<th>Date Of Issue DO:</th>
							<td><vuejs-datepicker  format="dd.MM.yyyy"  v-model="endDate" v-bind:disabled="mode=='NOT_EDIT_YET'"></vuejs-datepicker></td>
							<td>{{errorDateOfIssue}}</td>
	
					</tr>
					<tr>
							<th>Price Per Night</th>
							<td><input type="text" v-model="selectedApartment.pricePerNight" v-bind:disabled="mode=='NOT_EDIT_YET'"/></td>
							<td>{{errorPricePerNight}}</td>
	
					</tr>
					<tr>
							<th>Check In Time OD:</th>
							<td><input type="time" format="dd:HH" v-model="selectedApartment.checkInTime" v-bind:disabled="mode=='NOT_EDIT_YET'"></td>
							<td>{{errorCheckInTime}}</td>
	
					</tr>
					<tr>
							<th>Check Out Time</th>
							<td><input type="time" format="dd:HH" v-model="selectedApartment.checkOutTime" v-bind:disabled="mode=='NOT_EDIT_YET'"></td>
							<td>{{errorCheckOutTime}}</td>
	
						
							</script>
					</tr>
					<tr><td align='center' colspan='3'><button v-on:click="viewAmenities()" v-bind:disabled="mode=='EDITING'">View amenities</button></td></tr>
				<tr><td><input type="text" v-model="productSpect" /></td>
				<td><input type="file" @change="uploadImage" name="image" id="image"  accept="image/*" ></td>
				<td><button type="submit" @click.prevent="submit"> Submit</button></td></tr>
				</table>
				<div v-show="viewAmenitiesForm">
					<table class="allAmenities">
						<tr><th>Name</th><th>In my apartment</th></tr>
						
						<tr  v-for="a in allAmenities">
							<th>{{a.name}}</th>
							<th><input type="checkbox" :checked="isInApartmentList(a)" @click="onChange(a,$event)"></th>
						</tr>
					</table>
				</div>
			<button v-on:click="edit()" v-bind:disabled="(mode=='EDITING' || mode=='AMENITIES')">Edit</button>
			<button v-on:click="checkForm()" v-bind:disabled="(mode=='NOT_EDIT_YET'|| mode=='AMENITIES')">Confirm</button>
			<button v-on:click="cancel()" v-bind:disabled="(mode=='NOT_EDIT_YET'|| mode=='AMENITIES')">Cancel</button>
			</div>
			
		</div>
		`,
		mounted () {
	        this.$root.$on('showEditForm',(text,text2) => {this.selectedApartment = text,this.showEditForm = text2,this.getStartEndDate(),this.showSlides(this.slideIndex)});
	        
		},

		methods:{
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
		 		        		'Content-Type': 'application/json',
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
				if(this.showEditForm){
					this.startDate = this.selectedApartment.dateOfIssue[0];
					this.endDate = this.selectedApartment.dateOfIssue[this.selectedApartment.dateOfIssue.length - 1];	
					
				}

			},
			edit: function(){
				this.backup = [];
				this.backup=[this.selectedApartment.typeOfApartment,this.selectedApartment.numberOfRooms,this.selectedApartment.numberOfGuests,
					 this.selectedApartment.location.longitude,this.selectedApartment.location.latitude,this.selectedApartment.location.address.street,
					 this.selectedApartment.location.address.streetNumber,this.selectedApartment.location.address.city,this.selectedApartment.location.address.postalCode,
					 this.startDate,this.endDate,this.selectedApartment.pricePerNight,this.selectedApartment.checkInTime,this.selectedApartment.checkOutTime,this.selectedApartment.statusOfApartment];
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
		        
				  this.selectedApartment.typeOfApartment = this.backup[0];
				  this.selectedApartment.numberOfRooms = this.backup[1];
				  this.selectedApartment.numberOfGuests = this.backup[2];
				  this.selectedApartment.location.longitude  = this.backup[3];
			 	  this.selectedApartment.location.latitude  = this.backup[4];
				  this.selectedApartment.location.address.street  = this.backup[5];
				  this.selectedApartment.location.address.streetNumber  = this.backup[6];
				  this.selectedApartment.location.address.city  = this.backup[7];
				  this.selectedApartment.location.address.postalCode  = this.backup[8];
			 	  this.startDate = this.backup[9];
				  this.endDate = this.backup[10];
				  this.selectedApartment.pricePerNight  = this.backup[11];
				  this.selectedApartment.checkInTime  = this.backup[12];
				  this.selectedApartment.checkOutTime  = this.backup[13];
				  this.selectedApartment.statusOfApartment = this.backup[14];
				
				  this.mode = "NOT_EDIT_YET";
			},
			checkForm: function(){
					
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
				
				
				if(!this.selectedApartment.typeOfApartment){
					this.errorTypeOfApartment = "can't be empty"
				}
				if(!this.selectedApartment.numberOfRooms){
					this.errorNumberOfRooms = "can't be empty"
				}else if(!Number.isInteger(this.selectedApartment.numberOfRooms)){
					this.errorNumberOfRooms = "must be an integer";
				}
				
				if(!this.selectedApartment.numberOfGuests){
					this.errorNumberOfGuests = "can't be empty"
				}else if(!Number.isInteger(this.selectedApartment.numberOfGuests)){
					this.errorNumberOfGuests = "must be an integer";
				}
				if(!this.selectedApartment.location.longitude){
					this.errorLongitude = "can't be empty"
				}
				if(!this.selectedApartment.location.latitude){
					this.errorLatitude = "can't be empty"
				}
				
				if(!this.selectedApartment.location.address.street){
					this.errorStreet = "can't be empty"
				}
				
				if(!this.selectedApartment.location.address.streetNumber){
					this.errorStreetNumber = "can't be empty"
				}
				
				if(!this.selectedApartment.location.address.city){
					this.errorCity = "can't be empty"
				}
				if(!this.selectedApartment.location.address.postalCode){
					this.errorPostalCode = "can't be empty"
				}
				if(!this.startDate){
					this.errorDateOfIssue = "can't be empty"
				}
				if(!this.endDate){
					this.errorDateOfIssue = "can't be empty"
				}
				if(!this.selectedApartment.pricePerNight){
					this.errorPricePerNight = "can't be empty"
						
				}else if(!Number.isInteger(this.selectedApartment.pricePerNight)){
					this.errorPricePerNight = "must be an integer";
				}
				if(!this.selectedApartment.checkInTime){
					this.errorCheckInTime = "can't be empty"
				}
				if(!this.selectedApartment.checkOutTime){
					this.errorCheckOutTime = "can't be empty"
				}
			
			 if( this.errorTypeOfApartment == "" && this.errorNumberOfRooms == "" && this.errorNumberOfGuests == "" && this.errorLongitude == "" && this.errorLatitude == "" && this.errorStreet  == "" && this.errorStreetNumber == "" && this.errorCity == "" && this.errorPostalCode =="" &&    this.errorDateOfIssue == "" && this.errorPricePerNight == "" && this.errorCheckInTime == "" && this.errorCheckOutTime == ""){
				 this.generateDateOfIssue();
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
			uploadImage: function(e) {
				 let img = e.target.files[0]
				 this.image = "images/" + img.name
				},
			submit: function () {
					
					  var stringApartment = JSON.stringify(this.selectedApartment);
					  var objApartment = JSON.parse(stringApartment);
					  objApartment['images'].push(this.image);

					  axios
				         .put('rest/apartments/updateApartment',JSON.stringify(objApartment),
				       		  {
			 		        	headers: {
			 		        		'Content-Type': 'application/json',
					        			}
			        	  });
					  
					},plusSlides(n) {
						this.showSlides(this.slideIndex += n);
					},currentSlide(n) {
						this.showSlides(this.slideIndex = n);
					},showSlides(n) {
						if(this.showEditForm){
							  var i;
							  var slides =this.$el.querySelectorAll(".mySlides");
							  var dots = this.$el.querySelectorAll(".demo");
							  var captionText = this.$el.querySelectorAll("#caption");
							  if (n > slides.length) {this.slideIndex = 1}
							  if (n < 1) {this.slideIndex = slides.length}
							  for (i = 0; i < slides.length; i++) {
							    slides[i].style.display = "none";
							  }
							  for (i = 0; i < dots.length; i++) {
							    dots[i].className = dots[i].className.replace(" active", "");
							  }
							  slides[this.slideIndex-1].style.display = "block";
							  dots[this.slideIndex-1].className += " active";
							  captionText.innerHTML = dots[this.slideIndex-1].alt;
							  
							  
							  
							  
							  
							  
							  
							  
						}
			
						} 


		},
		components: {
			vuejsDatepicker
		  }
		
});