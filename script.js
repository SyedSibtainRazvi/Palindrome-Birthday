  var birthdayInput = document.querySelector('#birthday-input');
  var checkBtn = document.querySelector('#checkBtn');
  var output = document.querySelector('#output');


  // Function to Reverse a String

  function String(str) {
      var listOfChar = str.split("");
      var reverseListOfChar = listOfChar.reverse();
      var reverseStr = reverseListOfChar.join("");
      return reverseStr;
  };

  // console.log(String("Hello"));

  // Function to Check for Palindrome

  function checkPalindrome(str) {
      var reverseStr = String(str)
      return (str === reverseStr)

  };

  // console.log(checkPalindrome("racecar"));
  // console.log(checkPalindrome("hello"));

  // Convert Data into String


  function convertDateToString(date) {
      var dateString = {
          day: "",
          month: "",
          year: ""
      };
      if (date.day < 10) {
          dateString.day = "0" + date.day;
      } else {
          dateString.day = date.day.toString();
      }
      if (date.month < 10) {
          dateString.month = "0" + date.month;
      } else {
          dateString.month = date.month.toString();
      }
      dateString.year = date.year.toString();

      return dateString;
  };


  // Get all Date Formats

  function getAllDateFormats(date) {

      dateString = convertDateToString(date);

      var ddmmyyyy = dateString.day + dateString.month + dateString.year;
      var mmddyyyy = dateString.month + dateString.day + dateString.year;
      var yyyymmdd = dateString.year + dateString.month + dateString.day;
      var ddmmyy = dateString.day + dateString.month + dateString.year.slice(-2);
      var mmddyy = dateString.month + dateString.day + dateString.year.slice(-2);
      var yymmdd = dateString.year.slice(-2) + dateString.month + dateString.day;

      return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
  };


  function checkPalindromeForAllFormats(date) {
      var listOfPalindromes = getAllDateFormats(date);

      var palindromeList = [];

      for (var i = 0; i < listOfPalindromes.length; i++) {

          var result = checkPalindrome(listOfPalindromes[i])
          palindromeList.push(result)
      }
      return palindromeList
  }

  // var date = {
  //     day: 02,
  //     month: 2,
  //     year: 2020
  // }
  // console.log(checkPalindromeForAllFormats(date));

  // Function to check for leap year

  function isLeapYear(year) {
      if (year % 400 === 0) {
          return true;
      }
      if (year % 100 === 0) {
          return false;
      }
      if (year % 4 === 0) {
          return true;
      }
      return false;
  }

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Function to get next date
  function getNextDate(date) {
      var day = date.day + 1;
      var month = date.month;
      var year = date.year;

      var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

      if (month === 2) {
          if (isLeapYear(year)) {
              if (day > 29) {
                  day = 1;
                  month = 3;
              }
          } else {
              if (day > 28) {
                  day = 1;
                  month = 3;
              }
          }
      } else {
          if (day > daysInMonth[month - 1]) {
              day = 1;
              month++;
          }
      }

      if (month > 12) {
          month = 1;
          year++;
      }

      return {
          day: day,
          month: month,
          year: year
      }
  }

  // Function to get the next palindrome date
  function getNextPalindromeDate(date) {

    var nextDate = getNextDate(date);
    var ctr = 0;
  
    while (1) {
      ctr++;
    
      var resultList = checkPalindrome(nextDate);
  
      for (let i = 0; i < resultList.length; i++) {
        if (resultList[i]==true) {
          return [ctr, nextDate];
        }
      }
      nextDate = getNextDate(nextDate);
    }
  }

  function clickHandler() {
      var birthDate = birthdayInput.value;

      if (birthdayInput !== '') {
          var dateList = birthDate.split('-');

          var date = {

              day: dateList[2],
              month: dateList[1],
              year: dateList[0],
          }

          var palindrome = checkPalindromeForAllFormats(date);
          if (palindrome) {

              output.innerHTML = "Yayyy! You are a Palindrome Baby!🎉🎉";
          } else {

              var [cntr, nextDate] = getNextPalindromeDate(date);
              output.innerHTML = `The next Palindrome Date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${cntr} days! `
          }
      }
  }

  if (checkBtn) {
      checkBtn.addEventListener('click', clickHandler)
  };