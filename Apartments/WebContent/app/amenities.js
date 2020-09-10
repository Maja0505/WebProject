Vue.component("amenities", {
	data: function () {
	    return {
	    	allAmenitites:null,
	    	name:null,
	    	user:null,
	    	maxId:0,
	    	errorAmenitie:'',
	    	errorAmenitieEdit:'',
	    	selectedAmenitie:null,
	    	showEditForm:false,
	    	backup:[],
	    	mode: "NOT_EDIT_YET",
	    	searchText:'',
	    	selectedInput:null
	    }
	},
	
	template: `
	<div>
		<div class="content-profile">
		  <form class="container-amenities">
			<div id="myDIV" class="header" >
			  <div class="row">
			  <div class="column">
			  	  <h2 style="color:white;margin-right:50%" >ADD AMENITIE</h2>

				  <input type="text" id="myInput" placeholder="Add amenitie..." class="input-amenities" v-model="name">
				  <span v-on:click="addAmenitieToList()" class="addBtn">Add</span>
				  <p class="error-amenitie">{{errorAmenitie}}</p>
			  </div>
			  	<div class="column">
			  	 <div class="row">
					<h2 style="color:white;float: right;" >SEARCH LIST</h2>
			  	 </div>
			  	 <div class="row">
			  	 <input type="text" id="myInput" placeholder="Search amenitie..." class="input-amenities" v-model="searchText" style="float: right;">
			 		</div>
			 	</div>
			  	
			 </div>
			</div>
			<ul id="myUL" class="ul-amenities">
			  <li v-for="a in search" v-show="allAmenitites" v-if="a.flag==0" v-on:click="selectAmenitie(a)" class="list-group-item d-flex justify-content-between align-items-center" >
				  <label v-if = "(mode =='NOT_EDIT_YET' && !selectedAmenitie) || (mode =='NOT_EDIT_YET' && selectedAmenitie.name == a.name) || (selectedAmenitie.name != a.name)">{{a.name}}</label>
				  <input v-model="selectedInput" v-if = "(mode !='NOT_EDIT_YET'  && selectedAmenitie && selectedAmenitie.name == a.name)"/>
			  	  <span v-if="mode =='NOT_EDIT_YET'"><button class="button-amenitie"  v-on:click="edit()" v-if="selectedAmenitie && selectedAmenitie.name == a.name" type="button">EDIT</button></span>
			      <span v-if="mode =='NOT_EDIT_YET'"><button class="button-amenitie" v-on:click="deleteAmenitie()" v-if="selectedAmenitie && selectedAmenitie.name == a.name" type="button">DELETE</button></span>
			      <span v-if="mode !='NOT_EDIT_YET'"><button class="button-amenitie" v-on:click="confirm()" v-if="selectedAmenitie && selectedAmenitie.name == a.name" type="button">CONFIRM</button></span>
			      <span v-if="mode !='NOT_EDIT_YET'"><button class="button-amenitie" v-on:click="cancel()" v-if="selectedAmenitie && selectedAmenitie.name == a.name" type="button">CANCEL</button></span>
			      <label style="color:red" v-if="(selectedAmenitie && a.name == selectedAmenitie.name)">{{errorAmenitieEdit}}</label>
			  </li>
			</ul> 
			</form>
		</div>
	</div>
	`,
	
	mounted(){
		 this.$root.$on('amenitiesForAdmin',() => {this.getAllAmenities()});
	     this.getAllAmenities()    //PROVERITI
	     this.changeBGImage();	
	},
	 
	
	methods : {
		
		changeBGImage : function(){
			document.querySelector('body').style.backgroundImage = 'url(' + "images/apartment3.png" + ')';
		},
		
		selectAmenitie:function(amenitie){
			if(this.mode != "EDITING"){
				this.selectedInput = amenitie.name;
				if(this.mode=="NOT_EDIT_YET" && this.selectedAmenitie == amenitie){
					this.selectedAmenitie = null;
				}else{
					this.selectedAmenitie = amenitie;
					this.errorAmenitie='';
					this.errorAmenitieEdit='';
				}
			}
			
			
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
        		        return amenitie.name == this.name && amenitie.id == 0})
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
			this.errorAmenitieEdit="";
			this.selectedAmenitie.name = this.backup[0];
			this.mode = "NOT_EDIT_YET";
		},
		
		confirm:function(){
			
			this.errorAmenitieEdit = '';
    		if(this.selectedInput){
    				var sameName= this.allAmenitites.filter(amenitie => {
        		        return amenitie.name == this.selectedInput && amenitie.id == 0})
        		    if(sameName.length >= 1){
        		    	this.errorAmenitieEdit = this.selectedInput + " already exists";
        		    	this.name = null;
        		    	this.maxId = 0;
        		    }
    				
    				
    		}else{
    				this.errorAmenitieEdit = "Can't be empty";
    			}


			
			
			
			if(this.errorAmenitieEdit == "")
			{
				this.mode = "NOT_EDIT_YET";
				this.selectedAmenitie.name=this.selectedInput
				 axios
			          .put('rest/amenities/updateAmenitie', this.selectedAmenitie)
		            .then(response => (this.selectedAmenite=null))
		            
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
		
	},
	computed : {

		search(){
			
			if(this.allAmenitites)	
				return this.allAmenitites.filter(a => {
				         return a.name.toLowerCase().includes(this.searchText.toLowerCase())})
		}
	}
		
	
});