Vue.component("editApartment", {
	data: function () {
	    return {
	    	selectedApartment:null,
	    	showEditForm:false,
	    	startDate:null,
	    	endDate:null,
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
			  
	    }
},
		template: ` 
		<div>
			<div v-show="selectedApartment">
				<button style="background-color:MediumSeaGreen;" v-on:click="openEditForm()">Show details of apartment</button>
			</div>
			
			<div v-show="showEditForm" v-if="showEditForm">
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
				</table>
				<button v-on:click="edit()" v-bind:disabled="mode=='EDITING'">Edit</button>
			<button v-on:click="checkForm()" v-bind:disabled="mode=='NOT_EDIT_YET'">Confirm</button>
			<button v-on:click="cancel()" v-bind:disabled="mode=='NOT_EDIT_YET'">Cancel</button>
			</div>
		</div>
		`,
		mounted () {
	        this.$root.$on('showEditButton',(text) => {this.selectedApartment = text,this.showEditForm = false});
		},
		methods:{
			openEditForm : function(){
				if(this.showEditForm){
					this.showEditForm = false;
				}else{
					this.startDate = this.selectedApartment.dateOfIssue[0];
					this.endDate = this.selectedApartment.dateOfIssue[this.selectedApartment.dateOfIssue.length - 1];
					this.showEditForm = true;
					
					
					
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
			
			},generateDateOfIssue: function(){
				
				if(this.selectedApartment.dateOfIssue[0] != this.startDate ||  this.selectedApartment.dateOfIssue[this.selectedApartment.dateOfIssue.length - 1] != this.endDate){
					this.selectedApartment.dateOfIssue = [];
					this.selectedApartment.availabilityByDates = [];
					while( this.startDate <= this.endDate ){
						   this.selectedApartment.dateOfIssue.push(new Date(this.startDate));
						   this.selectedApartment.availabilityByDates.push(new Date(this.startDate));
						   this.startDate.setDate(this.startDate.getDate() + 1);
						 }
				}
				this.confirm();
				
			}
		},
		components: {
			vuejsDatepicker
		  }
		
});