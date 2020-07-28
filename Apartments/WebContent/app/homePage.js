

Vue.component("homePage", {
	data: function () {
	    return {
		  user: null,
	    }
},
		template: ` 
		<div>
		<p>
			<a href="#/login" v-show="!user">Login</a>
			<a href="#/registration" v-show="!user">Registation</a>
			<a href="#/" v-show="user" v-on:click.prevent="logout">Logout</a>
			<a href="#/" v-show="user" v-on:click.prevent="logout">About</a>
			<a href="#/comment" v-show="user">Comment apartment</a>
			
		</p>
		<p>{{user}}</p>
		<div v-show="user">
			<router-view></router-view>
		</div>
		</div>
		`	,	mounted () {
				axios
		          .get('rest/users/currentUser')
		          .then(response => {response.data ? this.user = response.data : this.user = null ;		
		          });
				//nekad brlja odradi prvo get pre nego sto odradi post u login.js i onda ne uspe lepo da 
				//ispise ono sto treba 
				/*this.$root.$on('loginUser',(text) => {
					this.user = text;
				});*/
			},
			methods: {
				logout: function(){
					axios
			          .post('rest/users/logout')
			          .then(response => (toast('User ' + response.data + ' successed logout!')) ,this.user = null)
				}
				}
});