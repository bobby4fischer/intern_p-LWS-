let count=0;
const counterDisplay=document.getElementById("counter");
const incre=document.getElementById("increment");
const decre=document.getElementById("decrement");
const res=document.getElementById("reset");

incre.addEventListener("click",()=>{
  count++;
  updateDisplay();
});

decre.addEventListener("click",()=>{
  count--;
  updateDisplay();
});

res.addEventListener("click",()=>{
  count = 0;
  updateDisplay();
});

function updateDisplay() {
  counterDisplay.textContent = count;
}
