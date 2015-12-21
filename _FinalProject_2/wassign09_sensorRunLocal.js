var pg = require('pg');

// supply connection string through an environment variable
var conString = "postgres://gabi:gimmepizza@data-structures.cofujylv8rqe.us-west-2.rds.amazonaws.com:5432/postgres";

pg.connect(conString, function(err, client, done) {
      if(err) {
        return console.error('error fetching client from pool', err);
      }

      client.query("INSERT INTO buttonData VALUES ('hello, button from Node', DEFAULT);", function(err, result) {
        //call `done()` to release the client back to the pool
        done();

        if(err) {
          return console.error('error running query', err);
        }
        console.log(result);
    });

  });