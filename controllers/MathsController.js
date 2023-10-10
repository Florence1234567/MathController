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
        this.Addition(urlParams.x, urlParams.y);
        break;
      case "+":
        this.Addition(urlParams.x, urlParams.y);
        break;
      case "-":
        this.Subtraction(urlParams.x, urlParams.y);
        break;
      case "*":
        this.Multiplication(urlParams.x, urlParams.y);
        break;
      case "/":
        this.Division(urlParams.x, urlParams.y);
        break;
      case "%":
        this.Modulus(urlParams.x, urlParams.y);
        break;
      case "!":
        this.Factorial(urlParams.n);
        break;
      case "p":
        this.Primality(urlParams.n);
        break;
      case "np":
        this.NthPrime(urlParams.n);
        break;
      default:
        this.HttpContext.response.badRequest("Invalid operation");
        break;
    }
  }

  Addition(x, y) {
    if (isNaN(x) || isNaN(y)) {
      let invalidParameters = [];

      if (isNaN(x)) {
        invalidParameters.push("x");
      }
      if (isNaN(y)) {
        invalidParameters.push("y");
      }

      this.HttpContext.response.JSON({
        op: "+",
        x,
        y,
        error: `${invalidParameters.join(", ")} is invalid. Must be an Integer`,
      });
    } else if (!x || !y) {
      let invalidParameters = [];

      if (!x) {
        invalidParameters.push("x");
      }

      if (!y) {
        invalidParameters.push("y");
      }

      this.HttpContext.response.JSON({
        op: "+",
        x,
        y,
        error: `${invalidParameters.join(", ")} missing.`,
      });
    } else {
      const answer = parseFloat(x) + parseFloat(y);
      this.HttpContext.response.JSON({
        op: "+",
        x,
        y,
        value: answer,
      });
    }
  }

  Subtraction(x, y) {
    if (isNaN(x) || isNaN(y)) {
      let invalidParameters = [];

      if (isNaN(x)) {
        invalidParameters.push("x");
      }

      if (isNaN(y)) {
        invalidParameters.push("y");
      }

      this.HttpContext.response.JSON({
        op: "-",
        x,
        y,
        error: `${invalidParameters.join(", ")} is invalid. Must be an Integer`,
      });
    } else if (!x || !y) {
      let invalidParameters = [];

      if (!x) {
        invalidParameters.push("x");
      }

      if (!y) {
        invalidParameters.push("y");
      }

      this.HttpContext.response.JSON({
        op: "-",
        x,
        y,
        error: `${invalidParameters.join(", ")} missing.`,
      });
    } else {
      const answer = parseFloat(x) - parseFloat(y);
      this.HttpContext.response.JSON({
        op: "-",
        x,
        y,
        value: answer,
      });
    }
  }

  Multiplication(x, y) {
    if (isNaN(x) || isNaN(y)) {
      let invalidParameters = [];

      if (isNaN(x)) {
        invalidParameters.push("x");
      }

      if (isNaN(y)) {
        invalidParameters.push("y");
      }

      this.HttpContext.response.JSON({
        op: "*",
        x,
        y,
        error: `${invalidParameters.join(", ")} is invalid. Must be an Integer`,
      });
    } else if (!x || !y) {
      let invalidParameters = [];

      if (!x) {
        invalidParameters.push("x");
      }

      if (!y) {
        invalidParameters.push("y");
      }

      this.HttpContext.response.JSON({
        op: "*",
        x,
        y,
        error: `${invalidParameters.join(", ")} missing.`,
      });
    } else {
      const answer = parseInt(x) * parseInt(y);
      this.HttpContext.response.JSON({
        op: "*",
        x,
        y,
        value: answer,
      });
    }
  }

  Division(x, y) {
    if (isNaN(x) || isNaN(y)) {
      let invalidParameters = [];

      if (isNaN(x)) {
        invalidParameters.push("x");
      }

      if (isNaN(y)) {
        invalidParameters.push("y");
      }

      this.HttpContext.response.JSON({
        op: "/",
        x,
        y,
        error: `${invalidParameters.join(", ")} is invalid. Must be an Integer`,
      });
    } else if (!x || !y) {
      let invalidParameters = [];

      if (!x) {
        invalidParameters.push("x");
      }

      if (!y) {
        invalidParameters.push("y");
      }

      this.HttpContext.response.JSON({
        op: "/",
        x,
        y,
        error: `${invalidParameters.join(", ")} missing.`,
      });
    } else {
      const answer = parseFloat(x) / parseFloat(y);
      this.HttpContext.response.JSON({
        op: "/",
        x,
        y,
        value: answer,
      });
    }
  }

  Modulus(x, y) {
    if (
      isNaN(x) ||
      isNaN(y) ||
      !Number.isInteger(Number(x)) ||
      !Number.isInteger(Number(y)) ||
      y === 0
    ) {
      let invalidParameters = [];

      if (isNaN(x) || !Number.isInteger(Number(x))) {
        invalidParameters.push("x");
      }

      if (isNaN(y) || !Number.isInteger(Number(y)) || y === 0) {
        invalidParameters.push("y");
      }

      this.HttpContext.response.JSON({
        op: "%",
        x,
        y,
        error: `${invalidParameters.join(", ")} is invalid. Must be an Integer`,
      });
    } else if (!x || !y) {
      let invalidParameters = [];

      if (!x) {
        invalidParameters.push("x");
      }

      if (!y) {
        invalidParameters.push("y");
      }

      this.HttpContext.response.JSON({
        op: "%",
        x,
        y,
        error: `${invalidParameters.join(", ")} missing.`,
      });
    } else {
      const answer = parseInt(x) % parseInt(y);
      this.HttpContext.response.JSON({
        op: "%",
        x,
        y,
        value: answer,
      });
    }
  }

  Factorial(number) {
    if (isNaN(number) || !Number.isInteger(Number(number)) || number < 0) {
      this.HttpContext.response.JSON({
        op: "!",
        number,
        error: "Number is invalid. It must be a non-negative int.",
      });
    } else if (!number) {
      this.HttpContext.response.JSON({
        op: "!",
        number,
        error: "Number missing.",
      });
    } else {
      const answer = this.Factorial(parseInt(number));
      this.HttpContext.response.JSON({
        op: "!",
        number,
        value: answer,
      });
    }
  }

  Primality(number) {
    if (isNaN(number) || !Number.isInteger(Number(number)) || number <= 1) {
      this.HttpContext.response.JSON({
        op: "p",
        number,
        error: "Number is invalid. Must be an int greater than 1.",
      });
    } else if (!number) {
      this.HttpContext.response.JSON({
        op: "p",
        number,
        error: "Number is missing.",
      });
    } else {
      const answer = this.IsPrime(parseInt(number));
      this.HttpContext.response.JSON({
        op: "p",
        number,
        value: answer,
      });
    }
  }

  NtnPrimeNumber(number) {
    if (isNaN(number) || !Number.isInteger(number) || number < 0) {
      this.HttpContext.response.JSON({
        op: "np",
        number,
        error: "Number is invalid. Must ber an int greater than 1",
      });
    } else if (!number) {
      this.HttpContext.response.JSON({
        op: "np",
        number,
        error: "Number missing.",
      });
    } else {
      const answer = this.FindNtnPrime(parseInt(number));
      this.HttpContext.response.JSON({
        op: "np",
        number,
        value: answer,
      });
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

  findNthPrime(number) {
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