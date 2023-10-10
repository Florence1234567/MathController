import Controller from "./Controller.js";
import { handleStaticResourceRequest } from "../staticResourcesServer.js";
import HttpContext from "../httpContext.js";

export default class MathsController extends Controller {
  constructor(HttpContext, repository = null) {
    super(HttpContext, repository);
  }

  get() {
    const urlParams = this.HttpContext.path.params;

    if (!urlParams.op) {
      this.HttpContext.req.url = "../wwwroot/Maths/TestsMath.html";
      handleStaticResourceRequest(this.HttpContext);
      return;
    }

    //Call the right function with the symbol.
    switch (urlParams.op) {
      case " ":
        this.OperationXY(urlParams.x, urlParams.y, urlParams.op);
        break;
      case "+":
        this.OperationXY(urlParams.x, urlParams.y, urlParams.op);
        break;
      case "-":
        this.OperationXY(urlParams.x, urlParams.y, urlParams.op);
        break;
      case "*":
        this.OperationXY(urlParams.x, urlParams.y, urlParams.op);
        break;
      case "/":
        this.OperationXY(urlParams.x, urlParams.y, urlParams.op);
        break;
      case "%":
        this.OperationXY(urlParams.x, urlParams.y, urlParams.op);
        break;
      case "!":
        this.OperationN(urlParams.n, urlParams.op);
        break;
      case "p":
        this.OperationN(urlParams.n, urlParams.op);
        break;
      case "np":
        this.OperationN(urlParams.n, urlParams.op);
        break;
    }
  }

  OperationXY(x, y, op) {
    if (!x || !y) {
      //If x or y is null.
      const nullParams = [];
      if (!x) {
        nullParams.push("x");
      }
      if (!y) {
        nullParams.push(", y");
      }

      this.HttpContext.response.JSON({
        op: "+",
        x,
        y,
        error: `${nullParams} is null.`,
      });
    } else if (isNaN(x) || isNaN(y)) {
      //If not a number.
      const invalidParams = [];
      if (isNaN(x)) {
        invalidParams.push("x");
      }
      if (isNaN(y)) {
        invalidParams.push(", y");
      }

      this.HttpContext.response.JSON({
        op: "+",
        x,
        y,
        error: `${invalidParams} is not an number.`,
      });
    } else {
      if (op == " " || op == "+") {
        let answer = parseInt(x) + parseInt(y);

        this.HttpContext.response.JSON({
          op: "+",
          x,
          y,
          value: answer
        });
      }
      else if (op == "-") {
        let answer = parseInt(x) - parseInt(y);

        this.HttpContext.response.JSON({
          op: "-",
          x,
          y,
          value: answer
        });
      }
      else if (op == "*") {
        let answer = parseInt(x) * parseInt(y);

        this.HttpContext.response.JSON({
          op: "*",
          x,
          y,
          value: answer
        });
      }
      else if (op == "/") {
        let answer = parseInt(x) / parseInt(y);

        this.HttpContext.response.JSON({
          op: "/",
          x,
          y,
          value: answer
        });
      }
      else if (op == "%") {
        let answer = parseInt(x) % parseInt(y);

        this.HttpContext.response.JSON({
          op: "%",
          x,
          y,
          value: answer
        });
      }
    }
  }
  
  OperationN(number, op){
    if(!Number.isInteger(parseInt(number)) || isNaN(number)){
      this.HttpContext.response.JSON({
        op: `${op}`,
        number,
        error: "number not an int.",
      });
    }
    else if(number < 0){
      this.HttpContext.response.JSON({
        op: `${op}`,
        number,
        error: "number smaller than one.",
      });
    } 
    else if(!number){
      this.HttpContext.response.JSON({
        op: `${op}`,
        number,
        error: "number is null.",
      });
    }
    else {
      if(op == "!"){
        let answer = this.Factorial(number);

        this.HttpContext.response.JSON({
          op: "!",
          number,
          value: answer
        });
      }
      else if(op == "p") {
        let answer = this.IsPrime(number);

        this.HttpContext.response.JSON({
          op: "p",
          number,
          value: answer
        });
      }
      else if(op == "np"){
        let answer = this.GetNtnPrime(number);

        this.HttpContext.response.JSON({
          op: "np",
          number,
          value: answer
        });
      }
    }
  }

  Factorial(number) {
    if (number === 0 || number === 1) {
      return 1;
    } else {
      return number * this.factorial(number - 1);
    }
  }

  IsPrime(number) {
    if (number <= 1) {
      return false;
    }
    for (let i = 2; i <= Math.sqrt(number); i++) {
      if (number % i === 0) {
        return false;
      }
    }
    return true;
  }

  GetNthPrime(number) {
    let count = 0;
    let num = 2;
    while (count < number) {
      if (this.isPrime(num)) {
        count++;
      }
      num++;
    }
    return num - 1;
  }
}
