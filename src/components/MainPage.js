import PostingPage from "./PostingPage";
import ProfilePage from "./ProfilePage";
import Tweets from "./Tweets";

const MainPage = () => {
    return (
        <div className="main-container">
            <ProfilePage/>
            <Tweets/>

        </div>
    )
}

export default MainPage;