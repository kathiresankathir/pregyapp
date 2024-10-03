import { Modal, Button } from 'react-native';

// Modal Component
const DisclaimerModal = ({ visible, onClose }) => (
  <Modal
    transparent={true}
    animationType="slide"
    visible={visible}
    onRequestClose={onClose}
  >
    <View style={styles.modalBackground}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Disclaimer</Text>
        <Text style={styles.modalContent}>
          This is a disclaimer message. Please read and accept it before proceeding.
        </Text>
        <Button title="Accept" onPress={onClose} />
      </View>
    </View>
  </Modal>
);
