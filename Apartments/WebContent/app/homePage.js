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
		</div>
		`	,	mounted () {
				axios
		          .get('rest/users/currentUser')
		          .then(response => (this.user = response.typeOfUser));
				this.$root.$on('loginUser',(text) => {
					global = text;
				});
				this.user = global;
			},
			methods: {
				logout: function(){
					axios
			          .post('rest/users/logout')
			          .then(response => (toast('User ' + response.data + ' successed logout!')) ,this.user = "UNREGISTRED")
				}
				}
});