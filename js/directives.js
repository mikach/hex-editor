app.directive('file', function() {

    return {
        template: '<input type="file" />',
        transclude: false,
        replace: true,
        restrict: 'E',
        link: function($scope, element) {

            element.bind('change', function() {
                $scope.loadFromFile( this.files[0] );
            });

        }
    };

});

app.directive('view', function() {
    return {
        transclude: false,
        replace: false,
        restrict: 'C',
        link: function($scope, element) {
            element.bind('keypress', function(ev) {
                console.log('press');
                var d = 0;
                switch (ev.which) {
                    case 37: d = -1;
                    case 38: d = -$scope.rows;
                    case 39: d = 1;
                    case 40: d = $scope.rows;
                }
                $scope.current += d;
            });
        }
    };
});