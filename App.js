// This is the first file that ReactNative will run when it starts up.
import App from "./app/app.tsx"
import { registerRootComponent } from "expo"
import "react-native-gesture-handler"

registerRootComponent(App)
export default App
