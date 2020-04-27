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
| Atlas.test.js | no test for loadfile | medium | Kai Griem |
| Atlas.test.js | no test for determineoldtrip | medium | Kai Griem |
| Atlas.test.js | no tets for getInput | medium | Kai Griem |
|  | | | | |
