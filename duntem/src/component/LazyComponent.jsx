import React, { Suspense } from "react";

const LazyComponent = React.lazy(() => import("./LazyComponent"));

function App() {
    return (
        <div>
            <h1>My App</h1>
            <Suspense fallback={<div>Loading Component...</div>}>
                <LazyComponent />
            </Suspense>
        </div>
    );
}

export default App;
