Vue.component("registration", {
	data: function () {
	    return {
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
		template: ` 
		<div>

			
<form>
  <div class="container-registration">
  	<label class="text-center-register">Registration</label>
    <p>Please fill in this form to create an account.</p>
    <hr>
	<div class="input-container-registration">
    <label><b>First name</b></label><br>
    <input name="FirstName" type="text" v-model="user.firstName" required>
    <p  class="small-register-error">{{errorFirstName}}</p>
    

    <label><b>Last name</b></label><br>
    <input name="LastName" type="text" v-model="user.lastName" required>
    <p  class="small-register-error">{{errorLastName}}</p>
    
    <label><b>Gender</b></label><br>
	<label class="radio-inline"><input type="radio" id="male" name="gender" value="MALE" v-model="user.gender">Male</label>
	<label class="radio-inline"><input type="radio" id="female" name="gender" value="FEMALE" v-model="user.gender">Female</label></br>
	<p  class="small-register-error">{{errorGender}}</p>

    
    
    
    <label><b>Username</b></label><br>
    <input name="Username" type="text" v-model="user.username" required>
	<p  class="small-register-error">{{errorUsername}}</p>
	

	

    <label><b>Password</b></label><br>
    <input name="Password" type="password" v-model="user.password" required>
	<p  class="small-register-error">{{errorPassword}}</p>
	
    <label><b>Repeat Password</b></label><br>
    <input name="ConfirmPassword" type="password" v-model="confirmPassword" required>
     <p  class="small-register-error">{{errorConfirmPassword}}</p>
     
    </div>
    <hr>
    	
    <button type="submit" class="registerbtn" v-on:click="checkForm(user, confirmPassword)">Register</button>
  </div>
  
  <div class="container-registration signin">
    <p>Already have an account? <a href="#/login">Sign in</a>.</p>
  </div>
</form>
			
			
		</div>
		`
		,methods : {
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
			login : function () {
				 axios
		          .post('rest/users/login',
		        		  JSON.stringify({"username":''+ this.user.username, "password":''+ this.user.password,"firstName":''+ this.user.firstName,"lastName":''+ this.user.lastName,"gender":this.user.gender,"typeOfUser":'GUEST'}),
		        		  {
		        	  headers: {
				            'Content-Type': 'application/json',
				        }
		        		  })
		          .then(response => (this.$router.push('/')  ))
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
		          .post('rest/guests/addGuest', JSON.stringify({"username":''+ this.user.username, "password":''+ this.user.password,"firstName":''+ this.user.firstName,"lastName":''+ this.user.lastName,"gender": this.user.gender,"typeOfUser":'GUEST'}), {
				        headers: {
			            'Content-Type': 'application/json',
			        }
			    })
	           
	           	 axios
		          .post('rest/users/addUser', JSON.stringify({"username":''+ this.user.username, "password":''+ this.user.password,"firstName":''+ this.user.firstName,"lastName":''+ this.user.lastName,"gender": this.user.gender,"typeOfUser":'GUEST'}), {
				        headers: {
			            'Content-Type': 'application/json',
			        }
			    })
		          .then(response => (this.login()))
			}	
		}
		
});