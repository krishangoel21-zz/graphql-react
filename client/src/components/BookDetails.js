import React, { Component } from 'react'
import  { graphql } from 'react-apollo'
import {getBookQuery} from "../query/query"
import '../App.css';

 class BookDetails extends Component {
	render() {
		const { data} = this.props;
		return (
				data.book ? 
				<div className="bookdetails">
				<div>Name: {data.book.name}</div>
				<div>Genre: {data.book.genre}</div>
				<div>Author: {data.book.author.name}</div>
			</div>: null
		)
	}
}


export default graphql(getBookQuery,{
	options:(props) =>{
		return {
			variables:{
				id:props.bookId
			}
		}
	}
})(BookDetails)
