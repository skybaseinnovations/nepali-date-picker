# Nepali Date Picker

A modern Nepali date picker for web apps.

## CDN Usage (jsDelivr)

You can use the minified JS and CSS directly from jsDelivr CDN:

```html
<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/skybaseinnovations/nepali-date-picker@main/dist/datepicker.min.css">

<!-- JS -->
<script src="https://cdn.jsdelivr.net/gh/skybaseinnovations/nepali-date-picker@main/dist/datepicker.min.js"></script>
```

## Example

```html
<input type="text" id="nepali-date" />
<script>
  $(function() {
    $('#nepali-date').nepaliDatePicker();
  });
</script>
```

## Plugin Options

| Option              | Type     | Default                | Description                                                        |
|---------------------|----------|------------------------|--------------------------------------------------------------------|
| `dateFormat`        | string   | `'%D, %M %d, %y'`      | Date format string (see below for tokens)                          |
| `closeOnDateSelect` | boolean  | `true`                 | Whether to close the picker after selecting a date                 |
| `defaultDate`       | string   | `''`                   | Default date to show (in BS, formatted as per `dateFormat`)        |
| `minDate`           | string   | `null`                 | Minimum selectable date (in BS, formatted as per `dateFormat`)     |
| `maxDate`           | string   | `null`                 | Maximum selectable date (in BS, formatted as per `dateFormat`)     |
| `yearStart`         | number   | `2000`                 | Start year for year dropdown                                       |
| `yearEnd`           | number   | `2100`                 | End year for year dropdown                                         |
| `language`          | string   | `'en'`                 | `'en'` for English, `'np'` for Nepali                              |
| `fancyFont`         | boolean  | `true`                 | Use Rajdhani font for the calendar UI                              |

## Date Format Tokens

- `%D` — Day of week (e.g., Sunday, आइतबार)
- `%M` — Month name (e.g., Baisakh, बैशाख)
- `%d` — Day of month (e.g., 01, १)
- `%m` — Month number (e.g., 01, १)
- `%y` — Year (e.g., 2080, २०८०)

## Initialization Example

```js
$('#myInput').nepaliDatePicker({
  language: 'np',
  dateFormat: '%y-%m-%d',
  yearStart: 2070,
  yearEnd: 2090,
  minDate: '2070-01-01',
  maxDate: '2090-12-30',
  fancyFont: false,
  closeOnDateSelect: false
});
```

## Utility Functions

After including the script, you can use:

```js
// Convert AD to BS
window.nepaliDateUtils.adToBs(adYear, adMonth, adDay); // returns {bsYear, bsMonth, bsDay}

// Convert BS to AD
window.nepaliDateUtils.bsToAd(bsYear, bsMonth, bsDay); // returns {adYear, adMonth, adDay}
```

## Events

- `dateSelect` — Fired when a date is selected.
- `dateChange` — Fired when the date changes.
- `monthChange` — Fired when the month changes.
- `yearChange` — Fired when the year changes.
- `show` — Picker is shown.
- `close` — Picker is closed.

## Features
- English/Nepali language support
- Modern UI
- Accurate BS↔AD conversion
- Customizable

## TODO & Future
- **Range Picker**: Support for selecting a date range (start and end date).
- **Range Templates (Presets)**: Quick-select options like last 3 days, last 7 days, this month, etc.

## License
MIT

---

<sub>Made with ❤️ and a little bit of caffeine by <a href="https://skybase.com.np" target="_blank">Skybase Innovations</a>.<br>One of the many things we build so you don't have to.</sub> 