var base64Image = null;
var arrayImageString = [];

var postalCode = {};
var city = {};
var street = {};

var latitude = {}; 
var longitude = {};
Vue.component("editApartment", {
	data: function () {
	    return {
	    	location:null,
	    	streetNumber:"",
			address:{},
			locationOfApartment:{},
	    	selectedApartment:null,
	    	showEditForm:false,
	    	startDate:null,
	    	endDate:null,
	    	allAmenities:null,
	    	viewAmenitiesForm:false,
	    	backup:[],
	    	mode: "NOT_EDIT_YET",
	    	typeOfApartment:'Choose type of apartment',
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
			  errorNameOfApartment:'',
			  image:null,
			  imagesForApartment:[],
			  imagesForApartmentForConvert:[],
			  errorLocation:"",
			  errorStartDate:"",
			  errorEndDate:"",
	    }
},
		template: ` 
		<div>
			<div class="column75-in-form-search-apartment" style="text-align:left;top:200px;background-color:red;">
				<div class="container-form-input">
						<input class="form-input" type="search" id="address" placeholder="Search street">
						<span class="focus-form-input"></span>
						<p class="form-input-error">{{errorLocation}}</p>
				</div>
			</div>

		</div>
		`,
		mounted () {
			//this.allPlaces();

	        this.$root.$on('showEditForm',(text,text2) => {this.selectedApartment = text,this.showEditForm = text2,this.getStartEndDate()});
		},

		methods:{
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
			    this.startDate,this.endDate,this.selectedApartment.pricePerNight,this.selectedApartment.checkInTime,this.selectedApartment.checkOutTime,this.selectedApartment.statusOfApartment,this.selectedApartment.name];
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
				 var a = this.$el.querySelector('#address')
				 console.log(a);
				  this.errorTypeOfApartment = "";
				  this.errorNumberOfRooms = "";
				  this.errorNumberOfGuests = "";
				  this.errorStreetNumber = "";
				  //this.errorCity = "";
				  //this.errorPostalCode = "";
				  //this.errorDateOfIssue = "";
				  this.errorPricePerNight = "";
				  this.errorCheckInTime = "";
				  this.errorCheckOutTime = "";
				  this.errorNameOfApartment = '';
				  this.errorLocation="";
				  this.errorStartDate="";
				  this.errorEndDate="";
		        
				  this.selectedApartment.typeOfApartment = this.backup[0];
				  this.selectedApartment.numberOfRooms = this.backup[1];
				  this.selectedApartment.numberOfGuests = this.backup[2];
				  this.selectedApartment.location.address.streetNumber  = this.backup[6];
				  this.selectedApartment
			 	  this.startDate = this.backup[9];
				  this.endDate = this.backup[10];
				  this.selectedApartment.pricePerNight  = this.backup[11];
				  this.selectedApartment.checkInTime  = this.backup[12];
				  this.selectedApartment.checkOutTime  = this.backup[13];
				  this.selectedApartment.statusOfApartment = this.backup[14];
				  this.selectedApartment.name = this.backup[15];
				
				  this.mode = "NOT_EDIT_YET";
			},
			
			checkForm: function(){
					
				  this.errorTypeOfApartment = "";
				  this.errorNumberOfRooms = "";
				  this.errorNumberOfGuests = "";
				  this.errorStreetNumber = "";
				  this.errorPricePerNight = "";
				  this.errorCheckInTime = "";
				  this.errorCheckOutTime = "";
				  this.errorNameOfApartment = '';
				  this.errorLocation="";
				  this.errorStartDate="";
				  this.errorEndDate="";
				
		
				
				  if(!this.selectedApartment.name){
					this.errorNameOfApartment = "can't be empty"
				}
				  
				  
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
			
			 if( this.errorTypeOfApartment == "" && this.errorNumberOfRooms == "" && this.errorNumberOfGuests == "" && this.errorStartDate == "" && this.errorEndDate == "" && this.errorNameOfApartment == "" && this.errorLocation  == "" && this.errorStreetNumber == ""   && this.errorPricePerNight == "" && this.errorCheckInTime == "" && this.errorCheckOutTime == ""){
					//za generisanje lokacije
					this.locationOfApartment.longitude = longitude;
					this.locationOfApartment.latitude = latitude;
					this.address.postalCode = postalCode;
					this.address.city = city;
					this.address.street = street;
					
					this.address.streetNumber = this.streetNumber;
					this.locationOfApartment.address = this.address;
					this.apartment.location = this.locationOfApartment;
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
					 let img = e.target.files[0];
					 //putanju slike cuvamo u aparmtnanu
					 this.image = "images/" + img.name;
					 //naziv slike za saveImage fju
					 ImgName = img.name;
					 //pretvaranje u base64 format
					 var reader = new FileReader();
					 reader.readAsDataURL(img); 
					 reader.onloadend = function() {
			 	     var base64data = reader.result;  
				     base64Image = base64data;
					 }
					
				
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
					  axios
				         .post('rest/apartments/saveImage/'+ ImgName ,JSON.stringify(base64Image),
					       		  {
			 		        	headers: {
			 		        		'Content-Type': 'application/json'
					        			}
			        	  });
					  
					}
					
	 


		},
		components: {
			vuejsDatepicker
		  }
		
});