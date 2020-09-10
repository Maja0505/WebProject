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
		    errorConfirmPassword:"",
		    gender:'Choose gender'
		}
	},
	
	template : `
			<div>
				<div class="content-profile">
					<form class="container-profile" style="height:70%;  position: fixed;">
						
					<div class="row m-t-50">
						<div class="column25-in-form-search-apartment">
							<div class="container-form-input">
									<input class="form-input" type="text" placeholder="First name" v-model="user.firstName">
									<span class="focus-form-input"></span>
									<p class="form-input-error">{{errorFirstName}}</p>
							</div>
						</div>
						<div class="column25-in-form-search-apartment">
							<div class="container-form-input">
									<input class="form-input" type="text" placeholder="Last name"  v-model="user.lastName">
									<span class="focus-form-input"></span>
									<p class="form-input-error">{{errorLastName}}</p>
							</div>
						</div>
						<div class="column50-in-form-search-apartment">
								<div class="container-form-input">
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
									<span class="focus-form-input"></span>
									<p class="form-input-error">{{errorGender}}</p>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="column50-in-form-search-apartment">
							<div class="container-form-input">
									<input class="form-input" type="text" placeholder="Username" v-model="user.username">
									<span class="focus-form-input"></span>
									<p class="form-input-error">{{errorUsername}}</p>
							</div>
						</div>
						<div class="column50-in-form-search-apartment">
							<div class="container-form-input">
									<input class="form-input" type="text" placeholder="Password" v-model="user.password">
									<span class="focus-form-input"></span>
									<p class="form-input-error">{{errorPassword}}</p>
							</div>
						</div>
						
					</div>
					<div class="row">
						<div class="column50-in-form-search-apartment">
							<div class="container-form-input">
									<input class="form-input" type="text" placeholder="Confirm password" v-model="confirmPassword">
									<span class="focus-form-input"></span>
									<p class="form-input-error">{{errorConfirmPassword}}</p>
							</div>
						</div>

						
					</div>
					<div class="row">
						
						<div class="column50-in-form-search-apartment">
							<div class="container-form-input">
									<button type="button" class="form-btn" v-on:click="checkForm(user, confirmPassword)">ADD HOST</button>
									<span class="focus-form-input"></span>
									<p class="form-input-error"></p>
							</div>
						</div>
						
					</div>

					</form>
				</div>
			</div>
	`,
	mounted(){
		this.changeBGImage();	
	},
	
	methods : {
		
		changeBGImage : function(){
			document.querySelector('body').style.backgroundImage = 'url(' + "images/apartment3.png" + ')';
		},
		
		checkForm : function (user, confirmPassword) {
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