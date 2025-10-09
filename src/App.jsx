import React, { useState } from 'react'
import Loader from './components/loader'
import Home from './pages/Home'

import useFramePreloader from './hooks/useFramePreloader'

const App = () => {
  const [isLoaderComplete, setIsLoaderComplete] = useState(false)
  const { preloadedImages, isLoading } = useFramePreloader()

  const handleLoadComplete = () => {
    setIsLoaderComplete(true)
  }

  return (
    <div className="relative">
      {/* Show loader until complete */}
      {!isLoaderComplete && (
        <Loader onLoadComplete={handleLoadComplete} />
      )}
      
      {/* Show home page after loader completes */}
      {isLoaderComplete && (
        <Home preloadedImages={preloadedImages} />
      )}
    </div>
  )
}

export default App
