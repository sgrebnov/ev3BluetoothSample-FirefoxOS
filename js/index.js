var MOTOR_A = 0,
    MOTOR_B = 1,
    MOTOR_C = 2;

var app = {
        
   initialize: function() {
        this.bindEvents();
   },
   connectToRobot: function () {
       navigator.plugins.nxt.connect(
           //success
           function() {
                alert("Successfully connected");
           },
           //error
           function(err) {
               alert(err);
           },
           {});
   },
   forward: function () {
       app.motorRun(MOTOR_A, 0.5);
   },
   backward: function () {
       app.motorRun(MOTOR_A, -0.5);
   },
   stop: function () {
       app.motorRun(MOTOR_A, 0);
   },
   motorRun: function (port, power) {
       navigator.plugins.nxt.motorRun(
           // success
           function () { },
           // error
           function(err) {
               alert(err);
           },
           // params
           {"port": port, "speed": power});
   },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);    
    },
    onDeviceReady: function() {
        console.log('onDeviceReady');
        app.connectToRobot();
        
        $("#btnForward").bind("click", function () {
            app.forward();
        });
        
        $("#btnBackward").bind("click", function () {
            app.backward();
        });
        
        $("#btnStop").bind("click", function () {
            app.stop();
        });
        
        $("#btnLeft").bind("click", function () {
            app.motorRun(MOTOR_A, 1);
        });
        
        $("#btnRight").bind("click", function () {
            app.motorRun(MOTOR_A, -1);
        });
    }
};

app.initialize();