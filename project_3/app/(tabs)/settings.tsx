// @ts-nocheck
import React from 'react';
import styled from 'styled-components/native';
import { FlatList, ListRenderItem, TouchableOpacity } from 'react-native';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useGame, Task } from '../context/GameContext';
import { useTheme } from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 16px;
`;

const Title = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 20px;
`;

const Subtitle = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.icon};
  margin-bottom: 20px;
`;

const ResetButton = styled.TouchableOpacity`
  background-color: #EF5350;
  padding: 16px;
  border-radius: 12px;
  align-items: center;
  margin-bottom: 24px;
`;

const ResetButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

const TaskCard = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.card};
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 12px;
  border-left-width: 6px;
  border-left-color: ${({ theme }) => theme.colors.success};
`;

const TaskInfo = styled.View`
  flex: 1;
  margin-left: 12px;
`;

const TaskTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const EmptyText = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.icon};
  text-align: center;
  margin-top: 40px;
`;

export default function SettingsScreen() {
  const { tasks, resetGame } = useGame();
  const theme = useTheme();

  const completedTasks = tasks.filter(t => t.isCompleted);

  const renderItem: ListRenderItem<Task> = ({ item }) => (
    <TaskCard>
      <IconSymbol 
        name="checkmark.circle.fill" 
        size={24} 
        color={theme.colors.success} 
      />
      <TaskInfo>
        <TaskTitle>{item.title}</TaskTitle>
      </TaskInfo>
    </TaskCard>
  );

  return (
    <Container>
      <Title>Settings</Title>
      
      <ResetButton onPress={resetGame} activeOpacity={0.8}>
        <ResetButtonText>Reset Progress</ResetButtonText>
      </ResetButton>

      <Subtitle>Completed Tasks ({completedTasks.length}/{tasks.length})</Subtitle>

      {completedTasks.length === 0 ? (
        <EmptyText>No tasks completed yet. Keep playing!</EmptyText>
      ) : (
        <FlatList
          data={completedTasks}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      )}
    </Container>
  );
}
