
import {model,Schema, Types} from "mongoose"

const eventSchema = Schema({
	title:{
		type:String,
		unique:true,
		required:true
	},
	desc:{
		type:String,
	},
	image:{
		type:Schema.Types.ObjectId,
		ref:"Image",
		required:true
	}

})

export default Event = model("Event",eventSchema);