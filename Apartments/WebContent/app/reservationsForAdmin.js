/**
 * 
 */
Vue.component("reservationsForAdmin",{
	data : function(){
		return {
			allReservations:null,
			showReservations:false,
			searchText:'',
			currentSortDir:'asc'
		}
	},
	
	template : `
				<div>
					<button type="submit" v-on:click="showAllReservations()">Show all reservations</button>
					<div v-show="showReservations">
						<div class="search-container">
						      <input type="text" placeholder="Search reservation by username.." v-model = "searchText">
						</div>	
						<table border = "1">
							<tr bgcolor="lightgrey">
								<th>Apartment id</th>
								<th>Guest username</th>
								<th>Status of reservation</th>
								<th v-on:click="sort()">Full price</th>
							</tr>
							<tr v-for="r in search">
								<td>{{r.apartment.id}}</td>
								<td>{{r.guest.username }}</td>
								<td>{{r.statusOfReservation }}</td>
								<td>{{r.fullPrice}}</td>
							</tr>
						</table>
					</div>
				</div>
			`,
	
	methods : {
		
		showAllReservations : function(){
			this.searchText = '';
			if(!this.showReservations)
				axios
			        .get('rest/reservations/all')
			        .then(response => (response.data ? this.allReservations = response.data : this.allReservations = null,
			        		this.showReservations = true))
			else
				this.showReservations = false;
		},
		
		
		sort(){
			if(this.currentSortDir == 'asc'){
				this.currentSortDir = 'desc';
			}else
				this.currentSortDir = 'asc'
			
			if(this.allReservations){
				this.allReservations = this.allReservations.sort((a,b) => {
			      let modifier = 1;
			      if(this.currentSortDir === 'desc') modifier = -1;
			      if(a['fullPrice'] < b['fullPrice']) return -1 * modifier;
			      if(a['fullPrice'] > b['fullPrice']) return 1 * modifier;
			      return 0;
			    });
				this.searchText = this.searchText;
			}
		}
		
		
	},
	
	computed : {
		
		search(){
		if(this.allReservations)	
			return this.allReservations.filter(r => {
			         return r.guest.username.toLowerCase().includes(this.searchText.toLowerCase())})
		}
	}

});