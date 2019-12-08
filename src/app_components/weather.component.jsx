import React from 'react'

const Weather = props => {
    return (
        <div className="card">
            <div className="card-body">
            <h1 className="card-title">{props.city}, {props.country}</h1>
                <h5 className="card-text text-muted">{props.description}</h5>
                <h1 className="card-text py-2 d-flex align-items-center justify-content-around">
                    <img src={props.icon} />
                    <span className="main-temp">{props.temp}&deg;</span>
                </h1>

                {/* Show Min Max Temp */}
                {minMaxTemp(props.minTemp, props.maxTemp)}
            </div>
        </div>
    );
}

//Returns minimum and maximum temperature
function minMaxTemp(min, max) {
    return (
        <div className="row min-max-temp">
            <div className="col-6">
                <p>Max Temp <br />{max}&deg;</p>
            </div>
            <div className="col-6">
                <p>Min Temp <br />{min}&deg;</p>
            </div>
        </div>
    );
}

export default Weather;

