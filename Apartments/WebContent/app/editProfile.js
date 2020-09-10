/**
 * 
 */
Vue.component("editProfile", {
	data: function () {
	    return {
		  user: {},
		  oldPassword:"",
		  newPassword:"",
		  confirmPassword:"",
		  mode: "NOT_EDIT_YET",
		  errorOldPassword:"",
		  errorFirstName:"",
	      errorLastName:"",
	      errorNewPassword:"",
	      errorConfirmPassword:"",
	      changePassword:false
	    }
},
		template: ` 
		
		<div>
			
			<div class="content-profile">
			  	<form class="container-profile">
			  		<span class="profile-form-title p-b-34">
									PROFILE
					</span>
					<img src="images/male_image.png" class="img-profile " v-if="user.gender=='MALE'">
					<img src="images/female_image.png" class="img-profile " v-if="user.gender=='FEMALE'">

					<div class="button-form">
						
						
						<div class="container-profile-form-btn">
										<button class="cancel_edit_button" v-on:click="cancle()" v-bind:disabled="mode=='NOT_EDIT_YET'"  v-show="mode!='NOT_EDIT_YET'">
											CANCEL
										</button>
						</div>
						<div class="container-profile-form-btn">
										<button class="confirm_edit_button"  v-on:click="confirm()" v-bind:disabled="mode=='NOT_EDIT_YET'" v-show="mode!='NOT_EDIT_YET'" type="button">
											CONFIRM
										</button>
						</div>
						<div class="container-profile-form-btn" style="margin-right: 40px;">
										<button class="profile-form-btn" v-on:click="edit()" v-bind:disabled="mode=='EDITING'" >
											EDIT
										</button>
						</div>
					</div>
					<div class="wrap-profile-form">
						<div class="profile-info-column-form">
							<div class="w-full text-center">
									<span class="txt2-profile">
										Profile info
									</span>
								
							</div>
						
							<div class="wrap-profile m-b-20">
								<div class="row">
									<div class="column-label">
										<label style="margin-top: 5px;">Username:</label>
									</div>
									<div class="column-input" >
										<input  class="input-in-profile" type="text" placeholder="Username" v-model="user.username" v-bind:disabled="true" style="margin-top: 5px;">
									</div>
								</div>
								
							</div>
							<div class="container-profile-form-btn-change-password" style="  margin-bottom: 20px;margin-right: 10px;margin-left: 85px;">
										<button class="profile-form-btn"  v-on:click="change()" v-bind:disabled="mode=='NOT_EDIT_YET'" v-show="mode!='NOT_EDIT_YET'">
										CHANGE PASSWORD<img src="images/down.png" class="icon" v-show="!changePassword"></img><img src="images/up-arrow.png" class="icon" v-show="changePassword"></img>
										</button>
							</div>
							<div class="wrap-profile m-b-20">
								<div class="row" v-show="changePassword">
									<div class="column-label">
										<label>Current password:</label>
									</div>
									<div class="column-input">
										<input type="password" v-model="oldPassword"  class="input-in-profile"  placeholder="Current password" >
									</div>
								</div>
								<p  v-show="changePassword" class="error-wrap-input-in-profile">{{errorOldPassword}}</p>
							</div>
							<div class="wrap-profile m-b-20">
								<div class="row" v-show="changePassword">
										<div class="column-label">
											<label>New password:</label>
										</div>
										<div class="column-input">
											<input type="password" v-model="newPassword" class="input-in-profile" placeholder="New password">
										</div>
								</div>
								
								<p   v-show="changePassword" class="error-wrap-input-in-profile">{{errorNewPassword}}</p>
							</div>
							<div class="wrap-profile m-b-20">
								<div class="row" v-show="changePassword">
										<div class="column-label">
											<label>Confirm password:</label>
										</div>
										<div class="column-input">
											<input type="password" v-model="confirmPassword"  class="input-in-profile"  placeholder="Confirm password" >
										</div>
								</div>
				
								<p  v-show="changePassword" class="error-wrap-input-in-profile">{{errorConfirmPassword}}</p>
							</div>

						</div>
						<div class="profile-column-form">
							<div class="w-full text-center">
									<span class="txt2-profile">
										User info
									</span>
								
							</div>
								
							<div class="wrap-profile m-b-20">
								<div class="row">
									<div class="column-label"><label>First name:</label></div>
									<div class="column-input">
										<input  class="input-in-profile" type="text" placeholder="First name" v-model="user.firstName"  v-bind:disabled="mode=='NOT_EDIT_YET'">
									</div>
								</div>
								<p class="error-wrap-input-in-profile">{{errorFirstName}}</p>
							</div>
							<div class="wrap-profile m-b-20">
							<div class="row">
								<div class="column-label"><label>Last name:</label></div>
									<div class="column-input">
										<input  class="input-in-profile" type="text" placeholder="Last name" v-model="user.lastName" v-bind:disabled="mode=='NOT_EDIT_YET'">
									</div>
								</div>
								<p class="error-wrap-input-in-profile">{{errorLastName}}</p>
							</div>
							<div class="wrap-profile m-b-20">
							<div class="row">
								<div class="column-label"><label>Gender:</label></div>
									<div class="column-input">
										<select class="input-in-profile" v-model="user.gender" v-bind:disabled="mode=='NOT_EDIT_YET'">
							                <option>MALE</option>
							                <option>FEMALE</option>
							              </select>
									</div>
								</div>
							</div>
						</div>
					</div>
					
					
				
			  	</form>
			</div>
		</div>
		`,
		mounted () {
			this.changeBGImage();	
        axios
          .get('rest/users/currentUser')
          .then(response => (this.user = response.data))
        
        this.$root.$on('show',(text)=>{this.showProfileInfo()});  
          
		},
		methods: {
		
		changeBGImage : function(){
			document.querySelector('body').style.backgroundImage = 'url(' + "images/apartment1.png" + ')';
		},
			
		showProfileInfo: function(){
			this.changePassword = false;
			this.mode = "NOT_EDIT_YET";
		},	
			
		change: function(){
				if(this.changePassword){
					this.changePassword = false;
					this.errorNewPassword = "";
				    this.errorConfirmPassword = "";
		            this.errorOldPassword = "";

				}else{
					this.changePassword = true;

				}
		},	
			
		edit : function(){
				this.backup = [this.user.firstName,this.user.lastName,
							   this.user.gender
							   ];
				this.mode = "EDITING";
			},
		
		confirm : function(){
			
			this.errorFirstName = "";
		    this.errorLastName = "";
	        this.errorOldPassword = "";
	        this.errorNewPassword = "";
	        this.errorConfirmPassword = "";
	        
			if(!this.user.firstName){
				this.errorFirstName = "First name can't be empty";
			}
			if(!this.user.lastName){
			    this.errorLastName = "Last name can't be empty";
			}
			
			if(!this.changePassword && !this.errorFirstName && !this.errorLastName){
				
				this.changePassword = false;
				this.mode = "NOT_EDIT_YET";
				
				this.editProfile();
				return
			}
			
			
			if(!this.newPassword){
			    this.errorNewPassword = "New password can't be empty";
			}
			if(!this.confirmPassword){
			    this.errorConfirmPassword = "Confirm password can't be empty";
			}
			if(!this.oldPassword){
			    this.errorOldPassword = "Old password can't be empty";
			}
			if(!this.errorOldPassword){
				if(this.oldPassword != this.user.password){
					this.errorOldPassword = "Old password not correct"
				}else{
					if(!this.errorFirstName && !this.errorLastName && !this.errorNewPassword && !this.errorConfirmPassword){
						if(this.newPassword.length < 8){
							this.errorNewPassword = "Your new password must contain at least 8 characters ";
							return;
						}
						if(this.newPassword!= this.confirmPassword){
						   this.errorConfirmPassword = "New password and Confirm password doesn't match";
						   return
						}
						
						this.user.password = this.newPassword;
						
						this.newPassword = "";
						this.confirmPassword = "";
						this.oldPassword = "";
						
						this.changePassword = false;
						this.mode = "NOT_EDIT_YET";
						
						this.editProfile();

					}
				}
				
				}
			},
		
 			cancle : function(){
				
				this.errorFirstName = "";
			    this.errorLastName = "";
		        this.errorNewPassword = "";
		        this.errorConfirmPassword = "";
		        this.errorOldPassword = "";
		        
				this.newPassword = "";
				this.confirmPassword = "";
				this.oldPassword = "";
				
				this.user.firstName = this.backup[0];
				this.user.lastName = this.backup[1];
				this.user.gender = this.backup[2];
				
				this.changePassword = false;
				this.mode = "NOT_EDIT_YET";
			},
			
			editProfile: function(){
				
				axios
		          .put('rest/users/updateUser',JSON.stringify({"username":''+ this.user.username, "password":''+ this.user.password,"firstName":''+ this.user.firstName,"lastName":''+ this.user.lastName,"gender":this.user.gender,"typeOfUser":this.user.typeOfUser}),
		        		{
		        	  headers: {
				            'Content-Type': 'application/json',
				        }
		        		});
				
				if(this.user.typeOfUser=='GUEST'){
					axios
			          .put('rest/guests/updateGuest',this.user);
				}
				
				if(this.user.typeOfUser=='HOST'){
					axios
			          .put('rest/hosts/updateHost',this.user);
				}
				
			}
	
		
		}
		
		
});