apigee-api-workshop
======================

This is a sample Node.js app that shows a list of restaurants, drills down to an individual restaurant showing its details, average rating, a map, and reviews for the restaurant. You can add up to two reviews per hour.

After cloning/downloading the app, you need to go into config.js in the root level of the project and change the Server: and UG: values to match where you are running the app and where your Usergrid database is located.

```javascript
module.exports = {
	// Server address
	Server: "http://localhost:8888",
	// Usergrid path
	UG: "http://localhost:8080/workshop/sandbox"
}
```
You also need to set the baseURL variable in the Jade template: layout.jade located in the views folder. Set the fully qualified URL including the trailing slash on line 10:
```jade
- var baseURL = "http://localhost:8888/"
```
Then, start app.js and hit /demo-data to create and populate the restaurants and reviews collections in Usergrid.
