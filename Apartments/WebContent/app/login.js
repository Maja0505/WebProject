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
				<div class="container-image-and-form">
					<div class="container-for-wrap">
						<form class="container-form">
							<span class="txt3 p-b-34">
								LOGIN
							</span>
							<div class="container-form-input m-b-20">
									<input id="first-name" class="form-input" type="text" placeholder="Username" v-model="username">
									<span class="focus-form-input"></span>
									<p class="form-input-error">{{wrong_username}}</p>
							</div>
							<div class="container-form-input m-b-20">
								<input class="form-input" type="password" placeholder="Password" v-model="password">
								<span class="focus-form-input"></span>
								<p class="form-input-error">{{wrong_password}}</p>
							</div>
							<div class="container-btn-form">
								<button class="form-btn" v-on:click.prevent="login(username,password)">
									Sign in
								</button>
							</div>
							<div class="w-full text-center p-t-27 p-b-239">
								<span class="txt1">
									Don't have account?
								</span>
								<a href="#/registration" class="txt2">
									Go to registration page
								</a>
							</div>
						</form>
						<div class="container-image" style="background-image: url('images/apartment1.png');"></div>
					</div>
				</div>
		    </div>
		`,
		mounted () {
			this.changeBGImage();
	        axios
	          .get('rest/users/all')
	          .then(response => (this.users = response.data))
	          
		},
		methods: {
			
			changeBGImage : function(){
				document.querySelector('body').style.backgroundImage = 'url(' + "images/sea.png" + ')';
			},
			
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