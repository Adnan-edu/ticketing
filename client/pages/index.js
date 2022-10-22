import axios from 'axios';

const LandingPage = ({currentUser}) => {
    //console.log(currentUser);
    console.log(currentUser);
    return <div>Landing Page</div>
}
LandingPage.getInitialProps = async (req) =>{
    if(typeof window === 'undefined'){
        //Then we are in server
        const {data} = await axios.get('http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',{
            headers: req.headers
        });
        return data;
    }else{
        //Then we are in browser
        const {data} = await axios.get('/api/users/currentuser');
        return data;
    }
    return {};
    //const response = await axios.get('/api/users/currentuser');
    // .catch((err) => {
    //     console.log(err.message);
    //   });
    //return response.data;
}
export default LandingPage;