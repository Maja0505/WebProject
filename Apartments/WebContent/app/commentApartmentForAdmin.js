/**
 * 
 */
Vue.component('commentForAdmin',{
	data : function(){
		return {
			commentsShow : false,
			commentsForSelectedApartment : [],
			selectedApartment : null,
			allComments : null,
			enableComments:[]

		}
	},
	
	template : `
	<div>
		<div v-show="commentsShow">
			<div class="comments-apartment">
				<div class="row">
					<label class="txt7">Comments of aparmtnet</label>
				</div>
				<div class="row" v-for="c in enableComments" v-if="c.enable && c.guest">
					
					<label class="txt8" style="margin-left:5%;">Guest : {{c.guest.username}}</label><br>
					<label class="txt8" style="margin-left:5%;">Rate : {{c.rate}}</label><br>
					<label class="txt8" style="margin-left:5%;">Comment : {{c.text}}</label>
					<hr>
				</div>
				<div class="row" v-if="enableComments.length == 0">
					<label class="txt8" style="margin-left:5%;">Apartment doesn't have any comment</label><br>
				</div>
			</div>
		</div>
	</div>
		
	
	`,
	
	mounted(){
	    this.changeBGImage();	
		this.$root.$on('showComentForAdmin',(text1,text2,text3)=>{this.selectedApartment = text1,this.commentsShow = text2
		this.allComments = text3,this.showCommentForSelectedApartment()})
		this.$root.$on('showCommentForAdmin',(text) =>{this.commentsShow = true,this.commentsForSelectedApartment = text,this.getEnableComments()});
	},
	
	methods : {
		
		changeBGImage : function(){
			document.querySelector('body').style.backgroundImage = 'url(' + "images/apartment3.png" + ')';
		},
		
		showCommentForSelectedApartment : function(){
			this.commentsForSelectedApartment = [];
			for(let comment of this.allComments){
				if(comment.apartment.id == this.selectedApartment.id){
					this.commentsForSelectedApartment.push(comment);
				}
			}
	},
	getEnableComments:function(){
		for(let comment of this.commentsForSelectedApartment){
			if(comment.enable == true){
				this.enableComments.push(comment);
			}
		}
	}
	}
	
	
});