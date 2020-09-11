$(document).ready(function () {
  // _____________________________________________________________________________
  $.ajax({
    // SENDING and AJAX request to SERVER
    method: "GET",
    url: "http://localhost:3000/visitors",
  }).then(function (response) {
    var tbody = $("#tbody");

    var tr = $("#tableholder");

    response.forEach((visitor) => {
      // _____________________________________________________________________________
      // RENDERING DATA TO the VISITORS.HTML

      var id = $('<td class="px-4 py-3"></td>').html(visitor.id);
      var name = $('<td class="px-4 py-3"></td>').html(visitor.name);
      var gender = $('<td class="px-4 py-3"></td>').html(visitor.gender);
      var designation = $('<td class="px-4 py-3"></td>').html(
        visitor.designation
      );

      $(tbody).append(tr);
      $(tr).append(id, name, gender, designation);
      $(id).append(name, gender, designation);
      $(name).append(gender, designation);
      $(gender).append(designation);

      // $(tr).append(id);
      // $(tbody).append(tr);
    });
  });
});
