/**
 * This file contains the "hello world" example shown in
 * the beginning of the TypeScript Fundamentals course.
 *
 * This code is not intended to be executed
 * and is for demonstration purposes, only.
 *
 * The code is contained inside of an anonymous function,
 * which allows it to compile as its scope is contained to the function.
 */
() => {
  let x: number = 7;
  let y: number = 11;
  const sum: number = x + y;
  const result: string = `The sum of ${x} and ${y} is ${sum}`;
  console.log(result);
};
