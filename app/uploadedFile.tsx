import { X } from "lucide-react";

interface UploadedFileProps {
  file: File;
  onDelete: () => void;
}

const UploadedFile: React.FC<UploadedFileProps> = ({ file, onDelete }) => {
  return (
    <div className="flex items-center justify-between w-full p-2 border rounded-md">
      <span className="text-sm">{file.name}</span>
      <button onClick={onDelete} className="text-gray-500 hover:text-gray-700">
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export default UploadedFile;
