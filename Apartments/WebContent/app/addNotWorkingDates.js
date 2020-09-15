/**
 * 
 */

Vue.component('notWorkingDates',{
	data: function (){
		return{
			notWorkingDates:[],
			date:null,
		}
	},
	
	template: `
		<div>
			<div style="padding-top:300px;">
				<vuejs-datepicker input-class="reservation-input" style="width:30%;" v-model="date"  format="dd.MM.yyyy"></vuejs-datepicker>
				<button type="button" v-on:click="addNotWorkingDate">ADD NOT WORKING DATE</button>
			</div>
			<div>
				<label class="txt8">Dates you are picked</label><br>
				<label v-for="nwt in notWorkingDates" format="dd.MM.yyyy">{{nwt | dateFormat('DD.MM.YYYY')}}  
				<span v-on:click="deleteDate(nwt)" style="font-size:25px;">x</span></label><br>
			</div>
		</div>
	`,
	
	methods:{
		
		
		addNotWorkingDate : function(){
			 let yyyy = this.date.getYear() + 1900;
			 let MM = this.date.getMonth();
			 let dd = this.date.getDate();
			let newDate = new Date(yyyy,MM,dd,0,0,0,0)
			this.notWorkingDates.push(new Date(parseInt(this.date.getTime())))
		},
		
		deleteDate : function(d){
			this.notWorkingDates.splice(this.notWorkingDates.indexOf(d),1)
		},
		
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