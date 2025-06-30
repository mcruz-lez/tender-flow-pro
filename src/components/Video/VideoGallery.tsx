import React from 'react';

// VideoGallery: Dynamically loads and displays all video assets with captions/thumbnails from manifest
import assetManifest from '../../../tendprocure-assets/manifest.json';

export const VideoGallery: React.FC = () => {
  const videos = assetManifest.assets.filter((a: { file: string; section: string }) => a.section === 'videos');
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
      {videos.map((asset, i) => (
        <div key={i} className="bg-white rounded shadow p-4 flex flex-col items-center">
          {/* Placeholder: Show filename if not a real video */}
          {asset.file.endsWith('.mp4') ? (
            <video
              src={`/tendprocure-assets/${asset.file}`}
              controls
              className="max-w-full h-auto mb-2 rounded"
              style={{ maxHeight: 260 }}
            />
          ) : (
            <div className="w-full h-40 flex items-center justify-center bg-slate-100 text-slate-400 rounded mb-2 border border-dashed border-slate-300">
              <span>{asset.file.replace('videos/', '').replace(/[-_]/g, ' ').replace(/\..+$/, '')} (placeholder)</span>
            </div>
          )}
          <div className="text-center text-slate-700 text-sm">{asset.file.replace(/[-_]/g, ' ').replace(/\..+$/, '')}</div>
        </div>
      ))}
    </div>
  );
};

export default VideoGallery;
