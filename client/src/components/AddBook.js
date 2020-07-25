import React, { Component } from 'react'
import  { graphql } from 'react-apollo'
import { getAuthorsQuery, addBookMutation, getBooksQuery } from "../query/query"
import '../App.css';
import * as compose from 'lodash.flowright';

class AddBook extends Component {
  constructor(props){
	super(props)
	  this.state={
		 fields: {},
         errors: {}
	  }		
	}
  displayAuthors(){
		const { getAuthorsQuery : { loading, authors} } = this.props
		if(loading){
			return <option>loading...</option>
		}
		else{
			return authors.map((author,index)=>{
				return <option key={index} value={author.id}>{author.name}</option>
			})
		}
	}
	handleValidation=()=>{
	    let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
	     if(!fields["name"]){
           formIsValid = false;
           errors["name"] = "Cannot be empty";
        }
	      if(!fields["genre"]){
           formIsValid = false;
           errors["genre"] = "Cannot be empty";
        }
        if(typeof fields["name"] !== "undefined"){
           if(!fields["name"].match(/^[a-zA-Z]+$/)){
              formIsValid = false;
              errors["name"] = "Only letters";
           }        
        }
	   if(typeof fields["genre"] !== "undefined"){
           if(!fields["genre"].match(/^[a-zA-Z]+$/)){
              formIsValid = false;
              errors["genre"] = "Only letters";
           }        
        }
		 if(!fields["authorId"]){
           formIsValid = false;
           errors["authorId"] = "Cannot be empty";
        }
		this.setState({errors: errors});
		return formIsValid;
	}
	
    handleChange = (field, e)=>{     
		console.log(field,e.target.value)    
       let fields = this.state.fields;
        fields[field] = e.target.value;        
        this.setState({fields}); 
    }
	
	onSubmit = (e)=>{
		e.preventDefault();
		let field = this.state.fields;
		if(this.handleValidation() && Object.keys(field).length){
		this.props.addBookMutation({
			variables:{
					name:field["name"],
		            genre:field["genre"],
		            authorId:field["authorId"] 	
			},
			refetchQueries:[{query: getBooksQuery}]
		})
		this.myFormRef.reset();	
		this.setState({fields: {}});
		}	
	}
	
	render() {
  return (
	  <div className="form">
	  <form id="add-book" onSubmit={(e)=>this.onSubmit(e)} ref={(el) => this.myFormRef = el}>
       <div className="form-group">
	   <label>Book Name:</label>
	   <input className="form-control" type="text" onChange={(e)=> this.handleChange("name", e)}/> 
	   <span style={{color: "red"}}>{this.state.errors["name"]}</span>
	   </div>
      <div className="form-group">
	  <label>Genre:</label>
	  <input className="form-control" type="text" onChange={(e)=> this.handleChange("genre",e)} />
	  <span style={{color: "red"}}>{this.state.errors["genre"]}</span>
	  </div>
      <div className="form-group">
	  <label>Author:</label>
      <select className="form-control" onChange={(e)=> this.handleChange("authorId",e)}>
      <option></option>
        {this.displayAuthors()}
      </select> <span style={{color: "red"}}>{this.state.errors["authorId"]}</span></div>
      <button className="btn">Add Book</button>
      </form>
	 </div>

		)
	}
}


export default compose(
graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
graphql(addBookMutation, { name: "addBookMutation" })	
)(AddBook);