# Inspection - Team *T11* 
 
| Inspection | Details |
| ----- | ----- |
| Subject | *Atlas.js, lines 1-303* |
| Meeting | *04/08/2020, 4:00pm, Microsoft Teams* |
| Checklist | *reference, URL, style, "breaks", error reporting, bugs, messy code, code "health", code smells, naming, code cleanliness, duplicate code, complexity* |

### Roles

| Name | Preparation Time |
| ---- | ---- |
| Kellyn Dassler | 35 min |
| Kevin Schroeder | 30 min |

### Problems found

| file:line | problem | hi/med/low | who found | github#  |
| --- | --- | :---: | :---: | --- |
| input.js:13,14 | Using Document.getElementByID, makes it hard to test it | High | Jackie | #380 |
| Atlas.js:201 | this.setInput throws an error | High | Maddie | #392 | 
| Atlas.js:163-174 | does not report when an invalid file is given | Medium | Maddie | #382 |
| input.js:13-14 | Using Document.getElementByID | High | Maddie | #380 |
| Atlas.js.321 | loading outdated trip json breaks page | High | Kai | #381 |
| Atlas.js.61, 119-125 | Where Am I? button lacks functionality | Medium | Kellyn | #391 |
| Atlas.js.313-315,326-328| Duplicate code in changeStartDestination and reverse trip | Low | Kellyn | #383 |
| Atlas.js.233-253 | Code complexity--need to separate for code health | Low | Kellyn | #383 |
| Atlas.js.169| No error raised when non-JSON or non-CSV document loaded| Medium | Kellyn | #382 |
| Atlas.js: 312| If you try to load an old trip it breaks the UI| Medium | Jackie | #381 |
| Atlas.js.122 | Where Am I button doesn't work anymore | Medium | Kevin | #391 |
| Atlas.js.141,108-109, | key attribute should be more unique, div not needed | Low | Kevin | #393 |
| input.js.3-4,13-14 | Direct DOM manipulation | High | Kevin | #380 |
| Atlas.js.56 | Nothing to inform user that geolocation is disabled | Low | Kevin | #394 |
| Atlas.js.66 | Error in console when looking at itinerary when all distances are zero | Low | Kevin | #393 |
