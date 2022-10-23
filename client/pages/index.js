import buildClient from "../api/build-client";

const LandingPage = ({currentUser}) => {
    //console.log(currentUser);
    console.log(currentUser);
    return <div>Landing Page</div>
}
LandingPage.getInitialProps = async (context) =>{
    const client = buildClient(context);
    const { data } = await client.get('/api/users/currentuser');
    return data;
    
    //const response = await axios.get('/api/users/currentuser');
    // .catch((err) => {
    //     console.log(err.message);
    //   });
    //return response.data;
}
export default LandingPage;