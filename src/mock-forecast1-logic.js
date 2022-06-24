// ----------------------------------------------------------------------------
// 
// ----------------------------------------------------------------------------

function mockRefresh(  )
{
    console.log("Hello");

    var chosenCurrency = document.querySelector('input[name="currency"]:checked').value;
    var resultArray = [];

    console.log("chosen currency = " + chosenCurrency );

    for (let i = 0; i < dataPayroll.length; i++) 
    {
        if ( dataPayroll[i].currency == chosenCurrency )
        {

            resultItem = 
            {
                date: dataPayroll[i].date,
                category: "Payroll",
                description: dataPayroll[i].description,
                cashflow: 0 - dataPayroll[i].amount,
                hedging: 0,
                balance: 0
            }
            resultArray.push( resultItem );
        }
    }

    for (let i = 0; i < dataSales.length; i++) 
    {
        if ( dataSales[i].currency == chosenCurrency )
        {

            resultItem = 
            {
                date: dataSales[i].date,
                category: "Sales",
                description: dataSales[i].description,
                cashflow: dataSales[i].amount,
                hedging: 0,
                balance: 0
            }
            resultArray.push( resultItem );
        }
    }

    for (let i = 0; i < dataPurchases.length; i++) 
    {
        if ( dataPurchases[i].currency == chosenCurrency )
        {

            resultItem = 
            {
                date: dataPurchases[i].date,
                category: "Purchases",
                description: dataPurchases[i].description,
                cashflow: 0 - dataPurchases[i].amount,
                hedging: 0,
                balance: 0
            }
            resultArray.push( resultItem );
        }
    }


    for (let i = 0; i < dataHedging.length; i++) 
    {
        var desc = dataHedging[i].description + " [Sell " + dataHedging[i].sellCurrency + " " + dataHedging[i].sellAmount + "] [Buy " + dataHedging[i].buyCurrency + " " + dataHedging[i].buyAmount + "]";

        if ( dataHedging[i].buyCurrency == chosenCurrency )
        {

            resultItem = 
            {
                date: dataHedging[i].date,
                category: "Hedge Buy",
                description: desc,
                cashflow: 0 ,
                hedging: dataHedging[i].buyAmount,
                balance: 0
            }
            resultArray.push( resultItem );
        }

        if ( dataHedging[i].sellCurrency == chosenCurrency )
        {
            resultItem = 
            {
                date: dataHedging[i].date,
                category: "Hedge Sell",
                description: desc,
                cashflow: 0 ,
                hedging: 0 - dataHedging[i].sellAmount,
                balance: 0
            }
            resultArray.push( resultItem );
        }

    }

    // ------------------------------------------------------------------------
    // Sort
    // ------------------------------------------------------------------------
    sortResults( resultArray )

    // ------------------------------------------------------------------------
    // Add balances
    // ------------------------------------------------------------------------
    var rollingBalance = 0;
    for (let r = 0; r < resultArray.length; r++) 
    {
        var exposure = resultArray[r].cashflow + resultArray[r].hedging ;
        rollingBalance += exposure;
        resultArray[r].balance = rollingBalance;
        console.log("rolling balance = " + rollingBalance );
    }

    // ------------------------------------------------------------------------
    // Update the display
    // ------------------------------------------------------------------------
    var resultTable = document.getElementById("results");
    resultTable.innerHTML = "";

    var headerRow = resultTable.insertRow();

    var headerDate = headerRow.insertCell();
    headerDate.innerHTML = "Date";
    headerDate.className = "result-header";

    const headerCategory = headerRow.insertCell();
    headerCategory.innerHTML = "Category";
    headerCategory.className = "result-header";

    const headerDesc = headerRow.insertCell();
    headerDesc.innerHTML = "Description";
    headerDesc.className = "result-header";

    const headerCashflow = headerRow.insertCell();
    headerCashflow.innerHTML = "CashFlow "
    headerCashflow.className = "result-header";

    const headerHedging = headerRow.insertCell();
    headerHedging.innerHTML = "Hedging";
    headerHedging.className = "result-header";

    const headerBalance = headerRow.insertCell();
    headerBalance.innerHTML = "Balance "
    headerBalance.className = "result-header";

    for (let r = 0; r < resultArray.length; r++) 
    {
        var itemRow = resultTable.insertRow();

        var itemDate = itemRow.insertCell();
        itemDate.innerHTML = resultArray[r].date;
        itemDate.className = "column-date";

        var itemCategory = itemRow.insertCell();
        itemCategory.innerHTML = resultArray[r].category;
        itemCategory.className = "column-text";

        var itemDescription = itemRow.insertCell();
        itemDescription.innerHTML = resultArray[r].description;
        itemDescription.className = "column-text";

        var itemCashflow= itemRow.insertCell();
        itemCashflow.innerHTML = FormatAmount(resultArray[r].cashflow);
        itemCashflow.className = "column-amount";

        var itemHedging= itemRow.insertCell();
        itemHedging.innerHTML = FormatAmount(resultArray[r].hedging);
        itemHedging.className = "column-amount";

        var itemBalance= itemRow.insertCell();
        itemBalance.innerHTML = FormatAmount(resultArray[r].balance);

        if ( resultArray[r].balance < 0 )
        {
            itemBalance.className = "column-amount-negative";
        }
        else
        {
            itemBalance.className = "column-amount";
        }
    }
}

function resultComparator(a,b)
{
    var diff = 0;
    if ( a.date > b.date)
    {
        diff = 1;
    } else if ( a.date < b.date)
    {
        diff = -1;
    }
    else
    {
        diff = 0;
    }
    return diff;
}

function sortResults( resultArray )
{
    resultArray.sort( resultComparator );
}

function FormatAmount( amount )
{
    return amount.toLocaleString(undefined, 
    {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }); 
}

mockRefresh()

// ----------------------------------------------------------------------------
// END OF FILE
// ----------------------------------------------------------------------------
