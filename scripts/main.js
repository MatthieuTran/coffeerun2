(function (window) {
  "use strict";
  var FORM_SELECTOR = '[data-coffee-order="form"]';
  var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
  var App = window.App;
  var Truck = App.Truck;
  var DataStore = App.DataStore;
  var RemoteDataStore = App.RemoteDataStore;
  var remoteDs = new RemoteDataStore("https://co.audstanley.com/coffeeorders");
  var FormHandler = App.FormHandler;
  var Validation = App.Validation;
  var CheckList = App.CheckList;
  var truck = new Truck("ncc-1701", remoteDs);
  var formHandler = new FormHandler(FORM_SELECTOR);
  
  window.truck = truck;

  var checkList = new CheckList(CHECKLIST_SELECTOR);
  checkList.addClickHandler(truck.deliverOrder.bind(truck));
  

  formHandler.addSubmitHandler(function (data) {
    truck.createOrder.call(truck, data);
    checkList.addRow.call(checkList, data);
  });

  formHandler.addInputHandler(Validation.isCompanyEmail);

  console.log(formHandler);
})(window);
