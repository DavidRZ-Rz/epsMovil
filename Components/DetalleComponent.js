import { View, StyleSheet } from 'react-native';

export default function DetalleComponent({children,style}) {

    return (
         <View style={[styles.card, style]}>
      {children}
    </View>
    );
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
});

