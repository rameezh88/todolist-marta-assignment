# Getting Started

## Step 1: Start the Project

Start off by running the following command:

```bash
yarn && yarn pod:install
```

This will complete the basic setup of the project.

Then, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

**Note**: You will need to install `JDK` 17 if you don't have it already installed. You can do so by following the instructions [here](https://www.codejava.net/java-se/install-oracle-jdk-17-on-macos), or by looking up similar guides online.

## Step 2: Start the local mock server

Please make sure you have `json-server` locally installed. If not, you can do so by using either of the following commands:

```bash
npm install -g json-server
```

or

```bash
yarn global add json-server

```

Then run:

```bash
yarn start:mock:server
```

## Step 3: Start the Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
yarn android
```

### For iOS

```bash
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly. Therefore, please make sure that you have the iOS simulator and Android Emulator installed on your system.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

# How the app works

The app is structured according the specifications provided via email. I skipped the bonus features and also some that were challenging. I have elaborated on these in the "Challenges" section below.

### Screen recordings:

I have used some generated "lorem-ipsum" dummy data for demo purposes. It's not the prettiest, but it should demonstrate the main functionalities of the app.

#### iOS

# Key technologies used

The following libraries have been used in this implementation. Each of them has either been picked because they are industry standard, or because I've used them before and found them to be a good choice for `React Native` projects in general.

- `redux-toolkit` with `redux-persist`

Used to store state data in slices. The `saved` slice data is persisted. `AsyncStorage` from `@react-native-async-storage/async-storage` is used as the storage.

- `react-native-vector-icons`

Some simple graphics are shown using `react-native-vector-icons`.

- `styled-components`

I prefer to use `styled-components` as it leads to a cleaner and more readable render function in the components.

- `react-navigation`

Library that manages the navigation in the app.

- `patch-package`

I've used this in my other projects, and I needed to use it here as there were some issues with the `react-native-vector-icons` and the `react-native-paper` libraries that needed to be fixed.

- `@react-native-community/datetimepicker`

To facilitate picking of due-date for the todo item.

- `@react-native-community/netinfo`

To check the change in Internet connection status so we can initiate a sync when the app comes online.

- `@shopify/flash-list`

A more performant and feature-rich alternative to the unbuilt `FlatList` from `React Native`.

- `react-native-localize`

Not fully functional, but potentially to get the user's timezone data for better handling of due dates when the timezone changes.

- `react-native-paper`

UI library with a lot of cool components. I've used their `Dialog` to show confirmation dialogs, and also their `Checkbox` component.

- `date-fns`

Provides a lot of convenience functions for operations related to dates like comparing, formatting, or finding the difference in time between them.

- `lodash`

Also provides a lot of convenience functions. In this project notably, I have used the `throttle` to when loading more paginated items, so we don't load more than one page at a time, and `debounce` to limit the number of times the operation to create or update a todo item is performed within a timeframe.

# Troubleshooting

If you have issues running the project, shut down all simulators and emulators, close _Xcode_ and _Android Studio_, and run the following command:

```bash
yarn clean
```

In case of _Android_, you might also try running, before running `yarn android`:

```bash
yarn android:gradle:clean:build
```

## Challenges

1. Setting up code-splitting. I haven’t worked with it before, and I wasn’t able to find a good reason to implement code-splitting in a small app like this. This would be something I’ll need to brush my knowledge up on.
2. Syncing of items between backend and between two instances of the app (iOS and Android, for example) isn’t working as expected. The redux action `replaceItems` especially doesn’t work as expected. I would put effort into trying to fix this if I had more time.
3. There were issues related to `JDK` 21, which caused problems with the Android build. I had to change it to `JDK` 17.
4. Dark mode on my Android device was causing the text to not be shown, so I had force disable it using this the `Android` `styles.xml` file:

```xml
<item name="android:forceDarkAllowed">false</item>
```

And change

```xml
<style name="AppTheme" parent="Theme.AppCompat.DayNight.NoActionBar">
```

to

```xml
<style name="AppTheme" parent="Theme.AppCompat.Light.NoActionBar">
```

## Improvements

1. Fixing time-zone logic: I would include time-zone data so the due-dates of the todos are updated accordingly if the user is travelling between time-zones.
2. Fixing human-readable due date: The human-readability of the dates isn't ideal right now. I would fix this to make them more grammatically correct.
3. Reset the sort-option to creation date when creating a new todo item.
4. Confirmation dialog when cancelling add/edit todo item.
5. Write tests.
6. Syncing:
   1. Better, more robust syncing strategies.
   2. Better security.
   3. Better strategy for handling large amounts of data.
   4. Now the app syncs in all network types. Could be better to change that to only specific cases in future iterations.
   5. Better testing to see if the syncing works better when the network status changes.
