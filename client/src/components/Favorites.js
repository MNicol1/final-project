import { useState, useEffect } from "react";


// const Favorites = () => {
//   const [currentUser, setCurrentUser] = useState();
//   const [likes, setLikes] = useState();

//   useEffect(() => {
//     fetch("/get-user/:email")
//       .then((res) => res.json())
//       .then((data) => {
//         setCurrentUser(data.data);
//       });
//   }, []);

//   ////get all likesand conditionally render on page

//   const fetchLikes = () => {
//     fetch("/get-likes")
//       .then((res) => res.json())
//       .then((data) => {
//         setLikes(data.data);
//         // setIsLoading(false);
//       });
//   };

//   useEffect(() => {
//     // setIsLoading(true);
//     fetchLikes();
//   }, []);

//   return <div>Favorites</div>;
// };

export default Favorites;
