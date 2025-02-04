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
      <>
      <div className="w-full dark:bg-stone-800 bg-yellow-200">
        {/* Top row of card */}
          <Card 
            className={`transition-all duration-300 ease-in-out cursor-pointer  border-stone-300
              ${isExpanded ? 'shadow-lg' : 'hover:shadow-md'}`}
            onClick={() => onClick(card)}
          >
            
            <CardHeader>
            <div className="grid grid-cols-3 items-center">
              
              {/* Category Tag */}
              {isExpanded ? (
                <div 
                className="flex items-center gap-1 px-2 py-1 w-fit rounded justify-start" 
                style={{ backgroundColor: categoryColor }}
              >
                <Tag size={16} />
                <span>{card.category}</span>
              </div>)
              : (
                <div 
                className="flex items-center gap-1 px-2 py-1 w-8 rounded justify-start" 
                style={{ backgroundColor: categoryColor }}
              >
                <Tag size={16} />
              </div>
              )}

              <CardTitle className="text-xl text-center">{card.title}</CardTitle>
              
              {/* Trash Icon */}
              <div className="flex justify-end">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(card.id);
                  }}
                  className="p-1 bg-red-400 dark:bg-red-400 hover:bg-red-600 rounded"
                >
                  <Trash size={16} className="text-red-800" />
                </button>
              </div>
            </div>
            </CardHeader>

          {/* Extra Info shown when card is expanded */}
          <div className={`overflow-hidden transition-all duration-300 ease-in-out
            ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
            
            <CardContent>
              <p className="text-lg dark:text-gray-200 text-stone-600">{card.description}</p>
                
              <p className="text-xs dark:text-gray-400 text-stone-500 mt-2">
                Created: {new Date(card.id).toLocaleDateString()}
              </p>
            </CardContent>
          </div>

        </Card>
      </div>
      
      {/* <div className="w-full h-px bg-gray-200 my-10" /> */}
      </>
    );
  };

export default NewNoteCard;