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

    // Number systems for display
    npNumbers: ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'],
    enNumbers: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],

    // Year range
    minBsYear: 2000,
    maxBsYear: 2100,

    // Reference date for conversion
    minAdDateEqBsDate: {
      ad: { year: 1943, month: 3, date: 14 }, // month: 3 = April (JS Date months are 0-based: 0=Jan, 3=Apr)
      bs: { year: 2000, month: 1, date: 1 }   // BS months are 1-based: 1=Baisakh
    }, // Reference: BS 2050/1/1 = AD 1993/4/13 (Tuesday)

    // minAdDateEqBsDate: {
    //   ad: { year: 1993, month: 3, date: 13 }, // month: 3 = April (JS Date months are 0-based: 0=Jan, 3=Apr)
    //   bs: { year: 2050, month: 1, date: 1 }   // BS months are 1-based: 1=Baisakh
    // }, // Reference: BS 2050/1/1 = AD 1993/4/13 (Tuesday)

    // Year-based month days data (first element: total days in year, then 12 months)
    monthDaysByYear: {
      // 1969: [366, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
      // 1970: [365, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
      // 1971: [365, 31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
      // 1972: [366, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
      // 1973: [365, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
      // 1974: [365, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
      // 1975: [365, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
      // 1976: [366, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
      // 1977: [365, 30, 32, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
      // 1978: [365, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
      // 1979: [365, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
      // 1980: [366, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
      // 1981: [365, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
      // 1982: [365, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
      // 1983: [365, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
      // 1984: [366, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
      // 1985: [365, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
      // 1986: [365, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
      // 1987: [365, 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
      // 1988: [366, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
      // 1989: [365, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      // 1990: [365, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
      // 1991: [365, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
      // 1992: [366, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
      // 1993: [365, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      // 1994: [365, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
      // 1995: [365, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
      // 1996: [366, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
      // 1997: [365, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
      // 1998: [365, 31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
      // 1999: [366, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
      2000: [365, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
      2001: [365, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
      2002: [365, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
      2003: [366, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
      2004: [365, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
      2005: [365, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
      2006: [365, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
      2007: [366, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
      2008: [365, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
      2009: [365, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
      2010: [365, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
      2011: [366, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
      2012: [365, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
      2013: [365, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
      2014: [365, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
      2015: [366, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
      2016: [365, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
      2017: [365, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
      2018: [365, 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
      2019: [366, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
      2020: [365, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2021: [365, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
      2022: [365, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
      2023: [366, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
      2024: [365, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2025: [365, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
      2026: [366, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
      2027: [365, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
      2028: [365, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
      2029: [365, 31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
      2030: [366, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
      2031: [365, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
      2032: [365, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
      2033: [365, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
      2034: [366, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
      2035: [365, 30, 32, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
      2036: [365, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
      2037: [365, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
      2038: [366, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
      2039: [365, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
      2040: [365, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
      2041: [365, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
      2042: [366, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
      2043: [365, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
      2044: [365, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
      2045: [365, 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
      2046: [366, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
      2047: [365, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2048: [365, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
      2049: [365, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
      2050: [366, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
      2051: [365, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2052: [365, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
      2053: [365, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
      2054: [366, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
      2055: [365, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
      2056: [365, 31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
      2057: [366, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
      2058: [365, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
      2059: [365, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
      2060: [365, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
      2061: [366, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
      2062: [365, 31, 31, 31, 32, 31, 31, 29, 30, 29, 30, 29, 31],
      2063: [365, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
      2064: [365, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
      2065: [366, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
      2066: [365, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
      2067: [365, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
      2068: [365, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
      2069: [366, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
      2070: [365, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
      2071: [365, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
      2072: [365, 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
      2073: [366, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
      2074: [365, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2075: [365, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
      2076: [365, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
      2077: [366, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
      2078: [365, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2079: [365, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
      2080: [365, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
      2081: [366, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
      2082: [365, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],

      2083: [365, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
      2084: [366, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
      2085: [365, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
      2086: [365, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
      2087: [365, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
      2088: [366, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
      2089: [365, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
      2090: [365, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
      2091: [365, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
      2092: [366, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
      2093: [365, 31, 31, 31, 32, 31, 31, 29, 30, 29, 30, 29, 31],
      2094: [365, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
      2095: [365, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
      2096: [366, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
      2097: [365, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
      2098: [365, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
      2099: [365, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
      2100: [366, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
      2101: [365, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
      2102: [365, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
      2103: [365, 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
      2104: [366, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
      2105: [365, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2106: [365, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
      2107: [365, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
      2108: [366, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
      2109: [365, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2110: [365, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
      2111: [365, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
      2112: [366, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
      2113: [365, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
      2114: [365, 31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
      2115: [366, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
      2116: [365, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
      2117: [365, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
      2118: [365, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
      2119: [366, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
      2120: [365, 30, 32, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
      2121: [365, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
      2122: [365, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
      2123: [366, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
      2124: [365, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
      2125: [365, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
      2126: [365, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
      2127: [366, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
      2128: [365, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
      2129: [365, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
      2130: [365, 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
      2131: [366, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
      2132: [365, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2133: [365, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
      2134: [365, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
      2135: [366, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
      2136: [365, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2137: [365, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
      2138: [365, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
      2139: [366, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
      2140: [365, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
      2141: [365, 31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
      2142: [366, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
      2143: [365, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
      2144: [365, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
      2145: [365, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
      2146: [366, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
      2147: [365, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
      2148: [365, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
      2149: [365, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
      2150: [366, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
      2151: [365, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
      2152: [365, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
      2153: [365, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
      2154: [366, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
      2155: [365, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
      2156: [365, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
      2157: [365, 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
      2158: [366, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
      2159: [365, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2160: [365, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
      2161: [365, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
      2162: [366, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
      2163: [365, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2164: [365, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
      2165: [365, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
      2166: [366, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
      2167: [365, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2168: [365, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
      2169: [366, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
      2170: [365, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
      2171: [365, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
      2172: [365, 31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
      2173: [366, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
      2174: [365, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
      2175: [365, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
      2176: [365, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
      2177: [366, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
      2178: [365, 30, 32, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
      2179: [365, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
      2180: [365, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
      2181: [366, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
      2182: [365, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
      2183: [365, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
      2184: [365, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
      2185: [366, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
      2186: [365, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
      2187: [365, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
      2188: [365, 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
      2189: [366, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
      2190: [365, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2191: [365, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
      2192: [365, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
      2193: [366, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
      2194: [365, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2195: [365, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
      2196: [365, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
      2197: [366, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
      2198: [365, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
      2199: [365, 31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
      2200: [372, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31],
      2201: [365, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
      2202: [365, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
      2203: [365, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
      2204: [366, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
      2205: [365, 31, 31, 31, 32, 31, 31, 29, 30, 29, 30, 29, 31],
      2206: [365, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
      2207: [365, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
      2208: [366, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
      2209: [365, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
      2210: [365, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
      2211: [365, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
      2212: [366, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
      2213: [365, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
      2214: [365, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
      2215: [365, 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
      2216: [366, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
      2217: [365, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2218: [365, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
      2219: [365, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
      2220: [366, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
      2221: [365, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2222: [365, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
      2223: [365, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
      2224: [366, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
      2225: [365, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
      2226: [365, 31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
      2227: [366, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
      2228: [365, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
      2229: [365, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
      2230: [365, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
      2231: [366, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
      2232: [365, 30, 32, 31, 32, 31, 31, 29, 30, 29, 30, 29, 31],
      2233: [365, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
      2234: [365, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
      2235: [366, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
      2236: [365, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
      2237: [365, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
      2238: [365, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
      2239: [366, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
      2240: [365, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
      2241: [365, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
      2242: [365, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
      2243: [366, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
      2244: [365, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
      2245: [365, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
      2246: [365, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
      2247: [366, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
      2248: [365, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
      2249: [365, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
      2250: [365, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
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
    getNepaliNumber: function (number, language) {
      if (typeof number === 'undefined') {
        throw new Error('Parameter number is required');
      } else if (typeof number != 'number' || number < 0) {
        throw new Error('Number should be positive integer');
      }

      var currentLanguage = language || window.nepaliDatePickerLanguage || 'en';
      var numbers = currentLanguage === 'np' ? calendarData.npNumbers : calendarData.enNumbers;

      var prefixNum = Math.floor(number / 10);
      var suffixNum = number % 10;
      if (prefixNum !== 0) {
        return calendarFunctions.getNepaliNumber(prefixNum, language) + numbers[suffixNum];
      } else {
        return numbers[suffixNum];
      }
    },
    /**
     * Return equivalent number from nepaliNumber
     * @param {String} nepaliNumber
     * @returns {Number} number
     */
    getNumberByNepaliNumber: function (nepaliNumber, language) {
      if (typeof nepaliNumber === 'undefined') {
        throw new Error('Parameter nepaliNumber is required');
      } else if (typeof nepaliNumber !== 'string') {
        throw new Error('Parameter nepaliNumber should be in string');
      }

      var currentLanguage = language || window.nepaliDatePickerLanguage || 'en';
      var numbers = currentLanguage === 'np' ? calendarData.npNumbers : calendarData.enNumbers;

      var number = 0;
      for (var i = 0; i < nepaliNumber.length; i++) {
        var numIndex = numbers.indexOf(nepaliNumber.charAt(i));
        if (numIndex === -1) {
          throw new Error('Invalid number for language: ' + currentLanguage);
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

      // --- New logic for per-year weekday anchor ---
      var firstDay = null;
      var daysNumFromMinBsYear = calendarFunctions.getTotalDaysNumFromMinBsYear(bsYear, bsMonth, bsDate);
      var adDate = new Date(
        calendarData.minAdDateEqBsDate.ad.year,
        calendarData.minAdDateEqBsDate.ad.month,
        calendarData.minAdDateEqBsDate.ad.date - 1
      );
      adDate.setDate(adDate.getDate() + daysNumFromMinBsYear);
      var bsMonthFirstAdDate = calendarFunctions.getAdDateByBsDate(bsYear, bsMonth, 1);
      firstDay = bsMonthFirstAdDate.getDay();

      var bsMonthDays = calendarFunctions.getBsMonthDays(bsYear, bsMonth);
      bsDate = bsDate > bsMonthDays ? bsMonthDays : bsDate;
      // For the selected date, calculate the weekday
      var weekDay = (firstDay + (bsDate - 1)) % 7;
      var formattedDate = calendarFunctions.bsDateFormat(dateFormatPattern, bsYear, bsMonth, bsDate);
      return {
        bsYear: bsYear,
        bsMonth: bsMonth,
        bsDate: bsDate,
        weekDay: weekDay + 1, // for compatibility with rest of code (1=Sun, 2=Mon, ...)
        formattedDate: formattedDate,
        adDate: null, // not used in this mode
        bsMonthFirstAdDate: { getDay: function () { return firstDay; } },
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
        var year = currentYear + i;
        if (!calendarData.monthDaysByYear[year]) {
          throw new Error('No data for BS year ' + year + ' in monthDaysByYear.');
        }
        monthDaysFromMinBsYear += calendarData.monthDaysByYear[year][bsMonth];
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
        return calendarData.monthDaysByYear[bsYear][bsMonth];
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

      // Use the same weekday logic as getBsMonthInfoByBsDate
      var firstDay = null;
      var eqAdDate = calendarFunctions.getAdDateByBsDate(bsYear, bsMonth, bsDate);
      var weekDay = eqAdDate.getDay();
      var formattedDate = dateFormatPattern;
      // Get current language from global options (default to 'en')
      var currentLanguage = window.nepaliDatePickerLanguage || 'en';
      formattedDate = formattedDate.replace(/%d/g, calendarFunctions.getNepaliNumber(bsDate, currentLanguage));
      formattedDate = formattedDate.replace(/%y/g, calendarFunctions.getNepaliNumber(bsYear, currentLanguage));
      formattedDate = formattedDate.replace(/%m/g, calendarFunctions.getNepaliNumber(bsMonth, currentLanguage));
      var months = calendarData.languages[currentLanguage].months;
      var days = calendarData.languages[currentLanguage].days;
      formattedDate = formattedDate.replace(/%M/g, months[bsMonth - 1]);
      formattedDate = formattedDate.replace(/%D/g, days[weekDay]);
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
            extractedFormattedBsDate.bsYear = calendarFunctions.getNumberByNepaliNumber(value, currentLanguage);
            diffTextNum += value.length - 2;
          } else if (valueOf === '%d') {
            extractedFormattedBsDate.bsDate = calendarFunctions.getNumberByNepaliNumber(value, currentLanguage);
            diffTextNum += value.length - 2;
          } else if (valueOf === '%D') {
            // Get current language from global options (default to 'en')
            var currentLanguage = window.nepaliDatePickerLanguage || 'en';
            var days = calendarData.languages[currentLanguage].days;
            extractedFormattedBsDate.bsDay = days.indexOf(value) + 1;
            diffTextNum += value.length - 2;
          } else if (valueOf === '%m') {
            extractedFormattedBsDate.bsMonth = calendarFunctions.getNumberByNepaliNumber(value, currentLanguage);
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
    },
    // Utility: Convert AD to BS (returns {bsYear, bsMonth, bsDay})
    adToBs: function (adYear, adMonth, adDay) {
      // Dart logic: Reference AD 1913-04-13 = BS 1970-01-01
      var refAd = new Date(Date.UTC(1943, 3, 14)); // JS months 0-based
      var targetAd = new Date(Date.UTC(adYear, adMonth - 1, adDay));
      var diff = Math.floor((targetAd - refAd) / (24 * 60 * 60 * 1000));
      var bsYear = 2000;
      var bsMonth = 1;
      var bsDay = 1;
      // Advance year
      while (diff >= (calendarData.monthDaysByYear[bsYear][0])) {
        diff -= calendarData.monthDaysByYear[bsYear][0];
        bsYear++;
      }
      // Advance month
      while (diff >= (calendarData.monthDaysByYear[bsYear][bsMonth])) {
        diff -= calendarData.monthDaysByYear[bsYear][bsMonth];
        bsMonth++;
      }
      bsDay += diff;
      return { bsYear, bsMonth, bsDay };
    },

    // Utility: Convert BS to AD (returns {adYear, adMonth, adDay})
    bsToAd: function (bsYear, bsMonth, bsDay) {
      // Dart logic: Reference BS 1970-01-01 = AD 1913-04-13
      var refAd = new Date(Date.UTC(1943, 3, 14));
      var totalDays = 0;
      for (var y = 2000; y < bsYear; y++) {
        totalDays += calendarData.monthDaysByYear[y][0];
      }
      for (var m = 1; m < bsMonth; m++) {
        totalDays += calendarData.monthDaysByYear[bsYear][m];
      }
      totalDays += (bsDay - 1);
      var adDate = new Date(refAd.getTime() + totalDays * 24 * 60 * 60 * 1000);
      // Return as UTC date parts
      return { adYear: adDate.getUTCFullYear(), adMonth: adDate.getUTCMonth() + 1, adDay: adDate.getUTCDate() };
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
          language: 'en', // 'en' for English, 'np' for Nepali
          fancyFont: true // If true, use Rajdhani font
        },
        options
      ),
      init: function ($element) {
        $element.prop('readonly', true);
        var $nepaliDatePicker = $('<div class="nepali-date-picker">');
        // Add .np-lang class if language is Nepali
        if (datePickerPlugin.options.language === 'np') {
          $nepaliDatePicker.addClass('np-lang');
        }
        // Add .fancy-font class if fancyFont is true
        if (datePickerPlugin.options.fancyFont) {
          $nepaliDatePicker.addClass('fancy-font');
        }
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
          // Fix: Only hide if click is outside the entire picker
          if ($targetElement.closest('.nepali-date-picker').length === 0) {
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
        calendarController.append('<button type="button" class="prev-btn icon" title="prev">&lt;</button>');
        // Year dropdown first, then month dropdown
        calendarController.append(datePickerPlugin.getYearDropOption($nepaliDatePicker));
        calendarController.append(datePickerPlugin.getMonthDropOption($nepaliDatePicker));
        calendarController.append('<button type="button" class="today-btn icon" title="today">⦿</button>');
        calendarController.append('<button type="button" class="next-btn icon" title="next">&gt;</button>');
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
        var currentLanguage = datePickerPlugin.options.language;
        $yearSpan.text(calendarFunctions.getNepaliNumber(datePickerData.bsYear, currentLanguage));
        $yearSpan.append('<i class="icon icon-drop-down">');
        var data = [];
        for (var i = datePickerPlugin.options.yearStart; i <= datePickerPlugin.options.yearEnd; i++) {
          data.push({
            label: calendarFunctions.getNepaliNumber(i, currentLanguage),
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
          for (var k = 0; k < 7; k++) {
            var calendarDate = i * 7 + k + 1 - datePickerData.bsMonthFirstAdDate.getDay();
            var isCurrentMonthDate = true;
            if (calendarDate <= 0) {
              calendarDate = preMonthDays + calendarDate;
              isCurrentMonthDate = false;
            } else if (calendarDate > datePickerData.bsMonthDays) {
              calendarDate = calendarDate - datePickerData.bsMonthDays;
              isCurrentMonthDate = false;
            }

            if (isCurrentMonthDate) {
              var currentLanguage = datePickerPlugin.options.language;
              var $td = $(
                '<td class="current-month-date" data-date="' +
                calendarDate +
                '" data-weekDay="' +
                (k - 1) +
                '">' +
                calendarFunctions.getNepaliNumber(calendarDate, currentLanguage) +
                '</td>'
              );
              if (calendarDate == datePickerData.bsDate) {
                $td.addClass('active');
              }
              datePickerPlugin.disableIfOutOfRange($td, datePickerData, minBsDate, maxBsDate, calendarDate);
              tableRow.append($td);
            } else {
              var currentLanguage = datePickerPlugin.options.language;
              tableRow.append(
                '<td class="other-month-date">' + calendarFunctions.getNepaliNumber(calendarDate, currentLanguage) + '</td>'
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

// Expose conversion utilities globally
window.nepaliDateUtils = {
  adToBs: calendarFunctions.adToBs,
  bsToAd: calendarFunctions.bsToAd
};

// --- Test Script for Conversion Accuracy ---
(function () {

  var tests = [
    {
      "bs": {
        "y": 2050,
        "m": 1,
        "d": 15
      },
      "ad": {
        "y": 1993,
        "m": 4,
        "d": 27
      }
    },
    {
      "bs": {
        "y": 2050,
        "m": 2,
        "d": 15
      },
      "ad": {
        "y": 1993,
        "m": 5,
        "d": 28
      }
    },
    {
      "bs": {
        "y": 2050,
        "m": 3,
        "d": 15
      },
      "ad": {
        "y": 1993,
        "m": 6,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2050,
        "m": 4,
        "d": 15
      },
      "ad": {
        "y": 1993,
        "m": 7,
        "d": 30
      }
    },
    {
      "bs": {
        "y": 2050,
        "m": 5,
        "d": 15
      },
      "ad": {
        "y": 1993,
        "m": 8,
        "d": 31
      }
    },
    {
      "bs": {
        "y": 2050,
        "m": 6,
        "d": 15
      },
      "ad": {
        "y": 1993,
        "m": 10,
        "d": 1
      }
    },
    {
      "bs": {
        "y": 2050,
        "m": 7,
        "d": 15
      },
      "ad": {
        "y": 1993,
        "m": 10,
        "d": 31
      }
    },
    {
      "bs": {
        "y": 2050,
        "m": 8,
        "d": 15
      },
      "ad": {
        "y": 1993,
        "m": 11,
        "d": 30
      }
    },
    {
      "bs": {
        "y": 2050,
        "m": 9,
        "d": 15
      },
      "ad": {
        "y": 1993,
        "m": 12,
        "d": 30
      }
    },
    {
      "bs": {
        "y": 2050,
        "m": 10,
        "d": 15
      },
      "ad": {
        "y": 1994,
        "m": 1,
        "d": 28
      }
    },
    {
      "bs": {
        "y": 2050,
        "m": 11,
        "d": 15
      },
      "ad": {
        "y": 1994,
        "m": 2,
        "d": 27
      }
    },
    {
      "bs": {
        "y": 2050,
        "m": 12,
        "d": 15
      },
      "ad": {
        "y": 1994,
        "m": 3,
        "d": 28
      }
    },
    {
      "bs": {
        "y": 2051,
        "m": 1,
        "d": 15
      },
      "ad": {
        "y": 1994,
        "m": 4,
        "d": 28
      }
    },
    {
      "bs": {
        "y": 2051,
        "m": 2,
        "d": 15
      },
      "ad": {
        "y": 1994,
        "m": 5,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2051,
        "m": 3,
        "d": 15
      },
      "ad": {
        "y": 1994,
        "m": 6,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2051,
        "m": 4,
        "d": 15
      },
      "ad": {
        "y": 1994,
        "m": 7,
        "d": 30
      }
    },
    {
      "bs": {
        "y": 2051,
        "m": 5,
        "d": 15
      },
      "ad": {
        "y": 1994,
        "m": 8,
        "d": 31
      }
    },
    {
      "bs": {
        "y": 2051,
        "m": 6,
        "d": 15
      },
      "ad": {
        "y": 1994,
        "m": 10,
        "d": 1
      }
    },
    {
      "bs": {
        "y": 2051,
        "m": 7,
        "d": 15
      },
      "ad": {
        "y": 1994,
        "m": 11,
        "d": 1
      }
    },
    {
      "bs": {
        "y": 2051,
        "m": 8,
        "d": 15
      },
      "ad": {
        "y": 1994,
        "m": 12,
        "d": 1
      }
    },
    {
      "bs": {
        "y": 2051,
        "m": 9,
        "d": 15
      },
      "ad": {
        "y": 1994,
        "m": 12,
        "d": 30
      }
    },
    {
      "bs": {
        "y": 2051,
        "m": 10,
        "d": 15
      },
      "ad": {
        "y": 1995,
        "m": 1,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2051,
        "m": 11,
        "d": 15
      },
      "ad": {
        "y": 1995,
        "m": 2,
        "d": 27
      }
    },
    {
      "bs": {
        "y": 2051,
        "m": 12,
        "d": 15
      },
      "ad": {
        "y": 1995,
        "m": 3,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2052,
        "m": 1,
        "d": 15
      },
      "ad": {
        "y": 1995,
        "m": 4,
        "d": 28
      }
    },
    {
      "bs": {
        "y": 2052,
        "m": 2,
        "d": 15
      },
      "ad": {
        "y": 1995,
        "m": 5,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2052,
        "m": 3,
        "d": 15
      },
      "ad": {
        "y": 1995,
        "m": 6,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2052,
        "m": 4,
        "d": 15
      },
      "ad": {
        "y": 1995,
        "m": 7,
        "d": 31
      }
    },
    {
      "bs": {
        "y": 2052,
        "m": 5,
        "d": 15
      },
      "ad": {
        "y": 1995,
        "m": 8,
        "d": 31
      }
    },
    {
      "bs": {
        "y": 2052,
        "m": 6,
        "d": 15
      },
      "ad": {
        "y": 1995,
        "m": 10,
        "d": 1
      }
    },
    {
      "bs": {
        "y": 2052,
        "m": 7,
        "d": 15
      },
      "ad": {
        "y": 1995,
        "m": 11,
        "d": 1
      }
    },
    {
      "bs": {
        "y": 2052,
        "m": 8,
        "d": 15
      },
      "ad": {
        "y": 1995,
        "m": 12,
        "d": 1
      }
    },
    {
      "bs": {
        "y": 2052,
        "m": 9,
        "d": 15
      },
      "ad": {
        "y": 1995,
        "m": 12,
        "d": 30
      }
    },
    {
      "bs": {
        "y": 2052,
        "m": 10,
        "d": 15
      },
      "ad": {
        "y": 1996,
        "m": 1,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2052,
        "m": 11,
        "d": 15
      },
      "ad": {
        "y": 1996,
        "m": 2,
        "d": 27
      }
    },
    {
      "bs": {
        "y": 2052,
        "m": 12,
        "d": 15
      },
      "ad": {
        "y": 1996,
        "m": 3,
        "d": 28
      }
    },
    {
      "bs": {
        "y": 2053,
        "m": 1,
        "d": 15
      },
      "ad": {
        "y": 1996,
        "m": 4,
        "d": 27
      }
    },
    {
      "bs": {
        "y": 2053,
        "m": 2,
        "d": 15
      },
      "ad": {
        "y": 1996,
        "m": 5,
        "d": 28
      }
    },
    {
      "bs": {
        "y": 2053,
        "m": 3,
        "d": 15
      },
      "ad": {
        "y": 1996,
        "m": 6,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2053,
        "m": 4,
        "d": 15
      },
      "ad": {
        "y": 1996,
        "m": 7,
        "d": 30
      }
    },
    {
      "bs": {
        "y": 2053,
        "m": 5,
        "d": 15
      },
      "ad": {
        "y": 1996,
        "m": 8,
        "d": 31
      }
    },
    {
      "bs": {
        "y": 2053,
        "m": 6,
        "d": 15
      },
      "ad": {
        "y": 1996,
        "m": 10,
        "d": 1
      }
    },
    {
      "bs": {
        "y": 2053,
        "m": 7,
        "d": 15
      },
      "ad": {
        "y": 1996,
        "m": 10,
        "d": 31
      }
    },
    {
      "bs": {
        "y": 2053,
        "m": 8,
        "d": 15
      },
      "ad": {
        "y": 1996,
        "m": 11,
        "d": 30
      }
    },
    {
      "bs": {
        "y": 2053,
        "m": 9,
        "d": 15
      },
      "ad": {
        "y": 1996,
        "m": 12,
        "d": 30
      }
    },
    {
      "bs": {
        "y": 2053,
        "m": 10,
        "d": 15
      },
      "ad": {
        "y": 1997,
        "m": 1,
        "d": 28
      }
    },
    {
      "bs": {
        "y": 2053,
        "m": 11,
        "d": 15
      },
      "ad": {
        "y": 1997,
        "m": 2,
        "d": 26
      }
    },
    {
      "bs": {
        "y": 2053,
        "m": 12,
        "d": 15
      },
      "ad": {
        "y": 1997,
        "m": 3,
        "d": 28
      }
    },
    {
      "bs": {
        "y": 2054,
        "m": 1,
        "d": 15
      },
      "ad": {
        "y": 1997,
        "m": 4,
        "d": 27
      }
    },
    {
      "bs": {
        "y": 2054,
        "m": 2,
        "d": 15
      },
      "ad": {
        "y": 1997,
        "m": 5,
        "d": 28
      }
    },
    {
      "bs": {
        "y": 2054,
        "m": 3,
        "d": 15
      },
      "ad": {
        "y": 1997,
        "m": 6,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2054,
        "m": 4,
        "d": 15
      },
      "ad": {
        "y": 1997,
        "m": 7,
        "d": 30
      }
    },
    {
      "bs": {
        "y": 2054,
        "m": 5,
        "d": 15
      },
      "ad": {
        "y": 1997,
        "m": 8,
        "d": 31
      }
    },
    {
      "bs": {
        "y": 2054,
        "m": 6,
        "d": 15
      },
      "ad": {
        "y": 1997,
        "m": 10,
        "d": 1
      }
    },
    {
      "bs": {
        "y": 2054,
        "m": 7,
        "d": 15
      },
      "ad": {
        "y": 1997,
        "m": 10,
        "d": 31
      }
    },
    {
      "bs": {
        "y": 2054,
        "m": 8,
        "d": 15
      },
      "ad": {
        "y": 1997,
        "m": 11,
        "d": 30
      }
    },
    {
      "bs": {
        "y": 2054,
        "m": 9,
        "d": 15
      },
      "ad": {
        "y": 1997,
        "m": 12,
        "d": 30
      }
    },
    {
      "bs": {
        "y": 2054,
        "m": 10,
        "d": 15
      },
      "ad": {
        "y": 1998,
        "m": 1,
        "d": 28
      }
    },
    {
      "bs": {
        "y": 2054,
        "m": 11,
        "d": 15
      },
      "ad": {
        "y": 1998,
        "m": 2,
        "d": 27
      }
    },
    {
      "bs": {
        "y": 2054,
        "m": 12,
        "d": 15
      },
      "ad": {
        "y": 1998,
        "m": 3,
        "d": 28
      }
    },
    {
      "bs": {
        "y": 2055,
        "m": 1,
        "d": 15
      },
      "ad": {
        "y": 1998,
        "m": 4,
        "d": 28
      }
    },
    {
      "bs": {
        "y": 2055,
        "m": 2,
        "d": 15
      },
      "ad": {
        "y": 1998,
        "m": 5,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2055,
        "m": 3,
        "d": 15
      },
      "ad": {
        "y": 1998,
        "m": 6,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2055,
        "m": 4,
        "d": 15
      },
      "ad": {
        "y": 1998,
        "m": 7,
        "d": 31
      }
    },
    {
      "bs": {
        "y": 2055,
        "m": 5,
        "d": 15
      },
      "ad": {
        "y": 1998,
        "m": 8,
        "d": 31
      }
    },
    {
      "bs": {
        "y": 2055,
        "m": 6,
        "d": 15
      },
      "ad": {
        "y": 1998,
        "m": 10,
        "d": 1
      }
    },
    {
      "bs": {
        "y": 2055,
        "m": 7,
        "d": 15
      },
      "ad": {
        "y": 1998,
        "m": 11,
        "d": 1
      }
    },
    {
      "bs": {
        "y": 2055,
        "m": 8,
        "d": 15
      },
      "ad": {
        "y": 1998,
        "m": 12,
        "d": 1
      }
    },
    {
      "bs": {
        "y": 2055,
        "m": 9,
        "d": 15
      },
      "ad": {
        "y": 1998,
        "m": 12,
        "d": 30
      }
    },
    {
      "bs": {
        "y": 2055,
        "m": 10,
        "d": 15
      },
      "ad": {
        "y": 1999,
        "m": 1,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2055,
        "m": 11,
        "d": 15
      },
      "ad": {
        "y": 1999,
        "m": 2,
        "d": 27
      }
    },
    {
      "bs": {
        "y": 2055,
        "m": 12,
        "d": 15
      },
      "ad": {
        "y": 1999,
        "m": 3,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2056,
        "m": 1,
        "d": 15
      },
      "ad": {
        "y": 1999,
        "m": 4,
        "d": 28
      }
    },
    {
      "bs": {
        "y": 2056,
        "m": 2,
        "d": 15
      },
      "ad": {
        "y": 1999,
        "m": 5,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2056,
        "m": 3,
        "d": 15
      },
      "ad": {
        "y": 1999,
        "m": 6,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2056,
        "m": 4,
        "d": 15
      },
      "ad": {
        "y": 1999,
        "m": 7,
        "d": 31
      }
    },
    {
      "bs": {
        "y": 2056,
        "m": 5,
        "d": 15
      },
      "ad": {
        "y": 1999,
        "m": 8,
        "d": 31
      }
    },
    {
      "bs": {
        "y": 2056,
        "m": 6,
        "d": 15
      },
      "ad": {
        "y": 1999,
        "m": 10,
        "d": 2
      }
    },
    {
      "bs": {
        "y": 2056,
        "m": 7,
        "d": 15
      },
      "ad": {
        "y": 1999,
        "m": 11,
        "d": 1
      }
    },
    {
      "bs": {
        "y": 2056,
        "m": 8,
        "d": 15
      },
      "ad": {
        "y": 1999,
        "m": 12,
        "d": 1
      }
    },
    {
      "bs": {
        "y": 2056,
        "m": 9,
        "d": 15
      },
      "ad": {
        "y": 1999,
        "m": 12,
        "d": 30
      }
    },
    {
      "bs": {
        "y": 2056,
        "m": 10,
        "d": 15
      },
      "ad": {
        "y": 2000,
        "m": 1,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2056,
        "m": 11,
        "d": 15
      },
      "ad": {
        "y": 2000,
        "m": 2,
        "d": 27
      }
    },
    {
      "bs": {
        "y": 2056,
        "m": 12,
        "d": 15
      },
      "ad": {
        "y": 2000,
        "m": 3,
        "d": 28
      }
    },
    {
      "bs": {
        "y": 2057,
        "m": 1,
        "d": 15
      },
      "ad": {
        "y": 2000,
        "m": 4,
        "d": 27
      }
    },
    {
      "bs": {
        "y": 2057,
        "m": 2,
        "d": 15
      },
      "ad": {
        "y": 2000,
        "m": 5,
        "d": 28
      }
    },
    {
      "bs": {
        "y": 2057,
        "m": 3,
        "d": 15
      },
      "ad": {
        "y": 2000,
        "m": 6,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2057,
        "m": 4,
        "d": 15
      },
      "ad": {
        "y": 2000,
        "m": 7,
        "d": 30
      }
    },
    {
      "bs": {
        "y": 2057,
        "m": 5,
        "d": 15
      },
      "ad": {
        "y": 2000,
        "m": 8,
        "d": 31
      }
    },
    {
      "bs": {
        "y": 2057,
        "m": 6,
        "d": 15
      },
      "ad": {
        "y": 2000,
        "m": 10,
        "d": 1
      }
    },
    {
      "bs": {
        "y": 2057,
        "m": 7,
        "d": 15
      },
      "ad": {
        "y": 2000,
        "m": 10,
        "d": 31
      }
    },
    {
      "bs": {
        "y": 2057,
        "m": 8,
        "d": 15
      },
      "ad": {
        "y": 2000,
        "m": 11,
        "d": 30
      }
    },
    {
      "bs": {
        "y": 2057,
        "m": 9,
        "d": 15
      },
      "ad": {
        "y": 2000,
        "m": 12,
        "d": 30
      }
    },
    {
      "bs": {
        "y": 2057,
        "m": 10,
        "d": 15
      },
      "ad": {
        "y": 2001,
        "m": 1,
        "d": 28
      }
    },
    {
      "bs": {
        "y": 2057,
        "m": 11,
        "d": 15
      },
      "ad": {
        "y": 2001,
        "m": 2,
        "d": 26
      }
    },
    {
      "bs": {
        "y": 2057,
        "m": 12,
        "d": 15
      },
      "ad": {
        "y": 2001,
        "m": 3,
        "d": 28
      }
    },
    {
      "bs": {
        "y": 2058,
        "m": 1,
        "d": 15
      },
      "ad": {
        "y": 2001,
        "m": 4,
        "d": 28
      }
    },
    {
      "bs": {
        "y": 2058,
        "m": 2,
        "d": 15
      },
      "ad": {
        "y": 2001,
        "m": 5,
        "d": 28
      }
    },
    {
      "bs": {
        "y": 2058,
        "m": 3,
        "d": 15
      },
      "ad": {
        "y": 2001,
        "m": 6,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2058,
        "m": 4,
        "d": 15
      },
      "ad": {
        "y": 2001,
        "m": 7,
        "d": 30
      }
    },
    {
      "bs": {
        "y": 2058,
        "m": 5,
        "d": 15
      },
      "ad": {
        "y": 2001,
        "m": 8,
        "d": 31
      }
    },
    {
      "bs": {
        "y": 2058,
        "m": 6,
        "d": 15
      },
      "ad": {
        "y": 2001,
        "m": 10,
        "d": 1
      }
    },
    {
      "bs": {
        "y": 2058,
        "m": 7,
        "d": 15
      },
      "ad": {
        "y": 2001,
        "m": 10,
        "d": 31
      }
    },
    {
      "bs": {
        "y": 2058,
        "m": 8,
        "d": 15
      },
      "ad": {
        "y": 2001,
        "m": 11,
        "d": 30
      }
    },
    {
      "bs": {
        "y": 2058,
        "m": 9,
        "d": 15
      },
      "ad": {
        "y": 2001,
        "m": 12,
        "d": 30
      }
    },
    {
      "bs": {
        "y": 2058,
        "m": 10,
        "d": 15
      },
      "ad": {
        "y": 2002,
        "m": 1,
        "d": 28
      }
    },
    {
      "bs": {
        "y": 2058,
        "m": 11,
        "d": 15
      },
      "ad": {
        "y": 2002,
        "m": 2,
        "d": 27
      }
    },
    {
      "bs": {
        "y": 2058,
        "m": 12,
        "d": 15
      },
      "ad": {
        "y": 2002,
        "m": 3,
        "d": 28
      }
    },
    {
      "bs": {
        "y": 2059,
        "m": 1,
        "d": 15
      },
      "ad": {
        "y": 2002,
        "m": 4,
        "d": 28
      }
    },
    {
      "bs": {
        "y": 2059,
        "m": 2,
        "d": 15
      },
      "ad": {
        "y": 2002,
        "m": 5,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2059,
        "m": 3,
        "d": 15
      },
      "ad": {
        "y": 2002,
        "m": 6,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2059,
        "m": 4,
        "d": 15
      },
      "ad": {
        "y": 2002,
        "m": 7,
        "d": 31
      }
    },
    {
      "bs": {
        "y": 2059,
        "m": 5,
        "d": 15
      },
      "ad": {
        "y": 2002,
        "m": 8,
        "d": 31
      }
    },
    {
      "bs": {
        "y": 2059,
        "m": 6,
        "d": 15
      },
      "ad": {
        "y": 2002,
        "m": 10,
        "d": 1
      }
    },
    {
      "bs": {
        "y": 2059,
        "m": 7,
        "d": 15
      },
      "ad": {
        "y": 2002,
        "m": 11,
        "d": 1
      }
    },
    {
      "bs": {
        "y": 2059,
        "m": 8,
        "d": 15
      },
      "ad": {
        "y": 2002,
        "m": 12,
        "d": 1
      }
    },
    {
      "bs": {
        "y": 2059,
        "m": 9,
        "d": 15
      },
      "ad": {
        "y": 2002,
        "m": 12,
        "d": 30
      }
    },
    {
      "bs": {
        "y": 2059,
        "m": 10,
        "d": 15
      },
      "ad": {
        "y": 2003,
        "m": 1,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2059,
        "m": 11,
        "d": 15
      },
      "ad": {
        "y": 2003,
        "m": 2,
        "d": 27
      }
    },
    {
      "bs": {
        "y": 2059,
        "m": 12,
        "d": 15
      },
      "ad": {
        "y": 2003,
        "m": 3,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2060,
        "m": 1,
        "d": 15
      },
      "ad": {
        "y": 2003,
        "m": 4,
        "d": 28
      }
    },
    {
      "bs": {
        "y": 2060,
        "m": 2,
        "d": 15
      },
      "ad": {
        "y": 2003,
        "m": 5,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2060,
        "m": 3,
        "d": 15
      },
      "ad": {
        "y": 2003,
        "m": 6,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2060,
        "m": 4,
        "d": 15
      },
      "ad": {
        "y": 2003,
        "m": 7,
        "d": 31
      }
    },
    {
      "bs": {
        "y": 2060,
        "m": 5,
        "d": 15
      },
      "ad": {
        "y": 2003,
        "m": 9,
        "d": 1
      }
    },
    {
      "bs": {
        "y": 2060,
        "m": 6,
        "d": 15
      },
      "ad": {
        "y": 2003,
        "m": 10,
        "d": 2
      }
    },
    {
      "bs": {
        "y": 2060,
        "m": 7,
        "d": 15
      },
      "ad": {
        "y": 2003,
        "m": 11,
        "d": 1
      }
    },
    {
      "bs": {
        "y": 2060,
        "m": 8,
        "d": 15
      },
      "ad": {
        "y": 2003,
        "m": 12,
        "d": 1
      }
    },
    {
      "bs": {
        "y": 2060,
        "m": 9,
        "d": 15
      },
      "ad": {
        "y": 2003,
        "m": 12,
        "d": 30
      }
    },
    {
      "bs": {
        "y": 2060,
        "m": 10,
        "d": 15
      },
      "ad": {
        "y": 2004,
        "m": 1,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2060,
        "m": 11,
        "d": 15
      },
      "ad": {
        "y": 2004,
        "m": 2,
        "d": 27
      }
    },
    {
      "bs": {
        "y": 2060,
        "m": 12,
        "d": 15
      },
      "ad": {
        "y": 2004,
        "m": 3,
        "d": 28
      }
    },
    {
      "bs": {
        "y": 2061,
        "m": 1,
        "d": 15
      },
      "ad": {
        "y": 2004,
        "m": 4,
        "d": 27
      }
    },
    {
      "bs": {
        "y": 2061,
        "m": 2,
        "d": 15
      },
      "ad": {
        "y": 2004,
        "m": 5,
        "d": 28
      }
    },
    {
      "bs": {
        "y": 2061,
        "m": 3,
        "d": 15
      },
      "ad": {
        "y": 2004,
        "m": 6,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2061,
        "m": 4,
        "d": 15
      },
      "ad": {
        "y": 2004,
        "m": 7,
        "d": 30
      }
    },
    {
      "bs": {
        "y": 2061,
        "m": 5,
        "d": 15
      },
      "ad": {
        "y": 2004,
        "m": 8,
        "d": 31
      }
    },
    {
      "bs": {
        "y": 2061,
        "m": 6,
        "d": 15
      },
      "ad": {
        "y": 2004,
        "m": 10,
        "d": 1
      }
    },
    {
      "bs": {
        "y": 2061,
        "m": 7,
        "d": 15
      },
      "ad": {
        "y": 2004,
        "m": 10,
        "d": 31
      }
    },
    {
      "bs": {
        "y": 2061,
        "m": 8,
        "d": 15
      },
      "ad": {
        "y": 2004,
        "m": 11,
        "d": 30
      }
    },
    {
      "bs": {
        "y": 2061,
        "m": 9,
        "d": 15
      },
      "ad": {
        "y": 2004,
        "m": 12,
        "d": 30
      }
    },
    {
      "bs": {
        "y": 2061,
        "m": 10,
        "d": 15
      },
      "ad": {
        "y": 2005,
        "m": 1,
        "d": 28
      }
    },
    {
      "bs": {
        "y": 2061,
        "m": 11,
        "d": 15
      },
      "ad": {
        "y": 2005,
        "m": 2,
        "d": 26
      }
    },
    {
      "bs": {
        "y": 2061,
        "m": 12,
        "d": 15
      },
      "ad": {
        "y": 2005,
        "m": 3,
        "d": 28
      }
    },
    {
      "bs": {
        "y": 2062,
        "m": 1,
        "d": 15
      },
      "ad": {
        "y": 2005,
        "m": 4,
        "d": 28
      }
    },
    {
      "bs": {
        "y": 2062,
        "m": 2,
        "d": 15
      },
      "ad": {
        "y": 2005,
        "m": 5,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2062,
        "m": 3,
        "d": 15
      },
      "ad": {
        "y": 2005,
        "m": 6,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2062,
        "m": 4,
        "d": 15
      },
      "ad": {
        "y": 2005,
        "m": 7,
        "d": 30
      }
    },
    {
      "bs": {
        "y": 2062,
        "m": 5,
        "d": 15
      },
      "ad": {
        "y": 2005,
        "m": 8,
        "d": 31
      }
    },
    {
      "bs": {
        "y": 2062,
        "m": 6,
        "d": 15
      },
      "ad": {
        "y": 2005,
        "m": 10,
        "d": 1
      }
    },
    {
      "bs": {
        "y": 2062,
        "m": 7,
        "d": 15
      },
      "ad": {
        "y": 2005,
        "m": 11,
        "d": 1
      }
    },
    {
      "bs": {
        "y": 2062,
        "m": 8,
        "d": 15
      },
      "ad": {
        "y": 2005,
        "m": 11,
        "d": 30
      }
    },
    {
      "bs": {
        "y": 2062,
        "m": 9,
        "d": 15
      },
      "ad": {
        "y": 2005,
        "m": 12,
        "d": 30
      }
    },
    {
      "bs": {
        "y": 2062,
        "m": 10,
        "d": 15
      },
      "ad": {
        "y": 2006,
        "m": 1,
        "d": 28
      }
    },
    {
      "bs": {
        "y": 2062,
        "m": 11,
        "d": 15
      },
      "ad": {
        "y": 2006,
        "m": 2,
        "d": 27
      }
    },
    {
      "bs": {
        "y": 2062,
        "m": 12,
        "d": 15
      },
      "ad": {
        "y": 2006,
        "m": 3,
        "d": 28
      }
    },
    {
      "bs": {
        "y": 2063,
        "m": 1,
        "d": 15
      },
      "ad": {
        "y": 2006,
        "m": 4,
        "d": 28
      }
    },
    {
      "bs": {
        "y": 2063,
        "m": 2,
        "d": 15
      },
      "ad": {
        "y": 2006,
        "m": 5,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2063,
        "m": 3,
        "d": 15
      },
      "ad": {
        "y": 2006,
        "m": 6,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2063,
        "m": 4,
        "d": 15
      },
      "ad": {
        "y": 2006,
        "m": 7,
        "d": 31
      }
    },
    {
      "bs": {
        "y": 2063,
        "m": 5,
        "d": 15
      },
      "ad": {
        "y": 2006,
        "m": 8,
        "d": 31
      }
    },
    {
      "bs": {
        "y": 2063,
        "m": 6,
        "d": 15
      },
      "ad": {
        "y": 2006,
        "m": 10,
        "d": 1
      }
    },
    {
      "bs": {
        "y": 2063,
        "m": 7,
        "d": 15
      },
      "ad": {
        "y": 2006,
        "m": 11,
        "d": 1
      }
    },
    {
      "bs": {
        "y": 2063,
        "m": 8,
        "d": 15
      },
      "ad": {
        "y": 2006,
        "m": 12,
        "d": 1
      }
    },
    {
      "bs": {
        "y": 2063,
        "m": 9,
        "d": 15
      },
      "ad": {
        "y": 2006,
        "m": 12,
        "d": 30
      }
    },
    {
      "bs": {
        "y": 2063,
        "m": 10,
        "d": 15
      },
      "ad": {
        "y": 2007,
        "m": 1,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2063,
        "m": 11,
        "d": 15
      },
      "ad": {
        "y": 2007,
        "m": 2,
        "d": 27
      }
    },
    {
      "bs": {
        "y": 2063,
        "m": 12,
        "d": 15
      },
      "ad": {
        "y": 2007,
        "m": 3,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2064,
        "m": 1,
        "d": 15
      },
      "ad": {
        "y": 2007,
        "m": 4,
        "d": 28
      }
    },
    {
      "bs": {
        "y": 2064,
        "m": 2,
        "d": 15
      },
      "ad": {
        "y": 2007,
        "m": 5,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2064,
        "m": 3,
        "d": 15
      },
      "ad": {
        "y": 2007,
        "m": 6,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2064,
        "m": 4,
        "d": 15
      },
      "ad": {
        "y": 2007,
        "m": 7,
        "d": 31
      }
    },
    {
      "bs": {
        "y": 2064,
        "m": 5,
        "d": 15
      },
      "ad": {
        "y": 2007,
        "m": 9,
        "d": 1
      }
    },
    {
      "bs": {
        "y": 2064,
        "m": 6,
        "d": 15
      },
      "ad": {
        "y": 2007,
        "m": 10,
        "d": 2
      }
    },
    {
      "bs": {
        "y": 2064,
        "m": 7,
        "d": 15
      },
      "ad": {
        "y": 2007,
        "m": 11,
        "d": 1
      }
    },
    {
      "bs": {
        "y": 2064,
        "m": 8,
        "d": 15
      },
      "ad": {
        "y": 2007,
        "m": 12,
        "d": 1
      }
    },
    {
      "bs": {
        "y": 2064,
        "m": 9,
        "d": 15
      },
      "ad": {
        "y": 2007,
        "m": 12,
        "d": 30
      }
    },
    {
      "bs": {
        "y": 2064,
        "m": 10,
        "d": 15
      },
      "ad": {
        "y": 2008,
        "m": 1,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2064,
        "m": 11,
        "d": 15
      },
      "ad": {
        "y": 2008,
        "m": 2,
        "d": 27
      }
    },
    {
      "bs": {
        "y": 2064,
        "m": 12,
        "d": 15
      },
      "ad": {
        "y": 2008,
        "m": 3,
        "d": 28
      }
    },
    {
      "bs": {
        "y": 2065,
        "m": 1,
        "d": 15
      },
      "ad": {
        "y": 2008,
        "m": 4,
        "d": 27
      }
    },
    {
      "bs": {
        "y": 2065,
        "m": 2,
        "d": 15
      },
      "ad": {
        "y": 2008,
        "m": 5,
        "d": 28
      }
    },
    {
      "bs": {
        "y": 2065,
        "m": 3,
        "d": 15
      },
      "ad": {
        "y": 2008,
        "m": 6,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2065,
        "m": 4,
        "d": 15
      },
      "ad": {
        "y": 2008,
        "m": 7,
        "d": 30
      }
    },
    {
      "bs": {
        "y": 2065,
        "m": 5,
        "d": 15
      },
      "ad": {
        "y": 2008,
        "m": 8,
        "d": 31
      }
    },
    {
      "bs": {
        "y": 2065,
        "m": 6,
        "d": 15
      },
      "ad": {
        "y": 2008,
        "m": 10,
        "d": 1
      }
    },
    {
      "bs": {
        "y": 2065,
        "m": 7,
        "d": 15
      },
      "ad": {
        "y": 2008,
        "m": 10,
        "d": 31
      }
    },
    {
      "bs": {
        "y": 2065,
        "m": 8,
        "d": 15
      },
      "ad": {
        "y": 2008,
        "m": 11,
        "d": 30
      }
    },
    {
      "bs": {
        "y": 2065,
        "m": 9,
        "d": 15
      },
      "ad": {
        "y": 2008,
        "m": 12,
        "d": 30
      }
    },
    {
      "bs": {
        "y": 2065,
        "m": 10,
        "d": 15
      },
      "ad": {
        "y": 2009,
        "m": 1,
        "d": 28
      }
    },
    {
      "bs": {
        "y": 2065,
        "m": 11,
        "d": 15
      },
      "ad": {
        "y": 2009,
        "m": 2,
        "d": 26
      }
    },
    {
      "bs": {
        "y": 2065,
        "m": 12,
        "d": 15
      },
      "ad": {
        "y": 2009,
        "m": 3,
        "d": 28
      }
    },
    {
      "bs": {
        "y": 2066,
        "m": 1,
        "d": 15
      },
      "ad": {
        "y": 2009,
        "m": 4,
        "d": 28
      }
    },
    {
      "bs": {
        "y": 2066,
        "m": 2,
        "d": 15
      },
      "ad": {
        "y": 2009,
        "m": 5,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2066,
        "m": 3,
        "d": 15
      },
      "ad": {
        "y": 2009,
        "m": 6,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2066,
        "m": 4,
        "d": 15
      },
      "ad": {
        "y": 2009,
        "m": 7,
        "d": 30
      }
    },
    {
      "bs": {
        "y": 2066,
        "m": 5,
        "d": 15
      },
      "ad": {
        "y": 2009,
        "m": 8,
        "d": 31
      }
    },
    {
      "bs": {
        "y": 2066,
        "m": 6,
        "d": 15
      },
      "ad": {
        "y": 2009,
        "m": 10,
        "d": 1
      }
    },
    {
      "bs": {
        "y": 2066,
        "m": 7,
        "d": 15
      },
      "ad": {
        "y": 2009,
        "m": 11,
        "d": 1
      }
    },
    {
      "bs": {
        "y": 2066,
        "m": 8,
        "d": 15
      },
      "ad": {
        "y": 2009,
        "m": 11,
        "d": 30
      }
    },
    {
      "bs": {
        "y": 2066,
        "m": 9,
        "d": 15
      },
      "ad": {
        "y": 2009,
        "m": 12,
        "d": 30
      }
    },
    {
      "bs": {
        "y": 2066,
        "m": 10,
        "d": 15
      },
      "ad": {
        "y": 2010,
        "m": 1,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2066,
        "m": 11,
        "d": 15
      },
      "ad": {
        "y": 2010,
        "m": 2,
        "d": 27
      }
    },
    {
      "bs": {
        "y": 2066,
        "m": 12,
        "d": 15
      },
      "ad": {
        "y": 2010,
        "m": 3,
        "d": 28
      }
    },
    {
      "bs": {
        "y": 2067,
        "m": 1,
        "d": 15
      },
      "ad": {
        "y": 2010,
        "m": 4,
        "d": 28
      }
    },
    {
      "bs": {
        "y": 2067,
        "m": 2,
        "d": 15
      },
      "ad": {
        "y": 2010,
        "m": 5,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2067,
        "m": 3,
        "d": 15
      },
      "ad": {
        "y": 2010,
        "m": 6,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2067,
        "m": 4,
        "d": 15
      },
      "ad": {
        "y": 2010,
        "m": 7,
        "d": 31
      }
    },
    {
      "bs": {
        "y": 2067,
        "m": 5,
        "d": 15
      },
      "ad": {
        "y": 2010,
        "m": 8,
        "d": 31
      }
    },
    {
      "bs": {
        "y": 2067,
        "m": 6,
        "d": 15
      },
      "ad": {
        "y": 2010,
        "m": 10,
        "d": 1
      }
    },
    {
      "bs": {
        "y": 2067,
        "m": 7,
        "d": 15
      },
      "ad": {
        "y": 2010,
        "m": 11,
        "d": 1
      }
    },
    {
      "bs": {
        "y": 2067,
        "m": 8,
        "d": 15
      },
      "ad": {
        "y": 2010,
        "m": 12,
        "d": 1
      }
    },
    {
      "bs": {
        "y": 2067,
        "m": 9,
        "d": 15
      },
      "ad": {
        "y": 2010,
        "m": 12,
        "d": 30
      }
    },
    {
      "bs": {
        "y": 2067,
        "m": 10,
        "d": 15
      },
      "ad": {
        "y": 2011,
        "m": 1,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2067,
        "m": 11,
        "d": 15
      },
      "ad": {
        "y": 2011,
        "m": 2,
        "d": 27
      }
    },
    {
      "bs": {
        "y": 2067,
        "m": 12,
        "d": 15
      },
      "ad": {
        "y": 2011,
        "m": 3,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2068,
        "m": 1,
        "d": 15
      },
      "ad": {
        "y": 2011,
        "m": 4,
        "d": 28
      }
    },
    {
      "bs": {
        "y": 2068,
        "m": 2,
        "d": 15
      },
      "ad": {
        "y": 2011,
        "m": 5,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2068,
        "m": 3,
        "d": 15
      },
      "ad": {
        "y": 2011,
        "m": 6,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2068,
        "m": 4,
        "d": 15
      },
      "ad": {
        "y": 2011,
        "m": 7,
        "d": 31
      }
    },
    {
      "bs": {
        "y": 2068,
        "m": 5,
        "d": 15
      },
      "ad": {
        "y": 2011,
        "m": 9,
        "d": 1
      }
    },
    {
      "bs": {
        "y": 2068,
        "m": 6,
        "d": 15
      },
      "ad": {
        "y": 2011,
        "m": 10,
        "d": 2
      }
    },
    {
      "bs": {
        "y": 2068,
        "m": 7,
        "d": 15
      },
      "ad": {
        "y": 2011,
        "m": 11,
        "d": 1
      }
    },
    {
      "bs": {
        "y": 2068,
        "m": 8,
        "d": 15
      },
      "ad": {
        "y": 2011,
        "m": 12,
        "d": 1
      }
    },
    {
      "bs": {
        "y": 2068,
        "m": 9,
        "d": 15
      },
      "ad": {
        "y": 2011,
        "m": 12,
        "d": 30
      }
    },
    {
      "bs": {
        "y": 2068,
        "m": 10,
        "d": 15
      },
      "ad": {
        "y": 2012,
        "m": 1,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2068,
        "m": 11,
        "d": 15
      },
      "ad": {
        "y": 2012,
        "m": 2,
        "d": 27
      }
    },
    {
      "bs": {
        "y": 2068,
        "m": 12,
        "d": 15
      },
      "ad": {
        "y": 2012,
        "m": 3,
        "d": 28
      }
    },
    {
      "bs": {
        "y": 2069,
        "m": 1,
        "d": 15
      },
      "ad": {
        "y": 2012,
        "m": 4,
        "d": 27
      }
    },
    {
      "bs": {
        "y": 2069,
        "m": 2,
        "d": 15
      },
      "ad": {
        "y": 2012,
        "m": 5,
        "d": 28
      }
    },
    {
      "bs": {
        "y": 2069,
        "m": 3,
        "d": 15
      },
      "ad": {
        "y": 2012,
        "m": 6,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2069,
        "m": 4,
        "d": 15
      },
      "ad": {
        "y": 2012,
        "m": 7,
        "d": 30
      }
    },
    {
      "bs": {
        "y": 2069,
        "m": 5,
        "d": 15
      },
      "ad": {
        "y": 2012,
        "m": 8,
        "d": 31
      }
    },
    {
      "bs": {
        "y": 2069,
        "m": 6,
        "d": 15
      },
      "ad": {
        "y": 2012,
        "m": 10,
        "d": 1
      }
    },
    {
      "bs": {
        "y": 2069,
        "m": 7,
        "d": 15
      },
      "ad": {
        "y": 2012,
        "m": 10,
        "d": 31
      }
    },
    {
      "bs": {
        "y": 2069,
        "m": 8,
        "d": 15
      },
      "ad": {
        "y": 2012,
        "m": 11,
        "d": 30
      }
    },
    {
      "bs": {
        "y": 2069,
        "m": 9,
        "d": 15
      },
      "ad": {
        "y": 2012,
        "m": 12,
        "d": 30
      }
    },
    {
      "bs": {
        "y": 2069,
        "m": 10,
        "d": 15
      },
      "ad": {
        "y": 2013,
        "m": 1,
        "d": 28
      }
    },
    {
      "bs": {
        "y": 2069,
        "m": 11,
        "d": 15
      },
      "ad": {
        "y": 2013,
        "m": 2,
        "d": 26
      }
    },
    {
      "bs": {
        "y": 2069,
        "m": 12,
        "d": 15
      },
      "ad": {
        "y": 2013,
        "m": 3,
        "d": 28
      }
    },
    {
      "bs": {
        "y": 2070,
        "m": 1,
        "d": 15
      },
      "ad": {
        "y": 2013,
        "m": 4,
        "d": 28
      }
    },
    {
      "bs": {
        "y": 2070,
        "m": 2,
        "d": 15
      },
      "ad": {
        "y": 2013,
        "m": 5,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2070,
        "m": 3,
        "d": 15
      },
      "ad": {
        "y": 2013,
        "m": 6,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2070,
        "m": 4,
        "d": 15
      },
      "ad": {
        "y": 2013,
        "m": 7,
        "d": 30
      }
    },
    {
      "bs": {
        "y": 2070,
        "m": 5,
        "d": 15
      },
      "ad": {
        "y": 2013,
        "m": 8,
        "d": 31
      }
    },
    {
      "bs": {
        "y": 2070,
        "m": 6,
        "d": 15
      },
      "ad": {
        "y": 2013,
        "m": 10,
        "d": 1
      }
    },
    {
      "bs": {
        "y": 2070,
        "m": 7,
        "d": 15
      },
      "ad": {
        "y": 2013,
        "m": 11,
        "d": 1
      }
    },
    {
      "bs": {
        "y": 2070,
        "m": 8,
        "d": 15
      },
      "ad": {
        "y": 2013,
        "m": 11,
        "d": 30
      }
    },
    {
      "bs": {
        "y": 2070,
        "m": 9,
        "d": 15
      },
      "ad": {
        "y": 2013,
        "m": 12,
        "d": 30
      }
    },
    {
      "bs": {
        "y": 2070,
        "m": 10,
        "d": 15
      },
      "ad": {
        "y": 2014,
        "m": 1,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2070,
        "m": 11,
        "d": 15
      },
      "ad": {
        "y": 2014,
        "m": 2,
        "d": 27
      }
    },
    {
      "bs": {
        "y": 2070,
        "m": 12,
        "d": 15
      },
      "ad": {
        "y": 2014,
        "m": 3,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2071,
        "m": 1,
        "d": 15
      },
      "ad": {
        "y": 2014,
        "m": 4,
        "d": 28
      }
    },
    {
      "bs": {
        "y": 2071,
        "m": 2,
        "d": 15
      },
      "ad": {
        "y": 2014,
        "m": 5,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2071,
        "m": 3,
        "d": 15
      },
      "ad": {
        "y": 2014,
        "m": 6,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2071,
        "m": 4,
        "d": 15
      },
      "ad": {
        "y": 2014,
        "m": 7,
        "d": 31
      }
    },
    {
      "bs": {
        "y": 2071,
        "m": 5,
        "d": 15
      },
      "ad": {
        "y": 2014,
        "m": 8,
        "d": 31
      }
    },
    {
      "bs": {
        "y": 2071,
        "m": 6,
        "d": 15
      },
      "ad": {
        "y": 2014,
        "m": 10,
        "d": 1
      }
    },
    {
      "bs": {
        "y": 2071,
        "m": 7,
        "d": 15
      },
      "ad": {
        "y": 2014,
        "m": 11,
        "d": 1
      }
    },
    {
      "bs": {
        "y": 2071,
        "m": 8,
        "d": 15
      },
      "ad": {
        "y": 2014,
        "m": 12,
        "d": 1
      }
    },
    {
      "bs": {
        "y": 2071,
        "m": 9,
        "d": 15
      },
      "ad": {
        "y": 2014,
        "m": 12,
        "d": 30
      }
    },
    {
      "bs": {
        "y": 2071,
        "m": 10,
        "d": 15
      },
      "ad": {
        "y": 2015,
        "m": 1,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2071,
        "m": 11,
        "d": 15
      },
      "ad": {
        "y": 2015,
        "m": 2,
        "d": 27
      }
    },
    {
      "bs": {
        "y": 2071,
        "m": 12,
        "d": 15
      },
      "ad": {
        "y": 2015,
        "m": 3,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2072,
        "m": 1,
        "d": 15
      },
      "ad": {
        "y": 2015,
        "m": 4,
        "d": 28
      }
    },
    {
      "bs": {
        "y": 2072,
        "m": 2,
        "d": 15
      },
      "ad": {
        "y": 2015,
        "m": 5,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2072,
        "m": 3,
        "d": 15
      },
      "ad": {
        "y": 2015,
        "m": 6,
        "d": 30
      }
    },
    {
      "bs": {
        "y": 2072,
        "m": 4,
        "d": 15
      },
      "ad": {
        "y": 2015,
        "m": 7,
        "d": 31
      }
    },
    {
      "bs": {
        "y": 2072,
        "m": 5,
        "d": 15
      },
      "ad": {
        "y": 2015,
        "m": 9,
        "d": 1
      }
    },
    {
      "bs": {
        "y": 2072,
        "m": 6,
        "d": 15
      },
      "ad": {
        "y": 2015,
        "m": 10,
        "d": 2
      }
    },
    {
      "bs": {
        "y": 2072,
        "m": 7,
        "d": 15
      },
      "ad": {
        "y": 2015,
        "m": 11,
        "d": 1
      }
    },
    {
      "bs": {
        "y": 2072,
        "m": 8,
        "d": 15
      },
      "ad": {
        "y": 2015,
        "m": 12,
        "d": 1
      }
    },
    {
      "bs": {
        "y": 2072,
        "m": 9,
        "d": 15
      },
      "ad": {
        "y": 2015,
        "m": 12,
        "d": 30
      }
    },
    {
      "bs": {
        "y": 2072,
        "m": 10,
        "d": 15
      },
      "ad": {
        "y": 2016,
        "m": 1,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2072,
        "m": 11,
        "d": 15
      },
      "ad": {
        "y": 2016,
        "m": 2,
        "d": 27
      }
    },
    {
      "bs": {
        "y": 2072,
        "m": 12,
        "d": 15
      },
      "ad": {
        "y": 2016,
        "m": 3,
        "d": 28
      }
    },
    {
      "bs": {
        "y": 2073,
        "m": 1,
        "d": 15
      },
      "ad": {
        "y": 2016,
        "m": 4,
        "d": 27
      }
    },
    {
      "bs": {
        "y": 2073,
        "m": 2,
        "d": 15
      },
      "ad": {
        "y": 2016,
        "m": 5,
        "d": 28
      }
    },
    {
      "bs": {
        "y": 2073,
        "m": 3,
        "d": 15
      },
      "ad": {
        "y": 2016,
        "m": 6,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2073,
        "m": 4,
        "d": 15
      },
      "ad": {
        "y": 2016,
        "m": 7,
        "d": 30
      }
    },
    {
      "bs": {
        "y": 2073,
        "m": 5,
        "d": 15
      },
      "ad": {
        "y": 2016,
        "m": 8,
        "d": 31
      }
    },
    {
      "bs": {
        "y": 2073,
        "m": 6,
        "d": 15
      },
      "ad": {
        "y": 2016,
        "m": 10,
        "d": 1
      }
    },
    {
      "bs": {
        "y": 2073,
        "m": 7,
        "d": 15
      },
      "ad": {
        "y": 2016,
        "m": 10,
        "d": 31
      }
    },
    {
      "bs": {
        "y": 2073,
        "m": 8,
        "d": 15
      },
      "ad": {
        "y": 2016,
        "m": 11,
        "d": 30
      }
    },
    {
      "bs": {
        "y": 2073,
        "m": 9,
        "d": 15
      },
      "ad": {
        "y": 2016,
        "m": 12,
        "d": 30
      }
    },
    {
      "bs": {
        "y": 2073,
        "m": 10,
        "d": 15
      },
      "ad": {
        "y": 2017,
        "m": 1,
        "d": 28
      }
    },
    {
      "bs": {
        "y": 2073,
        "m": 11,
        "d": 15
      },
      "ad": {
        "y": 2017,
        "m": 2,
        "d": 26
      }
    },
    {
      "bs": {
        "y": 2073,
        "m": 12,
        "d": 15
      },
      "ad": {
        "y": 2017,
        "m": 3,
        "d": 28
      }
    },
    {
      "bs": {
        "y": 2074,
        "m": 1,
        "d": 15
      },
      "ad": {
        "y": 2017,
        "m": 4,
        "d": 28
      }
    },
    {
      "bs": {
        "y": 2074,
        "m": 2,
        "d": 15
      },
      "ad": {
        "y": 2017,
        "m": 5,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2074,
        "m": 3,
        "d": 15
      },
      "ad": {
        "y": 2017,
        "m": 6,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2074,
        "m": 4,
        "d": 15
      },
      "ad": {
        "y": 2017,
        "m": 7,
        "d": 30
      }
    },
    {
      "bs": {
        "y": 2074,
        "m": 5,
        "d": 15
      },
      "ad": {
        "y": 2017,
        "m": 8,
        "d": 31
      }
    },
    {
      "bs": {
        "y": 2074,
        "m": 6,
        "d": 15
      },
      "ad": {
        "y": 2017,
        "m": 10,
        "d": 1
      }
    },
    {
      "bs": {
        "y": 2074,
        "m": 7,
        "d": 15
      },
      "ad": {
        "y": 2017,
        "m": 11,
        "d": 1
      }
    },
    {
      "bs": {
        "y": 2074,
        "m": 8,
        "d": 15
      },
      "ad": {
        "y": 2017,
        "m": 12,
        "d": 1
      }
    },
    {
      "bs": {
        "y": 2074,
        "m": 9,
        "d": 15
      },
      "ad": {
        "y": 2017,
        "m": 12,
        "d": 30
      }
    },
    {
      "bs": {
        "y": 2074,
        "m": 10,
        "d": 15
      },
      "ad": {
        "y": 2018,
        "m": 1,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2074,
        "m": 11,
        "d": 15
      },
      "ad": {
        "y": 2018,
        "m": 2,
        "d": 27
      }
    },
    {
      "bs": {
        "y": 2074,
        "m": 12,
        "d": 15
      },
      "ad": {
        "y": 2018,
        "m": 3,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2075,
        "m": 1,
        "d": 15
      },
      "ad": {
        "y": 2018,
        "m": 4,
        "d": 28
      }
    },
    {
      "bs": {
        "y": 2075,
        "m": 2,
        "d": 15
      },
      "ad": {
        "y": 2018,
        "m": 5,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2075,
        "m": 3,
        "d": 15
      },
      "ad": {
        "y": 2018,
        "m": 6,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2075,
        "m": 4,
        "d": 15
      },
      "ad": {
        "y": 2018,
        "m": 7,
        "d": 31
      }
    },
    {
      "bs": {
        "y": 2075,
        "m": 5,
        "d": 15
      },
      "ad": {
        "y": 2018,
        "m": 8,
        "d": 31
      }
    },
    {
      "bs": {
        "y": 2075,
        "m": 6,
        "d": 15
      },
      "ad": {
        "y": 2018,
        "m": 10,
        "d": 1
      }
    },
    {
      "bs": {
        "y": 2075,
        "m": 7,
        "d": 15
      },
      "ad": {
        "y": 2018,
        "m": 11,
        "d": 1
      }
    },
    {
      "bs": {
        "y": 2075,
        "m": 8,
        "d": 15
      },
      "ad": {
        "y": 2018,
        "m": 12,
        "d": 1
      }
    },
    {
      "bs": {
        "y": 2075,
        "m": 9,
        "d": 15
      },
      "ad": {
        "y": 2018,
        "m": 12,
        "d": 30
      }
    },
    {
      "bs": {
        "y": 2075,
        "m": 10,
        "d": 15
      },
      "ad": {
        "y": 2019,
        "m": 1,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2075,
        "m": 11,
        "d": 15
      },
      "ad": {
        "y": 2019,
        "m": 2,
        "d": 27
      }
    },
    {
      "bs": {
        "y": 2075,
        "m": 12,
        "d": 15
      },
      "ad": {
        "y": 2019,
        "m": 3,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2076,
        "m": 1,
        "d": 15
      },
      "ad": {
        "y": 2019,
        "m": 4,
        "d": 28
      }
    },
    {
      "bs": {
        "y": 2076,
        "m": 2,
        "d": 15
      },
      "ad": {
        "y": 2019,
        "m": 5,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2076,
        "m": 3,
        "d": 15
      },
      "ad": {
        "y": 2019,
        "m": 6,
        "d": 30
      }
    },
    {
      "bs": {
        "y": 2076,
        "m": 4,
        "d": 15
      },
      "ad": {
        "y": 2019,
        "m": 7,
        "d": 31
      }
    },
    {
      "bs": {
        "y": 2076,
        "m": 5,
        "d": 15
      },
      "ad": {
        "y": 2019,
        "m": 9,
        "d": 1
      }
    },
    {
      "bs": {
        "y": 2076,
        "m": 6,
        "d": 15
      },
      "ad": {
        "y": 2019,
        "m": 10,
        "d": 2
      }
    },
    {
      "bs": {
        "y": 2076,
        "m": 7,
        "d": 15
      },
      "ad": {
        "y": 2019,
        "m": 11,
        "d": 1
      }
    },
    {
      "bs": {
        "y": 2076,
        "m": 8,
        "d": 15
      },
      "ad": {
        "y": 2019,
        "m": 12,
        "d": 1
      }
    },
    {
      "bs": {
        "y": 2076,
        "m": 9,
        "d": 15
      },
      "ad": {
        "y": 2019,
        "m": 12,
        "d": 31
      }
    },
    {
      "bs": {
        "y": 2076,
        "m": 10,
        "d": 15
      },
      "ad": {
        "y": 2020,
        "m": 1,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2076,
        "m": 11,
        "d": 15
      },
      "ad": {
        "y": 2020,
        "m": 2,
        "d": 27
      }
    },
    {
      "bs": {
        "y": 2076,
        "m": 12,
        "d": 15
      },
      "ad": {
        "y": 2020,
        "m": 3,
        "d": 28
      }
    },
    {
      "bs": {
        "y": 2077,
        "m": 1,
        "d": 15
      },
      "ad": {
        "y": 2020,
        "m": 4,
        "d": 27
      }
    },
    {
      "bs": {
        "y": 2077,
        "m": 2,
        "d": 15
      },
      "ad": {
        "y": 2020,
        "m": 5,
        "d": 28
      }
    },
    {
      "bs": {
        "y": 2077,
        "m": 3,
        "d": 15
      },
      "ad": {
        "y": 2020,
        "m": 6,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2077,
        "m": 4,
        "d": 15
      },
      "ad": {
        "y": 2020,
        "m": 7,
        "d": 30
      }
    },
    {
      "bs": {
        "y": 2077,
        "m": 5,
        "d": 15
      },
      "ad": {
        "y": 2020,
        "m": 8,
        "d": 31
      }
    },
    {
      "bs": {
        "y": 2077,
        "m": 6,
        "d": 15
      },
      "ad": {
        "y": 2020,
        "m": 10,
        "d": 1
      }
    },
    {
      "bs": {
        "y": 2077,
        "m": 7,
        "d": 15
      },
      "ad": {
        "y": 2020,
        "m": 10,
        "d": 31
      }
    },
    {
      "bs": {
        "y": 2077,
        "m": 8,
        "d": 15
      },
      "ad": {
        "y": 2020,
        "m": 11,
        "d": 30
      }
    },
    {
      "bs": {
        "y": 2077,
        "m": 9,
        "d": 15
      },
      "ad": {
        "y": 2020,
        "m": 12,
        "d": 30
      }
    },
    {
      "bs": {
        "y": 2077,
        "m": 10,
        "d": 15
      },
      "ad": {
        "y": 2021,
        "m": 1,
        "d": 28
      }
    },
    {
      "bs": {
        "y": 2077,
        "m": 11,
        "d": 15
      },
      "ad": {
        "y": 2021,
        "m": 2,
        "d": 27
      }
    },
    {
      "bs": {
        "y": 2077,
        "m": 12,
        "d": 15
      },
      "ad": {
        "y": 2021,
        "m": 3,
        "d": 28
      }
    },
    {
      "bs": {
        "y": 2078,
        "m": 1,
        "d": 15
      },
      "ad": {
        "y": 2021,
        "m": 4,
        "d": 28
      }
    },
    {
      "bs": {
        "y": 2078,
        "m": 2,
        "d": 15
      },
      "ad": {
        "y": 2021,
        "m": 5,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2078,
        "m": 3,
        "d": 15
      },
      "ad": {
        "y": 2021,
        "m": 6,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2078,
        "m": 4,
        "d": 15
      },
      "ad": {
        "y": 2021,
        "m": 7,
        "d": 30
      }
    },
    {
      "bs": {
        "y": 2078,
        "m": 5,
        "d": 15
      },
      "ad": {
        "y": 2021,
        "m": 8,
        "d": 31
      }
    },
    {
      "bs": {
        "y": 2078,
        "m": 6,
        "d": 15
      },
      "ad": {
        "y": 2021,
        "m": 10,
        "d": 1
      }
    },
    {
      "bs": {
        "y": 2078,
        "m": 7,
        "d": 15
      },
      "ad": {
        "y": 2021,
        "m": 11,
        "d": 1
      }
    },
    {
      "bs": {
        "y": 2078,
        "m": 8,
        "d": 15
      },
      "ad": {
        "y": 2021,
        "m": 12,
        "d": 1
      }
    },
    {
      "bs": {
        "y": 2078,
        "m": 9,
        "d": 15
      },
      "ad": {
        "y": 2021,
        "m": 12,
        "d": 30
      }
    },
    {
      "bs": {
        "y": 2078,
        "m": 10,
        "d": 15
      },
      "ad": {
        "y": 2022,
        "m": 1,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2078,
        "m": 11,
        "d": 15
      },
      "ad": {
        "y": 2022,
        "m": 2,
        "d": 27
      }
    },
    {
      "bs": {
        "y": 2078,
        "m": 12,
        "d": 15
      },
      "ad": {
        "y": 2022,
        "m": 3,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2079,
        "m": 1,
        "d": 15
      },
      "ad": {
        "y": 2022,
        "m": 4,
        "d": 28
      }
    },
    {
      "bs": {
        "y": 2079,
        "m": 2,
        "d": 15
      },
      "ad": {
        "y": 2022,
        "m": 5,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2079,
        "m": 3,
        "d": 15
      },
      "ad": {
        "y": 2022,
        "m": 6,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2079,
        "m": 4,
        "d": 15
      },
      "ad": {
        "y": 2022,
        "m": 7,
        "d": 31
      }
    },
    {
      "bs": {
        "y": 2079,
        "m": 5,
        "d": 15
      },
      "ad": {
        "y": 2022,
        "m": 8,
        "d": 31
      }
    },
    {
      "bs": {
        "y": 2079,
        "m": 6,
        "d": 15
      },
      "ad": {
        "y": 2022,
        "m": 10,
        "d": 1
      }
    },
    {
      "bs": {
        "y": 2079,
        "m": 7,
        "d": 15
      },
      "ad": {
        "y": 2022,
        "m": 11,
        "d": 1
      }
    },
    {
      "bs": {
        "y": 2079,
        "m": 8,
        "d": 15
      },
      "ad": {
        "y": 2022,
        "m": 12,
        "d": 1
      }
    },
    {
      "bs": {
        "y": 2079,
        "m": 9,
        "d": 15
      },
      "ad": {
        "y": 2022,
        "m": 12,
        "d": 30
      }
    },
    {
      "bs": {
        "y": 2079,
        "m": 10,
        "d": 15
      },
      "ad": {
        "y": 2023,
        "m": 1,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2079,
        "m": 11,
        "d": 15
      },
      "ad": {
        "y": 2023,
        "m": 2,
        "d": 27
      }
    },
    {
      "bs": {
        "y": 2079,
        "m": 12,
        "d": 15
      },
      "ad": {
        "y": 2023,
        "m": 3,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2080,
        "m": 1,
        "d": 15
      },
      "ad": {
        "y": 2023,
        "m": 4,
        "d": 28
      }
    },
    {
      "bs": {
        "y": 2080,
        "m": 2,
        "d": 15
      },
      "ad": {
        "y": 2023,
        "m": 5,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2080,
        "m": 3,
        "d": 15
      },
      "ad": {
        "y": 2023,
        "m": 6,
        "d": 30
      }
    },
    {
      "bs": {
        "y": 2080,
        "m": 4,
        "d": 15
      },
      "ad": {
        "y": 2023,
        "m": 7,
        "d": 31
      }
    },
    {
      "bs": {
        "y": 2080,
        "m": 5,
        "d": 15
      },
      "ad": {
        "y": 2023,
        "m": 9,
        "d": 1
      }
    },
    {
      "bs": {
        "y": 2080,
        "m": 6,
        "d": 15
      },
      "ad": {
        "y": 2023,
        "m": 10,
        "d": 2
      }
    },
    {
      "bs": {
        "y": 2080,
        "m": 7,
        "d": 15
      },
      "ad": {
        "y": 2023,
        "m": 11,
        "d": 1
      }
    },
    {
      "bs": {
        "y": 2080,
        "m": 8,
        "d": 15
      },
      "ad": {
        "y": 2023,
        "m": 12,
        "d": 1
      }
    },
    {
      "bs": {
        "y": 2080,
        "m": 9,
        "d": 15
      },
      "ad": {
        "y": 2023,
        "m": 12,
        "d": 31
      }
    },
    {
      "bs": {
        "y": 2080,
        "m": 10,
        "d": 15
      },
      "ad": {
        "y": 2024,
        "m": 1,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2080,
        "m": 11,
        "d": 15
      },
      "ad": {
        "y": 2024,
        "m": 2,
        "d": 27
      }
    },
    {
      "bs": {
        "y": 2080,
        "m": 12,
        "d": 15
      },
      "ad": {
        "y": 2024,
        "m": 3,
        "d": 28
      }
    },
    {
      "bs": {
        "y": 2081,
        "m": 1,
        "d": 15
      },
      "ad": {
        "y": 2024,
        "m": 4,
        "d": 27
      }
    },
    {
      "bs": {
        "y": 2081,
        "m": 2,
        "d": 15
      },
      "ad": {
        "y": 2024,
        "m": 5,
        "d": 28
      }
    },
    {
      "bs": {
        "y": 2081,
        "m": 3,
        "d": 15
      },
      "ad": {
        "y": 2024,
        "m": 6,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2081,
        "m": 4,
        "d": 15
      },
      "ad": {
        "y": 2024,
        "m": 7,
        "d": 30
      }
    },
    {
      "bs": {
        "y": 2081,
        "m": 5,
        "d": 15
      },
      "ad": {
        "y": 2024,
        "m": 8,
        "d": 31
      }
    },
    {
      "bs": {
        "y": 2081,
        "m": 6,
        "d": 15
      },
      "ad": {
        "y": 2024,
        "m": 10,
        "d": 1
      }
    },
    {
      "bs": {
        "y": 2081,
        "m": 7,
        "d": 15
      },
      "ad": {
        "y": 2024,
        "m": 10,
        "d": 31
      }
    },
    {
      "bs": {
        "y": 2081,
        "m": 8,
        "d": 15
      },
      "ad": {
        "y": 2024,
        "m": 11,
        "d": 30
      }
    },
    {
      "bs": {
        "y": 2081,
        "m": 9,
        "d": 15
      },
      "ad": {
        "y": 2024,
        "m": 12,
        "d": 30
      }
    },
    {
      "bs": {
        "y": 2081,
        "m": 10,
        "d": 15
      },
      "ad": {
        "y": 2025,
        "m": 1,
        "d": 28
      }
    },
    {
      "bs": {
        "y": 2081,
        "m": 11,
        "d": 15
      },
      "ad": {
        "y": 2025,
        "m": 2,
        "d": 27
      }
    },
    {
      "bs": {
        "y": 2081,
        "m": 12,
        "d": 15
      },
      "ad": {
        "y": 2025,
        "m": 3,
        "d": 28
      }
    },
    {
      "bs": {
        "y": 2082,
        "m": 1,
        "d": 15
      },
      "ad": {
        "y": 2025,
        "m": 4,
        "d": 28
      }
    },
    {
      "bs": {
        "y": 2082,
        "m": 2,
        "d": 15
      },
      "ad": {
        "y": 2025,
        "m": 5,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2082,
        "m": 3,
        "d": 15
      },
      "ad": {
        "y": 2025,
        "m": 6,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2082,
        "m": 4,
        "d": 15
      },
      "ad": {
        "y": 2025,
        "m": 7,
        "d": 31
      }
    },
    {
      "bs": {
        "y": 2082,
        "m": 5,
        "d": 15
      },
      "ad": {
        "y": 2025,
        "m": 8,
        "d": 31
      }
    },
    {
      "bs": {
        "y": 2082,
        "m": 6,
        "d": 15
      },
      "ad": {
        "y": 2025,
        "m": 10,
        "d": 1
      }
    },
    {
      "bs": {
        "y": 2082,
        "m": 7,
        "d": 15
      },
      "ad": {
        "y": 2025,
        "m": 11,
        "d": 1
      }
    },
    {
      "bs": {
        "y": 2082,
        "m": 8,
        "d": 15
      },
      "ad": {
        "y": 2025,
        "m": 12,
        "d": 1
      }
    },
    {
      "bs": {
        "y": 2082,
        "m": 9,
        "d": 15
      },
      "ad": {
        "y": 2025,
        "m": 12,
        "d": 30
      }
    },
    {
      "bs": {
        "y": 2082,
        "m": 10,
        "d": 15
      },
      "ad": {
        "y": 2026,
        "m": 1,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2082,
        "m": 11,
        "d": 15
      },
      "ad": {
        "y": 2026,
        "m": 2,
        "d": 27
      }
    },
    {
      "bs": {
        "y": 2082,
        "m": 12,
        "d": 15
      },
      "ad": {
        "y": 2026,
        "m": 3,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2083,
        "m": 1,
        "d": 15
      },
      "ad": {
        "y": 2026,
        "m": 4,
        "d": 28
      }
    },
    {
      "bs": {
        "y": 2083,
        "m": 2,
        "d": 15
      },
      "ad": {
        "y": 2026,
        "m": 5,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2083,
        "m": 3,
        "d": 15
      },
      "ad": {
        "y": 2026,
        "m": 6,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2083,
        "m": 4,
        "d": 15
      },
      "ad": {
        "y": 2026,
        "m": 7,
        "d": 31
      }
    },
    {
      "bs": {
        "y": 2083,
        "m": 5,
        "d": 15
      },
      "ad": {
        "y": 2026,
        "m": 8,
        "d": 31
      }
    },
    {
      "bs": {
        "y": 2083,
        "m": 6,
        "d": 15
      },
      "ad": {
        "y": 2026,
        "m": 10,
        "d": 1
      }
    },
    {
      "bs": {
        "y": 2083,
        "m": 7,
        "d": 15
      },
      "ad": {
        "y": 2026,
        "m": 11,
        "d": 1
      }
    },
    {
      "bs": {
        "y": 2083,
        "m": 8,
        "d": 15
      },
      "ad": {
        "y": 2026,
        "m": 12,
        "d": 1
      }
    },
    {
      "bs": {
        "y": 2083,
        "m": 9,
        "d": 15
      },
      "ad": {
        "y": 2026,
        "m": 12,
        "d": 30
      }
    },
    {
      "bs": {
        "y": 2083,
        "m": 10,
        "d": 15
      },
      "ad": {
        "y": 2027,
        "m": 1,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2083,
        "m": 11,
        "d": 15
      },
      "ad": {
        "y": 2027,
        "m": 2,
        "d": 27
      }
    },
    {
      "bs": {
        "y": 2083,
        "m": 12,
        "d": 15
      },
      "ad": {
        "y": 2027,
        "m": 3,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2084,
        "m": 1,
        "d": 15
      },
      "ad": {
        "y": 2027,
        "m": 4,
        "d": 28
      }
    },
    {
      "bs": {
        "y": 2084,
        "m": 2,
        "d": 15
      },
      "ad": {
        "y": 2027,
        "m": 5,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2084,
        "m": 3,
        "d": 15
      },
      "ad": {
        "y": 2027,
        "m": 6,
        "d": 30
      }
    },
    {
      "bs": {
        "y": 2084,
        "m": 4,
        "d": 15
      },
      "ad": {
        "y": 2027,
        "m": 7,
        "d": 31
      }
    },
    {
      "bs": {
        "y": 2084,
        "m": 5,
        "d": 15
      },
      "ad": {
        "y": 2027,
        "m": 9,
        "d": 1
      }
    },
    {
      "bs": {
        "y": 2084,
        "m": 6,
        "d": 15
      },
      "ad": {
        "y": 2027,
        "m": 10,
        "d": 2
      }
    },
    {
      "bs": {
        "y": 2084,
        "m": 7,
        "d": 15
      },
      "ad": {
        "y": 2027,
        "m": 11,
        "d": 1
      }
    },
    {
      "bs": {
        "y": 2084,
        "m": 8,
        "d": 15
      },
      "ad": {
        "y": 2027,
        "m": 12,
        "d": 1
      }
    },
    {
      "bs": {
        "y": 2084,
        "m": 9,
        "d": 15
      },
      "ad": {
        "y": 2027,
        "m": 12,
        "d": 31
      }
    },
    {
      "bs": {
        "y": 2084,
        "m": 10,
        "d": 15
      },
      "ad": {
        "y": 2028,
        "m": 1,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2084,
        "m": 11,
        "d": 15
      },
      "ad": {
        "y": 2028,
        "m": 2,
        "d": 27
      }
    },
    {
      "bs": {
        "y": 2084,
        "m": 12,
        "d": 15
      },
      "ad": {
        "y": 2028,
        "m": 3,
        "d": 28
      }
    },
    {
      "bs": {
        "y": 2085,
        "m": 1,
        "d": 15
      },
      "ad": {
        "y": 2028,
        "m": 4,
        "d": 28
      }
    },
    {
      "bs": {
        "y": 2085,
        "m": 2,
        "d": 15
      },
      "ad": {
        "y": 2028,
        "m": 5,
        "d": 28
      }
    },
    {
      "bs": {
        "y": 2085,
        "m": 3,
        "d": 15
      },
      "ad": {
        "y": 2028,
        "m": 6,
        "d": 29
      }
    },
    {
      "bs": {
        "y": 2085,
        "m": 4,
        "d": 15
      },
      "ad": {
        "y": 2028,
        "m": 7,
        "d": 30
      }
    },
    {
      "bs": {
        "y": 2085,
        "m": 5,
        "d": 15
      },
      "ad": {
        "y": 2028,
        "m": 8,
        "d": 31
      }
    },
    {
      "bs": {
        "y": 2085,
        "m": 6,
        "d": 15
      },
      "ad": {
        "y": 2028,
        "m": 10,
        "d": 1
      }
    },
    {
      "bs": {
        "y": 2085,
        "m": 7,
        "d": 15
      },
      "ad": {
        "y": 2028,
        "m": 10,
        "d": 31
      }
    },
    {
      "bs": {
        "y": 2085,
        "m": 8,
        "d": 15
      },
      "ad": {
        "y": 2028,
        "m": 11,
        "d": 30
      }
    },
    {
      "bs": {
        "y": 2085,
        "m": 9,
        "d": 15
      },
      "ad": {
        "y": 2028,
        "m": 12,
        "d": 30
      }
    },
    {
      "bs": {
        "y": 2085,
        "m": 10,
        "d": 15
      },
      "ad": {
        "y": 2029,
        "m": 1,
        "d": 28
      }
    },
    {
      "bs": {
        "y": 2085,
        "m": 11,
        "d": 15
      },
      "ad": {
        "y": 2029,
        "m": 2,
        "d": 27
      }
    },
    {
      "bs": {
        "y": 2085,
        "m": 12,
        "d": 15
      },
      "ad": {
        "y": 2029,
        "m": 3,
        "d": 28
      }
    }
  ];

  var passCount = 0;
  var failCount = 0;

  tests.forEach(function (test, i) {
    // Convert BS to AD
    var ad = window.nepaliDateUtils.bsToAd(test.bs.y, test.bs.m, test.bs.d);
    var adStr = ad.adYear + '-' + String(ad.adMonth).padStart(2, '0') + '-' + String(ad.adDay).padStart(2, '0');
    var expectedAd = test.ad.y + '-' + String(test.ad.m).padStart(2, '0') + '-' + String(test.ad.d).padStart(2, '0');

    // Convert AD to BS
    var bs = window.nepaliDateUtils.adToBs(test.ad.y, test.ad.m, test.ad.d);
    var bsStr = bs.bsYear + '-' + String(bs.bsMonth).padStart(2, '0') + '-' + String(bs.bsDay).padStart(2, '0');
    var expectedBs = test.bs.y + '-' + String(test.bs.m).padStart(2, '0') + '-' + String(test.bs.d).padStart(2, '0');

    // Compare and log results for BS to AD conversion
    var bsToAdPass = adStr === expectedAd;
    var adToBsPass = bsStr === expectedBs;

    if (bsToAdPass && adToBsPass) {
      passCount++;
      console.log(`Test ${i + 1} passed!`);
      console.log(`  BS to AD conversion: ${test.bs.y}-${String(test.bs.m).padStart(2, '0')}-${String(test.bs.d).padStart(2, '0')} → ${adStr} (expected: ${expectedAd})`);
      console.log(`  AD to BS conversion: ${test.ad.y}-${String(test.ad.m).padStart(2, '0')}-${String(test.ad.d).padStart(2, '0')} → ${bsStr} (expected: ${expectedBs})`);
    } else {
      failCount++;
      if (!bsToAdPass) {
        console.log(`Test ${i + 1} BS→AD failed: got ${adStr}, expected ${expectedAd}`);
      }
      if (!adToBsPass) {
        console.log(`Test ${i + 1} AD→BS failed: got ${bsStr}, expected ${expectedBs}`);
      }
      console.log(`Test ${i + 1} failed.`);
      console.log(`  BS to AD conversion: ${test.bs.y}-${String(test.bs.m).padStart(2, '0')}-${String(test.bs.d).padStart(2, '0')} → ${adStr} (expected: ${expectedAd})`);
      console.log(`  AD to BS conversion: ${test.ad.y}-${String(test.ad.m).padStart(2, '0')}-${String(test.ad.d).padStart(2, '0')} → ${bsStr} (expected: ${expectedBs})`);
    }
  });

  console.log(`\nTotal Passed: ${passCount}`);
  console.log(`Total Failed: ${failCount}`);
})();
