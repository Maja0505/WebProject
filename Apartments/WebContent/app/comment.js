Vue.component("comment", {
	data: function () {
	    return {
	      comment:{},
	      emptyText:"",
	      emptyRate:""
	      
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
			<td><input type="text" model="comment.text" /></td>
			</tr>
			<td>Rate:</td>
			<td>
	
					<input type="radio" id="one" name="rate" value="1" model="comment.rate">
					<label for="1">1</label>
					<input type="radio" id="two" name="rate" value="2" v-model="comment.rate">
					<label for="2">2</label>
                    <input type="radio" id="three" name="rate" value="3" model="comment.rate">
					<label for="3">3</label>
                    <input type="radio" id="four" name="rate" value="4" model="comment.rate">
					<label for="4">4</label>
                    <input type="radio" id="five" name="rate" value="5" model="comment.rate">
					<label for="5">5</label>
					</td>	
			</table>
			
			</body>
			</html>
		  `
		,methods: {
			addComment: function(text,rate) {
	
				this.text = text;
				this.rate = rate;
				this.emptyText = "";
				this.emptyRate = "";
				
				if(!text){
					this.wrong_username = "Text can't be empty";
				} 
				if(!rate){
					this.wrong_password = "Rate can't be empty";
					return;
				}
				
				
					
			}
		}
});