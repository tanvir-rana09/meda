
import {model,Schema} from "mongoose"

const imageSchema = Schema({
	title:{
		type:String,
		unique:true,
		required:true
	},
	desc:{
		type:String,
	},
	image:{
		type:String,
		required:true
	}

})

export default Image = model("Image",imageSchema);