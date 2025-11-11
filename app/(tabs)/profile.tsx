import { SignOutButton } from '@/components/auth/singout';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { ScrollView } from '@/components/ui/scroll-view';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useUserStore } from '@/store/useUserStore';

import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';


export default function ProfileScreen() {
  // const router = useRouter();
  const bottom = useBottomTabBarHeight();

const user = useUserStore((state) => state.currentUser);
  // const allTodos = useQuery() 
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 20, paddingBottom: bottom }}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={{
          paddingTop: 64,
          paddingBottom: 20,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text variant='heading'>Profile</Text>

          <ModeToggle />
        </View>
        <View>
          <Text variant='heading'>{user?.name}</Text>
          <Text variant='heading'>{user?.email}</Text>
        </View>
                <SignOutButton />
        
      </View>
    </ScrollView>
  );
}
