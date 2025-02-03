import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tag, Edit, Trash, Plus, Search, ArrowUpDown } from 'lucide-react';

// Previous helper functions remain the same
const generatePastelColor = (seed) => {
    const hash = seed.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);
    const hue = hash % 360;
    return `hsl(${hue}, 70%, 85%)`;
  };
  
  
  // NoteCard component remains mostly the same
  

const NoteCard = ({ card, onClick, onDelete }) => {
    const categoryColor = generatePastelColor(card.category);
    
    return (
      <div className="w-full">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader className="pb-2">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <CardTitle className="text-xl">{card.title}</CardTitle>
              <div className="flex items-center gap-2">
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
            </div>
          </CardHeader>
          <CardContent onClick={() => onClick(card)}>
            <p className="text-gray-600">{card.description}</p>
            <p className="text-xs text-gray-400 mt-2">Created: {new Date(card.id).toLocaleDateString()}</p>
          </CardContent>
        </Card>
        <div className="w-full h-px bg-gray-200 my-4" /> {/* Divider */}
      </div>
    );
};

export default NoteCard;

/*
const NoteCard = ({ card, onClick, onDelete }) => {
    const categoryColor = generatePastelColor(card.category);
    
    return (
      <Card 
        className="w-full max-w-md mb-4 hover:shadow-lg transition-shadow cursor-pointer"
        onClick={() => onClick(card)}
      >
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl">{card.title}</CardTitle>
            <div className="flex items-center gap-2">
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
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">{card.description}</p>
          <p className="text-xs text-gray-400 mt-2">Created: {new Date(card.id).toLocaleDateString()}</p>
        </CardContent>
      </Card>
    );
  };

*/