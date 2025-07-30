const display = document.getElementById("display");
const modeSwitch = document.getElementById("modeSwitch");
const historyList = document.getElementById("historyList");
let history = [];

function append(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = "";
}

function calculate() {
  try {
    const result = eval(display.value);
    if (display.value) {
      updateHistory(`${display.value} = ${result}`);
    }
    display.value = result;
  } catch {
    display.value = "Error";
  }
}

function updateHistory(entry) {
  history.unshift(entry);
  if (history.length > 10) history.pop();
  renderHistory();
}

function renderHistory() {
  historyList.innerHTML = "";
  history.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    historyList.appendChild(li);
  });
}

modeSwitch.addEventListener("change", () => {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
});

function showTab(tabId) {
  document.querySelectorAll(".tab-content").forEach(tab => {
    tab.classList.add("hidden");
  });
  document.getElementById(tabId).classList.remove("hidden");
}

// Currency Converter
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");

const currencies = ["USD", "KES", "EUR", "GBP", "INR", "JPY", "CNY"];

currencies.forEach(cur => {
  fromCurrency.innerHTML += `<option value="${cur}">${cur}</option>`;
  toCurrency.innerHTML += `<option value="${cur}">${cur}</option>`;
});

async function convertCurrency() {
  const amount = parseFloat(document.getElementById("currencyInput").value);
  const from = fromCurrency.value;
  const to = toCurrency.value;
  if (isNaN(amount)) return alert("Enter valid amount.");

  try {
    const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
    const data = await res.json();
    const rate = data.rates[to];
    const converted = (amount * rate).toFixed(2);
    document.getElementById("currencyResult").textContent = `${amount} ${from} = ${converted} ${to}`;
  } catch {
    alert("Currency API error");
  }
}

// Weight Converter
const weightRates = {
  g: 1,
  kg: 1000,
  lb: 453.592,
  oz: 28.3495
};

function convertWeight() {
  const amount = parseFloat(document.getElementById("weightInput").value);
  const from = document.getElementById("fromWeight").value;
  const to = document.getElementById("toWeight").value;
  if (isNaN(amount)) return alert("Enter valid weight.");

  const grams = amount * weightRates[from];
  const result = grams / weightRates[to];
  document.getElementById("weightResult").textContent = `${amount} ${from} = ${result.toFixed(2)} ${to}`;
}

// Font & Background Color Switchers
document.getElementById("fontSelect").addEventListener("change", function () {
  document.body.style.fontFamily = this.value;
});

document.getElementById("colorSelect").addEventListener("change", function () {
  document.getElementById("mainBox").style.setProperty("--box-bg", this.value);
});

