/**
 * Image Optimization Utilities
 * 
 * Provides support for WebP format with fallback
 * and responsive image loading with srcSet generation
 */

/**
 * Gets the WebP version of an image path with fallback to original
 * @param {string} imagePath - Original image path
 * @returns {string} Path to WebP version or original if WebP doesn't exist
 */
export const getOptimizedImagePath = (imagePath) => {
  if (!imagePath) return '';
  
  // Extract the file name and extension
  const pathParts = imagePath.split('/');
  const fileName = pathParts[pathParts.length - 1];
  const fileNameParts = fileName.split('.');
  const extension = fileNameParts.pop().toLowerCase();
  const baseName = fileNameParts.join('.');
  
  // Only convert jpg/png to webp
  if (!['jpg', 'jpeg', 'png'].includes(extension)) {
    return imagePath;
  }
  
  // Create webp path
  const webpPath = `/images/webp/${baseName}.webp`;
  
  return webpPath;
};

/**
 * Generates responsive image variants for different screen sizes
 * @param {string} basePath - Base image path
 * @param {Array} sizes - Array of size objects with width and suffix
 * @returns {Object} Object containing srcSet strings for different formats
 */
export const generateResponsiveSrcSet = (basePath, sizes = [
  { width: 320, suffix: '_mobile' },
  { width: 768, suffix: '_tablet' }, 
  { width: 1200, suffix: '_desktop' },
  { width: 1920, suffix: '_xl' }
]) => {
  if (!basePath) return { webp: '', fallback: '' };
  
  const pathParts = basePath.split('/');
  const fileName = pathParts[pathParts.length - 1];
  const fileNameParts = fileName.split('.');
  const extension = fileNameParts.pop().toLowerCase();
  const baseName = fileNameParts.join('.');
  const basePath_noFile = pathParts.slice(0, -1).join('/');
  
  // Generate WebP srcSet
  const webpSrcSet = sizes.map(size => {
    const webpPath = `${basePath_noFile}/webp/${baseName}${size.suffix}.webp ${size.width}w`;
    return webpPath;
  }).join(', ');
  
  // Generate fallback srcSet
  const fallbackSrcSet = sizes.map(size => {
    const fallbackPath = `${basePath_noFile}/${baseName}${size.suffix}.${extension} ${size.width}w`;
    return fallbackPath;
  }).join(', ');
  
  return {
    webp: webpSrcSet,
    fallback: fallbackSrcSet,
    original: basePath
  };
};

/**
 * Calculates optimal image dimensions based on container and aspect ratio
 * @param {Object} options - Configuration options
 * @param {number} options.containerWidth - Container width in pixels
 * @param {number} options.aspectRatio - Desired aspect ratio (width/height)
 * @param {number} options.maxWidth - Maximum image width
 * @param {number} options.maxHeight - Maximum image height
 * @returns {Object} Calculated width and height
 */
export const calculateImageDimensions = ({ 
  containerWidth = 800, 
  aspectRatio = 16/9, 
  maxWidth = 1920, 
  maxHeight = 1080 
}) => {
  let width = Math.min(containerWidth, maxWidth);
  let height = Math.round(width / aspectRatio);
  
  // Ensure height doesn't exceed maximum
  if (height > maxHeight) {
    height = maxHeight;
    width = Math.round(height * aspectRatio);
  }
  
  return { width, height };
};

/**
 * Enhanced OptimizedImage component with responsive capabilities
 * @param {Object} props - Component properties
 * @param {string} props.src - Original image source
 * @param {string} props.alt - Image alt text
 * @param {Array} props.sizes - Responsive sizes array
 * @param {string} props.sizesAttr - CSS sizes attribute value
 * @param {number} props.width - Image width
 * @param {number} props.height - Image height
 * @param {number} props.aspectRatio - Aspect ratio for layout stability
 * @param {Object} props.imgProps - Additional image props (className, etc)
 * @returns {JSX.Element} Picture element with responsive WebP and fallback
 */
export const OptimizedImage = ({ 
  src, 
  alt, 
  sizes,
  sizesAttr = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  width,
  height,
  aspectRatio,
  imgProps = {} 
}) => {
  // Generate responsive srcSets if sizes provided
  const responsiveImages = sizes ? generateResponsiveSrcSet(src, sizes) : null;
  
  // Use responsive or single image approach
  const webpSrc = responsiveImages ? responsiveImages.webp : getOptimizedImagePath(src);
  const fallbackSrc = responsiveImages ? responsiveImages.fallback : src;
  
  // Calculate stable dimensions if aspect ratio provided
  const stableDimensions = aspectRatio && width ? 
    calculateImageDimensions({ containerWidth: width, aspectRatio }) : 
    { width, height };
  
  return (
    <picture>
      {responsiveImages ? (
        <>
          <source 
            srcSet={webpSrc} 
            sizes={sizesAttr}
            type="image/webp" 
          />
          <source 
            srcSet={fallbackSrc} 
            sizes={sizesAttr}
            type={`image/${src.endsWith('.png') ? 'png' : 'jpeg'}`} 
          />
        </>
      ) : (
        <>
          <source srcSet={webpSrc} type="image/webp" />
          <source srcSet={src} type={`image/${src.endsWith('.png') ? 'png' : 'jpeg'}`} />
        </>
      )}
      <img 
        src={responsiveImages ? responsiveImages.original : src} 
        alt={alt || ''} 
        width={stableDimensions.width}
        height={stableDimensions.height}
        style={{
          aspectRatio: aspectRatio ? `${aspectRatio}` : undefined,
          ...imgProps.style
        }}
        {...imgProps} 
      />
    </picture>
  );
};

export default {
  getOptimizedImagePath,
  generateResponsiveSrcSet,
  calculateImageDimensions,
  OptimizedImage
}; 