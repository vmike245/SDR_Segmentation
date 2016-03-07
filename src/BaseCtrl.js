angular.module('Segmentation', [])
  .controller('BaseCtrl', ['$scope', 'INDUSTRIES', 'STATES', 'POPULATION_INDUSTRIES', function($scope, INDUSTRIES, STATES, POPULATION_INDUSTRIES) {
    const BaseCtrl = this;
    BaseCtrl.Industry = '';
    BaseCtrl.State = '';
    BaseCtrl.AmountType = '';
    BaseCtrl.Amount = 0;


    BaseCtrl.Industries = INDUSTRIES;
    BaseCtrl.States = STATES;

    BaseCtrl.setIndustry = function(industry) {
      BaseCtrl.Industry = industry;
    };

    BaseCtrl.setState = function(state) {
      BaseCtrl.State = state;
    };

    $scope.$watchGroup(['ctrl.State', 'ctrl.Industry'], function() {
      if (BaseCtrl.State && BaseCtrl.Industry) {
        BaseCtrl.setAmountType(BaseCtrl.Industry);
      };
    });

    BaseCtrl.setAmountType = function(industry) {
      if (POPULATION_INDUSTRIES.indexOf(industry) > -1) {
        BaseCtrl.AmountType = BaseCtrl._populationAmountsName(industry);
      }
      else {
        BaseCtrl.AmountType = BaseCtrl._moneyAmountName(industry);
      };
    };

    BaseCtrl._populationAmountsName = function(industry) {
      if (industry === 'Higher Education') {
        return 'Enrolled Students';
      }
      else if (industry === 'Legal and Law Firms') {
        return 'Attorneys';
      }
      else {
        return 'People';
      }
    }

    BaseCtrl._moneyAmountName = function(industry) {
      if (industry === 'Credit Unions' || industry === 'Banks') {
        return 'Assets';
      }
      else {
        return 'Revenue'
      }
    }

  }]);
