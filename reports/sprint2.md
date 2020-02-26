# Sprint 2 - *t11* - *[hip, hip]*

## Goal

### What is the distance?
### Sprint Leader: *Kai Griem*

## Definition of Done

* The version in `server/pom.xml` is `<version>2.0</version>`.
* The Product Increment release for `v2.0` created on GitHub.
* The team's web application is deployed on the production server (`black-bottle.cs.colostate.edu`).
* The design document is updated (`design.md`).
* The completed metrics are captured below.
* The scrums completed during each lecture are captured below.
* The sprint review and restrospective are captured below.


## Policies

### Mobile First Design
* Design for mobile, tablet, laptop, desktop in that order.
* Use ReactStrap for a consistent user experience (no HTML, CSS, style, etc.).

### Clean Code
* Code Climate maintainability of A or B.
* Minimize code smells and duplication.

### Test Driven Development
* Write method headers, unit tests, and code in that order.
* Unit tests are fully automated.

### Processes
* Master is never broken. 
* All pull request builds and tests are successful on Travis-CI.
* All dependencies managed using Maven, npm, and WebPack.
* GitHub etiquette is followed always.


## Planned Epics

*Where Is*

We plan to create a service for the user to enter a coordinate and plot it on the map. This function should take an entered latitude longitude value or take one copy and pasted from the internet. If the given value is illegitimate the user should be notified in some way. This epic must be completed to proceed to the distance and map epics. 

*Support Protocol Standard v2*

We are reponsible for maintaining a standardized object format and client/server interaction. This mainly applies to server configuration and the distance object, allowing for standardized testing and grading. 

*Server Support*

We will display the server information on our webpage. This will be available through a clickable footer. We will need to complete this epic in order to comply with Support Protocol. 

*Distance*

The user should be able to enter two coordinate points on the map. We will calculate the distance between the points and present the data to the user. 

*Map*

This epic relates to the distance epic. We will scale the map to show both points plotted in the distance epic. We will illustrate the linear distance between these points with a visible line. 

## Metrics

| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | *6* | *count* |
| Tasks |  *21*   | *count* | 
| Story Points |  *15*  | *sum* | 

In the last sprint we completed 3 epics and put 2 epics on the icebox. However, two of these epics were completed relatively quickly. Sprint 2 will last roughly twice as long and we have 6 epics planned, each of which should take longer than the two simple epics from sprint1. We will aim to complete all 6 epics but by this estimate we might realistically complete 4-5 epics, giving us plenty to work on during the sprint. 


## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| *date* | *#task, ...* | *#task, ...* |  | 
| 2/12 | none | none | |
| 2/14 | 119, 121, 120 | 31, 118, 36 |  |
| 2/17 | 35, 36, 106, 128, 133, 118, 122, 31, 105 | 139, 47, 110, 107 |  |
| 2/19 | none| 139, 47, 110, 107 |  |
| 2/21 | 47 | 139, 110, 107, 109, 35 |  |
| 2/24 | 35, 151, 109 | 155, 110, 148, 115, 153 |  |
| 2/26 | 159, 115, 148, 160 | 116, 110 |  |


## Review

### Epics done  

Distance, Map

### Epics not done 

Custom Units

### What went well

### Problems encountered and resolutions

## Retrospective

### What we changed this sprint

### What went well

### Potential improvements

### What we will change next time
