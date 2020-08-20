Vue.component("login", {
	data: function () {
		 return {
			  users: null,
		      username: "",
		      password: "",
		      wrong_username: "",
		      wrong_password: ""
		    }
},
		template: ` 
		    <div>
		    	<div  class="box-login">
		    		<label class="text-center-login">Login</label>
		    	<table class="table-login">
		              <tr>
		              	<div  class="input-container-login">
		              	<td>Username: </td>
		                <td><input type="text" v-model="username"><p class="small-login-error">{{wrong_username}}</p></td> 
		                </div> 
		              </tr>
		              		              
		              <tr>
		              	<div class="input-container-login">
			              	<td>Password: </td>
			                <td><input type="password" v-model="password"><p class="small-login-error">{{wrong_password}}</p></td>
		                </div>
		              </tr>
		              
		              <tr>
		                <td><button v-on:click="login(username,password)" class="btn-login">Login</button></td>
		              </tr>
		          </table> 
		        </div>
		          
		    </div>
		`,
		mounted () {
        axios
          .get('rest/users/all')
          .then(response => (this.users = response.data))
		},
		methods: {
			login: function(username,password) {
	
				this.username = username;
				this.password = password;
				
				this.wrong_username = "";
				this.wrong_password = "";
				
				if(!username){
					this.wrong_username = "Username can't be empty";
				} 
				if(!password){
					this.wrong_password = "Password can't be empty";
					return;
				}
				for(user in this.users){
					if(this.users[user].username == username){
						if(this.users[user].password == password){
							 
							let curentUser = this.users[user];
							 axios
					          .post('rest/users/login',this.users[user])
					          .then(response => (toast('User ' + this.users[user].firstName + ' successed login!'),
					        		  this.$root.$emit('changeCurentUser',curentUser),this.$router.push('/')))
							//u slucaju potrebe da ovaj gornji post nece da odradi kako treba tj.
					        //odradi ga pre get zahteva iz homePage.js potrebna je ova donja linija  
					        //this.$root.$emit('loginUser',this.users[user].typeOfUser);
					        
							
							return;
						}else{
							this.wrong_password = "Password is not correct!";
							return;
						}
					}
				}
				if(username){
					this.wrong_username = "Username does not exist!";
					this.wrong_password = "";
				}
					
			}/*,
			whitch_user : function(user){
				if(user.typeOfUser == "ADMIN"){
					this.$router.push('admin');
				}else if(user.typeOfUser == "GUEST"){
					this.$router.push('guest');
				}else{
					this.$router.push('host');
				}
			}*/
		
		}
});