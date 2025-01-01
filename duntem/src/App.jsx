import "./App.css";
import { RootRoutes } from "./routes/RootRoutes";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import ErrorBoundary from "./component/ErrorFallBack";
import { Suspense } from "react";

function App() {
    return (
        <>
            <ErrorBoundary>
                <Suspense fallback={<div>Loading Users...</div>}>
                    <Provider store={store}>
                        <PersistGate loading={null} persistor={persistor}>
                            <BrowserRouter>
                                <RootRoutes />
                            </BrowserRouter>
                        </PersistGate>
                    </Provider>
                </Suspense>
            </ErrorBoundary>
        </>
    );
}

export default App;
