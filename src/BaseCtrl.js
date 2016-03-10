angular.module('Segmentation', [])
  .controller('BaseCtrl', ['$scope', 'INDUSTRIES', 'STATES', 'POPULATION_INDUSTRIES', function($scope, INDUSTRIES, STATES, POPULATION_INDUSTRIES) {
    const BaseCtrl = this;
    BaseCtrl.Industry = '';
    BaseCtrl.State = '';
    BaseCtrl.AmountType = '';
    BaseCtrl.Amount = '';
    BaseCtrl.isSLED = false;


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
      BaseCtrl.isSLED = false;
    }

    BaseCtrl.isSelected = function (state) {
      if (BaseCtrl.State) {
        return _.isEqual(BaseCtrl.State.sort(), state.sort())
      }
    }

    BaseCtrl.shouldShowSLEDPicker = function () {
      if (BaseCtrl.State) {
        return BaseCtrl._isEqualToBin('West Mid-enterprise', BaseCtrl.State) && (BaseCtrl.Industry === 'County Governments' || BaseCtrl.Industry === 'Cities' || BaseCtrl.Industry === 'Higher Education' || BaseCtrl.Industry === 'State Governments')
      }
    }

    BaseCtrl.showWarningBanner = function () {
      if (BaseCtrl.State) {
        return BaseCtrl._isEqualToBin('West SLED', BaseCtrl.State);
      }
    }

    $scope.$watchGroup(['ctrl.State', 'ctrl.Industry'], function() {
      if (BaseCtrl.Amount) {
        BaseCtrl.clearFields()
      }
      else if (BaseCtrl.isSLED) {
        BaseCtrl.isSLED = false;
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

    $scope.$watchGroup(['ctrl.Amount', 'ctrl.isSLED'], function() {
      if (BaseCtrl.Amount) {
        BaseCtrl.MarketPlacement = BaseCtrl._findMarketPlacement(BaseCtrl.Industry, BaseCtrl.State, BaseCtrl.Amount);
      }
    })

    BaseCtrl._findMarketPlacement = function(industry, state, amount) {
      switch (industry) {

        case 'Accounts':
          return BaseCtrl._getAccountsPlacement(state, amount);

        case 'County Governments':
          return BaseCtrl._getCountyGovernmentsPlacement(state, amount);

        case 'Cities':
          return BaseCtrl._getCitiesPlacement(state, amount);

        case 'Hospitals':
          return BaseCtrl._getHospitalsPlacement(state, amount);

        case 'Higher Education':
          return BaseCtrl._getHigherEducationPlacement(state, amount);

        case 'State Governments':
          return BaseCtrl._getStateGovernmentsPlacement(state, amount)

        case 'Credit Unions':
          return BaseCtrl._getCreditUnionsPlacement(state, amount);

        case 'Banks':
          return BaseCtrl._getBanksPlacement(state, amount);

        case 'Public Utilities':
          return BaseCtrl._getPublicUtilitiesPlacement(state, amount);

        case 'Legal and Law Firms':
          return BaseCtrl._getLegalAndLawFirmsPlacement(state, amount);

        case 'Non Profits':
          return BaseCtrl._getNonProfitsPlacement(state, amount);

        case 'MSSP':
          return BaseCtrl._getMSSPPlacement(state,amount);

        case 'Native American Tribes (without Casinos)':
          return BaseCtrl._getNativeAmericanTribeWithoutCasinosPlacement(state, amount);

        case 'Native American Tribes (with Casinos)':
          return BaseCtrl._getNativeAmericanTribeWithCasinosPlacement(state, amount);

        default:
          return 'Oops something went wrong. There does not seem to be a placement for ' + industry;
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
        return 'Large Enterprise';
      }
    }

    BaseCtrl._getCountyGovernmentsPlacement = function (state, amount) {
      if (amount === '< 1M') {
        return 'SME';
      }
      else if (amount === '1M < X < 4M') {
        return 'Mid-Enterprise';
      }
      else if (amount === '> 4M' && (BaseCtrl._isEqualToBin('West SLED', state) || BaseCtrl.isSLED)) {
        return 'SLED';
      }
      else {
        return 'Large Enterprise';
      }
    }

    BaseCtrl._getCitiesPlacement = function (state, amount) {
      if (amount === '< 300K') {
        return 'SME';
      }
      else if (amount === '300K < X < 2M') {
        return 'Mid-Enterprise';
      }
      else if (amount === '> 2M' && (BaseCtrl._isEqualToBin('West SLED', state) || BaseCtrl.isSLED)) {
        return 'SLED';
      }
      else {
        return 'Large Enterprise';
      }
    }

    BaseCtrl._getHospitalsPlacement = function (state, amount) {
      if (amount === '< $1.5B') {
        return 'SME';
      }
      else if (amount === '$1.5B < X < $3B' || amount === '$1.5B < X < $2B') {
        return 'Mid-Enterprise';
      }
      else {
        return 'Large Enterprise';
      }
    }

    BaseCtrl._getHigherEducationPlacement = function (state, amount) {
      if (amount === '< 20K') {
        return 'SME';
      }
      else if (amount === '> 20K' && (BaseCtrl._isEqualToBin('West SLED', state) || BaseCtrl.isSLED)) {
        return 'SLED';
      }
      else if ((amount === '> 20K' || amount === '20K < X < 40K') && !BaseCtrl._isEqualToBin('All Others', state)) {
        return 'Mid-Enterprise';
      }
      else {
        return 'Large Enterprise';
      }
    }

    BaseCtrl._getStateGovernmentsPlacement = function (state, amount) {
      if (BaseCtrl._isEqualToBin('West SLED', state) || BaseCtrl.isSLED) {
        return 'SLED';
      }
      else if (BaseCtrl._isEqualToBin('All Others', state)) {
        return 'Large Enterprise';
      }
      else {
        return 'Mid-Enterprise';
      }
    }

    BaseCtrl._getCreditUnionsPlacement = function (state, amount) {
      if (amount === '< $4.2B') {
        return 'SME';
      }
      else if (BaseCtrl._isEqualToBin('Midwest', state) || BaseCtrl._isEqualToBin('Midwest Mid-enterprise', state)) {
        return 'Mid-Enterprise';
      }
      else {
        return 'Large Enterprise';
      }
    }

    BaseCtrl._getBanksPlacement = function (state, amount) {
      if (amount === '< $1B') {
        return 'SME';
      }
      else if (amount === '$1B < X < $5B') {
        return 'Mid-Enterprise';
      }
      else {
        return 'Large Enterprise';
      }
    }

    BaseCtrl._getPublicUtilitiesPlacement = function (state, amount) {
      if (amount === '< $499M') {
        return 'SME';
      }
      else if (amount === '$499M < X < $10B') {
        return 'Mid-Enterprise';
      }
      else {
        return 'Large Enterprise';
      }
    }

    BaseCtrl._getLegalAndLawFirmsPlacement = function (state, amount) {
      if (amount === '< 350') {
        return 'SME';
      }
      else if (amount === '> 900' || BaseCtrl._isEqualToBin('All Others', state)) {
        return 'Large Enterprise';
      }
      else {
        return 'Mid-Enterprise';
      }
    }

    BaseCtrl._getNonProfitsPlacement = function (state, amount) {
      return 'SME';
    }

    BaseCtrl._getMSSPPlacement = function (state, amount) {
      if (BaseCtrl._isEqualToBin('All Others', state) || BaseCtrl._isEqualToBin('West SLED', state)) {
        return 'Large Enterprise';
      }
      else {
        return 'Mid-Enterprise';
      }
    }

    BaseCtrl._getNativeAmericanTribeWithoutCasinosPlacement = function (state, amount) {
      if (amount === '< 1M') {
        return 'SME';
      }
      else if (BaseCtrl._isEqualToBin('All Others', state)) {
        return 'Large Enterprise';
      }
      else {
        return 'Mid-Enterprise';
      }
    }

    BaseCtrl._getNativeAmericanTribeWithCasinosPlacement = function (state, amount) {
      if (amount === '< $350M' || amount === '< $250M') {
        return 'SME';
      }
      else if (BaseCtrl._isEqualToBin('All Others', state)) {
        return 'Large Enterprise';
      }
      else {
        return 'Mid-Enterprise';
      }
    }

  }]);
