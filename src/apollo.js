function apollohedge_nav()
{
    var navhtml = '\
      <a href="index.html">Home</a>\
      <a href="apollo-spot-buy-basic.html">Spot Buy</a>\
      <a href="apollo-spot-sell-basic.html">Spot Sell</a>\
      <a href="apollo-forward-buy-single.html">Forward Buy Single</a>\
      <a href="apollo-forward-buy-6xmonths.html">Forward Buy 6xMonths</a>\
      <br>\
      <a href="apollo-payroll.html">Apollo Payroll</a>\
      <a href="apollo-cars.html">Apollo Cars</a>\
      <a href="apollo-yachts.html">Apollo Yachts</a>\
    ';
    document.querySelector("nav").innerHTML = navhtml;
}

apollohedge_nav();

