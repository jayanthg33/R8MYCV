import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

const WipeApp = () => {
  const { auth, isLoading, error, clearError, fs, ai, kv } = usePuterStore();
  const navigate = useNavigate();
  const [files, setFiles] = useState<FSItem[]>([]);

  const loadFiles = async () => {
    const dirFiles = (await fs.readDir("./")) as FSItem[];
    setFiles(dirFiles);
  };

  useEffect(() => {
    loadFiles();
  }, []);

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) {
      navigate("/auth?next=/wipe");
    }
  }, [isLoading]);

  const handleDelete = async () => {
    // Delete each file sequentially to ensure stability
    for (const file of files) {
      await fs.delete(file.path);
    }
    await kv.flush();
    await loadFiles();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-6 space-y-4">
      <p>Authenticated as: {auth.user?.username}</p>

      <div>
        <h2 className="font-semibold">Existing files:</h2>
        <div className="flex flex-col gap-2">
          {files.length > 0 ? (
            files.map((file) => (
              <div key={file.id} className="flex flex-row gap-4">
                <p>{file.name}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No files found</p>
          )}
        </div>
      </div>

      <div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-600 transition-colors"
          onClick={handleDelete}
        >
          Wipe App Data
        </button>
      </div>
    </div>
  );
};

export default WipeApp;
