/**
 * 
 */
Vue.component("reservationsForAdmin",{
	data : function(){
		return {
			allReservations:null,
			showReservations:false
		}
	},
	
	template : `
				<div>
					<button type="submit" v-on:click="showAllReservations()">Show all reservations</button>
					<div v-show="showReservations">
						<table border = "1" class="allReservations">
							<tr bgcolor="lightgrey">
								<th>Apartment id</th>
								<th>Guest username</th>
								<th>Status of reservation</th>
							</tr>
							<tr v-for="r in allReservations">
								<td>{{r.apartment.id}}</td>
								<td>{{r.guest.username }}</td>
								<td>{{r.statusOfReservation }}</td>
							</tr>
						</table>
					</div>
				</div>
			`,
	
	methods : {
		
		showAllReservations : function(){
			
			if(!this.showReservations)
				axios
			        .get('rest/reservations/all')
			        .then(response => (response.data ? this.allReservations = response.data : this.allReservations = null,
			        		this.showReservations = true))
			else
				this.showReservations = false;
		}
		
		
	}

});