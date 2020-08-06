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
			<usersForAdmin></usersForAdmin>
			<apartmentsForAdmin></apartmentsForAdmin>
			<reservationsForAdmin></reservationsForAdmin>
			<amenities></amenities>
			<p>CAO JA SAM ADMIN</p>
		</div>
		`,

});