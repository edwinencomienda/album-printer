import { useRef, useState } from "react"

function App() {
    const uploadInputRef = useRef<HTMLInputElement>(null)

    const [images, setImages] = useState<File[]>([])
    const handleUploadChange = () => {
        if (!uploadInputRef.current) {
            return
        }

        const available = 9 - images.length

        // take only available files
        const files = Array.from(uploadInputRef.current?.files || []).slice(
            0,
            available
        )

        if (files.length > 0) {
            setImages([...images, ...files])
            uploadInputRef.current.value = ""
        }
    }

    const handleRemove = (index: number) => {
        setImages(images.filter((_, i) => i !== index))
    }

    return (
        <>
            <div className="h-screen bg-slate-200 overflow-y-auto">
                <input
                    type="file"
                    className="hidden"
                    ref={uploadInputRef}
                    multiple
                    accept="image/*"
                    onChange={handleUploadChange}
                />
                <div className="flex gap-2 p-4 actions hide-print">
                    <button
                        onClick={() => uploadInputRef.current?.click()}
                        className="bg-white rounded-xl p-2 shadow-sm"
                    >
                        upload
                    </button>
                    <button
                        onClick={() => setImages([])}
                        className="bg-white rounded-xl p-2 shadow-sm"
                    >
                        reset
                    </button>
                </div>

                <div className="grid grid-cols-3 gap-3 p-4 max-w-[8.5in] mx-auto">
                    {images.map((image, i) => (
                        <div
                            key={i}
                            className="aspect-[3/4] overflow-hidden relative bg-white p-2 rounded-lg border border-gray-200"
                        >
                            <button
                                onClick={() => handleRemove(i)}
                                className="absolute top-0 right-0 bg-white rounded-full p-1 m-4 z-10 shadow-lg hide-print"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-x size-4"
                                >
                                    <path d="M18 6 6 18" />
                                    <path d="m6 6 12 12" />
                                </svg>
                            </button>

                            <img
                                key={`${i}-${image.name}`}
                                src={URL.createObjectURL(image)}
                                alt={`Preview ${i + 1}`}
                                className="w-full h-full object-cover rounded-lg"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default App
