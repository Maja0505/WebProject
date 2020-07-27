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
		    	<table>
		              <tr>
		              	<td>Username: </td>
		                <td><input type="text" v-model="username"></td>  
		                <td style="color:Red"><b>{{wrong_username}}</b></td>          
		              </tr>
		              
		              <tr>
		              	<td>Password: </td>
		                <td><input type="password" v-model="password"></td>
		                <td style="color:Red"><b>{{wrong_password}}</b></td>       
		              </tr>
		              
		              <tr>
		                <td><button v-on:click="login(username,password)">Login</button></td>
		              </tr>
		          </table> 
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
							 axios
					          .post('rest/users/login',this.users[user])
					          .then(response => (toast('User ' + this.users[user].firstName + ' successed login!')))
							this.$root.$emit('loginUser',this.users[user].typeOfUser);
							this.$router.push('/')
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
					
			}
		}
});