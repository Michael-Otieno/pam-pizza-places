
//business logic
function Contact (first, email, street, phone){
    this.firstName =first;
    this.email = email;
    this.street = street;
    this.phone = phone;
    this.address=[];
  }
  //added order
  function Address (pizzasize, crust, toppings, delivery){
    this.pizzaSize = pizzasize;
    this.crust = crust;
    this.toppings = toppings;
    this.delivery = delivery;
  }


Contact.prototype.fullName = function() {
    return this.firstName + " " + this.email + ' '+ this.street + ' '+this.phone;
  }
  
  Address.prototype.fullAddress = function() {
    return this.pizzaSize + ", " + this.crust + ", " + this.toppings+' '+this.delivery;
  }
  
  
  //user interface
  $(document).ready(function() {
      
       
      $('#first-form').submit(function(e) {
        var name = $('#new-first-name').val();
        var email = $('#email').val();
        var phoneNumber = $('#phone').val();
        var street = $('#street').val();
     
    
        $(".error").remove();
    
        if (name.length < 1) {
          $('#new-first-name').after('<span class="error">Insert your name</span>');
        }
       
        if (email.length < 1) {
          $('#email').after('<span class="error">Insert your Email</span>');
      
        }
        if (phoneNumber.length < 10) {
          $('#phone').after('<span class="error">Insert the correct phone number.</span>');
        }
        if (street === ''){
          $('#street').after('<span class="error">Insert your location</span>');
        }
    
      });
  
  
      //additional select fields
      $("#add-address").click(function() {
        $("#new-addresses").append(' <div class="new-address">'+
         '<select required="required" id="pizza-size">' + ' <option value="">Choose Pizza Size</option>'+
         '<option value="1">Small pizza @$10</option>'+'<option value="2">Medium Pizza @$20</option>' +
         ' <option value="3">Large Pizza @$40</option>'+' </select>'+ ' <br> ' + 
         ' <select required="required" id="crust">' + '<option value="">Choose Crust</option>'+
         '<option value="1">Crispy @$5</option>'+'<option value="2">Stuffed @$5</option>' +
         ' <option value="3">Gluten free @$5</option>'+'  </select>'+' <br>'+
         '<select required="required" id="toppings">'+'<option value="">Do you need Toppings?</option>'+
         '<option value="1">No Toppings @$0</option>'+'<option value="2">Toppings @$10</option>'+
         ' </select>'+'<select required="required" id="delivery">'+'<option value="">Do you need delivery?</option>'+
         '<option value="1">NO @$0</option>'+'<option value="2">YES @10</option>'+
         ' </select>'+'</div>'
        )
      })
  
  
      $('form#first-form').submit(function(event){
  
        event.preventDefault();
  
  
        var inputtedFirstName = $("input#new-first-name").val();
        var inputtedEmail = $("input#email").val();
        var inputtedstreet = $('input#street').val();
        var inputtedphone = $('input#phone').val();
        var newContact = new Contact(inputtedFirstName, inputtedEmail, inputtedstreet, inputtedphone );
    
  //loop selected fields
        $(".new-address").each(function() {
          var selectedPizzaSize = $(this).find('select.pizza-size').val();
          var selectedCrust = $(this).find('select.crust').val();
          var selectetoppings = $(this).find('selected.toppings').val();
          var selectedDelivery = $(this).find('selected.delivery').val();
  
          var newAddress = new Address(selectedPizzaSize, selectedCrust, selectetoppings, selectedDelivery);
          newContact.address.push(newAddress)
        })
       
        $("ul#contacts").append("<li><span class='contact'>" + newContact.firstName + "</span></li>");
  
        
        $(".contact").last().click(function() {
          $("#show-contact").show();
          $("#show-contact h2").text(newContact.firstName);
          $(".first-name").text(newContact.firstName);
          $(".email").text(newContact.email);
          $('.street').text(newContact.street);
          $('.phone').text(newContact.phone);
  
          $("ul#addresses").text("");
          newContact.address.forEach(function(address) {
          $("ul#addresses").append("<li>" + address.pizzaSize+ ", " + address.crust + " ," + address.toppings + ' ,'+ address.delivery+"</li>");
            });
  
  
  
          $("input#new-first-name").val("");
          $("input#email").val("");
          $('input#street').val();
          $('input#phone').val();
  
  
      });
  
  
  
  
  
    }) ;
  })