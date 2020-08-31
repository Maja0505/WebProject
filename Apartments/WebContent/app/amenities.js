Vue.component("amenities", {
	
	data: function () {
	    return {
	    	allAmenitites:null,
	    	name:null,
	    	maxId:0,
	    	errorAmenitie:'',
	    	errorAmenitieEdit:'',
	    	selectedAmenitie:null,
	    	showEditForm:false,
	    	backup:[],
	    	mode: "NOT_EDIT_YET"
	    }
	},
	
	template: `
		<div>
			<div>
			<br>
			<input type="text" v-model="name"></intput><button v-on:click="addAmenitieToList()">Add</button>
			<p style="color:red">{{errorAmenitie}}</p>
			<br>
				<table  class="table table-hover">
				<thead>
					<tr>
					<th>Amenities</th>
					</tr>
				</thead>
				<tbody>
					<tr v-show="!allAmenitites" >
						<td>List is empty</td>
					</tr>
					<tr v-for="a in allAmenitites" v-show="allAmenitites" v-if="a.flag==0" v-on:click="selectAmenitie(a)">
						<td>{{a.name}}</td>
					</tr>
				</tbody>
				</table>
				<br>
				<p v-if="selectedAmenitie">Selected amenitie: {{selectedAmenitie.name}}</p>
				<button v-show="selectedAmenitie" v-on:click="showFormForEdit()">Edit selected amenitie</button>
				<button v-show="selectedAmenitie" v-on:click="deleteAmenitie()">Delete selected amenitie</button>
				<div v-show="showEditForm" v-if="showEditForm">
					<input type="text" v-model="selectedAmenitie.name" v-bind:disabled="mode=='NOT_EDIT_YET'"></intput>
					<button v-on:click="edit()" v-bind:disabled="mode=='EDITING'">Edit</button>
					<button v-on:click="confirm()" v-bind:disabled="mode=='NOT_EDIT_YET'">Confirm</button>
					<button v-on:click="cancel()" v-bind:disabled="mode=='NOT_EDIT_YET'">Cancel</button>
					<p style="color:red">{{errorAmenitieEdit}}</p>
				</div>
			</div>
			
		</div>
	`,
	
	mounted(){
		 this.$root.$on('amenitiesForAdmin',() => {this.getAllAmenities()});
	     this.getAllAmenities()    //PROVERITI
			
	},
	 
	
	methods : {
		selectAmenitie:function(amenitie){
			this.selectedAmenitie = amenitie;
		},
		getAllAmenities:function(){
			axios
	        .get('rest/amenities/all')
	        .then(response => (response.data ? this.allAmenitites = response.data : this.allAmenitites = null,this.findMaxId()))
		},

		findMaxId : function(){
			for(a of this.allAmenitites){
    			if(parseInt(a.id) > this.maxId){
    				this.maxId = parseInt(a.id);
    			}
    		}
		},
		addAmenitieToList: function(){
			
			this.errorAmenitie = '';
				this.maxId++;
    			if(this.name){
    				var sameName= this.allAmenitites.filter(amenitie => {
        		        return amenitie.name == this.name})
        		    if(sameName.length != 0){
        		    	this.errorAmenitie = this.name + " already exists";
        		    	this.name = null;
        		    	this.maxId = 0;
        		    }
    				
    				
    			}else{
    				this.errorAmenitie = "Can't be empty";
    			}
    			
    		
			
    		if(this.errorAmenitie == ''){
    			axios
		          .post('rest/amenities/addAmenitie', JSON.stringify({"id":''+this.maxId,"name":''+ this.name}),
		        	{
				        headers: 
				        {
			            'Content-Type': 'application/json',
				        }
		        	}) 
		        	.then(response=>(this.getAllAmenities(),this.name=null))
    		}
				 
			
    		
		
	        
		},	
		cancel:function(){
			this.errorAmenitie = "";
			this.selectedAmenitie.name = this.backup[0];
			this.mode = "NOT_EDIT_YET";
		},
		
		confirm:function(){
			
			this.errorAmenitieEdit = '';
    		if(this.selectedAmenitie.name){
    				var sameName= this.allAmenitites.filter(amenitie => {
        		        return amenitie.name == this.selectedAmenitie.name})
        		    if(sameName.length > 1){
        		    	this.errorAmenitieEdit = this.selectedAmenitie.name + " already exists";
        		    	this.name = null;
        		    	this.maxId = 0;
        		    }
    				
    				
    		}else{
    				this.errorAmenitieEdit = "Can't be empty";
    			}


			
			
			
			if(this.errorAmenitieEdit == "")
			{
				this.mode = "NOT_EDIT_YET";
				 axios
			          .put('rest/amenities/updateAmenitie',this.selectedAmenitie)
		            .then(response => (toast('Amenitie is successful update')))
			}
		
		},
		edit:function(){
			this.backup = [];
			this.backup = [this.selectedAmenitie.name];
			this.mode = "EDITING";

		},
		showFormForEdit:function(){
			if(this.showEditForm){
				this.showEditForm = false;
			}else{
				this.showEditForm = true;
			}
		},
		
		deleteAmenitie : function(){
			
			for(let amenitie of this.allAmenitites){
				if(this.selectedAmenitie.id == amenitie.id){
					amenitie.flag = 1;
					break;
				}
			}
			
			this.selectedAmenitie.flag = 1;
			var deleteAmenitie = this.selectedAmenitie
			this.selectedAmenitie = null;
			
			axios
		      .put('rest/amenities/updateAmenitie',deleteAmenitie)
		    
		    axios
		      .get('rest/apartments/all')
		      .then(response => (this.deleteAmenitieFromAllApartments(response.data,deleteAmenitie)))
		     
		},
		
		
		deleteAmenitieFromAllApartments : function(allApartments,amenitieForDelete){
			for(let apartmant of allApartments){
				for(let amenitie of apartmant.amenities){
					if(amenitie.id == amenitieForDelete.id){
						amenitie.flag = 1;
						break;
					}
				}
			}
			
			axios
		      .put('rest/apartments/updateAllApartments',allApartments)
			
		}
		
	}
		
		
	
});