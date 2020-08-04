/**
 * 
 */
Vue.component("apartmentsForAdmin", {
	
	data: function () {
	    return {
	    	allApartments:null,
	    	allComments:null,
	    	showAllApartments:false,
	    	commentForSelectedApartment:null,
	    	isAnySelected:false,
	    }
	},
	
	template: `
		<div>
			<button type="submit" v-on:click="showApartments()">Show all apartments</button>
			
			<div v-show="showAllApartments">
				<table border = "1" class="allApartments">
					<tr bgcolor="lightgrey">
						<th>Location</th>
						<th>Price Per Night</th>
						<th>Host</th>
					</tr>
					    
					<tr v-for="a in allApartments"  v-on:click="showCommentForSelectedApartment(a)">
						<td>{{a.location.address.city}}</td>
						<td>{{a.pricePerNight }}</td>
						<td>{{a.host.username }}</td>
					</tr>
				</table>
				<div v-if="!commentForSelectedApartment && isAnySelected">
					Selected apartment don't have any comment
				</div>
				<div v-if="commentForSelectedApartment">
					<table>
						<tr>
							<td>Apartment : </td>
							<td>{{commentForSelectedApartment.apartment.id}}</td>
						</tr>
						<tr>
							<td>Guest : </td>
							<td>{{commentForSelectedApartment.guest.username}}</td>
						</tr>
						<tr>
							<td>Comment : </td>
							<td>{{commentForSelectedApartment.text}}</td>
						</tr>
						
						<tr>
							<td>Rate : </td>
							<td>{{commentForSelectedApartment.rate}}</td>
						</tr>
					</table>
				</div>
			</div>
		</div>
	`,
	
	mounted(){
		
		axios
	        .get('rest/apartments/all')
	        .then(response => (response.data ? this.allApartments = response.data : this.allApartments = null))
	       
	    axios
	        .get('rest/comments/all')
	        .then(response => (response.data ? this.allComments = response.data : this.allComments = null))
			
	},
	
	
	methods : {
		
		showApartments : function(){
			this.commentForSelectedApartment = null;
			if(this.showAllApartments){
				this.showAllApartments = false;
				this.isAnySelected = false;
			}else{
				this.showAllApartments = true;
			}
				
		},
		
		showCommentForSelectedApartment : function(apartment){
				this.isAnySelected = true;
				this.commentForSelectedApartment = null;
				for(let comment of this.allComments){
					if(comment.apartment.id == apartment.id){
						this.commentForSelectedApartment = comment;
						break;
					}
				}
		}
		
		
	}
		
		
	
});