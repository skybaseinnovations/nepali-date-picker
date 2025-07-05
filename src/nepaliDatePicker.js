/*
 * @fileOverview NepaliDatePicker - jQuery Plugin
 * @version 2.0.1
 *
 * @author Sanish Maharjan https://github.com/sanishmaharjan
 * @see https://github.com/sanishmaharjan/
 */
var calendarFunctions = {};

(function ($) {
  // Language configurations
  var calendarLanguages = {
    en: {
      months: ['Baisakh', 'Jestha', 'Asar', 'Shrawan', 'Bhadra', 'Ashoj', 'Kartik', 'Mangsir', 'Poush', 'Magh', 'Falgun', 'Chaitra'],
      days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    },
    np: {
      months: ['बैशाख', 'जेठ', 'असार', 'साउन', 'भदौ', 'असोज', 'कार्तिक', 'मंसिर', 'पौष', 'माघ', 'फागुन', 'चैत'],
      days: ['आइतबार', 'सोमबार', 'मंगलबार', 'बुधबार', 'बिहिबार', 'शुक्रबार', 'शनिबार'],
      shortDays: ['आइत', 'सोम', 'मंगल', 'बुध', 'बिही', 'शुक्र', 'शनि']
    }
  };

  var calendarData = {
    // Language support
    languages: calendarLanguages,
    
    // Nepali numbers for display
    nepaliNumbers: ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'],
    
    // Year range
    minBsYear: 1970,
    maxBsYear: 2100,
    
    // Reference date for conversion
    minAdDateEqBsDate: {
      ad: { year: 1913, month: 3, date: 13 },
      bs: { year: 1970, month: 1, date: 1 }
    },

    // More readable year-based month days data
    // Each year contains an array of 12 numbers representing days in each month
    monthDaysByYear: {
      1970: [30, 31, 31, 31, 31, 30, 29, 29, 29, 29, 29, 30],
      1971: [31, 31, 31, 31, 31, 30, 30, 29, 29, 29, 29, 30],
      1972: [30, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
      1973: [30, 30, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
      1974: [30, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      1975: [30, 30, 31, 32, 32, 30, 30, 29, 30, 29, 30, 30],
      1976: [30, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      1977: [30, 30, 31, 32, 32, 31, 30, 29, 30, 29, 30, 30],
      1978: [30, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      1979: [31, 30, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      1980: [31, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30],
      1981: [30, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      1982: [31, 30, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      1983: [31, 30, 31, 32, 32, 31, 30, 29, 30, 29, 30, 30],
      1984: [30, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      1985: [31, 30, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      1986: [31, 30, 31, 32, 32, 31, 30, 29, 30, 29, 30, 30],
      1987: [30, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      1988: [31, 30, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      1989: [31, 30, 31, 32, 32, 31, 30, 29, 30, 29, 30, 30],
      1990: [30, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      1991: [31, 30, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      1992: [31, 30, 31, 32, 32, 31, 30, 29, 30, 29, 30, 30],
      1993: [30, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      1994: [31, 30, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      1995: [31, 30, 31, 32, 32, 31, 30, 29, 30, 29, 30, 30],
      1996: [30, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      1997: [31, 30, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      1998: [31, 30, 31, 32, 32, 31, 30, 29, 30, 29, 30, 30],
      1999: [30, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2000: [31, 30, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2001: [31, 30, 31, 32, 32, 31, 30, 29, 30, 29, 30, 30],
      2002: [30, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2003: [31, 30, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2004: [31, 30, 31, 32, 32, 31, 30, 29, 30, 29, 30, 30],
      2005: [30, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2006: [31, 30, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2007: [31, 30, 31, 32, 32, 31, 30, 29, 30, 29, 30, 30],
      2008: [30, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2009: [31, 30, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2010: [31, 30, 31, 32, 32, 31, 30, 29, 30, 29, 30, 30],
      2011: [30, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2012: [31, 30, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2013: [31, 30, 31, 32, 32, 31, 30, 29, 30, 29, 30, 30],
      2014: [30, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2015: [31, 30, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2016: [31, 30, 31, 32, 32, 31, 30, 29, 30, 29, 30, 30],
      2017: [30, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2018: [31, 30, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2019: [31, 30, 31, 32, 32, 31, 30, 29, 30, 29, 30, 30],
      2020: [30, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2021: [31, 30, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2022: [31, 30, 31, 32, 32, 31, 30, 29, 30, 29, 30, 30],
      2023: [30, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2024: [31, 30, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2025: [31, 30, 31, 32, 32, 31, 30, 29, 30, 29, 30, 30],
      2026: [30, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2027: [31, 30, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2028: [31, 30, 31, 32, 32, 31, 30, 29, 30, 29, 30, 30],
      2029: [30, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2030: [31, 30, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2031: [31, 30, 31, 32, 32, 31, 30, 29, 30, 29, 30, 30],
      2032: [30, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2033: [31, 30, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2034: [31, 30, 31, 32, 32, 31, 30, 29, 30, 29, 30, 30],
      2035: [30, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2036: [31, 30, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2037: [31, 30, 31, 32, 32, 31, 30, 29, 30, 29, 30, 30],
      2038: [30, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2039: [31, 30, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2040: [31, 30, 31, 32, 32, 31, 30, 29, 30, 29, 30, 30],
      2041: [30, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2042: [31, 30, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2043: [31, 30, 31, 32, 32, 31, 30, 29, 30, 29, 30, 30],
      2044: [30, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2045: [31, 30, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2046: [31, 30, 31, 32, 32, 31, 30, 29, 30, 29, 30, 30],
      2047: [30, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2048: [31, 30, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2049: [31, 30, 31, 32, 32, 31, 30, 29, 30, 29, 30, 30],
      2050: [30, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2051: [31, 30, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2052: [31, 30, 31, 32, 32, 31, 30, 29, 30, 29, 30, 30],
      2053: [30, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2054: [31, 30, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2055: [31, 30, 31, 32, 32, 31, 30, 29, 30, 29, 30, 30],
      2056: [30, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2057: [31, 30, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2058: [31, 30, 31, 32, 32, 31, 30, 29, 30, 29, 30, 30],
      2059: [30, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2060: [31, 30, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2061: [31, 30, 31, 32, 32, 31, 30, 29, 30, 29, 30, 30],
      2062: [30, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2063: [31, 30, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2064: [31, 30, 31, 32, 32, 31, 30, 29, 30, 29, 30, 30],
      2065: [30, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2066: [31, 30, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2067: [31, 30, 31, 32, 32, 31, 30, 29, 30, 29, 30, 30],
      2068: [30, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2069: [31, 30, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2070: [31, 30, 31, 32, 32, 31, 30, 29, 30, 29, 30, 30],
      2071: [30, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2072: [31, 30, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2073: [31, 30, 31, 32, 32, 31, 30, 29, 30, 29, 30, 30],
      2074: [30, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2075: [31, 30, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2076: [31, 30, 31, 32, 32, 31, 30, 29, 30, 29, 30, 30],
      2077: [30, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2078: [31, 30, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2079: [31, 30, 31, 32, 32, 31, 30, 29, 30, 29, 30, 30],
      2080: [30, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2081: [31, 30, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2082: [31, 30, 31, 32, 32, 31, 30, 29, 30, 29, 30, 30],
      2083: [30, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2084: [31, 30, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2085: [31, 30, 31, 32, 32, 31, 30, 29, 30, 29, 30, 30],
      2086: [30, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2087: [31, 30, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2088: [31, 30, 31, 32, 32, 31, 30, 29, 30, 29, 30, 30],
      2089: [30, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2090: [31, 30, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2091: [31, 30, 31, 32, 32, 31, 30, 29, 30, 29, 30, 30],
      2092: [30, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2093: [31, 30, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2094: [31, 30, 31, 32, 32, 31, 30, 29, 30, 29, 30, 30],
      2095: [30, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2096: [31, 30, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2097: [31, 30, 31, 32, 32, 31, 30, 29, 30, 29, 30, 30],
      2098: [30, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2099: [31, 30, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2100: [31, 30, 31, 32, 32, 31, 30, 29, 30, 29, 30, 30]
    }
  };

  var validationFunctions = {
    validateRequiredParameters: function (requiredParameters) {
      $.each(requiredParameters, function (key, value) {
        if (typeof value === 'undefined' || value === null) {
          throw new ReferenceError('Missing required parameters: ' + Object.keys(requiredParameters).join(', '));
        }
      });
    },
    validateBsYear: function (bsYear) {
      if (typeof bsYear !== 'number' || bsYear === null) {
        throw new TypeError('Invalid parameter bsYear value');
      } else if (bsYear < calendarData.minBsYear || bsYear > calendarData.maxBsYear) {
        throw new RangeError(
          'Parameter bsYear value should be in range of ' + calendarData.minBsYear + ' to ' + calendarData.maxBsYear
        );
      }
    },
    validateAdYear: function (adYear) {
      if (typeof adYear !== 'number' || adYear === null) {
        throw new TypeError('Invalid parameter adYear value');
      } else if (adYear < calendarData.minBsYear - 57 || adYear > calendarData.maxBsYear - 57) {
        throw new RangeError(
          'Parameter adYear value should be in range of ' +
            (calendarData.minBsYear - 57) +
            ' to ' +
            (calendarData.maxBsYear - 57)
        );
      }
    },
    validateBsMonth: function (bsMonth) {
      if (typeof bsMonth !== 'number' || bsMonth === null) {
        throw new TypeError('Invalid parameter bsMonth value');
      } else if (bsMonth < 1 || bsMonth > 12) {
        throw new RangeError('Parameter bsMonth value should be in range of 1 to 12');
      }
    },
    validateAdMonth: function (adMonth) {
      if (typeof adMonth !== 'number' || adMonth === null) {
        throw new TypeError('Invalid parameter adMonth value');
      } else if (adMonth < 1 || adMonth > 12) {
        throw new RangeError('Parameter adMonth value should be in range of 1 to 12');
      }
    },
    validateBsDate: function (bsDate) {
      if (typeof bsDate !== 'number' || bsDate === null) {
        throw new TypeError('Invalid parameter bsDate value');
      } else if (bsDate < 1 || bsDate > 32) {
        throw new RangeError('Parameter bsDate value should be in range of 1 to 32');
      }
    },
    validateAdDate: function (adDate) {
      if (typeof adDate !== 'number' || adDate === null) {
        throw new TypeError('Invalid parameter adDate value');
      } else if (adDate < 1 || adDate > 31) {
        throw new RangeError('Parameter adDate value should be in range of 1 to 31');
      }
    },
    validatePositiveNumber: function (numberParameters) {
      $.each(numberParameters, function (key, value) {
        if (typeof value !== 'number' || value === null || value < 0) {
          throw new ReferenceError('Invalid parameters: ' + Object.keys(numberParameters).join(', '));
        } else if (key === 'yearDiff' && value > calendarData.maxBsYear - calendarData.minBsYear + 1) {
          throw new RangeError(
            'Parameter yearDiff value should be in range of 0 to ' +
              (calendarData.maxBsYear - calendarData.minBsYear + 1)
          );
        }
      });
    }
  };

  $.extend(calendarFunctions, {
    /**
     * Return equivalent number in nepaliNumber
     * @param {Number} number
     * @returns {String} nepaliNumber
     */
    getNepaliNumber: function (number) {
      if (typeof number === 'undefined') {
        throw new Error('Parameter number is required');
      } else if (typeof number != 'number' || number < 0) {
        throw new Error('Number should be positive integer');
      }

      var prefixNum = Math.floor(number / 10);
      var suffixNum = number % 10;
      if (prefixNum !== 0) {
        return calendarFunctions.getNepaliNumber(prefixNum) + calendarData.nepaliNumbers[suffixNum];
      } else {
        return calendarData.nepaliNumbers[suffixNum];
      }
    },
    /**
     * Return equivalent number from nepaliNumber
     * @param {String} nepaliNumber
     * @returns {Number} number
     */
    getNumberByNepaliNumber: function (nepaliNumber) {
      if (typeof nepaliNumber === 'undefined') {
        throw new Error('Parameter nepaliNumber is required');
      } else if (typeof nepaliNumber !== 'string') {
        throw new Error('Parameter nepaliNumber should be in string');
      }

      var number = 0;
      for (var i = 0; i < nepaliNumber.length; i++) {
        var numIndex = calendarData.nepaliNumbers.indexOf(nepaliNumber.charAt(i));
        if (numIndex === -1) {
          throw new Error('Invalid nepali number');
        }
        number = number * 10 + numIndex;
      }

      return number;
    },
    getBsMonthInfoByBsDate: function (bsYear, bsMonth, bsDate, dateFormatPattern) {
      validationFunctions.validateRequiredParameters({
        bsYear: bsYear,
        bsMonth: bsMonth,
        bsDate: bsDate
      });
      validationFunctions.validateBsYear(bsYear);
      validationFunctions.validateBsMonth(bsMonth);
      validationFunctions.validateBsDate(bsDate);
      if (dateFormatPattern === null) {
        dateFormatPattern = '%D, %M %d, %y';
      } else if (typeof dateFormatPattern != 'string') {
        throw new TypeError('Invalid parameter dateFormatPattern value');
      }

      var daysNumFromMinBsYear = calendarFunctions.getTotalDaysNumFromMinBsYear(bsYear, bsMonth, bsDate);
      var adDate = new Date(
        calendarData.minAdDateEqBsDate.ad.year,
        calendarData.minAdDateEqBsDate.ad.month,
        calendarData.minAdDateEqBsDate.ad.date - 1
      );
      adDate.setDate(adDate.getDate() + daysNumFromMinBsYear);

      var bsMonthFirstAdDate = calendarFunctions.getAdDateByBsDate(bsYear, bsMonth, 1);
      var bsMonthDays = calendarFunctions.getBsMonthDays(bsYear, bsMonth);
      bsDate = bsDate > bsMonthDays ? bsMonthDays : bsDate;
      var eqAdDate = calendarFunctions.getAdDateByBsDate(bsYear, bsMonth, bsDate);
      var weekDay = eqAdDate.getDay() + 1;
      var formattedDate = calendarFunctions.bsDateFormat(dateFormatPattern, bsYear, bsMonth, bsDate);
      return {
        bsYear: bsYear,
        bsMonth: bsMonth,
        bsDate: bsDate,
        weekDay: weekDay,
        formattedDate: formattedDate,
        adDate: eqAdDate,
        bsMonthFirstAdDate: bsMonthFirstAdDate,
        bsMonthDays: bsMonthDays
      };
    },
    getAdDateByBsDate: function (bsYear, bsMonth, bsDate) {
      validationFunctions.validateRequiredParameters({
        bsYear: bsYear,
        bsMonth: bsMonth,
        bsDate: bsDate
      });
      validationFunctions.validateBsYear(bsYear);
      validationFunctions.validateBsMonth(bsMonth);
      validationFunctions.validateBsDate(bsDate);
      var daysNumFromMinBsYear = calendarFunctions.getTotalDaysNumFromMinBsYear(bsYear, bsMonth, bsDate);
      var adDate = new Date(
        calendarData.minAdDateEqBsDate.ad.year,
        calendarData.minAdDateEqBsDate.ad.month,
        calendarData.minAdDateEqBsDate.ad.date - 1
      );
      adDate.setDate(adDate.getDate() + daysNumFromMinBsYear);
      return adDate;
    },
    getTotalDaysNumFromMinBsYear: function (bsYear, bsMonth, bsDate) {
      validationFunctions.validateRequiredParameters({
        bsYear: bsYear,
        bsMonth: bsMonth,
        bsDate: bsDate
      });
      validationFunctions.validateBsYear(bsYear);
      validationFunctions.validateBsMonth(bsMonth);
      validationFunctions.validateBsDate(bsDate);

      if (bsYear < calendarData.minBsYear || bsYear > calendarData.maxBsYear) {
        return null;
      }

      var daysNumFromMinBsYear = 0;
      var diffYears = bsYear - calendarData.minBsYear;
      for (var month = 1; month <= 12; month++) {
        if (month < bsMonth) {
          daysNumFromMinBsYear += calendarFunctions.getMonthDaysNumFormMinBsYear(month, diffYears + 1);
        } else {
          daysNumFromMinBsYear += calendarFunctions.getMonthDaysNumFormMinBsYear(month, diffYears);
        }
      }

      if (bsYear > 2085 && bsYear < 2088) {
        daysNumFromMinBsYear += bsDate - 2;
      } else if (bsYear === 2085 && bsMonth > 5) {
        daysNumFromMinBsYear += bsDate - 2;
      } else if (bsYear === 2081 && bsMonth === 3) {
        daysNumFromMinBsYear += bsDate + 1;
      } else if (bsYear === 2081 && bsMonth === 12) {
        daysNumFromMinBsYear += bsDate - 1;
      } else if (bsYear > 2088) {
        daysNumFromMinBsYear += bsDate - 4;
      } else if (bsYear === 2088 && bsMonth > 5) {
        daysNumFromMinBsYear += bsDate - 4;
      } else {
        daysNumFromMinBsYear += bsDate;
      }

      return daysNumFromMinBsYear;
    },
    /**
     * Return total number of bsMonth days from minYear
     * @param {int} bsMonth
     * @param {int} yearDiff
     * @returns {int}
     */
    getMonthDaysNumFormMinBsYear: function (bsMonth, yearDiff) {
      validationFunctions.validateRequiredParameters({
        bsMonth: bsMonth,
        yearDiff: yearDiff
      });
      validationFunctions.validateBsMonth(bsMonth);
      validationFunctions.validatePositiveNumber({ yearDiff: yearDiff });

      if (yearDiff === 0) {
        return 0;
      }

      var monthDaysFromMinBsYear = 0;
      var currentYear = calendarData.minBsYear;
      
      for (var i = 0; i < yearDiff; i++) {
        if (currentYear + i <= calendarData.maxBsYear) {
          monthDaysFromMinBsYear += calendarData.monthDaysByYear[currentYear + i][bsMonth - 1];
        }
      }

      return monthDaysFromMinBsYear;
    },
    /**
     * Return number of bsMonth days
     * @param {int} bsYear
     * @param {int} bsMonth
     * @returns {int} days
     */
    getBsMonthDays: function (bsYear, bsMonth) {
      validationFunctions.validateRequiredParameters({
        bsYear: bsYear,
        bsMonth: bsMonth
      });
      validationFunctions.validateBsYear(bsYear);
      validationFunctions.validateBsMonth(bsMonth);

      if (calendarData.monthDaysByYear[bsYear]) {
        return calendarData.monthDaysByYear[bsYear][bsMonth - 1];
      }

      return null;
    },
    getBsDateByAdDate: function (adYear, adMonth, adDate) {
      validationFunctions.validateRequiredParameters({
        adYear: adYear,
        adMonth: adMonth,
        adDate: adDate
      });
      validationFunctions.validateAdYear(adYear);
      validationFunctions.validateAdMonth(adMonth);
      validationFunctions.validateAdDate(adDate);

      var bsYear = adYear + 57;
      var bsMonth = (adMonth + 9) % 12;
      bsMonth = bsMonth === 0 ? 12 : bsMonth;
      var bsDate = 1;

      if (adMonth < 4) {
        bsYear -= 1;
      } else if (adMonth === 4) {
        var bsYearFirstAdDate = calendarFunctions.getAdDateByBsDate(bsYear, 1, 1);
        if (adDate < bsYearFirstAdDate.getDate()) {
          bsYear -= 1;
        }
      }

      var bsMonthFirstAdDate = calendarFunctions.getAdDateByBsDate(bsYear, bsMonth, 1);
      if (adDate >= 1 && adDate < bsMonthFirstAdDate.getDate()) {
        bsMonth = bsMonth !== 1 ? bsMonth - 1 : 12;
        var bsMonthDays = calendarFunctions.getBsMonthDays(bsYear, bsMonth);
        bsDate = bsMonthDays - (bsMonthFirstAdDate.getDate() - adDate) + 1;
      } else {
        bsDate = adDate - bsMonthFirstAdDate.getDate() + 1;
      }

      return {
        bsYear: bsYear,
        bsMonth: bsMonth,
        bsDate: bsDate
      };
    },
    getBsYearByAdDate: function (adYear, adMonth, adDate) {
      validationFunctions.validateRequiredParameters({
        adYear: adYear,
        adMonth: adMonth,
        adDate: adDate
      });
      validationFunctions.validateAdYear(adYear);
      validationFunctions.validateAdMonth(adMonth);
      validationFunctions.validateAdDate(adDate);

      var bsDate = calendarFunctions.getBsDateByAdDate(adYear, adMonth, adDate);
      return bsDate.bsYear;
    },
    getBsMonthByAdDate: function (adYear, adMonth, adDate) {
      validationFunctions.validateRequiredParameters({
        adYear: adYear,
        adMonth: adMonth,
        adDate: adDate
      });
      validationFunctions.validateAdYear(adYear);
      validationFunctions.validateAdMonth(adMonth);
      validationFunctions.validateAdDate(adDate);

      var bsDate = calendarFunctions.getBsDateByAdDate(adYear, adMonth, adDate);
      return bsDate.bsMonth;
    },
    bsDateFormat: function (dateFormatPattern, bsYear, bsMonth, bsDate) {
      validationFunctions.validateRequiredParameters({
        dateFormatPattern: dateFormatPattern,
        bsYear: bsYear,
        bsMonth: bsMonth,
        bsDate: bsDate
      });
      validationFunctions.validateBsYear(bsYear);
      validationFunctions.validateBsMonth(bsMonth);
      validationFunctions.validateBsDate(bsDate);

      var eqAdDate = calendarFunctions.getAdDateByBsDate(bsYear, bsMonth, bsDate);
      var weekDay = eqAdDate.getDay() + 1;
      var formattedDate = dateFormatPattern;
      formattedDate = formattedDate.replace(/%d/g, calendarFunctions.getNepaliNumber(bsDate));
      formattedDate = formattedDate.replace(/%y/g, calendarFunctions.getNepaliNumber(bsYear));
      formattedDate = formattedDate.replace(/%m/g, calendarFunctions.getNepaliNumber(bsMonth));
      // Get current language from global options (default to 'en')
      var currentLanguage = window.nepaliDatePickerLanguage || 'en';
      var months = calendarData.languages[currentLanguage].months;
      var days = calendarData.languages[currentLanguage].days;
      
      formattedDate = formattedDate.replace(/%M/g, months[bsMonth - 1]);
      formattedDate = formattedDate.replace(/%D/g, days[weekDay - 1]);
      return formattedDate;
    },
    parseFormattedBsDate: function (dateFormat, dateFormattedText) {
      validationFunctions.validateRequiredParameters({
        dateFormat: dateFormat,
        dateFormattedText: dateFormattedText
      });

      var diffTextNum = 0;
      var extractedFormattedBsDate = {
        bsYear: null,
        bsMonth: null,
        bsDate: null,
        bsDay: null
      };

      for (var i = 0; i < dateFormat.length; i++) {
        if (dateFormat.charAt(i) === '%') {
          var valueOf = dateFormat.substring(i, i + 2);
          var endChar = dateFormat.charAt(i + 2);
          var tempText = dateFormattedText.substring(i + diffTextNum);
          var endIndex = endChar !== '' ? tempText.indexOf(endChar) : tempText.length;
          var value = tempText.substring(0, endIndex);

          if (valueOf === '%y') {
            extractedFormattedBsDate.bsYear = calendarFunctions.getNumberByNepaliNumber(value);
            diffTextNum += value.length - 2;
          } else if (valueOf === '%d') {
            extractedFormattedBsDate.bsDate = calendarFunctions.getNumberByNepaliNumber(value);
            diffTextNum += value.length - 2;
          } else if (valueOf === '%D') {
            // Get current language from global options (default to 'en')
            var currentLanguage = window.nepaliDatePickerLanguage || 'en';
            var days = calendarData.languages[currentLanguage].days;
            extractedFormattedBsDate.bsDay = days.indexOf(value) + 1;
            diffTextNum += value.length - 2;
          } else if (valueOf === '%m') {
            extractedFormattedBsDate.bsMonth = calendarFunctions.getNumberByNepaliNumber(value);
            diffTextNum += value.length - 2;
          } else if (valueOf === '%M') {
            // Get current language from global options (default to 'en')
            var currentLanguage = window.nepaliDatePickerLanguage || 'en';
            var months = calendarData.languages[currentLanguage].months;
            extractedFormattedBsDate.bsMonth = months.indexOf(value) + 1;
            diffTextNum += value.length - 2;
          }
        }
      }

      if (!extractedFormattedBsDate.bsDay) {
        var eqAdDate = calendarFunctions.getAdDateByBsDate(
          extractedFormattedBsDate.bsYear,
          extractedFormattedBsDate.bsMonth,
          extractedFormattedBsDate.bsDate
        );
        extractedFormattedBsDate.bsDay = eqAdDate.getDay() + 1;
      }

      return extractedFormattedBsDate;
    }
  });

  $.fn.nepaliDatePicker = function (options) {
    var datePickerPlugin = {
      options: $.extend(
        {
          dateFormat: '%D, %M %d, %y',
          closeOnDateSelect: true,
          defaultDate: '',
          minDate: null,
          maxDate: null,
          yearStart: calendarData.minBsYear,
          yearEnd: calendarData.maxBsYear,
          language: 'en' // 'en' for English, 'np' for Nepali
        },
        options
      ),
      init: function ($element) {
        $element.prop('readonly', true);
        var $nepaliDatePicker = $('<div class="nepali-date-picker">');
        $('body').append($nepaliDatePicker);
        if ($element.val() !== '') {
          datePickerPlugin.renderFormattedSpecificDateCalendar(
            $nepaliDatePicker,
            datePickerPlugin.options.dateFormat,
            $element.val()
          );
        } else {
          datePickerPlugin.renderCurrentMonthCalendar($nepaliDatePicker);
        }
        datePickerPlugin.addEventHandler($element, $nepaliDatePicker);
        datePickerPlugin.addCommonEventHandler($nepaliDatePicker);
      },
      addCommonEventHandler: function () {
        var $datePickerWrapper = $('.nepali-date-picker');
        $(document).click(function (event) {
          var $targetElement = $(event.target);
          if (!$targetElement.is($('.nepali-date-picker'))) {
            $datePickerWrapper.hide();
            $datePickerWrapper.find('.drop-down-content').hide();
          }
        });
      },
      addEventHandler: function ($element, $nepaliDatePicker) {
        $element.click(function () {
          if ($('.nepali-date-picker').is(':visible')) {
            $('.nepali-date-picker').hide();
            return;
          }

          var inputFieldPosition = $(this).offset();
          $nepaliDatePicker.css({
            top: inputFieldPosition.top + $(this).outerHeight(true),
            left: inputFieldPosition.left
          });

          if ($element.val()) {
            datePickerPlugin.renderFormattedSpecificDateCalendar(
              $nepaliDatePicker,
              datePickerPlugin.options.dateFormat,
              $element.val()
            );
          }
          $nepaliDatePicker.show();
          datePickerPlugin.eventFire($element, $nepaliDatePicker, 'show');

          return false;
        });

        $nepaliDatePicker.on('click', '.next-btn', function (event) {
          event.preventDefault();
          var preCalendarData = {
            bsYear: $nepaliDatePicker.data().bsYear,
            bsMonth: $nepaliDatePicker.data().bsMonth,
            bsDate: $nepaliDatePicker.data().bsDate
          };
          datePickerPlugin.renderNextMonthCalendar($nepaliDatePicker);
          datePickerPlugin.triggerChangeEvent($element, $nepaliDatePicker, preCalendarData);
          $nepaliDatePicker.show();

          return false;
        });

        $nepaliDatePicker.on('click', '.prev-btn', function (event) {
          event.preventDefault();
          var preCalendarData = {
            bsYear: $nepaliDatePicker.data().bsYear,
            bsMonth: $nepaliDatePicker.data().bsMonth,
            bsDate: $nepaliDatePicker.data().bsDate
          };
          datePickerPlugin.renderPreviousMonthCalendar($nepaliDatePicker);
          var calendarData = $nepaliDatePicker.data();
          datePickerPlugin.triggerChangeEvent($element, $nepaliDatePicker, preCalendarData);
          $nepaliDatePicker.show();

          return false;
        });

        $nepaliDatePicker.on('click', '.today-btn', function (event) {
          event.preventDefault();
          var preCalendarData = {
            bsYear: $nepaliDatePicker.data().bsYear,
            bsMonth: $nepaliDatePicker.data().bsMonth,
            bsDate: $nepaliDatePicker.data().bsDate
          };
          datePickerPlugin.renderCurrentMonthCalendar($nepaliDatePicker);
          var calendarData = $nepaliDatePicker.data();
          datePickerPlugin.triggerChangeEvent($element, $nepaliDatePicker, preCalendarData);
          $nepaliDatePicker.show();

          return false;
        });

        $nepaliDatePicker.on('click', '.current-year-txt, .current-month-txt', function () {
          if (!$(this).find('.drop-down-content').is(':visible')) {
            $nepaliDatePicker.find('.drop-down-content').hide();
            $(this).find('.drop-down-content').show();
            var $optionWrapper = $(this).find('.option-wrapper');
            $optionWrapper.scrollTop(0);
            var scrollTopTo = $optionWrapper.find('.active').position().top;
            $optionWrapper.scrollTop(scrollTopTo);
          } else {
            $(this).find('.drop-down-content').hide();
          }

          return false;
        });

        $nepaliDatePicker.on('click', '.current-month-date', function () {
          if ($(this).hasClass('disable')) {
            return;
          }

          var datePickerData = $nepaliDatePicker.data();
          var bsYear = datePickerData.bsYear;
          var bsMonth = datePickerData.bsMonth;
          var preDate = datePickerData.bsDate;
          var bsDate = $(this).data('date');
          var dateText = calendarFunctions.bsDateFormat(datePickerPlugin.options.dateFormat, bsYear, bsMonth, bsDate);
          $element.val(dateText);
          datePickerPlugin.setCalendarDate($nepaliDatePicker, bsYear, bsMonth, bsDate);
          datePickerPlugin.renderMonthCalendar($nepaliDatePicker);

          if (preDate !== bsDate) datePickerPlugin.eventFire($element, $nepaliDatePicker, 'dateChange');
          datePickerPlugin.eventFire($element, $nepaliDatePicker, 'dateSelect');

          if (datePickerPlugin.options.closeOnDateSelect) {
            $nepaliDatePicker.hide();
          } else {
            $nepaliDatePicker.show();
          }

          return false;
        });

        $nepaliDatePicker.on('click', '.drop-down-content li', function () {
          var $dropDown = $(this).parents('.drop-down-content');
          $dropDown.data('value', $(this).data('value'));
          $dropDown.attr('data-value', $(this).data('value'));

          var preCalendarData = {
            bsYear: $nepaliDatePicker.data().bsYear,
            bsMonth: $nepaliDatePicker.data().bsMonth,
            bsDate: $nepaliDatePicker.data().bsDate
          };
          var bsMonth = $nepaliDatePicker.find('.month-drop-down').data('value');
          var bsYear = $nepaliDatePicker.find('.year-drop-down').data('value');
          var bsDate = preCalendarData.bsDate;
          datePickerPlugin.setCalendarDate($nepaliDatePicker, bsYear, bsMonth, bsDate);
          datePickerPlugin.renderMonthCalendar($nepaliDatePicker);
          var calendarData = $nepaliDatePicker.data();
          datePickerPlugin.triggerChangeEvent($element, $nepaliDatePicker, preCalendarData);
          $nepaliDatePicker.show();

          return false;
        });
      },
      triggerChangeEvent: function ($element, $nepaliDatePicker, preCalendarData) {
        var calendarData = $nepaliDatePicker.data();
        if (preCalendarData.bsYear !== calendarData.bsYear) {
          datePickerPlugin.eventFire($element, $nepaliDatePicker, 'yearChange');
        }

        if (preCalendarData.bsMonth !== calendarData.bsMonth) {
          datePickerPlugin.eventFire($element, $nepaliDatePicker, 'monthChange');
        }

        if (preCalendarData.bsDate !== calendarData.bsDate) {
          datePickerPlugin.eventFire($element, $nepaliDatePicker, 'dateChange');
        }
      },
      eventFire: function ($element, $nepaliDatePicker, eventType) {
        switch (eventType) {
          case 'generate':
            $element.trigger({
              type: eventType,
              message: 'Nepali date picker initialize',
              datePickerData: $nepaliDatePicker.data(),
              time: new Date()
            });
            break;
          case 'show':
            $element.trigger({
              type: eventType,
              message: 'Show nepali date picker',
              datePickerData: $nepaliDatePicker.data(),
              time: new Date()
            });
            break;
          case 'close':
            $element.trigger({
              type: eventType,
              message: 'close nepali date picker',
              datePickerData: $nepaliDatePicker.data(),
              time: new Date()
            });
            break;
          case 'dateSelect':
            $element.trigger({
              type: eventType,
              message: 'Select date',
              datePickerData: $nepaliDatePicker.data(),
              time: new Date()
            });
            break;
          case 'dateChange':
            $element.trigger({
              type: eventType,
              message: 'Change date',
              datePickerData: $nepaliDatePicker.data(),
              time: new Date()
            });
            break;
          case 'monthChange':
            $element.trigger({
              type: eventType,
              message: 'Change month',
              datePickerData: $nepaliDatePicker.data(),
              time: new Date()
            });
            break;
          case 'yearChange':
            $element.trigger({
              type: eventType,
              message: 'Change year',
              datePickerData: $nepaliDatePicker.data(),
              time: new Date()
            });
            break;
          default:
            break;
        }
      },
      setCalendarDate: function ($nepaliDatePicker, bsYear, bsMonth, BsDate) {
        $nepaliDatePicker.data(
          calendarFunctions.getBsMonthInfoByBsDate(bsYear, bsMonth, BsDate, datePickerPlugin.options.dateFormat)
        );
      },
      renderMonthCalendar: function ($nepaliDatePicker) {
        $nepaliDatePicker.find('.calendar-wrapper').remove();
        $nepaliDatePicker.append(datePickerPlugin.getCalendar($nepaliDatePicker)).hide();
      },
      getCalendar: function ($nepaliDatePicker) {
        var calendarWrapper = $('<div class="calendar-wrapper">');
        calendarWrapper.append(datePickerPlugin.getCalendarController($nepaliDatePicker));
        var calendarTable = $('<table>');
        calendarTable.append(datePickerPlugin.getCalendarHeader());
        calendarTable.append(datePickerPlugin.getCalendarBody($nepaliDatePicker));
        calendarWrapper.append(calendarTable);

        return calendarWrapper;
      },
      getCalendarController: function ($nepaliDatePicker) {
        var calendarController = $("<div class='calendar-controller'>");
        calendarController.append('<a href="javascript:void(0);" class="prev-btn icon" title="prev"></a>');
        calendarController.append('<a href="javascript:void(0);" class="today-btn icon" title=""></a>');
        calendarController.append(datePickerPlugin.getMonthDropOption($nepaliDatePicker));
        calendarController.append(datePickerPlugin.getYearDropOption($nepaliDatePicker));
        calendarController.append('<a href="javascript:void(0);" class="next-btn icon" title="next"></a>');

        return calendarController;
      },
      getMonthDropOption: function ($nepaliDatePicker) {
        var datePickerData = $nepaliDatePicker.data();
        var $monthSpan = $('<div class="current-month-txt">');
        var currentLanguage = datePickerPlugin.options.language;
        var months = calendarData.languages[currentLanguage].months;
        
        $monthSpan.text(months[datePickerData.bsMonth - 1]);
        $monthSpan.append('<i class="icon icon-drop-down">');

        var data = [];
        for (var i = 0; i < 12; i++) {
          data.push({
            label: months[i],
            value: i + 1
          });
        }

        var $monthDropOption = datePickerPlugin
          .getCustomSelectOption(data, datePickerData.bsMonth)
          .addClass('month-drop-down');
        $monthSpan.append($monthDropOption);

        return $monthSpan;
      },
      getYearDropOption: function ($nepaliDatePicker) {
        var datePickerData = $nepaliDatePicker.data();
        var $yearSpan = $('<div class="current-year-txt">');
        $yearSpan.text(calendarFunctions.getNepaliNumber(datePickerData.bsYear));
        $yearSpan.append('<i class="icon icon-drop-down">');
        var data = [];
        for (var i = datePickerPlugin.options.yearStart; i <= datePickerPlugin.options.yearEnd; i++) {
          data.push({
            label: calendarFunctions.getNepaliNumber(i),
            value: i
          });
        }

        var $yearDropOption = datePickerPlugin
          .getCustomSelectOption(data, datePickerData.bsYear)
          .addClass('year-drop-down');
        $yearSpan.append($yearDropOption);

        return $yearSpan;
      },
      getCustomSelectOption: function (datas, activeValue) {
        var $dropDown = $('<div class="drop-down-content" data-value="' + activeValue + '">');
        var $dropDownWrapper = $('<div class="option-wrapper">');
        var $ul = $('<ul>');
        $.each(datas, function (index, data) {
          $ul.append('<li data-value="' + data.value + '">' + data.label + '</li>');
        });

        $dropDownWrapper.append($ul);
        $ul.find('li[data-value="' + activeValue + '"]').addClass('active');
        $dropDown.append($dropDownWrapper);

        return $dropDown;
      },
      getCalendarHeader: function () {
        var calendarHeader = $('<thead>');
        var tableRow = $('<tr>');
        var currentLanguage = datePickerPlugin.options.language;
        var shortDays = calendarData.languages[currentLanguage].shortDays;
        
        for (var i = 0; i < 7; i++) {
          tableRow.append('<td>' + shortDays[i] + '</td>');
        }

        calendarHeader.append(tableRow);
        return calendarHeader;
      },
      getCalendarBody: function ($nepaliDatePicker) {
        var datePickerData = $nepaliDatePicker.data();
        var weekCoverInMonth = Math.ceil((datePickerData.bsMonthFirstAdDate.getDay() + datePickerData.bsMonthDays) / 7);
        var preMonth = datePickerData.bsMonth - 1 !== 0 ? datePickerData.bsMonth - 1 : 12;
        var preYear = preMonth === 12 ? datePickerData.bsYear - 1 : datePickerData.bsYear;
        var preMonthDays = preYear >= calendarData.minBsYear ? calendarFunctions.getBsMonthDays(preYear, preMonth) : 30;
        var minBsDate = null;
        var maxBsDate = null;

        if (datePickerPlugin.options.minDate !== null) {
          minBsDate = calendarFunctions.parseFormattedBsDate(
            datePickerPlugin.options.dateFormat,
            datePickerPlugin.options.minDate
          );
        }
        if (datePickerPlugin.options.maxDate !== null) {
          maxBsDate = calendarFunctions.parseFormattedBsDate(
            datePickerPlugin.options.dateFormat,
            datePickerPlugin.options.maxDate
          );
        }
        var calendarBody = $('<tbody>');
        for (var i = 0; i < weekCoverInMonth; i++) {
          var tableRow = $('<tr>');
          for (var k = 1; k <= 7; k++) {
            var calendarDate = i * 7 + k - datePickerData.bsMonthFirstAdDate.getDay();
            var isCurrentMonthDate = true;
            if (calendarDate <= 0) {
              calendarDate = preMonthDays + calendarDate;
              isCurrentMonthDate = false;
            } else if (calendarDate > datePickerData.bsMonthDays) {
              calendarDate = calendarDate - datePickerData.bsMonthDays;
              isCurrentMonthDate = false;
            }

            if (isCurrentMonthDate) {
              var $td = $(
                '<td class="current-month-date" data-date="' +
                  calendarDate +
                  '" data-weekDay="' +
                  (k - 1) +
                  '">' +
                  calendarFunctions.getNepaliNumber(calendarDate) +
                  '</td>'
              );
              if (calendarDate == datePickerData.bsDate) {
                $td.addClass('active');
              }
              datePickerPlugin.disableIfOutOfRange($td, datePickerData, minBsDate, maxBsDate, calendarDate);
              tableRow.append($td);
            } else {
              tableRow.append(
                '<td class="other-month-date">' + calendarFunctions.getNepaliNumber(calendarDate) + '</td>'
              );
            }
          }

          calendarBody.append(tableRow);
        }

        return calendarBody;
      },
      disableIfOutOfRange: function ($td, datePickerData, minBsDate, maxBsDate, calendarDate) {
        if (minBsDate !== null) {
          if (datePickerData.bsYear < minBsDate.bsYear) {
            $td.addClass('disable');
          } else if (datePickerData.bsYear === minBsDate.bsYear && datePickerData.bsMonth < minBsDate.bsMonth) {
            $td.addClass('disable');
          } else if (
            datePickerData.bsYear === minBsDate.bsYear &&
            datePickerData.bsMonth === minBsDate.bsMonth &&
            calendarDate < minBsDate.bsDate
          ) {
            $td.addClass('disable');
          }
        }

        if (maxBsDate !== null) {
          if (datePickerData.bsYear > maxBsDate.bsYear) {
            $td.addClass('disable');
          } else if (datePickerData.bsYear === maxBsDate.bsYear && datePickerData.bsMonth > maxBsDate.bsMonth) {
            $td.addClass('disable');
          } else if (
            datePickerData.bsYear === maxBsDate.bsYear &&
            datePickerData.bsMonth === maxBsDate.bsMonth &&
            calendarDate > maxBsDate.bsDate
          ) {
            $td.addClass('disable');
          }
        }

        return $td;
      },
      renderCurrentMonthCalendar: function ($nepaliDatePicker) {
        var currentDate = new Date();
        var currentBsDate = calendarFunctions.getBsDateByAdDate(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
          currentDate.getDate()
        );
        var bsYear = currentBsDate.bsYear;
        var bsMonth = currentBsDate.bsMonth;
        var bsDate = currentBsDate.bsDate;
        datePickerPlugin.setCalendarDate($nepaliDatePicker, bsYear, bsMonth, bsDate);
        datePickerPlugin.renderMonthCalendar($nepaliDatePicker);
      },
      renderPreviousMonthCalendar: function ($nepaliDatePicker) {
        var datePickerData = $nepaliDatePicker.data();
        var prevMonth = datePickerData.bsMonth - 1 > 0 ? datePickerData.bsMonth - 1 : 12;
        var prevYear = prevMonth !== 12 ? datePickerData.bsYear : datePickerData.bsYear - 1;
        var prevDate = datePickerData.bsDate;
        if (prevYear < datePickerPlugin.options.yearStart || prevYear > datePickerPlugin.options.yearEnd) {
          return null;
        }
        datePickerPlugin.setCalendarDate($nepaliDatePicker, prevYear, prevMonth, prevDate);
        datePickerPlugin.renderMonthCalendar($nepaliDatePicker);
      },
      renderNextMonthCalendar: function ($nepaliDatePicker) {
        var datePickerData = $nepaliDatePicker.data();
        var nextMonth = datePickerData.bsMonth + 1 <= 12 ? datePickerData.bsMonth + 1 : 1;
        var nextYear = nextMonth !== 1 ? datePickerData.bsYear : datePickerData.bsYear + 1;
        var nextDate = datePickerData.bsDate;
        if (nextYear < datePickerPlugin.options.yearStart || nextYear > datePickerPlugin.options.yearEnd) {
          return null;
        }
        datePickerPlugin.setCalendarDate($nepaliDatePicker, nextYear, nextMonth, nextDate);
        datePickerPlugin.renderMonthCalendar($nepaliDatePicker);
      },
      renderFormattedSpecificDateCalendar: function ($nepaliDatePicker, dateFormat, dateFormattedText) {
        var datePickerDate = calendarFunctions.parseFormattedBsDate(dateFormat, dateFormattedText);
        datePickerPlugin.setCalendarDate(
          $nepaliDatePicker,
          datePickerDate.bsYear,
          datePickerDate.bsMonth,
          datePickerDate.bsDate
        );
        datePickerPlugin.renderMonthCalendar($nepaliDatePicker);
      }
    };

    this.each(function () {
      var $element = $(this);
      // Set global language for utility functions
      window.nepaliDatePickerLanguage = datePickerPlugin.options.language;
      datePickerPlugin.init($element);
    });

    datePickerPlugin.addCommonEventHandler();
    return this;
  };
})(jQuery, calendarFunctions);
