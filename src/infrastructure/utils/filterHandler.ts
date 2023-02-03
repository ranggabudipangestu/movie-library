export const filterHandler = (filterValues:any):String =>{
  let filter: String = ''
	if(filterValues.length > 0) {
		filter = ` AND`
	} else {
		filter = ` WHERE`
	}
	return filter
}