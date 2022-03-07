import { connect } from "react-redux"
import { handleFiltering } from "../reducers/filterReducer"

const VisibilityFilter = (props) => {

  return (
    <div>
      filter
      <input
        value={props.filterString}
        onChange={({ target }) => props.handleFiltering(target.value)}
      />
      <p/>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    filterString: state.filtering
  }
}

const mapDispatchToProps = {
  handleFiltering,
}

const ConnectedVisibilityFilter = connect(
  mapStateToProps,
  mapDispatchToProps
)(VisibilityFilter)
export default ConnectedVisibilityFilter