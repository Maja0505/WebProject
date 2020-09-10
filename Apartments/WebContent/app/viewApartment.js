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
			allComments : null,
			commentForApartment: [],
			image:null,
			imagesForApartment:[],
			imagesForApartmentForConvert:[],
			apartmentImagesLength:0,
			maxId:0,
     		sendRequest:false,

		}
	},
	
	
	template : `
		<div>
			<div id="myOverlay" class="overlay" v-show="sendRequest">
				<div class="loader" ></div>
				<div><label style="margin-top:420px;">Wait a moment..</label></div>
			</div>
			<div v-if="selectedApartment" class="content-profile" v-show="!sendRequest">
				
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
									<div class="row" v-for="c in commentForApartment" v-if="c.enable && c.guest">
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
						<div class="row" v-show="currentUser && currentUser.typeOfUser=='GUEST'" style="width:50%;height:4%;margin-left:25%;">
							<button type="button" class="form-btn" v-on:click="showReservation()">BOOK APARTMENT</button>
						</div>
						<div class="row" >
							<reservation></reservation>
						</div>
					</div>
				</div>
					 
				
				<div v-if="currentUser && currentUser.typeOfUser=='ADMIN'">
					<div class="container-apartment-view"  style="background:none;">
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
								<editApartment></editApartment>
							</div>
						</div>
						<div class="row" style="height:15%;">
							<div class="column50-in-form-search-apartment" style="padding=0px;">
								<div class="comments-apartment">
									<div class="row">
										<label class="txt7">Comments of aparmtnet</label>
									</div>
									<div class="row" v-for="c in commentForApartment" v-if="c.enable && c.guest">
										
										<label class="txt8" style="margin-left:5%;">Guest : {{c.guest.username}}</label><br>
										<label class="txt8" style="margin-left:5%;">Rate : {{c.rate}}</label><br>
										<label class="txt8" style="margin-left:5%;">Comment : {{c.text}}</label>
										<hr>
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
						<div class="row" style="margin-top:2%;">
							<div class="moreInfo-apartment">
								<h3>Do you want to add new photo?</h3>
								<div class="row">
										
									<div class="column33-in-form-search-apartment">
										<div class="container-form-input">
												<label for="image_uploads" class="form-btn" type="button">ADD IMAGES</label>
												<input type="file" style="opacity: 0;" @change="addImage" name="image_uploads" id="image_uploads"  accept="image/*" multiple><span class="focus-form-input"></span>

										</div>
								 	</div>
									<div class="column33-in-form-search-apartment">
										<div class="container-form-input">
												<button type="button" class="form-btn" v-on:click="deleteImage()" v-bind:disabled="imagesForApartment.length<1">DELETE LAST IMAGE</button>

										</div>
								    </div>
									<div class="column33-in-form-search-apartment">
										<div class="container-form-input">
												<button type="button" class="form-btn" v-on:click="getAllApartments_for_Image()">SUBMIT</button>
										</div>
									</div>
							 </div>
							 <div class="row" style="height:20%;" v-if="imagesForApartment.length>0">
								<div class="apartment-images" style="margin-left:12.5%;">
									<ul>
										<li v-for="img in imagesForApartment">
											<img :src="img" style="width:200px;height:100px;"></img>
											<span style="visibility:hidden;">relative</span> path : {{img}}
										</li>
									</ul>
								</div>
							</div>
								
							</div>
						</div>
						
						<div class="row"  style="width:50%;height:4%;margin-left:25%;margin-top:2%;">
							<button type="button" class="form-btn" v-on:click="getAllApartments_for_Admin()">DELETE APARTMENT</button>
						</div>
					</div>
				
					
					
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
        		.then(response => (this.selectedApartment = response.data,this.showSlides(this.slideIndex),
        			this.apartmentImagesLength = response.data.images.length,
        			 axios
        			  .get('rest/comments/all')
        		         .then(response => (response.data ? this.allComments = response.data : this.allComments = null,this.getCommentForApartment()))))
       
       this.changeBGImage();
	},
	
	methods : {
		getCommentForApartment(){
			for(comment of this.selectedApartment.comments){
				for(c of this.allComments ){
					if(comment.id === c.id){
						this.commentForApartment.push(c);
					}
				}
			}
		},
		getAllApartments_for_Admin(){
			axios
	    	  .get('rest/apartments/all')
	          .then(response => (response.data ? this.allApartments = response.data : this.allApartments = null,this.deleteApartment(),this.$router.push('/admin/allApartments')))

		},
		getAllApartments_for_Image(){
			axios
	    	  .get('rest/apartments/all')
	          .then(response => (response.data ? this.allApartments = response.data : this.allApartments = null,this.convertImagesFromBlobToBase64(),this.uploadImages()))

		},
		
		
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
				


		},
		addImage : function(e){
			
			let images = e.target.files;
			
			for(img of images){
				this.imagesForApartment.push(URL.createObjectURL(img))
				this.imagesForApartmentForConvert.push(img)
			}

		},
		deleteImage : function(){
			if(this.imagesForApartment.length>0){
				this.imagesForApartment.splice(-1,1);
				this.imagesForApartmentForConvert.splice(-1,1);					
			}
		},
		convertImagesFromBlobToBase64 : function(){
			
			var i = this.apartmentImagesLength ;
			let promises = [];
			for(image of this.imagesForApartmentForConvert){
				promises.push(new Promise((resolve,reject) => {
					var reader = new FileReader();
					reader.readAsDataURL(image); 
					reader.onloadend =  function() {
						 arrayImageString.push(reader.result);
					 }
				}
				))
				//stavljanje slike u listu slika od apartmana
				//var stringApartment = JSON.stringify(this.selectedApartment);
				//var objApartment = JSON.parse(stringApartment);
			
				//objApartment['images'].push("images/" + this.selectedApartment.id + "-" + ++i + ".png");
				 this.selectedApartment.images.push("images/" + this.selectedApartment.id + "-" + ++i + ".png");
			}
			return Promise.all(promises)
		},
		
		uploadImages: function(){
			
			
			  objApartment = {"id":''+ this.selectedApartment.id, "name":''+ this.selectedApartment.name,"typeOfApartment": this.selectedApartment.typeOfApartment,"numberOfRooms":''+ this.selectedApartment.numberOfRooms,"numberOfGuests":''+ this.selectedApartment.numberOfGuests,"location":this.selectedApartment.location,"dateOfIssue":this.dateOfIssue,"availabilityByDates":this.dateOfIssue,"host":this.loggedUser,"comments": [],"images":this.selectedApartment.images,"pricePerNight":this.selectedApartment.pricePerNight,"checkInTime":''+this.selectedApartment.checkInTime,"checkOutTime":''+this.selectedApartment.checkOutTime,"statusOfApartment":'INACTIVE',"amenities":[],"reservations":[]}
			  

			  
			 //dodajemo u listu svih apartmana
			  axios
		         .put('rest/apartments/updateApartment',JSON.stringify(objApartment),
		       		  {
	 		        	headers: {
	 		        		'Content-Type': 'application/json;charset=UTF-8',
			        			}
		       		  }
		         )
		    this.sendRequest = true;
			document.getElementById('navigationMenu').style.visibility='hidden';
		         
	 	     axios
	 	     	.post('rest/apartments/saveUpdatedImages/' + this.selectedApartment.id + '/'+ this.apartmentImagesLength,JSON.stringify(arrayImageString),
		       		  {
		        	headers: {
		        		'Content-Type': 'application/json'
		        			}
		       		  })
		       	.then(response => {
		       		alert('Success update apartment!');
		    		this.sendRequest = false;
		    		document.getElementById('navigationMenu').style.visibility='visible';

	         });	
	}
		
	}
})