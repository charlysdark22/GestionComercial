import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Title, Paragraph, FAB, ProgressBar, Chip } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const projects = [
  {
    id: 1,
    name: 'Desarrollo Web Corporativo',
    client: 'Empresa ABC S.L.',
    status: 'in_progress',
    progress: 0.75,
    budget: 25000,
  },
  {
    id: 2,
    name: 'App Móvil E-commerce',
    client: 'Tech Solutions',
    status: 'planning',
    progress: 0.15,
    budget: 45000,
  },
];

export default function ProjectsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.title}>Proyectos</Title>
        <Paragraph style={styles.subtitle}>Gestiona todos tus proyectos</Paragraph>
      </View>
      
      <ScrollView style={styles.scrollView}>
        {projects.map((project) => (
          <Card key={project.id} style={styles.projectCard}>
            <Card.Content>
              <View style={styles.projectHeader}>
                <Text style={styles.projectName}>{project.name}</Text>
                <Chip mode="outlined" textStyle={styles.chipText}>
                  {project.status === 'in_progress' ? 'En Progreso' : 'Planificación'}
                </Chip>
              </View>
              <Text style={styles.clientName}>{project.client}</Text>
              
              <View style={styles.progressSection}>
                <View style={styles.progressHeader}>
                  <Text style={styles.progressLabel}>Progreso</Text>
                  <Text style={styles.progressValue}>{Math.round(project.progress * 100)}%</Text>
                </View>
                <ProgressBar 
                  progress={project.progress} 
                  color="#3b82f6"
                  style={styles.progressBar}
                />
              </View>
              
              <Text style={styles.budget}>Presupuesto: €{project.budget.toLocaleString()}</Text>
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
  projectCard: {
    marginBottom: 12,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  projectName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    flex: 1,
    marginRight: 8,
  },
  chipText: {
    fontSize: 12,
  },
  clientName: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
  },
  progressSection: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    color: '#374151',
  },
  progressValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#3b82f6',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  budget: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10b981',
    textAlign: 'right',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});