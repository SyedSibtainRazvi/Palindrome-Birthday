  var birthdayInput = document.querySelector('#birthday-input');
  var checkBtn = document.querySelector('#checkBtn');
  var output = document.querySelector('#output');


  // Function to Reverse a String

  function reverseStr(str) {
      var charList = str.split("");
      var reverse = charList.reverse();
      reverse = reverse.join("");
      return reverse;
  }


  // Function to Check for Palindrome

  function checkPalindrome(str) {
      var reverse = reverseStr(str)
      return str === reverse
  };

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
      var listOfFormats = getAllDateFormats(date);
      var palindromeList = [];
      for (var i = 0; i < listOfFormats.length; i++) {
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

  //   var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

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
              if (resultList[i] == true) {
                  return [ctr, nextDate];
              }
          }
          nextDate = getNextDate(nextDate);
      }
  }

  var date = {
      day: 11,
      month: 12,
      year: 2021
  };

  checkBtn.addEventListener("click", clickHandler)

  function clickHandler() {

      var inputDate = document.birthdayInput;
      if (inputDate == "") {

          output.innerHTML = "Please select date ❤";
          output.style.color = "red";
      } else {

          inputDate = inputDate.split("-");
          var date = {
              day: Number(inputDate[2]),
              month: Number(inputDate[1]),
              year: Number(inputDate[0])
          }

          var res1 = checkPalindrome(date);
          var [ctr, nextdate] = (getNextPalindromeDate(date));

          for (var i = 0; i < res1.length; i++) {
              if (res1[i] == true) {
                  output.innerHTML = "Yayy!!!! This Date is a Palindrome  ❤"
                  output.style.color = "#001d3d";
                  break;
              } else {
                  output.innerHTML = `It is not a Plalindrome  . Next Palindrome date is ${nextdate.day}-${nextdate.month}-${nextdate.year} You missed it by ${ctr} days .`;
                  output.style.color = "#001d3d";
              }
          }

      }



  }