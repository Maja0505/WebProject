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
				<p>PRETRAGA</p>
				<table>
				
				<tr>
					<td>Date</td>
				</tr>
				<tr>	
						
						from:
						<vuejs-datepicker format="dd.MM.yyyy" v-model="searchStartDate"></vuejs-datepicker>
						to:
						<vuejs-datepicker  format="dd.MM.yyyy" v-model="searchEndDate"></vuejs-datepicker>



				</tr>
				
				<tr>
					<td>Location(City)</td>
				</tr>
				<tr>
					<td><input type="text" v-model="searchLocation"/></td>

				</tr>
				
				<tr>
					<td>Price</td>
				</tr>
				<tr>
					<td><input type="text"  v-model="searchPriceFrom"/>-<input type="text" v-model="searchPriceTo"/></td>
					
				</tr>
				
				<tr>
						<td>Number Of Rooms</td>
				</tr>
				<tr>
						<td><input type="text"   v-model="searchNumberOfRoomsFrom"/>-<input type="text"  v-model="searchNumberOfRoomsTo"/></td>

				</tr>
				
				<tr>
						<td>Number Of Guests</td>
				</tr>
				<tr>
						<td><input type="text"  v-model="searchNumberOfGuests"/></td>

				</tr>


				

	
				<td colspan="3"><button  v-on:click="searchApartment()">Search</button></td>

				</tr>
				
			</table>
			</div>
		`,	
		mounted () {
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
		searchApartment: function(apartment){
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