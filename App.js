import { reloadAppAsync } from 'expo';
import { Button, I18nManager, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 }}>
      <Text testID="state">{`isRTL=${I18nManager.isRTL}`}</Text>
      <Button
        title="Force RTL and reload"
        onPress={() => {
          I18nManager.allowRTL(true);
          I18nManager.forceRTL(true);
          reloadAppAsync('force RTL');
        }}
      />
    </View>
  );
}
