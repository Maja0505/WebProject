/**
 * 
 */
Vue.component("host", {
	data: function () {
	    return {
	    	showAllReservations:false,
	    	showAllMyGuests:false,
	    	showApartments:false
	    }
},
		template: ` 
		<div class="btn-group-vertical">
			<button type="button" v-on:click="showAllGuestsForHost()" class="btn btn-primary">Show my guests</button>
			<showGuestsForHost></showGuestsForHost>
			<button type="button" v-on:click="showAllReservationsForHost()" class="btn btn-primary">Show all reservations</button>
			<reservationsForHost></reservationsForHost>
			<button type="button" v-on:click="showApartmentsForHost()" class="btn btn-primary">Show my apartments</button>
			<apartmentsForHost></apartmentsForHost>
		</div>
		`
		,
		
		methods:{
			//prikaz svih korisnika koji imaju rezervaciju za apartman prijavljenog hosta(showGuestsForHost)
			showAllGuestsForHost : function(){
				if(this.showAllMyGuests){
					this.showAllMyGuests = false;
				}else{
					this.showAllMyGuests = true;
				}
				this.$root.$emit('showAllGuestsForHost',this.showAllMyGuests);
			},
			//prikaz svih rezervacija prijavljenog hosta(reservationsForHost)
			showAllReservationsForHost : function(){
				if(this.showAllReservations){
					this.showAllReservations = false;
				}else{
					this.showAllReservations = true;
				}
				this.$root.$emit('showAllReservationsForHost',this.showAllReservations);
			},
			showApartmentsForHost : function(){
				if(this.showApartments){
					this.showApartments = false;
				}else{
					this.showApartments = true;
				}
				this.$root.$emit('showApartments',this.showApartments);
			}
			
		}
});