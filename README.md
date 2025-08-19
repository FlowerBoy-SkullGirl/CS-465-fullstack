# CS-465-fullstack
SNHU CS-465 Fullstack Development MEAN Stack

Compare and contrast the types of frontend development you used in your full stack project, including Express HTML, JavaScript, and the single-page application (SPA).
Rather than routing the browser to an appropriate page with different html data, as the Express page does, the Angular SPA refreshes the browser on the same resource while rendering new appropriate HTML data based. Where the Express page would redirect to a different resource, the Angular page renders the appropriate ‘component’ and can utilize services to update these components dynamically and communicate with other parts of the application through HTTP requests. An SPA may be advantageous in our case where data manipulation is crucial to the functionality of the page; utilizing angular services to interface with the database through HTTP requests and updating the page immediately to reflect those changes presents a streamlined user experience. In contrast, in an environment where data is accessed for viewing rather than editing, a simple web application navigates in a familiar manner and has reduced logic for rendering the page (which may reduce loading times/increase responsiveness in comparison to an SPA).

Why did the backend use a NoSQL MongoDB database?
The use of a NoSQL database has a few benefits. One benefit is that we can easily use javascript to integrate CRUD operations on the database as methods in our code. Another is that we avoid SQL injection attacks and can expend focus for security efforts such as input validation on different/more easily managed attack surfaces.

How is JSON different from Javascript and how does JSON tie together the frontend and backend development pieces?
JSON is a text description of an object. Javascript is a scripting language. Javascript can interpret JSON to recreate objects in code, and the same can be done for other pieces of the backend, so JSON acts as a common format for storing and retrieving data.

How has this course helped you in reaching your professional goals? What skills have you learned, developed, or mastered in this course to help you become a more marketable candidate in your career field?
This course was a sufficient opportunity to show off my proficiency with version control systems such as git. Job postings would suggest that there are far more positions available for web development than any other career path I could take with my current skills, so if I ever wanted to do web development (which I do not), I would have a much easier time seeking employment.
