
import {model,Schema, Types} from "mongoose"

const noticeSchema = Schema({
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
		ref:"Image"
	}

})

export default Notice = model("Notice",noticeSchema);