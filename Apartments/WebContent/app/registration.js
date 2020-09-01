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
	      errorConfirmPassword:"",
	      loggedUser : null
	    }
},
		template: ` 
		<div>

<div class="limiter">
		<div class="container-login100">
			<div class="wrap-login100">
				<form class="login100-form validate-form" method="post">
					<span class="login100-form-title p-b-34">
						Registration
					</span>
					
					<div class="wrap-input100  validate-input m-b-20" data-validate="Type user name">
						<input id="first-name" class="input100" type="text" name="username" placeholder="First name" v-model="user.firstName">
						<span class="focus-input100"></span>
						<p class="error-wrap-input100">{{errorFirstName}}</p>
					</div>
					<div class="wrap-input100  validate-input m-b-20" data-validate="Type password">
						<input id="last-name" class="input100" type="text" name="username" placeholder="Last name" v-model="user.lastName">
						<span class="focus-input100"></span>
						<p class="error-wrap-input100">{{errorLastName}}</p>
					</div>
					<div class="wrap-input100  validate-input m-b-20" data-validate="Type password">
				      <select class="browser-default custom-select input100" v-model="user.gender" >
						    <option value="MALE" selected>Male</option>
							<option value="FEMALE">Female</option>
					  </select>
						<span class="focus-input100"></span>
						<p class="error-wrap-input100">{{errorGender}}</p>
					</div>
					<div class="wrap-input100  validate-input m-b-20" data-validate="Type user name">
						<input id="username" class="input100" type="text" name="username" placeholder="Username" v-model="user.username">
						<span class="focus-input100"></span>
						<p class="error-wrap-input100">{{errorUsername}}</p>
					</div>
					<div class="wrap-input100  validate-input m-b-20" data-validate="Type password">
						<input class="input100" type="password" name="pass" placeholder="Password" v-model="user.password">
						<span class="focus-input100"></span>
						<p class="error-wrap-input100">{{errorPassword}}</p>
					</div>
					<div class="wrap-input100  validate-input m-b-20" data-validate="Type password">
						<input class="input100" type="password" name="pass" placeholder="Confirm password" v-model="confirmPassword">
						<span class="focus-input100"></span>
						<p class="error-wrap-input100">{{errorConfirmPassword}}</p>
					</div>



					
					<div class="container-login100-form-btn">
						<button class="login100-form-btn" v-on:click.prevent="checkForm(user, confirmPassword)">
							Register
						</button>
					</div>

					<div class="w-full text-center p-t-27 p-b-239">
						<span class="txt1">
							Already have an account?
						</span>

						<a href="#/login" class="txt2">
							Sign in
						</a>
					</div>

			
				</form>

				<div class="login100-more" style="background-image: url('images/apartment1.png');"></div>
			</div>
		</div>
	</div>


</div>
		`
		,methods : {
			checkForm : function (user, confirmPassword) {
				
				 this.$nextTick(function(){	
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
					 
					 
					 if(user.firstName && user.lastName && user.gender && user.username && user.password && confirmPassword){
						axios
				          .get('rest/users/all')
				          .then(response => (this.users = response.data,
				        		  this.userExists()))
					}
			})
					
	            
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
		          .then(response => ( 
		        		  axios
					      .get('rest/users/currentUser')
					      .then(response => (response.data ? this.loggedUser = response.data : this.loggedUser = null,this.$root.$emit('changeCurentUser',this.loggedUser))), this.$router.push('/')))
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