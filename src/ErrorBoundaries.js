import React from 'react';
import PropTypes from 'prop-types';
class ErrorBoundaries extends React.Component{
    constructor(props){
        super(props)
        this.state={
            hasError: false
        }
    }
    static getDerivedStateFromError(error){
        return { hasError: true };
    }
    // render error message if hasError is true, otherwise display the children as normal
    render(){
        if(this.state.hasError){
            return <h2>Something went wrong.</h2>
        }
        return(
            this.props.children
        )
    }
}
ErrorBoundaries.propTypes ={
    children: PropTypes.node.isRequired
}
export default ErrorBoundaries;