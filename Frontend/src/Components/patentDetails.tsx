import { useState, useRef, useEffect } from 'react';
import { 
  FiFile, 
  FiDownload, 
  FiEdit2, 
  FiPlus, 
  FiSave, 
  FiClock, 
  FiUser, 
  FiShare2, 
  FiAlertCircle,
  FiTrash2
} from 'react-icons/fi';
import { useParams } from 'react-router-dom';

type FileType = {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  uploadedAt: Date;
};

type PatentType = {
  id: string;
  title: string;
  description: string;
  owner: string;
  isOwner: boolean;
  createdAt: Date;
  files: FileType[];
};

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const PatentDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [patent, setPatent] = useState<PatentType | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editableDescription, setEditableDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock data - Replace with actual API call
  useEffect(() => {
    const fetchPatentDetails = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock data
        const mockPatent: PatentType = {
          id: id || '1',
          title: 'Blockchain-based Patent Management System',
          description: 'A decentralized system for managing and verifying patents using blockchain technology. This system ensures transparency, immutability, and security in the patent filing process.',
          owner: '0x1234...abcd',
          isOwner: true, // This would be determined by comparing with the current user's address
          createdAt: new Date('2025-06-20T10:30:00'),
          files: [
            {
              id: 'file1',
              name: 'patent_document.pdf',
              size: 2456789,
              type: 'application/pdf',
              url: '#',
              uploadedAt: new Date('2025-06-20T10:30:00')
            },
            {
              id: 'file2',
              name: 'diagrams.pdf',
              size: 1456789,
              type: 'application/pdf',
              url: '#',
              uploadedAt: new Date('2025-06-20T10:30:00')
            }
          ]
        };
        
        setPatent(mockPatent);
        setEditableDescription(mockPatent.description);
        setLoading(false);
      } catch (err) {
        setError('Failed to load patent details. Please try again later.');
        setLoading(false);
        console.error('Error fetching patent:', err);
      }
    };

    fetchPatentDetails();
  }, [id]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && patent) {
      const newFiles = Array.from(e.target.files).map(file => ({
        id: `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file),
        uploadedAt: new Date()
      }));

      setPatent({
        ...patent,
        files: [...patent.files, ...newFiles]
      });
    }
  };

  const handleRemoveFile = (fileId: string) => {
    if (patent) {
      setPatent({
        ...patent,
        files: patent.files.filter(file => file.id !== fileId)
      });
    }
  };

  const handleSaveDescription = () => {
    if (patent) {
      setPatent({
        ...patent,
        description: editableDescription
      });
      setIsEditing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-12 h-12 rounded-full border-t-2 border-b-2 border-blue-500 animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 mx-auto max-w-4xl">
        <div className="p-4 bg-red-50 border-l-4 border-red-500">
          <div className="flex">
            <div className="flex-shrink-0">
              <FiAlertCircle className="w-5 h-5 text-red-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!patent) {
    return (
      <div className="p-6 mx-auto max-w-4xl">
        <div className="py-12 text-center">
          <h2 className="text-2xl font-semibold text-gray-800">Patent not found</h2>
          <p className="mt-2 text-gray-600">The requested patent could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            {patent.title}
          </h1>
          <div className="flex flex-col mt-1 sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
            <div className="flex items-center mt-2 text-sm text-gray-500">
              <FiUser className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
              {patent.owner}
            </div>
            <div className="flex items-center mt-2 text-sm text-gray-500">
              <FiClock className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
              Created on {formatDate(patent.createdAt)}
            </div>
          </div>
        </div>
        <div className="flex mt-4 space-x-3 md:mt-0 md:ml-4">
          {patent.isOwner && (
            <button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md border border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FiEdit2 className="mr-2 -ml-1 w-5 h-5 text-gray-500" />
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
          )}
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md border border-transparent shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FiShare2 className="mr-2 -ml-1 w-5 h-5" />
            Share
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 mt-8 lg:grid-cols-3">
        {/* Main content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Description */}
          <div className="overflow-hidden bg-white shadow sm:rounded-lg">
            <div className="flex justify-between items-center px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Description</h3>
              {isEditing && (
                <button
                  type="button"
                  onClick={handleSaveDescription}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <FiSave className="-ml-0.5 mr-1.5 h-4 w-4" />
                  Save
                </button>
              )}
            </div>
            <div className="px-4 py-5 border-t border-gray-200 sm:px-6">
              {isEditing ? (
                <textarea
                  rows={6}
                  className="block p-2 w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={editableDescription}
                  onChange={(e) => setEditableDescription(e.target.value)}
                />
              ) : (
                <p className="text-gray-700 whitespace-pre-line">{patent.description}</p>
              )}
            </div>
          </div>

          {/* Files */}
          <div className="overflow-hidden bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Files</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Documents and files related to this patent.
              </p>
            </div>
            <div className="border-t border-gray-200">
              {patent.files.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                  {patent.files.map((file) => (
                    <li key={file.id} className="px-6 py-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <FiFile className="flex-shrink-0 w-5 h-5 text-gray-400" />
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                            <p className="text-sm text-gray-500">
                              {formatFileSize(file.size)} • {formatDate(file.uploadedAt)}
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <a
                            href={file.url}
                            download
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <FiDownload className="w-5 h-5" />
                          </a>
                          {patent.isOwner && (
                            <button
                              onClick={() => handleRemoveFile(file.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <FiTrash2 className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="py-12 text-center">
                  <FiFile className="mx-auto w-12 h-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No files</h3>
                  <p className="mt-1 text-sm text-gray-500">Upload files to get started.</p>
                </div>
              )}
            </div>
            {patent.isOwner && (
              <div className="px-6 py-4 text-right bg-gray-50">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                  multiple
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md border border-transparent shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <FiPlus className="mr-2 -ml-1 w-5 h-5" />
                  Add Files
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Actions */}
          <div className="overflow-hidden bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Actions</h3>
            </div>
            <div className="px-4 py-5 border-t border-gray-200 sm:p-6">
              <div className="space-y-4">
                <button
                  type="button"
                  className="inline-flex justify-center items-center px-4 py-2 w-full text-sm font-medium text-white bg-green-600 rounded-md border border-transparent shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Request Review
                </button>
                {patent.isOwner && (
                  <button
                    type="button"
                    className="inline-flex justify-center items-center px-4 py-2 w-full text-sm font-medium text-white bg-red-600 rounded-md border border-transparent shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Delete Patent
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Activity */}
          <div className="overflow-hidden bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Activity</h3>
            </div>
            <div className="px-4 py-5 border-t border-gray-200 sm:p-6">
              <div className="flow-root">
                <ul className="-mb-8">
                  <li>
                    <div className="relative pb-8">
                      <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                      <div className="flex relative space-x-3">
                        <div>
                          <span className="flex justify-center items-center w-8 h-8 bg-blue-500 rounded-full ring-8 ring-white">
                            <FiUser className="w-5 h-5 text-white" />
                          </span>
                        </div>
                        <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                          <div>
                            <p className="text-sm text-gray-500">
                              Patent created by {patent.owner}
                            </p>
                          </div>
                          <div className="text-sm text-right text-gray-500 whitespace-nowrap">
                            <time dateTime={patent.createdAt.toISOString()}>
                              {formatDate(patent.createdAt)}
                            </time>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  {patent.files.map((file, index) => (
                    <li key={`activity-${file.id}`}>
                      <div className="relative pb-8">
                        {index < patent.files.length - 1 && (
                          <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                        )}
                        <div className="flex relative space-x-3">
                          <div>
                            <span className="flex justify-center items-center w-8 h-8 bg-green-500 rounded-full ring-8 ring-white">
                              <FiFile className="w-5 h-5 text-white" />
                            </span>
                          </div>
                          <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                            <div>
                              <p className="text-sm text-gray-500">
                                File <span className="font-medium text-gray-900">{file.name}</span> uploaded
                              </p>
                            </div>
                            <div className="text-sm text-right text-gray-500 whitespace-nowrap">
                              <time dateTime={file.uploadedAt.toISOString()}>
                                {formatDate(file.uploadedAt)}
                              </time>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatentDetails;
