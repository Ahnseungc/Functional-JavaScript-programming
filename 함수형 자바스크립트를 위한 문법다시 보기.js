// /2.1 객체와 대괄호 다시 보기
// /실제 자바 스크립트 라이브러리 혹은 프레임워크들에서 난해한 문법들이 사용되는 것을 많이 보았다. 실제로는 이러한 이유들이 있다.
// 1. 더 짧은 코드를 위해
// 2. 추상화와 다양한 기법
// 3. if를 없애기 위해
// 4. 특별한 로직을 위해
// 5. 캐시를 위해
// 6. 은닉을 위해
// 7. 함수를 선언하고 참조하기 위해
// 8. 컨텍스트를 이어주기 위해

//2.1.2 객체와 key
var obj = { a: 1, b: 2 };
obj.c = 3;
obj["d"] = 4;
var e = "e";
obj[e] = 5;
// function f() {
//   return "f";
// }
// obj[f()] = 6;
console.log(obj);
//2.2 띄어쓰기, 특수 문자, 숫자
var obj2 = { " a a a ": 1 };
obj2[" b b b "] = 2;
var obj4 = { 1: 10 };
obj4[2] = 20;
console.log(obj4);

// var obj5 = {(true ? "a" : "b"):1};  {} 안쪽의 key 영역에서는 코드를 실행할 수 없다.

var obj6 = {};
obj6[true ? "a" : "b"] = 1;
console.log(obj6);

//호이스팅
// obj9.a = 1;
// obj9.b = 2;
// console.log(obj9.a + obj9.b);
//함수로 선언할 경우 호이스팅에 의해 위와 같은 코드로 정상적으로 종작한다.

//배열에 숫자가 아닌 key 사용하기
var obj10 = [];
obj10.a = 1;
console.log(obj10);
console.log(obj10.length);
//length는 변하지 않는다.

//한번에 length 올리기
var obj12 = [];
obj12.length = 5;
console.log(obj12);

var obj13 = [1, 2];
obj13[5] = 5;
console.log(obj13);
console.log(obj13.length);

obj13.push(6);
console.log(obj13);
console.log(obj13.length);

//delete

var obj = { a: 1, b: 2, c: 3 };
delete obj.a;
delete obj["b"];
delete obj["C".toLowerCase()];
console.log(obj);

//호이스팅
// 호이스팅이란 변수나 함수가 어디서 선언되든지 해당 스코프 최상단에 위치하게 되어 도잉ㄹ 스코프 어디서든 참조 할 수 있는 것을 말한다.

add1(10, 5);

function add1(a, b) {
  return a + b;
}

//실행되지 않고 참조만 해보기
console.log(add1);
// 함수 출력

console.log(add2);
// undefinded

function add1(a, b) {
  return a + b;
}

var add2 = function (a, b) {
  return a + b;
};

//변수 선언과 함수 선언에서의 차이 때문이다, 변수는 선언단계와 초기화단계가 구분되어 있다. 변수는 선언과 초기화가 동시에 이루어지지 않기 때문에 호이스틩에 의해 참조만 가능하고, 아직 값이 담기지 않아 실행은 불가능하다.
//반면에 함수 선언은 선언과 동시에 초기화가 이루어지기 때문에 참조뿐 아니라 실행도 가능하다.

//호이스팅 활용하기

function add(a, b) {
  return valid() ? a + b : new Error();

  function valid() {
    return Number.isInteger(a) && Number.isInteger(b);
  }
}

console.log(10, 5);
console.log(10, "a");
//Error

// 익명 함수 즉시 실행
(function (a) {
  console.log(a);
})(100);

function f1() {
  return (function (a) {
    console.log(a);
  })(1);
}

f1();

var pj = new (function () {
  this.name = "PJ";
  this.age = 28;
  this.constructor.prototype.hi = function () {
    console.log("h1");
  };
})();
console.log(pj);
//hi
pj.hi();
//hi

//간단 버전 문자열 화살표 함수와 new Funciton 성능
function L(str) {
  var splitted = str.split("=>");
  return new Function(splitted[0], "return (" + splitted[1] + ")");
}

console.log(L("n => n*10")(10));

console.time("익명 함수");
for (var i = 0; i < 10000; i++) {
  (function (v) {
    return v;
  })(i);
}
console.timeEnd("익명 함수");

console.time("new Function");
for (var i = 0; i < 10000; i++) {
  L("v => v")(i);
}
console.timeEnd("new Function");

console.log("1");
var arr = Array(10000);
// _map(arr,function(v,i){
//   return i*2;
// })
// console.timeEnd("1");
//1 : 0.5ms~0.7ms

// console.time("2");

var arr = Array(10000);
// _map(arr, L('v, i=> i*2'));
// console.timeEnd("2");
//2 0.5ms~0.8ms  시간차이가 안나는 이유는 익명함수의 경우 10,000번 반복되었지만, new Function은 한번만 실행 된다

//메모이제이션 기법
function L2(str) {
  if (L2[str]) return L2[str]; //혹시 이미 같은 함수가 있다면 즉시 리턴
  var splitted = str.split("=>");
  return new Function(splitted[0], "return (" + splitted[1] + ")");
}

//유명 함수
var f1 = function () {
  console.log(f1);
};

//아주 안전하고 편한 자기 참조

var hi = 1;
var hello = function hi() {
  console.log(hi);
};

hello();

console.log(hi);
console.log(++hi);

hello();

console.log(hello.name == "hi");

var z1 = function z() {
  console.log(z, 1);
};

var z2 = function z() {
  console.log(z, 2);
};

z1();
z2();

console.log(z1.name === z2.name);

//유명 함수를 이용한 재귀

function flatten(arr) {
  return (function f(arr, new_arr) {
    arr.forEach(function (v) {
      Array.isArray(v) ? f(v, new_arr) : new_arr.push(v);
    });
    return new_arr;
  })(arr, []);
}

flatten([1, [2], [3, 4]]);

// () 다시보기
function test(a, b, c) {
  console.log("a b c :", a, b, c);
  console.log("this:", this);
  console.log("arguments:", arguments);
}

test(10);
test(10, undefined);
test(10, 20, 30);

function test2(a, b) {
  b = 10;
  console.log(arguments);
}

test2(1);
//[1]

test2(1, 2);
//[1,10]

var obj1 = {
  0: 1,
  1: 2,
};

console.log(obj1);

var a = obj1[0];
var b = obj1[1];
b = 10;

console.log(obj1);
// {0: 1, 1: 2} 바뀌지 않음 인자와 변수의 차이

//this 다시 보기

var o1 = { name: "obj1" };
o1.test = test;
o1.test(3, 2, 1);
