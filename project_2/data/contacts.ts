export interface Contact {
    id: string;
    name: string;
    phone: string;
    email: string;
    company: string;
    address: string;
    avatar: string;
}

interface ContactSection {
    title: string;
    data: Contact[];
}

export const contactSections: ContactSection[] = [
    {
        title: 'A',
        data: [
            { id: '1', name: 'Андрій Коваль', phone: '+38 (067) 123-45-67', email: 'andrii.koval@gmail.com', company: 'TechSoft UA', address: 'вул. Хрещатик, 1, Київ', avatar: 'https://i.pravatar.cc/150?img=1' },
            { id: '2', name: 'Аліна Мороз', phone: '+38 (050) 234-56-78', email: 'alina.moroz@ukr.net', company: 'DesignHub', address: 'вул. Шевченка, 5, Львів', avatar: 'https://i.pravatar.cc/150?img=2' },
        ],
    },
    {
        title: 'Б',
        data: [
            { id: '3', name: 'Богдан Шевченко', phone: '+38 (063) 345-67-89', email: 'bohdan.shev@meta.ua', company: 'StartupHive', address: 'пр. Свободи, 12, Харків', avatar: 'https://i.pravatar.cc/150?img=3' },
            { id: '4', name: 'Богдана Лисенко', phone: '+38 (073) 456-78-90', email: 'bohdana.l@gmail.com', company: 'EduPlatform', address: 'вул. Грушевського, 7, Одеса', avatar: 'https://i.pravatar.cc/150?img=4' },
        ],
    },
    {
        title: 'В',
        data: [
            { id: '5', name: 'Василь Петренко', phone: '+38 (066) 567-89-01', email: 'vasyl.p@company.com', company: 'FinTech Pro', address: 'вул. Лесі Українки, 3, Дніпро', avatar: 'https://i.pravatar.cc/150?img=5' },
        ],
    },
    {
        title: 'Д',
        data: [
            { id: '6', name: 'Дарина Бондар', phone: '+38 (097) 678-90-12', email: 'daryna.bondar@outlook.com', company: 'MediaGroup', address: 'вул. Банкова, 9, Київ', avatar: 'https://i.pravatar.cc/150?img=6' },
            { id: '7', name: 'Денис Харченко', phone: '+38 (095) 789-01-23', email: 'denys.kh@ukr.net', company: 'AgriTech', address: 'вул. Незалежності, 15, Полтава', avatar: 'https://i.pravatar.cc/150?img=7' },
        ],
    },
    {
        title: 'М',
        data: [
            { id: '8', name: 'Марія Іваненко', phone: '+38 (050) 890-12-34', email: 'maria.iv@gmail.com', company: 'MedCare', address: 'вул. Соборна, 2, Вінниця', avatar: 'https://i.pravatar.cc/150?img=8' },
        ],
    },
    {
        title: 'О',
        data: [
            { id: '9', name: 'Олег Сидоренко', phone: '+38 (067) 901-23-45', email: 'oleg.sid@protonmail.com', company: 'CyberSec UA', address: 'вул. Академіка Вернадського, 22, Київ', avatar: 'https://i.pravatar.cc/150?img=9' },
            { id: '10', name: 'Оксана Ткаченко', phone: '+38 (063) 012-34-56', email: 'oksana.tk@gmail.com', company: 'LegalTech', address: 'вул. Пушкіна, 8, Запоріжжя', avatar: 'https://i.pravatar.cc/150?img=10' },
        ],
    },
];

export function findContactById(id: string): Contact | undefined {
    for (const section of contactSections) {
        const found = section.data.find(c => c.id === id);
        if (found) return found;
    }
    return undefined;
}
