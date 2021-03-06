# Introduction

This document describes the architecture and design of a single page web application that interacts with microservices via RESTful APIs.
The key elements in this document include the architecture, user interface, client components, and server classes.

This is a living document that is updated as changes are made each sprint.
The initial document describes the Base code students are given as a starting point for the semester.
Students are expected to update this document as changes are made each sprint to reflect the evolution of their application and key decisions they make.
The Base section serves as an example.


# Base

The Base is a simple application to provide the architecture to the students at the beginning of the semester.
The JavaScript code will be useful examples for students to learn from and leverage in the code they write for sprint 1.
The progressive display of information using collapsible sections and popups will serve as examples of good user interface design.
The overall design is somewhat minimalist/simple for the intended mobile device audience.

### Architecture

The Base architecture is a JavaScript single page web application in an HTML5 browser that uses RESTful APIs to access Micro-services provided by a Java server running on Linux.
The client consists of a minimal index.html file that loads and executes the bundled JavaScript application.
The client and server files are bundled into a single JAR file for execution on the Linux server at a specified port.
The browser fetches the client files from the server on the specified port.

![overview](images/basearchitecture.png)

The browser loads the index.html file (by default) which in turn loads the bundled JavaScript single page application bundle.js.
* The single page application makes RESTful API requests to the server on the same port using  JavaScript's asynchronous fetch.  
* A protocol document describes the JSON format for the RESTful API requests and responses.
* JSON Schemas are used to verify requests on the server side and responses on the client side.
* On the client, ReactJS renders the application using ReactStrap, Leaflet, and application defined components.
* GSON is used on the server to convert JSON requests to Java objects and Java objects to JSON responses.
* The client (ulog) and server (SLF4J) logging mechanisms control debugging output during development and production - print statements and console logging should never be used. 

The following architecture elements are not included in the Base system.
They will be added later in the semester.
* Client filesystem .
* Server SQL .
* Server concurrency.


### User Interface
![base](images/20200110_164505512_iOS.png)

The basic screen in black shows the view on a mobile device, with a header, footer, and map.
The header contains a earth logo and the team name obtained from the server when the client was loaded.
The footer contains a connection icon along with the current server name and server URL the client is connected to.
The blue areas highlight the actions that may be performed.

Rather than buttons or icons to signify actions, we are associating actions with elements that are already on the screen to reduce the clutter.
We are using both popups and collapsible sections in this design rather than choosing to use one exclusively.
* Collapsible/Hidden sections are used for the map and about sections since they have a significant amount of content and we don't need to see them at the same time.
* A popup is used for the URL change since we want to control the interaction until the operation is completed. It seemed more natural than another collapsible section.

#### Clicking on the map places a marker.
Whenever a user clicks on the map, the client should display a marker with latitude and longitude at that location.
We only maintain a single marker at this point displaying the most recently clicked location.

#### Clicking on the team name should tell me more about the team.
Whenever a user clicks the team name in the header, a collapsible section should appear under the header with information about the team.The collapsible map should disappear so only the about or map are displayed.A close button / icon in the top right corner of the about will close the about and return the map to display.A simple toggle in state should be able to control this rendering.The about page should contain the team name as a heading, but be otherwise blank in base. 

#### Clicking on the URL in the footer should let me change the server.
Whenever a user clicks on the URL a popup should open showing the team name, the URL in an input text box, and a Cancel button.
When the user modifies the URL, a Test button should appear and the server name should disappear.
When the Test button is clicked, it will attempt to connect to the server.
If not successful, nothing changes and the user may continue to make URL changes or click the Cancel button to return to the original sever (it shouldn't change).
If successful, the new server name should appear and a Save button should replace the Test button.
When the user clicks the Save button, the server connection should change and the popup closes, revealing the new servername and URL in the footer.


### Component Hierarchy
The component hierarchy for the base application depicted below shows the our top level App component with four children components.
* App renders the major components on the screen.
* Header renders an icon and a team name in the top banner.
* Footer renders the current server connection in the bottom footer.
* Atlas renders a map.
* About renders information about the team.

![base component hierarchy](images/20200125_185503075_iOS.png)

We do not show the many ReactStrap components in this hierarchy, even though they will appear when you are debugging on the client.

### Class Diagram
The class diagram for the base application depicted below shows the basic structure of the web server application.

![class diagram](images/20200125_204721957_iOS.png )

The classes in blue represent the classes specific to this application.  
* WebApplication processes command line parameters and creates MicroServer.
* MicroServer start a web server on the given port, configures the server for security, static files, and APIs for different types of requests, and processes the requests as they arrive.
* JSONValidator verifies a request is properly formatted before attempting to process it using JSON Schemas.
* RequestConfig is a specific request that allows the server to respond with its configuration to allow interoperability between clients and servers. 
* RequestHeader defines the basic components of all requests.

The classes in orange represent the external libraries used by the application.
Often there are several related classes but we've listed only one to simplify the diagram.
* GSON converts a JSON string into a Java object instance.
* Spark provides the necessary web support for our MicroServer.
* JSON provides libraries to manipulate JSON objects using the JSON Schema libraries.
* Logger provides a centralized logging facility used in all of the application classes.


# Sprint 1
#### Clicking on the team name should tell me more about the team.
![base](images/aboutDiagram.jpg)

When a user clicks on the team name in the header a collapsable window will drop down displaying the team statement, team picture's, and names. To the right of the window is a close button that will collapse the window and once again display the map. Clicking on the images for a team member will replace the team statment with the individial team members biography. Clickling the team members image agin will replace the members biography with the team statement once again. 

#### The homepage map should be able to show the user where they are.
![base](images/sprint1map.png)

When the user first visits the page a pop-up appears asking them to allow the use of their location. If the user accepts, then the map will show a marker for their location, and center to their whereabouts. If the user doesnt allow the browser to use their location, then the map will center at coordinates (0, 0). The Where Am I? button will be shown to the user regardless, but is only functional when the user accepts geolocation features. When functional, the button will recenter the map to the users current geolocation, and the marker will go back to that geolocation aswell. The map will always be at its maximum zoom-in level when the page is first loaded, and also when the Where Am I? button is pressed.

# Sprint 2
#### Users can enter 2 different coordinates.
![base](images/mapLine.jpg)

When a user enters a valid Lattitude and Longitude the map will go to that location and display a Marker. A line will be drawn between the two valid coodinate markers.

# Sprint 3

### New Component Hierarchy.
![base](images/hier.jpg)

The component hierarchy for the Sprint 3 version of the application depicted below shows the our top level App component with four children components. The Atlas component has three children components.
* App renders the major components on the screen.
* Header renders an icon and a team name in the top banner.
* Footer renders the current server connection in the bottom footer.
* Atlas renders a map.
* AtlasInput renders an input box with Name and Latitude/Longitude
* AtlasMarker renders a marker with a name and a coordinate
* AtlasLine renders a line between markers and handles dateline wrapping
* About renders information about the team.

### New User Interface.
![base](images/buttons.jpg)

### Users can enter more destinations

A button with the '+' character indicates to the user that they can add additional destinations. Pressing the button adds another input box for name and latitude/longitude for the additional destination. The user does not have to submit a previous destination to enter an additional destination. When a destination is added a marker is added to a map that has the name and coordinates of the destination. If no name is provided then the marker is labeled "place1" for example. Lines are drawn between each marker and between the last and the first marker to make a roundtrip, the lines are also wrapped around the dateline if needed.

### Users can view an itinerary

A button 'Click to view Itinerary' toggles a table that lists the destinations, leg distances, and cumulative distances for the users current trip. The itinerary updates whenever the user submits destinations or loads a trip from a file.

### New Itinerary Feature.
![base](images/fixed.jpg)

### Users can load a file

A button is added for users to choose a local trip file that will be loaded into the webpage. Any previous user input is overidden and replaced with the data from the loaded trip file, which can be in either a JSON or a CSV format. Only a single trip file can be loaded in at a time.

# Sprint 4 

### New Class Diagram.
![base](images/classServer.jpg) 

### New Team Member Added to About Page.
![base](images/newAbout.jpg)

This Sprint we got a wonderfull new addition to our team Kellyn. We had to change up our home page to add her to the team. 

### Changes to user interface for optimization options.
![base](images/IMG_0108.PNG)

You can select 2 opt or nearest neightbor which is 1 on the constructiion drop down then it will optimize based off that. It wont return it in a certain amount of time it wont do multiole iterations of nearest neighbor. 

### Changes to user interface for destination order.
![base](images/IMG_0103.PNG)
![base](images/IMG_0102.PNG)

User is now able to change to order of their trip by clicking on buttons. 

# Sprint 5

### New Server Hierarchy
![base](images/sprint5server.jpg)

### New User Interface 
![base](images/IMG_0109.PNG)

### New User Interface 
![base](images/lastpic.PNG)
