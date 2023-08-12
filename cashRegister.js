function checkCashRegister(price, cash, cid) {
  let change = cash * 100 - price * 100;
  let drawerTotal = 0;
  
  for (let key of cid) {
    drawerTotal += key[1] * 100;
  }

  if (change > drawerTotal) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  } else if (change === drawerTotal) {
    return { status: "CLOSED", change: cid };
  } else {
    let result = [];
    cid.reverse();
    
    let currencyUnit = {
      "ONE HUNDRED": 10000,
      "TWENTY": 2000,
      "TEN": 1000,
      "FIVE": 500,
      "ONE": 100,
      "QUARTER": 25,
      "DIME": 10,
      "NICKEL": 5,
      "PENNY": 1
    };

    for (let key of cid) {
      let moneyHolder = [key[0], 0];
      key[1] *= 100;

      while (change >= currencyUnit[key[0]] && key[1] > 0) {
        change -= currencyUnit[key[0]];
        key[1] -= currencyUnit[key[0]];
        moneyHolder[1] += currencyUnit[key[0]] / 100;
      }
      
      if (moneyHolder[1] > 0) {
        result.push(moneyHolder);
      }
    }
    
    if (change > 0) {
      return { status: "INSUFFICIENT_FUNDS", change: [] };
    }
    
    return { status: "OPEN", change: result };
  }
}

console.log(checkCashRegister(19.5, 20, 
[
  ["PENNY", 1.01], 
  ["NICKEL", 2.05], 
  ["DIME", 3.1], 
  ["QUARTER", 4.25], 
  ["ONE", 90], 
  ["FIVE", 55], 
  ["TEN", 20], 
  ["TWENTY", 60], 
  ["ONE HUNDRED", 100]
]));
