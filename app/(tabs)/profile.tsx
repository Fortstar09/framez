import { ModeToggle } from '@/components/ui/mode-toggle';
import { ScrollView } from '@/components/ui/scroll-view';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { api } from '@/convex/_generated/api';

import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useQuery } from 'convex/react';


export default function ProfileScreen() {
  // const router = useRouter();
  const bottom = useBottomTabBarHeight();

const currentUser = useQuery(api.users.getUserInfo);
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
          <Text variant='heading'>{currentUser ? currentUser.name : 'Hello'}</Text>
          <Text variant='heading'>{currentUser ? currentUser.email : 'Hello'}</Text>
          <Text variant='heading'>{currentUser ? currentUser.gender : 'Hello'}</Text>
          <Text variant='heading'>{currentUser ? currentUser.image : 'Hello'}</Text>
          <Text variant='heading'>{currentUser ? currentUser.name : 'Hello'}</Text>
        </View>
      </View>
    </ScrollView>
  );
}
