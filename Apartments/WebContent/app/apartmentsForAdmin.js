/**
 * 
 */
Vue.component("apartmentsForAdmin", {
	
	data: function () {
	    return {
	    	allApartments:null,
	    	allComments:null,
	    	showAllApartments:false,
	    	selectedApartment:null,
	    	searchText:'',
	    	currentSortDir:'asc'
	    }
	},
	
	template: `
		<div>
			<button type="submit" v-on:click="showApartments()">Show all apartments</button>
			
			<div v-show="showAllApartments">
				<div class="search-container">
					<input type="text" placeholder="Search apartment by location" v-model = "searchText">
				</div>
				<table border = "1" class="allApartments">
					<tr bgcolor="lightgrey">
						<th>Location</th>
						<th v-on:click="sort()">Price Per Night</th>
						<th>Host</th>
					</tr>
					    
					<tr v-for="a in search" v-if="a.flag==0" v-on:click="selectApartment(a)">
						<td>{{a.location.address.city}}</td>
						<td>{{a.pricePerNight }}</td>
						<td>{{a.host.username }}</td>
					</tr>
				</table>
				
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
		</div>
	`,
	
	mounted(){
		
			
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
		
		selectApartment : function(a){
			this.selectedApartment = a;
			this.$root.$emit('showEditForm',{},false);
			this.$root.$emit('showComentForAdmin',{},false,[]);
		},
		
		showApartments : function(){
			this.searchText = '';
			this.commentsForSelectedApartment = [];
			if(!this.showAllApartments)
				axios
			        .get('rest/apartments/all')
			        .then(response => (response.data ? this.allApartments = response.data : this.allApartments = null,
				   		 axios
			     	        .get('rest/comments/all')
			     	        .then(response => (response.data ? this.allComments = response.data : this.allComments = null,
			     	        					this.showAllApartments = true))))
			else{
				this.showAllApartments = false;
				this.selectedApartment = null;
			}		
		},
		
		updateApartment : function(newApartment){
			axios
	          .put('rest/apartments/updateApartment',newApartment)
		},
		
		sort(){
			if(this.currentSortDir == 'asc'){
				this.currentSortDir = 'desc';
			}else
				this.currentSortDir = 'asc'
			
			if(this.allApartments){
				this.allApartments = this.allApartments.sort((a,b) => {
			      let modifier = 1;
			      if(this.currentSortDir === 'desc') modifier = -1;
			      if(a['pricePerNight'] < b['pricePerNight']) return -1 * modifier;
			      if(a['pricePerNight'] > b['pricePerNight']) return 1 * modifier;
			      return 0;
			    });
				this.searchText = this.searchText;
			}
		},
		
		
	},
	
	computed : {

		search(){
		if(this.allApartments)	
			return this.allApartments.filter(a => {
			         return a.location.address.city.toLowerCase().includes(this.searchText.toLowerCase())})
		}
	}
		
		
	
});