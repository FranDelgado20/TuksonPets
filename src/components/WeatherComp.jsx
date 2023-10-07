import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
const WeatherComp = () => {
  const [weather, setWeather] = useState({});

  const city = "San Miguel de Tucumán";
  const country = "AR";

  const getWeather = async () => {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=7c335b0c2600bd8036959eec6e72259a&units=metric`
    );
    setWeather(res.data);
  };
  useEffect(() => {
    getWeather();
  }, []);

  return (
    <Col lg={4} md={6} sm={12}>
      <Card className="fondo">
        {weather.weather ? (
            <div className="d-flex justify-content-center">

                <img
                  variant="top"
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                  alt="Icono del clima"
                  className="widthImg mx-1"
                  />
                  <h4 className="mt-3 mx-1">{weather?.main?.temp} ºC</h4>
            </div>
        ) : (
          ""
        )}

        <Card.Body>
          <Card.Title className="text-center">{city} | {country}</Card.Title>
          <hr />
        </Card.Body>
      </Card>
    </Col>
  );
};

export default WeatherComp;
