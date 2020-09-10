/**
 * 
 */
Vue.component('commentApartmentForGuestOrUnregistredUser',{
	data : function(){
		return {
			commentsShow : false,
			commentsForSelectedApartment : null,
			selectedApartment : null,
			allComments : null
		}
	},
	
	template : `
		<div v-show="commentsShow">
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
			<div v-if="commentsForSelectedApartment">
				<div v-if="!commentsForSelectedApartment.length">
					Selected apartment don't have any comment
				</div>
			</div>
		</div>
	
	`,
	
	mounted(){
	     this.changeBGImage();	
		this.$root.$on('showCommentsForGuestOrUnregistrateUser',(text1,text2,text3)=>{this.selectedApartment = text1,this.commentsShow = text2
			this.allComments = text3,this.showCommentForSelectedApartment()})
	},
	
	methods : {
		
		changeBGImage : function(){
			document.querySelector('body').style.backgroundImage = 'url(' + "images/apartment3.png" + ')';
		},
		
		showCommentForSelectedApartment : function(){
			this.commentsForSelectedApartment = [];
			for(let comment of this.allComments){
				if(comment.apartment.id == this.selectedApartment.id && comment.enable == true){
					this.commentsForSelectedApartment.push(comment);
				}
			}
	},
	}
	
	
});