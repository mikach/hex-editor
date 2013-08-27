var MainCtrl = function($scope) {

    $scope.rows = 32;
    $scope.cols = Math.floor( window.innerHeight/20 - 2 );

    $scope.items = [];

    $scope.toHex = function (number, length) {
        var s = number.toString(16).toUpperCase();
        while (s.length < length) {
            s = '0' + s;
        }
        return s;
    };

    $scope.toChar = function(number) {
        return number <= 32 ? ' ' : String.fromCharCode(number);
    }

    $scope.loadFromFile = function(file) {
        jBinary.loadData(file, function(err, data) {
            $scope.binary = new jBinary(data);
            document.querySelector('.tmp').style.height = $scope.binary.view.byteLength/$scope.rows*20 + 250 + 'px';
            $scope.offset = $scope.current = 0;
            $scope.loadItems();
        });
    };

    $scope.loadItems = function() {
        var data = $scope.binary.read(['blob', Math.min($scope.rows * $scope.cols - 1, $scope.binary.view.byteLength - $scope.offset)], $scope.offset);
        $scope.items = [];
        for (var i in data) {
            if (typeof data[i] !== 'object' && typeof data[i] !== 'function') 
            $scope.items.push(data[i]);
        }
        $scope.$apply();
    };

    $scope.setCurrent = function(index) {
        $scope.current = index;
    };

    var timeout = null;
    angular.element(window).bind('scroll', function() {
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            $scope.offset = $scope.rows * Math.floor( window.scrollY/20 );
            $scope.loadItems();
        }, 50);
    });
};

app.controller('main', ['$scope', MainCtrl]);