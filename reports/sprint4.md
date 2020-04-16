# Sprint 4 - Team 11 - [Hip, Hip]

## Goal: Optimize the trip!
### Sprint Leader: Maddie Mihevc


## Definition of Done

* The version in `server/pom.xml` is `<version>4.0</version>`.
* The Product Increment release for `v4.0` created on GitHub.
* The team's web application is deployed on the production server (`black-bottle.cs.colostate.edu`).
* The design document is updated (`design.md`).
* The completed metrics are captured below.
* The scrums completed during each lecture are captured below.
* The sprint review and restrospective are captured below.


## Policies

### Mobile First Design
* Design for mobile, tablet, laptop, desktop in that order.
* Use ReactStrap and ReactLeaflet for a consistent user experience (no HTML, CSS, style, etc.).

### Clean Code
* Code Climate maintainability of A (technical debt ratio <= 5).
* Minimize code smells and duplication.

### Test Driven Development
* Write method headers, unit tests, and code in that order.
* Unit tests are fully automated.
* Maintain coverage at 60%.

### Processes
* Master is never broken. 
* All pull request builds and tests are successful on Travis-CI.
* All dependencies managed using Maven, npm, and WebPack.
* GitHub etiquette is followed always.


## Planned Epics

*Modify Itinerary*

The user will be able to make modifications to the current itinerary. This includes changing the starting point, reversing the order of the destinations, reordering individual destinations, and deleting destinations.

*Save*

The user will be able to save their current map and current trip itinerary. The map can be saved in either KML or SVG format, and the itinerary can be saved in either JSON or CSV format.

*Protocol Version 4*

We are responsible for updating the protocol version to version 4 alone with providing options in order for users to optimize their trips and itineraries with using the less distance traveled.

*Optimize*

The user will be able to request optimization on their itinerary along with applying a default level of optimization on the server that provides the best results along with allowing the option to select a certain level of optimization.

*Modify Desination*

The user will be able to modify the place attributes for a specific destination.

*Concurrency*

We are responisible for taking advantage of everything running at the same time to reduce computation time spent on optimization in order to provide the user with better results.

## Metrics

| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | 6 | *count* |
| Tasks | 28   | *count* | 
| Story Points |  30  | *sum* | 

Last sprint we created too many tasks from the beginning and were not able to get through them. This sprint we created less task with the hope that we will be able to complete more tasks during this sprint. During our last few sprints we rated every task with an estimate of 1 but this time we gave two tasks an estimate of 2. For this sprint we are tryint to be more aware ahead of time of the difficulty level a task will have. With the having a new member added to our team we hope to complete all of our tasks this sprint. 


## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| 4/1 | #309 | #216, #319 |  | 
| 4/3 | #309 | #216, #319 | |
| 4/6 | #309, #219, #187, #217 | #216, #313, #234, #233, #218, #319 | |
| 4/8 | #309, #219, #187, #217, #313, #227, #220, #228, #218, #216, #226 | #324, #322, #229, #323, #234, #233 | |
| 4/10 | #309, #219, #187, #217, #313, #227, #220, #228, #218, #216, #226, #322, #314,#311, #317 | #324, #229, #323, #234, #233| |
| 4/13 | #309, #219, #187, #217, #313, #227, #220, #228, #218, #216, #226, #322, #314,#311, #317, #322 | #324, #229, #323, #234, #233 | |
| 4/15 | #309, #219, #187, #217, #313, #227, #220, #228, #218, #216, #226, #322, #314,#311, #317, #322, #318, #323, #316, #371, #229, #233, #368 | #320, #234, #369, #310 | |


## Review

### Epics done  

*Modify Itinerary*

We were able to complete this epic efficiently and with no impediments. Using a series of buttons the user can now add a box that represents the new starting location, reorder the destinations, reverse the trip, and delete a destination.

*Save*

We were able to complete this epic quickly and with no impediments. This epic was the easiest epic to complete during this sprint for our team. The user can now save both the map and the intinerary.

*Optimize*

We were able to complete this epic quickly and with no impediments. Based on a series of options that the user can provide, the intinerary can now be optimized based on those options.

*Modify Destinations*

The way we initally set our UI allowed for the user to modify the destinations without use needing to add anything additional besides adding more testing.

### Epics not done 

*Protocol Version 4*

We were able to complete all of the task associated with this epic expcept for implementing 3-opt. We did not reserve enough time to complete that task and test it to make sure it works. 

*Concurrency*

We were unable to complete this epic because we did not reserve enough time to get it done. Some of the other epics took longer than expected which led to use being unable to complete this epic. 

### What went well

### Problems encountered and resolutions


## Retrospective

### What we changed this sprint

### What went well

### Potential improvements

### What we will change next time
