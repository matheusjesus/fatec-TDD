const main = async () => {

  // functions
  const syncFunction = (): number => {
    return 1;
  }
  const syncResult = syncFunction();

  const asyncFunction = async (): Promise<number> => {
    return 1;
  }

  const resultPromise = asyncFunction();
  resultPromise.then((result) => {

  }).catch((err) => {

  }).finally(() => {

  });

  const result2 = await asyncFunction();


  // arrays
  const array = [1, 2, 3, 4];
  const anotherArray = [...array, 5, 6];

  array.find((value, index) => {
    if (value === 3) {
      return true;
    }
  });
  
  for (const value of array) {
    console.log(value);
  }

  array.forEach((value, index) => {
    // cuidado com async!!!
    console.log(value);
  });


  // objects
  const obj = {
    a: 'a',
    b: 'b',
  };

  const { a, b } = obj;
  const anotherObj = { ...obj, c: 'c' };

  for (const key in anotherObj) {
    console.log(anotherObj[key]);
  }

  Object.values(obj).forEach((value) => {
    console.log(value);
  });
}