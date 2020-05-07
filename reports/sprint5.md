# Sprint 5 - *T11* - *['Hip', 'Hip']*

## Goal: Finding more places to go!
### Sprint Leader: *Kai Griem*


## Definition of Done

* The version in `server/pom.xml` is `<version>5.0</version>`.
* The Product Increment release for `v5.0` created on GitHub.
* The team's web application is deployed on the production server (`black-bottle.cs.colostate.edu`).
* The design document is updated (`design.md`).
* The completed metrics are captured below.
* The scrums completed during each lecture are captured below.
* The sprint review and restrospective are captured below.


## Policies
* To work with a smile :)

### Mobile First Design
* Design for mobile, tablet, laptop, desktop in that order.
* Use ReactStrap and ReactLeaflet for a consistent user experience (no HTML, CSS, style, etc.).

### Clean Code
* Code Climate maintainability of A (technical debt ratio <= 5).
* Minimize code smells and duplication.

### Test Driven Development
* Write method headers, unit tests, and code in that order.
* Unit tests are fully automated.
* Maintain coverage at 70%.

### Processes
* Master is never broken. 
* All pull request builds and tests are successful on Travis-CI.
* All dependencies managed using Maven, npm, and WebPack.
* GitHub etiquette is followed always.


## Planned Epics

*Protocol Version 4*

This epic is mostly completed, however we need to implement 3-opt still which we plan to do during this sprint. 

*Optimize*

This epic has mostly been completed already, however we need to apply the optimization levels that the user choose to the itinerary and have the itinerary reflect the optimization. 

*Concurrency*

We are responisible for taking advantage of everything running at the same time to reduce computation time spent on optimization in order to provide the user with better results.

*Protocol Version 5*

In this epic we are responsible for implementing version 5 in order to support interoperability. We will also be implementing a find request that searches for locations based on user input.

*Find*

We are responsible for creating an interactive UI that allows users to search for regions, municipalities, and/or regions. Then filter those searches so the user is not overwhelemed but what is eventually displayed to them.

*Itinerary Search*

In this epic we are responsible for creating an UI component that allows the user to search the itinerary for certain places based on supplied keywords.

*User Experience*

Through this task we plan on improving out UI in order to make it easier for the user to understand how to navigate our interface. We also hope to clean up our interface so when in mobile mode it is easier to see everything.

## Metrics

| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | *7* | *count* |
| Tasks |  *27*   | *count* | 
| Story Points |  *29*  | *sum* | 


## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| 4/22 | | 320 | |
| 4/24 | 324, 441  | 320, 434, 315 | |
| 4/27 | 435, 315 | 448, 440, 433, 432, 320, 434, 312 | |
| 4/29 | 433, 434, 315 | 448, 442, 446, 449, 440, 432, 320, 312 | |
| 5/1  | 454, 453, 446, 438, 437 | 447, 448, 312, 320, 440, 449, 432 | |
| 5/4  | 447, 448 | 444, 491, 452, 449, 440, 432, 320, 312 | |
| 5/6  | 513, 312, 320, 439, 455, 507, 321, 351, 452, 444 | 450, 432 | |

## Review

### Epics done  

*Protocol Version 4*

From the last sprint we only had writing 3-opt left over which we were able to implement during this sprint. The user can now select what type of optimization they would like to apply to their trip.

*Optimize*

During the last sprint we completed most of this epic; the one thing we were unable to implement was applying the optimization options the user choose to the itinerary which we were able to complete during this sprint. 

*Concurrency*

While this epic took some time to complete we were able to complete it with no impediments. We were able to implement concurrency in order to reduce computation time and provide the user with the best results.

*Itinerary Search*

We were able to complete this epic quickly and with no impediments. The user can now search for a specific destination in their itinerary using the icon that is located on the map. 

*User Experience* 

During this sprint we were able to modify our user interface in order to make it less cluttered and more explanitory for the user. We created a series of tabs that allows the user to only see on the screen what they would like to interact with whether is is the itinerary, the find component, or the optimization component. Our goal was to simplify our user interface as much as possible.

### Epics not done 

*Protocol Version 5*

We were unable to complete this epic in time because we did not give ourselves enough time to understand how to work with the database. We were unable to figure out how to search the database for our config response.

*Find*

We were unable to complete this epic in time because we did not give ourselves enough time to complete protocol version 5 and since we were unable to get protocol version 5 we weren't able to get the find functionality implemented. We created the UI components but we were unable to implement the functionality. 

### What went well

During this sprint we were able to update our user interface to make it easier for a user to interact with. We were able to simplify it so when in mobile mode the screen is not as cluttered. We were also able to simplfy tasks down enough in order to be able to understand what needed to be done even if we didn't know how to get started. 

### Problems encountered and resolutions

One of the major problems we encountered was the lack of motivation. We have found it hard to stay motivated and on top of everything while working from home. With all of us experiencing a lack of motivation it made it difficult for us to stay on top of the tasks that needed to be completed. In order to combat these feelings we tried to video chat when we could and code together over video chat. This made it easier to ask questions when someone got stuck.

## Retrospective

### What we changed this sprint

There is not a whole lot that we changed this sprint. Over the last couple of sprints we were able to fall into a rhythm. We have been able to create a process for how we like to complete tasks and how to function as a team which allowed us to be able to work together well. 

### What went well

At the beginning of the sprint we had a virtual team bonding meeting in order to continue to feel more connected with each other and be able to enjoy time together that was not dedicated to coding or talking about what needed to get done. This was very beneficial to maintaining team morale. 

### Potential improvements

One improvement we should have made during this sprint as starting the inspect tasks sooner instead of waiting until the last day. Waiting until the last day to complete the inspect tasks made the completion process more stressful, along with forcing us to put more tasks into the ice box. We also were unable to maintain as much constant communication as we should have which made it caused us to spend more time on tasks then they may have actually taken. 

### What we will change next time

In the future when we get to work on teams again, we will make sure that we are maintaining constant communication with our teammates. It is very important to maintain contact with teammates in order to know who is accomplishing what or what someone may be struggling with. We will also make sure to start whatever group assignment we are a part of earlier to make sure we allow ourselves enough time to complete the assigment fully. 
