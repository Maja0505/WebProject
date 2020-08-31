/**
 * 
 */
Vue.component('viewApartmentForAdmin',{
	data : function(){
		return {
			selectedApartment:null
		}
	},
	
	
	template : `
		<div>
			<div v-if="selectedApartment">
				<p>Selektovan je apartman sa id {{selectedApartment.id}} 
					<button type="submit" v-on:click="moreInfo()">More info</button>
					<button type="submit" v-on:click="deleteApartment()">Delete</button>
					<button type="submit" v-on:click="showComments()">Comments of apartment</button>
				</p>
				
				<editApartment></editApartment>
				<commentForAdmin></commentForAdmin>
			</div>
		</div>
	`,
	
	mounted(){
		this.$root.$on('viewApartment',(text) => {this.selectedApartment = text});
		axios
        .get('rest/apartments/currentSelectedApartment')
        	.then(response => (this.selectedApartment = response.data))
	},
	
	methods : {
		
		deleteApartment : function(){
			this.$root.$emit('showEditForm',{},false);
			this.$root.$emit('showComentForAdmin',{},false,[]);
			
			for(let apartment of this.allApartments){
				if(apartment.id == this.selectedApartment.id){
					apartment.flag = 1;
					break;
				}
			}
			
			this.selectedApartment.flag = 1;
			this.updateApartment(this.selectedApartment);
			this.selectedApartment = null;
		},
		
		showComments : function(){
			this.$root.$emit('showEditForm',{},false);
			this.$root.$emit('showComentForAdmin',this.selectedApartment,true,this.allComments);
		},
		
		moreInfo : function(){
			this.$root.$emit('showEditForm',this.selectedApartment,true);
			this.$root.$emit('showComentForAdmin',{},false,[]);
		},
		
		updateApartment : function(newApartment){
			axios
	          .put('rest/apartments/updateApartment',newApartment)
		}
		
	}
})