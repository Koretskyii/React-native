import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { FileItem } from '../hooks/useFileSystem';

type CreateItemModalProps = {
  visible: boolean;
  type: 'file' | 'folder';
  onClose: () => void;
  onSubmit: (name: string, content?: string) => void;
};

export const CreateItemModal = ({ visible, type, onClose, onSubmit }: CreateItemModalProps) => {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');

  // Reset state when opened
  useEffect(() => {
    if (visible) {
      setName('');
      setContent('');
    }
  }, [visible]);

  const handleSubmit = () => {
    if (name.trim()) {
      onSubmit(name.trim(), type === 'file' ? content : undefined);
      onClose();
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Create {type === 'file' ? 'Text File' : 'Folder'}</Text>
          <TextInput
            style={styles.input}
            placeholder={type === 'file' ? 'File name (e.g. note.txt)' : 'Folder name'}
            value={name}
            onChangeText={setName}
            autoCapitalize="none"
          />
          {type === 'file' && (
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Initial content"
              value={content}
              onChangeText={setContent}
              multiline
            />
          )}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.primaryButton]} onPress={handleSubmit}>
              <Text style={styles.primaryButtonText}>Create</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

type FileViewerModalProps = {
  visible: boolean;
  fileName: string;
  initialContent: string;
  onClose: () => void;
  onSave: (content: string) => void;
};

export const FileViewerModal = ({ visible, fileName, initialContent, onClose, onSave }: FileViewerModalProps) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    setContent(initialContent);
  }, [initialContent, visible]);

  return (
    <Modal visible={visible} animationType="slide">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.fullScreenModal}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{fileName}</Text>
          <View style={styles.headerButtons}>
            <TouchableOpacity onPress={onClose} style={styles.headerBtn}>
              <Text style={styles.headerBtnTextCancel}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { onSave(content); onClose(); }} style={styles.headerBtn}>
              <Text style={styles.headerBtnTextSave}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TextInput
          style={styles.editor}
          value={content}
          onChangeText={setContent}
          multiline
          textAlignVertical="top"
        />
      </KeyboardAvoidingView>
    </Modal>
  );
};

type FileInfoModalProps = {
  visible: boolean;
  fileItem: FileItem | null;
  onClose: () => void;
};

export const FileInfoModal = ({ visible, fileItem, onClose }: FileInfoModalProps) => {
  if (!fileItem) return null;

  const formatDate = (ms?: number) => {
    if (!ms) return 'Unknown';
    // ms is actually seconds from epoch in some expo versions, but let's assume it's standard or handle both
    const date = new Date(ms > 1000000000000 ? ms : ms * 1000);
    return date.toLocaleString();
  };

  const formatSize = (bytes?: number) => {
    if (bytes === undefined) return 'Unknown';
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(2) + ' KB';
    else return (bytes / 1048576).toFixed(2) + ' MB';
  };

  const extension = fileItem.isDirectory ? 'Folder' : fileItem.name.split('.').pop()?.toUpperCase() || 'File';

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Info</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Name:</Text>
            <Text style={styles.infoValue}>{fileItem.name}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Type:</Text>
            <Text style={styles.infoValue}>{extension}</Text>
          </View>
          {!fileItem.isDirectory && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Size:</Text>
              <Text style={styles.infoValue}>{formatSize(fileItem.size)}</Text>
            </View>
          )}
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Modified:</Text>
            <Text style={styles.infoValue}>{formatDate(fileItem.modificationTime)}</Text>
          </View>
          
          <TouchableOpacity style={[styles.button, styles.primaryButton, { marginTop: 20 }]} onPress={onClose}>
            <Text style={styles.primaryButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
  },
  primaryButton: {
    backgroundColor: '#0a7ea4',
  },
  cancelButtonText: {
    color: '#333',
    fontWeight: '600',
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  fullScreenModal: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerButtons: {
    flexDirection: 'row',
  },
  headerBtn: {
    marginLeft: 15,
  },
  headerBtnTextCancel: {
    color: '#666',
    fontSize: 16,
  },
  headerBtnTextSave: {
    color: '#0a7ea4',
    fontSize: 16,
    fontWeight: 'bold',
  },
  editor: {
    flex: 1,
    padding: 20,
    fontSize: 16,
    lineHeight: 24,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoLabel: {
    width: 80,
    fontWeight: '600',
    color: '#555',
  },
  infoValue: {
    flex: 1,
    color: '#111',
  }
});
