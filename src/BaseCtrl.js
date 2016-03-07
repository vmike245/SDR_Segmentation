angular.module('Segmentation', [])
  .controller('BaseCtrl', ['$scope', 'INDUSTRIES', 'STATES', 'POPULATION_INDUSTRIES', function($scope, INDUSTRIES, STATES, POPULATION_INDUSTRIES) {
    const BaseCtrl = this;
    BaseCtrl.Industry = '';
    BaseCtrl.State = '';
    BaseCtrl.AmountType = '';
    BaseCtrl.Amount = '';


    BaseCtrl.Industries = INDUSTRIES;
    BaseCtrl.States = STATES;

    BaseCtrl.setIndustry = function(industry) {
      BaseCtrl.Industry = industry;
    };

    BaseCtrl.setState = function(state) {
      BaseCtrl.State = state;
    };

    BaseCtrl.setAmount = function(amount) {
      BaseCtrl.Amount = amount;
    }

    BaseCtrl.clearFields = function() {
      BaseCtrl.Amounts = '';
      BaseCtrl.Amount = '';
      BaseCtrl.MarketPlacement = '';
    }

    $scope.$watchGroup(['ctrl.State', 'ctrl.Industry'], function() {
      if (BaseCtrl.Amount) {
        BaseCtrl.clearFields()
      }
      if (BaseCtrl.State && BaseCtrl.Industry) {
        BaseCtrl.setAmountType(BaseCtrl.Industry);
        BaseCtrl.Amounts = BaseCtrl._getAmountOptions(BaseCtrl.Industry, BaseCtrl.State);
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
        return 'Revenue';
      }
    }

    BaseCtrl._getAmountOptions = function(industry, state) {
      switch (industry) {

        case 'Accounts':
          return BaseCtrl._getAccountsOptions(state);

        case 'County Governments':
          return BaseCtrl._getCountyGovernmentsOptions(state);

        case 'Cities':
          return BaseCtrl._getCitiesOptions(state);

        case 'Hospitals':
          return BaseCtrl._getHospitalsOptions(state);

        case 'Higher Education':
          return BaseCtrl._getHigherEducationOptions(state);

        case 'Credit Unions':
          return BaseCtrl._getCreditUnionsOptions(state);

        case 'Banks':
          return BaseCtrl._getBanksOptions(state);

        case 'Public Utilities':
          return BaseCtrl._getPublicUtilitiesOptions(state);

        case 'Legal and Law Firms':
          return BaseCtrl._getLegalAndLawFirmsOptions(state);

        case 'Native American Tribes (without Casinos)':
          return BaseCtrl._getNativeAmericanTribeWithoutCasinosOptions(state);

        case 'Native American Tribes (with Casinos)':
          return BaseCtrl._getNativeAmericanTribeWithCasinosOptions(state);

        default:
          return ['NA'];
      };
    }

    BaseCtrl._getAccountsOptions = function(state) {
      if (BaseCtrl._isEqualToBin('Texas', state)) {
        return ['< $250M', '$250M < X < $600M', '> $600M'];
      }
      else if (BaseCtrl._isEqualToBin('Midwest', state) || BaseCtrl._isEqualToBin('Midwest Mid-enterprise', state)) {
        return ['< $250M', '$250M < X < $1.5B', '> $1.5B'];
      }
      else if (BaseCtrl._isEqualToBin('West Mid-enterprise', state) || BaseCtrl._isEqualToBin('West SLED', state)) {
        return ['< $250M', '$250M < X < $1B', '> $1B'];
      }
      else {
        return ['< $350M', '> $350M'];
      }
    }

    BaseCtrl._getCountyGovernmentsOptions = function(state) {
      if (BaseCtrl._isEqualToBin('Texas', state) || BaseCtrl._isEqualToBin('West Mid-enterprise', state) || BaseCtrl._isEqualToBin('West SLED', state) || BaseCtrl._isEqualToBin('Midwest', state) || BaseCtrl._isEqualToBin('Midwest Mid-enterprise', state)) {
        return ['< 1M', '1M < X < 4M', '> 4M'];
      }
      else {
        return ['< 1M', '> 1M'];
      }
    }

    BaseCtrl._getCitiesOptions = function(state) {
      if (BaseCtrl._isEqualToBin('Texas', state) || BaseCtrl._isEqualToBin('Midwest', state) || BaseCtrl._isEqualToBin('Midwest Mid-enterprise', state) || BaseCtrl._isEqualToBin('West Mid-enterprise', state) || BaseCtrl._isEqualToBin('West SLED', state)) {
        return ['< 300K', '300K < X < 2M', '> 2M'];
      }
      else {
        return ['< 300K', '> 300K'];
      }
    }

    BaseCtrl._getHospitalsOptions = function(state) {
      if (BaseCtrl._isEqualToBin('Texas', state) || BaseCtrl._isEqualToBin('West Mid-enterprise', state) || BaseCtrl._isEqualToBin('West SLED', state) || BaseCtrl._isEqualToBin('Midwest', state)) {
        return ['< $1.5B', '$1.5B < X < $3B', '> $3B'];
      }
      else if (BaseCtrl._isEqualToBin('Midwest Mid-enterprise', state)) {
        return ['< $1.5B', '$1.5B < X < $2B', '> $2B'];
      }
      else {
        return ['< $1.5B', '> $1.5B'];
      }
    }

    BaseCtrl._getHigherEducationOptions = function(state) {
      if (BaseCtrl._isEqualToBin('Midwest', state) || BaseCtrl._isEqualToBin('Midwest Mid-enterprise', state)) {
        return ['< 20K', '20K < X < 40K', '> 40K'];
      }
      else {
        return ['< 20K', '> 20K'];
      }
    }

    BaseCtrl._getCreditUnionsOptions = function(state) {
        return ['< $4.2B', '> $4.2B'];
    }

    BaseCtrl._getBanksOptions = function(state) {
      if (BaseCtrl._isEqualToBin('Texas', state) || BaseCtrl._isEqualToBin('Midwest', state) || BaseCtrl._isEqualToBin('Midwest Mid-enterprise', state) || BaseCtrl._isEqualToBin('West Mid-enterprise', state) || BaseCtrl._isEqualToBin('West SLED', state)) {
        return ['< $1B', '$1B < X < $5B', '> $5B'];
      }
      else {
        return ['< $1B', '> $1B'];
      }
    }

    BaseCtrl._getPublicUtilitiesOptions = function(state) {
      if (BaseCtrl._isEqualToBin('Texas', state) || BaseCtrl._isEqualToBin('Midwest', state) || BaseCtrl._isEqualToBin('Midwest Mid-enterprise', state) || BaseCtrl._isEqualToBin('West Mid-enterprise', state) || BaseCtrl._isEqualToBin('West SLED', state)) {
        return ['< $499M', '$499M < X < $10B', '> $10B'];
      }
      else {
        return ['< $499M', '> $499M'];
      }
    }

    BaseCtrl._getLegalAndLawFirmsOptions = function(state) {
      if (BaseCtrl._isEqualToBin('Midwest Mid-enterprise', state)) {
        return ['< 350', '350 < X < 900', '> 900'];
      }
      else {
        return ['< 350', '> 350'];
      }
    }

    BaseCtrl._getNativeAmericanTribeWithoutCasinosOptions = function(state) {
        return ['< 1M', '> 1M'];
    }

    BaseCtrl._getNativeAmericanTribeWithCasinosOptions = function(state) {
      if (BaseCtrl._isEqualToBin('Midwest', state) || BaseCtrl._isEqualToBin('Midwest Mid-enterprise', state)) {
        return ['< $250M', '> $250M'];
      }
      else {
        return ['< $350M', '> $350M'];
      }
    }

    BaseCtrl._isEqualToBin = function(bin, state) {
      return _.isEqual(STATES[bin].sort(), state.sort());
    }

    $scope.$watch('ctrl.Amount', function() {
      if (BaseCtrl.Amount) {
        BaseCtrl.MarketPlacement = BaseCtrl._findMarketPlacement(BaseCtrl.Industry, BaseCtrl.State, BaseCtrl.Amount);
      }
    })

    BaseCtrl._findMarketPlacement = function(industry, state, amount) {
      switch (industry) {

        case 'Accounts':
          return BaseCtrl._getAccountsPlacement(state, amount);

        case 'County Governments':
          return BaseCtrl._getCountyGovernmentsOptions(state);

        case 'Cities':
          return BaseCtrl._getCitiesOptions(state);

        case 'Hospitals':
          return BaseCtrl._getHospitalsOptions(state);

        case 'Higher Education':
          return BaseCtrl._getHigherEducationOptions(state);

        case 'Credit Unions':
          return BaseCtrl._getCreditUnionsOptions(state);

        case 'Banks':
          return BaseCtrl._getBanksOptions(state);

        case 'Public Utilities':
          return BaseCtrl._getPublicUtilitiesOptions(state);

        case 'Legal and Law Firms':
          return BaseCtrl._getLegalAndLawFirmsOptions(state);

        case 'Native American Tribes (without Casinos)':
          return BaseCtrl._getNativeAmericanTribeWithoutCasinosOptions(state);

        case 'Native American Tribes (with Casinos)':
          return BaseCtrl._getNativeAmericanTribeWithCasinosOptions(state);

        default:
          return ['NA'];
      };
    }

    BaseCtrl._getAccountsPlacement = function (state, amount) {
      if (amount === '< $250M' || amount === '< $350M') {
        return 'SME';
      }
      else if (amount === '$250M < X < $600M' || amount === '$250M < X < $1B' || amount === '$250M < X < $1.5B') {
        return 'Mid-Enterprise';
      }
      else {
        return 'Large Enterprise'
      }
    }

  }]);
