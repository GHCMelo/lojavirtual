exports.GetFullDate = () => {
	const date = new Date()
	const year = date.getFullYear()
	const month = (date.getMonth() + 1)
	const day = date.getDate()
	const hour = addZero(date.getHours())
	const min = addZero(date.getMinutes())
	return `${year}${month}${day} ${hour}${min}`
}

function addZero(value){
	if(value < 10){
		return `0${value}`
	} else{
		return value
	}
}