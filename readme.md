## Why Playwright?
* Auto-Waits
* Network Control: Intercepting a network request enables to send an unauthorized response and capture how the web page responds
* Codgen: record user actions

## Run tests

global test setup added to playwright config to only perform login once.   
      
```powershell
npx playwright test spotify --headed --project=chromium
```

## Test results
Open html report file with a web browser or execute the next command: `npx playwright show-report`

### Other reporters:
* Multiple report types can be generated at once by using comma separation on cli options.
* Options: 
  * `--reporter=line`               -> add report outputs to command line.
  * `--reporter=html`               -> Default. Generate an html and open the report on web browser. 
  * `--reporter=junit`              -> Interesting to integrate with CI/CD tools.
  * `--reporter=allure-playwright`  -> Seems to be the most complet report.


## Setup
Timeout fixed to 10s
screenshot on failure
Running test on chrome, firefox and webkit.
fullyParallel: false,

## Limitations
* Playwright doesn't come with the built-in support for BDD so we are going to use the help of Cucumber



## Playwright commands:

Runs the end-to-end tests:

    npx playwright test

Runs the end-to-end tests on headed mode:
    
    npx playwright test --headed

Runs the tests only on Desktop Chrome:
    
    npx playwright test --project=chromium

Runs the tests in a specific file.
  
    npx playwright test example

Runs the tests in debug mode.

    npx playwright test --debug

Auto generate tests with Codegen.
  
    npx playwright codegen

We suggest that you begin by typing:

    npx playwright test
