let display=document.getElementById("display");
function append(value) 
{
  display.value+=value;
}

function clearDisplay() 
{
  display.value="";
}

function delChar() 
{
  display.value=display.value.slice(0,-1);
}

function calculate() 
{
  try 
  {
    const result=eval(display.value);
    display.value=result;
  } 
  catch {display.value="Error";}
}
 
function eval(expr) 
{
  const sep=separate(expr);
  const postfix=intopos(sep);
  return res(postfix);
}

function separate(expr) 
{
    const sep=[];
    let number='';
    for(let char of expr) 
    { 
        if(char==='+'||char==='-'||char==='*'||char==='/') 
        {
            if(number) sep.push(number);
            number='';
            sep.push(char);
        } 
        else number+=char; 
    }
    if(number) sep.push(number);
    return sep;
}

function intopos(sep) 
{
    const prec={ '+':1,'-':1,'*':2,'/':2};
    const arr=[],output=[];
    for(const token of sep) 
    {
        if(!isNaN(token)) output.push(parseFloat(token));
        else 
        {
            while(arr.length && prec[arr.at(-1)]>=prec[token]) output.push(arr.pop());
            arr.push(token);
        }
    }
    while(arr.length) output.push(arr.pop());
    return output;
}

function res(postfix) 
{
    const arr=[];
    for(const token of postfix) 
    {
        if(typeof token==='number') arr.push(token);
        else 
        {
            const b=arr.pop();
            const a=arr.pop();
            if(token === '+') arr.push(a + b);
            else if(token === '-') arr.push(a - b);
            else if(token === '*') arr.push(a * b);
            else if(token === '/') arr.push(a / b);
        }
    }
  return arr[0];
}