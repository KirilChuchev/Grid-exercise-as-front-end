import controller from '../controllers/collectiveController.js';


// initialize the application
var app = Sammy('#main', function () {
  // include a plugin
  this.use('Handlebars', 'hbs');

  // Show all documents
  this.get('#/', controller.home.getView.homeElse);
  this.get('#/home', controller.home.getView.home);
  
  // Delete a document
  this.get(`#/delete/:docId`, controller.unit.deleteRequest.deleteDoc);

  // Sorting all documents by criteria
  this.get('#/sort/:criteria', controller.unit.getView.sort);

  // Filtering all documents by criteria
  this.get('#/filter/:criteria', controller.unit.getView.filter)


});

// start the application
app.run('#/');