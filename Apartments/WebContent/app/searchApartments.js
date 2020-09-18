var city = '';

Vue.component("searchApartments", {
	
	data: function () {
	    return {
	    	searchStartDate:'',
	    	searchEndDate:'',
	    	searchPriceFrom:'',
	    	searchPriceTo:'',
	    	searchLocation:'',
	    	searchNumberOfRoomsFrom:'',
	    	searchNumberOfRoomsTo:'',
	    	searchNumberOfGuests:'',
	    	currentUser:null
	    }
	},
	
	template: `
			<div>
				<div class="container-search-apartment">
				  
				  <div class="row" style="margin-left: 50px;">
					  	<div class="column25-in-form-search-apartment">
					  		<div class="row">
								<div class="column25-in-form-search-apartment m-l-50" style="text-align:left;">
									Date from :
								</div>
								<div class="column50-in-form-search-apartment">
									<vuejs-datepicker input-class="datapicker-input-style" style="color:black" format="dd.MM.yyyy" v-model="searchStartDate" :clear-button='true'></vuejs-datepicker>
								</div>
					  		</div>
					  		<div class="row"> 
								<div class="column25-in-form-search-apartment m-l-50" style="text-align:left;"> 
									Date to :
								</div>
								<div class="column50-in-form-search-apartment">
									<vuejs-datepicker input-class="datapicker-input-style" style="color:black" format="dd.MM.yyyy" v-model="searchEndDate" :clear-button='true'>
									</vuejs-datepicker>
								</div>
					  		</div>
					  	</div>	
					  	
					  	<div class="column50-in-form-search-apartment" style="width:650px;">
					  		<div class="row"> 
								<div class="column25-in-form-search-apartment" style="width:192.5px"> 
									Location(City) :
								</div>
								<div class="column50-in-form-search-apartment" style="text-align:left;width:420px">
									<input type="search" style="color:black" id="address" class="location-input-style" placeholder="Search city"/>
								</div>
					  		</div>
					  		<div class="row">
					  			<div class="column25-in-form-search-apartment" style="width:150px;margin-left: 15px;"> 
									Price($) :
								</div>
								<div class="column25-in-form-search-apartment" style="width:150px;margin-left: 10px;color:black;"> 
									<input class="small-input" type="number" min='0' onkeydown="javascript: return event.keyCode === 8 || event.keyCode === 46 ? true : !isNaN(Number(event.key))" v-model="searchPriceFrom"/><label style="color:white;">--</label><input class="small-input" type="number" min='0' onkeydown="javascript: return event.keyCode === 8 || event.keyCode === 46 ? true : !isNaN(Number(event.key))" v-model="searchPriceTo"/>
								</div>
								<div class="column25-in-form-search-apartment" style="width:150px;"> 
									Number of rooms :
								</div>
								<div class="column25-in-form-search-apartment" style="width:150px;margin-left: 5px;color:black;"> 
									<input class="small-input" type="number" min='0' onkeydown="javascript: return event.keyCode === 8 || event.keyCode === 46 ? true : !isNaN(Number(event.key))" v-model="searchNumberOfRoomsFrom"/><label style="color:white;">--</label><input class="small-input" type="number" min='0' onkeydown="javascript: return event.keyCode === 8 || event.keyCode === 46 ? true : !isNaN(Number(event.key))" v-model="searchNumberOfRoomsTo"/>
								</div>
					  		</div>
					  	</div>	
					  
					  	<div class="column25-in-form-search-apartment">
			  				<div class="row">
			  					<div class="column50-in-form-search-apartment"> 
									Number of guests :
								</div>
								<div class="column25-in-form-search-apartment" style="color:black;"> 
									<input type="number" min='0' onkeydown="javascript: return event.keyCode === 8 || event.keyCode === 46 ? true : !isNaN(Number(event.key))" style="width:90px;" v-model="searchNumberOfGuests"/>
								</div>
			  				</div>
			  				<div class="row">
			  					<div class="column50-in-form-search-apartment container-btn-form" style="text-align: center;margin-left: 100px;"> 
									<button class="form-btn" style="background:blue;" v-on:click="searchApartment()" type="button">Search</button></td>
								</div>
			  				</div>
					  	</div>	
				  	</div>
				</div>
			</div>
		`,	
		mounted () {
		  this.changeBGImage();
	      this.allPlaces();
          axios
	         .get('rest/users/currentUser')
	          	.then(response => (response.data ? this.currentUser = response.data : this.currentUser = null))
	          	
	   	this.$root.$on('clearSearch',(text) => {
	   		this.searchStartDate=text,
		    this.searchEndDate=text,
		   	this.searchPriceFrom=text,
		   	this.searchPriceTo=text,
		   	this.searchLocation=text,
		   	this.searchNumberOfRoomsFrom=text,
	    	this.searchNumberOfRoomsTo=text,
	    	this.searchNumberOfGuests=text});
		},
	          	
		methods:{
			
			changeBGImage : function(){
				document.querySelector('body').style.backgroundImage = 'url(' + "images/sea.png" + ')';
			},
			
			allPlaces : function() {
				var placesAutocomplete = places({
				    appId: 'plQ4P1ZY8JUZ',
				    apiKey: 'bc14d56a6d158cbec4cdf98c18aced26',
				    container: this.$el.querySelector('#address'),
				    templates:{
				    	value : function(suggestion){
				    		return suggestion.name
				    	}
				    }
				  }).configure({
					  type: 'city',
				  });
				
				placesAutocomplete.on('change',function(e){
					 city = e.suggestion.value || "";
				});
				
				
		},
			
			
		searchApartment: function(){
			if(this.$el.querySelector("#address").value == ''){
				this.searchLocation = '';
			}else{
				this.searchLocation = city;
			}
			if(this.currentUser){
				if(this.currentUser.typeOfUser === 'HOST'){
					this.$root.$emit('searchApartmentForHost',this.searchStartDate,this.searchEndDate,this.searchPriceFrom,this.searchPriceTo,this.searchLocation,this.searchNumberOfRoomsFrom,this.searchNumberOfRoomsTo,this.searchNumberOfGuests);
				}else if(this.currentUser.typeOfUser === 'ADMIN'){
					this.$root.$emit('searchApartmentForAdmin',this.searchStartDate,this.searchEndDate,this.searchPriceFrom,this.searchPriceTo,this.searchLocation,this.searchNumberOfRoomsFrom,this.searchNumberOfRoomsTo,this.searchNumberOfGuests);

				}else{
					this.$root.$emit('searchApartmentForGuestOrUnregistredUser',this.searchStartDate,this.searchEndDate,this.searchPriceFrom,this.searchPriceTo,this.searchLocation,this.searchNumberOfRoomsFrom,this.searchNumberOfRoomsTo,this.searchNumberOfGuests);

				}
			}else{
				this.$root.$emit('searchApartmentForGuestOrUnregistredUser',this.searchStartDate,this.searchEndDate,this.searchPriceFrom,this.searchPriceTo,this.searchLocation,this.searchNumberOfRoomsFrom,this.searchNumberOfRoomsTo,this.searchNumberOfGuests);
			}
			
		}
	},
	
			components: {
		vuejsDatepicker
	  }
});