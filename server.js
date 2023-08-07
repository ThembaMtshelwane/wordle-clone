const express = require('express')
const axios = require('axios').default;
const cors = require('cors');
require('dotenv').config();
const app = express()

app.use(cors())
app.listen(process.env.PORT, ()=>console.log('Server running...'))

app.get('/word', (req,res)=>{
    const options = {
        method: 'GET',
        url: 'https://random-words5.p.rapidapi.com/getRandom',
        params: {wordLength: '5'},
        headers: {
          'X-RapidAPI-Key': process.env.RAPID_API_KEY,
          'X-RapidAPI-Host': 'random-words5.p.rapidapi.com'
        }
      }
      
    axios.request(options).then((response)=>{
        // console.log(response.data)
        console.error('get word')
        res.json(response.data)
    }).catch ((error)=>{
        // console.error(error)
        console.error('get word error')
    }) 
})

app.get('/check', (req,res)=>{
  const word = req.query.word
  const options = {
    method: 'GET',
    url: 'https://twinword-word-graph-dictionary.p.rapidapi.com/definition/',
    params: {entry: word},
    headers: {
      'X-RapidAPI-Key': process.env.RAPID_API_KEY,
      'X-RapidAPI-Host': 'twinword-word-graph-dictionary.p.rapidapi.com'
    }
  };
  
  axios.request(options).then((response)=>{
    // console.log(response.data)
    console.error('msg error')
    res.json(response.data.result_msg)
  }).catch ((error)=>{
    console.error('check error')
  }) 
})
