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
|  |  |

### Problems found

| file:line | problem | hi/med/low | who found | github#  |
| --- | --- | :---: | :---: | --- |
| input.js:13,14 | Using Document.getElementByID, makes it hard to test it | High | Jackie |  |
| Atlas.js:201 | this.setInput throws an error | High | Maddie | | 
| Atlas.js:163-174 | does not report when an invalid file is given | Medium | Maddie | |
| input.js:13-14 | Using Document.getElementByID | High | Maddie | |
| Atlas.js.321 | loading outdated trip json breaks page | High | Kai | |
| Atlas.js.61, 119-125 | Where Am I? button lacks functionality | Medium | Kellyn | |
| Atlas.js.313-315,326-328| Duplicate code in changeStartDestination and reverse trip | Low | Kellyn | |
| Atlas.js.233-253 | Code complexity--need to separate for code health | Low | Kellyn | |
| Atlas.js.169| No error raised when non-JSON or non-CSV document loaded| Medium | Kellyn | |
| Atlas.js: 312| If you try to load an old trip it breaks the UI| Medium | Jackie | |
