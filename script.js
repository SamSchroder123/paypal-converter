async function calculateCharge() {
  const fixedFeeUSD = 0.49; //update if the fixed fee for paypal checkout changes
  const customerChargeZAR = document.getElementById("customerCharge").value;
  const conversionRate = await fetchConversionRate(); //get the conversion rate from coinbase
  const fixedFeeZAR = fixedFeeUSD / conversionRate; //convert the fixed fee to ZAR
  const baseChargeZAR = (customerChargeZAR - fixedFeeZAR) / 1.0349; //1.0349 is the percentage rate for receiving domestic transactions
  const baseChargeUSD = baseChargeZAR * conversionRate; //convert the base charge to USD

  // Detailed breakdown for transparency
  let detailedResult = `
        <strong>Details of Calculation:</strong><br>
        Customer Charge (ZAR): ${customerChargeZAR}<br>
        Conversion Rate (ZAR to USD): ${conversionRate.toFixed(4)}<br>
        Fixed Fee in ZAR (0.49 USD): ${fixedFeeZAR.toFixed(2)} ZAR<br>
        <strong>Result:</strong><br><br>
        Base Charge (ZAR): ${baseChargeZAR.toFixed(2)} ZAR<br>
        Base Charge (USD): ${baseChargeUSD.toFixed(2)} USD
    `;

  document.getElementById("result").innerHTML = detailedResult;
}

async function fetchConversionRate() {
  const response = await fetch(
    "https://api.coinbase.com/v2/exchange-rates?currency=ZAR"
  );
  const data = await response.json();
  //console.log(data);
  return parseFloat(data.data.rates.PYUSD);
}
