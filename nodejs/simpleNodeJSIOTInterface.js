// https://github.com/aws/aws-iot-device-sdk-js

var awsIot = require('aws-iot-device-sdk');

var device = awsIot.device({
      keyPath: "connect_device_package/testpi.private.key",
      certPath: "connect_device_package/testpi.cert.pem",
      caPath: "connect_device_package/root-CA.crt",
      clientId: "testpi",
      region: "us-west-2",
   });


device.on('connect', function() {
   console.log('connect');

   //device.subscribe('topic_1');
   // http://docs.aws.amazon.com/iot/latest/developerguide/thing-shadow-mqtt.html
   device.subscribe('$aws/things/testpi/shadow/update')
   device.subscribe('$aws/things/testpi/shadow/update/delta')
});

device.on('close', function() {
   console.log('close');
});

device.on('reconnect', function() {
   console.log('reconnect');
});

device.on('offline', function() {
   console.log('offline');
});

device.on('error', function(error) {
   console.log('error', error);
});

device.on('message', function(topic, payload) {
   // console.log('message', topic, JSON.parse(payload.toString()));
   var data = JSON.parse(payload.toString());
   
   if ( data['state']['switch'] == "on") {
      console.log("turn the light on");
   } else {
      console.log("turn the light off");
   }

});
