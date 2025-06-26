import React from 'react';
import { useLazyLoad } from '../../hooks/useLazyLoad';
import { motion } from '../../FramerProvider';
import { OptimizedImage, calculateImageDimensions } from '../../utils/imageOptimizer.jsx';

/**
 * LazyImage - Only loads the image when it's about to enter the viewport
 * With optional fade-in animation and responsive image support
 * 
 * @param {string} src - Image source URL
 * @param {string} alt - Image alt text
 * @param {string} className - Additional CSS classes
 * @param {string} placeholderColor - Background color while loading
 * @param {number|string} width - Image width
 * @param {number|string} height - Image height
 * @param {number} aspectRatio - Aspect ratio for layout stability (width/height)
 * @param {Array} responsiveSizes - Array of responsive size configurations
 * @param {string} sizesAttr - CSS sizes attribute for responsive images
 * @param {boolean} animate - Whether to animate the image in
 * @param {boolean} useOptimized - Whether to use OptimizedImage with WebP support
 * @param {Object} lazyLoadOptions - Custom options for useLazyLoad hook
 * @param {Object} props - Additional props to pass to the container
 */
const LazyImage = ({
  src,
  alt,
  className = '',
  placeholderColor = 'bg-gray-900',
  width,
  height,
  aspectRatio,
  responsiveSizes,
  sizesAttr = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  animate = true,
  useOptimized = true,
  lazyLoadOptions = {},
  ...props
}) => {
  // Use custom lazy load options with fallback to default
  const lazyOptions = {
    rootMargin: '200px',
    threshold: 0.1,
    ...lazyLoadOptions
  };
  
  const [ref, isVisible] = useLazyLoad(lazyOptions);
  
  // Calculate stable dimensions for layout stability
  const stableDimensions = React.useMemo(() => {
    if (aspectRatio && width) {
      return calculateImageDimensions({ 
        containerWidth: typeof width === 'string' ? parseInt(width) : width, 
        aspectRatio 
      });
    }
    return { width, height };
  }, [width, height, aspectRatio]);
  
  // Container style with aspect ratio support
  const containerStyle = React.useMemo(() => {
    const baseStyle = { 
      width: stableDimensions.width, 
      height: stableDimensions.height 
    };
    
    if (aspectRatio) {
      baseStyle.aspectRatio = `${aspectRatio}`;
    }
    
    return baseStyle;
  }, [stableDimensions, aspectRatio]);
  
  return (
    <div
      ref={ref}
      className={`overflow-hidden ${placeholderColor} ${className}`}
      style={containerStyle}
      {...props}
    >
      {isVisible && (
        <motion.div
          className="w-full h-full"
          initial={animate ? { opacity: 0 } : { opacity: 1 }}
          animate={animate ? { opacity: 1 } : { opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {useOptimized ? (
            <OptimizedImage
              src={src}
              alt={alt || ''}
              sizes={responsiveSizes}
              sizesAttr={sizesAttr}
              width={stableDimensions.width}
              height={stableDimensions.height}
              aspectRatio={aspectRatio}
              imgProps={{
                className: "w-full h-full object-cover",
                loading: "lazy" // Native browser lazy loading as backup
              }}
            />
          ) : (
            <img
              src={src}
              alt={alt || ''}
              className="w-full h-full object-cover"
              width={stableDimensions.width}
              height={stableDimensions.height}
              style={{
                aspectRatio: aspectRatio ? `${aspectRatio}` : undefined
              }}
              loading="lazy" // Native browser lazy loading as backup
            />
          )}
        </motion.div>
      )}
    </div>
  );
};

export default LazyImage; 