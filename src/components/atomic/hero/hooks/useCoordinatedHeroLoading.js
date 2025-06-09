import { useState, useCallback } from 'react'

const useCoordinatedHeroLoading = () => {
  const [typewriterComplete, setTypewriterComplete] = useState(false)

  const handleTypewriterComplete = useCallback(() => {
    setTypewriterComplete(true)
  }, [])

  return {
    typewriterComplete,
    handleTypewriterComplete
  }
}

export default useCoordinatedHeroLoading 