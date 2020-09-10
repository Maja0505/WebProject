function fixDate(reservations){
	for(var r of reservations){
		
			r.startDateOfReservation= new Date(parseInt(r.startDateOfReservation));
		
	}
	return reservations;
}
function fixOneDate(date){
	 return new Date(parseInt(date));
}
Vue.component("reservationsForGuest", {
	data: function () {
	    return {
		  allReservations:null,
		  user:null,
		  guestReservations:[],
		  selectedReservation:null,
		  showCommentForm:false,
	    }
	},
	
	template: `
<div>
	<div class="content-profile">
		 <form class="container-amenities" method="put">
					
			 	<h1 style="margin-left:15%;">RESERVATIONS</h1>
				<div>
					<div class="row" style="padding-left:15%;padding-right:15%;">
						<div class="column">
							<input style="visibility:hidden;border-radius: 0;width: 80%; margin-top:10%; padding: 10px;margin-right:0%;margin-left:0%;" type="text" placeholder="Search reservation by username..">
						 </div>
						 <div class="column">
							 <button v-on:click="sort()" style=" padding: 10px;margin-right:0%;margin-left:0%;margin-top:10%;float:right;width:40%;height:20%;" class="addBtn">Sort by price</button>
						  </div>
					</div>
				</div>
																
											
				<div style="margin-top:3%;">
					<div class="container-user-for-admin" v-for="g in guestReservations">
							<p><span >Reservation ID: {{g.id}}</span></p>
							 <div class="row">
							  	 <div class="column">
							   		<p>Apartment id: {{g.apartment.id}}</p>
							   	 </div>
							   	 <div class="column">
							    	<p>Guest: {{g.guest.username}}</p>
							  	  </div>
							 </div>
							 <div class="row">
							  		<div class="column">
							    		<p>Status: {{g.statusOfReservation}}</p>
							  		</div>
							   		<div class="column">
							    		<p>Full price: {{g.fullPrice}}</p>
							  		</div>
							 </div>
							 <div class="row">
							  		<div class="column">
							      		<p>Start date: {{g.startDateOfReservation | dateFormat('DD.MM.YYYY')}}</p>
							  		</div>
							   		<div class="column">
							    		<p>Number Of Nights: {{g.numberOfNights}}</p>
							  		</div>
							 </div>
							 
							  <div class="row">
							  		<div class="column">
							       		<label v-show = "(g.statusOfReservation == 'CREATED')">Reservation is created</label>
							       		<label v-show = "(g.statusOfReservation == 'ACCEPTED')" style="color:green;">Reservation is accepted</label>
							       		<label  v-show = "g.statusOfReservation == 'COMPLETED'">Reservation is completed</label>
							       		<label  v-show = "g.statusOfReservation == 'REJECTED'" style="color:red;">Reservation is rejected</label>
							       		<label  v-show = "g.statusOfReservation == 'WITHDRAWAL'" style="color:red;">Reservation is canceled</label>
							  		</div>
							
							   		<div class="column">
								        <button class="cancel_edit_button"  v-on:click="changeState(g)" v-show ="(g.statusOfReservation == 'ACCEPTED' || g.statusOfReservation == 'CREATED')"  type="button" style="padding: 0px;">Cancel reservation</button>
								       	<button class="cancel_edit_button"  v-on:click="openCommentForm(g)" v-show ="(g.statusOfReservation == 'REJECTED' || g.statusOfReservation == 'COMPLETED')"  type="button" style="padding: 0px;">Comment apartment</button>
							 		</div>
							  </div>
							
								<comment></comment>
							
							</div>
							 
						</div>
																
		</form>
	</div>
</div>
	
	`,
	
	mounted(){
		this.changeBGImage();    
        this.$root.$on('reservationsForGuest',(text) => {this.showReservations()});
        this.showReservations()    //PROVERITI
	},
	
	methods:{
		
		changeBGImage : function(){
			document.querySelector('body').style.backgroundImage = 'url(' + "images/apartment3.png" + ')';
		},
		
		openCommentForm: function(reservation){
			
			if(this.showCommentForm){
				this.$root.$emit('comment',reservation.apartment.id,false);
				this.showCommentForm = false;
				
			}else{
				this.$root.$emit('comment',reservation.apartment.id,true);
				this.showCommentForm = true;
			}
		},
		showReservations : function(){
		
			axios
		        .get('rest/users/currentUser')
		        .then(response => (response.data ? this.user = response.data : this.user = null,
	        		axios
	    	        .get('rest/reservations/all')
	    	        .then(response => (response.data ? this.allReservations = fixDate(response.data) : this.allReservations = null,
	    	        		this.filteredAllReservations()))))
	  
		},
		
		
		filteredAllReservations : function(){
			this.guestReservations = [];
			for(let userReservation of this.user.reservations){
				for(let reservation of this.allReservations){
					if(userReservation.id == reservation.id){
						this.guestReservations.push(reservation);
					}
				}
			}
		},
		
		selectReservation : function(reservation){
			this.selectedReservation = reservation;
		},
		
		changeState : function(r){
			this.selectedReservation = r;
			this.selectedReservation.statusOfReservation = 'WITHDRAWAL';
			
			let index = this.guestReservations.indexOf(r)
			if(index > -1){
				this.guestReservations[index] = this.selectedReservation
			}
			
			axios
	        	.put('rest/reservations/updateReservation',this.selectedReservation)
			
		},
		sort(){
			if(this.currentSortDir == 'asc'){
				this.currentSortDir = 'desc';
			}else
				this.currentSortDir = 'asc'
			
			if(this.guestReservations){
				this.guestReservations = this.guestReservations.sort((a,b) => {
			      let modifier = 1;
			      if(this.currentSortDir === 'desc') modifier = -1;
			      if(a['fullPrice'] < b['fullPrice']) return -1 * modifier;
			      if(a['fullPrice'] > b['fullPrice']) return 1 * modifier;
			      return 0;
			    });
				this.searchText = this.searchText;
			}
		}
		
	},filters: {

		dateFormat: function (value, format) {

		var parsed = moment(value);

		return parsed.format(format);

		}

	},
	

});