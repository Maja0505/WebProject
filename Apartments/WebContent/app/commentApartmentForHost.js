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
				<div v-show="showComment" v-if="selectedApartment">
				<p>Comment for apartment {{selectedApartment.id}}</p>
				<label v-show="commentsForSelectedApartment.length == 0">No comments on this apartment</label>
				<table class="commentsForSelectedApartment" v-show="commentsForSelectedApartment.length != 0">
					<tr bgcolor="lightgrey">
						<th>Guest</th>
						<th>Text</th>
						<th>Rate</th>
						<th>Enable</th>
						<th>Show comment</th>
					</tr>
					
					<tr v-for="c in commentsForSelectedApartment">
						<td>{{c.guest.username }}</td>
						<td>{{c.text }}</td>
						<td>{{c.rate }}</td>
						<td>{{c.enable}}</td>
						<td> <input type="checkbox" id="enable" name="enable" v-model="c.enable" @change="update($event)"></td>

					</tr>
				</table>
				</div>

			</div>
		  `
		,		mounted () {
	        this.$root.$on('showComment',(text,text2) => {this.selectedApartment = text,this.showComment = text2,this.getAllComment()});
		},methods:{
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
			update:function(){
				
			}
		}
});