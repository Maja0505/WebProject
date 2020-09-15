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
	      loggedUser : null,
	      gender:'Choose gender'
	    }
},
		template: ` 
		<div>
			<div class="container-image-and-form">
					<div class="container-for-wrap">
						<form class="container-form">
							<span class="txt3 p-b-34">
								Registration
							</span>
							<div class="container-form-input m-b-20">
								<input id="first-name" class="form-input" type="text" name="username" placeholder="First name" v-model="user.firstName">
								<span class="focus-form-input"></span>
								<p class="form-input-error">{{errorFirstName}}</p>
							</div>
							<div class="container-form-input m-b-20">
								<input id="last-name" class="form-input" type="text" name="username" placeholder="Last name" v-model="user.lastName">
								<span class="focus-form-input"></span>
								<p class="form-input-error">{{errorLastName}}</p>
							</div>
							<div class="container-form-input m-b-20">
								<select class="form-select" v-model="gender" v-if="gender=='Choose gender'" style="color:#bbbbbb">
							 		<option value="Choose gender" hidden>Choose gender</option>
								    <option value="MALE" style="color:#666666">Male</option>
									<option value="FEMALE" style="color:#666666">Female</option>
							  	</select>
						      	<select class="form-select" v-model="gender" v-if="gender!='Choose gender'"style="color:#666666">
								    <option value="Choose gender" hidden>Choose gender</option>
								    <option value="MALE" style="color:#666666">Male</option>
									<option value="FEMALE" style="color:#666666">Female</option>
							  	</select>
								<p class="form-input-error">{{errorGender}}</p>
							</div>
							<div class="container-form-input m-b-20">
								<input id="username" class="form-input" type="text" name="username" placeholder="Username" v-model="user.username">
								<span class="focus-form-input"></span>
								<p class="form-input-error">{{errorUsername}}</p>
							</div>
							<div class="container-form-input m-b-20">
								<input class="form-input" type="password" name="pass" placeholder="Password" v-model="user.password">
								<span class="focus-form-input"></span>
								<p class="form-input-error">{{errorPassword}}</p>
							</div>
							<div class="container-form-input m-b-20">
								<input class="form-input" type="password" name="pass" placeholder="Confirm password" v-model="confirmPassword">
								<span class="focus-form-input"></span>
								<p class="form-input-error">{{errorConfirmPassword}}</p>
							</div>
							<div class="container-btn-form">
								<button class="form-btn" v-on:click.prevent="checkForm(user, confirmPassword)" type="button">
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
						<div class="container-image" style="background-image: url('images/apartment1.png');"></div>
					</div>
				</div>
			</div>
		</div>
		`,
		mounted(){
			this.changeBGImage();
		},
		methods : {
			
			changeBGImage : function(){
				document.querySelector('body').style.backgroundImage = 'url(' + "images/sea.png" + ')';
			},
			
			checkForm : function (user, confirmPassword) {
				
				 this.$nextTick(function(){
					 	user.gender = this.gender;
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
						if(user.gender == 'Choose gender'){
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
					      .then(response => (response.data ? this.loggedUser = response.data : this.loggedUser = null,this.$root.$emit('changeCurentUser',this.loggedUser))),alert('Hello ' + this.user.firstName + ', your account has been created  successfully' ) ,this.$router.push('/')))
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
			    }).then(response => {
			    	axios
			          .post('rest/users/addUser', JSON.stringify({"username":''+ this.user.username, "password":''+ this.user.password,"firstName":''+ this.user.firstName,"lastName":''+ this.user.lastName,"gender": this.user.gender,"typeOfUser":'GUEST'}), {
					        headers: {
				            'Content-Type': 'application/json',
				        }
			          	})
			          		.then(response => (this.login()))
			    })
	           
	           	 
			}	
		}
		
});