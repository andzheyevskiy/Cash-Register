let price = 19.5;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];
const changedom = document.getElementById("change-due")
const cash = document.getElementById("cash")
const purchase = document.getElementById("purchase-btn")
const total = document.getElementById("total")
const pantalla = document.getElementById("pantalla")

const updateScreen=()=>{
  pantalla.innerHTML=`<p><strong>Change in drawer:</strong></p>`
  cid.forEach((element)=>{
  pantalla.insertAdjacentHTML("beforeend",`
  <p style="text-transform: capitalize;">${element[0].toLowerCase()}: ${element[1]}$</p>
  `)})
  total.innerHTML=`Total: ${price}$`
  }

const pay =()=>{
  changedom.innerHTML=""
    if (Number(cash.value) < price) {
        alert('Customer does not have enough money to purchase the item')
        cash.value = ''
        return
      }
      if (Number(cash.value) === price) {
        changedom.innerHTML ='No change due - customer paid with exact cash'
        cash.value = ''
        return;
      }
    let status = ""
    let change = (Number(cash.value) - price).toFixed(2)
    const values = [100,20,10,5,1,0.25,0.1,0.05,0.01]
    let changearray= []
    let totalCid = [...cid].reverse()  
    for(let i =0; i<totalCid.length; i++){
        totalCid[i][2]=values[i]
    }
    const totalMoney= totalCid.map(element => parseFloat(element[1])).reduce((acc,curt)=>acc+curt,0).toFixed(2)
    if(totalMoney<change){
        status=`INSUFFICIENT_FUNDS`
    }
    if(change===totalMoney){
        status= `CLOSED`
    }

    totalCid.forEach((element)=>{
        let count = 0
        while(change>=element[2] && element[1]>0){
            change= (change - element[2]).toFixed(2)
            element[1]=(element[1] - element[2]).toFixed(2)
            count++
        }
        if(count>0)
        {changearray.push([element[0],count*element[2]])}
    })
    if(change>0){
      status="INSUFFICIENT_FUNDS"
    }
    if(change==0){
      const moneyLeft = totalCid.map(element => parseFloat(element[1])).reduce((acc,curt)=>acc+curt,0).toFixed(2)
      status = moneyLeft>0?"OPEN":"CLOSED"
      changearray.forEach((element)=>{
        changedom.insertAdjacentHTML("beforeend",`
        <p>${element[0]}: $${element[1]}</p>
        `)
      })
    }
    changedom.insertAdjacentHTML("afterbegin",`
    Status: ${status}
    `)
    cid = totalCid.reverse()
    updateScreen()

    console.log(cid)
}


updateScreen()
purchase.addEventListener("click",pay)
