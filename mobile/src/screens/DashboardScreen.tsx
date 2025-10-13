import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { 
  Text, 
  Card, 
  Title, 
  Paragraph,
  Button,
  Divider
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

const stats = [
  { title: 'Clientes', value: '2,651', icon: 'people', color: '#3b82f6' },
  { title: 'Proyectos', value: '24', icon: 'folder', color: '#10b981' },
  { title: 'Ventas', value: '€405K', icon: 'shopping-cart', color: '#8b5cf6' },
  { title: 'Ingresos', value: '€1.2M', icon: 'attach-money', color: '#f59e0b' },
];

const quickActions = [
  { title: 'Nuevo Cliente', icon: 'person-add', color: '#3b82f6' },
  { title: 'Crear Proyecto', icon: 'create-new-folder', color: '#10b981' },
  { title: 'Nueva Venta', icon: 'add-shopping-cart', color: '#8b5cf6' },
  { title: 'WhatsApp', icon: 'chat', color: '#25d366' },
];

export default function DashboardScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Title style={styles.title}>Dashboard</Title>
          <Paragraph style={styles.subtitle}>
            Resumen general de tu negocio
          </Paragraph>
        </View>

        {/* Estadísticas */}
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <Card key={index} style={styles.statCard}>
              <Card.Content style={styles.statContent}>
                <View style={styles.statHeader}>
                  <Icon name={stat.icon} size={24} color={stat.color} />
                  <Text style={styles.statValue}>{stat.value}</Text>
                </View>
                <Text style={styles.statTitle}>{stat.title}</Text>
              </Card.Content>
            </Card>
          ))}
        </View>

        {/* Acciones Rápidas */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Acciones Rápidas</Title>
            <View style={styles.actionsContainer}>
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  mode="outlined"
                  onPress={() => {}}
                  style={styles.actionButton}
                  contentStyle={styles.actionButtonContent}
                  icon={({ size }) => (
                    <Icon name={action.icon} size={size} color={action.color} />
                  )}
                >
                  {action.title}
                </Button>
              ))}
            </View>
          </Card.Content>
        </Card>

        {/* Actividad Reciente */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Actividad Reciente</Title>
            <View style={styles.activityItem}>
              <Icon name="person-add" size={20} color="#3b82f6" />
              <View style={styles.activityText}>
                <Text style={styles.activityTitle}>Nuevo cliente registrado</Text>
                <Text style={styles.activitySubtitle}>Empresa ABC S.A. - Hace 2 horas</Text>
              </View>
            </View>
            <Divider style={styles.divider} />
            <View style={styles.activityItem}>
              <Icon name="folder" size={20} color="#10b981" />
              <View style={styles.activityText}>
                <Text style={styles.activityTitle}>Proyecto completado al 85%</Text>
                <Text style={styles.activitySubtitle}>Desarrollo Web - Hace 4 horas</Text>
              </View>
            </View>
            <Divider style={styles.divider} />
            <View style={styles.activityItem}>
              <Icon name="shopping-cart" size={20} color="#8b5cf6" />
              <View style={styles.activityText}>
                <Text style={styles.activityTitle}>Nueva venta por €15,000</Text>
                <Text style={styles.activitySubtitle}>Cliente Premium - Hace 6 horas</Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  scrollView: {
    flex: 1,
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
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  statCard: {
    width: '48%',
    margin: '1%',
    marginBottom: 8,
  },
  statContent: {
    paddingVertical: 16,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  statTitle: {
    fontSize: 12,
    color: '#6b7280',
  },
  card: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 16,
    color: '#1f2937',
  },
  actionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: '48%',
    marginBottom: 8,
  },
  actionButtonContent: {
    paddingVertical: 8,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  activityText: {
    marginLeft: 12,
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
  },
  activitySubtitle: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  divider: {
    marginVertical: 8,
  },
});