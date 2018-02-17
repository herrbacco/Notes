# Recursion

## Objectives

* Define recursion
* Identify the two parts of a recursive function:
  * Write base case
  * Write recursive case
* Write a recursive function
* See classic recursion problems
* Write your own recursive functions

## Joke Dictionary Definition
**Recursion:** see definition of recursion

## What is it?

Today we're going to explore a topic called **recursion**. According to Wikipedia
recursion is "the process of repeating items in a self-similar way." In programming
recursion basically means, "a function that calls itself."

Here's some pictures that we could say are **recursive** and exhibit properties
of **recursion**:

![Mona Lisa holding her own painting](recursion_mona_lisa.jpg)
![Hulk Hogan's beard growing his own face](recursion_hulk_hogan.jpg)
![Droste branding](recursion_droste.jpg)

## Let's Pretend We Are Each A Recursive Function

How can we count how many people are sitting directly behind one person in this
classroom?

The teacher stands at the front of the room and asks someone how many people are
behind them. That person can do two things:

1. they can say there's no one sitting behind them
2. they can ask the person behind and add one to their answer

Now let's try it. Don't turn around and look at who all is behind you!
You can only communicate with the person who asked you the question,
and the person directly behind you.

This is an example of recursive programming. We could write our instructions
as a function called `count` that calls itself:

```js
function count(person) { 
  var otherPerson = person.getPersonBehindMe();
  if (otherPerson === "no one") {
    return 0;
  } else {
    return 1 + count(otherPerson);
  }
}
```

Recursion allows us to write extremely expressive code! We can write a very
small amount of code and have it perform extremely powerful computations.

## A Useless Recursive Function

We know that functions can call other functions. It's not so obvious that
functions can actually call themselves too. Let's look at one function that
calls itself and consider what it does.

* What will be the output of this function?
* When will this program stop running?

```js
// define the function
function navelGazer() {
  console.log("hmm...");

  // make a recursive call to the function
  navelGazer();
}

// call the function
navelGazer();
```

This function will theoretically print out "hmm..." forever.
It will never stop running. It will keep calling itself forever and ever.

In practice, the function will eventually crash.
Your computer will run out of memory and you'll see an error message
saying something like, "stack overflow exception" or "maximum call stack exceeded."

This function is only here to prove that it's possible to call a function from
inside itself, and to show the danger of a function that calls itself forver.

Recursion gets much better than this useless example. It's possible to write
recursive functions in such a way that we can write very robust, expressive code.

Let's look at more recursive functions and see what techniques we can use to
make sure our programs do useful things and don't simply call themselves forever.

## Base Cases and Recursive Cases
Recursive functions are comprised of the following components:

* the **base case**, and
* the **recursive case**.

Recursive functions usually follow this pattern. They detect and handle the base
case first, otherwise they perform one small piece of the problem and then recurse:

```js
function recurse(n) {
  // check for base case
  if (n <= 0) {
    return 0;
  } else {
    // otherwise do a small amount of work and call the function again
    return 1 + recurse(n - 1);
  }
}
```

## Base Cases
The base case is the simple case. It's the case when the algorithm doesn't
call itself. These cases are often deceivingly simple! Think of them as
writing what the program should return for the most obvious of examples.

If you're writing a function that computes the sum of numbers in a list
the base case is probably:

```js
if (list.length === 0) {
  return 0;
}
```

Writing one or more base cases that define the answer for the simplest
part of the problem will prevent your program from calling itself indefinitely.

## Recursive Cases
The recursive case is the case when the function performs one small part
of the problem and calls itslf recursively to solve the next small part
of the problem.

How would someone describe the base case of the people counting problem?
Can someone else describe the recursive case of the people counting problem?

## Sum Problem Practice

Let's write a function called `sum` that accepts a number `N` and computes the
sum of numbers from 0 to N.

What is the base case?

```js
if (n < 0) {
  return 0;
}
```

What is the recursive case?

```js
if (n > 0) {
  // man, I wish we had a function that computed the sum of 0..N-1
  return n + ???
}
```

Oh wait!! We've already defined a function that sums all numbers!
Take a step and take the leap of faith. Call the function again!

```js
function sum(n) {
  if (n < 0) {
    return 0;
  } else {
    n + sum(n - 1);
  }
}
```

Wait, this doesn't work. Remember to `return` the value that comes back
from the recursive call.

```js
function sum(n) {
  if (n < 0) {
    return 0;
  } else {
    return n + sum(n - 1);
  }
}
```

## Palindrome Practice Problem

Detecting whether a string is a palindrome is an excellent example of a problem
that turns out to be extremely elegant when written recursively.

What is a palindrome? A palindrome is a string that is spelled the same backwards
and forwards. 

Put another way, a palindrom is a string where the first letter is equal to the
last letter, and the second letter is equal to the second to last letter and so
on and so forth. An empty string is considered a palindrom. A one letter string
is considered a palindrome.

Write a function called `isPalindrome` that accepts a string and returns `true`
if the string is a palindrome, and returns `false` if the string is not.

What are our base case(s)?

* Return true if the string is empty.
* Return true if the string is of length 1

What is our recursive case?

* compare the first and last letter:
  * if they are equal then recurse on the remaining parts of the string
  * if they are different then return false

Remember your return statements! The final solution should bubble up from
the deeper recursive calls!

isPalindrome("") // true
isPalindrome("a") // true
isPalindrome("ab") // false
isPalindrome("abba") // true
isPalindrome("catdog") // false
isPalindrome("tacocat") // true

```js
function isPalindrome(ss) {
  if (ss.length < 2) {
    return true;
  } else {
    // get the first and last letters
    var first = ss[0];
    var last = ss[ss.length - 1];

    // compare the first and last letters.
    if (first !== last) {
      return false;
    } else {
      // get the middle of the string
      var middle = ss.substr(1, ss.length - 2);
      return isPalindrome(middle);
    }
  }
}
```

## Practice Problems

### Fibonacci

Write a recursive function called `fib` that accepts a number `N` greater
than zero and returns the `Nth` fibonacci number:

```js
fib(-1) // 0
fib(0) // 0
fib(1) // 1
fib(2) // 1
fib(3) // 2
fib(4) // 3
fib(5) // 5
fib(6) // 8
fib(7) // 13
```

### Reverse String

Write a recursive function called `reverse` that accepts a string and returns
a reversed string.

```js
reverse("") // ""
reverse("a") // "a"
reverse("ab") // "ba"
reverse("computer") "retupmoc"
reverse("abcdefghijklmnopqrstuvwxyz") // "zyxwvutsrqponmlkjihgfedcba"
reverse(reverse("computer")) // "computer"
```

Is `reverse(reverse("computer"))` considered recursive? Why or why not?

### Pretty Print
Write a function called `prettyPrint` that accepts a complex object and prints out
all of it's properties and all of its values. The object can have objects nested
inside of it.

Make the function accept two parameters: `prettyPrint(oo, indent)`.
`oo` is the object that's currently being iterated over.
`indent` is a string representing the current level of indentation.

Here's a piece of code that will allow you to call `prettyPrint` without
having to pass in an empty string each time you indent:

```js
function prettyPrint(oo, indent) {
  indent = indent || "";

  // write your solution here
}

```

Whenever you make a recursive call increase the level of indentation by
adding two spaces to indent:

```js
function prettyPrint(oo, indent) {
  // ...
  prettyPrint(newOO, indent + '  ');
  // ...
}
```


It's useful to know how to detect actual key/value objects in JavaScript:

```js
typeof [] // "object"
typeof {} // "object"

[].constructor == Array // true
[].constructor == Object // false
({}).constructor == Object // true
```

Expected Output:

```js
o1 = {a: 1, b: 2};
o2 = {a: 1, b: 2, c: {name: "Bruce Wayne", occupation: "Hero"}, d: 4};
o3 = {a: 1, b: 2, c: {name: "Bruce Wayne", occupation: "Hero", friends: {spiderman: {name: "Peter Parker"}, superman: {name: "Clark Kent"}}}, d: 4};

prettyPrint(o1, "")
a: 1
b: 2

prettyPrint(o1, "")
a: 1
b: 2
c:
  name: Bruce Wayne
  occupation: Hero
d: 4

prettyPrint(o3, "")
a: 1
b: 2
c:
  name: Bruce Wayne
    occupation: Hero
    friends:
      spiderman:
        name: Peter Parker
      superman:
        name: Clark Kent
d: 4
```


### Reverse String Solution
```js
function reverse(ss) {
  if (ss.length == 0) {
    return "";
  } else if (ss.length == 1) {
    return ss;
  } else {
    var last = ss[ss.length - 1];
    var beginning = ss.substr(0, ss.length - 1);
    return last + reverse(beginning);
  }
}
```


### Fibonacci Solution
```js
function fib(n) {
  if (n <= 0) {
    return 0;
  } else if (n == 1) {
    return 1;
  } else if (n == 2) {
    return 1;
  } else if (n > 2) {
    return fib(n - 1) + fib(n - 2);
  }
}
```


### Pretty Print Solution

```js
function prettyPrint(oo, indent) {
  indent = indent || "";

  for (var key in oo) {
    var value = oo[key];
    // if the value at the key is complex then recurse
    if (value.constructor === Object) {
      console.log(indent + key + ":");
      prettyPrint(value, indent + "  ");
    } else {
      // otherwise, do the simple base case and just print it out.
      console.log(indent + key + ":", value);
    }
  }
}
```

