import { useState, useEffect } from 'react'

const useFramePreloader = () => {
  const [loadedFrames, setLoadedFrames] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [loadProgress, setLoadProgress] = useState(0)
  const [preloadedImages, setPreloadedImages] = useState([])

  useEffect(() => {
    const totalFrames = 720
    const images = []
    let loaded = 0

    const preloadFrame = (frameNumber) => {
      return new Promise((resolve, reject) => {
        const img = new Image()
        const frameNum = frameNumber.toString().padStart(4, '0')
        img.src = `/frames/frame_${frameNum}.jpg`
        
        img.onload = () => {
          loaded++
          setLoadedFrames(loaded)
          setLoadProgress((loaded / totalFrames) * 100)
          images[frameNumber - 1] = img
          resolve(img)
        }
        
        img.onerror = () => {
          console.error(`Failed to load frame ${frameNumber}`)
          loaded++
          setLoadedFrames(loaded)
          setLoadProgress((loaded / totalFrames) * 100)
          resolve(null)
        }
      })
    }

    const loadAllFrames = async () => {
      const promises = []
      for (let i = 1; i <= totalFrames; i++) {
        promises.push(preloadFrame(i))
      }
      
      try {
        await Promise.all(promises)
        setPreloadedImages(images)
        setIsLoading(false)
      } catch (error) {
        console.error('Error loading frames:', error)
        setIsLoading(false)
      }
    }

    loadAllFrames()
  }, [])

  return {
    loadedFrames,
    isLoading,
    loadProgress,
    preloadedImages,
    totalFrames: 720
  }
}

export default useFramePreloader