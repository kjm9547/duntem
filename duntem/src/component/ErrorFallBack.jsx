import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        // 에러 발생 시 상태 업데이트
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // 에러 로깅
        this.setState({ error, errorInfo });
        console.error("Error caught in ErrorBoundary:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // 에러 발생 시 보여줄 UI
            return (
                <div>
                    <h1>Something went wrong.</h1>
                    <details style={{ whiteSpace: "pre-wrap" }}>
                        {this.state.error && this.state.error.toString()}
                        <br />
                        {this.state.errorInfo?.componentStack}
                    </details>
                </div>
            );
        }

        // 자식 컴포넌트를 렌더링
        return this.props.children;
    }
}

export default ErrorBoundary;
