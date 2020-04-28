# Inspection - Team *T11* 
 
| Inspection | Details |
| ----- | ----- |
| Subject | *Atlas.test.js, AtalsLine.test.js, AtlasMarker.test.js, Itinerary.test.js--all lines for each file* |
| Meeting | *04/27/2020, 5pm, Teams Call* |
| Checklist | *errors, warnings, incorrect shallow vs full copy, unsuccessful tests/tests the wrong thing, duplication, tests missing from the file that should be added for better coverage, etc.* |

### Roles

| Name | Preparation Time |
| ---- | ---- |
| Kellyn Dassler | 30 min  |
| Kai Griem | 30 min |
| Kevin Schroeder | 30 min |
| Maddie Mihevc | 30 min |

### Problems found

| file:line | problem | hi/med/low | who found | github#  |
| --- | --- | :---: | :---: | --- |
| Atlas.test.js:44-54/Atlas.js:398-415 | testUpdateRoundTripDistance is not covering any lines in the associated method (updateRoundTripDistance) in Atlas--needs to be rewritten| hi | Kellyn Dassler | |
| Atlas.test.js:1-55 | warning for using react-dom.dev componentWillRecieveProps| med | Kellyn Dassler | |
| Atlas.test.js:1-55 | warning for using react-dom.dev componentWillRecieveProps| med | Kellyn Dassler | |
| Atlas.test.js:1-55 | Handlebars: runtime acces denied for "statements" property| med | Kellyn Dassler | |
| Atlas.test.js:1-55 | Handlebars: runtime acces denied for "branches" property| med | Kellyn Dassler | |
| Atlas.test.js:1-55 | Handlebars: runtime acces denied for "functions" property| med | Kellyn Dassler | |
| Atlas.test.js:1-55 | Handlebars: runtime acces denied for "lines" property| med | Kellyn Dassler | |
| Atlas.test.js:55/Atlas.js 106 | Need to add a test for onMapClick| med | Kellyn Dassler | |
| Atlas.test.js:55/Atlas.js 162-168 | Need to add a test for saving SVG, KML, JSON, CSV| med | Kellyn Dassler | |
| Atlas.test.js:55/Atlas.js 276-281 | Need to add a test for parseJSOn method| med | Kellyn Dassler | |
| Atlas.test.js | handlbar access denied warning | low | Kai Griem | |
| Atlas.test.js | no test for loadfile | medium | Kai Griem | |
| Atlas.test.js | Warning: componentWillReceiveProps renamed | low | Kai Griem | |
| Atlas.test.js | no test for determineoldtrip | medium | Kai Griem | |
| Atlas.test.js | no test for getInput | medium | Kai Griem | |
| Atlas.test.js:1-55 | Test Result warnings: handlebarsjs acess denied | low | Kevin Schroeder | |
| Atlas.test.js:1-55 | Test Result warnings: react-dom functions renamed, update Modal | low | Kevin Schroeder | |
| Atlas.test.js:1-55 | testUpdateRoundTripDistance should be finished | high | Kevin Schroeder | |
| Atlas.test.js:1-55 | Need testing for all rendering in Atlas.js | high | Kevin Schroeder | |
| Atlas.test.js:1-55 | Need testing for all functional code in Atlas.js | high | Kevin Schroeder | |
| Atlas.test.js:1-55 | Need testing for all state-changes in Atlas.js | high | Kevin Schroeder | |
| Atlas.test.js:1-55 | Need functions to mock server responses for Atlas.js testing | med | Kevin Schroeder | |
| Atlas.test.js:1-55 | Does not test to see what happens when invalid coordinates are provided | low |  Maddie Mihevc| |
| Atlas.test.js:1-55 | Need testing for all of the render methods | med | Maddie Mihevc | |
| Atlas.test.js:1-55 | Add testing to test loading an invalid file | med | Maddie Mihevc | |
| Atlas.test.js:1-55 | Need testing for reversing a trip | low | Maddie Mihevc | |

