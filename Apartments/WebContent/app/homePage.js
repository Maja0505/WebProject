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
		</p>
		</div>
		`	,	mounted () {
				this.$root.$on('loginUser',(text) => {
					global = text;
				});
				this.user = global;
			}
});