/**
 * 
 */
var global = "UNREGISTRED";

Vue.component("homePage", {
	data: function () {
	    return {
		  user: "UNREGISTRED"
	    }
},
		template: ` 
		<div>
		<p>
			<a href="#/login" v-show="user =='UNREGISTRED'">Login</a>
			<a href="#/registration" v-show="user =='UNREGISTRED'">Registation</a>
			<a href="#/" v-show="user !='UNREGISTRED'" v-on:click.prevent="logout">Logout</a>
		</p>
		<p>{{user}}</p>
		</div>
		`	,	mounted () {
				axios
		          .get('rest/users/currentUser')
		          .then(response => {response.data ? this.user = response.data.firstName : this.user = "UNREGISTRED" ;		
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
			          .then(response => (toast('User ' + response.data + ' successed logout!')) ,this.user = "UNREGISTRED")
				}
				}
});