import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Title, Paragraph, FAB, Chip } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

const clients = [
  {
    id: 1,
    name: 'María García',
    email: 'maria.garcia@empresa.com',
    company: 'Empresa ABC S.L.',
    status: 'active',
    tags: ['Premium', 'VIP'],
  },
  {
    id: 2,
    name: 'Carlos Rodríguez',
    email: 'carlos.rodriguez@tech.com',
    company: 'Tech Solutions',
    status: 'prospect',
    tags: ['Tecnología'],
  },
];

export default function ClientsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.title}>Clientes</Title>
        <Paragraph style={styles.subtitle}>Gestiona tu base de datos de clientes</Paragraph>
      </View>
      
      <ScrollView style={styles.scrollView}>
        {clients.map((client) => (
          <Card key={client.id} style={styles.clientCard}>
            <Card.Content>
              <View style={styles.clientHeader}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {client.name.split(' ').map(n => n[0]).join('')}
                  </Text>
                </View>
                <View style={styles.clientInfo}>
                  <Text style={styles.clientName}>{client.name}</Text>
                  <Text style={styles.clientCompany}>{client.company}</Text>
                  <Text style={styles.clientEmail}>{client.email}</Text>
                </View>
              </View>
              <View style={styles.tagsContainer}>
                {client.tags.map((tag, index) => (
                  <Chip key={index} mode="outlined" style={styles.tag}>
                    {tag}
                  </Chip>
                ))}
              </View>
            </Card.Content>
          </Card>
        ))}
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
  clientCard: {
    marginBottom: 12,
  },
  clientHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#374151',
  },
  clientInfo: {
    flex: 1,
  },
  clientName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  clientCompany: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  clientEmail: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 2,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    marginRight: 8,
    marginBottom: 4,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});