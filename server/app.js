const express = require("express");

const { graphqlHTTP } = require('express-graphql');

const app = express();

const schema = require('./schema/schema')

const mongoose = require('mongoose');

const cors = require('cors');

//allow cross origin request

app.use(cors());

mongoose.connect('mongodb+srv://krishangoel:qzfm5tRlIh9ekqcZ@cluster0.8zzuj.mongodb.net/graphql?retryWrites=true&w=majority',{ useNewUrlParser: true , useUnifiedTopology: true});

mongoose.connection.once('open',()=>{
console.log('connected to database')	
})

app.use('/graphql',graphqlHTTP({
	schema,
	graphiql:true
}));

app.listen(9000,()=>{
	console.log('Now browse to localhost:9000/graphql')
})
