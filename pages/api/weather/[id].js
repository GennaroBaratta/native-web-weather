export default async function weatherHandler({ query: { id } }, res) {
  const response = await fetch(
    `https://www.metaweather.com/api/location/${id}/`
  );
  const { title, consolidated_weather } = await response.json();
  const { weather_state_name, the_temp } = consolidated_weather[0];

  res.status(200).json({
    location: title,
    weather: weather_state_name,
    temperature: the_temp,
  });
}
