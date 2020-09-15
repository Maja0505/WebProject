/**
 * 
 */

Vue.component('notWorkingDates',{
	data: function (){
		return{
			notWorkingDates:[],
			date:null,
			disableDates:{},
		}
	},
	
	template: `
			<div>
				<div class="content-profile">
					<form class="container-amenities">
						<div id="myDIV" class="header" >
							<div class="row">
								<div class="column">
									<h2 style="color:white;margin-right:50%" >ADD HOLIDAY</h2>
									<vuejs-datepicker input-class="input-amenities" v-model="date"  format="dd.MM.yyyy" :disabled-dates="disableDates"></vuejs-datepicker>
								    <span v-on:click="addNotWorkingDate()" class="addBtn">ADD</span>
								</div> 	
								
								<div class="column">
								  	 <div class="row">
									 	<span v-on:click="add()" class="addBtn" style="width: 50%;margin-top: 6.2%;margin-left: 50%;">ADD LIST OF ALL DATES</span>
								  	 </div>
							 	</div>
							 </div>	
						</div>
						<ul id="myUL" class="ul-amenities">
						  <li v-for="nwt in notWorkingDates" v-show="notWorkingDates" class="list-group-item d-flex justify-content-between align-items-center" >
							  <label>{{nwt | dateFormat('DD.MM.YYYY')}}</label>
						      <span><button style="margin-left: 80%;" class="button-amenitie" v-on:click="deleteDate(nwt)" type="button">DELETE</button></span>
						  </li>
						</ul> 
					</form>
				</div>
			</div>			
	`,
	
	mounted(){
		this.changeBGImage();
		this.generateDisableDates();
	},
	
	
	methods:{
		
		changeBGImage : function(){
			document.querySelector('body').style.backgroundImage = 'url(' + "images/sea.png" + ')';
		},
		
		generateDisableDates : function(){

			this.disableDates = {
					to: new Date(),	
			}
		},
		
		addNotWorkingDate : function(){

			if(!this.date){
				return;
			}
			
			let yyyy = this.date.getYear() + 1900;
			let MM = this.date.getMonth();
			let dd = this.date.getDate();
			let newDate = new Date(yyyy,MM,dd,0,0,0,0)
			 
			if(this.notWorkingDates.length > 0){
				var g = this.notWorkingDates.indexOf(newDate.getTime()) 
				
				if(this.notWorkingDates.indexOf(newDate.getTime()) != -1){
					return;
				}
			}
			this.notWorkingDates.push(newDate.getTime())	
		},
		
		deleteDate : function(d){
			this.notWorkingDates.splice(this.notWorkingDates.indexOf(d),1)
		},
		
		
		add : function(){
			if(this.notWorkingDates.length == 0){
				return;
			}
			
			axios
	          .post('rest/notWorkingDates/add', this.notWorkingDates)
	          .then(response => {
	        	  alert('BRAVOOO')
	          })
	        	
		}
		
	},
	
	components: {
		vuejsDatepicker
	  },
	  
	filters: {

			dateFormat: function (value, format) {

			var parsed = moment(value);

			return parsed.format(format);

			}
	}
		
})