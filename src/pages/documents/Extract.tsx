import PageTemplate from "@/components/PageTemplate";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Extract = () => {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleExtract = (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      setLoading(true);
      setTimeout(() => {
        setResult(`Extracted summary from: ${file.name}`);
        setLoading(false);
      }, 2000);
    }
  };

  return (
    <PageTemplate
      title="Document Extraction"
      description="AI-powered data extraction from documents"
    >
      <form className="mb-6 flex flex-col gap-2" onSubmit={handleExtract}>
        <input type="file" onChange={handleFile} />
        <Button type="submit" disabled={!file || loading}>
          {loading ? "Extracting..." : "Extract"}
        </Button>
      </form>
      {result && (
        <div className="rounded border border-green-200 bg-green-50 p-4">
          {result}
        </div>
      )}
    </PageTemplate>
  );
};

export default Extract;
