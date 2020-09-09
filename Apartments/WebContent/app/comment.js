Vue.component("comment", {
	data: function () {
	    return {
	      comment:{},
	      emptyText:"",
	      emptyRate:"",
	      showAllApartments:false,
	      allApartments:[],
	      apartmentsOfMyReservations:[],
	      selectedApartment:null,
	      selectedApartmentId:null,
	      showCommentPart:false,
	      allComments:null,
	      maxId:0,
	      user:null,
	      showCommentForm : false
	      
	    }
},
		template: ` 
			<div v-if="showCommentForm" style="border-style: dotted;margin-top:2%;">
					
				<div>

				</div>
				
				<div>
					<table>
						<tr>
							<td>Text</td>
							<td><textarea v-model="comment.text" style="border-style: solid;border-width: 2px;" name="Text1" cols="60" rows="3" ></textarea></td>
							
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
						 <td colspan="2"><button v-on:click="addComment()" class="confirm_edit_button"  type="button" style="float:right;padding: 0px;">Sumbit comment</button></td>
						
						</tr>
					</table>
				</div>
			</div>
		  `,
		mounted() {

			
 	        this.$root.$on('comment',(text1,text2) => {this.selectedApartmentId = text1,this.showCommentForm = text2,this.getAllApartments()});
 	        this.getAllApartments();

			
	    

	    	        		  
		  },
		    
		methods: {
			getAllApartments:function(){
				if(this.showCommentForm){
					axios
			          .get('rest/users/currentUser')
			          .then(response => (response.data ? this.user = response.data : this.user = null))
			         
			          
			          
			        axios
			    	   .get('rest/apartments/all')
			    	       .then(response => (response.data ? this.allApartments = response.data : this.allApartments = null,
			    	        		this.getApartmentsOfMyReservations(),this.getSelectedAparmtnet()))
			        axios
			          .get('rest/comments/all')
			          .then(response => (response.data ? this.allComments = response.data : this.allComments = null))
			         
				}
			
			},
			getSelectedAparmtnet: function(){
				
				for(a of this.allApartments){
					if(a.id === this.selectedApartmentId){
						this.selectedApartment = a;
					}
				}
				console.log(this.user)
				console.log(this.allApartments)
				console.log(this.selectedApartment)
			},
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
			
			findMaxId : function(){
				for(let res of this.allComments){
	    			if(parseInt(res.id) > this.maxId){
	    				this.maxId = parseInt(res.id);
	    			}
	    		}
			},
			
			postComment: function(){
				
				this.findMaxId();
				
				this.maxId++;
				
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
		        		  
		        //this.$router.push('/')
	        	
	        }
		}
});