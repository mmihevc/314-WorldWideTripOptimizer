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

*Modify Destinations*

The way we initally set our UI allowed for the user to modify the destinations without use needing to add anything additional besides adding more testing.

### Epics not done 

*Optimize*

We were able to complete most of the tasks associated with this epic however we were not able to determine the best level of optimization if the user doesn't provide what the level of optimization they would like. We did not reserve enough time to complete this task.

*Protocol Version 4*

We were able to complete all of the task associated with this epic expcept for implementing 3-opt. We did not reserve enough time to complete that task and test it to make sure it works. 

*Concurrency*

We were unable to complete this epic because we did not reserve enough time to get it done. Some of the other epics took longer than expected which led to use being unable to complete this epic. 

### What went well

During this sprint we made enough tasks that the amount was not overwhelming but just enough that we were able to break down what we needed to accomplish. We also learned that meeting for at least 30 minutes after class allowed us to maintain team moral and check in with where people are or if they needed help with their task. 

### Problems encountered and resolutions

The major problem we encountered this sprint was maintaining motivation throughout the duration of the sprint. We found it difficult to continue to function as well as we did on previous sprints. We found that we would get motivated for short bursts but we were unable to maintain motivation during the whole sprint. In order to resolve these problems we tried to check to check in on each other frequently to make sure everyone is doing alright. We also discovered that some of the tasks were more complicated than we originally anticipated. This forced us to spend more time working on certain tasks and inhibited us from accomplishing other tasks.

## Retrospective

### What we changed this sprint

This sprint we made sure to check in more frequently, even for a short time, just to check in and see where everyone is at and if there is anything that people need help with. We also decreased the amount of tasks we created which make task completion more manageable. 

### What went well

We found that maintaining constant communication was very important for our team because when we were not constantly communicating we tended to fall behind on task completion. We also discovered it is easier to complete epics when we break tasks into two steps. The first step dedicated to creating the react component and the second step dedicated to writing the code that interacts with the react component. 

### Potential improvements

During the next sprint we will try to begin epics sooner so we can make sure that we have allotted enough time to complete everything in our backlog. We will also try to maintain a higher level of motivation in order to complete more tasks and epics during the allotted time. 

### What we will change next time

During the next sprint we will try to begin epics sooner so we can make sure to complete what we plan on completing in the allotted time. We will also figure out something to do as a team over Microsoft Teams in order to maintain team morale which should help increase motivation. During this time it is very important to make sure that everyone is taking care of their mental health and staying healthy and by checking in with each other we will be able make sure that is happening.
