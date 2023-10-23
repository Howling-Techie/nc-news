import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {Theme} from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Theme accentColor="red">
            <body>
            <App/>
            </body>
        </Theme>
    </React.StrictMode>,
);
