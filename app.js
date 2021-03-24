const express = require('express')
const app = express()
const restaurantList = require('./restaurant.json')
const exphbs = require('express-handlebars')
const port = 3000

// express engine template
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// get static files
app.use(express.static('public'))

// route setting
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

// search
app.get('/search', (req, res) => {
  const restaurants = restaurantList.results.filter(function (restaurant) {
    return restaurant.name.toLowerCase().includes(req.query.keyword.toLowerCase())
  })
  res.render('index', { restaurants: restaurants, keyword: req.query.keyword })
})

// information 
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurants = restaurantList.results.filter(function (restaurant) {
    return restaurant.id == req.params.restaurant_id
  })
  res.render('show', { restaurants: restaurants[0] })
})

// start and listen express server
app.listen(port, () => {
  console.log(`Express is listening to local${port}`)
})

// static file