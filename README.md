# Reviews
This is based on individual files checked below:

### Packed used
1. Consider using sass instead of node-sass. node-sass has got a dependency that is depreciated.

### index.css
1. Consider keeping out unused files. This could override the actual style definitions
   
### constants.js
1. Consider having a file that handles apis for better file structure.
2. Consider using template literals for better readability. Instead of concatenating strings using the + operator
3. Avoid "/" before the query "?" could cause an error or some unexpected response

### App.js
1. Consider removing unused functions. closeModal was unused
2. setOpen is called twice, Consider removing this second call because it might be redundant.
3. Consider using try and catch for better error handling
4. There is no reason to default setVideoKey to null, it can be done upon creating it.
5. Ideally, it's better to keep the entry file as clean as possible. We can manage every business logic outside of here...
6. Create a global layout that will handle the header component and since we make use of router@6, consider taking advantage of the Outlet component
7. Starred and watch later make use of similar components. To maintain modularity, we can create a reusable component that will handle logic for both components. And it's individual business logic can be handled locally inside of the component.

### starredSlice.js
1. Consider checking whether the movie already exists before adding. it's good practice even if it would be checked before dispatch

### watchLaterSlice.js
1. Consider checking whether the movie already exists before adding. it's good practice even if it would be checked before dispatch

### Header.jsx
1. Using a Link component from React Router to wrap an input and handling the onClick event to trigger a search is generally not a good approach. If the goal is to clear the search query and potentially trigger a search when the user clicks a link, consider using a separate button or a clickable element for this purpose. OR clear the search upon route changes.
2. Consider adding a debounce to the onKeyUp event. Debouncing can help reduce the number of requests sent while the user is typing. It ensures that the search function is only called after a certain delay when the user stops typing.
3. Instead of onKeyUp, you might consider using the onChange event to trigger the search function. This way, the search function is called when the user finishes typing and moves out of the input field.
   
### Movie.jsx
1. Consider not passing the movie to removeFromWatchLater since it takes in just the ID
2. Consider making "https://image.tmdb.org/t/p/w500/" a variable, probably under the constant file and export. To avoid repetition.

