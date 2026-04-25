let expression = "";
let justCalculated = false;

const displayExpression = document.getElementById("expression");
const displayResult = document.getElementById("result");

function updateDisplay() {
  const visual = expression.replace(/\*/g, "×").replace(/\//g, "÷");
  displayExpression.textContent = visual;
}

function appendToExpression(value) {
  const operators = ["+", "-", "*", "/"];
  const lastChar = expression.slice(-1);
  if (justCalculated) {
    if (!operators.includes(value)) {
      expression = "";
    }
    justCalculated = false;
  }
  if (operators.includes(value) && operators.includes(lastChar)) {
    expression = expression.slice(0, -1);
  }
  if (value === ".") {
    const parts = expression.split(/[\+\-\*\/]/);
    const currentPart = parts[parts.length - 1];
    if (currentPart.includes(".")) return;
  }

  expression += value;
  updateDisplay();
  try {
    const preview = eval(expression);
    if (!isNaN(preview) && isFinite(preview)) {
      displayResult.textContent = formatNumber(preview);
    }
  } catch {}
}

function calculate() {
  if (!expression) return;

  try {
    let result = eval(expression);

    if (!isFinite(result)) {
      displayResult.textContent = "Erro";
      expression = "";
      displayExpression.textContent = "";
      return;
    }

    displayExpression.textContent =
      expression.replace(/\*/g, "×").replace(/\//g, "÷") + " =";

    result = parseFloat(result.toFixed(10));
    displayResult.textContent = formatNumber(result);
    expression = String(result);
    justCalculated = true;
  } catch {
    displayResult.textContent = "Erro";
    expression = "";
    displayExpression.textContent = "";
  }
}

function clearAll() {
  expression = "";
  displayExpression.textContent = "";
  displayResult.textContent = "0";
  justCalculated = false;
}

function clearEntry() {
  expression = expression.slice(0, -1);
  updateDisplay();
  if (!expression) {
    displayResult.textContent = "0";
  }
}

function formatNumber(num) {
  return num.toLocaleString("pt-BR", { maximumFractionDigits: 10 });
}
document.addEventListener("keydown", (e) => {
  if (e.key >= "0" && e.key <= "9") appendToExpression(e.key);
  else if (e.key === "+") appendToExpression("+");
  else if (e.key === "-") appendToExpression("-");
  else if (e.key === "*") appendToExpression("*");
  else if (e.key === "/") {
    e.preventDefault();
    appendToExpression("/");
  } else if (e.key === "%") appendToExpression("%");
  else if (e.key === ".") appendToExpression(".");
  else if (e.key === "Enter" || e.key === "=") calculate();
  else if (e.key === "Backspace") clearEntry();
  else if (e.key === "Escape") clearAll();
});
