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
		<div>
			<apartmentsForHost></apartmentsForHost>
		</div>
		`
		,
		
		methods:{
	
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