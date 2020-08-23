/**
 * 
 */
Vue.component("guest", {
	data: function () {
	    return {
		  
	    }
		},//OVDE IDE PRIKAZ APARTMANA ZA GOSTE
		template: `
		<div>
			<apartmentsForGuestOrUnregistredUser></apartmentsForGuestOrUnregistredUser>
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