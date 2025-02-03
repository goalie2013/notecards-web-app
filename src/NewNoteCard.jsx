import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tag, Edit, Trash, Plus, Search, ArrowUpDown } from 'lucide-react';

// Helper functions remain the same
const generatePastelColor = (seed) => {
    const hash = seed.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);
    const hue = hash % 360;
    return `hsl(${hue}, 70%, 85%)`;
};

const NewNoteCard = ({ card, onClick, onDelete, isExpanded }) => {
    const categoryColor = generatePastelColor(card.category);
    
    return (

      <div className="w-full">
        
        <Card 
          className={`transition-all duration-300 ease-in-out cursor-pointer
            ${isExpanded ? 'shadow-lg' : 'hover:shadow-md'}`}
          onClick={() => onClick(card)}
        >
          <CardHeader>
            <CardTitle className="text-xl text-center">{card.title}</CardTitle>
          </CardHeader>
          
          <div className={`overflow-hidden transition-all duration-300 ease-in-out
            ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div 
                  className="flex items-center gap-1 px-2 py-1 rounded" 
                  style={{ backgroundColor: categoryColor }}
                >
                  <Tag size={16} />
                  <span>{card.category}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(card.id);
                  }}
                  className="p-1 hover:bg-red-100 rounded"
                >
                  <Trash size={16} className="text-red-500" />
                </button>
              </div>
              <p className="text-gray-600">{card.description}</p>
              <p className="text-xs text-gray-400 mt-2">
                Created: {new Date(card.id).toLocaleDateString()}
              </p>
            </CardContent>
          </div>
        </Card>
        <div className="w-full h-px bg-gray-200 my-4" />
      </div>
    );
  };

export default NewNoteCard;