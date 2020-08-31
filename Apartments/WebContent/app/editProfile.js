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
		
		
			<div class="container bootstrap snippets bootdeys">
<div class="row">
  <div class="col-xs-12 col-sm-9">
    <form class="form-horizontal">
        <div class="panel panel-default">
          <div class="panel-body text-center">
           <img src="https://bootdey.com/img/Content/avatar/avatar6.png" class="img-circle profile-avatar" alt="User avatar">
          </div>
        </div>
      <div class="panel panel-default">
        <div class="panel-heading">
        <h4 class="panel-title">User info</h4>
        </div>
        <div class="panel-body">
        
          <div class="form-group">
            <label class="col-sm-2 control-label">First name:</label>
            <div class="col-sm-10">
              <input type="text" v-model="user.firstName" v-bind:disabled="mode=='NOT_EDIT_YET'" class="form-control"/>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">Last name:</label>
            <div class="col-sm-10">
			<input type="text" v-model="user.lastName" v-bind:disabled="mode=='NOT_EDIT_YET'" class="form-control"/>
           </div>
          </div>
           <div class="form-group">
            <label class="col-sm-2 control-label">Location</label>
            <div class="col-sm-10" >
              <select class="form-control" v-model="user.gender" v-bind:disabled="mode=='NOT_EDIT_YET'">
                <option>MALE</option>
                <option>FEMALE</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      

      <div class="panel panel-default">
        <div class="panel-heading">
        <h4 class="panel-title">Profile info</h4>
        </div>
        <div class="panel-body">
		 
		  <div class="form-group">
            <label class="col-sm-2 control-label">Username:</label>
            <div class="col-sm-10">
            <input type="text" v-model="user.username" v-bind:disabled="true" class="form-control"/>
            </div>
          </div>
		
			<div class="form-group">
			<label class="col-sm-2 control-label">Password:</label>
            <div class="col-sm-10">
             
               <button v-on:click="change()" v-bind:disabled="mode=='NOT_EDIT_YET'"  class="btn btn-default">Change password</button>
          

            </div>
          </div>
          <div class="form-group" v-if="changePassword">
            <label class="col-sm-2 control-label">Current password</label>
            <div class="col-sm-10">
              <input type="password" v-model="oldPassword"  class="form-control"/>
            </div>
          </div>
          <div class="form-group" v-if="changePassword">
            <label class="col-sm-2 control-label">New password</label>
            <div class="col-sm-10">
            <td><input type="password" v-model="newPassword"  class="form-control"/></td>
            </div>
          </div>

        </div>
      
      </div>
       <div class="panel panel-default">
        <div class="panel-heading">
         <div class="form-group">
            <div class="col-sm-4" >
              <button v-on:click="edit()" v-bind:disabled="mode=='EDITING'" class="btn btn-default">Edit</button>
            </div>
            <div class="col-sm-4" >
             <button v-on:click="confirm()" v-bind:disabled="mode=='NOT_EDIT_YET'" class="btn btn-default">Confirm</button>
            </div>
            <div class="col-sm-4">
            <button v-on:click="cancle()" v-bind:disabled="mode=='NOT_EDIT_YET'" class="btn btn-default">Cancle</button>
              
            </div>
          </div>
       
        </div>
      </div>
    </form>
  </div>
</div>
</div>	

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