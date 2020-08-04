/**
 * 
 */
Vue.component("apartmentsForAdmin", {
	
	data: function () {
	    return {
	    	allApartments:null,
	    	allComments:null,
	    	showAllApartments:false,
	    	commentsForSelectedApartment:[],
	    	nothaveAnyComment:true,
	    	selectedAppartment:null
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
				<div v-if="selectedAppartment && nothaveAnyComment">
					Selected apartment don't have any comment
				</div>
				<div v-if="commentsForSelectedApartment">
							<p v-if="selectedAppartment"><label>Apartment : </label>
							<label>{{selectedAppartment.id}}</label></p>
					<table v-for="comment in commentsForSelectedApartment">
						<tr>
							<td>Guest : </td>
							<td>{{comment.guest.username}}</td>
						</tr>
						<tr>
							<td>Comment : </td>
							<td>{{comment.text}}</td>
						</tr>
						
						<tr>
							<td>Rate : </td>
							<td>{{comment.rate}}</td>
						</tr>
					</table>
				</div>
			</div>
		</div>
	`,
	
	mounted(){
		
			
	},
	 
	
	methods : {
		
		showApartments : function(){
			this.commentsForSelectedApartment = [];
			if(!this.showAllApartments)
				axios
			        .get('rest/apartments/all')
			        .then(response => (response.data ? this.allApartments = response.data : this.allApartments = null,
				   		 axios
			     	        .get('rest/comments/all')
			     	        .then(response => (response.data ? this.allComments = response.data : this.allComments = null,
			     	        					this.showAllApartments = true))))
			else{
				this.showAllApartments = false;
				this.isAnySelected = false;
				this.selectedAppartment = null;
				this.nothaveAnyComment = true;
			}		
		},
		
		showCommentForSelectedApartment : function(apartment){
				this.nothaveAnyComment = true;
				this.selectedAppartment = apartment;
				this.commentsForSelectedApartment = [];
				for(let comment of this.allComments){
					if(comment.apartment.id == apartment.id){
						this.commentsForSelectedApartment.push(comment);
						this.nothaveAnyComment = false;
					}
				}
		}
		
		
	}
		
		
	
});