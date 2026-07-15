import { CATEGORIES, COMPLETION_FILTER } from "@/constants";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select"

interface NotesFilterProps {
  categoryFilter: string;
  setCategoryFilter: (value: string) => void;
  completionFilter: string;
  setCompletionFilter: (value: string) => void;
}

const NotesFilter = ({ categoryFilter, setCategoryFilter, completionFilter, setCompletionFilter }: NotesFilterProps) => {
  return (
    <div className="flex gap-2 mt-4">
       <Select value={categoryFilter} onValueChange={(value) => setCategoryFilter(value)}>
        <SelectTrigger className="cursor-pointer bg-alabaster">
          <SelectValue/>
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectItem value="all" className="cursor-pointer">
            All Categories
          </SelectItem>
          {CATEGORIES.map((category) => (
            <SelectItem key={category.value} value={category.value} className="cursor-pointer">
             <span className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${category.color}`}/>
              {category.label}
             </span>
            </SelectItem>
          ))}
        </SelectContent>
       </Select>
          {/* completion filter */}
       <Select value={completionFilter} onValueChange={(value) => setCompletionFilter(value)}>
        <SelectTrigger className="cursor-pointer bg-alabaster">
          <SelectValue/>
        </SelectTrigger>
        <SelectContent position="popper">
         {COMPLETION_FILTER.map((completion) => (
          <SelectItem key={completion.value} value={completion.value} className="cursor-pointer">
            {completion.label}
          </SelectItem>
         ))}
        </SelectContent>
       </Select>
    </div>
  ) 
}

export default NotesFilter