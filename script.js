//API FILE PATH//https://github.com/fawazahmed0/exchange-api?tab=readme-ov-file

//BASE URL
const base_url= "https://2024-03-06.currency-api.pages.dev/v1/currencies/eur.json"
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr= document.querySelector(".from select");
const toCurr= document.querySelector(".to select");
const msg = document.querySelector(".msg");

window.addEventListener("load", ()=> {
      updateExchangeRate();
})  // The window is the first thing that loads into the browser


for(let select of dropdowns) {
    for(currCode in countryList) {
       //Code=Currency Code and CountryList= Country Code
            let newOption = document.createElement("option");
            newOption.innerText = currCode;
            newOption.value = currCode;
            if (select.name==="from" && currCode === "USD"){
                newOption.selected = "selected";
            } else if (select.name ==="to" && currCode ==="INR"){
                newOption.selected = "selected";
            }
            select.append(newOption);
        }

        select.addEventListener("change", (event) =>{
            updateFlag(event.target); //target refers to <select>
        });
    
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode= countryList[currCode]; //INR will have IN USD will have US
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.previousElementSibling;
    img.src= newSrc;
}

btn.addEventListener("click", async (event)=>{
    event.preventDefault();
    updateExchangeRate();
});

const updateExchangeRate = async() => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal==="" || amtVal<1){
        amount.value=1;
    }
    
    const URL = `https://2024-03-06.currency-api.pages.dev/v1/currencies/${fromCurr.value.toLowerCase()}.json`
    // console.log(fromCurr.value, toCurr.value);
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()] //This block works fine
    
    let finalAmount = amount.value * rate;
    msg.innerText = `${amount.value} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`
}

// let rate = data.aed.usd; This block works fine
//  let rate = data['usd']['inr']; Similar block which works fine




