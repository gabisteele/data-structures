var pg = require('pg');

// add connection string here
var conString = "";

var five = require("johnny-five"),
  fsr, led;

(new five.Board()).on("ready", function() {

    // Create a new `fsr` hardware instance.
    fsr = new five.Sensor({
      pin: "A0",
      freq: 25
    });

    led = new five.Led(9);

    // Scale the sensor's value to the LED's brightness range
    fsr.scale([0, 255]).on("data", function() {

      // set the led's brightness based on force
      // applied to force sensitive resistor

      led.brightness(this.value);
    });
  });
        console.log(result);
  



    }).on("release", function() {
      led.off();
    });
  });
  exitBumper.on("hit", function() {
    process.exit();
  })
});

  });