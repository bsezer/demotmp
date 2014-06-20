var model = {
    user: "Timothy",
    cutoff: 0,
    showUser: false,
    items: []

};


var todoApp = angular.module("todoApp", []);

//todoApp.run(function($http) {
//    $http.get("/showall.json").success(function(data) {
//        model.items = data;
//    })
//})

// modify this to show only those items whose quantity is >= cutoff
todoApp.filter("bigOrderItems", function() {
    return function(items, cutoff) {
        var resultArr = [];
        angular.forEach(items, function(item) {
            if (item.quantity >= cutoff) {
                resultArr.push(item);
            }
        });
        return resultArr;
    }
});

todoApp.controller("ToDoCtrl", function($scope, $http) {
    $scope.todo = model;


/*
            Here is where we handle all of the interaction with the server
            using a simple http connection... 
            */
    $scope.putItem = function(item) {
        console.log("putting: " + JSON.stringify(item));
        $http.put("/model/" + item.id, item).success(function(data, status, headers, config) {
            console.log(JSON.stringify(['Success', data, status, headers, config]))
        }).error(function(data, status, headers, config) {
            console.log(JSON.stringify(['Error', data, status, headers, config]))
        })
    }

    $scope.postItem = function(item) {
        console.log("posting: " + JSON.stringify(item));
        $http.post("/model", item).success(function(data, status, headers, config) {
            console.log(JSON.stringify(['Success', data, status, headers, config]))
        }).error(function(data, status, headers, config) {
            console.log(JSON.stringify(['Error', data, status, headers, config]))
        })
    }

    $scope.getItems = function() {
        $http.get("/showall.json").success(function(data) {
            $scope.todo.items = data;
        })
    };

    $scope.morganGet = function(){
        $http.get("/showall.json").success(function(data) {
        var keepGoing = false;
        angular.forEach(data, function(){
            var show = data[Math.floor(Math.random() * data.length)];
            if(show.id == "morgan" && keepGoing == false){
               $scope.todo.items.push(show);
                keepGoing = true;
            }
        });       
    });
}
    $scope.morganYell = function(){
        var audio = document.createElement('audio');
        audio.src="/sound/morgan.mp3";
        audio.play();

    }

    $scope.rockyGet = function(){
        $http.get("/showall.json").success(function(data) {
        var keepGoing = false;
        angular.forEach(data, function(){
            var show = data[Math.floor(Math.random() * data.length)];
            if(show.id == "rocky" && keepGoing == false){
               $scope.todo.items.push(show);
                keepGoing = true;
            }
        });       
    });
}
    $scope.rockyYell = function(){
        var audio = document.createElement('audio');
        audio.src="/sound/rocky.mp3";
        audio.play();
    }

    $scope.samuelGet = function(){
        $http.get("/showall.json").success(function(data) {
        var keepGoing = false;
        angular.forEach(data, function(){
            var show = data[Math.floor(Math.random() * data.length)];
            if(show.id == "samuel" && keepGoing == false){
               $scope.todo.items.push(show);
                keepGoing = true;
            }
        });       
    });
}

    $scope.samYell = function(){
        var audio = document.createElement('audio');
        audio.src="/sound/sam.mp3";
        audio.play();
    }
    
    $scope.deleteItem = function(item) {
        $http.delete("/model/"+item.id).success(function() {
            console.log("just deleted "+JSON.stringify(item));
            $scope.getItems();
        })
    };


    $scope.addNewItem = function(actionText) {
        var len = $scope.todo.items.length;
        var item = {
            id: len,
            action: actionText,
            price: 0,
            quantity: 0,
            done: false
        };
        $scope.postItem(item, len);
        $scope.getItems();
        $scope.$apply();
        //$scope.todo.items.push(item);
    }

    var commands = {
        'new item *var': function(val) {
            $scope.newItem = val;
            $scope.$apply();
        }
    };

});
