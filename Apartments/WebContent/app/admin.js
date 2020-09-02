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
			<amenities></amenities>
			<addHost></addHost>
			<p>CAO JA SAM ADMIN</p>
		</div>
		`,

});