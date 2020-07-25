import React from 'react';
import BookList from "./components/BookList"
import AddBook from "./components/AddBook"
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import './App.css';


const client = new ApolloClient({
	uri: 'http://localhost:9000/graphql'
})

class App extends React.Component {
	render() {
		return (
		  <ApolloProvider client={client}>
			<div className="container clearfix">
		     <AddBook/>
		    <BookList />	
			</div>
			</ApolloProvider>
		)
	}
}
export default App;
