import { useEffect, useReducer, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ImageBackground,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import useSWR from "swr";

import getImageForWeather from "../utils/getImageForWeather";

import SearchInput from "../components/SearchInput";

const initialState = {
  loading: false,
  error: false,
  location: "",
  temperature: 0,
  weather: "",
};
const actionType = {
  CITY: "city",
  ERROR: "error",
  SUCCESS: "success",
};
function reducer(state, action) {
  switch (action.type) {
    case actionType.ERROR:
      return { ...state, loading: false, error: true };
    case actionType.SUCCESS:
      return { ...state, loading: false, error: false, ...action.payload };
    case actionType.CITY:
      return { ...state, location: action.payload, loading: true };
    default:
      throw new Error();
  }
}

export default function App(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetcher = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);

    if (res.status !== 200) {
      dispatch({ type: actionType.ERROR, payload: data.message });
      throw new Error(data.message);
    }

    return data;
  };
  const { data: id } = useSWR(
    () => state.location && `/api/location/${state.location}`,
    fetcher,
    { refreshInterval: 60000, revalidateOnFocus: false }
  );
  useSWR(
    () => id && `/api/weather/${id.id}`,
    async (url) => {
      try {
        const data = await fetcher(url);
        dispatch({ type: actionType.SUCCESS, payload: data });
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    { refreshInterval: 60000, revalidateOnFocus: false }
  );

  const handleUpdateLocation = async (city) => {
    if (!city) return;

    dispatch({
      type: actionType.CITY,
      payload: city,
    });
  };

  useEffect(() => {
    handleUpdateLocation("London");
  }, []);
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <StatusBar barStyle="light-content" />

      <ImageBackground
        source={getImageForWeather(state.weather)}
        style={styles.imageContainer}
        imageStyle={styles.image}
      >
        <View style={styles.detailsContainer}>
          <ActivityIndicator
            animating={state.loading}
            color="white"
            size="large"
          />
          {!state.loading && (
            <View>
              {state.error && (
                <Text style={[styles.smallText, styles.textStyle]}>
                  Could not load weather, please try a different city.
                </Text>
              )}
              {!state.error && (
                <View>
                  <Text style={[styles.largeText, styles.textStyle]}>
                    {state.location}
                  </Text>
                  <Text style={[styles.smallText, styles.textStyle]}>
                    {state.weather}
                  </Text>
                  <Text style={[styles.largeText, styles.textStyle]}>
                    {`${Math.round(state.temperature)}°`}
                  </Text>
                </View>
              )}
            </View>
          )}

          <SearchInput
            placeholder="Search any city"
            onSubmit={handleUpdateLocation}
          ></SearchInput>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
  },
  textStyle: {
    textAlign: "center",
    color: "white",
  },
  largeText: {
    fontSize: 44,
    fontFamily: "Courier Prime" || "monospace",
  },
  smallText: {
    fontSize: 18,
    fontFamily: "Montserrat" || "sansSerif",
  },
  textInput: {
    backgroundColor: "#adadad",
    color: "white",
    height: 40,
    width: 300,
    marginTop: 20,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    alignSelf: "center",
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover",
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    paddingHorizontal: 20,
  },
});
