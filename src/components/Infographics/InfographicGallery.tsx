import React from 'react';

// Utility to dynamically import SVG/PNG infographics from manifest
import assetManifest from '../../../tendprocure-assets/manifest.json';

export const InfographicGallery: React.FC = () => {
  const assets: { file: string; section: string }[] = Array.isArray(assetManifest)
    ? assetManifest as { file: string; section: string }[]
    : (assetManifest && (assetManifest as { assets?: { file: string; section: string }[] }).assets ? (assetManifest as { assets: { file: string; section: string }[] }).assets : []);
  const infographics = assets.filter(a => a.section === 'infographics');
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
      {infographics.map((asset, i) => (
        <div key={i} className="bg-white rounded shadow p-4 flex flex-col items-center">
          <img
            src={`/tendprocure-assets/${asset.file}`}
            alt={asset.file.replace(/[-_]/g, ' ').replace(/\..+$/, '')}
            className="max-w-full h-auto mb-2"
            style={{ maxHeight: 260 }}
          />
          <div className="text-center text-slate-700 text-sm">{asset.file.replace(/[-_]/g, ' ').replace(/\..+$/, '')}</div>
        </div>
      ))}
    </div>
  );
};

export default InfographicGallery;
