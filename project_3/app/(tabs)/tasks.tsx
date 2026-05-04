// @ts-nocheck
import React from 'react';
import styled from 'styled-components/native';
import { FlatList, ListRenderItem } from 'react-native';
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

const TaskCard = styled.View<{ completed: boolean }>`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.card};
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 12px;
  border-left-width: 6px;
  border-left-color: ${({ theme, completed }) => completed ? theme.colors.success : theme.colors.primary};
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 2;
`;

const TaskInfo = styled.View`
  flex: 1;
  margin-left: 12px;
`;

const TaskTitle = styled.Text<{ completed: boolean }>`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme, completed }) => completed ? theme.colors.icon : theme.colors.text};
  text-decoration-line: ${({ completed }) => completed ? 'line-through' : 'none'};
`;

export default function TasksScreen() {
  const { tasks } = useGame();
  const theme = useTheme();

  const renderItem: ListRenderItem<Task> = ({ item }) => (
    <TaskCard completed={item.isCompleted}>
      <IconSymbol 
        name={item.isCompleted ? "checkmark.circle.fill" : "circle"} 
        size={24} 
        color={item.isCompleted ? theme.colors.success : theme.colors.icon} 
      />
      <TaskInfo>
        <TaskTitle completed={item.isCompleted}>{item.title}</TaskTitle>
      </TaskInfo>
    </TaskCard>
  );

  return (
    <Container>
      <Title>Available Tasks</Title>
      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
}
