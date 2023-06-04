### App Overview

This web application fetches currency exchange rates from Frankfurter API. Response data is then parsed and analyzed to solve arbitrage profit opportunities.

Frankfurter API tracks 33 world-recognized currencies published by the European Central Bank. According to the API documentation, exchange rates are updated daily around 4 PM central-eastern time.

Other application features include filtering, edit, and importing data in JSON files. Application scripts are trans-piled targeting the latest browsers. Internet Explorer is not supported.

Support import JSON files with a data structure like the following sample.

    {
      "USD": {
          "EUR": 0.986,
          "GBP": 0.657
      },
      "EUR": {
          "USD": 1.349,
          "GBP": 0.888
      },
      "GBP": {
          "USD": 1.521,
          "EUR": 1.126
      }
    }

### Screenshot 1

![screenshot 1](https://github.com/jinlin2001/portfolio/blob/main/public/arbit-1.png)

### Screenshot 2

![screenshot 2](https://github.com/jinlin2001/portfolio/blob/main/public/arbit-2.png)

