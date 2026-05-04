import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useFileSystem, FileItem } from '../hooks/useFileSystem';
import { CreateItemModal, FileViewerModal, FileInfoModal } from '../components/Modals';

export default function FileManagerScreen() {
  const {
    currentPath,
    files,
    memoryStats,
    loadDirectory,
    loadMemoryStats,
    createFolder,
    createFile,
    readFile,
    updateFile,
    deleteItem,
    navigateUp
  } = useFileSystem();

  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [createType, setCreateType] = useState<'file' | 'folder'>('folder');

  const [viewerVisible, setViewerVisible] = useState(false);
  const [activeFileContent, setActiveFileContent] = useState('');
  const [activeFileUri, setActiveFileUri] = useState('');
  const [activeFileName, setActiveFileName] = useState('');

  const [infoVisible, setInfoVisible] = useState(false);
  const [activeFileInfo, setActiveFileInfo] = useState<FileItem | null>(null);

  useEffect(() => {
    // Initial load
    loadMemoryStats();
    if (currentPath) {
      loadDirectory(currentPath);
    }
  }, []);

  const handleCreate = (type: 'file' | 'folder') => {
    setCreateType(type);
    setCreateModalVisible(true);
  };

  const onSubmitCreate = async (name: string, content?: string) => {
    if (createType === 'folder') {
      await createFolder(name);
    } else {
      await createFile(name, content || '');
    }
  };

  const handleItemPress = async (item: FileItem) => {
    if (item.isDirectory) {
      await loadDirectory(item.uri);
    } else if (item.name.endsWith('.txt')) {
      const content = await readFile(item.uri);
      setActiveFileContent(content);
      setActiveFileUri(item.uri);
      setActiveFileName(item.name);
      setViewerVisible(true);
    } else {
      Alert.alert('Unsupported', 'Can only open .txt files.');
    }
  };

  const handleItemLongPress = (item: FileItem) => {
    Alert.alert(
      'Actions',
      `What to do with ${item.name}?`,
      [
        { text: 'Info', onPress: () => {
          setActiveFileInfo(item);
          setInfoVisible(true);
        }},
        { text: 'Delete', onPress: () => confirmDelete(item), style: 'destructive' },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const confirmDelete = (item: FileItem) => {
    Alert.alert(
      'Confirm Delete',
      `Are you sure you want to delete ${item.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: () => deleteItem(item.uri), style: 'destructive' }
      ]
    );
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1048576) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / 1048576).toFixed(2) + ' MB';
  };

  const renderItem = ({ item }: { item: FileItem }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => handleItemPress(item)}
      onLongPress={() => handleItemLongPress(item)}
      delayLongPress={500}
    >
      <IconSymbol
        name={item.isDirectory ? 'folder.fill' : 'doc.text.fill'}
        size={28}
        color={item.isDirectory ? '#f1c40f' : '#3498db'}
      />
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
        {!item.isDirectory && item.size !== undefined && (
          <Text style={styles.itemSize}>{(item.size / 1024).toFixed(1)} KB</Text>
        )}
      </View>
      <TouchableOpacity onPress={() => handleItemLongPress(item)} style={styles.moreButton}>
         <IconSymbol name="ellipsis" size={24} color="#999" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.statsContainer}>
        <Text style={styles.statsTitle}>Device Storage</Text>
        <Text style={styles.statsText}>Total: {formatSize(memoryStats.total)}</Text>
        <Text style={styles.statsText}>Used: {formatSize(memoryStats.used)}</Text>
        <Text style={styles.statsText}>Free: {formatSize(memoryStats.free)}</Text>
      </View>

      <View style={styles.pathContainer}>
        <TouchableOpacity onPress={navigateUp} style={styles.upButton}>
          <IconSymbol name="arrow.up" size={20} color="#333" />
        </TouchableOpacity>
        <Text style={styles.pathText} numberOfLines={1} ellipsizeMode="head">
          {currentPath}
        </Text>
      </View>

      <FlatList
        data={files}
        keyExtractor={(item) => item.uri}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text style={styles.emptyText}>Empty Directory</Text>}
      />

      <View style={styles.fabContainer}>
        <TouchableOpacity style={[styles.fab, styles.fabFolder]} onPress={() => handleCreate('folder')}>
          <IconSymbol name="folder.badge.plus" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.fab} onPress={() => handleCreate('file')}>
          <IconSymbol name="doc.badge.plus" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <CreateItemModal
        visible={createModalVisible}
        type={createType}
        onClose={() => setCreateModalVisible(false)}
        onSubmit={onSubmitCreate}
      />

      <FileViewerModal
        visible={viewerVisible}
        fileName={activeFileName}
        initialContent={activeFileContent}
        onClose={() => setViewerVisible(false)}
        onSave={async (content) => {
          await updateFile(activeFileUri, content);
          setActiveFileContent(content); 
        }}
      />

      <FileInfoModal
        visible={infoVisible}
        fileItem={activeFileInfo}
        onClose={() => setInfoVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  statsContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  statsText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 2,
  },
  pathContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#E9ECEF',
    marginTop: 16,
  },
  upButton: {
    padding: 8,
    backgroundColor: '#DEE2E6',
    borderRadius: 8,
    marginRight: 12,
  },
  pathText: {
    flex: 1,
    fontSize: 14,
    color: '#495057',
  },
  listContent: {
    padding: 16,
    paddingBottom: 100,
  },
  emptyText: {
    textAlign: 'center',
    color: '#ADB5BD',
    marginTop: 40,
    fontSize: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  itemTextContainer: {
    flex: 1,
    marginLeft: 16,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#212529',
  },
  itemSize: {
    fontSize: 12,
    color: '#6C757D',
    marginTop: 4,
  },
  moreButton: {
    padding: 8,
  },
  fabContainer: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    flexDirection: 'column',
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#0a7ea4',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 16,
  },
  fabFolder: {
    backgroundColor: '#f1c40f',
  }
});
