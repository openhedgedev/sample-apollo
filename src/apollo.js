function apollohedge_nav()
{
    var navhtml = '\
      <a href="index.html">Home</a>\
      <a href="apollo-spot-buy-basic.html">Spot Buy</a>\
      <a href="apollo-spot-sell-basic.html">Spot Sell</a>\
      <a href="apollo-forward-buy-single.html">Forward Buy Single</a>\
      <a href="apollo-forward-sell-single.html">Forward Sell Single</a>\
      <a href="apollo-forward-buy-strip.html">Forward Buy Strip</a>\
      <a href="apollo-forward-flow.html">Forward Flow</a>\
      <br>\
      <a href="apollo-payroll.html">Apollo Payroll</a>\
      <a href="apollo-cars.html">Apollo Cars</a>\
      <a href="apollo-yachts.html">Apollo Yachts</a>\
      <br>\
      <a href="mock-forecast1-view.html">Mock Forecast 1</a>\
    ';
    document.querySelector("nav").innerHTML = navhtml;
}

apollohedge_nav();



function WidgetFormatAmount( amount )
{
    return amount.toLocaleString(undefined, 
    {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }); 
}
