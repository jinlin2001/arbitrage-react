### App Overview

This web app outputs the potential currency exchanges that has a profit. Exchange sequences are generated based on daily rates published by Frankfurter API.

Frankfurter API tracks 33 world known currency exchange rates published by the European Central Bank. According to the API documentation, exchange rates are updated daily around 4 PM Central Eastern Time.

Other app features include filtering data, editing data, importing and parsing data in file. App scripts are trans-piled targeting latest browsers. Internet Explorer is not supported.

Support importing and parsing file with data structure like the following sample.

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

Live app:  
[https://arbitrage-43861.firebaseapp.com/](https://arbitrage-43861.firebaseapp.com/)
