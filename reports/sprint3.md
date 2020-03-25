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
| *3/25* | *213, 201* | *214, 215, 192* | *Spring Break* | 


## Review

### Epics done  

### Epics not done 

### What went well

### Problems encountered and resolutions


## Retrospective

### What we changed this sprint

### What went well

### Potential improvements

### What we will change next time
