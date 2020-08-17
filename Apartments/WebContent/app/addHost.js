/**
 * 
 */
Vue.component("addHost",{
	data : function(){
		return {
			showAddHostPart:false,
			user:{},
		    users:{},
		    confirmPassword:"",
		    errorFirstName:"",
		    errorLastName:"",
		    errorGender:"",
		    errorUsername:"",
		    errorPassword:"",
		    errorConfirmPassword:""
		}
	},
	
	template : `
			<div>
				<button type="submit" v-on:click="changeShowAddHostPart()">Add Host</button>
				
				<div v-if="showAddHostPart">
					<table>
						<tr>
							<td>First name:</td>
							<td><input name="FirstName" type="text" v-model="user.firstName"/></td>
							<td>{{errorFirstName}}</td>
						</tr>
						<tr>
							<td>Last name:</td>
							<td><input name="LastName" type="text" v-model="user.lastName"/></td>
							<td>{{errorLastName}}</td>
						</tr>
						<tr>
							<td>Gender:</td>
							<td>
							<input type="radio" id="male" name="gender" value="MALE" v-model="user.gender">
							<label for="male">Male</label>
							<input type="radio" id="female" name="gender" value="FEMALE" v-model="user.gender">
							<label for="female">Female</label>
							</td>	
							<td>{{errorGender}}</td>				
						</tr>
						<tr>
							<td>Username:</td>
							<td><input name="Username" type="text" v-model="user.username"/></td>
							<td>{{errorUsername}}</td>
						</tr>		
						<tr>
							<td>Password:</td>
							<td><input name="Password" type="password" v-model="user.password"/></td>
							<td>{{errorPassword}}</td>
						</tr>
						<tr>
							<td>ConfirmPassword:</td>
							<td><input name="ConfirmPassword" type="password" v-model="confirmPassword"/></td>
							<td>{{errorConfirmPassword}}</td>
						</tr>
						<tr>
							<td colspan="3"><button v-on:click="checkForm(user, confirmPassword)">Add new host</button></td>
						</tr>
					</table>
				</div>
			</div>
	`,

	methods : {
		changeShowAddHostPart : function(){
			if(!this.showAddHostPart){
				this.showAddHostPart = true;
			}else{
				this.errorFirstName = "";
			    this.errorLastName = "";
		        this.errorGender = "";
		        this.errorUsername = "";
		        this.errorPassword = "";
		        this.errorConfirmPassword = "";
		        this.confirmPassword = "";
		        this.user = {};
		        this.users = {};
				this.showAddHostPart = false;	
			}			
		},
		
		checkForm : function (user, confirmPassword) {
			this.errorFirstName = "";
		    this.errorLastName = "";
	        this.errorGender = "";
	        this.errorUsername = "";
	        this.errorPassword = "";
	        this.errorConfirmPassword = "";
			this.user = user;
			this.confirmPassword = confirmPassword;
			if(!user.firstName){
				this.errorFirstName = "First name can't be empty";
			}
			if(!user.lastName){
			    this.errorLastName = "Last name can't be empty";
			}
			if(!user.gender){
		        this.errorGender = "Gender can't be empty";

			}
			if(!user.username){
		        this.errorUsername = "Username can't be empty";

			}
			if(!user.password){
				this.errorPassword = "Password can't be empty";

			}
			if(!confirmPassword){
		        this.errorConfirmPassword = "Confirm password can't be empty";

			}
			
			if(!this.errorFirstName && !this.errorLastName && !this.errorGender && !this.errorUsername && !this.errorPassword && !this.errorConfirmPassword){
				if(user.password.length < 8){
					this.errorPassword = "Your password must contain at least 8 characters ";
					return;
				}
				if(user.password != confirmPassword){
				   this.errorConfirmPassword = "Password and Confirm password doesn't match";
				   return;
				}
			}
			
			if(user.lastName && user.lastName && user.gender && user.username && user.password && confirmPassword){
				axios
		          .get('rest/users/all')
		          .then(response => (this.users = response.data,
		        		  this.userExists()))
			}

		},
			
		userExists : function(){
			 let addUser = true;
			 for(u in this.users){	
					if(this.users[u].username == this.user.username){
						this.errorUsername = "Username already exists";
						addUser = false;
						return;
					}
				}
			if(addUser){
				this.addUser();
			} 
		},
		
		addUser : function(){
			axios
	          .post('rest/hosts/addHost', JSON.stringify({"username":''+ this.user.username, "password":''+ this.user.password,"firstName":''+ this.user.firstName,"lastName":''+ this.user.lastName,"gender": this.user.gender,"typeOfUser":'HOST'}), {
			        headers: {
		            'Content-Type': 'application/json',
		        }
		    }).then()
          
		    axios
	          .post('rest/users/addUser',JSON.stringify({"username":''+ this.user.username, "password":''+ this.user.password,"firstName":''+ this.user.firstName,"lastName":''+ this.user.lastName,"gender": this.user.gender,"typeOfUser":'HOST'}), {
			        headers: {
		            'Content-Type': 'application/json',
		        }
		    })
          
		    this.showAddHostPart = false;
		}
			
	}
	
	
});