import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Title, List, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../hooks/useAuth';

const modules = [
  { title: 'Leads', icon: 'target', description: 'Gestión de prospectos' },
  { title: 'Calendario', icon: 'calendar-today', description: 'Eventos y citas' },
  { title: 'WhatsApp', icon: 'chat', description: 'Integración WhatsApp' },
  { title: 'Inventario', icon: 'inventory', description: 'Control de stock' },
  { title: 'Gastos', icon: 'receipt', description: 'Gestión de gastos' },
  { title: 'Contratos', icon: 'description', description: 'Administración de contratos' },
  { title: 'Activos', icon: 'business-center', description: 'Control de activos' },
  { title: 'Empleados', icon: 'people', description: 'Recursos humanos' },
  { title: 'Facturación', icon: 'receipt-long', description: 'Generación de facturas' },
  { title: 'Marketing', icon: 'campaign', description: 'Campañas de marketing' },
];

export default function MoreScreen() {
  const { logout, user } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.title}>Más Módulos</Title>
        <Text style={styles.subtitle}>Accede a todas las funcionalidades</Text>
      </View>
      
      <ScrollView style={styles.scrollView}>
        <Card style={styles.userCard}>
          <Card.Content>
            <View style={styles.userInfo}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                </Text>
              </View>
              <View style={styles.userDetails}>
                <Text style={styles.userName}>{user?.name}</Text>
                <Text style={styles.userEmail}>{user?.email}</Text>
                <Text style={styles.userCompany}>{user?.company}</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.modulesCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Módulos Disponibles</Title>
            {modules.map((module, index) => (
              <List.Item
                key={index}
                title={module.title}
                description={module.description}
                left={props => <List.Icon {...props} icon={module.icon} />}
                right={props => <List.Icon {...props} icon="chevron-right" />}
                onPress={() => {}}
                style={styles.moduleItem}
              />
            ))}
          </Card.Content>
        </Card>

        <Card style={styles.actionsCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Configuración</Title>
            <List.Item
              title="Configuración"
              description="Ajustes de la aplicación"
              left={props => <List.Icon {...props} icon="settings" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => {}}
              style={styles.moduleItem}
            />
            <List.Item
              title="Ayuda y Soporte"
              description="Centro de ayuda"
              left={props => <List.Icon {...props} icon="help" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => {}}
              style={styles.moduleItem}
            />
          </Card.Content>
        </Card>

        <View style={styles.logoutContainer}>
          <Button
            mode="outlined"
            onPress={logout}
            icon="logout"
            style={styles.logoutButton}
          >
            Cerrar Sesión
          </Button>
        </View>
      </ScrollView>
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
  userCard: {
    marginBottom: 16,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  userEmail: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  userCompany: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 2,
  },
  modulesCard: {
    marginBottom: 16,
  },
  actionsCard: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 8,
    color: '#1f2937',
  },
  moduleItem: {
    paddingHorizontal: 0,
  },
  logoutContainer: {
    paddingVertical: 16,
  },
  logoutButton: {
    borderColor: '#ef4444',
  },
});