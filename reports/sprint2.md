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

This sprint our team grew closer and were able to tackle obstacles together in a quicker fashion. In the beginning of the sprint we worked a little more individually and noticed that it was taking all of us a while to figure out and complete a task. By the middle of the sprint our team started to get together as a group more often and were able to complete tasks in a few hours instead of a few days.

### Problems encountered and resolutions

The biggest challenge our team encountered this sprint was understanding state in react. This sprint the tasks were more challenging and in the first week we had to adjust and learn a lot about react and how the states work in order to complete the tasks. Another challenge we faced was breaking down our epics into tasks. When we noticed that some of us were working on the same thing we set up a meeting and cleared up all the confusion and were back on track. 

## Retrospective

### What we changed this sprint

### What went well

For this Sprint we were much more consistent with task completion throughout the weeks, which is reflected by the consistent slope on our burndown chart. We spent more time getting together as a group and started asking more questions when we ran into issues. The team also had its first bonding event where we didn't do any work on the project. We handled problems we ran into as a team and kept communicating what was going on.

### Potential improvements
There were several scrums over the Sprint where none of us had any new closed tasks to report. Next sprint we hope to have at 
least one tasked closed by every sprint. We also discovered that we did not make enough tasks to begin with that actually covered all we needed to accomplish. Next sprint we plan on spending more time planning in order to completely understand what is being asked of us and to make tasks that fufill that understanding. 

### What we will change next time
During the next sprint we will make sure to add tests when merging code in order to maintain a higher test coverage. We will also attempt to begin the sprint sooner so the Wednesday before the sprint is due we are not worried about completeing tasks. Our hope is to spend that Wednesday fixing small issues instead of implementing changes into the code. We will also contineue to be more careful about merging and making pull requests, and ensuring that merge conflicts are resolved appropiately.
