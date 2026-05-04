export const PROFILE_DATA = {
    avatar: require('@/assets/images/profile.jpg'),
    firstName: 'Юрій',
    lastName: 'Корецький',
    username: '@yurii.koretskyi',
    bio: 'Full stack developer & React enthusiast. Coding, workout and rock-n-roll 🚀',
    info: [
        { icon: 'mail-outline' as const, label: 'Email', value: 'yurii@example.com' },
        { icon: 'call-outline' as const, label: 'Телефон', value: '+380 99 123 4567' },
        { icon: 'location-outline' as const, label: 'Місто', value: 'Житомир, Україна' },
        { icon: 'school-outline' as const, label: 'Університет', value: 'ДУ `Житомирська політехніка`' },
    ],
    stats: [
        { label: 'Проєкти', value: 12 },
        { label: 'Підписники', value: 248 },
        { label: 'Підписки', value: 89 },
    ],
};