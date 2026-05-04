import { Paths, Directory, File } from 'expo-file-system';
import { useState, useCallback } from 'react';

export type FileItem = {
  name: string;
  uri: string;
  isDirectory: boolean;
  size?: number;
  modificationTime?: number;
};

export function useFileSystem() {
  const rootDir = Paths.document.uri;
  const [currentPath, setCurrentPath] = useState(rootDir);
  const [files, setFiles] = useState<FileItem[]>([]);
  const [memoryStats, setMemoryStats] = useState({ total: 0, free: 0, used: 0 });

  const loadDirectory = useCallback(async (path: string) => {
    try {
      const dir = new Directory(path);
      if (!dir.exists) return;
      
      const items = dir.list();
      
      const detailedItems = items.map((item) => {
        const isDirectory = item instanceof Directory;
        let modTime: number | undefined;
        let size: number | undefined;

        if (isDirectory) {
          try {
            modTime = (item as Directory).info().modificationTime;
          } catch(e) {}
        } else {
          try {
            modTime = (item as File).modificationTime || undefined;
            size = (item as File).size;
          } catch(e) {}
        }

        return {
          name: item.name,
          uri: item.uri,
          isDirectory,
          size,
          modificationTime: modTime,
        } as FileItem;
      });
      
      detailedItems.sort((a, b) => {
        if (a.isDirectory === b.isDirectory) {
          return a.name.localeCompare(b.name);
        }
        return a.isDirectory ? -1 : 1;
      });

      setFiles(detailedItems);
      setCurrentPath(path);
    } catch (e) {
      console.error('Failed to read directory', e);
    }
  }, []);

  const loadMemoryStats = useCallback(async () => {
    try {
      const free = Paths.availableDiskSpace;
      const total = Paths.totalDiskSpace;
      setMemoryStats({ total, free, used: total - free });
    } catch (e) {
      console.error('Failed to get memory stats', e);
    }
  }, []);

  const createFolder = async (name: string) => {
    try {
      const newDir = new Directory(currentPath, name);
      newDir.create();
      await loadDirectory(currentPath);
    } catch (e) {
      console.error(e);
    }
  };

  const createFile = async (name: string, content: string) => {
    try {
      const fileName = name.endsWith('.txt') ? name : name + '.txt';
      const newFile = new File(currentPath, fileName);
      newFile.create();
      newFile.write(content);
      await loadDirectory(currentPath);
    } catch (e) {
      console.error(e);
    }
  };

  const readFile = async (uri: string) => {
    const file = new File(uri);
    return await file.text();
  };

  const updateFile = async (uri: string, content: string) => {
    const file = new File(uri);
    file.write(content);
  };

  const deleteItem = async (uri: string) => {
    try {
      const isDir = Paths.info(uri).isDirectory;
      if (isDir) {
        new Directory(uri).delete();
      } else {
        new File(uri).delete();
      }
      await loadDirectory(currentPath);
    } catch (e) {
      console.error(e);
    }
  };

  const navigateUp = async () => {
    if (currentPath === rootDir) return;
    
    try {
      const dir = new Directory(currentPath);
      const parent = dir.parentDirectory;
      
      if (parent.uri.startsWith(rootDir)) {
        await loadDirectory(parent.uri);
      } else {
        await loadDirectory(rootDir);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return {
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
  };
}
