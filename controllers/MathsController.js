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
            handleStaticResourceRequest(this.HttpContext)
            return;
        }

        //Call the right function with the symbol.
        switch (urlParams.op) {
            case ' ':
                this.Addition(urlParams.x, urlParams.y);
                break;
            case '+':
                this.Addition(urlParams.x, urlParams.y);
                break;
            case '-':
                this.Subtraction(urlParams.x, urlParams.y);
                break;
            case '*':
                this.Multiplication(urlParams.x, urlParams.y);
                break;
            case '/':
                this.Division(urlParams.x, urlParams.y);
                break;
            case '%':
                this.Modulus(urlParams.x, urlParams.y);
                break;
            case '!':
                this.Factorial(urlParams.number);
                break;
            case 'p':
                this.Primality(urlParams.number);
                break;
            case 'np':
                this.NthPrime(urlParams.number);
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
                invalidParameters.push('x');
            }
            if (isNaN(y)) {
                invalidParameters.push('y');
            }

            this.HttpContext.response.JSON({
                op: '+',
                x,
                y,
                error: `Invalid parameters: ${invalidParameters.join(', ')}. Must be an Integer`
            });
        } else if (!x || !y) {
            let invalidParameters = [];

            if (!x) {
                invalidParameters.push('x');
            }

            if (!y) {
                invalidParameters.push('y');
            }

            this.HttpContext.response.JSON({
                op: '+',
                x,
                y,
                error: `Parameter(s) missing: ${invalidParameters.join(', ')}`
            });
        } else {
            const result = parseFloat(x) + parseFloat(y);
            this.HttpContext.response.JSON({ op: '+', x, y, value: result });
        }
    }

    Subtraction(x, y) {
        if (isNaN(x) || isNaN(y)) {
            let invalidParameters = [];

            if (isNaN(x)) {
                invalidParameters.push('x');
            }

            if (isNaN(y)) {
                invalidParameters.push('y');
            }

            this.HttpContext.response.JSON({
                op: '-',
                x,
                y,
                error: `Invalid parameters: ${invalidParameters.join(', ')}. Must be an Integer`
            });
        } else if (!x || !y) {
            let invalidParameters = [];

            if (!x) {
                invalidParameters.push('x');
            }

            if (!y) {
                invalidParameters.push('y');
            }

            this.HttpContext.response.JSON({
                op: '-',
                x,
                y,
                error: `Parameter(s) missing: ${invalidParameters.join(', ')}`
            });
        }
        else {
            const result = parseFloat(x) - parseFloat(y);
            this.HttpContext.response.JSON({ op: '-', x, y, value: result });
        }
    }

    Multiplication(x, y) {
        if (isNaN(x) || isNaN(y)) {
            let invalidParameters = [];

            if (isNaN(x)) {
                invalidParameters.push('x');
            }

            if (isNaN(y)) {
                invalidParameters.push('y');
            }

            this.HttpContext.response.JSON({
                op: '*',
                x,
                y,
                error: `Invalid parameters: ${invalidParameters.join(', ')}. Must be an Integer`
            });
        } else if (!x || !y) {
            let invalidParameters = [];

            if (!x) {
                invalidParameters.push('x');
            }

            if (!y) {
                invalidParameters.push('y');
            }

            this.HttpContext.response.JSON({
                op: '*',
                x,
                y,
                error: `Parameter(s) missing: ${invalidParameters.join(', ')}`
            });
        }
        else {
            const result = parseFloat(x) * parseFloat(y);
            this.HttpContext.response.JSON({ op: '*', x, y, value: result });
        }
    }

    Division(x, y) {
        if (isNaN(x) || isNaN(y)) {
            let invalidParameters = [];

            if (isNaN(x)) {
                invalidParameters.push('x');
            }

            if (isNaN(y)) {
                invalidParameters.push('y');
            }

            this.HttpContext.response.JSON({
                op: '/',
                x,
                y,
                error: `Invalid parameters: ${invalidParameters.join(', ')}. Must be an Integer`
            });
        } else if (!x || !y) {
            let invalidParameters = [];

            if (!x) {
                invalidParameters.push('x');
            }

            if (!y) {
                invalidParameters.push('y');
            }

            this.HttpContext.response.JSON({
                op: '/',
                x,
                y,
                error: `Parameter(s) missing: ${invalidParameters.join(', ')} `
            });
        }
        else {
            const result = parseFloat(x) / parseFloat(y);
            this.HttpContext.response.JSON({ op: '/', x, y, value: result });
        }
    }

    Modulus(x, y) {
        if (isNaN(x) || isNaN(y) || !Number.isInteger(Number(x)) || !Number.isInteger(Number(y)) || y === 0) {
            let invalidParameters = [];

            if (isNaN(x) || !Number.isInteger(Number(x))) {
                invalidParameters.push('x');
            }

            if (isNaN(y) || !Number.isInteger(Number(y)) || y === 0) {
                invalidParameters.push('y');
            }

            this.HttpContext.response.JSON({
                op: '%',
                x,
                y,
                error: `Invalid parameters: ${invalidParameters.join(', ')}. Must be an Integer`
            });
        } else if (!x || !y) {
            let invalidParameters = [];

            if (!x) {
                invalidParameters.push('x');
            }

            if (!y) {
                invalidParameters.push('y');
            }

            this.HttpContext.response.JSON({
                op: '%',
                x,
                y,
                error: `Parameter(s) missing: ${invalidParameters.join(', ')}`
            });
        }
        else {
            const result = parseInt(x) % parseInt(y);
            this.HttpContext.response.JSON({ op: '%', x, y, value: result });
        }
    }

    Factorial(number) {
        if (isNaN(number) || !Number.isInteger(Number(number)) || number < 0) {
            this.HttpContext.response.JSON({
                op: '!',
                number,
                error: 'Invalid parameter: number. It must be a non-negative integer.'
            });
        } else if (!number) {

            this.HttpContext.response.JSON({
                op: '!',
                number,
                error: `Parameter missing: number`
            });
        }
        else {
            const result = this.Factorial(parseInt(number));
            this.HttpContext.response.JSON({ op: '!', number, value: result });
        }
    }

    Primality(number) {
        if (isNaN(number) || !Number.isInteger(Number(number)) || number <= 1) {
            this.HttpContext.response.JSON({
                op: 'p',
                number,
                error: 'Invalid parameter: number. It must be an integer greater than 1.'
            });
        } else if (!number) {

            this.HttpContext.response.JSON({
                op: '!',
                number,
                error: `Parameter missing: number`
            });
        } else {
            const result = this.IsPrime(parseInt(number));
            this.HttpContext.response.JSON({ op: 'p', number, value: result });
        }
    }

    NthPrime(number) {
        if (isNaN(number) || !Number.isInteger(Number(number)) || number <= 0) {
            this.HttpContext.response.JSON({
                op: 'np',
                number,
                error: 'Invalid parameter: number. It must be a positive integer.'
            });
        }
        else if (!number) {
            this.HttpContext.response.JSON({
                op: '!',
                number,
                error: 'Parameter missing: number'
            });
        }
        else {
            const result = this.FindNthPrime(parseInt(number));
            this.HttpContext.response.JSON({ op: 'np', number, value: result });
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