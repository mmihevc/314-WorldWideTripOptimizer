# Sprint # - *t11* - *[hip, hip]*

## Goal: Build a trip!
### Sprint Leader: *Kevin Schroeder*


## Definition of Done

* The version in `server/pom.xml` is `<version>3.0</version>`.
* The Product Increment release for `v3.0` created on GitHub.
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
* Code Climate maintainability of A or B.
* Minimize code smells and duplication.

### Test Driven Development
* Write method headers, unit tests, and code in that order.
* Unit tests are fully automated.
* Maintain coverage at 50%.

### Processes
* Master is never broken. 
* All pull request builds and tests are successful on Travis-CI.
* All dependencies managed using Maven, npm, and WebPack.
* GitHub etiquette is followed always.


## Planned Epics

*Protocol Version 3*

We are reponsible for maintaining a standardized object format and client/server interaction. This protocol version update will require fixing mistakes we made in protocol version 2, making updates to the config request to include additional supported requests, and to add the trip request.

*More Destinations*

We will now let the user add any number of destinations in order to create a trip itinerary. The itinerary will be a round trip, and will show the round trip distance. We will also address the issue of legs where the line needs to wrap across the edges of the map.

*Itinerary*

The user will be able to see their planned trip itinerary, which will include the leg distances between each destination and the cumulative distance for the trip.

*Load*

We will allow the user to upload a trip file (in JSON or CSV format) that will load into the current itinerary being displayed.

*Modify Itinerary*

The user will be able to make modifications to the current itinerary. This includes changing the starting point, reversing the order of the destinations, reordering individual destinations, and deleting destinations.

*Save*

The user will be able to save their current map and current trip itinerary. The map can be saved in either KML or SVG format, and the itinerary can be saved in either JSON or CSV format.

## Metrics

| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | *6* | *count* |
| Tasks |  *43*   | *count* | 
| Story Points |  *43*  | *sum* | 


## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| *3/6* | *221, 222* | *225, 198, 202* |  | 
| *3/9* | *202, 203, 199, 196, 198* | *206, 225, 231* |  | 
| *3/11* | *195, 225, 206, 210, 230, 231, 205* | *194, 250, 208, 201* |  | 
| *3/13* | *194, 211, 250, 212, 209, 197, 208* | *213, 201* |  | 
| *3/25* | *213, 201, 214* | *214, 215, 192* | *Spring Break* | 

## Review

### Epics done  

*Protocol Version 3*

We were able to complete this epic quickly and without any impediments. We were able to reference the distance call in order
to figure out how to create the trip call.

*More Destinations*

We were able to complete this epic quickly and without any impediments. Since we stored everything in arrays last sprint we were able to transition easily from two boxes to as many boxes as necessary.

*Itinerary*

This epic took us the longest to complete, however that was due to spring break. Despite that impediment we were able to complete the epic without many issues. It was difficult at first to figure out how to make a react table dynamic but we were able to figure it out in the end.

*Load*

We were able to complete this epic quickly and without any impediments. By working together we were able to figure out how to parse the json and csv files.


### Epics not done 

*Modify Itinerary*

We were unable to complete this epic because we did not reserve enough time to get it done and because we put to many epics in our backlog this time around.

*Save*

We were unable to complete this epic because we did not reserve enough time to get it done and because we put to many epics in our backlog this time around.


### What went well

During this sprint we learned that creating a multitude of tasks to begin with makes the working on tasks separately easier. Which was extremely helpful since one of our team memebers was out of state and beginning the transition to an online only class. Having a large number of tasks allowed us to break down what we needed to accomplish from the beginning rather then realizing we needed more tasks as the sprint went on. We also learned that Microsoft Teams is a very helpful plateform in order to communicate while not being able to get together as a team because it allowed us to screen share and show the other memebers of our team what we were working on.

### Problems encountered and resolutions

The biggest problem we encountred this sprint was figuring out how to continue to work as a team while we were no longer able to get together as a team. We solved this by creating a group chat on Microsoft Teams and utilzing the screen share function so we could easily ask questions and get help from one another. 

## Retrospective

### What we changed this sprint

The biggest change we implemented this sprint was breaking down the provided epics in tasks that were as simplified as possible. Each epic had about seven tasks associated with it which made what needed to get done more easy to understand from the beginning the sprint whether then frequently creating new tasks to break down the tasks we made in the beginning.

### What went well

We found maintaining constant communication was helpful for maintaining our team dynamic. By checking in occasionally to see where people are at in the code along with checking in to see how they were holding up in general helped maintain the feeling of being on a team and that we are not alone despite not being able to see each other in person anymore.

### Potential improvements

In the future we will make sure that we begin epics sooner so we can make sure that we have allotted enough time to complete everything in our back log. We also want to make sure we are maintiaining constant communication because we were not as good as keeping up communication over spring break. 

### What we will change next time

In the future we will begin our epics sooner so we can complete more epics in the allotted time. We will also try to hold a video conference on Microsoft Teams on during our regular scheduled class time in order to check in about what we are working on, what we have completed, and how we are all doing in general. 
