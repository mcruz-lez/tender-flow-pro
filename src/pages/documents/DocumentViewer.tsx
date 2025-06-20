import PageTemplate from "@/components/PageTemplate";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const DocumentViewer = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [annotated, setAnnotated] = useState(false);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setPreview(e.target.files[0].name);
      setAnnotated(false);
    }
  };

  const handleAnnotate = () => {
    setAnnotated(true);
  };

  return (
    <PageTemplate
      title="Document Viewer"
      description="View and annotate documents"
    >
      <div className="mb-4">
        <input type="file" onChange={handleFile} />
      </div>
      {preview && (
        <div className="mb-4 p-4 border rounded bg-gray-50">
          <div className="font-medium">Preview: {preview}</div>
          <Button
            className="mt-2"
            onClick={handleAnnotate}
            disabled={annotated}
          >
            {annotated ? "Annotated" : "Annotate"}
          </Button>
          {annotated && (
            <div className="mt-2 text-green-600">Annotation saved!</div>
          )}
        </div>
      )}
    </PageTemplate>
  );
};

export default DocumentViewer;
