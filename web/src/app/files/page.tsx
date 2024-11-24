'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import Modal from '@/components/Dialog';
import {
  DropEvent,
  DropzoneInputProps,
  FileRejection,
  useDropzone,
} from 'react-dropzone';
import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Delete, Download } from 'lucide-react';
import { Pencil2Icon, PlusIcon } from '@radix-ui/react-icons';
import Navbar from '@/components/Navbar';
import AvatarName from '@/components/AvatarName';

type OpenModal = {
  isOpen: boolean;
  type: 'edit' | 'create';
};

type FileProps = {
  id: number;
  name: string;
  fileType: string;
  filePath: string;
  uploadedAt: Date;
  ownerUserId: number;
  owner: {
    name: string;
  };
};

const openModalDefaultValues: OpenModal = {
  isOpen: false,
  type: 'create',
};

type User = {
  id: number;
  name: string;
  email: string;
};

export default function FilesPage() {
  const [files, setFiles] = useState<FileProps[]>([]);
  const [isOpenModal, setIsOpenModal] = useState(openModalDefaultValues);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const [user, setUser] = useState<User>({
    id: 1,
    email: 'neto.dani@mail.com',
    name: 'Daniel Ribeiro Neto',
  });

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:3333/api/files');
        const data = await response.json();
        setFiles(data);
      } catch (error) {
        console.error('Error fetching files:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFiles();
  }, []);


  const handleCloseModal = () =>
    setIsOpenModal((prev) => ({ ...prev, isOpen: false }));
  const handleOpenCreateFileModal = () =>
    setIsOpenModal({ isOpen: true, type: 'create' });

  const handleDropFiles = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[], event: DropEvent) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setUploadFile(file);
        if (!fileName) {
          setFileName(file.name);
        }
      }
    },
    [fileName]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,
    onDrop: handleDropFiles,
    accept: {
      'application/*': ['.pdf', '.doc', '.docx'],
      'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
    },
    noClick: false,
    noKeyboard: false,
  });

  const handleDownloadFile = async (filePath: string) => {
    try {
      const response = await fetch(`${filePath}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Failed to download file');
      }

      const contentDisposition = response.headers.get('Content-Disposition');
      const filenameMatch = contentDisposition?.match(/filename="(.+)"/);
      const filename = filenameMatch ? filenameMatch[1] : 'downloaded-file';

      const blob = await response.blob();
      
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const handleDeleteFile = async (fileId: number) => {
    try {
      const response = await fetch(`http://localhost:3333/api/files/${fileId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
      throw new Error('Failed to delete file');
    }

    setFiles(prevFiles => prevFiles.filter(file => file.id !== fileId));
  } catch (error) {
    console.error('Error deleting file:', error);
    }
  };

  const handleSubmitFile = async () => {
    if (!uploadFile) {
      console.error('No file selected');
      return;
    }

    try {
      const formData = new FormData();
      const fileToUpload = new File([uploadFile], fileName || uploadFile.name, {
        type: uploadFile.type,
      });
      formData.append('file', fileToUpload);

      const response = await fetch('http://localhost:3333/api/files/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload file');
      }

      const filesResponse = await fetch('http://localhost:3333/api/files');
      const newFiles = await filesResponse.json();
      setFiles(newFiles);

      setUploadFile(null);
      setFileName('');
      handleCloseModal();
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const dropzoneContent = (
    <div
      {...getRootProps()}
      className={`flex flex-col items-center justify-center p-4 min-h-[120px] border-2 border-dashed rounded cursor-pointer ${
        isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
      }`}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className='text-blue-500'>Solte o arquivo aqui...</p>
      ) : (
        <div className='text-center'>
          <p className='text-gray-500'>
            Arraste e solte um arquivo aqui,
          </p>
          <p className='text-gray-500'>
            ou clique para selecionar
          </p>
        </div>
      )}
    </div>
  );

  const renderModalContent = useCallback(() => {
    return (
      <form className='flex flex-col gap-4' onSubmit={(e) => {
        e.preventDefault();
        handleSubmitFile();
      }}>
        <div className='flex flex-col gap-4 p-4 border rounded'>
          <h3 className='mb-1 font-semibold text-base'>
            Informações do Arquivo
          </h3>

          <fieldset className='flex flex-col gap-2'>
            <label>Nome</label>
            <Input 
              placeholder='Nome' 
              value={fileName} 
              onChange={(e) => setFileName(e.target.value)}
            />
          </fieldset>

          <fieldset className='flex flex-col gap-2'>
            <label htmlFor=''>Arquivo</label>
            {dropzoneContent}
            {uploadFile && (
              <div className='mt-2 flex items-center gap-2'>
                <span className='text-sm text-gray-700'>{uploadFile.name}</span>
                <button
                  type='button'
                  onClick={(e) => {
                    e.stopPropagation();
                    setUploadFile(null);
                    setFileName('');
                  }}
                  className='text-red-500 hover:text-red-700'
                >
                  Remover
                </button>
              </div>
            )}
          </fieldset>
        </div>
      </form>
    );
  }, [uploadFile, fileName, getRootProps, getInputProps, isDragActive]);

  return (
    <div className='flex min-h-screen w-full flex-col'>
      <Navbar
        user={user}
        currentPath="files"
        onCreateItem={handleOpenCreateFileModal}
        createButtonLabel="Novo Arquivo"
      />
      <main className='p-4'>
        <Table className='border'>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Data do upload</TableHead>
              <TableHead>Usuário</TableHead>
              <TableHead>Açoes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {files.map((file) => (
              <TableRow key={file.id}>
                <TableCell>{file.name}</TableCell>
                <TableCell>{file.fileType}</TableCell>
                <TableCell>{new Date(file.uploadedAt).toISOString()}</TableCell>
                <TableCell>
                  <AvatarName name={user.name} />
                </TableCell>
                <TableCell className='flex gap-4'>
                  <button onClick={() => handleDownloadFile(file.filePath)}>
                    <Download className='size-4' />
                  </button>

                  <button onClick={() => handleDeleteFile(file.id)}>
                    <Delete className='size-4' />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>

      <Modal
        open={isOpenModal.isOpen}
        handleSubmitModal={handleSubmitFile}
        content={renderModalContent()}
        handleCloseModal={handleCloseModal}
        title="Upload de Arquivo"
      />
    </div>
  );
}
