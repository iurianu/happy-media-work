
var x, i, j, selElmnt, a, b, c;
/*look for any elements with the class "custom-select":*/
x = document.getElementsByClassName("custom-select");
for (i = 0; i < x.length; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  /*for each element, create a new DIV that will act as the selected item:*/
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /*for each element, create a new DIV that will contain the option list:*/
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < selElmnt.length; j++) {
    /*for each option in the original select element,
    create a new DIV that will act as an option item:*/
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /*when an item is clicked, update the original select box,
        and the selected item:*/
        var y, i, k, s, h;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        h = this.parentNode.previousSibling;
        for (i = 0; i < s.length; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            for (k = 0; k < y.length; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
      /*when the select box is clicked, close any other select boxes,
      and open/close the current select box:*/
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
}
function closeAllSelect(elmnt) {
  /*a function that will close all select boxes in the document,
  except the current select box:*/
  var x, y, i, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  for (i = 0; i < y.length; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < x.length; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}
/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
document.addEventListener("click", closeAllSelect);



/* ============== jQuery ============== */


jQuery.noConflict();

jQuery(document).ready( function( $ ) {

    //Show Confirmation Modal
    var url = window.location.href;
    var index = url.indexOf("#success");
    
    if(index !== -1){
        $('#thankyou-modal').modal('show');
    }
    
    $(document).on('hide.bs.modal','#thankyou-modal', function () {
          document.location.href = 'index.html';
    });
    
    var scroll_pos = 0;
    $(document).scroll(function() { 
        
        var $animation_elements = $('.animation-element');
        var $window = $(window);
        
        function check_if_in_view() {
          var window_height = $window.height();
          var window_top_position = $window.scrollTop();
          var window_bottom_position = (window_top_position + window_height);

          $.each($animation_elements, function() {
            var $element = $(this);
            var element_height = $element.outerHeight();
            var element_top_position = $element.offset().top;
            var element_bottom_position = (element_top_position + element_height);

            //check to see if this current container is within viewport
            if ((element_bottom_position >= window_top_position) &&
                (element_top_position <= window_bottom_position)) {
              $element.addClass('in-view');
            } else {
              $element.removeClass('in-view');
            }
          });
        }  
        $window.on('load scroll resize', check_if_in_view);  
        
    });    
    
    $("#events>figure").hover( function() {
        $(this).toggleClass("show-description"); 
    });
     
    $(".nav-link").click(function() {
        $(this).parents().find(".navbar-collapse").removeClass("show");
    })
    
    
    $(".package-scroller").on("click", function() {
       // $(this).attr("data-toggle", "modal").attr("data-target", "#package-modal");
       // var headline = $(this).find('h3').text();
        //$('#package-modal .modal-title').text(headline);
       // $("#scroll-container").load("./assets/" + this.id + ".html");
    }) 
    
    $('.select-selected').on('click', deactivateSetupCreator);
	$('#own-set-select').on('click', activateSetupCreator);

    $('#setup-creator').find('input[data-toggle=tooltip]').attr("title", function() {
        return "Puteti selecta maxim " + $(this).attr('max');
    })	
	
    $('#setup-creator').find('input[type=number]').on('change', function() {
		var max = $(this).attr('max');
        if (Number($(this).val()) > Number(max) ) $(this).val(max);
    })

	$('[data-toggle="tooltip"]').tooltip();
	
	// activates custom package selector
	function activateSetupCreator(){
		$("[name='pachet']").val(null).removeAttr("required");
		$(".select-selected").text("Alege pachetul dorit");
		$("#setup-creator").show();
	}	
	
	// deactivates custom package selector
	function deactivateSetupCreator(){
		$("[name='pachet']").attr("required");
		$("#setup-creator").hide().find("input[type='number']").val(0);		
	}	
    
    $("form#contact-form").on('submit', function(event) {
        event.preventDefault;
		
		$("#setup-creator input").each(function(){			
			if($(this).val() == 0) $(this).prop('disabled', true);
			else {
				var label = $("label[for='" + $(this).attr('name') + "']").text();
				$(this).attr("type", "text");
				$(this).val($(this).val() + " x " + label);
			}
		});	
		

		return true; // ensure form still submits
    })  
    
    // Create scroll option for carousel inside modal

    $('.package-modal').bind('mousewheel DOMMouseScroll', function(e){

            if(e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
                $(this).carousel('prev');


            }
            else{
                $(this).carousel('next');

            }
        });

    //scroll slides on swipe for touch enabled devices 
    
    //$('.carousel-item.active').prev().show().css('opacity', '0.5');
    //$('.carousel-item.active').next().show().css('opacity', '0.5');

    $(".package-modal").on("touchstart", function(event){

        var yClick = event.originalEvent.touches[0].pageY;
        $(this).one("touchmove", function(event){

            var yMove = event.originalEvent.touches[0].pageY;
            if( Math.floor(yClick - yMove) > 1 ){
                $(".carousel").carousel('next');
            }
            else if( Math.floor(yClick - yMove) < -1 ){
                $(".carousel").carousel('prev');
            }
        });
        $(".carousel").on("touchend", function(){
            $(this).off("touchmove");
        });
    });    
    

})

// The debounce function receives our function as a parameter
const debounce = (fn) => {

  // This holds the requestAnimationFrame reference, so we can cancel it if we wish
  let frame;

  // The debounce function returns a new function that can receive a variable number of arguments
  return (...params) => {
    
    // If the frame variable has been defined, clear it now, and queue for next frame
    if (frame) { 
      cancelAnimationFrame(frame);
    }

    // Queue our function call for the next frame
    frame = requestAnimationFrame(() => {
      
      // Call our function and pass any params we received
      fn(...params);
    });

  } 
};


// Reads out the scroll position and stores it in the data attribute
// so we can use it in our stylesheets
const storeScroll = () => {
  document.documentElement.dataset.scroll = window.scrollY;
}

// Listen for new scroll events, here we debounce our `storeScroll` function
document.addEventListener('scroll', debounce(storeScroll), { passive: true });

// Update scroll position for first time
storeScroll();