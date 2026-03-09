// Setup MUST be the first import — configures theme before any styled() calls
import "./setup"

import { registerRootComponent } from "expo"
import { App } from "./src/App"

registerRootComponent(App)
