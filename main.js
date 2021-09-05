// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];
//**************************************************************************
// 1.Return true if the array contain digits of the valid credit card number
//    and false when it is invalid
// 2.The function should not mutate the original array
// 3.To find out if the array is valid or not, we are using the Luhn algorithm
const validateCred = (arr) => {
  // taking all the digits multiplied by 2 (and reducing 9 if greather than 9)
  const sum = [];
  // a reducer function to take the sum of all elements of the <sum> array
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  // iterating through our array and performing math and comparison operations
  //   applying Luhn Algorithm on our credit card array
  for (let i = arr.length - 1; i >= 0; i--) {
    if (i === arr.length - 1) {
      sum.push(arr[i]);
    } else if (i % 2 === 0 && arr[i] * 2 < 9) {
      sum.push(arr[i] * 2);
    } else if (i % 2 === 0) {
      sum.push(arr[i] * 2 - 9);
    } else if (i % 2 != 0) {
      sum.push(arr[i]);
    } else {
      sum.push(arr[i]);
    }
  }
  //as a return we have true if reminder of 10 === 0 or false if not
  return sum.reduce(reducer) % 10 === 0;
}
//***************************************************************************
//  Extracting the invalid card numbers
//  Return another nested array of invalid cards
const findInvalidCards = (check) => {
  const invalidCards = [];
  for (let i = 0; i <= check.length - 1; i++) {
    if (validateCred(check[i]) === false) {
      invalidCards.push(check[i]);
    }
  }
  return invalidCards;
}
//***************************************************************************
//  Holding invalid cards into a variable
const invalidCards = findInvalidCards(batch);
//***************************************************************************
//  Return an array of companies that have possibly issued this faulty numbers
//    which in our case is the result of findInvalidCards() function
//  There 4 accepted different companies and each one have unique different first digit
//    3 - Amex (American Express)
//    4 - Visa
//    5 - Mastercard
//    6 - Discover
//  Our array shouldn't contain dublicates, i.e. if Visa have to faulty numbers,
//    it should only appear once in the array.
const invalidCardCompanies = (invalidNrs) => {
  const companiesFaultyNrs = [];
  for (let i = 0; i <= invalidNrs.length - 1; i++) {
    switch (invalidNrs[i][0]) {
      case 3:
        companiesFaultyNrs.push('Amex');
        break;
      case 4:
        companiesFaultyNrs.push('Visa');
        break;
      case 5:
        companiesFaultyNrs.push('Mastercard');
        break; 
      default:
        companiesFaultyNrs.push('Discover');
        break;
    }
  }
  //  In order to delete our companies that appear two or more times in our 
  //    companiesFaultyNrs array, we're using spread operator to transform 
  //    a set into an array.
  const delRepeatedCompanies = [...new Set(companiesFaultyNrs)];
  return delRepeatedCompanies;
}




