const App = () => {
    const [weight, setWeight] = React.useState("")
    const [over, setOver] = React.useState(false)
    const [under, setUnder] = React.useState(false)
    const [setup, setSetup] = React.useState({ bar: "", plates: [] })
    const [lock, setLock] = React.useState(false)
    const [displayedWeight, setDisplayedWeight] = React.useState("")
    const [selectedBar, setSelectedBar] = React.useState(20)

    let barbRefs = {
        0.5: "./assets/0.5.png",
        1: "./assets/1.png",
        1.5: "./assets/1.5.png",
        2: "./assets/2.png",
        2.5: "./assets/2.5.png",
        5: "./assets/5.png",
        10: "./assets/10.png",
        15: "./assets/15.png",
        20: "./assets/20.png",
        25: "./assets/25.png",
        50: "./assets/50.png",
    }

    let barRefs = {
        "20": "./assets/bar20.jpg",
        "15": "./assets/bar15.jpg",
        "10": "./assets/bar10.jpg",
        "5": "./assets/bar5.jpg",

    }

    function handleChange(event) {
        setWeight(event.target.value)
        setSetup({ bar: "", plates: [] })
        setLock(false)
    }


    function computeBarb(weight, selectedBar) {
        console.log(selectedBar)
        let computed = ((weight - selectedBar - 1) * 10) / 2;
        while (computed > 0) {
            if (computed >= 500) {
                setSetup(prevState => ({
                    ...prevState,
                    plates: [...prevState.plates, 50]
                }))
                computed -= 500;
            } else if (computed >= 250) {
                setSetup(prevState => ({
                    ...prevState,
                    plates: [...prevState.plates, 25]
                }))
                computed -= 250;
            } else if (computed >= 200) {
                setSetup(prevState => ({
                    ...prevState,
                    plates: [...prevState.plates, 20]
                }))
                computed -= 200;
            } else if (computed >= 150) {
                setSetup(prevState => ({
                    ...prevState,
                    plates: [...prevState.plates, 15]
                }))
                computed -= 150;
            } else if (computed >= 100) {
                setSetup(prevState => ({
                    ...prevState,
                    plates: [...prevState.plates, 10]
                }))
                computed -= 100;
            } else if (computed >= 50) {
                setSetup(prevState => ({
                    ...prevState,
                    plates: [...prevState.plates, 5]
                }))
                computed -= 50;
            } else if (computed >= 25) {
                setSetup(prevState => ({
                    ...prevState,
                    plates: [...prevState.plates, 2.5]
                }))
                computed -= 25;
            } else if (computed >= 20) {
                setSetup(prevState => ({
                    ...prevState,
                    plates: [...prevState.plates, 2]
                }))
                computed -= 20;
            } else if (computed >= 15) {
                setSetup(prevState => ({
                    ...prevState,
                    plates: [...prevState.plates, 1.5]
                }))
                computed -= 15;
            } else if (computed >= 10) {
                setSetup(prevState => ({
                    ...prevState,
                    plates: [...prevState.plates, 1]
                }))
                computed -= 10;
            } else if (computed >= 5) {
                setSetup(prevState => ({
                    ...prevState,
                    plates: [...prevState.plates, 0.5]
                }))

                computed -= 5;
            }


        }
    }

    function handleClick() {
        setDisplayedWeight(weight)
        setWeight("")
        if (weight > 900) {
            setSetup({ bar: "", plates: [] })
            setOver(true)
            setUnder(false)
            setLock(false)
            setDisplayedWeight("")
        } else if (weight < 5) {
            setSetup({ bar: "", plates: [] })
            setOver(false)
            setUnder(true)
            setLock(false)
            setDisplayedWeight("")
        } else if (weight <= 900 && weight > 5) {
            computeBarb(weight, selectedBar)
            setOver(false)
            setUnder(false)
            setLock(true)
        }


    }

    function handleSelect(event) {
        setSetup({ bar: "", plates: [] })
        setSelectedBar(parseInt(event.target.id))
        setDisplayedWeight(event.target.id)
        setLock(false)
    }


    return (
        <div className="container">

            <div className="left-side">
                {setup.plates.map((barb, index) => <img key={index} src={barbRefs[barb]}></img>)}
                {lock ? <img src="./assets/lock.jpg"></img> : ""}
            </div>

            <div className="center">

                <img src="./assets/eleiko.jpg" alt="logo" id="logo" />

                <div className="text">
                    {over ? <p>You cannot put this weight on the bar! Max - 900 kgs</p> : ""}
                    {under ? <p>The bar itself is 20kg. You cannot put less than that weigth</p> : ""}
                    <p id="disw">{displayedWeight} {displayedWeight ? "kgs" : ""}</p>
                </div>

                <div className="constructor">
                    <input placeholder="please enter weight" onChange={handleChange} type="number" name="weight" id="weight" value={weight} />
                    <button onClick={handleClick} id="construct">Construct</button>
                </div>

                <div className="barbels">
                    <img src="./assets/bar5.jpg" alt="logo" className="barbel" id="5" onClick={handleSelect} />
                    <img src="./assets/bar10.jpg" alt="logo" className="barbel" id="10" onClick={handleSelect} />
                    <img src="./assets/bar15.jpg" alt="logo" className="barbel" id="15" onClick={handleSelect} />
                    <img src="./assets/bar20.jpg" alt="logo" className="barbel" id="20" onClick={handleSelect} />
                </div>

                {selectedBar ? <img src={barRefs[selectedBar]} alt="bar" id="bar" /> : <img src="./assets/bar20rep.jpg" alt="bar" id="bar" />}

            </div>

            <div className="right-side">
                {setup.plates.map((barb, index) => <img key={index} src={barbRefs[barb]}></img>)}
                {lock ? <img src="./assets/lock.jpg"></img> : ""}
            </div>

        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<App />)