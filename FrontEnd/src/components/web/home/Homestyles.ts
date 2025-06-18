import { keyframes } from '@emotion/react';
import type { SystemStyleObject } from '@chakra-ui/react';

export const pulse = keyframes`
    0% { transform: scale(1); opacity: 0.5; }
    50% { transform: scale(1.05); opacity: 0.8; }
    100% { transform: scale(1); opacity: 0.5; }
`;

export const pulseAnimation = `${pulse} 3s infinite`;

export const styles: { [key: string]: SystemStyleObject } = {
    main: {
        minH: '100vh',
        bg: 'gray.900',
        bgGradient: 'radial-gradient(circle at 50% 50%, rgba(66, 153, 225, 0.1) 0%, rgba(0, 0, 0, 0.8) 100%)',
        position: 'relative',
        overflow: 'hidden',
        content: '""',
    },
    particle: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '600px',
        borderRadius: 'full',
        bg: 'brand.primary.500',
        filter: 'blur(150px)',
        opacity: '0.15',
        animation: pulseAnimation,
    },
    title: {
        fontSize: { base: '2xl', md: '3xl', lg: '4xl' },
        textAlign: 'center',
        fontFamily: 'heading',
        bgGradient: 'linear(to-r, brand.primary.500, brand.secondary.500)',
        bgClip: 'text',
        letterSpacing: 'tight',
    },
    subtitle: {
        fontSize: { base: 'lg', md: 'xl' },
        textAlign: 'center',
        color: 'whiteAlpha.900',
        maxW: '800px',
    },
    ctaPrimary: {
        colorScheme: 'blue',
        bgGradient: 'linear(to-r, brand.primary.500, brand.secondary.500)',
        _hover: {
            bgGradient: 'linear(to-r, brand.primary.600, brand.secondary.600)',
            transform: 'translateY(-2px)',
        },
    },
    ctaSecondary: {
        variant: 'outline',
        borderColor: 'brand.primary.500',
        color: 'brand.primary.500',
        _hover: {
            bg: 'whiteAlpha.100',
            transform: 'translateY(-2px)',
        },
    },
    grid: {
        templateColumns: { base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
        gap: 8,
        w: 'full',
        mt: 16,
    },
    feature: {
        p: 6,
        bg: 'rgba(26, 32, 44, 0.8)',
        borderRadius: 'xl',
        borderWidth: '1px',
        borderColor: 'whiteAlpha.200',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.3s',
        _hover: {
            transform: 'translateY(-8px)',
            boxShadow: '2xl',
        },
    },
};
