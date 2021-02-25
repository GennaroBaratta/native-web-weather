export default async function locationHandler({ query: { city } }, res) {
  const response = await fetch(
    `https://www.metaweather.com/api/location/search/?query=${city}`
  );
  const locations = await response.json();
  if (!!locations[0]) res.status(200).json({ id: locations[0].woeid });
  else res.status(404).json({ message: `City '${city}' not found` });
}
