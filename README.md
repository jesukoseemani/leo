### Reviews
This is based on individual files checked below:

# Packed used
1. Consider using sass instead of node-sass. node-sass has got a dependency that is depreciated.

# index.css
1. Consider keeping out unused files. This could override the actual style definitions
   
# constants.js
1. Consider having a file that handles apis for better file structure.
2. Consider using template literals for better readability. Instead of concatenating strings using the + operator
3. Avoid "/" before the query "?" could cause an error or some unexpected response

# App.js
1. Consider removing unused functions. closeModal was unused
2. setOpen is called twice, Consider removing this second call because it might be redundant.
3. Consider using try and catch for better error handling
4. There is no reason to default setVideoKey to null, it can be done upon creating it.
5. Ideally, it's better to keep the entry file as clean as possible. We can manage every business logic outside of here...
6. Create a global layout that will handle the header component and since we make use of router@6, consider taking advantage of the Outlet component
7. Starred and watch later make use of similar components. To maintain modularity, we can create a reusable component that will handle logic for both components. And it's individual business logic can be handled locally inside of the component.
