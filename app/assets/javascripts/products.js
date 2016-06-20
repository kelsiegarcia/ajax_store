$(document).ready( function() {

  var baseUrl = 'http://devpoint-ajax-example-server.herokuapp.com/api/v1/products';

// index path
if (location.pathname ==='/') {
  function getProducts () {
    $.ajax({
      url: baseUrl,
      type: 'GET',
      dataType: 'JSON',
    }).done( function(data) {
      var tbody = $('#products');
      tbody.children().remove();
      data.products.forEach( function(product) {
        var price = product.base_price ? product.base_price : '0';
        var desc = product.description ? product.description : '';
        var quantity = product.quanity_on_hand ? product.quanity_on_hand : '';
        var color = product.color ? product.color : '';
        var weight = product.weight ? product.weight : '';
        var row = '<tr data-id"' + product.id + '"><td' + product.name + '</td>';
            row += '<td>$' + price + '</td>';
            row += '<td>' + desc + '</td>';
            row += '<td>' + quantity + '</td>';
            row += '<td>' + color + '</td>';
            row += '<td>' + weight + '</td>';
            row += '<td>';
            row += '<button class="btn btn-danger delete">Delete</button>';
            row += '<button class="btn btn-primary show">Show</button>';
            row += '</td>';
            row += '</tr>';
            tbody.append(row);
      });
    }).fail( function(err) {
      alert('Did Not Load');
    });
  }

  getProducts();


    $(document).on('click', '.delete', function() {
      var id = $(this).closest('tr').data().id;
      deleteProduct(id);
    });

    $(document).on('click', '.show', function() {
      var id = $(this).closest('tr').data().id;
      location.pathname = '/products/' + id;
    });

    function deleteProduct(id) {
      $.ajax({
        url: baseUrl + '/' + id,
        type: 'DELETE',
      }).done( function() {
        getProducts();
      });
    }
  } 

  var re = /\/products\/\d+/;
  if (location.pathname.match(re)) {
    var panel = $('#panel');
    var id = panel.data('id');
    $.ajax({
      url: baseUrl + '/' + id,
      type: 'GET',
      dataType: 'JSON',
    }).done( function (data) {
      var product = data.product;
      panel.children('#heading').html(product.name);
      var list = $('#product');
      var price = '<li>Price: $' + product.base_price + '</li>';
      var desc = '<li>Description:' + product.description + '</li>';
      var quantity = '<li>Quantity:' + product.quanity_on_hand + '</li>';
      var color = '<li>Color:' + product.color + '</li>';
      var size = '<li>Weight:' + product.weight + '</li>';
      list.append(name);
      list.append(price);
      list.append(description);
      list.append(quanity_on_hand);
      list.append(color);
      list.append(weight);
    })
  }

  $('#new_product').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
      url: baseUrl,
      type: 'POST',
      dataType: 'JSON',
      data: $(this).serializeArray()
    }).done( function () {
      location.pathname = '/';
    });
  })
})









