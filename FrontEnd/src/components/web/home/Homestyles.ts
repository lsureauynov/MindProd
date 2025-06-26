import { keyframes } from '@emotion/react';
import type { SystemStyleObject } from '@chakra-ui/react';

export const pulse = keyframes`
    0% { transform: scale(1); opacity: 0.3; }
    50% { transform: scale(1.05); opacity: 0.6; }
    100% { transform: scale(1); opacity: 0.3; }
`;

export const pulseAnimation = `${pulse} 4s infinite`;

export const styles: { [key: string]: SystemStyleObject } = {
    main: {
        minH: '100vh',
        bg: 'gray.900',
        bgGradient: 'radial-gradient(circle at 30% 20%, rgba(66, 153, 225, 0.15) 0%, rgba(0, 0, 0, 0.9) 70%)',
        position: 'relative',
        overflow: 'hidden',
    },
    particle: {
        position: 'absolute',
        top: '20%',
        left: '70%',
        transform: 'translate(-50%, -50%)',
        width: '800px',
        height: '800px',
        borderRadius: 'full',
        bg: 'brand.primary.500',
        filter: 'blur(200px)',
        opacity: '0.1',
        animation: pulseAnimation,
    },
    particleSecondary: {
        position: 'absolute',
        top: '70%',
        left: '20%',
        width: '400px',
        height: '400px',
        borderRadius: 'full',
        bg: 'brand.accent.500',
        filter: 'blur(120px)',
        opacity: '0.08',
    },
    heroBadge: {
        bg: 'rgba(66, 153, 225, 0.1)',
        borderColor: 'brand.primary.500',
        color: 'brand.primary.300',
        px: 4,
        py: 2,
        borderRadius: 'full',
        borderWidth: '1px',
        fontSize: 'sm',
        fontWeight: 'medium',
    },
    heroTitle: {
        fontSize: { base: '2xl', md: '4xl', lg: '5xl' },
        textAlign: 'center',
        fontFamily: 'heading',
        color: 'white',
        letterSpacing: 'tight',
        lineHeight: '1.2',
    },
    heroTitleAccent: {
        bgGradient: 'linear(to-r, brand.primary.400, brand.secondary.400)',
        bgClip: 'text',
    },
    heroSubtitle: {
        fontSize: { base: 'lg', md: 'xl' },
        textAlign: 'center',
        color: 'whiteAlpha.800',
        maxW: '800px',
        lineHeight: '1.6',
    },
    ctaPrimary: {
        bgGradient: 'linear(to-r, brand.primary.500, brand.secondary.500)',
        color: 'white',
        _hover: {
            bgGradient: 'linear(to-r, brand.primary.600, brand.secondary.600)',
            transform: 'translateY(-2px)',
            boxShadow: 'xl',
        },
        _active: {
            transform: 'translateY(0)',
        },
        transition: 'all 0.2s',
    },
    ctaSecondary: {
        variant: 'outline',
        borderColor: 'white',
        color: 'white',
        borderWidth: '2px',
        _hover: {
            bg: 'white',
            color: 'gray.900',
            transform: 'translateY(-2px)',
            borderColor: 'white',
        },
        _active: {
            transform: 'translateY(0)',
        },
        transition: 'all 0.2s',
    },
    featuresGrid: {
        templateColumns: { base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
        gap: { base: 6, md: 8 },
        w: 'full',
    },
    featureCard: {
        bg: 'rgba(26, 32, 44, 0.6)',
        borderColor: 'whiteAlpha.200',
        borderWidth: '1px',
        borderRadius: 'xl',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.3s',
        _hover: {
            transform: 'translateY(-8px)',
            boxShadow: '2xl',
            borderColor: 'brand.primary.500',
        },
    },
    featureIconBox: {
        w: '60px',
        h: '60px',
        borderRadius: 'xl',
        bg: 'rgba(66, 153, 225, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: '1px',
        borderColor: 'brand.primary.500',
    },
    featureIcon: {
        fontSize: '24px',
        color: 'brand.primary.400',
    },
    finalCta: {
        bg: 'rgba(26, 32, 44, 0.8)',
        borderRadius: '2xl',
        p: { base: 8, md: 12 },
        borderWidth: '1px',
        borderColor: 'whiteAlpha.200',
        backdropFilter: 'blur(10px)',
        position: 'relative',
        _before: {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: '2xl',
            padding: '1px',
            background: 'linear-gradient(135deg, rgba(66, 153, 225, 0.5), rgba(72, 187, 120, 0.5))',
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'exclude',
        },
    },
    finalCtaButton: {
        bgGradient: 'linear(to-r, brand.primary.500, brand.secondary.500)',
        color: 'white',
        size: 'lg',
        px: 8,
        py: 3,
        _hover: {
            bgGradient: 'linear(to-r, brand.primary.600, brand.secondary.600)',
            transform: 'translateY(-2px)',
            boxShadow: 'xl',
        },
        _active: {
            transform: 'translateY(0)',
        },
        transition: 'all 0.2s',
    },
};
