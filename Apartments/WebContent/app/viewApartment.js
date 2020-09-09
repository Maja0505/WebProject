/**
 * 
 */
Vue.component('viewApartment',{
	data : function(){
		return {
			selectedApartment:null,
			currentUser:null,
			slideIndex : 1,
			showReservationForm:false,
		}
	},
	
	
	template : `
		<div>
			<div v-if="selectedApartment" class="content-profile">
				
				<div v-if="currentUser==null || currentUser.typeOfUser=='GUEST'">
					<div class="container-apartment-view">
						<div class="row" style="margin-top:2%;">
							<label class="txt3">Apartment {{selectedApartment.name}}</label><br>
						</div>
						<div class="container" style="width:80%;height:27%;top:0px;padding:0;">
							<div class="mySlides" style="width:100%;height:100%;" v-for="image in selectedApartment.images">
								<img :src="image"  style="width:100%;height:100%;">
							</div>
							<a class="prev" v-on:click="plusSlides(-1)">&#10094;</a>
				    		<a class="next" v-on:click="plusSlides(1)" style="left:95%;">&#10095;</a>
		    				<div class="caption-container" style="width:100%;height:5%;">
								<p id="caption"></p>
							</div>
							<div class="scroll-menu-images">
								<div class="column-for-scroll" style="width:20%;height:100%;" v-for="(item, index) in selectedApartment.images">
									<img class="demo cursor" :src="item" style="width:100%;height:100%;"   v-on:click="currentSlide(index+1)" alt="The Woods">
								</div>
							</div> 
						</div>
						<div class="row" style="margin-top:20%;">
							<div class="moreInfo-apartment">
								<div class="row">
										<label class="txt7" style="text-align:center;">More info</label>
								</div>
								<div class="row">
										<label class="txt8">City:  {{selectedApartment.location.address.city}}</label><br>
										<label class="txt8">Street and number:  {{selectedApartment.location.address.street}} {{selectedApartment.location.address.streetNumber}}</label><br>
										<label class="txt8">Host: {{selectedApartment.host.username}}</label><br>
										<label class="txt8">Price per night: {{selectedApartment.pricePerNight}} $</label><br>
										<label class="txt8">Check in time: {{selectedApartment.checkInTime}}h   Check out time: {{selectedApartment.checkOutTime}}h</label>
									</div>
							</div>
						</div>
						<div class="row" style="height:15%;">
							<div class="column50-in-form-search-apartment" style="padding=0px;">
								<div class="comments-apartment">
									<div class="row">
										<label class="txt7">Comments of aparmtnet</label>
									</div>
									<div class="row" v-for="c in selectedApartment.comments" v-if="c.enable">
										<label class="txt8" style="margin-left:5%;">Guest : {{c.guest.username}}</label><br>
										<label class="txt8" style="margin-left:5%;">Rate : {{c.rate}}</label><br>
										<label class="txt8" style="margin-left:5%;">Comment : {{c.text}}</label><br><br>
									</div>
									<div class="row" v-if="selectedApartment.comments.length == 0">
										<label class="txt8" style="margin-left:5%;">Apartment doesn't have any comment</label><br>
									</div>
								</div>
							</div>
							<div class="column50-in-form-search-apartment">
								<div class="amenitie-apartment">
									<div class="row">
										<label class="txt7">Amnenities</label>
									</div>
									<div class="row" v-for="a in selectedApartment.amenities" v-if="a.flag==0">
										<label class="txt8" style="margin-left:5%;">{{a.name}}</label><br>
									</div>
									<div class="row" v-if="selectedApartment.amenities.length == 0">
										<label class="txt8" style="margin-left:5%;">Apartment doesn't have any amenitie</label><br>
									</div>
								</div>
							</div>
						</div>
						<div class="row" v-show="currentUser.typeOfUser=='GUEST'" style="width:50%;height:4%;margin-left:25%;">
							<button type="button" class="form-btn" v-on:click="showReservation()">BOOK APARTMENT</button>
						</div>
						<div class="row" >
							<reservation></reservation>
						</div>
					</div>
				</div>
					 
				
				<div v-if="currentUser && currentUser.typeOfUser=='ADMIN'">
					<p style="text-align:center" class="txt4">You picked a apartment  {{selectedApartment.name}} <br>Price per night is {{selectedApartment.pricePerNight}}$ <br> 
						<button type="submit" v-on:click="moreInfo()">More info</button>
						<button type="submit" v-on:click="deleteApartment()">Delete</button>
						<button type="submit" v-on:click="showComments()">Comments of apartment</button>
					</p>
					
					<editApartment></editApartment>
					<commentForAdmin></commentForAdmin>
				</div>
				
			</div>
		</div>

	`,
	
	mounted(){
		this.$root.$on('viewApartment',(text) => {this.selectedApartment = text});
		this.$root.$on('showReservationFormInView',(text)=>{this.showReservationForm = false})
		axios
        	.get('rest/users/currentUser')
         		.then(response => (response.data ? this.currentUser = response.data : this.currentUser = null))
		axios
          	.get('rest/apartments/currentSelectedApartment')
        		.then(response => (this.selectedApartment = response.data,this.showSlides(this.slideIndex)))
       this.changeBGImage(); 		
	},
	
	methods : {
		
		changeBGImage : function(){
			document.querySelector('body').style.backgroundImage = 'url(' + "images/apartment3.png" + ')';
		},
		
		showReservation : function(){
			if(!this.showReservationForm){
				this.showReservationForm = true;
				this.$root.$emit('showReservationPart',this.selectedApartment,true);
			}else{
				this.showReservationForm = false;
				this.$root.$emit('showReservationPart',null,false);
			}
		},
		
		deleteApartment : function(){
			this.$root.$emit('showEditForm',{},false);
			this.$root.$emit('showComentForAdmin',{},false,[]);
			
			for(let apartment of this.allApartments){
				if(apartment.id == this.selectedApartment.id){
					apartment.flag = 1;
					break;
				}
			}
			
			this.selectedApartment.flag = 1;
			this.updateApartment(this.selectedApartment);
			this.selectedApartment = null;
		},
		
		showComments : function(){
			this.$root.$emit('showEditForm',{},false);
			this.$root.$emit('showComentForAdmin',this.selectedApartment,true,this.allComments);
		},
		
		moreInfo : function(){
			this.$root.$emit('showEditForm',this.selectedApartment,true);
			this.$root.$emit('showComentForAdmin',{},false,[]);
		},
		
		updateApartment : function(newApartment){
			axios
	          .put('rest/apartments/updateApartment',newApartment)
		},
		
		plusSlides(n) {
			this.showSlides(this.slideIndex += n);
		},
		
		currentSlide(n) {
					this.showSlides(this.slideIndex = n);
				},
				
		showSlides(n) {
				  var i;
				  var slides =this.$el.querySelectorAll(".mySlides");
				  var dots = this.$el.querySelectorAll(".demo");
				  var captionText = this.$el.querySelectorAll("#caption");
				  if (n > slides.length) {this.slideIndex = 1}
				  if (n < 1) {this.slideIndex = slides.length}
				 
				  this.$nextTick(function(){
					  for (i = 0; i < slides.length; i++) {
						    slides[i].style.display = "none";
						  }
				      for (i = 0; i < dots.length; i++) {
						    dots[i].className = dots[i].className.replace(" active", "");
					      }
				      
					  this.$el.querySelectorAll(".mySlides")[this.slideIndex-1].style.display = "block";
					  this.$el.querySelectorAll(".demo")[this.slideIndex-1].className += " active";
					  this.$el.querySelectorAll("#caption").innerHTML =  this.$el.querySelectorAll(".demo")[this.slideIndex-1].alt;	  
					  
				  })
				


		}
		
	}
})