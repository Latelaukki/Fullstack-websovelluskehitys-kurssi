const Notification = ({ message, isError }) => {
	console.log(isError)
	if (message === null) {
			return null
	}

	return (
			<div className={`${isError ? "error" : "success"}`}>
			{message}
			</div>
	)
}
export default Notification
