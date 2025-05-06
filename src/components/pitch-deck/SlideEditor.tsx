import React, { useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { usePitchDeck } from '../../context/PitchDeckContext';

interface SlideEditorProps {
  content: string;
  onChange: (content: string) => void;
  slideType: string;
  sector: string;
}

const SlideEditor: React.FC<SlideEditorProps> = ({ content, onChange, slideType, sector }) => {
  const { getExamples, examples, loading } = usePitchDeck();
  
  useEffect(() => {
    const loadExamples = async () => {
      if (!sector || !slideType) return;
      
      try {
        await getExamples(slideType, sector);
      } catch (error) {
        console.error('Failed to load examples', error);
      }
    };
    
    loadExamples();
  }, [slideType, sector, getExamples]);
  
  return (
    <div>
      <Editor
        apiKey={process.env.VITE_TINYMCE_API_KEY}
        value={content}
        onEditorChange={(newContent: string) => onChange(newContent)}
        init={{
          height: 400,
          menubar: true,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
      
      {loading ? (
        <div className="mt-4 p-4 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-2 text-gray-600">Loading examples...</p>
        </div>
      ) : examples.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-medium mb-2">African Success Examples:</h3>
          <div className="bg-gray-50 p-4 rounded-md">
            {examples.map((example, index) => (
              <div
                key={index}
                className="mb-2 cursor-pointer hover:bg-gray-100 p-2 rounded"
                onClick={() => onChange(example)}
              >
                <p className="text-sm text-gray-600">{example.substring(0, 150)}...</p>
                <button
                  className="text-blue-500 text-xs mt-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    onChange(example);
                  }}
                >
                  Use this example
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SlideEditor;