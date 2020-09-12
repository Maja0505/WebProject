Vue.component("commentApartmentForHost", {
	data: function () {
	    return {
	    	selectedApartment:false,
	    	showComment:false,
	    	allComment:null,
	    	commentsForSelectedApartment:[]
	    }
},
		template: ` 
		<div>
			<div v-show="showComment">
				<div class="comments-apartment">
					<div class="row">
						<label class="txt7">Comments of aparmtnet</label>
					</div>
					<div class="row" v-for="c in commentsForSelectedApartment" v-if="c.guest">
						
						<label class="txt8" style="margin-left:5%;">Guest : {{c.guest.username}}</label><br>
						<label class="txt8" style="margin-left:5%;">Rate : {{c.rate}}</label><br>
						<label class="txt8" style="margin-left:5%;">Comment : {{c.text}}</label><br>
						<label class="txt8" style="margin-left:5%;">Enable comment :</label> <input type="checkbox" id="enable" name="enable" v-model="c.enable" @change="update(c)">
						<hr>
					</div>
					<div class="row" v-show="commentsForSelectedApartment.length == 0">
						<label class="txt8" style="margin-left:5%;">Apartment doesn't have any comment</label><br>
					</div>
				</div>
			</div>
		</div>
		  `
		,		mounted () {
			this.changeBGImage();
	        this.$root.$on('showComment',(text,text2) => {this.selectedApartment = text,this.showComment = text2,this.getAllComment()});
			this.$root.$on('commentApartmentForHost',(text) =>{this.showComment = true,this.commentsForSelectedApartment = text});

		},methods:{
			
			changeBGImage : function(){
				document.querySelector('body').style.backgroundImage = 'url(' + "images/apartment3.png" + ')';
			},
			
			getAllComment: function(){
				//ukoliko nema selektovanog nista ne dobavljamo
				if(this.selectedApartment){
					 axios
	    	          .get('rest/comments/all')
	    	          .then(response => (response.data ? this.allComment = response.data : this.allComment = null,
	    	        		  this.getCommentForSelectedApartment()))
				}
			},
			//komentari samo za apartman koji je selektovan
			getCommentForSelectedApartment: function(){
				this.commentsForSelectedApartment = [];
				this.commentsForSelectedApartment = this.allComment.filter(comment => {
			        return comment.apartment.id == this.selectedApartment.id})
			},
			update:function(comment){
			       axios
		       	   .put('rest/comments/updateComment',comment)
			}
		}
});