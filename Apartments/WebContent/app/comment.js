Vue.component("comment", {
	data: function () {
	    return {
	      comment:{},
	      emptyText:"",
	      emptyRate:"",
	      user:{}
	      
	    }
},
		template: ` 
		<html>
			<head>
			<title>Page Title</title>
			</head>
			
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
			
			</body>
			</html>
		  `
		,methods: {
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
				axios
		          .get('rest/users/currentUser')
		          .then(response => (response.data ? this.user = response.data : this.user = null , this.postComment()))
		          
		        		  
		          
			},
			postComment: function(){
	        	axios
		          .post('rest/comments/addComment',
		           JSON.stringify({"guest":this.user,"apartment":null,"text":''+this.comment.text,"rate":this.comment.rate}),
		           {
		        	  headers: {
				            'Content-Type': 'application/json',
				        }
		           })
		          .then(response => (toast('User ' + this.user.firstName + ' successed comment!'),
		        	 this.$router.push('/')))
	        	
	        }
		}
});