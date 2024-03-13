import * as Location from 'expo-location';
import * as Maps from 'expo-maps';

const apiKey = 'AIzaSyC0EqK6_X5dXw-wBe7e9nObZkjeCoRULV0';

const [location, setLocation] = useState(null);

useEffect(() => {
  (async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permissão de localização negada.');
      return;
    }

    const currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation);
  })();
}, []);


const MapView = ({ location }) => {
  if (!location) {
    return null;
  }

  const { latitude, longitude } = location.coords;

  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    />
  );
};

