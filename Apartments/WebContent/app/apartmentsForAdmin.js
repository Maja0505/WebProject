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
	    	selectedApartment:null,
	    	showComment:false
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
				
				<div v-if="selectedApartment">
					<p>Selektovan je apartman sa id {{selectedApartment.id}} 
						<button type="submit" v-on:click="editApartment()">Edit</button>
						<button type="submit" v-on:click="deleteApartment()">Delete</button>
						<button type="submit" v-on:click="changeStateOfShowComment()">Comments of apartment</button>
					</p>
					<div v-show="showComment">
						<div v-if="commentsForSelectedApartment">
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
						<div v-if="selectedApartment && nothaveAnyComment">
							Selected apartment don't have any comment
						</div>
					</div>
				</div>
			</div>
		</div>
	`,
	
	mounted(){
		
			
	},
	 
	
	methods : {
		
		changeStateOfShowComment: function(){
			if(!this.showComment){
				this.showComment = true;
			}else
				this.showComment = false;
		},
		
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
				this.selectedApartment = null;
				this.nothaveAnyComment = true;
			}		
		},
		
		showCommentForSelectedApartment : function(apartment){
				this.nothaveAnyComment = true;
				this.showComment = false;
				this.selectedApartment = apartment;
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