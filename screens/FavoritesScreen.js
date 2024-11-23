import { useDispatch, useSelector } from "react-redux";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Avatar, ListItem } from "react-native-elements";
import Loading from "../components/LoadingComponent";
import { baseUrl } from "../shared/baseUrl";
import { SwipeRow } from "react-native-swipe-list-view";
import { toggleFavorite } from "../features/favorites/favoritesSlice";

const FavoritesScreen = ({ navigation }) => {
  const { campsitesArray, isLoading, errMess } = useSelector(
    (state) => state.campsites
  );
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  const renderFavoriteItem = ({ item: campsite }) => {
    return (
      <SwipeRow rightOpenValue={-100}>
        <View
          style={styles.deleteView}
          onPress={() => dispatch(toggleFavorite(campsite.id))}
        >
          <TouchableOpacity
            style={styles.deleteTouchable}
            onPress={() => dispatch(toggleFavorite(campsite.id))}
          >
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
        <View>
          <ListItem
            onPress={() =>
              navigation.navigate("DirectoryNav", {
                //Directory refers to the DirectoryNavigator which has DirectoryScreen as its initial route,
                //hence why we get the directory screen first. In MainComponent.js, the DirectoryNavigator is registered as DirectoryNav.
                //By specifying screen: "CampsiteInfo", we are telling the navigator to navigate to the CampsiteInfoScreen.
                screen: "CampsiteInfo",
                params: { campsite },
              })
            }
          >
            <Avatar rounded source={{ uri: baseUrl + campsite.image }} />
            <ListItem.Content>
              <ListItem.Title>{campsite.name}</ListItem.Title>
              <ListItem.Subtitle>{campsite.description}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        </View>
      </SwipeRow>
    );
  };

  if (isLoading) {
    return <Loading />;
  }

  if (errMess) {
    return (
      <View>
        <Text>{errMess}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={campsitesArray.filter((campsite) =>
        favorites.includes(campsite.id)
      )}
      renderItem={renderFavoriteItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  deleteView: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    flex: 1,
  },
  deleteTouchable: {
    backgroundColor: "red",
    justifyContent: "center",
    height: "100%",
  },
  deleteText: {
    color: "white",
    fontWeight: "700",
    textAlign: "center",
    width: 100,
    fontSize: 16,
  },
});

export default FavoritesScreen;
