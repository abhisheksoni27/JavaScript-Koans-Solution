var _; //globals

describe("About Applying What We Have Learnt", function() {

    var products;

    beforeEach(function() {
        products = [
            { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
            { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
            { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
            { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
            { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
        ];
    });

    /*********************************************************************************/

    it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function() {

        var i, j, hasMushrooms, productsICanEat = [];

        for (i = 0; i < products.length; i += 1) {
            if (products[i].containsNuts === false) {
                hasMushrooms = false;
                for (j = 0; j < products[i].ingredients.length; j += 1) {
                    if (products[i].ingredients[j] === "mushrooms") {
                        hasMushrooms = true;
                    }
                }
                if (!hasMushrooms) productsICanEat.push(products[i]);
            }
        }

        expect(productsICanEat.length).toBe(1);
    });

    it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function() {

        var productsICanEat = [];
        var a = products.filter(pizza => {
            return pizza.containsNuts === false;
        })
        _.some(a, function(pizza) {
            if (!_.contains(pizza.ingredients, "mushrooms")) {
                productsICanEat.push(pizza)
            }

        })

        expect(productsICanEat.length).toBe(1);
    });

    /*********************************************************************************/

    it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function() {

        var sum = 0;
        for (var i = 1; i < 1000; i++) {
            if (i % 3 === 0 || i % 5 === 0) {
                sum += i;
            }
        }

        expect(sum).toBe(233168);
    });

    it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function() {
        var sum = _(_.range(1000)).chain()
            .reduce(function(memo, num) {

                if (num % 3 === 0 || num % 5 === 0) {
                    return memo + num
                }
                return memo
            }, 0)
            .value();

        expect(233168).toBe(sum);
    });

    /*********************************************************************************/
    it("should count the ingredient occurrence (imperative)", function() {
        var ingredientCount = { "{ingredient name}": 0 };

        for (i = 0; i < products.length; i += 1) {
            for (j = 0; j < products[i].ingredients.length; j += 1) {
                ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
            }
        }

        expect(ingredientCount['mushrooms']).toBe(2);
    });

    it("should count the ingredient occurrence (functional)", function() {
        var ingredientCount = { "{ingredient name}": 0 };

        /* chain() together map(), flatten() and reduce() */
        _(products).chain()
            .map(function(p) {
                return p.ingredients
            })
            .flatten()
            .reduce(function(s, i) {
                return ingredientCount[i] = (ingredientCount[i] || 0) + 1
            })
            .value();

        expect(ingredientCount['mushrooms']).toBe(ingredientCount.mushrooms);
    });


    it("should find the largest prime factor of a composite number", function() {


        function calculatePrimes(number) {
            var highest = number;

            function check(i, n, highest) {
                if (!(n <= Math.abs(Math.sqrt(i)) && i % n === 0)) {
                    n = n + 1
                    if (n > highest) {
                        primes.push(i);
                        return;
                    }
                    check(i, n, highest);
                }
                return "Done!"
            }
            var date = new Date();
            var primes = [];
            var n = 2;
            for (i = 2; i <= number; i++) {
                if (primes.length > highest) {
                    break;
                }
                check(i, n, highest);
            }
            return calculateFactor(number, primes);
        }

        function calculateFactor(number, primes) {
            var primesDivisible = primes.filter(function(prime) {
                return number % prime === 0 });
            return _.max(primesDivisible)
        }


    });

    it("should find the largest palindrome made from the product of two 3 digit numbers", function() {
        function largestPalindrome() {
            var palindrome = 0;
            for (var i = 999; i > 100; i--) {
                for (var j = 999; j > 100; j--) {
                    var product = i * j;
                    if (checkIfPalindrome(product)) {
                        palindrome = product > palindrome ? product : palindrome;
                    }
                }
            }
            return palindrome;
        }

        function checkIfPalindrome(product) {
            return product.toString() === product.toString().split("").reverse().join("");
        }

        expect(906609).toBe(largestPalindrome());

    });

    it("should find the smallest number divisible by each of the numbers 1 to 20", function() {

        var i = 43914474;

        while (i % 2 != 0 || i % 3 != 0 || i % 4 != 0 || i % 5 != 0 ||
            i % 6 != 0 || i % 7 != 0 || i % 8 != 0 || i % 9 != 0 ||
            i % 10 != 0 || i % 11 != 0 || i % 12 != 0 || i % 13 != 0 ||
            i % 14 != 0 || i % 15 != 0 || i % 16 != 0 || i % 17 != 0 ||
            i % 18 != 0 || i % 19 != 0 || i % 20 != 0) {
            i++;
        }

    });

    it("should find the difference between the sum of the squares and the square of the sums", function() {
        function sumOfSquares(a, b) {
            return square(a) + square(b);
        }

        function square(num) {
            return Math.pow(num, 2)
        }

        function squareOfSums(a, b) {
            return square(a + b);
        }

        function difference(sumOfSquares, squareOfSums) {
            return sumOfSquares - squareOfSums;
        }

        var a = difference(sumOfSquares(10, 10), squareOfSums(10, 10));
        expect(a).toBe(-200);
    });

    it("should find the 10001st prime", function() {
        var highest = 1000;

        function check(i, n, highest) {
            if (!(n <= Math.abs(Math.sqrt(i)) && i % n === 0)) {
                n = n + 1
                if (n > highest) {
                    primes.push(i);
                    return;
                }
                check(i, n, highest);
            }
            return "Done!"
        }
        var date = new Date();
        var primes = [];
        var n = 2;
        for (i = 2; i < Infinity; i++) {
            if (primes.length > highest) {
                break;
            }
            check(i, n, highest);
        }

    });

});
