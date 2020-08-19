/**
 * 
 */
Vue.component("navigationbar",{
	data: function(){
		return {
			user: null,
			
		}
	},
	
	template: `
		<div>
			<!--NAVBAR-->
			<nav class="navbar navbar-default navbar-fixed-top">
			  <div class="container-fluid">
			    <div class="navbar-header">
			      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
			        <span class="icon-bar"></span>
			        <span class="icon-bar"></span>
			        <span class="icon-bar"></span>                        
			      </button>
			      <a class="navbar-brand" href="#/">HOME</a>
			    </div>
			    <div class="collapse navbar-collapse" id="myNavbar">
			      <ul class="nav navbar-nav navbar-right">
						<li><a href="#/login" v-show="!user">Login</a></li>
						<li><a href="#/registration" v-show="!user">Registation</a></li>
						<li><a href="#/" v-show="user" v-on:click.prevent="logout">Logout</a></li>
						<li><a href="#/" v-show="user" v-on:click.prevent="logout">About</a></li>
						<li><a href="#/apartment"v-if = "user" v-show="user.typeOfUser == 'HOST'">Add apartment</a></li>
			      </ul>
			    </div>
			  </div>
			</nav>
		</div>
	`,
	
	mounted(){
		axios
	        .get('rest/users/currentUser')
	        .then(response => {response.data ? this.user = response.data : this.user = null ;		
	        });
		this.$root.$on('changeCurentUser',(text)=>{this.user = text});
	},
	
	methods: {
		
		logout: function(){
			
			this.$root.$emit('refreshCurrentUser');
			axios
	          .post('rest/users/logout')
	          .then(response => (toast('User ' + response.data + ' successed logout!')) ,this.user = null,
	        		  this.$root.$emit('logout'),this.$router.push('/'))
		},
	}
	
});