Vue.component("amenities", {
	
	data: function () {
	    return {
	    	showAmenities:false,
	    	allAmenitites:null,
	    	name:null,
	    	id:null,
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
			<button type="submit" v-on:click="showAllAmenities()">Show amneities for apartments</button>
			<div v-show="showAmenities">
			<br>
			<input type="text" v-model="name"></intput><button v-on:click="addAmenitieToList()">Add</button>
			<p style="color:red">{{errorAmenitie}}</p>
			<br>
				<table class="allAmenitites" border='1'>
					<tr>
					<th>Amenities</th>
					</tr>
					<tr v-show="!allAmenitites" >
						<td>List is empty</td>
					</tr>
					<tr v-for="a in allAmenitites" v-show="allAmenitites" v-on:click="selectAmenitie(a)">
						<td>{{a.name}}</td>
					</tr>
				</table>
				<br>
				<p v-if="selectedAmenitie">Selected amenitie: {{selectedAmenitie.name}}</p>
				<button v-show="selectedAmenitie" v-on:click="showFormForEdit()">Edit selected amenitie</button>
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
		
			
	},
	 
	
	methods : {
		selectAmenitie:function(amenitie){
			this.selectedAmenitie = amenitie;
		},
		getAllAmenities:function(){
			axios
	        .get('rest/amenities/all')
	        .then(response => (response.data ? this.allAmenitites = response.data : this.allAmenitites = null))
		},
		showAllAmenities: function(){
			if(this.showAmenities){
				this.showAmenities = false;
			}else{
				this.showAmenities = true;
			}
			
			this.getAllAmenities();
			
		},addAmenitieToList: function(){
			
			this.errorAmenitie = '';
    		if(this.allAmenitites){
    			this.id = parseInt(this.allAmenitites[this.allAmenitites.length - 1].id) + 1;
    			if(this.name){
    				var sameName= this.allAmenitites.filter(amenitie => {
        		        return amenitie.name == this.name})
        		    if(sameName.length != 0){
        		    	this.errorAmenitie = this.name + " already exists";
        		    	this.name = null;
        		    	this.id = null;
        		    }
    				
    				
    			}else{
    				this.errorAmenitie = "Can't be empty";
    			}
    			
    		}else{
				this.id = 1;
				  }
			
    		if(this.errorAmenitie == ''){
    			axios
		          .post('rest/amenities/addAmenitie', JSON.stringify({"id":''+this.id,"name":''+ this.name}),
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
        		    	this.id = null;
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
		}
		
		
	}
		
		
	
});