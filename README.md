# Microeconomic Simulator of Firm Behavior under Monopolistic Competition

### Senior Project in Computer Science (Fall 2016)

![Screenshot](http://i68.tinypic.com/23u761v.png "Live Screenshot")

#### Abstract:

The integration of technology, and especially of computer software, in the educational process is becoming increasingly important for improving the 21st century student’s understanding and retention of academic material. Computer simulators are proving to be indispensable learning tools as they enable their users to readily apply theoretical knowledge and to automatically receive immediate feedback, which is invaluable both to learners and to their instructors. Yet at present, there is virtually no publically available software for teaching economics to people who are new to this discipline. The Microeconomic Simulator of Firm Behavior under Monopolistic Competition is an interdisciplinary project which tries to fill this unoccupied niche by providing an interactive means of strengthening and assessing a person’s grasp of fundamental economic concepts. It simulates the dynamic conditions of real-world markets that exhibit characteristics both of monopoly and of perfect competition, and demonstrates how production choices made by a company’s executives affect its profitability. All of this is done in an intuitive manner through an easy to use web application, which can be accessed from any device with an HTML5-compliant browser. The application is based on a proprietary algorithm which transforms the abstract economic model of monopolistic competition into a series of simple to follow steps and supplies visual aids in the form of indicator diagrams and informational pop-ups, which help users comprehend the consequences of their actions. The parameters of the model are fully customizable so that different types of economic environments can be explored. After finishing a simulation, users are presented with a summary of their performance, which they can compare to their previous accomplishments in order to measure their progress, or to those of others so they can see how they rank among their peers. 

#### Functional Requirements:

##### Server-side 

1.	The server will be able to create and store a new account for a user who has provided a valid e-mail, name, and password.

2.	The server will be able to authenticate a user who has provided an e-mail and password which match an existing account. 

3.	The server will be able to create and store new simulation settings for an authenticated user who has provided valid simulation parameters.

4.	The server will be able to retrieve the list of existing simulation settings which belong to an authenticated user.

5.	The server will be able to create and store a new score for an authenticated user who has completed a simulation.

6.	The server will be able to retrieve the list of existing simulation scores which belong to an authenticated user.

##### Client-side

1.	The client will be able to present a user with an interface for providing and validating an e-mail, name, and password for account creation.

2.	The client will be able to present a user with an interface for providing and validating an email and password for authentication.

3.	The client will be able to present an authenticated user with an interface for providing and validating simulation parameters for simulation settings creation.

4.	The client will be able to present an authenticated user with the list of existing simulation settings which belong to him/her.

5.	The client will be able to present an authenticated user with a brief introduction to the simulator.

6.	The client will be able to build an economic model using the simulation settings chosen by an authenticated user.

7.	The client will be able to present an interface for providing quantity and research amounts for execution of a turn of the simulation.

8.	The client will be able to process user input through its economic model and produce appropriate output.

9.	The client will be able to display output produced for a turn of the simulation, using suitable diagrams.

10.	The client will be able to display a glossary of economic terms used throughout the simulation.

11.	The client will be able to evaluate user performance and display a scoreboard upon completion of the simulation.

12.	The client will be able to present an authenticated user with the list of existing simulation scores which belong to him/her.
