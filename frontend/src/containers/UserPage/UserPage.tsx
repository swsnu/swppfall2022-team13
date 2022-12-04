import { useParams } from "react-router";

const UserPage = () => {
  const {id} = useParams();

    return (
        <>
          <h1>This is JJDD UserPage</h1>
          <h2>USER_ID: {id}</h2>
              <p>
              so what
              </p>
        </>
      );
  }
  
  export default UserPage