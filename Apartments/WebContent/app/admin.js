/**
 * 
 */
Vue.component("admin", {
	data: function () {
	    return {
		  users: null,
		  currentUser:{}
	    }
},
		template: ` 
		<div>
			
			<addHost></addHost>
		</div>
		`,

});