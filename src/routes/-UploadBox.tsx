import React, { useEffect } from 'react';
import { Upload } from 'lucide-react';

interface Props {
    photo: File | null;
    onPhotoChange: (photo: File | null) => void;
}

export default function UploadBox({ photo, onPhotoChange }: Props) {
    // Create the preview URL
    const previewUrl = photo ? URL.createObjectURL(photo) : null;

    // Pro-Tip: Clean up the memory when the component closes or photo changes
    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

    return (
        <label className="flex cursor-pointer flex-col items-center gap-3 rounded-lg border border-dashed border-white/20 p-4 text-sm text-cream/80 hover:bg-white/5 transition overflow-hidden">

            {/* If there's a photo, show the preview image! */}
            {previewUrl ? (
                <div className="relative w-full max-h-48 rounded-md overflow-hidden bg-black/50">
                    <img src={previewUrl} alt="ID Preview" className="w-full h-full object-contain" />
                </div>
            ) : (
                /* Otherwise, show the normal upload icon */
                <span className="grid h-10 w-10 place-items-center rounded-md bg-copper/30 text-copper">
                    <Upload className="h-5 w-5" />
                </span>
            )}

            <div className="text-center">
                <span className="block font-medium text-cream truncate max-w-[200px]">
                    {photo ? photo.name : "Click to upload your ID"}
                </span>
                <span className="block text-xs text-cream/60 mt-1">
                    {photo ? `${(photo.size / 1024 / 1024).toFixed(2)} MB` : "JPG, PNG, or PDF · max 5 MB"}
                </span>
            </div>

            <input
                type="file"
                className="hidden"
                accept="image/*,.pdf"
                onChange={(event) => {
                    const file = event.target.files?.[0] ?? null;
                    onPhotoChange(file);
                }}
            />
        </label>
    );
}