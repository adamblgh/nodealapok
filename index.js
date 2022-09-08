const szam = Math.round(Math.random()*100)

console.log("====================")
console.log(`A véletlen szám: ${szam}`)
console.log("====================")
if(szam>=50){
    console.log("Gratulálunk!")
}
else{
    console.log("Sajnáljuk!")
}
console.log("====================")
//rövidebben
szam>=50 ? console.log("Ügyes vagy!") : console.log("Béna vagy!")
console.log("====================")


import { diakok } from "./adatok.js"

console.log(`A diákok létszáma: ${diakok.length}`)
console.log("====================")