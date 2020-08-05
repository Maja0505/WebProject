/**
 * 
 */
Vue.component("guest", {
	data: function () {
	    return {
		  
	    }
		},
		template: `
		<div>
			<apartmentsForGuestOrUnregistredUser></apartmentsForGuestOrUnregistredUser>
			<button type="submit" v-on:click="showReservations()">Show your reservations</button>
			<reservationsForGuest></reservationsForGuest>
			<button onclick="location.href='#/comment'">Comment apartment</button>
		<p>CAO JA SAM GUEST</p>
		</div>
		`,
		
		methods:{
			showApartments : function(){
				this.$root.$emit('showApartments');
			},
			
			showReservations : function(){
				this.$root.$emit('showGuestReservations');
			}
			
		}
		
});