var infix;
var ISP = ["#", "(", "", "+", "-", "", "*", "/", "%", "^", "", ""];
var ICP = ["#", ")", "", "+", "-", "", "*", "/", "%", "^", "", "", "("];
var stack = ["#"];
var sstack = [];
var Postfix = [];
var stackTop = 0;
var ANS = "0";
var isFirstInput = true;
var RightbracketSwitch = 0;
var RadDeg = true;
const customInput = document.getElementById("customInput");
const hiddenInput = document.getElementById("calculator");
const equation = document.getElementById("output").querySelector("p");
const allowedCharacters = "0123456789.()%/*-+!lL^scteEpAinoagXPNSπr√";
const nallowedfirstCharacters = "inoagXPNS";
const operators2 = /[+\-*\/%(^]$/; // 正则表达式，用于匹配运算符
const operators1 = /[+\-*\/%^)!]$/; // 正则表达式，用于匹配运算符
hiddenInput.value = "";
customInput.textContent = "0";
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
function Ins() {
  alert("hello");
}
// 当自定义输入框被点击时，让隐藏的输入框获得焦点
customInput.addEventListener("click", () => {
  hiddenInput.focus();
  hiddenInput.setSelectionRange(
    hiddenInput.value.length,
    hiddenInput.value.length
  );
});
hiddenInput.addEventListener("keydown", function (event) {
  if (event.key === "Backspace" || event.key === "Delete") {
    event.preventDefault(); // Prevent the default action
  }
});
// 当隐藏的输入框输入内容时，同步到自定义输入框中
hiddenInput.addEventListener("input", () => {
  console.log(hiddenInput.value[hiddenInput.value.length - 1]);
  if (
    nallowedfirstCharacters.includes(
      hiddenInput.value[hiddenInput.value.length - 1]
    )
  ) {
    hiddenInput.value = hiddenInput.value.slice(
      0,
      hiddenInput.value.length - 1
    );
    return;
  }
  if (
    hiddenInput.value !==
    hiddenInput.value
      .split("")
      .filter((char) => allowedCharacters.includes(char))
      .join("")
  ) {
    hiddenInput.value = hiddenInput.value
      .split("")
      .filter((char) => allowedCharacters.includes(char))
      .join("");
    console.log(hiddenInput.value);
    return;
  }
  equation.textContent = "ANS = ";
  equation.textContent += ANS;

  //必須放前面，因為會改變輸入內容
  if (operators1.test(hiddenInput.value[0])) {
    hiddenInput.value = "";
    return;
  }
  if (operators2.test(hiddenInput.value[hiddenInput.value.length - 2])) {
    if (operators1.test(hiddenInput.value[hiddenInput.value.length - 1])) {
      if (
        hiddenInput.value[hiddenInput.value.length - 1] !== "-" ||
        hiddenInput.value[hiddenInput.value.length - 2] !== "("
      )
        hiddenInput.value = hiddenInput.value.slice(0, -1); // 截取字符串，从开头到倒数第二个字符
    }
  }
  if (hiddenInput.value[hiddenInput.value.length - 1] == "p") {
    hiddenInput.value = hiddenInput.value.slice(0, -1) + "π"; // 截取字符串，从开头到倒数第二个字符
  }

  //必須放後面，根據前面的內容判斷後面的輸入結構
  if (hiddenInput.value[hiddenInput.value.length - 1] === "(") {
    RightbracketSwitch++;
  }

  if (hiddenInput.value[hiddenInput.value.length - 1] === ")") {
    if (RightbracketSwitch > 0) {
      RightbracketSwitch--;
    } else {
      hiddenInput.value = hiddenInput.value.slice(
        0,
        hiddenInput.value.length - 1
      );
    }
  }
  if (hiddenInput.value[hiddenInput.value.length - 1] === "s") {
    RightbracketSwitch++;
    hiddenInput.value = hiddenInput.value + "in(";
  } else if (hiddenInput.value[hiddenInput.value.length - 1] === "c") {
    RightbracketSwitch++;
    hiddenInput.value = hiddenInput.value + "os(";
  } else if (hiddenInput.value[hiddenInput.value.length - 1] === "t") {
    RightbracketSwitch++;
    hiddenInput.value = hiddenInput.value + "an(";
  } else if (hiddenInput.value[hiddenInput.value.length - 1] === "l") {
    RightbracketSwitch++;
    hiddenInput.value = hiddenInput.value + "n(";
  } else if (hiddenInput.value[hiddenInput.value.length - 1] === "L") {
    RightbracketSwitch++;
    hiddenInput.value =
      hiddenInput.value.slice(0, hiddenInput.value.length - 1) + "log(";
  } else if (hiddenInput.value[hiddenInput.value.length - 1] == "r") {
    RightbracketSwitch++;
    hiddenInput.value =
      hiddenInput.value.slice(0, hiddenInput.value.length - 1) + "√(";
  } else if (hiddenInput.value[hiddenInput.value.length - 1] === "A") {
    hiddenInput.value = hiddenInput.value + "NS";
  } else if (hiddenInput.value[hiddenInput.value.length - 1] === "E") {
    hiddenInput.value = hiddenInput.value + "XP";
  }
  customInput.textContent = hiddenInput.value;
});

function AC() {
  customInput.textContent = "0";
  hiddenInput.value = "";
  RightbracketSwitch = 0;
}
function Changemode() {
  RadDeg = !RadDeg;
  var paragraphs = document.querySelectorAll("#myDiv p");
  if (paragraphs[0].style.color === "gray") {
    paragraphs[0].style.color = "black";
    paragraphs[2].style.color = "gray";
  } else {
    paragraphs[0].style.color = "gray";
    paragraphs[2].style.color = "black";
  }
}
function Hmultiplication(infix) {
  for (i = 0; i < infix.length; i++) {
    if (
      infix[i] == "(" ||
      infix[i] == "s" ||
      infix[i] == "c" ||
      infix[i] == "t" ||
      infix[i] == "A" ||
      infix[i] == "E" ||
      infix[i] == "π" ||
      infix[i] == "e" ||
      infix[i] == "√"
    ) {
      switch (infix[i - 1]) {
        case ")":
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case "e":
        case "π":
        case "S":
        case "P":
        case "!":
          infix.splice(i, 0, "*");
      }
    } else if (
      infix[i] == ")" ||
      infix[i] == "π" ||
      infix[i] == "e" ||
      infix[i] == "S" ||
      infix[i] == "P" ||
      infix[i] == "!"
    ) {
      switch (infix[i + 1]) {
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case "e":
        case "π":
        case "s":
        case "√":
        case "c":
        case "t":
        case "A":
        case "E":
        case "l":
          infix.splice(i + 1, 0, "*");
      }
    }
  }
}
function normalization(infix) {
  for (i = 0; i < infix.length; i++) {
    switch (infix[i]) {
      case "-":
        for (j = 1; i >= j; j++) {
          if (infix[i - j] != " ") {
            if (infix[i - j] == "(") {
              infix.splice(i++, 0, "0");
            }
            break;
          }
        }
      case ")":
      case "#":
      case "(":
      case "+":
      case "*":
      case "/":
      case "^":
      case "%":
      case "!":
        infix.splice(i + 1, 0, " ");
        infix.splice(i, 0, " ");
        i += 2;
        break;
      case "π":
        infix.splice(i, 1, "3.14159265359");
        break;
      case "e":
        infix.splice(i, 1, "2.71828182846");
        break;
      case "E":
        if (!infix[i + 3].match(/[0-9]/)) {
          infix.splice(i, 3, "1");
          infix.splice(i, 0, " ");
          infix.splice(i, 0, "^");
          infix.splice(i, 0, " ");
          infix.splice(i, 0, "0");
          infix.splice(i, 0, "1");
        } else {
          infix.splice(i, 3, " ");
          infix.splice(i, 0, "^");
          infix.splice(i, 0, " ");
          infix.splice(i, 0, "0");
          infix.splice(i, 0, "1");
        }
        console.log("E", infix);
        break;
    }
  }
}

function input() {
  if (hiddenInput.value === "") {
    return;
  }
  infix = hiddenInput.value.split(""); // 將輸入的字串轉換為字元陣列
  console.log(infix);
  infix.push("#");
  Hmultiplication(infix);
  normalization(infix);
  infixToPostfix(infix, infix.length);
  computeresult();
  equation.textContent = hiddenInput.value;
  equation.textContent += " =";
  customInput.textContent = String(Number(Postfix[0]));
  ANS = Number(Postfix[0]);
  console.log(Postfix[0]);
  Postfix = [];
  hiddenInput.value = "";
  RightbracketSwitch = 0;
}
function factorialIterative(n) {
  let result = 1;
  for (let i = 1; i <= n; i++) {
    result *= i;
  }
  return result;
}
function computeresult() {
  let result;
  stack = ["#"];
  stackTop = 0;
  console.log("Postfix[0]", Postfix[0]);
  for (i = 0; i < Postfix.length; i++) {
    switch (Postfix[i]) {
      case "!":
        if (Number.isInteger(Number(Postfix[i - 1])))
          result = factorialIterative(Number(Postfix[i - 1]));
        else result = gamma(Number(Postfix[i - 1]) + 1);
        Postfix.splice(i - 1, 2, result);
        i -= 1;
        break;
      case "+":
        result = String(Number(Postfix[i - 1]) + Number(Postfix[i - 2]));
        Postfix.splice(i - 2, 3, result);
        i -= 2;
        break;
      case "-":
        result = String(Number(Postfix[i - 2]) - Number(Postfix[i - 1]));
        Postfix.splice(i - 2, 3, result);
        i -= 2;
        break;
      case "*":
        result = String(Number(Postfix[i - 1]) * Number(Postfix[i - 2]));
        Postfix.splice(i - 2, 3, result);
        i -= 2;
        break;
      case "/":
        result = String(Number(Postfix[i - 2]) / Number(Postfix[i - 1]));
        Postfix.splice(i - 2, 3, result);
        i -= 2;
        break;
      case "^":
        result = String(Number(Postfix[i - 2]) ** Number(Postfix[i - 1]));
        Postfix.splice(i - 2, 3, result);
        i -= 2;
        console.log(Postfix);
        break;
      case "%":
        result = String(Number(Postfix[i - 2]) % Number(Postfix[i - 1]));
        Postfix.splice(i - 2, 3, result);
        i -= 2;
        break;
      case "s":
        if (RadDeg) result = Math.sin(Number(Postfix[i - 1]));
        else result = Math.sin((Number(Postfix[i - 1]) / 180) * 3.14);
        Postfix.splice(i - 1, 2, result);
        i -= 1;
        break;
      case "ANS":
        console.log("A");
        result = Number(ANS);
        Postfix.splice(i, 1, result);
        break;
      case "c":
        if (RadDeg) result = Math.cos(Number(Postfix[i - 1]));
        else result = Math.cos((Number(Postfix[i - 1]) / 180) * 3.14);
        Postfix.splice(i - 1, 2, result);
        i -= 1;
        break;
      case "t":
        if (RadDeg) result = Math.tan(Number(Postfix[i - 1]));
        else result = Math.tan((Number(Postfix[i - 1]) / 180) * 3.14);
        Postfix.splice(i - 1, 2, result);
        i -= 1;
        break;
      case "ln":
        result = Math.log(Number(Postfix[i - 1]));
        Postfix.splice(i - 1, 2, result);
        i -= 1;
        break;
      case "lo":
        result = Math.log10(Number(Postfix[i - 1]));
        Postfix.splice(i - 1, 2, result);
        i -= 1;
        break;
      case "√":
        result = Math.pow(Number(Postfix[i - 1]), 1 / 2);
        Postfix.splice(i - 1, 2, result);
        i -= 1;
        break;
    }
  }
  console.log(Postfix[0]);
}
function infixToPostfix(infixQ, rear) {
  for (i = 0; i < rear; i++) {
    switch (infixQ[i]) {
      case "√":
        infix.splice(i--, 1);
        sstack.push("√");
        console.log(sstack);
        break;
      case "s":
        infix.splice(i--, 3);
        sstack.push("s");
        console.log(sstack);
        break;
      case "c":
        infix.splice(i--, 3);
        sstack.push("c");
        console.log(sstack);
        break;
      case "t":
        infix.splice(i--, 3);
        sstack.push("t");
        console.log(sstack);
        break;
      case "l":
        if (infixQ[i + 1] === "n") {
          infix.splice(i--, 2);
          sstack.push("ln");
          console.log(sstack);
          break;
        } else {
          infix.splice(i--, 3);
          sstack.push("lo");
          console.log(sstack);
          break;
        }
      case ")":
        while (stack[stackTop] != "(") {
          Postfix.push(" ");
          Postfix.push(stack[stackTop--]);
        }
        if (sstack.length > 0) {
          Postfix.push(" ");
          Postfix.push(sstack[sstack.length - 1]);
          sstack.pop;
          console.log(Postfix);
        }
        stackTop--;
        break;
      case "#":
        while (stack[stackTop] != "#") {
          Postfix.push(" ");
          Postfix.push(stack[stackTop--]);
        }
        break;
      case "(":
      case "-":
      case "+":
      case "*":
      case "/":
      case "^":
      case "%":
        while (compare(stack[stackTop], infixQ[i])) {
          Postfix.push(" ");
          Postfix.push(stack[stackTop--]);
        }
        stack[++stackTop] = infixQ[i];
        break;
      default:
        Postfix.push(infixQ[i]);
    }
  }
  // 使用 join 方法將陣列轉換為字串
  Postfix = Postfix.join("");
  // 使用正則表達式將字串以一個或多個空格字元為間隔轉換為字串陣列
  Postfix = Postfix.split(/\s+/);
  //過濾掉空字元
  if (Postfix[Postfix.length - 1] === "") {
    Postfix.pop();
  }
  //過濾掉空字元

  if (Postfix[0] === "") {
    Postfix.shift();
  }
  console.log("Postfix", Postfix);
}
function changeText(element) {
  hiddenInput.value = hiddenInput.value + element.textContent;
  equation.textContent = "ANS = ";
  equation.textContent += ANS;

  //必須放前面，因為會改變輸入內容
  if (operators1.test(hiddenInput.value[0])) {
    hiddenInput.value = "";
    return;
  }
  if (operators2.test(hiddenInput.value[hiddenInput.value.length - 2])) {
    if (operators1.test(hiddenInput.value[hiddenInput.value.length - 1])) {
      if (
        hiddenInput.value[hiddenInput.value.length - 1] !== "-" ||
        hiddenInput.value[hiddenInput.value.length - 2] !== "("
      )
        hiddenInput.value = hiddenInput.value.slice(0, -1); // 截取字符串，从开头到倒数第二个字符
    }
  }
  if (hiddenInput.value[hiddenInput.value.length - 1] == "p") {
    hiddenInput.value = hiddenInput.value.slice(0, -1) + "π"; // 截取字符串，从开头到倒数第二个字符
  }

  //必須放後面，根據前面的內容判斷後面的輸入結構
  if (hiddenInput.value[hiddenInput.value.length - 1] === "(") {
    RightbracketSwitch++;
  }

  if (hiddenInput.value[hiddenInput.value.length - 1] === ")") {
    if (RightbracketSwitch > 0) {
      RightbracketSwitch--;
    } else {
      hiddenInput.value = hiddenInput.value.slice(
        0,
        hiddenInput.value.length - 1
      );
    }
  }
  if (
    (hiddenInput.value[hiddenInput.value.length - 3] === "s" &&
      hiddenInput.value[hiddenInput.value.length - 2] === "i" &&
      hiddenInput.value[hiddenInput.value.length - 1] === "n") ||
    (hiddenInput.value[hiddenInput.value.length - 3] === "c" &&
      hiddenInput.value[hiddenInput.value.length - 2] === "o" &&
      hiddenInput.value[hiddenInput.value.length - 1] === "s") ||
    (hiddenInput.value[hiddenInput.value.length - 3] === "t" &&
      hiddenInput.value[hiddenInput.value.length - 2] === "a" &&
      hiddenInput.value[hiddenInput.value.length - 1] === "n") ||
    (hiddenInput.value[hiddenInput.value.length - 3] === "l" &&
      hiddenInput.value[hiddenInput.value.length - 2] === "o" &&
      hiddenInput.value[hiddenInput.value.length - 1] === "g") ||
    (hiddenInput.value[hiddenInput.value.length - 2] === "l" &&
      hiddenInput.value[hiddenInput.value.length - 1] === "n") ||
    hiddenInput.value[hiddenInput.value.length - 1] === "√"
  ) {
    RightbracketSwitch++;
    hiddenInput.value = hiddenInput.value + "(";
  }
  customInput.textContent = hiddenInput.value;
}
function gamma(z) {
  const g = 7;
  const p = [
    0.99999999999980993, 676.5203681218851, -1259.1392167224028,
    771.32342877765313, -176.61502916214059, 12.507343278686905,
    -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7,
  ];

  if (z < 0.5) {
    return Math.PI / (Math.sin(Math.PI * z) * gamma(1 - z));
  } else {
    z -= 1;
    let x = p[0];
    for (let i = 1; i < g + 2; i++) {
      x += p[i] / (z + i);
    }
    const t = z + g + 0.5;
    return Math.sqrt(2 * Math.PI) * Math.pow(t, z + 0.5) * Math.exp(-t) * x;
  }
}
function compare(stack0, infix0) {
  (indexS = 0), (indexC = 0);
  while (ISP[indexS] != stack0) {
    indexS++;
  }
  while (ICP[indexC] != infix0) {
    indexC++;
  }

  return parseInt(indexS / 3) >= parseInt(indexC / 3) ? 1 : 0;
}
