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
			<table>
				<tr>
					<td>First name:</td>
					<td><input type="text" v-model="user.firstName" v-bind:disabled="mode=='NOT_EDIT_YET'"/></td>
					<td>{{errorFirstName}}</td>
				</tr>
				<tr>
					<td>Last name:</td>
					<td><input type="text" v-model="user.lastName" v-bind:disabled="mode=='NOT_EDIT_YET'"/></td>
					<td>{{errorLastName}}</td>
				</tr>
				<tr>
					<td>Gender:</td>
					<td>
					<input type="radio" id="male" name="gender" value="MALE" v-model="user.gender" v-bind:disabled="mode=='NOT_EDIT_YET'">
					<label for="male">Male</label>
					<input type="radio" id="female" name="gender" value="FEMALE" v-model="user.gender" v-bind:disabled="mode=='NOT_EDIT_YET'">
					<label for="female">Female</label>
					</td>	
				</tr>
				<tr>
					<td>Username:</td>
					<td><input type="text" v-model="user.username" v-bind:disabled="true"/></td>
				</tr>
				<tr>
					<td><button v-on:click="change()" v-bind:disabled="mode=='NOT_EDIT_YET'">Change password</button></td>
				</tr>
				<tr v-if="changePassword">
					<td>Old password:</td>
					<td><input type="password" v-model="oldPassword" /></td>
					<td>{{errorOldPassword}}</td>
				</tr>		
				<tr v-if="changePassword">
					<td>New password:</td>
					<td><input type="password" v-model="newPassword"/></td>
					<td>{{errorNewPassword}}</td>
				</tr>
				<tr v-if="changePassword">
					<td>ConfirmPassword:</td>
					<td><input type="password" v-model="confirmPassword"/></td>
					<td>{{errorConfirmPassword}}</td>
				</tr>
			</table>
			<button v-on:click="edit()" v-bind:disabled="mode=='EDITING'">Edit</button>
			<button v-on:click="confirm()" v-bind:disabled="mode=='NOT_EDIT_YET'">Confirm</button>
			<button v-on:click="cancle()" v-bind:disabled="mode=='NOT_EDIT_YET'">Cancle</button>
		</div>
		`,
		mounted () {
        axios
          .get('rest/users/currentUser')
          .then(response => (this.user = response.data))
        
        this.$root.$on('show',(text)=>{this.showProfileInfo()});  
          
		},
		methods: {
		showProfileInfo: function(){
			this.changePassword = false;
			this.mode = "NOT_EDIT_YET";
		},	
			
		change: function(){
				this.changePassword = true;
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