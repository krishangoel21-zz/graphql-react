const graphql = require('graphql');

const { 
GraphQLObjectType, 
GraphQLString,
GraphQLSchema,
GraphQLID,
GraphQLInt,
GraphQLList,
GraphQLNonNull
} = graphql

const _ = require('lodash');

const Author = require('../models/author');

const Book = require('../models/book');

/* const booksArr = [
{id:"1",name:"sdsd",genre:"23223", authorId:'1'},
{id:"2",name:"sdsewwed",genre:"23ewe223", authorId:'2'},
{id:"3",name:"sdsewwed",genre:"23ewe223", authorId:'2'},
{id:"4",name:"sdsewwed",genre:"23ewe223", authorId:'2'},
]

const authorArr = [{id:"1",name:"sdsd",age:"23223"},{id:"2",name:"sdsewwed",age:"23223"}]
 */
 

const BookType = new GraphQLObjectType({
	name: 'Book',
	fields:()=>({
		id:{type:GraphQLID},
		name:{type:GraphQLString},
		genre:{type:GraphQLString},
		author:{
			type:AuthorType,
	        resolve(parent,args){
			  //return _.find(authorArr, {id: parent.authorId} )
			  return Author.findById(parent.authorId)	
	        }
		}
	})
})

const AuthorType = new GraphQLObjectType({
	name: 'Author',
	fields:()=>({
		id:{type:GraphQLID},
		name:{type:GraphQLString},
		age:{type:GraphQLInt},
	    book:{
			type:new GraphQLList(BookType),
	        resolve(parent,args){
			//return _.filter(booksArr, {authorId: parent.id} )
		      return Book.find({authorId:parent.id})	
	        }
		}
	})
})

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields:()=>({
    book :{
		type:BookType,
		args:{id:{type:GraphQLID}},
		resolve(parent,args){
		//return _.find(booksArr, {id: args.id} )
		 return Book.findById(args.id)	
	  }
	},
    author :{
		type:AuthorType,
		args:{id:{type:GraphQLID}},
		resolve(parent,args){
	    //return _.find(authorArr, {id: args.id} )
          return Author.findById(args.id)
	  }
	},
     books:{
	    type:new GraphQLList(BookType),
		resolve(parent,args){
		 //return booksArr
          return Book.find({})
		}
     },
	authors:{
	    type:new GraphQLList(AuthorType),
		resolve(parent,args){
		   //return authorArr
           return Author.find({})
		}
     },
  })
})


const Mutation = new GraphQLObjectType({
	name:"Mutation",
	fields:()=>({
		addAuthor:{
			type: AuthorType,
			args:{
				name:{type:  new GraphQLNonNull(GraphQLString)},
				age:{type: new GraphQLNonNull(GraphQLInt)}
			},
			resolve(parent,args){
			let author = new Author({
				name:args.name,
				age:args.age
			  })	
			 return author.save()
			}
		},
	   addBook:{
			type: BookType,
			args:{
				name:{type: new GraphQLNonNull(GraphQLString)},
				genre:{type: new GraphQLNonNull(GraphQLString)},
				authorId:{type:GraphQLID}
			},
			resolve(parent,args){
			let book = new Book({
				name:args.name,
				genre:args.genre,
				authorId:args.authorId
			  })	
			 return book.save()
			}
		},
	 deleteBook: {
       type: BookType,
       args: {
        id: { type: GraphQLID }
        },
     resolve(parent, args) {
     return Book.findByIdAndDelete(args.id);
  }
}
})
})


module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation:Mutation
})