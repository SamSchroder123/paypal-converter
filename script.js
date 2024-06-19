async function calculateCharge() {
  const fixedFeeUSD = 0.49;
  const customerChargeZAR = document.getElementById("customerCharge").value;
  const conversionRate = await fetchConversionRate();
  const fixedFeeZAR = fixedFeeUSD / conversionRate;
  const baseChargeZAR = (customerChargeZAR - fixedFeeZAR) / 1.0349;
  const baseChargeUSD = baseChargeZAR * conversionRate;

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
  console.log(data);
  return parseFloat(data.data.rates.PYUSD);
}
