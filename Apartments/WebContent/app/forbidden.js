/**
 * 
 */
Vue.component('forbidden',{
	data : function(){
		return{
			
		}
	},
	
	template: `
		<div>
				<div class="maincontainer">
			  <div class="bat">
			    <img class="wing leftwing" 
			         src="https://www.blissfullemon.com/wp-content/uploads/2018/09/bat-wing.png">
			    <img class="body"
			         src="https://www.blissfullemon.com/wp-content/uploads/2018/09/bat-body.png" alt="bat">
			    <img class="wing rightwing"
			         src="https://www.blissfullemon.com/wp-content/uploads/2018/09/bat-wing.png">
			  </div>
			  <div class="bat">
			    <img class="wing leftwing" 
			         src="https://www.blissfullemon.com/wp-content/uploads/2018/09/bat-wing.png">
			    <img class="body"
			         src="https://www.blissfullemon.com/wp-content/uploads/2018/09/bat-body.png" alt="bat">
			    <img class="wing rightwing"
			         src="https://www.blissfullemon.com/wp-content/uploads/2018/09/bat-wing.png">
			  </div>
			  <div class="bat">
			    <img class="wing leftwing" 
			         src="https://www.blissfullemon.com/wp-content/uploads/2018/09/bat-wing.png">
			    <img class="body"
			         src="https://www.blissfullemon.com/wp-content/uploads/2018/09/bat-body.png" alt="bat">
			    <img class="wing rightwing"
			         src="https://www.blissfullemon.com/wp-content/uploads/2018/09/bat-wing.png">
			  </div>
			  <img class="foregroundimg" src="https://www.blissfullemon.com/wp-content/uploads/2018/09/HauntedHouseForeground.png" alt="haunted house">
			  
			</div>
			<h1 class="errorcode">ERROR 403</h1>
			<div class="errortext" style="margin-top:100px;">This area is forbidden. Turn back now!</div>

		</div>
	`,
	mounted(){
		document.querySelector('body').style.background =  '#000121';
	}
})