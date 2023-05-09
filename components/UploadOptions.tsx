import { ChangeEventHandler } from "react";

interface UploadOptionsProps {
  handleVideoChange: ChangeEventHandler<HTMLInputElement>;
  handleSrtChange: ChangeEventHandler<HTMLInputElement>;
}

export const UploadOptions: React.FC<UploadOptionsProps> = ({
  handleSrtChange,
  handleVideoChange,
}) => {
  return (
    <div className="p-10 mx-auto w-3/4 flex justify-center items-center">
      <p className="p-4 border-gray-400">Upload Video:</p>
      <input onChange={handleVideoChange} type="file" accept="" />
      <p className="p-4 border-gray-400">Upload SRT: </p>
      <input onChange={handleSrtChange} type="file" accept="" />
    </div>
  );
};
