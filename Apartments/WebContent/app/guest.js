/**
 * 
 */
Vue.component("guest", {
	data: function () {
	    return {
		  
	    }
},
		template: `
		<div>
		<button type="submit" v-on:click="showApartments()">Show all apartments</button>
		<reservation></reservation>
		<p>CAO JA SAM GUEST</p>
		</div>
		`,
		
		methods:{
			showApartments : function(){
				this.$root.$emit('showApartments');
			}
			
		}
		
});