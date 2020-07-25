import React, { Component } from 'react'
import  { graphql, Mutation } from 'react-apollo'
import '../App.css';
import {getBooksQuery, deleteBookQueryMutation} from "../query/query"
import BookDetails from "./BookDetails";
import * as compose from 'lodash.flowright';

class BookList extends Component {
	constructor (props){
		super(props)
		this.state={
			selected: null
		}
	}
  displayBooks(){
		const { getBooksQuery : { loading, books} } = this.props
		if(loading){
			return <div>loading...</div>
		}
		else{
			return books.map((book,index)=>{
				return <li className="cardList" key={index} onClick={()=>this.setState({selected:book.id})}>
				{book.name}
	 <Mutation mutation={deleteBookQueryMutation} refetchQueries={() => { return [{query: getBooksQuery}]}}>
        {(deleteBookQueryMutation) => (
		    <span className="deleteIcon" onClick={()=> deleteBookQueryMutation({variables:{id:book.id,}})}>X</span>)}
				</Mutation>
				</li>
			})
		} 
	}
	render() {
	  const { getBooksQuery : { loading, books} } = this.props
		return (
			<div className="booklist">
				{!loading && books.length ?
				<React.Fragment>
				<ul className="clearfix listPreview">
				 {this.displayBooks()}
				 </ul>
				<BookDetails bookId={this.state.selected}/>		
				</React.Fragment>
				 : <span>No book in the list.</span> }
			</div>
		)
	}
}

export default compose(graphql(getBooksQuery, { name: "getBooksQuery" }))(BookList);
