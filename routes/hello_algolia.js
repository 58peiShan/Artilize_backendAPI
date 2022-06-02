// hello_algolia.js
const algoliasearch = require('algoliasearch')

// Connect and authenticate with your Algolia app
const client = algoliasearch('PZOO31BWY9', {process.env.ALGOLIA_API})

// Create a new index and add a record
const index = client.initIndex('test_index')
const record = { objectID: 4, name: 'test44_rec5ordLu' }


index.saveObject(record).wait()

// Search the index and print the results
index
  .search('test_record')
  .then(({ hits }) => console.log(hits[0]))
  .catch((err)=>{
      console.log(err);
  })
