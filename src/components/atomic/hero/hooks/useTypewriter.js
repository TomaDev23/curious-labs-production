// hooks/useTypewriter.js - PERFORMANCE OPTIMIZED
import { useState, useEffect, useCallback, useRef } from 'react'

export const useTypewriter = (text, options = {}) => {
  const {
    speed = 50,           // ms per character
    delay = 500,          // initial delay
    pauseOnComplete = 1000, // pause before calling onComplete
    onComplete = null,
    onCharacter = null    // callback for each character (for effects)
  } = options

  const [displayText, setDisplayText] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const [isActive, setIsActive] = useState(false)
  
  // Performance optimization refs
  const animationRef = useRef()
  const lastUpdateRef = useRef(0)
  const currentIndexRef = useRef(0)

  // Start typewriter
  const start = useCallback(() => {
    setIsActive(true)
    currentIndexRef.current = 0
    setDisplayText('')
    setIsComplete(false)
    lastUpdateRef.current = 0
  }, [])

  // High-performance typewriter using requestAnimationFrame
  useEffect(() => {
    if (!isActive) return

    const animate = (timestamp) => {
      // Initial delay
      if (currentIndexRef.current === 0 && timestamp - lastUpdateRef.current < delay) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      // Check if it's time for next character
      if (timestamp - lastUpdateRef.current >= speed) {
        if (currentIndexRef.current < text.length) {
          const nextChar = text[currentIndexRef.current]
          
          // Batch update - reduce re-renders
          setDisplayText(text.slice(0, currentIndexRef.current + 1))
          currentIndexRef.current++
          lastUpdateRef.current = timestamp
          
          // Character callback for effects
          if (onCharacter) onCharacter(nextChar, currentIndexRef.current - 1)
        } else {
          // Animation complete
          setIsComplete(true)
          if (onComplete) {
            setTimeout(onComplete, pauseOnComplete)
          }
          return
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    // Start with initial timestamp
    lastUpdateRef.current = performance.now()
    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [text, speed, delay, isActive, pauseOnComplete, onComplete, onCharacter])

  return {
    displayText,
    isComplete,
    isActive,
    start,
    progress: text.length > 0 ? currentIndexRef.current / text.length : 0
  }
}