import axios from 'axios';
export default {
	data(){
		return {   		
		}
	},
  heroData(){
		const promise = axios.get('https://firestore.googleapis.com/v1/projects/dota-47e08/databases/(default)/documents/heroes/');
		return promise;
	}
	
}