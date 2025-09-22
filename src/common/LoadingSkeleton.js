import React from 'react';
import { Box, Skeleton } from '@mui/material';

const LoadingSkeleton = ({
  type = 'card', // 'card', 'text', 'avatar', 'list', 'hero', 'custom'
  variant = 'rectangular',
  width = '100%',
  height,
  lines = 3,
  count = 1,
  animation = 'wave',
  ...props
}) => {
  const getSkeletonHeight = () => {
    switch (type) {
      case 'card':
        return height || 300;
      case 'text':
        return height || 20;
      case 'avatar':
        return height || 40;
      case 'list':
        return height || 60;
      case 'hero':
        return height || 400;
      default:
        return height || 'auto';
    }
  };

  const renderCardSkeleton = () => (
    <Box sx={{ p: 2 }}>
      {/* Image */}
      <Skeleton
        variant="rectangular"
        width="100%"
        height={200}
        animation={animation}
        sx={{ mb: 2, borderRadius: 1 }}
      />
      
      {/* Title */}
      <Skeleton
        variant="text"
        width="80%"
        height={28}
        animation={animation}
        sx={{ mb: 1 }}
      />
      
      {/* Description lines */}
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          variant="text"
          width={index === lines - 1 ? '60%' : '100%'}
          height={20}
          animation={animation}
          sx={{ mb: 0.5 }}
        />
      ))}
      
      {/* Tags */}
      <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton
            key={index}
            variant="rectangular"
            width={60}
            height={24}
            animation={animation}
            sx={{ borderRadius: 3 }}
          />
        ))}
      </Box>
    </Box>
  );

  const renderTextSkeleton = () => (
    <>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          variant="text"
          width={index === lines - 1 ? '70%' : '100%'}
          height={getSkeletonHeight()}
          animation={animation}
          sx={{ mb: 0.5 }}
        />
      ))}
    </>
  );

  const renderListSkeleton = () => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 1 }}>
      {/* Avatar */}
      <Skeleton
        variant="circular"
        width={40}
        height={40}
        animation={animation}
      />
      
      {/* Content */}
      <Box sx={{ flexGrow: 1 }}>
        <Skeleton
          variant="text"
          width="60%"
          height={20}
          animation={animation}
          sx={{ mb: 0.5 }}
        />
        <Skeleton
          variant="text"
          width="40%"
          height={16}
          animation={animation}
        />
      </Box>
    </Box>
  );

  const renderHeroSkeleton = () => (
    <Box sx={{ textAlign: 'center', py: 8 }}>
      {/* Main title */}
      <Skeleton
        variant="text"
        width="80%"
        height={60}
        animation={animation}
        sx={{ mx: 'auto', mb: 2 }}
      />
      
      {/* Subtitle */}
      <Skeleton
        variant="text"
        width="60%"
        height={32}
        animation={animation}
        sx={{ mx: 'auto', mb: 3 }}
      />
      
      {/* Description */}
      {Array.from({ length: 2 }).map((_, index) => (
        <Skeleton
          key={index}
          variant="text"
          width={index === 1 ? '50%' : '70%'}
          height={20}
          animation={animation}
          sx={{ mx: 'auto', mb: 0.5 }}
        />
      ))}
      
      {/* Buttons */}
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 4 }}>
        <Skeleton
          variant="rectangular"
          width={120}
          height={40}
          animation={animation}
          sx={{ borderRadius: 1 }}
        />
        <Skeleton
          variant="rectangular"
          width={120}
          height={40}
          animation={animation}
          sx={{ borderRadius: 1 }}
        />
      </Box>
    </Box>
  );

  const renderAvatarSkeleton = () => (
    <Skeleton
      variant="circular"
      width={getSkeletonHeight()}
      height={getSkeletonHeight()}
      animation={animation}
    />
  );

  const renderCustomSkeleton = () => (
    <Skeleton
      variant={variant}
      width={width}
      height={getSkeletonHeight()}
      animation={animation}
      {...props}
    />
  );

  const renderSkeleton = () => {
    switch (type) {
      case 'card':
        return renderCardSkeleton();
      case 'text':
        return renderTextSkeleton();
      case 'list':
        return renderListSkeleton();
      case 'hero':
        return renderHeroSkeleton();
      case 'avatar':
        return renderAvatarSkeleton();
      case 'custom':
        return renderCustomSkeleton();
      default:
        return renderCustomSkeleton();
    }
  };

  // Render multiple skeletons if count > 1
  if (count > 1) {
    return (
      <Box sx={{ ...props.sx }}>
        {Array.from({ length: count }).map((_, index) => (
          <Box key={index} sx={{ mb: type === 'card' ? 3 : 1 }}>
            {renderSkeleton()}
          </Box>
        ))}
      </Box>
    );
  }

  return (
    <Box sx={{ ...props.sx }}>
      {renderSkeleton()}
    </Box>
  );
};

export default LoadingSkeleton;