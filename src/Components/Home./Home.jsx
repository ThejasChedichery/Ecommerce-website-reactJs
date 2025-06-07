

const Home = (props) => {


    return (
        <>
            <div ref={props.forwardedRef} style={{
                display: "flex",
                justifyContent: "center",
                padding: "25px 0",
            }}>
                <img src="src/Components/Home./img1.png" width={"90%"} />
            </div>
        </>
    )

}

export default Home;