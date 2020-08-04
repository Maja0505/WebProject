Vue.component("comment", {
	data: function () {
	    return {
	      comment:{},
	      emptyText:"",
	      emptyRate:"",
	      showAllApartments:false,
	      allApartments:null,
	      apartmentsOfMyReservations:[],
	      selectedApartment:null,
	      showCommentPart:false,
	      allComments:null,
	      maxId:0,
	      user:null
	      
	    }
},
		template: ` 
			<div>
			
				<p>Show your apartments</p>
				<button type="submit" v-on:click="showAll()" >Show your apartments</button>
				
				<div v-show="showAllApartments">
					<table border = "1" class="apartmentsOfMyReservations">
						<tr bgcolor="lightgrey">
							<th>Location</th>
							<th>Price Per Night</th>
							<th>Host</th>
							<th>Reservation</th>
						</tr>
						<tr v-for="a in apartmentsOfMyReservations"   v-on:click="selectApartment(a)">
							<td>{{a.location.address.city}}</td>
							<td>{{a.pricePerNight }}</td>
							<td>{{a.host.username }}</td>
							<td v-for="r in a.reservations">
								<div>
									<td>id : {{r.id}},    </td>
									<td>statusOfReservation : {{r.statusOfReservation}}</td>
								</div>
							</td>
						</tr>
					</table>
				</div>
				
				<div v-show="showCommentPart">
					<table>
						<tr>
							<td>Text</td>
							<td><input type="text" v-model="comment.text" /></td>
							<td>{{emptyText}}</td>
						</tr>
						<tr>
							<td>Rate:</td>
							<td>
									<input type="radio" id="one" name="rate" value="1" v-model="comment.rate">
									<label for="1">1</label>
									<input type="radio" id="two" name="rate" value="2" v-model="comment.rate">
									<label for="2">2</label>
				                    <input type="radio" id="three" name="rate" value="3" v-model="comment.rate">
									<label for="3">3</label>
				                    <input type="radio" id="four" name="rate" value="4" v-model="comment.rate">
									<label for="4">4</label>
				                    <input type="radio" id="five" name="rate" value="5" v-model="comment.rate">
									<label for="5">5</label>
							</td>	
							<td>{{emptyRate}}</td>
						</tr>
						<tr>
						 <td><button v-on:click="addComment()">Sumbit comment</button></td>
						</tr>
					</table>
				</div>
			</div>
		  `,
		mounted() {
			axios
	          .get('rest/users/currentUser')
	          .then(response => (response.data ? this.user = response.data : this.user = null, 
	        	   axios
	    	          .get('rest/apartments/all')
	    	          .then(response => (response.data ? this.allApartments = response.data : this.allApartments = null,
	    	        		  this.getApartmentsOfMyReservations()))))
	        axios
	          .get('rest/comments/all')
	          .then(response => (response.data ? this.allComments = response.data : this.allComments = null))
	    	        		  
		  },
		    
		methods: {
			
			getApartmentsOfMyReservations : function(){
				
				let addApartment = false;
			
				for(let apartment of this.allApartments){
					for(let apartmentReservation of apartment.reservations){
						if(addApartment){
							this.apartmentsOfMyReservations.push(apartment);
							break;
						}
						for(let userReservation of this.user.reservations){
							if(userReservation.id == apartmentReservation.id && (apartmentReservation.statusOfReservation == "COMPLETED" || apartmentReservation.statusOfReservation == "REJECTED")){
								 addApartment = true;
								 break;
							}
						}
					}
				}
				
			},
			
			selectApartment : function(apartment){
				this.selectedApartment = apartment;
				this.emptyText = "";
				this.emptyRate = "";
				this.showCommentPart = true;
			},
			
			showAll : function(){
				this.emptyText = "";
				this.emptyRate = "";
				this.showCommentPart = false;
				if(this.showAllApartments){
					this.showAllApartments = false;
				}else
					this.showAllApartments = true;
			},
			
			addComment: function() {

				this.emptyText = "";
				this.emptyRate = "";
				
				if(!this.comment.text){
					this.emptyText = "Text can't be empty";
					return;
				} 
				if(!this.comment.rate){
					this.emptyRate = "Rate can't be empty";
					return;
				}
				
				this.postComment();
		          
			},
			
			postComment: function(){
				
				if(this.allComments.length != 0){
					this.maxId = parseInt(this.allComments[this.allComments.length - 1].id) + 1;
				}else{
					this.maxId = 1;
					  }
				
				var objComment = {"id":this.maxId,"guest":this.user,"apartment":this.selectedApartment,"text":''+this.comment.text,"rate":this.comment.rate,"enable":true};
				
	    	    var stringApartment = JSON.stringify(this.selectedApartment);
	    	    var objApartment = JSON.parse(stringApartment);
	    	    objApartment['comments'].push(objComment);
				
	        	axios
		          .post('rest/comments/addComment',JSON.stringify(objComment),
		        		  {
		        	  headers: {
				            'Content-Type': 'application/json',
				        		}
		        		  })
		        axios
		          .put('rest/apartments/updateApartment',JSON.stringify(objApartment),
		        		  {
		        	  headers: {
				            'Content-Type': 'application/json',
				        		}
		        		  })		  
		        		  
		        this.$router.push('/')
	        	
	        }
		}
});