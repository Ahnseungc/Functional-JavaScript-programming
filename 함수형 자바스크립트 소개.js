// 1.addMaker

function addMaker(a) {
  return function (b) {
    return a + b;
  };
}

console.log(addMaker(10)(5));

/*
 *addMaker(10)의 결과는 function(b) {return 10 +b}와 같고 함수다.
 *(function(b) {return 10 +b})(5)가 된다 .
 */

var add5 = addMaker(5);
console.log(add5(3)); //8
console.log(add5(4)); //9

var v1 = 100;
var v2 = function () {};
function f1() {
  return 100;
}
function f2() {
  return function () {};
}

//for 문으로 필터링 하기

var users = [
  { id: 1, name: "ID", age: 32 },
  { id: 2, name: "HA", age: 25 },
  { id: 3, name: "BJ", age: 32 },
  { id: 4, name: "PJ", age: 28 },
  { id: 5, name: "JE", age: 27 },
  { id: 6, name: "JM", age: 32 },
  { id: 7, name: "HI", age: 24 },
];

var temp_users = [];
for (var i = 0, len = users.length; i < len; i++) {
  if (users[i].age < 30) temp_users.push(users[i]);
}
console.log(temp_users.length);
//4

var ages = [];
for (var i = 0, len = temp_users.length; i < len; i++) {
  ages.push(temp_users[i].age);
}
console.log(ages);
// [25,28,27,24]

var temp_users = [];
for (var i = 0, len = users.length; i < len; i++) {
  if (users[i].age >= 30) temp_users.push(users[i]);
}
console.log(temp_users.length);
//3

var names = [];
for (var i = 0, len = temp_users.length; i < len; i++) {
  names.push(temp_users[i].name);
}
console.log(names);

//for 에서 필터로, if에서 predicate로

function filter(list, predicate) {
  var new_list = [];
  for (var i = 0, len = list.length; i < len; i++) {
    if (predicate(list[i])) new_list.push(list[i]);
  }
  return new_list;
}

var users_under_30 = filter(users, function (user) {
  return user.age < 30;
});
console.log(users_under_30.length);

var ages = [];
for (var i = 0, len = users_under_30.length; i < len; i++) {
  ages.push(users_under_30[i].age);
}
console.log(ages);

var user_over_30 = filter(users, function (user) {
  return user.age >= 30;
});
console.log(user_over_30.length);

//리팩터링의 핵심은 중복을 제거하고 의도를 드러내는 것
//MAP

// function map(list, iteratee) {
//   var new_list = [];
//   for (var i = 0, len = list.length; i < len; i++) {
//     new_list.push(iteratee(list[i]));
//   }
//   return new_list;
// }

var ages_m = map(users_under_30, function (user) {
  return user.age;
});
console.log(ages_m);

var names_m = map(user_over_30, function (user) {
  return user.name;
});
console.log(names_m);

//함수 중첩
var ages_m_2 = map(
  filter(users, function (user) {
    return user.age < 30;
  }),
  function (user) {
    return user.age;
  }
);
console.log(ages_m_2);

var names_m_2 = map(
  filter(users, function (user) {
    return user.age >= 30;
  }),
  function (user) {
    return user.name;
  }
);
console.log(names_m_2);

function log_length(value) {
  console.log(value.length);
  return value;
}

console.log(
  log_length(
    map(
      filter(users, function (user) {
        return user.age < 30;
      }),
      function (user) {
        return user.age;
      }
    )
  )
);
//함수 중복 없애기

//addMaker와 비슷한 패턴인 bvlaue 패턴

function addMaker(a) {
  return function (b) {
    return a + b;
  };
}

function bvalue(key) {
  return function (obj) {
    return obj[key];
  };
}

bvalue("a")({ a: "hi", b: "hello" });

console.log(
  log_length(
    map(
      filter(users, function (user) {
        return user.age < 30;
      }),
      bvalue("age")
    )
  )
);

console.log(
  log_length(
    map(
      filter(users, function (user) {
        return user.age >= 30;
      }),
      bvalue("name")
    )
  )
);

//filter로 한 명 찾기

console.log(
  filter(users, function (user) {
    return user.id === 3;
  })[0]
);
//filter 함수는 무조건 list.length만큼 predicate가 실행되기 때문에 효율적이지 못하다.

//수정 1
var user;
for (var i = 0, len = users.length; i < len; i++) {
  if (users[i].id == 3) {
    user = users[i];
    break;
  }
}
//break 로 for문을 빠져 나와 위에코드보다 효율적이나 코드의 재사용이 불가능하다.

function findById(list, id) {
  for (var i = 0, len = list.length; i < len; i++) {
    if (list[i].id == id) return list[i];
  }
}

function findByName(list, name) {
  for (var i = 0, len = list.length; i < len; i++) {
    if (list[i].name == name) return list[i];
  }
}

function findByAge(list, age) {
  for (var i = 0, len = list.length; i < len; i++) {
    if (list[i].age == age) return list[i];
  }
}

//위의 방식은 깔끔해졌지만 중복의 아쉬움이 있다.

function findBy(key, list, val) {
  for (var i = 0, len = list.length; i < len; i++) {
    if (list[i][key] === val) return list[i];
  }
}

//인자를 하나 추가함으로써 코드를 1/3으로 줄였다.

//인자로 키와 값 대신 함수를 사용해 보자

function find(list, predicate) {
  for (var i = 0, len = list.length; i < len; i++) {
    if (predicate(list[i])) return list[i];
  }
}

// console.log(
//   find(users, function (u) {
//     return u.getAge() == 25;
//   }).getName()
// );
//HA

//다형성 고려
console.log(
  map(
    filter(users, function (u) {
      return u.age >= 30;
    })
  ),
  function (u) {
    return u.name;
  }
);

function bmatch1(key, val) {
  return function (obj) {
    return obj[key] === val;
  };
}
console.log(find(users, bmatch1("id", 1)));

