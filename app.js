const express = require('express');
const router = express.Router();
const { projects } = require('./data.json');
const app = express();

// View Engine Setup
//app.set('views', path.join(_dirname, 'views'))
app.set('view engine', 'pug');

// Add static middleware
app.use( '/static', express.static('public') );

app.get( '/', function (req, res, next) {
    res.render('index', { projects });
});

app.get( '/about', function (req, res, next) {
    res.render('about');
});

app.get('/project/:id', function(req, res, next) {
    const projectId = req.params.id;
    const project = projects.find( ({ id }) => id === +projectId );
    
    if (project) {
      res.render('project', { project });
    } else {
      res.sendStatus(404);
    }
  });

// ERROR HANDLER


// 404 // catch undefined or non-existent route requests // 
app.use((req, res, next) => {
    console.log('404 error handler called');
    res.status(404).render('not-found');
  });

// Global error handler // 500 //
app.use((err, req, res, next) => {

    if (err) {
      console.log('Global error handler called', err);
    }

    if (err.status === 404) {
      res.status(404).render('not-found', { err });
    } else {
      err.message = err.message || `Oops! Not your fault! Server is being picky! Please try request again.`;
      res.status(err.status || 500).render('error', { err });
    }
  });

  app.listen(3000);
  console.log('Server is listening on port 3000');

  module.exports = router;