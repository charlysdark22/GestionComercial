import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Title, Paragraph, FAB } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SalesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.title}>Ventas</Title>
        <Paragraph style={styles.subtitle}>Gestiona todas las transacciones</Paragraph>
      </View>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.statsContainer}>
          <Card style={styles.statCard}>
            <Card.Content>
              <Text style={styles.statValue}>€125,430</Text>
              <Text style={styles.statLabel}>Ventas del mes</Text>
            </Card.Content>
          </Card>
          
          <Card style={styles.statCard}>
            <Card.Content>
              <Text style={styles.statValue}>€45,200</Text>
              <Text style={styles.statLabel}>Compras del mes</Text>
            </Card.Content>
          </Card>
        </View>
        
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Transacciones Recientes</Title>
            <Text style={styles.placeholder}>Funcionalidad en desarrollo...</Text>
          </Card.Content>
        </Card>
      </ScrollView>
      
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => {}}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    padding: 24,
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  subtitle: {
    color: '#6b7280',
    marginTop: 4,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statCard: {
    width: '48%',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#10b981',
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  card: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 16,
    color: '#1f2937',
  },
  placeholder: {
    color: '#9ca3af',
    fontStyle: 'italic',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});