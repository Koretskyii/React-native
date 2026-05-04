import CustomDrawerContent from '@/components/drawer/CustomDrawerContent';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Drawer } from 'expo-router/drawer';

export default function DrawerLayout() {
  return (
    <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: 'Головна',
          title: 'Головна',
          drawerIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Drawer.Screen
        name="(news)"
        options={{
          drawerLabel: 'Новини',
          drawerIcon: ({ color }) => <IconSymbol size={28} name="newspaper.fill" color={color} />,
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="(contacts)"
        options={{
          drawerLabel: 'Контакти',
          drawerIcon: ({ color }) => <IconSymbol size={28} name="person.2.fill" color={color} />,
          headerShown: false,
          title: 'Контакти',
        }}
      />
    </Drawer>
  );
}
