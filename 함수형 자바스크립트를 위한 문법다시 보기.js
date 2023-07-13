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

//즉시 실행
(function (a) {
  console.log(a);
})(100);

function f1() {
  return (function (a) {
    console.log(a);
  })(1);
}

f1();
