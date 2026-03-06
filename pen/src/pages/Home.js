import TopicList from "../components/TopicList"

function Home() {
    
    return (
        <div className="home-page">
            <h1>Wellcome to oPenion Forum!</h1>
        <div className="home-topics">
            <h2>Last disscusions:</h2>
            <TopicList isForum={false} />
        </div>
     </div>
    );
}

export default Home;