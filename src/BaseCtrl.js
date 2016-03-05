angular.module('Segmentation', ['Categories'])
  .controller('BaseCtrl', function(INDUSTRIES) {
    const BaseCtrl = this;
    BaseCtrl.testItem = {
      'hello': 'Michae'
    }
    BaseCtrl.Industry = INDUSTRIES;
  })
