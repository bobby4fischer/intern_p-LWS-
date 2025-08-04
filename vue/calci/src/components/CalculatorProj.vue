<template>
  <div class="calculator">
    <input type="text" v-model="display" readonly />
    <div class="buttons" >
      <button @click="clearDisplay">Clr</button>
      <button @click="append('/')">/</button>
      <button @click="append('*')">*</button>
      <button @click="delChar">Del</button>

      <button @click="append('7')">7</button>
      <button @click="append('8')">8</button>
      <button @click="append('9')">9</button>
      <button @click="append('-')">-</button>

      <button @click="append('4')">4</button>
      <button @click="append('5')">5</button>
      <button @click="append('6')">6</button>
      <button @click="append('+')">+</button>

      <button @click="append('1')">1</button>
      <button @click="append('2')">2</button>
      <button @click="append('3')">3</button>
      <button @click="calculate">=</button>

      <button @click="append('0')">0</button>
      <button @click="append('.')">.</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CalculatorPro',
  data() {
    return {
      display: ''
    };
  },
  methods: {
    append(value) {'*'
      this.display += value;
    },
    clearDisplay() {
      this.display = '';
    },
    delChar() {
      this.display = this.display.slice(0, -1);
    },
    calculate() {
      try {
        const result = this.eval(this.display);
        this.display = result.toString();
      } catch {
        this.display = 'Error';
      }
    },
    eval(expr) {
      const sep = this.separate(expr);
      const postfix = this.inToPostfix(sep);
      return this.evaluatePostfix(postfix);
    },
    separate(expr) {
      const sep = [];
      let number = '';
      for (let char of expr) {
        if ('+-*/'.includes(char)) {
          if (number) sep.push(number);
          number = '';
          sep.push(char);
        } else {
          number += char;
        }
      }
      if (number) sep.push(number);
      return sep;
    },
    inToPostfix(sep) {
      const prec = { '+': 1, '-': 1, '*': 2, '/': 2 };
      const stack = [], output = [];
      for (const token of sep) {
        if (!isNaN(token)) {
          output.push(parseFloat(token));
        } else {
          while (stack.length && prec[stack.at(-1)] >= prec[token]) {
            output.push(stack.pop());
          }
          stack.push(token);
        }
      }
      while (stack.length) output.push(stack.pop());
      return output;
    },
    evaluatePostfix(postfix) {
      const stack = [];
      for (const token of postfix) {
        if (typeof token === 'number') {
          stack.push(token);
        } else {
          const b = stack.pop();
          const a = stack.pop();
          switch (token) {
            case '+': stack.push(a + b); break;
            case '-': stack.push(a - b); break;
            case '*': stack.push(a * b); break;
            case '/': stack.push(a / b); break;
          }
        }
      }
      return stack[0];
    }
  }
};
</script>

<style scoped>
.calculator {
  background: white;
  padding: 20px;
  border-radius: 15px; 
  width: 300px;
}

input {
  width: 100%;
  height: 80px;
  font-size: 24px;
  text-align: right;
  margin-bottom: 10px; 
  border: none;
  background: #dacfcf;
  border-radius: 8px;
}

.buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

button {
  padding: 20px;
  font-size: 18px;
  border: none;
  border-radius: 8px;
  background: #e0e0e0;
  cursor: pointer;
}

button:hover {
  background: #d4d4d4;
  transform: scale(1.05);
}

button:active {
  background: #bcbcbc;
  transform: scale(0.98);
}
</style>
