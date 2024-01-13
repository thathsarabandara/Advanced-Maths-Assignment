var totalCost =0;
var totalDrugCost=0;
var totalLivingCost=0 ;
var loanAmount =0;
var monthlyEarning =0;
var remainingBudget=0;
var loanAmount =0;
const MONTHLY_LIVING_COST = 14000;

$(document).ready(function() {
  function showHideSections() {
    var entityType = document.getElementById("entityType").value;

    document.getElementById("alcohol-section").style.display = entityType === "alcohol" ? "block" : "none";
    document.getElementById("cigarettes-section").style.display = entityType === "cigarettes" ? "block" : "none";
    document.getElementById("cigarettes-and-alcohol-section").style.display = entityType === "cigarettes-and-alcohol" ? "block" : "none";
    document.getElementById("other-section").style.display = entityType === "other" ? "block" : "none";
}

function showHideCivilStatusSections() {
    var civilStatus = document.getElementById("Civilstatus").value;
    document.getElementById("Married-section").style.display = civilStatus === "Married" ? "block" : "none";
    document.getElementById("single-section").style.display = civilStatus === "Single" ? "block" : "none";
}
  updateBarChart();
document.getElementById("entityType").addEventListener('change', showHideSections);
document.getElementById("Civilstatus").addEventListener('change', showHideCivilStatusSections);
document.getElementById('calculateButton').addEventListener('click', calculateLoss);

function calculateLoss() {



    if (document.getElementById("entityType").value === "alcohol" ) {
        var alcoholpurchases = parseFloat(document.getElementById("alcohol-purchases").value);
        var turnsalcohol = parseFloat(document.getElementById("turns-alcohol").value);
        totalDrugCost =  alcoholpurchases *  turnsalcohol;
    }else if (document.getElementById("entityType").value === "cigarettes"){
        var cigarettesperday = parseFloat(document.getElementById("cigarettes-per-day").value);
        var costpercigarette = parseFloat(document.getElementById("cost-per-cigarette").value);
        var turnscigarettes = parseFloat(document.getElementById("turns-cigarettes").value);
        totalDrugCost =  cigarettesperday*  costpercigarette *turnscigarettes;
    } else if (document.getElementById("entityType").value === "cigarettes-and-alcohol") {
        var alcoholPurchases = parseFloat(document.getElementById("alcohol-purchases").value);
        var turnsAlcohol = parseFloat(document.getElementById("turns-alcohol").value);
        var cigarettesperday = parseFloat(document.getElementById("cigarettes-per-day").value);
        var costpercigarette = parseFloat(document.getElementById("cost-per-cigarette").value);
        var turnscigarettes = parseFloat(document.getElementById("turns-cigarettes").value);
        var totalalcoholcost = alcoholPurchases * turnsAlcohol;
        var totalcigeretcost = cigarettesperday * costpercigarette * turnscigarettes;
        totalDrugCost = totalalcoholcost + totalcigeretcost;
    } else if (document.getElementById("entityType").value === "other"){
        var costperotheronetime = parseFloat(document.getElementById("cost-per-other-onetime").value);
        var otherpermonth = parseFloat(document.getElementById("other-per-month").value);
        totalDrugCost =  costperotheronetime  *  otherpermonth;
    }

    if (document.getElementById("Civilstatus").value === "Married") {
        var familyMembers = parseFloat(document.getElementById("Family-members").value);
        var jobMembers = parseFloat(document.getElementById("job-members").value);
        monthlyEarning = parseFloat(document.getElementById("total-earning").value);
        totalLivingCost = (MONTHLY_LIVING_COST * familyMembers);
    } else if (document.getElementById("Civilstatus").value === "Single") {
        monthlyEarning = parseFloat(document.getElementById("single-person-earn").value);
        totalLivingCost = MONTHLY_LIVING_COST;
    }
    totalCost = totalDrugCost +  totalLivingCost;
    
    var result1Element = document.getElementById("value1");
    var result2Element = document.getElementById("value2");
    var result3Element = document.getElementById("value3");
    var result4Element = document.getElementById("value4");
    var result5Element = document.getElementById("value5");
    if ( totalCost > monthlyEarning) {
        loanAmount = totalCost - monthlyEarning;
       }
       remainingBudget = monthlyEarning - totalCost;
       result1Element.innerHTML = "Rs." + totalDrugCost.toFixed(2) ;
       result2Element.innerHTML = "Rs." + totalLivingCost.toFixed(2) ;
       result3Element.innerHTML = "Rs." + monthlyEarning.toFixed(2) ;
       result4Element.innerHTML = "Rs." + remainingBudget.toFixed(2) ;
       result5Element.innerHTML = "Rs." + loanAmount.toFixed(2) ;
       
       updateBarChart(); 
       updatePieChart();
}
function updatePieChart() {
  var ctx = document.getElementById("mypiechart").getContext("2d");
  mypiechart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Total Drug Cost", "Monthly Earning"],
      datasets: [
        {
          data: [totalDrugCost, monthlyEarning],
          backgroundColor: ['rgba(255, 99, 132, 1)', 'rgba(255, 206, 86, 1)'],
          borderWidth: 0,
        },
      ],
    },
  });
}


function updateBarChart() {
  var ctx = document.getElementById('myChart').getContext('2d');

  // Clear existing chart to avoid conflicts
  if (window.myBarChart) {
    window.myBarChart.destroy();
  }

  window.myBarChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Total Drug Cost', 'Total Living Cost', 'Monthly Earning', 'Remaining Budget', 'Loan Amount'],
      datasets: [{
        label: 'Economy Loss',
        data: [totalDrugCost, totalLivingCost, monthlyEarning, remainingBudget, loanAmount],
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

  // Smooth scrolling
  $(function() {
    $('a[href*="#"]:not([href="#"])').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');

        if (target.length) {
          $('html, body').animate({
            scrollTop: target.offset().top
          }, 1000, 'easeInOutExpo');

          if ( $(this).parents('.nav-menu').length ) {
            $('.nav-menu .menu-active').removeClass('menu-active');
            $(this).closest('li').addClass('menu-active');
          }

          if ( $('body').hasClass('mobile-nav-active') ) {
              $('body').removeClass('mobile-nav-active');
              $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
              $('#mobile-body-overly').fadeOut();
          }
          return false;
        }
      }
    });
  });

  // Initiate superfish on nav menu
  $('.nav-menu').superfish({
    animation: {opacity:'show'},
    speed: 400
  });

  // Mobile Navigation
  if( $('#nav-menu-container').length ) {
      var $mobile_nav = $('#nav-menu-container').clone().prop({ id: 'mobile-nav'});
      $mobile_nav.find('> ul').attr({ 'class' : '', 'id' : '' });
      $('body').append( $mobile_nav );
      $('body').prepend( '<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>' );
      $('body').append( '<div id="mobile-body-overly"></div>' );
      $('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');

      $(document).on('click', '.menu-has-children i', function(e){
          $(this).next().toggleClass('menu-item-active');
          $(this).nextAll('ul').eq(0).slideToggle();
          $(this).toggleClass("fa-chevron-up fa-chevron-down");
      });

      $(document).on('click', '#mobile-nav-toggle', function(e){
          $('body').toggleClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').toggle();
      });

      $(document).click(function (e) {
          var container = $("#mobile-nav, #mobile-nav-toggle");
          if (!container.is(e.target) && container.has(e.target).length === 0) {
             if ( $('body').hasClass('mobile-nav-active') ) {
                  $('body').removeClass('mobile-nav-active');
                  $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
                  $('#mobile-body-overly').fadeOut();
              }
          }
      });
  } else if ( $("#mobile-nav, #mobile-nav-toggle").length ) {
      $("#mobile-nav, #mobile-nav-toggle").hide();
  }

  // Stick the header at top on scroll
  $("#header").sticky({topSpacing:0, zIndex: '50'});

  // Counting numbers

  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });

  // Tooltip & popovers
  $('[data-toggle="tooltip"]').tooltip();
  $('[data-toggle="popover"]').popover();

  // Background image via data tag
  $('[data-block-bg-img]').each(function() {
    // @todo - invoke backstretch plugin if multiple images
    var $this = $(this),
      bgImg = $this.data('block-bg-img');

      $this.css('backgroundImage','url('+ bgImg + ')').addClass('block-bg-img');
  });

  // jQuery counterUp
  if(jQuery().counterUp) {
    $('[data-counter-up]').counterUp({
      delay: 20,
    });
  }

  //Scroll Top link
  $(window).scroll(function(){
    if ($(this).scrollTop() > 100) {
      $('.scrolltop').fadeIn();
    } else {
      $('.scrolltop').fadeOut();
    }
  });

  $('.scrolltop, #logo a').click(function(){
    $("html, body").animate({
      scrollTop: 0
    }, 1000, 'easeInOutExpo');
    return false;
  });

});
