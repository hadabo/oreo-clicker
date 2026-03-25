import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Game Error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Oops! Something went wrong with the Oreo Clicker.</h2>
          <p>Try refreshing the page to continue playing.</p>
          <button onClick={() => window.location.reload()}>
            Refresh Game
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
